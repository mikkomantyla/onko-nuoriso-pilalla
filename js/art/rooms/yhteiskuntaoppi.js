import { INK, ol, pop, roomBase, poster, starPath } from "../kit.js";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 5.5)}" paint-order="stroke fill">${text}</text>`;

const bunting = () => {
  const colors = ["#2f7fd8", "#fff", "#ffd23f", "#2f7fd8", "#fff", "#e2463f"];
  const flags = Array.from({ length: 12 }, (_, i) => {
    const x = 470 + i * 84;
    const y = 34 + Math.sin((i / 11) * Math.PI) * 50;
    return `<g transform="translate(${x} ${y})">
      <g class="yht-pennant" style="--p:${i};transform-box:fill-box;transform-origin:50% 0%">
        <path d="M-32 0 H32 L0 78Z" fill="${colors[i % colors.length]}" ${ol(6)}/>
        <path d="M-20 6 H6 L-6 30Z" fill="#fff" opacity="0.35"/>
      </g>
    </g>`;
  }).join("");
  return `
  <g>
    <path d="M430 20 Q960 140 1490 20" fill="none" ${ol(7)}/>
    ${flags}
  </g>`;
};

const parliamentPoster = () =>
  poster(55, 115, 320, 400, {
    paper: "#dff0ff",
    tilt: -3,
    content: `
      <rect x="20" y="20" width="280" height="270" rx="8" fill="#8fd8ff" ${ol(5)}/>
      <circle cx="245" cy="70" r="28" fill="#ffd23f" ${ol(5)}/>
      <rect x="20" y="250" width="280" height="40" fill="#7cc957" ${ol(5)}/>
      <rect x="50" y="110" width="220" height="24" rx="4" fill="#c9c1b0" ${ol(5)}/>
      <rect x="62" y="134" width="196" height="110" fill="#e6dfcf" ${ol(5)}/>
      ${Array.from({ length: 7 }, (_, i) => `<rect x="${72 + i * 27}" y="140" width="14" height="100" rx="3" fill="#fff" ${ol(4)}/>`).join("")}
      <rect x="40" y="240" width="240" height="18" rx="4" fill="#c9c1b0" ${ol(5)}/>
      <rect x="54" y="256" width="212" height="14" rx="4" fill="#b3aa96" ${ol(4)}/>
      <rect x="110" y="92" width="100" height="20" rx="4" fill="#e6dfcf" ${ol(4)}/>
      <rect x="20" y="20" width="280" height="270" rx="8" fill="none" ${ol(5)}/>
      <rect x="30" y="306" width="260" height="70" rx="10" fill="#2f7fd8" ${ol(6)}/>
      ${label(160, 356, 40, "EDUSKUNTA")}`,
  });

const ballotBox = () => `
  <g transform="translate(70 640)">
    <g class="yht-slip" style="transform-box:fill-box;transform-origin:50% 100%">
      <rect x="112" y="-20" width="76" height="110" rx="6" fill="#fff6df" ${ol(6)}/>
      <circle cx="150" cy="20" r="18" fill="none" stroke="#e2463f" stroke-width="7"/>
      <line x1="126" y1="56" x2="174" y2="56" stroke="#a9b2bd" stroke-width="6" stroke-linecap="round"/>
      <line x1="126" y1="72" x2="164" y2="72" stroke="#a9b2bd" stroke-width="6" stroke-linecap="round"/>
    </g>
    <rect x="0" y="120" width="300" height="230" rx="14" fill="#2f7fd8" ${ol()}/>
    <rect x="0" y="120" width="300" height="30" fill="#fff" opacity="0.2"/>
    <rect x="-14" y="90" width="328" height="44" rx="10" fill="#5aa0ec" ${ol()}/>
    <rect x="95" y="104" width="110" height="14" rx="6" fill="${INK}"/>
    <g transform="translate(150 240)">
      <circle r="58" fill="#fff" ${ol(6)}/>
      <path d="M-26 0 L-6 22 L30 -24" fill="none" stroke="#7bd65b" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-26 0 L-6 22 L30 -24" fill="none" ${ol(4)} opacity="0.4"/>
    </g>
    ${label(150, 338, 34, "VAALIT")}
  </g>`;

const euFlag = () => {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `<g transform="translate(${(150 + Math.cos(a) * 66).toFixed(1)} ${(100 + Math.sin(a) * 66).toFixed(1)})">
      <path class="yht-star" style="--s:${i};transform-box:fill-box;transform-origin:50% 50%" d="${starPath(14)}" fill="#ffd23f" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    </g>`;
  }).join("");
  return `
  <g transform="translate(1560 120)">
    <rect x="8" y="12" width="300" height="200" rx="12" fill="${INK}" opacity="0.25"/>
    <rect width="300" height="200" rx="12" fill="#1f4fbf" ${ol()}/>
    <rect x="10" y="10" width="280" height="50" rx="8" fill="#fff" opacity="0.1"/>
    ${stars}
    <circle cx="40" cy="-6" r="12" fill="#e2463f" ${ol(5)}/>
    <circle cx="260" cy="-6" r="12" fill="#e2463f" ${ol(5)}/>
  </g>`;
};

const finnishFlag = () => `
  <g transform="translate(1560 380)">
    <rect x="-10" y="-20" width="20" height="610" rx="8" fill="#d9a441" ${ol(6)}/>
    <circle cx="0" cy="-30" r="18" fill="#ffd23f" ${ol(6)}/>
    <g class="yht-wave" style="transform-box:fill-box;transform-origin:0% 50%">
      <path d="M10 0 Q80 -16 150 0 T290 0 V170 Q220 154 150 170 T10 170Z" fill="#fff" ${ol(6)}/>
      <path d="M10 62 Q80 46 150 62 T290 62 V108 Q220 92 150 108 T10 108Z" fill="#1f4fbf"/>
      <path d="M78 -9 V161 Q104 158 124 164 V-4 Q100 -8 78 -9Z" fill="#1f4fbf"/>
      <path d="M10 0 Q80 -16 150 0 T290 0 V170 Q220 154 150 170 T10 170Z" fill="none" ${ol(6)}/>
    </g>
    <rect x="-34" y="580" width="68" height="26" rx="8" fill="#6b3518" ${ol(6)}/>
  </g>`;

const podium = () => `
  <g transform="translate(1630 640)">
    <g transform="translate(130 0)">
      <rect x="-6" y="0" width="12" height="90" fill="#7a8a99" ${ol(5)}/>
      <g class="yht-mic" style="transform-box:fill-box;transform-origin:50% 100%">
        <rect x="-26" y="-74" width="52" height="80" rx="26" fill="#4a4f57" ${ol(6)}/>
        ${[-50, -34, -18].map((y) => `<line x1="-20" y1="${y}" x2="20" y2="${y}" stroke="#a9b2bd" stroke-width="5" stroke-linecap="round"/>`).join("")}
        <rect x="-14" y="-66" width="8" height="30" rx="4" fill="#fff" opacity="0.4"/>
      </g>
    </g>
    <g class="yht-sound" style="transform-box:fill-box;transform-origin:0% 50%">
      <path d="M180 -60 q18 20 0 40 M200 -76 q32 36 0 72" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      <path d="M180 -60 q18 20 0 40 M200 -76 q32 36 0 72" fill="none" ${ol(3)}/>
    </g>
    <path d="M10 90 H250 L230 390 H30Z" fill="#a85a2a" ${ol()}/>
    <rect x="-4" y="80" width="268" height="36" rx="10" fill="#c97a3f" ${ol()}/>
    <circle cx="130" cy="230" r="62" fill="#ffd23f" ${ol(6)}/>
    <path d="M130 186 L142 216 H174 L148 236 L158 268 L130 248 L102 268 L112 236 L86 216 H118Z" fill="#e2463f" ${ol(4)}/>
    <rect x="30" y="140" width="40" height="230" fill="#fff" opacity="0.12"/>
  </g>`;

const style = `<style>
  .yht-pennant { animation: yht-pennant 2.6s ease-in-out infinite; animation-delay: calc(var(--p) * -0.22s); }
  .yht-slip { animation: yht-slip 3.4s ease-in infinite; }
  .yht-star { animation: twinkle 2.4s ease-in-out infinite; animation-delay: calc(var(--s) * -0.2s); }
  .yht-wave { animation: yht-wave 1.8s ease-in-out infinite; }
  .yht-mic { animation: sway-soft 2.6s ease-in-out infinite; }
  .yht-sound { animation: yht-sound 1.3s ease-out infinite; }
  @keyframes yht-pennant { 0%, 100% { transform: rotate(-7deg); } 50% { transform: rotate(7deg); } }
  @keyframes yht-slip { 0% { transform: translateY(-120px); opacity: 0; } 15% { opacity: 1; } 55% { transform: translateY(0); opacity: 1; } 80%, 100% { transform: translateY(70px); opacity: 0; } }
  @keyframes yht-wave { 0%, 100% { transform: skewY(0deg) scaleX(1); } 50% { transform: skewY(4deg) scaleX(0.94); } }
  @keyframes yht-sound { 0% { opacity: 0; transform: scale(0.6); } 40% { opacity: 1; } 100% { opacity: 0; transform: scale(1.3); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#9cc3ea", floor: "#b87a45", pattern: "stripes" })}
    ${pop(0.25, bunting(), "50% 0%")}
    ${pop(0.4, parliamentPoster(), "50% 0%")}
    ${pop(0.55, euFlag(), "50% 0%")}
    ${pop(0.7, finnishFlag())}
    ${pop(0.85, ballotBox())}
    ${pop(1.0, podium())}
  `,
};
