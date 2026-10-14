// An original looping chiptune, synthesized live so the game ships no audio files.
const BPM = 138;
const EIGHTH = 60 / BPM / 2;
const LOOKAHEAD_S = 0.25;
const TICK_MS = 60;

const NOTE_INDEX = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function freq(note) {
  const [, name, sharp, octave] = note.match(/^([A-G])(#?)(\d)$/);
  const midi = 12 * (Number(octave) + 1) + NOTE_INDEX[name] + (sharp ? 1 : 0);
  return 440 * 2 ** ((midi - 69) / 12);
}

// [note | null, length in eighths]; each bar is eight eighths.
const MELODY = [
  ["C5", 1], ["C5", 1], ["E5", 1], ["G5", 1], ["A5", 2], ["G5", 2],
  ["A5", 1], ["G5", 1], ["E5", 1], ["C5", 1], ["D5", 2], ["E5", 2],
  ["F5", 1], ["F5", 1], ["A5", 1], ["C6", 1], ["B5", 2], ["A5", 2],
  ["G5", 1], ["A5", 1], ["G5", 1], ["F5", 1], ["E5", 2], ["D5", 2],
  ["C5", 1], ["C5", 1], ["E5", 1], ["G5", 1], ["A5", 2], ["G5", 2],
  ["A5", 1], ["C6", 1], ["B5", 1], ["A5", 1], ["G5", 2], ["E5", 2],
  ["F5", 1], ["A5", 1], ["G5", 1], ["F5", 1], ["E5", 1], ["D5", 1], ["E5", 1], ["F5", 1],
  ["G5", 2], ["B4", 2], ["C5", 3], [null, 1],
];

const BASS_ROOTS = ["C3", "A2", "F2", "G2", "C3", "A2", "F2", "G2"];
const FIFTH = { C3: "G3", A2: "E3", F2: "C3", G2: "D3" };

let ctx = null;
let master = null;
let muted = false;
let started = false;
let nextTime = 0;
let step = 0;
let melodyCursor = 0;
let melodyRemaining = 0;
let timer = null;

function voice({ type, frequency, start, length, gain, slideTo = null }) {
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  if (slideTo !== null) osc.frequency.exponentialRampToValueAtTime(slideTo, start + length);
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(gain, start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0008, start + length);
  osc.connect(env).connect(master);
  osc.start(start);
  osc.stop(start + length + 0.02);
}

let noiseBuffer = null;
function hat(start, gain) {
  if (!noiseBuffer) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  const hp = ctx.createBiquadFilter();
  const env = ctx.createGain();
  src.buffer = noiseBuffer;
  hp.type = "highpass";
  hp.frequency.value = 7000;
  env.gain.setValueAtTime(gain, start);
  env.gain.exponentialRampToValueAtTime(0.0008, start + 0.05);
  src.connect(hp).connect(env).connect(master);
  src.start(start);
  src.stop(start + 0.06);
}

function scheduleStep(time) {
  const bar = Math.floor(step / 8) % 8;
  const beat = step % 8;

  if (melodyRemaining === 0) {
    const [note, length] = MELODY[melodyCursor];
    if (note) {
      voice({ type: "square", frequency: freq(note), start: time, length: length * EIGHTH * 0.92, gain: 0.07 });
    }
    melodyRemaining = length;
    melodyCursor = (melodyCursor + 1) % MELODY.length;
  }
  melodyRemaining -= 1;

  if (beat % 2 === 0) {
    const root = BASS_ROOTS[bar];
    const note = beat % 4 === 0 ? root : FIFTH[root];
    voice({ type: "triangle", frequency: freq(note), start: time, length: EIGHTH * 1.7, gain: 0.22 });
  }
  if (beat === 0 || beat === 4) {
    voice({ type: "sine", frequency: 150, slideTo: 45, start: time, length: 0.16, gain: 0.5 });
  }
  if (beat === 2 || beat === 6) {
    voice({ type: "square", frequency: 220, slideTo: 140, start: time, length: 0.07, gain: 0.05 });
  }
  hat(time, beat % 2 === 0 ? 0.05 : 0.025);

  step += 1;
}

function scheduler() {
  while (nextTime < ctx.currentTime + LOOKAHEAD_S) {
    scheduleStep(nextTime);
    nextTime += EIGHTH;
  }
}

// Browsers only allow audio after a user gesture, so the first key press or click starts the tune.
export function startMusic() {
  if (started) return;
  started = true;
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.55;
  master.connect(ctx.destination);
  nextTime = ctx.currentTime + 0.08;
  timer = setInterval(scheduler, TICK_MS);
}

export function setMuted(value) {
  muted = value;
  if (master) master.gain.setTargetAtTime(muted ? 0 : 0.55, ctx.currentTime, 0.05);
}

export function isMuted() {
  return muted;
}

// A cartoon "boing" for the world wipe.
export function playWhoosh() {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  voice({ type: "square", frequency: 300, slideTo: 1200, start: t, length: 0.22, gain: 0.06 });
  voice({ type: "triangle", frequency: 900, slideTo: 260, start: t + 0.25, length: 0.35, gain: 0.12 });
}

export function stopMusic() {
  clearInterval(timer);
}
