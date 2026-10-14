import { INK, ol, pop, roomBase, poster, shade } from "../kit.js";

const flame = (x, y, i, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="-30" rx="34" ry="40" fill="#ffd23f" opacity="0.25" class="usk-glow" style="--f:${i};transform-box:fill-box;transform-origin:50% 50%"/>
    <g class="usk-flame" style="--f:${i};transform-box:fill-box;transform-origin:50% 100%">
      <path d="M0 0 C -18 -10 -16 -34 0 -54 C 16 -34 18 -10 0 0Z" fill="#ff8f2e" ${ol(5)}/>
      <path d="M0 -6 C -8 -12 -8 -26 0 -36 C 8 -26 8 -12 0 -6Z" fill="#ffe36b"/>
    </g>
  </g>`;

const candle = (x, y, h, color, i) => `
  <g transform="translate(${x} ${y})">
    <rect x="-20" y="${-h}" width="40" height="${h}" rx="8" fill="${color}" ${ol(6)}/>
    <rect x="-12" y="${-h + 10}" width="8" height="${h - 20}" rx="4" fill="#fff" opacity="0.45"/>
    <path d="M-20 ${-h + 6} q8 14 14 0 q4 22 12 0" fill="${color}" ${ol(4)}/>
    <line x1="0" y1="${-h}" x2="0" y2="${-h - 12}" ${ol(4)}/>
    ${flame(0, -h - 8, i)}
  </g>`;

const stainedGlass = () => {
  const panes = [
    ["#e2463f", "M0 0 H70 V120 H0Z", 0],
    ["#2f7fd8", "M70 0 H140 V120 H70Z", 1],
    ["#ffd23f", "M140 0 H210 V120 H140Z", 2],
    ["#7bd65b", "M0 120 H105 V250 H0Z", 3],
    ["#c06be0", "M105 120 H210 V250 H105Z", 4],
    ["#3ec1d3", "M0 250 H70 V350 H0Z", 5],
    ["#ff8f2e", "M70 250 H140 V350 H70Z", 6],
    ["#e2463f", "M140 250 H210 V350 H140Z", 7],
  ];
  return `
  <g transform="translate(110 120)">
    <path d="M-30 460 V110 A135 135 0 0 1 240 110 V460Z" fill="#e8dcc8" ${ol()}/>
    <clipPath id="usk-arch"><path d="M0 440 V110 A105 105 0 0 1 210 110 V440Z"/></clipPath>
    <g clip-path="url(#usk-arch)">
      <rect x="0" y="0" width="210" height="440" fill="#fff6c8"/>
      <g transform="translate(0 90)">
        ${panes.map(([c, d, i]) => `<path class="usk-pane" style="--g:${i}" d="${d}" fill="${c}"/>`).join("")}
      </g>
      <circle cx="105" cy="70" r="60" fill="#ffd23f" class="usk-pane" style="--g:8"/>
      <path d="M105 22 V118 M57 70 H153" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity="0.8"/>
      <path d="M0 90 H210 M70 90 V210 M140 90 V210 M105 210 V340 M0 210 H210 M0 340 H210 M70 340 V440 M140 340 V440" fill="none" stroke="${INK}" stroke-width="8"/>
      <circle cx="105" cy="70" r="60" fill="none" stroke="${INK}" stroke-width="8"/>
    </g>
    <path d="M0 440 V110 A105 105 0 0 1 210 110 V440Z" fill="none" ${ol(9)}/>
    <rect x="-46" y="452" width="302" height="28" rx="8" fill="#c9b79a" ${ol(6)}/>
  </g>`;
};

const lightRays = () => `
  <g class="usk-rays" style="transform-box:fill-box;transform-origin:0% 0%">
    <path d="M200 380 L330 990 H470 L320 360Z" fill="#fff6c8" opacity="0.18"/>
    <path d="M140 420 L180 990 H290 L240 400Z" fill="#fff6c8" opacity="0.14"/>
  </g>`;

const candleStand = () => `
  <g transform="translate(60 700)">
    <rect x="20" y="120" width="300" height="34" rx="10" fill="#d9a441" ${ol()}/>
    <rect x="150" y="150" width="40" height="120" fill="#b8862f" ${ol(6)}/>
    <path d="M80 290 H260 L230 268 H110Z" fill="#d9a441" ${ol(6)}/>
    ${candle(70, 120, 70, "#fff6df", 0)}
    ${candle(130, 120, 110, "#ffe0f0", 1)}
    ${candle(200, 120, 90, "#fff6df", 2)}
    ${candle(270, 120, 60, "#ffe0f0", 3)}
  </g>`;

const chapelShelf = () => {
  const church = `
    <g transform="translate(0 0)">
      <rect x="-50" y="-90" width="100" height="90" fill="#fff6df" ${ol(6)}/>
      <path d="M-62 -86 L0 -140 L62 -86Z" fill="#e2463f" ${ol(6)}/>
      <rect x="30" y="-170" width="36" height="80" fill="#fff6df" ${ol(6)}/>
      <path d="M24 -166 L48 -210 L72 -166Z" fill="#e2463f" ${ol(6)}/>
      <path d="M48 -210 V-232 M38 -222 H58" ${ol(5)}/>
      <path d="M-14 0 V-36 A14 14 0 0 1 14 -36 V0Z" fill="#a85a2a" ${ol(5)}/>
      <circle cx="-26" cy="-62" r="10" fill="#ffd23f" ${ol(4)}/>
    </g>`;
  const stave = `
    <g transform="translate(330 0)">
      <rect x="-40" y="-70" width="80" height="70" fill="#a85a2a" ${ol(6)}/>
      <path d="M-56 -66 L0 -110 L56 -66Z" fill="#6b3518" ${ol(6)}/>
      <path d="M-34 -104 L0 -150 L34 -104Z" fill="#6b3518" ${ol(6)}/>
      <path d="M-18 -144 L0 -186 L18 -144Z" fill="#6b3518" ${ol(6)}/>
      <path d="M-52 -70 l-14 -16 M52 -70 l14 -16" ${ol(5)}/>
      <rect x="-12" y="-36" width="24" height="36" rx="6" fill="#ffd23f" ${ol(5)}/>
    </g>`;
  const pagoda = `
    <g transform="translate(660 0)">
      <rect x="-40" y="-60" width="80" height="60" fill="#e2463f" ${ol(6)}/>
      <path d="M-74 -54 Q0 -84 74 -54 L60 -72 H-60Z" fill="#3fa53d" ${ol(6)}/>
      <rect x="-30" y="-112" width="60" height="44" fill="#e2463f" ${ol(6)}/>
      <path d="M-60 -108 Q0 -136 60 -108 L48 -124 H-48Z" fill="#3fa53d" ${ol(6)}/>
      <rect x="-20" y="-158" width="40" height="38" fill="#e2463f" ${ol(6)}/>
      <path d="M-46 -154 Q0 -178 46 -154 L0 -196Z" fill="#3fa53d" ${ol(6)}/>
      <rect x="-12" y="-34" width="24" height="34" fill="#ffd23f" ${ol(5)}/>
    </g>`;
  return `
  <g transform="translate(520 0)">
    <rect x="-40" y="196" width="920" height="30" rx="8" fill="#c97a3f" ${ol()}/>
    <path d="M40 226 l30 30 v-30 M800 226 l-30 30 v-30" fill="#a85a2a" ${ol(5)}/>
    <g transform="translate(150 196) scale(0.8)">
      ${church}
      ${candle(165, 0, 60, "#fff6df", 4)}
      ${stave}
      ${candle(495, 0, 80, "#ffe0f0", 5)}
      ${pagoda}
    </g>
  </g>`;
};

const whalePoster = () =>
  poster(1545, 110, 340, 400, {
    paper: "#bfe9ff",
    tilt: 3,
    content: `
      <rect x="20" y="24" width="300" height="356" rx="8" fill="#5cc3f0" ${ol(5)}/>
      <path d="M20 300 Q100 280 170 300 T320 300 V380 H20Z" fill="#2f7fd8" ${ol(5)}/>
      <g class="usk-whale" style="transform-box:fill-box;transform-origin:50% 50%">
        <g class="usk-tail" style="transform-box:fill-box;transform-origin:0% 100%">
          <path d="M240 210 Q270 180 300 150 Q310 190 290 200 Q320 210 316 244 Q280 226 250 236Z" fill="#4f7fc9" ${ol(6)}/>
        </g>
        <path d="M40 220 C 40 140 120 120 180 130 C 240 140 270 190 250 236 C 230 280 150 290 100 280 C 60 272 40 250 40 220Z" fill="#4f7fc9" ${ol(6)}/>
        <path d="M60 240 C 100 270 190 272 240 236 C 220 270 150 286 100 280 C 76 276 64 262 60 240Z" fill="#cfe6ff" ${ol(5)}/>
        <path d="M70 254 h150 M80 266 h120" stroke="#9cc3ea" stroke-width="5" stroke-linecap="round"/>
        <circle cx="100" cy="196" r="14" fill="#fff" ${ol(4)}/>
        <circle cx="104" cy="198" r="7" fill="${INK}"/>
        <path d="M70 226 Q90 238 110 228" fill="none" ${ol(5)}/>
        <ellipse cx="128" cy="222" rx="12" ry="7" fill="#f78fb3" opacity="0.8"/>
        <path d="M150 140 C 150 120 170 116 180 122" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
        <path d="M140 230 Q160 250 172 224" fill="#3d68a8" ${ol(5)}/>
      </g>
      <g class="usk-spout" style="transform-box:fill-box;transform-origin:50% 100%">
        <path d="M150 124 C 140 90 110 80 96 92 M150 124 C 160 90 190 80 204 92 M150 124 V70" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
        <circle cx="96" cy="92" r="9" fill="#fff" ${ol(3)}/><circle cx="204" cy="92" r="9" fill="#fff" ${ol(3)}/><circle cx="150" cy="66" r="10" fill="#fff" ${ol(3)}/>
      </g>
      ${[0, 1, 2, 3]
        .map(
          (i) => `<circle class="usk-bubble" style="--b:${i}" cx="${50 + i * 70}" cy="${330 - (i % 2) * 20}" r="${8 + (i % 3) * 4}" fill="#fff" fill-opacity="0.75" ${ol(3)}/>`
        )
        .join("")}`,
  });

const organ = () => {
  const pipes = Array.from({ length: 9 }, (_, i) => {
    const h = 260 - Math.abs(i - 4) * 36;
    const x = 30 + i * 36;
    return `<rect x="${x}" y="${-h}" width="30" height="${h}" rx="8" fill="${i % 2 ? "#e8dcc8" : "#d9a441"}" ${ol(5)}/>
      <ellipse cx="${x + 15}" cy="${-h + 40}" rx="9" ry="5" fill="${INK}"/>`;
  }).join("");
  const notes = [0, 1, 2]
    .map(
      (i) => `<g class="usk-note" style="--n:${i}">
        <g transform="translate(${70 + i * 110} -280)">
          <path d="M0 0 V-46 L30 -54 V-8" fill="none" ${ol(6)}/>
          <ellipse cx="-8" cy="2" rx="13" ry="10" fill="${["#ffd23f", "#f78fb3", "#7bd65b"][i]}" ${ol(5)}/>
          <ellipse cx="22" cy="-6" rx="13" ry="10" fill="${["#ffd23f", "#f78fb3", "#7bd65b"][i]}" ${ol(5)}/>
        </g>
      </g>`
    )
    .join("");
  return `
  <g transform="translate(1520 860)">
    ${notes}
    ${pipes}
    <rect x="0" y="-20" width="380" height="150" rx="12" fill="#8b4a22" ${ol()}/>
    <rect x="20" y="0" width="340" height="40" rx="6" fill="#fff" ${ol(5)}/>
    ${Array.from({ length: 10 }, (_, i) => `<rect x="${34 + i * 33}" y="0" width="16" height="24" rx="3" fill="${INK}"/>`).join("")}
    <circle cx="80" cy="85" r="16" fill="#e2463f" ${ol(5)}/>
    <circle cx="130" cy="85" r="16" fill="#ffd23f" ${ol(5)}/>
    <circle cx="180" cy="85" r="16" fill="#7bd65b" ${ol(5)}/>
  </g>`;
};

const style = `<style>
  .usk-flame { animation: usk-flicker 0.9s ease-in-out infinite alternate; animation-delay: calc(var(--f) * -0.27s); }
  .usk-glow { animation: usk-glow 1.4s ease-in-out infinite alternate; animation-delay: calc(var(--f) * -0.31s); }
  .usk-pane { animation: usk-pane 3.6s ease-in-out infinite; animation-delay: calc(var(--g) * -0.45s); }
  .usk-rays { animation: usk-rays 5s ease-in-out infinite; }
  .usk-whale { animation: bob 3.2s ease-in-out infinite; }
  .usk-tail { animation: usk-tail 1.6s ease-in-out infinite; }
  .usk-spout { animation: usk-spout 3.2s ease-out infinite; }
  .usk-bubble { animation: usk-bubble 3s ease-in infinite; animation-delay: calc(var(--b) * -0.75s); transform-box: fill-box; transform-origin: 50% 50%; }
  .usk-note { animation: usk-note 3.6s ease-out infinite; animation-delay: calc(var(--n) * -1.2s); transform-box: fill-box; transform-origin: 50% 50%; }
  @keyframes usk-flicker { 0% { transform: scale(1, 1) rotate(-4deg); } 50% { transform: scale(0.9, 1.15) rotate(3deg); } 100% { transform: scale(1.05, 0.92) rotate(-2deg); } }
  @keyframes usk-glow { from { opacity: 0.15; transform: scale(0.9); } to { opacity: 0.4; transform: scale(1.15); } }
  @keyframes usk-pane { 0%, 100% { opacity: 1; } 50% { opacity: 0.62; } }
  @keyframes usk-rays { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes usk-tail { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(10deg); } }
  @keyframes usk-spout { 0%, 50% { opacity: 0; transform: scale(0.3); } 65% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.1) translateY(-14px); } }
  @keyframes usk-bubble { 0% { opacity: 0; transform: translateY(0) scale(0.6); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(-230px) scale(1.1); } }
  @keyframes usk-note { 0% { opacity: 0; transform: translate(0, 30px) rotate(-10deg); } 25% { opacity: 1; } 100% { opacity: 0; transform: translate(30px, -110px) rotate(12deg); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#b98ad6", floor: "#a8703f", pattern: "dots" })}
    ${lightRays()}
    ${pop(0.25, chapelShelf(), "50% 100%")}
    ${pop(0.4, stainedGlass(), "50% 0%")}
    ${pop(0.6, whalePoster(), "50% 0%")}
    ${pop(0.8, candleStand())}
    ${pop(0.95, organ())}
    <rect x="0" y="0" width="1920" height="1080" fill="${shade("#b98ad6", -0.5)}" opacity="0.05" pointer-events="none"/>
  `,
};
