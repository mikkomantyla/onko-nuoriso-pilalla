import { INK, ol, pop, roomBase, chalkboard, poster } from "../kit.js";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 5.5)}" paint-order="stroke fill">${text}</text>`;

const chalk = (x, y, size, text) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#f4f1e6" stroke="none">${text}</text>`;

const board = () =>
  chalkboard(
    560,
    50,
    800,
    420,
    `
    ${chalk(400, 100, 84, "a² + b² = c²")}
    <path d="M90 360 L90 180 L330 360Z"/>
    <path d="M90 330 H120 V360"/>
    ${chalk(60, 290, 50, "a")}
    ${chalk(210, 405, 50, "b")}
    ${chalk(240, 255, 50, "c")}
    ${chalk(600, 340, 130, "π")}
    <circle cx="600" cy="300" r="110" stroke-dasharray="18 14"/>
    <path d="M440 380 q20 -30 40 0 t40 0" />`
  );

const floatingSigns = () =>
  [
    ["+", 470, 110, "#ffd23f", 0],
    ["×", 480, 220, "#e2463f", 1],
    ["÷", 1450, 110, "#3ec1d3", 2],
    ["=", 1445, 220, "#c06be0", 3],
  ]
    .map(
      ([s, x, y, c, i]) => `<g class="mat-sign" style="--m:${i};transform-box:fill-box;transform-origin:50% 50%">${label(x, y, 90, s, c)}</g>`
    )
    .join("");

const protractor = () =>
  poster(55, 110, 320, 230, {
    paper: "#fff6df",
    tilt: -3,
    content: `
      <path d="M30 200 A130 130 0 0 1 290 200Z" fill="#8fd8ff" fill-opacity="0.8" ${ol(6)}/>
      <path d="M70 200 A90 90 0 0 1 250 200" fill="none" stroke="#fff" stroke-width="6" opacity="0.7"/>
      ${Array.from({ length: 19 }, (_, i) => {
        const a = Math.PI - (i / 18) * Math.PI;
        const r1 = i % 3 === 0 ? 100 : 112;
        return `<line x1="${(160 + Math.cos(a) * r1).toFixed(1)}" y1="${(200 - Math.sin(a) * r1).toFixed(1)}" x2="${(160 + Math.cos(a) * 126).toFixed(1)}" y2="${(200 - Math.sin(a) * 126).toFixed(1)}" ${ol(4)}/>`;
      }).join("")}
      <g transform="translate(160 200)">
        <g class="mat-needle" style="transform-box:fill-box;transform-origin:50% 100%">
          <path d="M-6 0 L0 -112 L6 0Z" fill="#e2463f" ${ol(4)}/>
        </g>
        <circle r="12" fill="#ffd23f" ${ol(4)}/>
      </g>`,
  });

const ruler = () => `
  <g transform="translate(70 400) rotate(-5)">
    <rect width="76" height="590" rx="10" fill="#ffd23f" ${ol()}/>
    <rect x="50" y="8" width="16" height="574" rx="6" fill="#fff" opacity="0.35"/>
    ${Array.from({ length: 28 }, (_, i) => `<line x1="0" y1="${20 + i * 20}" x2="${i % 5 === 0 ? 34 : 18}" y2="${20 + i * 20}" ${ol(4)}/>`).join("")}
    ${[1, 2, 3, 4, 5].map((n) => `<text x="52" y="${130 + (n - 1) * 100}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="30" fill="${INK}" transform="rotate(90 52 ${120 + (n - 1) * 100})">${n * 5}</text>`).join("")}
  </g>`;

const pip = (x, y, color = INK) => `<circle cx="${x}" cy="${y}" r="11" fill="${color}"/>`;

// The two visible faces must never sum to the answer of the dice question.
const die = (x, y, color, pips, i) => `
  <g transform="translate(${x} ${y})">
    <ellipse cx="0" cy="66" rx="60" ry="12" fill="${INK}" opacity="0.25" class="mat-shadow" style="--k:${i};transform-box:fill-box;transform-origin:50% 50%"/>
    <g class="mat-die" style="--k:${i};transform-box:fill-box;transform-origin:50% 50%">
      <rect x="-60" y="-60" width="120" height="120" rx="24" fill="${color}" ${ol()}/>
      <rect x="-46" y="-50" width="60" height="18" rx="9" fill="#fff" opacity="0.4"/>
      ${pips}
    </g>
  </g>`;

const dice = () => `
  <g>
    ${die(240, 900, "#fff6df", pip(-30, -30) + pip(0, 0) + pip(30, 30), 0)}
    ${die(350, 860, "#e2463f", [[-30, -30], [30, -30], [0, 0], [-30, 30], [30, 30]].map(([x, y]) => pip(x, y, "#fff")).join(""), 1)}
  </g>`;

// A square pyramid spinning in 3D, drawn as a flipbook of pre-projected frames.
const FRAMES = 24;
const PERIOD = 6;
const pyramidFrame = (f) => {
  const t = (f / FRAMES) * Math.PI * 2;
  const base = [
    [-95, 80, -95],
    [95, 80, -95],
    [95, 80, 95],
    [-95, 80, 95],
  ];
  const apex = [0, -130, 0];
  const project = ([x, y, z]) => {
    const rx = x * Math.cos(t) + z * Math.sin(t);
    const rz = -x * Math.sin(t) + z * Math.cos(t);
    return { x: rx, y: y + rz * 0.32, z: rz };
  };
  const colors = ["#e2463f", "#ffd23f", "#3ec1d3", "#7bd65b"];
  const faces = base
    .map((p, i) => {
      const pts = [p, base[(i + 1) % 4], apex].map(project);
      return { pts, z: (pts[0].z + pts[1].z) / 2, color: colors[i] };
    })
    .sort((a, b) => a.z - b.z);
  const delay = (-(f / FRAMES) * PERIOD).toFixed(3);
  return `<g class="mat-frame" style="animation-delay:${delay}s">
    ${faces
      .map(
        ({ pts, color }) =>
          `<path d="M${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L")}Z" fill="${color}" ${ol(7)}/>`
      )
      .join("")}
  </g>`;
};

const pyramid = () => `
  <g transform="translate(1720 290)">
    <ellipse cx="0" cy="150" rx="120" ry="22" fill="${INK}" opacity="0.18"/>
    <g class="mat-float" style="transform-box:fill-box;transform-origin:50% 50%">
      ${Array.from({ length: FRAMES }, (_, f) => pyramidFrame(f)).join("")}
    </g>
    ${[[-130, -120, 0], [130, -60, 1], [-120, 90, 2]]
      .map(
        ([x, y, i]) =>
          `<g transform="translate(${x} ${y})"><path class="mat-spark" style="--m:${i};transform-box:fill-box;transform-origin:50% 50%" d="M0 -22 Q4 -4 22 0 Q4 4 0 22 Q-4 4 -22 0 Q-4 -4 0 -22Z" fill="#fff" ${ol(4)}/></g>`
      )
      .join("")}
  </g>`;

const compassPaper = () =>
  poster(1550, 470, 320, 320, {
    paper: "#ffffff",
    tilt: 2,
    content: `
      ${Array.from({ length: 7 }, (_, i) => `<line x1="20" y1="${40 + i * 42}" x2="300" y2="${40 + i * 42}" stroke="#9cc3ea" stroke-width="3"/>`).join("")}
      <g transform="translate(160 175)">
        <circle r="90" fill="none" stroke="#2f7fd8" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="100 100" class="mat-arc" transform="rotate(-90)"/>
        <g class="mat-compass" style="transform-box:fill-box;transform-origin:50% 50%">
          <circle r="170" fill="none"/>
          <path d="M0 0 L36 -128" ${ol(14)}/>
          <path d="M0 0 L36 -128" stroke="#a9b2bd" stroke-width="7" stroke-linecap="round"/>
          <path d="M0 -90 L36 -128" ${ol(18)}/>
          <path d="M0 -90 L36 -128" stroke="#e2463f" stroke-width="10" stroke-linecap="round"/>
          <path d="M-4 -86 L4 -94 L-2 -84Z" fill="#ffd23f" ${ol(4)}/>
          <circle cx="36" cy="-128" r="14" fill="#ffd23f" ${ol(5)}/>
          <rect x="30" y="-162" width="12" height="24" rx="4" fill="#7a8a99" ${ol(4)}/>
          <circle cx="0" cy="0" r="6" fill="${INK}"/>
        </g>
      </g>`,
  });

const calculator = () => `
  <g transform="translate(1620 800) rotate(-4)">
    <rect width="230" height="190" rx="20" fill="#4a4f57" ${ol()}/>
    <rect x="20" y="18" width="190" height="52" rx="8" fill="#b9e6a8" ${ol(5)}/>
    <text x="196" y="58" text-anchor="end" font-family="Lilita One, sans-serif" font-size="36" fill="${INK}" class="mat-display">3,14159</text>
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${24 + (i % 4) * 48}" y="${86 + Math.floor(i / 4) * 46}" width="38" height="34" rx="8" fill="${i % 4 === 3 ? "#ff8f2e" : "#e9eef3"}" ${ol(4)}/>`).join("")}
  </g>`;

const style = `<style>
  .mat-sign { animation: mat-sign 3s ease-in-out infinite; animation-delay: calc(var(--m) * -0.7s); }
  .mat-needle { animation: mat-needle 4s ease-in-out infinite; }
  .mat-die { animation: mat-tumble 2.8s cubic-bezier(0.3, 0.6, 0.4, 1) infinite; animation-delay: calc(var(--k) * -0.5s); }
  .mat-shadow { animation: mat-shadow 2.8s cubic-bezier(0.3, 0.6, 0.4, 1) infinite; animation-delay: calc(var(--k) * -0.5s); }
  .mat-frame { opacity: 0; animation: mat-frame ${PERIOD}s steps(1, end) infinite; }
  .mat-float { animation: bob 3s ease-in-out infinite; }
  .mat-spark { animation: twinkle 1.8s ease-in-out infinite; animation-delay: calc(var(--m) * -0.6s); }
  .mat-compass { animation: mat-compass 4s ease-in-out infinite; }
  .mat-arc { animation: mat-arc 4s ease-in-out infinite; }
  @keyframes mat-sign { 0%, 100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-16px) rotate(8deg); } }
  @keyframes mat-needle { 0%, 100% { transform: rotate(-60deg); } 50% { transform: rotate(60deg); } }
  @keyframes mat-tumble { 0%, 55%, 100% { transform: translateY(0) rotate(0); } 70% { transform: translateY(-90px) rotate(45deg); } 85% { transform: translateY(0) rotate(90deg); } 92% { transform: translateY(-14px) rotate(90deg); } }
  @keyframes mat-shadow { 0%, 55%, 100% { transform: scale(1); opacity: 0.25; } 70% { transform: scale(0.6); opacity: 0.12; } 85% { transform: scale(1); opacity: 0.25; } }
  @keyframes mat-frame { 0% { opacity: 1; } ${(100 / FRAMES).toFixed(3)}%, 100% { opacity: 0; } }
  @keyframes mat-compass { 0% { transform: rotate(0); } 75%, 100% { transform: rotate(360deg); } }
  @keyframes mat-arc { 0% { stroke-dashoffset: 100; opacity: 1; } 75% { stroke-dashoffset: 0; opacity: 1; } 95% { stroke-dashoffset: 0; opacity: 0; } 100% { stroke-dashoffset: 100; opacity: 0; } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#a9e4c4", floor: "#c08a52", pattern: "dots" })}
    ${pop(0.25, board(), "50% 50%")}
    ${pop(0.4, floatingSigns(), "50% 50%")}
    ${pop(0.5, protractor(), "50% 0%")}
    ${pop(0.6, ruler())}
    ${pop(0.7, pyramid(), "50% 50%")}
    ${pop(0.8, compassPaper(), "50% 0%")}
    ${pop(0.9, calculator())}
    ${pop(1.0, dice())}
  `,
};
