// Original compositions, one per world. Notation (see music.js):
// - chords: one chord per bar, looping.
// - chordRhythm and drums: 16 characters per bar, "x" hit, "-" hold, "." rest.
// - bass and lead: one string per bar with 16 space-separated steps: a note ("D5") or, for bass,
//   a scale degree of the bar's chord ("1", "5", "8"…); "-" holds, "." rests.
// - arp: indices into the bar's chord tones (beyond the last tone wraps an octave up).

export const tracks = {
  // Slow late-night noir: Rhodes, sub bass and a lonely bell over the sinking chart.
  pisa: {
    bpm: 72,
    swing: 0.14,
    chords: ["Am9", "Fmaj7", "Dm9", "E7"],
    chordInst: "rhodes",
    chordRhythm: "x-------..x-----",
    bassInst: "subBass",
    bass: "1 - - - - - - . 1 - 5 - - - . .",
    leadInst: "bell",
    lead: [
      "E5 - - - . . C5 - D5 - - - . . . .",
      "C5 - - - A4 - - - . . . . . . . .",
      "F5 - - - E5 - D5 - C5 - - - D5 - - -",
      "B4 - - - - - - - G#4 - - - . . . .",
    ],
    drums: {
      kick: "x.........x.x...",
      snare: "....x.......x...",
      hat: "x.x.x.x.x.x.x.x.",
    },
    drumLevels: { snare: 0.6, hat: 0.5 },
    mix: { chordsSend: 0.35, leadSend: 0.55 },
  },

  // 80s Hollywood synth-funk: brassy stabs, octave-jumping slap synth bass, gated claps, staccato lead.
  cover: {
    bpm: 116,
    chords: ["Dm7", "Dm7", "Bbmaj7", "C", "Gm7", "Am7", "Bbmaj7", "A7"],
    chordInst: "stab",
    chordRhythm: "..x...x...x..x..",
    bassInst: "slapBass",
    bass: "1 . 8 . 1 1 8 . 1 . 8 . 5 . 8 .",
    leadInst: "synth80",
    lead: [
      "A4 . D5 . . D5 F5 . E5 . D5 . C5 - D5 .",
      ". . . . A4 . C5 . D5 . . F5 . E5 . .",
      "F5 . . F5 . . D5 . F5 . G5 . A5 - - .",
      "G5 . . E5 . . C5 . E5 . G5 . . . . .",
      "A4 . D5 . . D5 F5 . E5 . D5 . C5 - D5 .",
      ". . . . E5 . G5 . A5 . . C6 . A5 . .",
      "F5 . D5 . F5 . A5 . G5 - F5 . E5 . D5 .",
      "C#5 - - . E5 . . A4 - - . . . . . .",
    ],
    drums: {
      kick: "x.....x.x.......",
      snare: "....x.......x...",
      clap: "....x.......x...",
      hat: "x.x.x.x.x.x.x.x.",
      open: "..............x.",
    },
    drumLevels: { hat: 0.7 },
    mix: { drumsSend: 0.22, leadSend: 0.2, chordsSend: 0.2 },
  },

  // Statesmanlike news-theme fanfare.
  yhteiskuntaoppi: {
    bpm: 96,
    chords: ["D", "G", "Bm", "A", "D", "G", "A", "D"],
    chordInst: "strings",
    chordRhythm: "x---------------",
    bassInst: "pluckBass",
    bass: "1 - - - . . 1 . 5 - - - . . 5 .",
    leadInst: "brass",
    lead: [
      "A4 - - . D5 - - . F#5 - - - E5 - D5 -",
      "B4 - - - - - - - . . . . . . . .",
      "F#5 - - . D5 - - . B4 - - - C#5 - D5 -",
      "E5 - - - - - - - . . . . . . . .",
      "A4 - - . D5 - - . F#5 - - - A5 - - -",
      "G5 - - - F#5 - - - E5 - - - D5 - - -",
      "E5 - - - C#5 - - - A4 - - - C#5 - - -",
      "D5 - - - - - - - . . . . . . . .",
    ],
    drums: {
      kick: "x.......x.......",
      snare: "....x.......x.xx",
      tom: "............x...",
      hat: "x.x.x.x.x.x.x.x.",
    },
    drumLevels: { snare: 0.55, hat: 0.4 },
  },

  // Calm cathedral: organ chords and bells, no drums.
  uskonto: {
    bpm: 64,
    chords: ["C", "Am", "F", "G", "C", "Em", "F", "Gsus4"],
    chordInst: "organ",
    chordRhythm: "x---------------",
    bassInst: "subBass",
    bass: "1 - - - - - - - - - - - - - - -",
    leadInst: "bell",
    lead: [
      "G5 - - - - - - - E5 - - - - - - -",
      "C5 - - - - - - - . . . . . . . .",
      "A5 - - - - - - - G5 - - - F5 - - -",
      "D5 - - - - - - - . . . . . . . .",
    ],
    mix: { chordsSend: 0.55, leadSend: 0.7, bass: 0.6 },
  },

  // Minimalist pulse: interlocking marimba arpeggios like a proof unfolding.
  matematiikka: {
    bpm: 120,
    chords: ["Em7", "Cmaj7", "Am7", "Bm7"],
    chordInst: "pad",
    chordRhythm: "x---------------",
    bassInst: "synthBass",
    bass: "1 . . 1 . . 1 . . 1 . . 5 . 8 .",
    arp: { inst: "marimba", pattern: "0 1 2 3 1 2 3 4 0 2 4 2 3 1 2 0", octave: 1 },
    drums: {
      kick: "x...x...x...x...",
      hat: "..x...x...x...x.",
      rim: "...x.....x...x..",
    },
    drumLevels: { kick: 0.7, rim: 0.6 },
    mix: { arpSend: 0.35 },
  },

  // Bossa nova: Rhodes comping, clave, shaker and a breathy flute.
  aidinkieli: {
    bpm: 68,
    chords: ["Am7", "D9", "Gmaj7", "Cmaj7", "F#m7b5", "B7", "Em7", "E7"],
    chordInst: "rhodes",
    chordRhythm: "x..x..x...x..x..",
    bassInst: "pluckBass",
    bass: "1 - - 5 - - - - 1 - - 5 - - - -",
    leadInst: "flute",
    lead: [
      "E5 - - G5 - - C6 - - - B5 - A5 - - -",
      "F#5 - - - - - - - . . . . A5 - B5 -",
      "D6 - - - B5 - - - A5 - G5 - F#5 - - -",
      "E5 - - - - - - - . . . . . . . .",
      "E5 - - A5 - - C6 - - - B5 - A5 - - -",
      "D#5 - - - - - - - F#5 - - - A5 - - -",
      "G5 - - - F#5 - - - E5 - - - - - - -",
      ". . . . . . . . . . . . . . . .",
    ],
    drums: {
      kick: "x.....x.x.....x.",
      rim: "x..x...x..x.x...",
      shaker: "xxxxxxxxxxxxxxxx",
    },
    drumLevels: { kick: 0.5, rim: 0.7 },
  },

  // Synthwave: pulsing 8th bass, shimmering arps and a gated snare.
  fysiikka: {
    bpm: 100,
    chords: ["Am", "F", "C", "G"],
    chordInst: "pad",
    chordRhythm: "x---------------",
    bassInst: "synthBass",
    bass: "1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .",
    arp: { inst: "pluck", pattern: "0 1 2 3 4 3 2 1", octave: 1 },
    leadInst: "lead",
    lead: [
      "E5 - - - - - - - D5 - C5 - - - - -",
      "A4 - - - - - - - C5 - - - - - - -",
      "G5 - - - - - - - E5 - - - D5 - - -",
      "D5 - - - - - - - B4 - - - . . . .",
    ],
    drums: {
      kick: "x.......x.......",
      snare: "....x.......x...",
      hat: "..x...x...x...x.",
    },
    mix: { drumsSend: 0.3, arp: 0.7, lead: 0.9 },
  },

  // Acid house: a squelchy resonant bassline bubbling like a beaker.
  kemia: {
    bpm: 124,
    chords: ["Am7", "Am7"],
    chordInst: "stab",
    chordRhythm: "......x.......x.",
    bassInst: "acid",
    bass: [
      "A2 . A3 . C3 A2 . G3 . A2 A3 . E3 . G3 .",
      "A2 . A3 A2 . C3 . D3 . E3 . G3 A3 . E3 .",
    ],
    drums: {
      kick: "x...x...x...x...",
      clap: "....x.......x...",
      open: "..x...x...x...x.",
      hat: "x.xxx.xxx.xxx.xx",
    },
    drumLevels: { hat: 0.45 },
    mix: { chords: 0.6 },
  },

  // Laid-back tropical marimba groove.
  biologia: {
    bpm: 104,
    chords: ["C", "Am", "Dm7", "G7"],
    chordInst: "pad",
    chordRhythm: "x---------------",
    bassInst: "pluckBass",
    bass: "1 . . 1 . . 5 . 1 . . 1 . . 5 .",
    leadInst: "marimba",
    lead: [
      "E5 . G5 . C6 . G5 . E5 . G5 . A5 - G5 -",
      "E5 . A5 . C6 . A5 . E5 . C5 . D5 - - -",
      "F5 . A5 . D6 . A5 . F5 . A5 . C6 - A5 -",
      "G5 - - - F5 - - - D5 - - - B4 - - -",
    ],
    drums: {
      kick: "x...x...x...x...",
      rim: "...x..x....x..x.",
      shaker: "x.x.x.x.x.x.x.x.",
    },
    drumLevels: { kick: 0.7 },
    mix: { chords: 0.6 },
  },

  // Baroque: harpsichord Alberti figures under a stately string line.
  historia: {
    bpm: 92,
    chords: ["Am", "Dm", "G", "C", "F", "Dm", "E", "Am"],
    arp: { inst: "harpsichord", pattern: "0 2 1 2 0 2 1 2 0 2 1 2 0 2 1 2", octave: 0 },
    bassInst: "pluckBass",
    bass: "1 - - - 5 - - - 1 - - - 5 - - -",
    leadInst: "strings",
    lead: [
      "A5 - - - E5 - - - C5 - - - E5 - - -",
      "F5 - - - D5 - - - A4 - - - D5 - - -",
      "G5 - - - D5 - - - B4 - - - D5 - - -",
      "E5 - - - C5 - - - G4 - - - C5 - - -",
      "F5 - - - A5 - - - C6 - - - A5 - - -",
      "D5 - - - F5 - - - A5 - - - F5 - - -",
      "E5 - - - G#5 - - - B5 - - - G#5 - - -",
      "A5 - - - - - - - . . . . . . . .",
    ],
    mix: { lead: 0.8, leadSend: 0.45 },
  },

  // Nu-disco: octave bass, offbeat keys and a string riff.
  musiikki: {
    bpm: 118,
    chords: ["Dm7", "G7", "Cmaj7", "A7"],
    chordInst: "rhodes",
    chordRhythm: "..x...x...x...x.",
    bassInst: "synthBass",
    bass: "1 . 8 . 1 . 8 . 1 . 8 . 1 . 8 .",
    leadInst: "strings",
    lead: [
      "A5 - . A5 . C6 - . A5 . G5 . F5 - - .",
      "G5 - - . . . . . B4 . D5 . F5 - - .",
      "E5 - . E5 . G5 - . B5 . A5 . G5 - - .",
      "C#6 - - - - - . . E5 - - - G5 - - -",
    ],
    drums: {
      kick: "x...x...x...x...",
      clap: "....x.......x...",
      open: "..x...x...x...x.",
      hat: ".x.x.x.x.x.x.x.x",
    },
    drumLevels: { hat: 0.5 },
  },

  // Dusty boom-bap with jazzy Rhodes and a vibraphone hook.
  puutyot: {
    bpm: 88,
    swing: 0.2,
    chords: ["Cm9", "Abmaj7", "Fm9", "G7"],
    chordInst: "rhodes",
    chordRhythm: "x-------..x-----",
    bassInst: "subBass",
    bass: "1 - - - - - . 1 - - 5 - - - . .",
    leadInst: "bell",
    lead: [
      ". . . . . . . . G5 - Eb5 - D5 - C5 -",
      "Eb5 - - - - - - - . . . . . . . .",
      ". . . . . . . . Ab5 - G5 - F5 - Eb5 -",
      "D5 - - - - - - - B4 - - - . . . .",
    ],
    drums: {
      kick: "x.......x.x.....",
      snare: "....x.......x...",
      hat: "x.x.x.x.x.x.x.x.",
    },
    drumLevels: { hat: 0.55 },
    mix: { leadSend: 0.4 },
  },

  // Cozy lo-fi: descending chords, soft rim and a celesta melody.
  kasityot: {
    bpm: 80,
    swing: 0.15,
    chords: ["Fmaj7", "Em7", "Dm7", "Cmaj7"],
    chordInst: "rhodes",
    chordRhythm: "x-------x-------",
    bassInst: "subBass",
    bass: "1 - - - . . . . 5 - - - . . 8 -",
    leadInst: "bell",
    lead: [
      "A5 - - - C6 - - - E6 - - - C6 - - -",
      "B5 - - - - - - - G5 - - - - - - -",
      "F5 - - - A5 - - - C6 - - - A5 - - -",
      "G5 - - - - - - - E5 - - - . . . .",
    ],
    drums: {
      kick: "x.........x.....",
      rim: "....x.......x...",
      shaker: "..x...x...x...x.",
    },
    mix: { lead: 0.7, leadSend: 0.5 },
  },

  // Globetrotting afro-pop: kalimba riff, toms and shaker.
  maantieto: {
    bpm: 108,
    chords: ["E", "C#m", "A", "B"],
    chordInst: "pad",
    chordRhythm: "x---------------",
    bassInst: "pluckBass",
    bass: "1 . . 1 . . 5 . . 5 . . 8 . 5 .",
    leadInst: "marimba",
    lead: [
      "B4 . E5 . G#5 . B5 . G#5 . E5 . F#5 . G#5 .",
      "C#5 . E5 . G#5 . C#6 . B5 . G#5 . E5 - - .",
      "A4 . C#5 . E5 . A5 . G#5 . E5 . C#5 . E5 .",
      "F#5 - - . D#5 . . B4 - - - . . . . .",
    ],
    drums: {
      kick: "x..x..x...x.....",
      rim: "..x..x..x..x.x..",
      tom: "......x.......x.",
      shaker: "xxxxxxxxxxxxxxxx",
    },
    drumLevels: { shaker: 0.7, tom: 0.7 },
    mix: { chords: 0.5 },
  },

  // 80s aerobics workout.
  terveystieto: {
    bpm: 126,
    chords: ["Am", "F", "G", "Em"],
    chordInst: "stab",
    chordRhythm: "x.....x.....x...",
    bassInst: "synthBass",
    bass: "1 . 1 8 1 . 1 8 1 . 1 8 1 . 1 8",
    leadInst: "synth80",
    lead: [
      "E5 . E5 . A5 . E5 . G5 - - . E5 . D5 .",
      "C5 - - - - - . . A4 . C5 . D5 . E5 .",
      "D5 . D5 . G5 . D5 . F5 - - . D5 . C5 .",
      "B4 - - - - - - - . . . . . . . .",
    ],
    drums: {
      kick: "x...x...x...x...",
      snare: "....x.......x...",
      clap: "....x.......x...",
      hat: "x.x.x.x.x.x.x.x.",
    },
    mix: { drumsSend: 0.2 },
  },

  // Triumphant gospel-funk finale with organ and brass.
  end: {
    bpm: 100,
    swing: 0.1,
    chords: ["Cmaj7", "Am7", "Dm7", "G7", "Em7", "A7", "Dm7", "G7"],
    chordInst: "organ",
    chordRhythm: "x--.x--.x--.x--.",
    bassInst: "pluckBass",
    bass: "1 - . 5 - . 8 . 1 - . 5 - . 6 .",
    leadInst: "brass",
    lead: [
      "G5 - - - E5 - - . G5 . C6 - - - - -",
      "B5 - A5 - G5 - E5 - - - - - . . . .",
      "F5 - - - A5 - - . F5 . D6 - - - - -",
      "C6 - B5 - A5 - G5 - - - - - . . . .",
    ],
    drums: {
      kick: "x.....x...x.....",
      snare: "....x.......x...",
      clap: "....x.......x...",
      hat: "x.x.x.x.x.x.x.x.",
      open: "..............x.",
    },
    drumLevels: { hat: 0.6 },
  },
};
