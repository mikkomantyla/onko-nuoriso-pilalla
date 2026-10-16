import { duck, sfxOutput } from "./music.js";

// One synthesized sound effect per world, played as the world appears.
let a = null; // { ctx, out, noise } while an effect is being built

const rand = (min, max) => min + Math.random() * (max - min);

/** An enveloped oscillator; `to` glides the pitch exponentially over the note. */
function tone(type, freq, t, dur, peak, { to = null, attack = 0.005, dest = a.out, detune = 0 } = {}) {
  const o = a.ctx.createOscillator();
  const g = a.ctx.createGain();
  o.type = type;
  o.detune.value = detune;
  o.frequency.setValueAtTime(freq, t);
  if (to !== null) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + dur + 0.05);
  return o;
}

/** A filtered noise burst; `to` sweeps the filter frequency over the burst. */
function hiss(t, dur, peak, { type = "bandpass", freq = 1000, q = 1, to = null, attack = 0.003, dest = a.out } = {}) {
  const src = a.ctx.createBufferSource();
  src.buffer = a.noise;
  src.loop = true;
  const f = a.ctx.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(freq, t);
  if (to !== null) f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = a.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(dest);
  src.start(t, Math.random() * 0.5);
  src.stop(t + dur + 0.05);
}

function distortion(amount) {
  const shaper = a.ctx.createWaveShaper();
  const curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / curve.length) * 2 - 1;
    curve[i] = ((1 + amount) * x) / (1 + amount * Math.abs(x));
  }
  shaper.curve = curve;
  return shaper;
}

const effects = {
  // Sad trombone: wah, wah, wah, waaah.
  pisa(t) {
    [[196, 0.42], [185, 0.42], [175, 0.42], [165, 1.4]].forEach(([f, d], i) => {
      const start = t + i * 0.45;
      const lp = a.ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(350, start);
      lp.frequency.linearRampToValueAtTime(1500, start + 0.12);
      lp.frequency.setTargetAtTime(600, start + 0.15, 0.2);
      lp.connect(a.out);
      const o = tone("sawtooth", f, start, d, 0.2, { attack: 0.04, dest: lp });
      if (i === 3) {
        const lfo = a.ctx.createOscillator();
        const depth = a.ctx.createGain();
        lfo.frequency.value = 5.5;
        depth.gain.value = 30;
        lfo.connect(depth).connect(o.detune);
        lfo.start(start + 0.2);
        lfo.stop(start + d);
      }
    });
    return 3;
  },

  // An old electric school bell.
  cover(t) {
    const ring = a.ctx.createGain();
    ring.gain.value = 0.5;
    const clapper = a.ctx.createOscillator();
    clapper.type = "square";
    clapper.frequency.value = 24;
    const depth = a.ctx.createGain();
    depth.gain.value = 0.5;
    clapper.connect(depth).connect(ring.gain);
    clapper.start(t);
    clapper.stop(t + 1.8);
    const env = a.ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.16, t + 0.02);
    env.gain.setValueAtTime(0.16, t + 1.5);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    ring.connect(env).connect(a.out);
    [2350, 6480, 9100].forEach((f, i) => tone("sine", f, t, 2.2, [1, 0.4, 0.2][i], { dest: ring, attack: 0.01 }));
    return 2.2;
  },

  // Gavel: three wooden bangs.
  yhteiskuntaoppi(t) {
    [0, 0.38, 0.76].forEach((o, i) => {
      tone("sine", 210, t + o, 0.18, i === 2 ? 0.7 : 0.5, { to: 90 });
      hiss(t + o, 0.06, 0.45, { freq: 1100, q: 2 });
    });
    return 1.2;
  },

  // A deep church bell, struck twice.
  uskonto(t) {
    [0, 1.5].forEach((o) => {
      [[0.5, 0.5], [1, 0.35], [1.19, 0.25], [1.5, 0.18], [2, 0.14], [2.51, 0.1], [3.01, 0.07]].forEach(([ratio, peak]) =>
        tone("sine", 147 * ratio, t + o, 3.2 / ratio + 0.6, peak * 0.5)
      );
    });
    return 4;
  },

  // Calculator beeps and a little "result" chime.
  matematiikka(t) {
    [1900, 1500, 1900, 2300, 1700].forEach((f, i) => tone("square", f, t + i * 0.13, 0.07, 0.05));
    tone("sine", 1568, t + 0.75, 0.6, 0.15);
    tone("sine", 2093, t + 0.85, 0.8, 0.15);
    return 1.6;
  },

  // Typewriter clatter, carriage return and the bell.
  aidinkieli(t) {
    let at = t;
    for (let i = 0; i < 9; i++) {
      hiss(at, 0.03, 0.35, { type: "highpass", freq: 2200 });
      tone("sine", 320, at, 0.04, 0.25, { to: 180 });
      at += rand(0.08, 0.16);
    }
    tone("sine", 2640, at + 0.05, 1.3, 0.18);
    tone("sine", 5280, at + 0.05, 0.6, 0.05);
    hiss(at + 0.25, 0.35, 0.2, { freq: 800, to: 2500, q: 3 });
    return at - t + 1.3;
  },

  // Electric crackle followed by a laser zap.
  fysiikka(t) {
    const buzz = tone("sawtooth", 120, t, 0.9, 0.08, { attack: 0.05 });
    buzz.detune.setValueAtTime(0, t);
    for (let i = 0; i < 12; i++) hiss(t + rand(0, 0.85), rand(0.01, 0.04), rand(0.2, 0.45), { type: "highpass", freq: 3000 });
    tone("square", 2200, t + 1, 0.3, 0.08, { to: 180 });
    tone("square", 1800, t + 1.15, 0.3, 0.06, { to: 150 });
    return 1.5;
  },

  // Bubbling flask and a little "poof".
  kemia(t) {
    for (let i = 0; i < 16; i++) {
      const f = rand(280, 750);
      tone("sine", f, t + rand(0, 1.2), rand(0.04, 0.08), 0.18, { to: f * 2.6 });
    }
    hiss(t + 1.35, 0.7, 0.5, { type: "lowpass", freq: 1400, to: 150 });
    tone("sine", 110, t + 1.35, 0.4, 0.4, { to: 50 });
    return 2.1;
  },

  // Birdsong: chirps and a trill.
  biologia(t) {
    const chirp = (at, f) => tone("sine", f, at, 0.08, 0.12, { to: f * 1.45 });
    [0, 0.12, 0.24].forEach((o) => chirp(t + o, 3100));
    [0.7, 0.8].forEach((o) => chirp(t + o, 3600));
    const trill = tone("sine", 3900, t + 1.1, 0.5, 0.1, { attack: 0.03 });
    const lfo = a.ctx.createOscillator();
    const depth = a.ctx.createGain();
    lfo.frequency.value = 28;
    depth.gain.value = 450;
    lfo.connect(depth).connect(trill.frequency);
    lfo.start(t + 1.1);
    lfo.stop(t + 1.65);
    [1.8, 1.92].forEach((o) => chirp(t + o, 2800));
    return 2.2;
  },

  // A fizzing fuse, then a cannon boom.
  historia(t) {
    hiss(t, 0.65, 0.12, { type: "highpass", freq: 5000, attack: 0.05 });
    hiss(t + 0.7, 1.6, 0.9, { type: "lowpass", freq: 600, to: 60 });
    tone("sine", 75, t + 0.7, 0.8, 0.8, { to: 28 });
    return 2.4;
  },

  // A tom fill into a cymbal crash.
  musiikki(t) {
    [280, 240, 200, 170, 140, 115].forEach((f, i) => tone("sine", f, t + i * 0.1, 0.28, 0.45, { to: f * 0.55 }));
    hiss(t + 0.62, 1.8, 0.28, { type: "highpass", freq: 5200 });
    hiss(t + 0.62, 0.9, 0.18, { freq: 9000, q: 0.8 });
    tone("sine", 140, t + 0.62, 0.3, 0.7, { to: 45 });
    return 2.5;
  },

  // A chainsaw: two failed pulls on the cord, then it catches, revs twice and settles.
  puutyot(t) {
    const pull = (at) => {
      hiss(at, 0.32, 0.3, { freq: 500, to: 1600, q: 1.5, attack: 0.02 });
      for (let i = 0; i < 5; i++) tone("sawtooth", 70, at + 0.18 + i * 0.045, 0.04, 0.18, { to: 50 });
    };
    pull(t);
    pull(t + 0.75);
    pull(t + 1.5);

    const start = t + 1.85;
    const end = start + 2.6;
    const engine = a.ctx.createOscillator();
    const engine2 = a.ctx.createOscillator();
    engine.type = engine2.type = "sawtooth";
    engine2.detune.value = 25;
    const rpm = [
      [0, 48], [0.45, 52], [0.7, 150], [1.05, 150], [1.2, 75], [1.45, 175], [1.95, 175], [2.15, 58], [2.6, 50],
    ];
    [engine, engine2].forEach((o) => {
      o.frequency.setValueAtTime(rpm[0][1], start);
      rpm.slice(1).forEach(([at, f]) => o.frequency.linearRampToValueAtTime(f, start + at));
    });
    const lp = a.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    const g = a.ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(0.16, start + 0.05);
    g.gain.setValueAtTime(0.16, end - 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    const shaper = distortion(18);
    engine.connect(shaper);
    engine2.connect(shaper);
    shaper.connect(lp).connect(g).connect(a.out);
    [engine, engine2].forEach((o) => {
      o.start(start);
      o.stop(end + 0.05);
    });
    hiss(start + 0.7, 0.4, 0.08, { freq: 3000, q: 1 });
    hiss(start + 1.45, 0.55, 0.08, { freq: 3200, q: 1 });
    return end - t;
  },

  // A sewing machine speeding up, stitching and slowing down.
  kasityot(t) {
    tone("sawtooth", 95, t, 1.9, 0.04, { attack: 0.2 });
    let at = t + 0.1;
    let rate = 6;
    while (at < t + 1.8) {
      hiss(at, 0.018, 0.4, { freq: 3200, q: 4 });
      tone("sine", 620, at, 0.025, 0.12);
      rate = at < t + 1.3 ? Math.min(rate * 1.12, 17) : rate * 0.88;
      at += 1 / rate;
    }
    return 2;
  },

  // A jet flying past from left to right.
  maantieto(t) {
    const dur = 3.2;
    const pan = a.ctx.createStereoPanner();
    pan.pan.setValueAtTime(-1, t);
    pan.pan.linearRampToValueAtTime(1, t + dur);
    const g = a.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.9, t + dur * 0.45);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(pan).connect(a.out);
    hiss(t, dur, 0.6, { freq: 500, to: 1500, q: 0.6, attack: 0.01, dest: g });
    hiss(t, dur, 0.25, { type: "highpass", freq: 4000, attack: 0.01, dest: g });
    const whine = tone("sawtooth", 1500, t, dur, 0.05, { attack: 0.5, dest: g });
    whine.frequency.setValueAtTime(1500, t + dur * 0.4);
    whine.frequency.exponentialRampToValueAtTime(820, t + dur * 0.6);
    return dur;
  },

  // A heartbeat with hospital monitor beeps.
  terveystieto(t) {
    [0, 0.85, 1.7].forEach((o) => {
      tone("sine", 70, t + o, 0.15, 0.7, { to: 40 });
      tone("sine", 60, t + o + 0.2, 0.15, 0.5, { to: 35 });
      tone("sine", 1000, t + o, 0.12, 0.12);
    });
    return 2.3;
  },

  // Applause with a "ta-da!".
  end(t) {
    for (let i = 0; i < 140; i++) {
      const at = t + rand(0, 2.6) ** 1.1;
      hiss(at, 0.03, rand(0.08, 0.2), { freq: rand(900, 2200), q: rand(0.8, 2) });
    }
    [523, 659, 784].forEach((f) => tone("sawtooth", f, t, 0.16, 0.06, { detune: 6 }));
    [523, 659, 784, 1047].forEach((f) => tone("sawtooth", f, t + 0.2, 1.3, 0.05, { attack: 0.02, detune: -6 }));
    return 2.8;
  },
};

let lastEffect = null;

/** Plays the effect for a world `delay` seconds from now, ducking the music under it; the previous world's effect fades out. */
export function playSfx(key, delay = 0) {
  const output = sfxOutput();
  if (!output) return;
  const now = output.ctx.currentTime;
  if (lastEffect) {
    lastEffect.gain.setTargetAtTime(0, now, 0.08);
    const old = lastEffect;
    setTimeout(() => old.disconnect(), 1000);
  }
  lastEffect = output.ctx.createGain();
  lastEffect.connect(output.out);
  a = { ...output, out: lastEffect };
  const t = now + delay;
  const seconds = effects[key](t);
  duck(t, seconds);
  a = null;
}
