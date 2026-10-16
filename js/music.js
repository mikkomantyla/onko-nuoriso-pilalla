import { tracks } from "./tracks.js";

// A small step sequencer: every world has its own original track (see tracks.js), synthesized live.
const STEPS_PER_BAR = 16;
const LOOKAHEAD_S = 0.2;
const TICK_MS = 50;
const MASTER_LEVEL = 0.5;
const FADE_OUT_S = 0.45;
const FADE_IN_S = 0.8;

const PITCH = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const DEGREE = { 1: 0, b2: 1, 2: 2, b3: 3, 3: 4, 4: 5, b5: 6, 5: 7, b6: 8, 6: 9, b7: 10, 7: 11, 8: 12 };
const CHORD = {
  "": [0, 4, 7],
  m: [0, 3, 7],
  7: [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  m9: [0, 3, 7, 10, 14],
  9: [0, 4, 7, 10, 14],
  maj9: [0, 4, 7, 11, 14],
  m7b5: [0, 3, 6, 10],
  sus4: [0, 5, 7],
  sus2: [0, 2, 7],
  6: [0, 4, 7, 9],
  add9: [0, 4, 7, 14],
};

const midiOf = (name) => {
  const [, letter, accidental, octave] = name.match(/^([A-G])([#b]?)(-?\d)$/);
  return 12 * (Number(octave) + 1) + PITCH[letter] + (accidental === "#" ? 1 : accidental === "b" ? -1 : 0);
};
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

function parseChord(symbol) {
  const [, letter, accidental, quality] = symbol.match(/^([A-G])([#b]?)(.*)$/);
  const pc = (PITCH[letter] + (accidental === "#" ? 1 : accidental === "b" ? -1 : 0) + 12) % 12;
  if (!(quality in CHORD)) throw new Error(`Unknown chord ${symbol}`);
  // Voices sit between A3 and G#4 so progressions move smoothly.
  const root = 57 + ((pc - 9 + 12) % 12);
  return { pc, tones: CHORD[quality].map((i) => root + i) };
}

/** "C5 - - . E5 ..." → 16 slots of { value, steps } (or null), where "-" holds and "." rests. */
function parseLine(line) {
  const tokens = line.trim().split(/\s+/);
  if (tokens.length !== STEPS_PER_BAR) throw new Error(`Bar needs 16 steps: "${line}"`);
  return tokens.map((token, i) => {
    if (token === "." || token === "-") return null;
    let steps = 1;
    while (tokens[i + steps] === "-") steps++;
    return { value: token, steps };
  });
}

/** "x--.x..." → 16 slots of hit lengths (or null). */
function parseRhythm(pattern) {
  if (pattern.length !== STEPS_PER_BAR) throw new Error(`Rhythm needs 16 steps: "${pattern}"`);
  return [...pattern].map((c, i) => {
    if (c === "." || c === "-") return null;
    let steps = 1;
    while (pattern[i + steps] === "-") steps++;
    return { value: c, steps };
  });
}

function compile(track) {
  const asBars = (v) => (v === undefined ? null : (Array.isArray(v) ? v : [v]));
  return {
    ...track,
    chords: track.chords.map(parseChord),
    chordRhythm: track.chordRhythm ? parseRhythm(track.chordRhythm) : null,
    bass: asBars(track.bass)?.map(parseLine) ?? null,
    lead: asBars(track.lead)?.map(parseLine) ?? null,
    arp: track.arp ? { ...track.arp, pattern: track.arp.pattern.trim().split(/\s+/).map(Number) } : null,
    drums: Object.fromEntries(Object.entries(track.drums ?? {}).map(([k, v]) => [k, parseRhythm(v)])),
  };
}

const compiled = Object.fromEntries(Object.entries(tracks).map(([key, track]) => [key, compile(track)]));

// ---------------------------------------------------------------------------
// Audio graph

let ctx = null;
let master = null;
let mixIn = null;
let reverb = null;
let noise = null;
let muted = false;
let timer = null;
let wantedKey = null;
let playing = null; // { track, bus, lanes, step, nextTime }

function makeReverb() {
  const seconds = 2.4;
  const length = ctx.sampleRate * seconds;
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  }
  const conv = ctx.createConvolver();
  conv.buffer = impulse;
  return conv;
}

function setup() {
  ctx = new AudioContext();
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  master = ctx.createGain();
  master.gain.value = muted ? 0 : MASTER_LEVEL;
  comp.connect(master).connect(ctx.destination);
  reverb = makeReverb();
  const wet = ctx.createGain();
  wet.gain.value = 0.9;
  reverb.connect(wet).connect(comp);
  mixIn = comp;
  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
}

/** One output per lane: a level into the track bus and a send into the shared reverb. */
function lane(bus, level, send) {
  const g = ctx.createGain();
  g.gain.value = level;
  g.connect(bus);
  const s = ctx.createGain();
  s.gain.value = send;
  g.connect(s).connect(reverb);
  return g;
}

function adsr(param, t, { a = 0.005, d = 0.1, s = 0.6, r = 0.1, peak = 1 }, length) {
  param.cancelScheduledValues(t);
  param.setValueAtTime(0.0001, t);
  param.linearRampToValueAtTime(peak, t + a);
  param.setTargetAtTime(peak * s, t + a, d / 3);
  const end = t + Math.max(length, a + 0.01);
  param.setTargetAtTime(0.0001, end, r / 3);
  return end + r * 2;
}

function osc(type, frequency, t, stop, detune = 0) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(frequency, t);
  o.detune.value = detune;
  o.start(t);
  o.stop(stop);
  return o;
}

function noiseSource(t, stop) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  src.start(t, Math.random() * 0.5);
  src.stop(stop);
  return src;
}

function filter(type, frequency, q = 0.7) {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = frequency;
  f.Q.value = q;
  return f;
}

// ---------------------------------------------------------------------------
// Instruments: (out, t, midi, seconds, velocity)

const instruments = {
  rhodes(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.004, d: 1.6, s: 0.25, r: 0.5, peak: 0.22 * v }, len);
    osc("sine", hz(m), t, stop).connect(g);
    const tine = ctx.createGain();
    adsr(tine.gain, t, { a: 0.002, d: 0.25, s: 0, r: 0.1, peak: 0.08 * v }, 0.05);
    osc("sine", hz(m) * 4.01, t, stop).connect(tine).connect(g);
    osc("triangle", hz(m), t, stop, 6).connect(g);
    g.connect(out);
  },
  pad(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.5, d: 0.8, s: 0.8, r: 1.2, peak: 0.07 * v }, len);
    const f = filter("lowpass", 1100, 0.5);
    [-8, 8].forEach((d) => osc("sawtooth", hz(m), t, stop, d).connect(f));
    f.connect(g).connect(out);
  },
  organ(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.03, d: 0.2, s: 0.85, r: 0.25, peak: 0.1 * v }, len);
    [1, 2, 3, 4].forEach((h, i) => {
      const hg = ctx.createGain();
      hg.gain.value = [0.6, 0.35, 0.18, 0.1][i];
      osc("sine", hz(m) * h, t, stop).connect(hg).connect(g);
    });
    g.connect(out);
  },
  stab(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.003, d: 0.12, s: 0.35, r: 0.08, peak: 0.12 * v }, Math.min(len, 0.12));
    const f = filter("lowpass", 900, 2);
    f.frequency.setValueAtTime(3800, t);
    f.frequency.setTargetAtTime(900, t, 0.06);
    [-12, 0, 12].forEach((d) => osc("sawtooth", hz(m), t, stop, d).connect(f));
    osc("square", hz(m) / 2, t, stop).connect(f);
    f.connect(g).connect(out);
  },
  harpsichord(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.002, d: 0.5, s: 0.0, r: 0.1, peak: 0.11 * v }, len);
    const hp = filter("highpass", 400);
    osc("sawtooth", hz(m), t, stop).connect(hp);
    osc("square", hz(m) * 2, t, stop, 4).connect(hp);
    hp.connect(filter("lowpass", 5200)).connect(g).connect(out);
  },
  marimba(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.002, d: 0.45, s: 0, r: 0.1, peak: 0.3 * v }, 0.05);
    osc("sine", hz(m), t, stop).connect(g);
    const over = ctx.createGain();
    adsr(over.gain, t, { a: 0.001, d: 0.06, s: 0, r: 0.05, peak: 0.12 * v }, 0.01);
    osc("sine", hz(m) * 3.93, t, stop).connect(over).connect(g);
    g.connect(out);
  },
  bell(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.003, d: 2.2, s: 0, r: 0.3, peak: 0.16 * v }, 0.05);
    const carrier = osc("sine", hz(m), t, stop);
    const mod = osc("sine", hz(m) * 3.5, t, stop);
    const depth = ctx.createGain();
    depth.gain.setValueAtTime(hz(m) * 2.2, t);
    depth.gain.setTargetAtTime(0, t, 0.4);
    mod.connect(depth).connect(carrier.frequency);
    carrier.connect(g).connect(out);
  },
  lead(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.02, d: 0.3, s: 0.7, r: 0.18, peak: 0.08 * v }, len);
    const f = filter("lowpass", 2600, 1);
    const vib = osc("sine", 5.4, t, stop);
    const vibDepth = ctx.createGain();
    vibDepth.gain.setValueAtTime(0, t);
    vibDepth.gain.linearRampToValueAtTime(7, t + 0.35);
    const a = osc("sawtooth", hz(m), t, stop, -5);
    const b = osc("square", hz(m), t, stop, 5);
    vib.connect(vibDepth);
    vibDepth.connect(a.detune);
    vibDepth.connect(b.detune);
    a.connect(f);
    b.connect(f);
    f.connect(g).connect(out);
  },
  synth80(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.003, d: 0.12, s: 0.45, r: 0.06, peak: 0.09 * v }, len * 0.8);
    const f = filter("lowpass", 1800, 3);
    f.frequency.setValueAtTime(5200, t);
    f.frequency.setTargetAtTime(1800, t, 0.05);
    osc("square", hz(m), t, stop).connect(f);
    osc("sawtooth", hz(m), t, stop, 9).connect(f);
    f.connect(g).connect(out);
  },
  brass(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.05, d: 0.3, s: 0.75, r: 0.2, peak: 0.08 * v }, len);
    const f = filter("lowpass", 700, 1.5);
    f.frequency.setValueAtTime(600, t);
    f.frequency.linearRampToValueAtTime(2600, t + 0.08);
    f.frequency.setTargetAtTime(1500, t + 0.08, 0.2);
    [-7, 7].forEach((d) => osc("sawtooth", hz(m), t, stop, d).connect(f));
    f.connect(g).connect(out);
  },
  flute(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.07, d: 0.2, s: 0.8, r: 0.2, peak: 0.13 * v }, len);
    const o = osc("sine", hz(m), t, stop);
    const vib = osc("sine", 5, t, stop);
    const depth = ctx.createGain();
    depth.gain.value = 6;
    vib.connect(depth).connect(o.detune);
    o.connect(g);
    const breath = ctx.createGain();
    breath.gain.value = 0.015 * v;
    noiseSource(t, stop).connect(filter("bandpass", hz(m) * 2, 2)).connect(breath).connect(g);
    g.connect(out);
  },
  strings(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.18, d: 0.4, s: 0.85, r: 0.5, peak: 0.06 * v }, len);
    const f = filter("lowpass", 2400, 0.6);
    [-10, 0, 10].forEach((d) => osc("sawtooth", hz(m), t, stop, d).connect(f));
    f.connect(g).connect(out);
  },
  pluck(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.002, d: 0.25, s: 0, r: 0.08, peak: 0.16 * v }, 0.02);
    const f = filter("lowpass", 3000, 2);
    f.frequency.setValueAtTime(4500, t);
    f.frequency.setTargetAtTime(700, t, 0.07);
    osc("sawtooth", hz(m), t, stop).connect(f);
    osc("triangle", hz(m) * 2, t, stop).connect(f);
    f.connect(g).connect(out);
  },

  // Basses
  subBass(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.01, d: 0.3, s: 0.8, r: 0.12, peak: 0.45 * v }, len);
    osc("sine", hz(m), t, stop).connect(g);
    const grit = ctx.createGain();
    grit.gain.value = 0.18;
    osc("triangle", hz(m) * 2, t, stop).connect(grit).connect(g);
    g.connect(out);
  },
  synthBass(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.004, d: 0.2, s: 0.6, r: 0.08, peak: 0.3 * v }, len);
    const f = filter("lowpass", 500, 4);
    f.frequency.setValueAtTime(1600, t);
    f.frequency.setTargetAtTime(420, t, 0.08);
    osc("sawtooth", hz(m), t, stop).connect(f);
    osc("square", hz(m) / 2, t, stop).connect(f);
    f.connect(g).connect(out);
  },
  slapBass(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.002, d: 0.16, s: 0.35, r: 0.05, peak: 0.36 * v }, Math.min(len, 0.2));
    const f = filter("lowpass", 900, 6);
    f.frequency.setValueAtTime(3200, t);
    f.frequency.setTargetAtTime(600, t, 0.045);
    osc("square", hz(m), t, stop).connect(f);
    osc("sawtooth", hz(m), t, stop, 7).connect(f);
    f.connect(g).connect(out);
  },
  acid(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.003, d: 0.15, s: 0.5, r: 0.05, peak: 0.2 * v }, len * 0.9);
    const f = filter("lowpass", 400, 16);
    f.frequency.setValueAtTime(2600 * v, t);
    f.frequency.setTargetAtTime(320, t, 0.07);
    osc("sawtooth", hz(m), t, stop).connect(f);
    f.connect(g).connect(out);
  },
  pluckBass(out, t, m, len, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.003, d: 0.35, s: 0.2, r: 0.08, peak: 0.42 * v }, len);
    osc("triangle", hz(m), t, stop).connect(g);
    const f = filter("lowpass", 800);
    osc("sawtooth", hz(m), t, stop).connect(f).connect(g);
    g.connect(out);
  },
};

const drums = {
  kick(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.001, d: 0.3, s: 0, r: 0.05, peak: 0.9 * v }, 0.02);
    const o = osc("sine", 140, t, stop);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    o.connect(g).connect(out);
  },
  snare(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.001, d: 0.18, s: 0, r: 0.05, peak: 0.42 * v }, 0.01);
    noiseSource(t, stop).connect(filter("bandpass", 1900, 0.8)).connect(g);
    const body = ctx.createGain();
    adsr(body.gain, t, { a: 0.001, d: 0.08, s: 0, r: 0.03, peak: 0.3 * v }, 0.01);
    osc("triangle", 190, t, stop).connect(body).connect(g);
    g.connect(out);
  },
  clap(out, t, v) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    [0, 0.012, 0.024].forEach((o) => {
      g.gain.setValueAtTime(0.45 * v, t + o);
      g.gain.setTargetAtTime(0.05 * v, t + o, 0.004);
    });
    g.gain.setTargetAtTime(0.0001, t + 0.03, 0.06);
    noiseSource(t, t + 0.4).connect(filter("bandpass", 1300, 1.2)).connect(g).connect(out);
  },
  hat(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.001, d: 0.04, s: 0, r: 0.02, peak: 0.16 * v }, 0.005);
    noiseSource(t, stop).connect(filter("highpass", 8000)).connect(g).connect(out);
  },
  open(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.001, d: 0.28, s: 0, r: 0.05, peak: 0.13 * v }, 0.01);
    noiseSource(t, stop).connect(filter("highpass", 7000)).connect(g).connect(out);
  },
  rim(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.001, d: 0.04, s: 0, r: 0.02, peak: 0.25 * v }, 0.005);
    osc("square", 1700, t, stop).connect(filter("bandpass", 1700, 4)).connect(g).connect(out);
  },
  shaker(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.012, d: 0.05, s: 0, r: 0.02, peak: 0.07 * v }, 0.01);
    noiseSource(t, stop).connect(filter("highpass", 6000)).connect(g).connect(out);
  },
  tom(out, t, v) {
    const g = ctx.createGain();
    const stop = adsr(g.gain, t, { a: 0.001, d: 0.3, s: 0, r: 0.05, peak: 0.5 * v }, 0.01);
    const o = osc("sine", 190, t, stop);
    o.frequency.exponentialRampToValueAtTime(95, t + 0.25);
    o.connect(g).connect(out);
  },
};

// ---------------------------------------------------------------------------
// Sequencer

function startTrack(key) {
  const track = compiled[key];
  const now = ctx.currentTime;
  if (playing) {
    const old = playing.bus;
    old.gain.setTargetAtTime(0, now, FADE_OUT_S / 3);
    setTimeout(() => old.disconnect(), (FADE_OUT_S + 2.5) * 1000);
  }
  const bus = ctx.createGain();
  bus.gain.setValueAtTime(0, now);
  bus.gain.setTargetAtTime(1, now + FADE_OUT_S * 0.6, FADE_IN_S / 3);
  bus.connect(mixIn);
  const mix = track.mix ?? {};
  const lanes = {
    chords: lane(bus, mix.chords ?? 1, mix.chordsSend ?? 0.25),
    bass: lane(bus, mix.bass ?? 1, 0.03),
    lead: lane(bus, mix.lead ?? 1, mix.leadSend ?? 0.3),
    arp: lane(bus, mix.arp ?? 1, mix.arpSend ?? 0.3),
    drums: lane(bus, mix.drums ?? 1, mix.drumsSend ?? 0.08),
  };
  playing = { track, bus, lanes, step: 0, nextTime: now + FADE_OUT_S * 0.6 };
}

function scheduleStep({ track, lanes, step }, time) {
  const stepSec = 60 / track.bpm / 4;
  const s = step % STEPS_PER_BAR;
  const bar = Math.floor(step / STEPS_PER_BAR);
  const chord = track.chords[bar % track.chords.length];
  const swing = s % 2 === 1 ? (track.swing ?? 0) * stepSec : 0;
  const t = time + swing;
  const accent = s % 4 === 0 ? 1 : 0.8;

  for (const [name, hits] of Object.entries(track.drums)) {
    if (hits[s]) drums[name](lanes.drums, t, (track.drumLevels?.[name] ?? 1) * accent);
  }

  const chordHit = track.chordRhythm?.[s];
  if (chordHit) {
    chord.tones.forEach((m) => instruments[track.chordInst](lanes.chords, t, m, chordHit.steps * stepSec, 0.9));
  }

  const bassHit = track.bass?.[bar % track.bass.length][s];
  if (bassHit) {
    const v = bassHit.value;
    const midi = v in DEGREE ? 36 + chord.pc + DEGREE[v] + (track.bassOctave ?? 0) * 12 : midiOf(v);
    instruments[track.bassInst](lanes.bass, t, midi, bassHit.steps * stepSec, accent);
  }

  const leadHit = track.lead?.[bar % track.lead.length][s];
  if (leadHit) instruments[track.leadInst](lanes.lead, t, midiOf(leadHit.value), leadHit.steps * stepSec, accent);

  if (track.arp && s % (track.arp.every ?? 1) === 0) {
    const idx = track.arp.pattern[(s / (track.arp.every ?? 1)) % track.arp.pattern.length];
    const tones = chord.tones;
    const midi = tones[idx % tones.length] + 12 * (Math.floor(idx / tones.length) + (track.arp.octave ?? 0));
    instruments[track.arp.inst](lanes.arp, t, midi, stepSec * (track.arp.every ?? 1), 0.75);
  }
}

function scheduler() {
  if (wantedKey && playing?.track !== compiled[wantedKey]) startTrack(wantedKey);
  if (!playing) return;
  const stepSec = 60 / playing.track.bpm / 4;
  while (playing.nextTime < ctx.currentTime + LOOKAHEAD_S) {
    scheduleStep(playing, playing.nextTime);
    playing.nextTime += stepSec;
    playing.step += 1;
  }
}

/** Browsers only allow audio after a user gesture, so the first key press or click starts the music. */
export function startMusic() {
  if (ctx) return;
  setup();
  timer = setInterval(scheduler, TICK_MS);
}

/** Crossfades to the track of the world being shown. */
export function setTrack(key) {
  if (!(key in compiled)) throw new Error(`No track for ${key}`);
  wantedKey = key;
}

export function setMuted(value) {
  muted = value;
  if (master) master.gain.setTargetAtTime(muted ? 0 : MASTER_LEVEL, ctx.currentTime, 0.05);
}

export function isMuted() {
  return muted;
}

/** A soft filtered swoosh for the world wipe. */
export function playWhoosh() {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.18, t + 0.25);
  g.gain.setTargetAtTime(0.0001, t + 0.3, 0.12);
  const f = filter("bandpass", 400, 1.5);
  f.frequency.setValueAtTime(300, t);
  f.frequency.exponentialRampToValueAtTime(3200, t + 0.35);
  noiseSource(t, t + 1).connect(f).connect(g).connect(mixIn);
}

export function stopMusic() {
  clearInterval(timer);
}
