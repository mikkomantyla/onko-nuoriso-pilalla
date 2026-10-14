import { INK, ol, pop, roomBase, poster, shade } from "../kit.js";

const label = (x, y, text, size, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="8" paint-order="stroke fill">${text}</text>`;

// Made-up continent silhouettes, deliberately generic so no real place can be read from them.
const LANDS = [
  "M0 0 C30 -40 90 -40 110 -10 C130 20 100 50 70 60 C50 90 20 80 10 50 C-10 40 -20 20 0 0Z",
  "M0 0 C20 -20 50 -10 55 15 C60 50 40 100 20 110 C5 80 -10 40 0 0Z",
  "M0 0 C40 -30 120 -40 200 -20 C240 -10 250 30 210 50 C170 70 120 50 90 70 C60 90 20 60 0 40 C-15 25 -10 10 0 0Z",
  "M0 0 C20 -10 50 0 45 20 C40 40 10 40 0 25Z",
];

const land = (i, x, y, s, fill, width = 5) =>
  `<path d="${LANDS[i]}" transform="translate(${x} ${y}) scale(${s})" fill="${fill}" stroke="${INK}" stroke-width="${width / s}" stroke-linejoin="round"/>`;

const worldMap = () => `
  <g>
    <rect x="490" y="44" width="940" height="180" rx="6" fill="#5bb8e8" ${ol()}/>
    ${[90, 134, 178].map((y) => `<path d="M500 ${y} H1420" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" opacity="0.5"/>`).join("")}
    ${[650, 810, 970, 1130, 1290].map((x) => `<path d="M${x} 50 V218" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" opacity="0.5"/>`).join("")}
    ${land(0, 540, 90, 0.95, "#7bd65b")}
    ${land(1, 650, 150, 0.6, "#ffd23f")}
    ${land(2, 820, 90, 1.0, "#7bd65b")}
    ${land(1, 900, 150, 0.55, "#ff8f2e")}
    ${land(3, 1110, 175, 1.1, "#ffd23f")}
    ${land(0, 1230, 80, 0.8, "#b07ce8")}
    ${land(3, 1360, 190, 0.8, "#7bd65b")}
    <path d="M560 200 Q760 120 960 170 T1360 120" fill="none" stroke="#e2463f" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>
    <g class="maa-plane" style="transform-box:fill-box;transform-origin:50% 50%">
      <path d="M940 140 L1000 150 Q1012 156 1000 162 L940 166 L926 186 H912 L920 164 L894 160 L884 172 H874 L880 150 L874 130 H884 L894 142 L920 140 L912 118 H926Z" fill="#fff" ${ol(5)}/>
      <circle cx="984" cy="152" r="5" fill="#3ec1d3"/>
    </g>
    <rect x="470" y="20" width="980" height="34" rx="17" fill="#a5642c" ${ol()}/>
    <circle cx="470" cy="37" r="22" fill="#d9a441" ${ol(6)}/>
    <circle cx="1450" cy="37" r="22" fill="#d9a441" ${ol(6)}/>
    <rect x="484" y="218" width="952" height="22" rx="11" fill="#d9a441" ${ol(6)}/>
    <g class="maa-cord" style="transform-box:fill-box;transform-origin:50% 0%">
      <line x1="960" y1="240" x2="960" y2="290" ${ol(5)}/>
      <circle cx="960" cy="306" r="17" fill="none" ${ol(12)}/>
      <circle cx="960" cy="306" r="17" fill="none" stroke="#e2463f" stroke-width="6"/>
    </g>
  </g>`;

const adventurePoster = () =>
  poster(60, 120, 310, 400, {
    paper: "#fff6df",
    tilt: -3,
    content: `
      <rect x="20" y="24" width="270" height="270" rx="8" fill="#8fd8ff" ${ol(5)}/>
      <g transform="translate(220 90)">
        <g class="maa-sun" style="transform-box:fill-box;transform-origin:50% 50%">
          ${Array.from({ length: 8 }, (_, i) => `<rect x="-6" y="-58" width="12" height="22" rx="6" fill="#ffd23f" ${ol(4)} transform="rotate(${i * 45})"/>`).join("")}
          <circle r="30" fill="#ffd23f" ${ol(5)}/>
        </g>
      </g>
      <path d="M20 294 L110 120 L160 200 L200 150 L290 294Z" fill="#7a8a99" ${ol(6)}/>
      <path d="M86 166 L110 120 L134 166 L122 160 L110 172 L98 160Z" fill="#fff" ${ol(4)}/>
      <path d="M182 184 L200 150 L218 184 L208 180 L200 188 L192 180Z" fill="#fff" ${ol(4)}/>
      <path d="M20 294 C 80 250 140 270 180 260 C 230 248 270 266 290 260 V294Z" fill="#7bd65b" ${ol(5)}/>
      <path d="M150 294 l10 -26 l10 26Z M240 294 l12 -34 l12 34Z" fill="#3fa53d" ${ol(4)}/>
      ${label(155, 360, "SEIKKAILE!", 50, "#ffd23f")}`,
  });

const globe = () => {
  const lands = (dx) => `
    ${land(0, 110 + dx, 650, 1.1, "#7bd65b", 6)}
    ${land(1, 200 + dx, 740, 0.9, "#ffd23f", 6)}
    ${land(3, 290 + dx, 620, 1.2, "#ff8f2e", 6)}
    ${land(2, 300 + dx, 760, 0.55, "#7bd65b", 6)}
    ${land(3, 160 + dx, 800, 0.9, "#b07ce8", 6)}`;
  return `
  <g>
    <defs><clipPath id="maa-globe-clip"><circle cx="220" cy="720" r="125"/></clipPath></defs>
    <ellipse cx="220" cy="990" rx="120" ry="26" fill="#a5642c" ${ol()}/>
    <rect x="200" y="860" width="40" height="130" rx="10" fill="#d9a441" ${ol(6)}/>
    <circle cx="220" cy="720" r="125" fill="#5bb8e8" ${ol()}/>
    <g clip-path="url(#maa-globe-clip)">
      <g class="maa-lands">${lands(0)}${lands(360)}</g>
      <path d="M95 680 Q220 650 345 680 M95 760 Q220 790 345 760" fill="none" stroke="#fff" stroke-width="4" opacity="0.4"/>
      <path d="M260 595 A125 125 0 0 1 260 845 A160 125 0 0 0 260 595Z" fill="${INK}" opacity="0.18"/>
      <ellipse cx="170" cy="650" rx="40" ry="22" fill="#fff" opacity="0.45" transform="rotate(-30 170 650)"/>
    </g>
    <circle cx="220" cy="720" r="125" fill="none" ${ol()}/>
    <path d="M220 575 A145 145 0 0 1 220 865" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>
    <path d="M220 575 A145 145 0 0 1 220 865" fill="none" stroke="#d9a441" stroke-width="12" stroke-linecap="round"/>
    <circle cx="220" cy="575" r="12" fill="#d9a441" ${ol(5)}/>
    <circle cx="220" cy="865" r="14" fill="#d9a441" ${ol(5)}/>
  </g>`;
};

const balloon = () => `
  <g class="maa-balloon" style="transform-box:fill-box;transform-origin:50% 100%">
    <path d="M1560 230 C1500 140 1560 70 1630 70 C1700 70 1760 140 1700 230 L1660 280 H1600Z" fill="#e2463f" ${ol()}/>
    <path d="M1630 70 C1600 100 1590 180 1612 280 H1648 C1670 180 1660 100 1630 70Z" fill="#ffd23f"/>
    <path d="M1560 230 C1500 140 1560 70 1630 70 C1700 70 1760 140 1700 230 L1660 280 H1600Z" fill="none" ${ol()}/>
    <path d="M1630 70 C1600 100 1590 180 1612 280 M1630 70 C1660 100 1670 180 1648 280" fill="none" ${ol(5)}/>
    <ellipse cx="1590" cy="120" rx="14" ry="26" fill="#fff" opacity="0.5" transform="rotate(20 1590 120)"/>
    <path d="M1600 280 L1608 316 M1660 280 L1652 316" ${ol(4)}/>
    <rect x="1600" y="312" width="60" height="44" rx="8" fill="#c9822f" ${ol(6)}/>
    <path d="M1604 330 H1656" stroke="#8b5124" stroke-width="5"/>
  </g>`;

const compass = () => {
  const dirs = [["P", 0, -78], ["I", 82, 14], ["E", 0, 104], ["L", -82, 14]];
  return `
  <g transform="translate(1720 520)">
    <circle r="132" fill="#d9a441" ${ol()}/>
    <circle r="108" fill="#fff6df" ${ol(6)}/>
    <path d="M-90 -40 A100 100 0 0 1 -40 -90" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2;
      const r0 = i % 4 === 0 ? 34 : 50;
      return `<line x1="${(Math.sin(a) * r0).toFixed(1)}" y1="${(-Math.cos(a) * r0).toFixed(1)}" x2="${(Math.sin(a) * 58).toFixed(1)}" y2="${(-Math.cos(a) * 58).toFixed(1)}" stroke="${shade("#d9a441", -0.3)}" stroke-width="4"/>`;
    }).join("")}
    ${dirs.map(([t, x, y]) => label(x, y, t, 40, t === "P" ? "#e2463f" : "#fff")).join("")}
    <g class="maa-needle" style="transform-box:fill-box;transform-origin:50% 50%">
      <path d="M0 -92 L18 0 H-18Z" fill="#e2463f" ${ol(5)}/>
      <path d="M0 92 L18 0 H-18Z" fill="#fff" ${ol(5)}/>
    </g>
    <circle r="12" fill="#d9a441" ${ol(5)}/>
    <circle cx="0" cy="-142" r="18" fill="#d9a441" ${ol(6)}/>
  </g>`;
};

const backpack = () => `
  <g transform="translate(1570 700)">
    <rect x="240" y="-30" width="40" height="190" rx="14" fill="#e9eef3" ${ol(6)} transform="rotate(14 260 70)"/>
    <path d="M278 -10 l20 -30" ${ol(5)}/>
    <ellipse cx="150" cy="40" rx="140" ry="40" fill="#3fa53d" ${ol()}/>
    <path d="M20 60 C 20 20 60 10 150 10 C 240 10 280 20 280 60 V270 Q280 300 250 300 H50 Q20 300 20 270Z" fill="#ff8f2e" ${ol()}/>
    <path d="M40 40 C 60 30 100 26 150 26" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
    <ellipse cx="40" cy="40" rx="30" ry="40" fill="#5fcf55" ${ol(6)}/>
    <path d="M10 40 H70 M18 18 Q40 30 62 18 M18 62 Q40 50 62 62" fill="none" stroke="${INK}" stroke-width="4" opacity="0.5"/>
    <path d="M40 60 C 40 130 260 130 260 60 V140 Q150 170 40 140Z" fill="#e2763f" ${ol(6)}/>
    <rect x="135" y="120" width="30" height="36" rx="8" fill="#ffd23f" ${ol(5)}/>
    <rect x="70" y="180" width="160" height="96" rx="18" fill="#e2763f" ${ol(6)}/>
    <path d="M80 200 H220" stroke="#ffd23f" stroke-width="6" stroke-dasharray="10 8"/>
    <rect x="-14" y="150" width="40" height="110" rx="14" fill="#5bb8e8" ${ol(6)}/>
    <rect x="-20" y="140" width="52" height="22" rx="8" fill="#e2463f" ${ol(5)}/>
  </g>`;

const style = `<style>
  .maa-lands { animation: maa-roll 14s linear infinite; }
  .maa-needle { animation: maa-needle 3.4s ease-in-out infinite; }
  .maa-balloon { animation: maa-float 6s ease-in-out infinite; }
  .maa-plane { animation: maa-plane 7s ease-in-out infinite; }
  .maa-cord { animation: sway-soft 2.8s ease-in-out infinite; }
  .maa-sun { animation: spin 18s linear infinite; }
  @keyframes maa-roll { from { transform: translateX(0); } to { transform: translateX(-360px); } }
  @keyframes maa-needle { 0%, 100% { transform: rotate(-18deg); } 30% { transform: rotate(22deg); } 55% { transform: rotate(-6deg); } 75% { transform: rotate(9deg); } }
  @keyframes maa-float { 0%, 100% { transform: translate(0, 0) rotate(-2deg); } 50% { transform: translate(-36px, -22px) rotate(3deg); } }
  @keyframes maa-plane { 0% { opacity: 0; transform: translate(-360px, 30px) rotate(-8deg); } 15%, 85% { opacity: 1; } 50% { transform: translate(0, -10px) rotate(4deg); } 100% { opacity: 0; transform: translate(380px, -30px) rotate(-6deg); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#a9dcf5", floor: "#b8743a" })}
    ${pop(0.25, worldMap(), "50% 0%")}
    ${pop(0.45, adventurePoster(), "50% 0%")}
    ${pop(0.6, balloon(), "50% 50%")}
    ${pop(0.7, compass(), "50% 50%")}
    ${pop(0.85, globe())}
    ${pop(1.0, backpack())}
  `,
};
