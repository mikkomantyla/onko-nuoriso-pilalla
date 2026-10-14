import { INK, ol, pop, roomBase, poster, desk, starPath } from "../kit.js";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 6)}" paint-order="stroke fill">${text}</text>`;

const rocketPoster = () =>
  poster(55, 100, 320, 420, {
    paper: "#24356b",
    tilt: -3,
    content: `
      ${[
        [50, 60, 14],
        [270, 210, 12],
        [60, 260, 10],
        [120, 40, 9],
        [250, 320, 9],
      ]
        .map(
          ([x, y, r], i) => `<g transform="translate(${x} ${y})"><path class="fys-star" style="transform-box:fill-box;transform-origin:50% 50%;animation-delay:${i * 0.35}s" d="${starPath(r)}" fill="#ffd23f" ${ol(3)}/></g>`
        )
        .join("")}
      <circle cx="250" cy="95" r="40" fill="#ff8f2e" ${ol(5)}/>
      <path d="M232 70 q16 10 36 4 M226 104 q20 12 44 0" fill="none" stroke="#e2463f" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="250" cy="95" rx="70" ry="16" fill="none" ${ol(5)} transform="rotate(-18 250 95)"/>
      <g transform="translate(150 190) rotate(18)">
        <g class="fys-rocket" style="transform-box:fill-box;transform-origin:50% 50%">
          <g transform="translate(0 64)">
            <g class="fys-flame" style="transform-box:fill-box;transform-origin:50% 0%">
              <path d="M-28 0 Q0 96 28 0Z" fill="#ff8f2e" ${ol(5)}/>
              <path d="M-14 0 Q0 52 14 0Z" fill="#ffd23f"/>
            </g>
          </g>
          <path d="M-40 20 L-76 76 L-40 62Z" fill="#e2463f" ${ol(5)}/>
          <path d="M40 20 L76 76 L40 62Z" fill="#e2463f" ${ol(5)}/>
          <path d="M0 -110 C 45 -70 50 0 40 64 H -40 C -50 0 -45 -70 0 -110Z" fill="#f4f1e6" ${ol(6)}/>
          <path d="M0 -110 C 22 -96 32 -84 37 -70 H -37 C -32 -84 -22 -96 0 -110Z" fill="#e2463f" ${ol(5)}/>
          <circle cy="-24" r="22" fill="#8fd8ff" ${ol(5)}/>
          <circle cx="-7" cy="-31" r="7" fill="#fff"/>
          <rect x="-30" y="-100" width="12" height="120" rx="6" fill="#fff" opacity="0.6"/>
        </g>
      </g>
      <rect x="30" y="350" width="260" height="66" rx="10" fill="#ffd23f" ${ol(6)}/>
      ${label(160, 398, 44, "AVARUUS")}`,
  });

const paperclip = (x, y, rot = 0) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-10" y="0" width="20" height="46" rx="10" fill="none" stroke="${INK}" stroke-width="11"/>
    <rect x="-10" y="0" width="20" height="46" rx="10" fill="none" stroke="#b9c3cd" stroke-width="5"/>
    <rect x="-4" y="9" width="8" height="28" rx="4" fill="none" stroke="#b9c3cd" stroke-width="4"/>
  </g>`;

const magnetDesk = () => `
  <g>
    ${desk(30, 790, 360, { top: "#7bd65b" })}
    ${paperclip(90, 776, 80)}${paperclip(300, 774, -70)}${paperclip(250, 780, 95)}
    <g transform="translate(210 664)">
      <g class="bob" style="transform-box:fill-box;transform-origin:50% 50%">
        <path d="M-75 0 V-50 A75 75 0 0 1 75 -50 V0 H30 V-50 A30 30 0 0 0 -30 -50 V0Z" fill="#e2463f" ${ol()}/>
        <path d="M-60 -60 A60 60 0 0 1 -20 -112" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="0.6"/>
        <rect x="-75" y="-4" width="45" height="34" rx="4" fill="#d9dde3" ${ol(6)}/>
        <rect x="30" y="-4" width="45" height="34" rx="4" fill="#d9dde3" ${ol(6)}/>
        <path d="M-118 -10 q-14 20 0 40 M-140 -20 q-22 30 0 60 M118 -10 q14 20 0 40 M140 -20 q22 30 0 60" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="0.8"/>
        <g transform="translate(-52 30)">
          <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 0%">${paperclip(0, 0)}${paperclip(0, 44, 6)}</g>
        </g>
        <g transform="translate(52 30)">
          <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 0%;animation-delay:-1.4s">${paperclip(0, 0)}${paperclip(0, 44, -8)}</g>
        </g>
      </g>
    </g>
  </g>`;

const prism = () => {
  const colors = ["#e2463f", "#ff8f2e", "#ffd23f", "#7bd65b", "#3ec1d3", "#8a5cf0"];
  const bands = colors
    .map((c, i) => {
      const y0 = 118 + i * 4;
      const y1 = 40 + i * 32;
      return `<path d="M760 ${y0} L1080 ${y1} L1080 ${y1 + 32} L760 ${y0 + 4}Z" fill="${c}"/>`;
    })
    .join("");
  return `
  <g>
    <path d="M440 150 L700 118" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
    <path d="M440 150 L700 118" fill="none" stroke="#fffbe6" stroke-width="14" stroke-linecap="round"/>
    <g class="fys-rainbow" style="transform-box:fill-box;transform-origin:0% 50%">
      ${bands}
      <path d="M760 118 L1080 40 M760 146 L1080 232" fill="none" ${ol(5)}/>
    </g>
    <path d="M730 30 L640 210 H820Z" fill="#bfefff" opacity="0.85" ${ol()}/>
    <path d="M722 66 L672 170" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
  </g>`;
};

const lightBulb = () => `
  <g transform="translate(1300 0)">
    <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 0%">
      <circle class="fys-glow" style="transform-box:fill-box;transform-origin:50% 50%" cx="0" cy="150" r="112" fill="#fff6a8"/>
      <line x1="0" y1="0" x2="0" y2="70" ${ol(8)}/>
      <rect x="-24" y="66" width="48" height="44" rx="6" fill="#7a8a99" ${ol(6)}/>
      <path d="M-24 82 H24 M-24 96 H24" fill="none" ${ol(4)}/>
      <path d="M-24 110 C -70 130 -66 200 0 206 C 66 200 70 130 24 110Z" fill="#ffe45c" ${ol()}/>
      <path d="M-12 112 L-8 160 L0 146 L8 160 L12 112" fill="none" stroke="#ff8f2e" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-40 140 q-6 22 6 40" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>`;

const atom = () => {
  const orbit = (angle, dur, begin) => `
    <g transform="rotate(${angle})">
      <ellipse rx="150" ry="52" fill="none" stroke="${INK}" stroke-width="12"/>
      <ellipse rx="150" ry="52" fill="none" stroke="#fff" stroke-width="5"/>
      <circle r="15" fill="#ffd23f" ${ol(5)}>
        <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="M-150 0 A150 52 0 1 1 150 0 A150 52 0 1 1 -150 0"/>
      </circle>
    </g>`;
  const nucleus = [
    [-14, -10, "#e2463f"],
    [14, -12, "#2f7fd8"],
    [0, 12, "#e2463f"],
    [-18, 14, "#2f7fd8"],
    [18, 12, "#e2463f"],
    [0, -26, "#2f7fd8"],
  ]
    .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="18" fill="${c}" ${ol(5)}/><circle cx="${x - 6}" cy="${y - 6}" r="5" fill="#fff" opacity="0.7"/>`)
    .join("");
  return `
  <g transform="translate(1710 290)">
    <circle r="190" fill="#1d9aa8" opacity="0.35"/>
    ${orbit(0, 2.2, 0)}${orbit(60, 2.8, -0.6)}${orbit(-60, 2.5, -1.2)}
    <g class="fys-nucleus" style="transform-box:fill-box;transform-origin:50% 50%">${nucleus}</g>
    <rect x="-110" y="200" width="220" height="62" rx="10" fill="#ff8f2e" ${ol(6)}/>
    ${label(0, 246, 42, "ATOMI")}
  </g>`;
};

const pendulumStand = () => `
  <g transform="translate(1560 600)">
    <rect x="40" y="0" width="22" height="340" rx="6" fill="#7a8a99" ${ol(6)}/>
    <rect x="40" y="-6" width="190" height="22" rx="6" fill="#7a8a99" ${ol(6)}/>
    <circle cx="51" cy="5" r="16" fill="#e2463f" ${ol(5)}/>
    <g transform="translate(200 16)">
      <g class="fys-pend" style="transform-box:fill-box;transform-origin:50% 0%">
        <line x1="0" y1="0" x2="0" y2="210" ${ol(5)}/>
        <circle cx="0" cy="240" r="40" fill="#ffd23f" ${ol()}/>
        <circle cx="-12" cy="228" r="11" fill="#fff" opacity="0.75"/>
      </g>
    </g>
    <rect x="0" y="330" width="320" height="40" rx="12" fill="#2f7fd8" ${ol()}/>
    <rect x="10" y="334" width="300" height="10" rx="5" fill="#fff" opacity="0.3"/>
  </g>`;

const style = `<style>
  .fys-star { animation: twinkle 1.8s ease-in-out infinite; }
  .fys-rocket { animation: bob 1.6s ease-in-out infinite; }
  .fys-flame { animation: fys-flame 0.22s ease-in-out infinite alternate; }
  .fys-glow { animation: fys-glow 1.8s ease-in-out infinite; }
  .fys-rainbow { animation: fys-shimmer 2.6s ease-in-out infinite; }
  .fys-pend { animation: fys-swing 2s ease-in-out infinite; }
  .fys-nucleus { animation: fys-throb 1.2s ease-in-out infinite; }
  @keyframes fys-flame { from { transform: scaleY(0.7) scaleX(1.1); } to { transform: scaleY(1.2) scaleX(0.9); } }
  @keyframes fys-glow { 0%, 100% { opacity: 0.25; transform: scale(0.85); } 50% { opacity: 0.75; transform: scale(1.12); } }
  @keyframes fys-shimmer { 0%, 100% { opacity: 0.8; transform: scaleX(0.94); } 50% { opacity: 1; transform: scaleX(1.03); } }
  @keyframes fys-swing { 0%, 100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
  @keyframes fys-throb { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#56c7cf", floor: "#b8743a", pattern: "dots" })}
    ${pop(0.25, prism(), "50% 50%")}
    ${pop(0.4, lightBulb(), "50% 0%")}
    ${pop(0.55, rocketPoster(), "50% 0%")}
    ${pop(0.7, atom(), "50% 50%")}
    ${pop(0.85, magnetDesk())}
    ${pop(1.0, pendulumStand())}
  `,
};
