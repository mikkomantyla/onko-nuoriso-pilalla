import { INK, ol, pop, roomBase, shade } from "../kit.js";

const FABRICS = ["#e2463f", "#ffd23f", "#3ec1d3", "#7bd65b", "#ff8f2e", "#b07ce8"];

/** Point on the bunting rope, a quadratic curve sagging across the top band. */
const ropeAt = (t) => ({
  x: (1 - t) ** 2 * 440 + 2 * (1 - t) * t * 960 + t ** 2 * 1480,
  y: (1 - t) ** 2 * 36 + 2 * (1 - t) * t * 150 + t ** 2 * 36,
});

const bunting = () => {
  const flags = Array.from({ length: 12 }, (_, i) => {
    const { x, y } = ropeAt((i + 0.5) / 12);
    const fill = FABRICS[i % FABRICS.length];
    const pattern =
      i % 3 === 0
        ? [-18, 0, 18].map((dx, k) => `<circle cx="${x + dx}" cy="${y + 22 + (k % 2) * 16}" r="6" fill="#fff" opacity="0.85"/>`).join("")
        : i % 3 === 1
          ? `<path d="M${x - 26} ${y + 20} H${x + 26} M${x - 16} ${y + 42} H${x + 16}" stroke="#fff" stroke-width="7" opacity="0.8"/>`
          : `<path d="M${x - 24} ${y + 12} L${x} ${y + 64} L${x + 24} ${y + 12}" fill="none" stroke="${shade(fill, -0.3)}" stroke-width="5" stroke-dasharray="10 8"/>`;
    return `<g class="kas-flag" style="--f:${i};transform-box:fill-box;transform-origin:50% 0%">
      <path d="M${x - 42} ${y} L${x + 42} ${y} L${x} ${y + 92}Z" fill="${fill}" ${ol(6)}/>
      ${pattern}
      <path d="M${x - 42} ${y} L${x + 42} ${y} L${x} ${y + 92}Z" fill="none" ${ol(6)}/>
    </g>`;
  }).join("");
  return `
  <g>
    <path d="M440 36 Q960 150 1480 36" fill="none" ${ol(6)}/>
    <circle cx="440" cy="36" r="14" fill="#e2463f" ${ol(5)}/>
    <circle cx="1480" cy="36" r="14" fill="#e2463f" ${ol(5)}/>
    ${flags}
  </g>`;
};

const knitRows = (x, y, w, h, color) =>
  Array.from({ length: Math.floor(h / 22) * Math.floor(w / 26) }, (_, i) => {
    const cols = Math.floor(w / 26);
    const cx = x + 8 + (i % cols) * 26;
    const cy = y + 6 + Math.floor(i / cols) * 22;
    return `<path d="M${cx} ${cy} l9 14 l9 -14" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join("");

const scarf = () => {
  const stripes = ["#e2463f", "#fff6df", "#3ec1d3", "#fff6df", "#e2463f", "#ffd23f"];
  return `
  <g>
    <circle cx="220" cy="118" r="12" fill="#a5642c" ${ol(5)}/>
    <path d="M220 118 L150 160 M220 118 L290 160" fill="none" ${ol(5)}/>
    <g class="kas-scarf" style="transform-box:fill-box;transform-origin:50% 0%">
      ${stripes.map((c, i) => `<rect x="140" y="${160 + i * 58}" width="160" height="58" fill="${c}"/>`).join("")}
      ${knitRows(140, 160, 160, 348, "rgba(43,26,16,0.25)")}
      <rect x="140" y="160" width="160" height="348" fill="none" ${ol(6)}/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${150 + i * 20} 508 v${36 + (i % 2) * 10}" fill="none" stroke="${stripes[i % 3 === 0 ? 0 : 2]}" stroke-width="9" stroke-linecap="round"/><path d="M${150 + i * 20} 508 v${36 + (i % 2) * 10}" fill="none" ${ol(3)} opacity="0.5"/>`).join("")}
      <rect x="70" y="146" width="300" height="16" rx="8" fill="#ffd23f" ${ol(5)} transform="rotate(-4 220 154)"/>
      <circle cx="378" cy="146" r="16" fill="#e2463f" ${ol(5)}/>
      <rect x="80" y="164" width="290" height="16" rx="8" fill="#7bd65b" ${ol(5)} transform="rotate(5 220 172)"/>
      <circle cx="72" cy="158" r="16" fill="#b07ce8" ${ol(5)}/>
    </g>
  </g>`;
};

const scissors = () => {
  const half = (fill) => `
    <path d="M-12 10 L40 -250 Q52 -262 56 -246 L22 10Z" fill="#d9dde3" ${ol(6)}/>
    <path d="M30 -200 L44 -248" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
    <path d="M-8 10 L-60 120" fill="none" ${ol(22)}/>
    <path d="M-8 10 L-60 120" fill="none" stroke="${fill}" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="-74" cy="160" rx="46" ry="54" fill="none" ${ol(30)}/>
    <ellipse cx="-74" cy="160" rx="46" ry="54" fill="none" stroke="${fill}" stroke-width="16"/>`;
  return `
  <g transform="translate(1650 380) rotate(-8)">
    <g transform="rotate(14)">${half("#e2463f")}</g>
    <g transform="scale(-1 1) rotate(14)">${half("#ff8f2e")}</g>
    <circle cx="0" cy="0" r="14" fill="#ffd23f" ${ol(5)}/>
  </g>`;
};

const tapeMeasure = () => `
  <g>
    <g class="kas-tape" style="transform-box:fill-box;transform-origin:50% 0%">
      <rect x="1806" y="200" width="40" height="360" fill="#ffd23f" ${ol(5)}/>
      ${Array.from({ length: 17 }, (_, i) => `<line x1="1806" y1="${218 + i * 20}" x2="${i % 5 === 0 ? 1830 : 1818}" y2="${218 + i * 20}" ${ol(3)}/>`).join("")}
      <rect x="1800" y="556" width="52" height="16" rx="4" fill="#a9b2bd" ${ol(5)}/>
    </g>
    <circle cx="1826" cy="170" r="62" fill="#3ec1d3" ${ol()}/>
    <circle cx="1826" cy="170" r="30" fill="#fff6df" ${ol(5)}/>
    <circle cx="1826" cy="170" r="10" fill="${INK}"/>
    <path d="M1782 136 A56 56 0 0 1 1846 116" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
  </g>`;

const pincushion = (x, y) => `
  <g transform="translate(${x} ${y})">
    ${[[-24, -50, "#3ec1d3"], [0, -62, "#ffd23f"], [22, -52, "#7bd65b"], [36, -36, "#b07ce8"]]
      .map(([px, py, c]) => `<line x1="${px * 0.4}" y1="-20" x2="${px}" y2="${py}" stroke="#a9b2bd" stroke-width="4"/><circle cx="${px}" cy="${py}" r="8" fill="${c}" ${ol(4)}/>`)
      .join("")}
    <ellipse cx="0" cy="-10" rx="46" ry="32" fill="#e2463f" ${ol(6)}/>
    <path d="M-30 -24 Q-34 0 -22 14 M0 -40 V20 M30 -24 Q34 0 22 14" fill="none" stroke="${shade("#e2463f", -0.3)}" stroke-width="4"/>
    <path d="M-16 -44 L0 -34 L16 -44 L10 -54 L0 -46 L-10 -54Z" fill="#7bd65b" ${ol(4)}/>
  </g>`;

const sewingMachine = () => {
  const body = "#5ccfb8";
  const spokes = Array.from({ length: 4 }, (_, i) => {
    const a = (i / 4) * Math.PI * 2;
    return `<line x1="0" y1="0" x2="${(Math.cos(a) * 26).toFixed(1)}" y2="${(Math.sin(a) * 26).toFixed(1)}" ${ol(5)}/>`;
  }).join("");
  return `
  <g transform="translate(20 600)">
    <rect x="22" y="268" width="30" height="140" fill="#a0612a" ${ol(6)}/>
    <rect x="348" y="268" width="30" height="140" fill="#a0612a" ${ol(6)}/>
    <rect x="0" y="230" width="400" height="44" rx="10" fill="#e9b86f" ${ol()}/>
    <rect x="0" y="230" width="400" height="12" fill="#fff" opacity="0.3"/>
    <!-- spool and thread -->
    <rect x="186" y="-34" width="34" height="50" rx="6" fill="#e2463f" ${ol(5)}/>
    <path d="M190 -20 H216 M190 -6 H216" stroke="${shade("#e2463f", -0.3)}" stroke-width="4"/>
    <path d="M200 -10 Q120 -20 96 30 L62 130" fill="none" stroke="#e2463f" stroke-width="4"/>
    <!-- body: pillar, arm and head -->
    <rect x="200" y="40" width="86" height="170" rx="16" fill="${body}" ${ol()}/>
    <rect x="18" y="10" width="272" height="78" rx="34" fill="${body}" ${ol()}/>
    <rect x="12" y="10" width="96" height="118" rx="22" fill="${body}" ${ol()}/>
    <rect x="34" y="22" width="220" height="16" rx="8" fill="#fff" opacity="0.4"/>
    <circle cx="160" cy="58" r="14" fill="#ffd23f" ${ol(5)}/>
    <rect x="218" y="120" width="50" height="50" rx="25" fill="#fff6df" ${ol(5)}/>
    <line x1="243" y1="145" x2="243" y2="126" ${ol(5)}/>
    <!-- handwheel -->
    <g transform="translate(300 64)">
      <g class="kas-wheel" style="transform-box:fill-box;transform-origin:50% 50%">
        <circle r="36" fill="#ffd23f" ${ol(6)}/>
        ${spokes}
        <circle r="10" fill="${INK}"/>
      </g>
    </g>
    <!-- base with fabric and stitches -->
    <rect x="0" y="186" width="300" height="48" rx="12" fill="${shade(body, -0.15)}" ${ol()}/>
    <path d="M-28 182 L196 174 L206 200 L-34 206Z" fill="#ffb3c7" ${ol(5)}/>
    ${[[10, 190], [60, 186], [120, 184], [170, 186]].map(([fx, fy]) => `<circle cx="${fx}" cy="${fy + 6}" r="5" fill="#fff"/>`).join("")}
    <line x1="-20" y1="194" x2="56" y2="190" stroke="#e2463f" stroke-width="5" stroke-dasharray="12 9" stroke-linecap="round"/>
    <!-- needle bar -->
    <g class="kas-needle" style="transform-box:fill-box;transform-origin:50% 0%">
      <rect x="52" y="124" width="16" height="34" rx="4" fill="#a9b2bd" ${ol(5)}/>
      <line x1="60" y1="158" x2="60" y2="182" stroke="#d9dde3" stroke-width="5" stroke-linecap="round"/>
      <line x1="60" y1="158" x2="60" y2="182" ${ol(2)}/>
    </g>
    ${pincushion(350, 232)}
  </g>`;
};

const yarnBall = (cx, cy, r, fill) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${ol(6)}/>
  <path d="M${cx - r * 0.8} ${cy - r * 0.2} Q${cx} ${cy + r * 0.5} ${cx + r * 0.75} ${cy - r * 0.45}
           M${cx - r * 0.7} ${cy + r * 0.25} Q${cx} ${cy + r * 0.9} ${cx + r * 0.85} ${cy + r * 0.05}
           M${cx - r * 0.3} ${cy - r * 0.9} Q${cx + r * 0.2} ${cy - r * 0.1} ${cx - r * 0.1} ${cy + r * 0.95}"
        fill="none" stroke="${shade(fill, -0.3)}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="${cx - r * 0.4}" cy="${cy - r * 0.45}" r="${r * 0.14}" fill="#fff" opacity="0.6"/>`;

const yarnBasket = () => `
  <g transform="translate(1540 740)">
    ${yarnBall(90, 70, 70, "#ff8fb1")}
    <g class="kas-hop" style="transform-box:fill-box;transform-origin:50% 100%">
      ${yarnBall(300, 60, 64, "#ffd23f")}
    </g>
    <line x1="130" y1="-60" x2="220" y2="110" ${ol(16)}/>
    <line x1="130" y1="-60" x2="220" y2="110" stroke="#b07ce8" stroke-width="7" stroke-linecap="round"/>
    <circle cx="128" cy="-64" r="14" fill="#e2463f" ${ol(5)}/>
    <line x1="270" y1="-40" x2="196" y2="110" ${ol(16)}/>
    <line x1="270" y1="-40" x2="196" y2="110" stroke="#3ec1d3" stroke-width="7" stroke-linecap="round"/>
    <circle cx="272" cy="-44" r="14" fill="#ffd23f" ${ol(5)}/>
    ${yarnBall(200, 60, 82, "#5c9df0")}
    <path d="M10 110 H370 L340 260 H40Z" fill="#d9a865" ${ol()}/>
    ${Array.from({ length: 3 }, (_, i) => `<path d="M${18 + i * 6} ${150 + i * 40} H${362 - i * 6}" fill="none" stroke="#a5642c" stroke-width="6"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M${50 + i * 40} 112 L${58 + i * 34} 258" fill="none" stroke="#a5642c" stroke-width="5" opacity="0.7"/>`).join("")}
    <rect x="0" y="96" width="380" height="30" rx="14" fill="#e9b86f" ${ol()}/>
    <path d="M330 120 C 360 190 300 230 250 250 C 180 270 120 250 40 268" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>
  </g>`;

const style = `<style>
  .kas-needle { animation: kas-needle 0.42s ease-in-out infinite; }
  .kas-wheel { animation: spin 0.84s linear infinite; }
  .kas-flag { animation: kas-flag 2.4s ease-in-out infinite; animation-delay: calc(var(--f) * -0.2s); }
  .kas-scarf { animation: sway-soft 4s ease-in-out infinite; }
  .kas-tape { animation: kas-tape 3s ease-in-out infinite; }
  .kas-hop { animation: kas-hop 2.6s ease-in-out infinite; }
  @keyframes kas-needle { 0%, 100% { transform: translateY(-14px); } 50% { transform: translateY(6px); } }
  @keyframes kas-flag { 0%, 100% { transform: rotate(-7deg) scaleY(1); } 50% { transform: rotate(7deg) scaleY(0.94); } }
  @keyframes kas-tape { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
  @keyframes kas-hop { 0%, 60%, 100% { transform: translateY(0) scale(1, 1); } 70% { transform: translateY(0) scale(1.08, 0.9); } 80% { transform: translateY(-46px) scale(0.95, 1.06); } 90% { transform: translateY(0) scale(1.06, 0.94); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#f7c6d4", floor: "#c98a4b", pattern: "dots" })}
    ${pop(0.25, bunting(), "50% 0%")}
    ${pop(0.45, scarf(), "50% 0%")}
    ${pop(0.6, scissors(), "50% 50%")}
    ${pop(0.7, tapeMeasure(), "50% 0%")}
    ${pop(0.85, sewingMachine())}
    ${pop(1.0, yarnBasket())}
  `,
};
