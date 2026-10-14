import { INK, ol, pop, roomBase, poster, shade } from "../kit.js";

const label = (x, y, text, size, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="8" paint-order="stroke fill">${text}</text>`;

const HEART = "M0 70 C -40 40 -90 10 -90 -30 C -90 -70 -40 -85 0 -45 C 40 -85 90 -70 90 -30 C 90 10 40 40 0 70Z";

const face = (eyeGap, eyeY, mouthY, size = 1) => `
  <circle cx="${-eyeGap}" cy="${eyeY}" r="${8 * size}" fill="${INK}"/>
  <circle cx="${eyeGap}" cy="${eyeY}" r="${8 * size}" fill="${INK}"/>
  <circle cx="${-eyeGap + 3 * size}" cy="${eyeY - 3 * size}" r="${3 * size}" fill="#fff"/>
  <circle cx="${eyeGap + 3 * size}" cy="${eyeY - 3 * size}" r="${3 * size}" fill="#fff"/>
  <path d="M${-14 * size} ${mouthY} Q0 ${mouthY + 16 * size} ${14 * size} ${mouthY}" fill="none" ${ol(5)}/>
  <ellipse cx="${-eyeGap - 14 * size}" cy="${mouthY}" rx="${10 * size}" ry="${6 * size}" fill="#ff8fb1" opacity="0.7"/>
  <ellipse cx="${eyeGap + 14 * size}" cy="${mouthY}" rx="${10 * size}" ry="${6 * size}" fill="#ff8fb1" opacity="0.7"/>`;

/** One heartbeat of a pulse trace starting at x, on baseline y. */
const beat = (x, y) =>
  `H${x + 60} l14 -14 l14 14 H${x + 120} l10 14 l16 -86 l18 118 l12 -46 H${x + 220} q20 -24 40 0`;

const pulseMonitor = () => {
  const grid = [
    ...Array.from({ length: 4 }, (_, i) => `<path d="M690 ${70 + i * 40} H1430" stroke="#2f9e6a" stroke-width="2" opacity="0.5"/>`),
    ...Array.from({ length: 18 }, (_, i) => `<path d="M${710 + i * 40} 46 V214" stroke="#2f9e6a" stroke-width="2" opacity="0.5"/>`),
  ].join("");
  const trace = `M690 140 ${beat(690, 140)} ${beat(920, 140)} ${beat(1150, 140)} H1430`;
  return `
  <g>
    <rect x="660" y="26" width="800" height="208" rx="26" fill="#d9dde3" ${ol()}/>
    <rect x="680" y="44" width="760" height="172" rx="14" fill="#123b2c" ${ol(6)}/>
    ${grid}
    <path d="${trace}" fill="none" stroke="#5fff9e" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" opacity="0.25"/>
    <path class="ter-trace" pathLength="100" d="${trace}" fill="none" stroke="#7dffb2" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="696" y="56" width="300" height="20" rx="10" fill="#fff" opacity="0.08"/>
    <g transform="translate(560 130)">
      <g class="ter-heart" style="transform-box:fill-box;transform-origin:50% 55%">
        <path d="${HEART}" fill="#e2463f" ${ol(8)}/>
        <path d="M-60 -40 C -60 -60 -40 -66 -26 -56" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
        ${face(22, -10, 14)}
      </g>
    </g>
  </g>`;
};

const platePoster = () =>
  poster(60, 120, 320, 420, {
    paper: "#fff6df",
    tilt: -3,
    content: `
      ${label(160, 70, "LAUTASMALLI", 42, "#7bd65b")}
      <circle cx="160" cy="230" r="126" fill="#d9dde3" ${ol(6)}/>
      <circle cx="160" cy="230" r="104" fill="#fff" ${ol(5)}/>
      <path d="M160 126 A104 104 0 0 0 160 334Z" fill="#b7ef9a"/>
      <path d="M160 230 L160 334 A104 104 0 0 0 250 282Z" fill="#ffe08a"/>
      <path d="M160 230 L250 282 A104 104 0 0 0 160 126Z" fill="#ffb7a1"/>
      <path d="M160 126 V334 M160 230 L250 282" fill="none" ${ol(5)}/>
      <circle cx="160" cy="230" r="104" fill="none" ${ol(5)}/>
      <g transform="translate(100 210)">
        <path d="M0 50 V10" ${ol(10)}/><path d="M0 50 V10" stroke="#7bd65b" stroke-width="5"/>
        <circle cx="-16" cy="0" r="18" fill="#3fa53d" ${ol(5)}/><circle cx="16" cy="0" r="18" fill="#3fa53d" ${ol(5)}/><circle cx="0" cy="-16" r="20" fill="#4cb84a" ${ol(5)}/>
      </g>
      <g transform="translate(120 290) rotate(-30)">
        <path d="M-10 -40 L10 -40 L0 30Z" fill="#ff8f2e" ${ol(5)}/>
        <path d="M-4 -40 l-8 -16 M4 -40 l8 -16" ${ol(5)}/>
      </g>
      <ellipse cx="200" cy="292" rx="26" ry="14" fill="#f2c26b" ${ol(4)}/>
      <path d="M190 194 q20 -18 36 4 q-8 24 -36 -4Z" fill="#e2763f" ${ol(4)}/>
      <g transform="translate(272 380)">
        <circle r="34" fill="#e2463f" ${ol(6)}/>
        <path d="M0 -32 q4 -16 14 -20" fill="none" ${ol(5)}/>
        <path d="M2 -36 q18 -18 30 -4 q-16 10 -30 4Z" fill="#7bd65b" ${ol(4)}/>
        <circle cx="-12" cy="-10" r="8" fill="#fff" opacity="0.6"/>
      </g>`,
  });

const firstAidKit = () => `
  <g transform="translate(1560 140)">
    <path d="M90 0 V-30 Q90 -46 106 -46 H174 Q190 -46 190 -30 V0" fill="none" ${ol(14)}/>
    <path d="M90 0 V-30 Q90 -46 106 -46 H174 Q190 -46 190 -30 V0" fill="none" stroke="#d9dde3" stroke-width="6"/>
    <rect x="0" y="0" width="280" height="200" rx="24" fill="#3fbf6a" ${ol()}/>
    <rect x="14" y="12" width="252" height="26" rx="12" fill="#fff" opacity="0.3"/>
    <path d="M115 50 H165 V90 H205 V140 H165 V180 H115 V140 H75 V90 H115Z" fill="#fff" ${ol(6)}/>
    <rect x="-8" y="96" width="20" height="44" rx="6" fill="#d9dde3" ${ol(5)}/>
    <g class="ter-plaster" style="transform-box:fill-box;transform-origin:50% 50%">
      <g transform="translate(250 210) rotate(-30)">
        <rect x="-50" y="-16" width="100" height="32" rx="16" fill="#f2c9a0" ${ol(5)}/>
        <rect x="-16" y="-14" width="32" height="28" rx="4" fill="#fff6df" ${ol(3)}/>
        ${[-36, -26, 26, 36].map((x) => `<circle cx="${x}" cy="0" r="3" fill="${shade("#f2c9a0", -0.3)}"/>`).join("")}
      </g>
    </g>
  </g>`;

const sleepPoster = () =>
  poster(1560, 420, 300, 260, {
    paper: "#3a3f8f",
    tilt: 3,
    content: `
      <circle cx="90" cy="110" r="56" fill="#ffd23f" ${ol(6)}/>
      <circle cx="118" cy="92" r="52" fill="#3a3f8f"/>
      <path d="M70 120 q10 8 20 0" fill="none" ${ol(5)}/>
      ${[[200, 120, 34], [230, 80, 44], [262, 40, 54]]
        .map(([x, y, s], i) => `<g class="ter-z" style="--z:${i};transform-box:fill-box;transform-origin:50% 50%">${label(x, y, "Z", s)}</g>`)
        .join("")}
      ${label(150, 228, "NUKU HYVIN", 42, "#ffd23f")}`,
  });

const toothFriend = () => `
  <g transform="translate(1580 700)">
    <ellipse cx="150" cy="300" rx="130" ry="18" fill="${INK}" opacity="0.2"/>
    <path d="M40 60 C40 0 110 -10 150 20 C190 -10 260 0 260 60 C260 140 240 180 236 250 Q232 300 206 300 Q186 300 180 260 C176 220 124 220 120 260 Q114 300 94 300 Q68 300 64 250 C60 180 40 140 40 60Z" fill="#fff" ${ol(8)}/>
    <path d="M64 50 C70 26 100 22 116 34" fill="none" stroke="#bfe9ff" stroke-width="12" stroke-linecap="round"/>
    <g transform="translate(150 110)">${face(36, 0, 34, 1.3)}</g>
    <g class="ter-brush" style="transform-box:fill-box;transform-origin:50% 50%">
      <g transform="translate(-68 219) rotate(-12)">
        <rect x="0" y="-12" width="190" height="24" rx="12" fill="#3ec1d3" ${ol(6)}/>
        <rect x="150" y="-36" width="54" height="26" rx="6" fill="#fff" ${ol(5)}/>
        ${Array.from({ length: 5 }, (_, i) => `<line x1="${156 + i * 10}" y1="-36" x2="${156 + i * 10}" y2="-14" stroke="#7ad7ff" stroke-width="4"/>`).join("")}
        <circle cx="166" cy="-46" r="12" fill="#fff" ${ol(4)}/><circle cx="186" cy="-50" r="9" fill="#fff" ${ol(4)}/>
      </g>
    </g>
    ${[[40, 150, 14], [20, 112, 10], [54, 92, 8]]
      .map(([x, y, r], i) => `<circle class="ter-bubble" style="--b:${i};transform-box:fill-box;transform-origin:50% 50%" cx="${x}" cy="${y}" r="${r}" fill="#dff6ff" ${ol(4)}/>`)
      .join("")}
  </g>`;

const gymCorner = () => `
  <g transform="translate(40 640)">
    <g transform="translate(250 230)">
      <rect x="-30" y="-40" width="60" height="130" rx="18" fill="#5bb8e8" ${ol()}/>
      <rect x="-30" y="-10" width="60" height="44" fill="#fff" ${ol(5)}/>
      <path d="M-14 6 q14 14 28 0" fill="none" stroke="#5bb8e8" stroke-width="6" stroke-linecap="round"/>
      <rect x="-20" y="-64" width="40" height="28" rx="8" fill="#e2463f" ${ol(6)}/>
      <rect x="-20" y="-30" width="10" height="100" rx="5" fill="#fff" opacity="0.4"/>
    </g>
    <g class="ter-bounce" style="transform-box:fill-box;transform-origin:50% 100%">
      <circle cx="110" cy="250" r="96" fill="#ff8fb1" ${ol()}/>
      <path d="M20 230 Q110 300 200 230 M60 168 Q110 220 160 168" fill="none" stroke="#fff" stroke-width="10" opacity="0.6"/>
      <ellipse cx="70" cy="200" rx="22" ry="14" fill="#fff" opacity="0.6" transform="rotate(-35 70 200)"/>
    </g>
    <path d="M300 346 C 330 300 370 320 350 350 C 330 380 290 360 320 330" fill="none" ${ol(12)}/>
    <path d="M300 346 C 330 300 370 320 350 350 C 330 380 290 360 320 330" fill="none" stroke="#ffd23f" stroke-width="5"/>
    <rect x="276" y="330" width="16" height="40" rx="6" fill="#e2463f" ${ol(5)} transform="rotate(-50 284 350)"/>
    <rect x="340" y="282" width="16" height="40" rx="6" fill="#e2463f" ${ol(5)} transform="rotate(30 348 302)"/>
  </g>`;

const style = `<style>
  .ter-heart { animation: ter-beat 1.1s ease-in-out infinite; }
  .ter-trace { stroke-dasharray: 22 100; animation: ter-trace 2.2s linear infinite; }
  .ter-brush { animation: ter-brush 0.5s ease-in-out infinite; }
  .ter-bubble { animation: ter-bubble 2s ease-out infinite; animation-delay: calc(var(--b) * 0.5s); }
  .ter-z { animation: ter-z 3s ease-in-out infinite; animation-delay: calc(var(--z) * 0.4s); }
  .ter-bounce { animation: ter-bounce 1.6s ease-in-out infinite; }
  .ter-plaster { animation: sway-soft 3s ease-in-out infinite; }
  @keyframes ter-beat { 0%, 40%, 100% { transform: scale(1); } 10% { transform: scale(1.16); } 20% { transform: scale(0.96); } 30% { transform: scale(1.1); } }
  @keyframes ter-trace { from { stroke-dashoffset: 22; } to { stroke-dashoffset: -100; } }
  @keyframes ter-brush { 0%, 100% { transform: translateX(-12px); } 50% { transform: translateX(14px); } }
  @keyframes ter-bubble { 0% { opacity: 0; transform: scale(0.3); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-50px) scale(1.2); } }
  @keyframes ter-z { 0%, 100% { opacity: 0.4; transform: translateY(6px) rotate(-6deg); } 50% { opacity: 1; transform: translateY(-10px) rotate(8deg); } }
  @keyframes ter-bounce { 0%, 100% { transform: translateY(0) scale(1.08, 0.9); } 15% { transform: translateY(0) scale(1); } 50% { transform: translateY(-70px) scale(0.97, 1.03); } 85% { transform: translateY(0) scale(1); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#dff5e8", floor: "#c98a4b" })}
    ${pop(0.25, pulseMonitor(), "50% 0%")}
    ${pop(0.45, platePoster(), "50% 0%")}
    ${pop(0.6, firstAidKit(), "50% 50%")}
    ${pop(0.7, sleepPoster(), "50% 0%")}
    ${pop(0.85, gymCorner())}
    ${pop(1.0, toothFriend())}
  `,
};
