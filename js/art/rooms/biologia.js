import { INK, ol, pop, roomBase, poster, plant } from "../kit.js";

const BONE = "#f4f1e6";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 6)}" paint-order="stroke fill">${text}</text>`;

/** A cartoon bone with knobbly ends from (x1, y1) to (x2, y2). */
const bone = (x1, y1, x2, y2, w = 14) => `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="${w + 12}" stroke-linecap="round"/>
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round"/>
  <circle cx="${x1}" cy="${y1}" r="${w * 0.8}" fill="${BONE}" ${ol(5)}/>
  <circle cx="${x2}" cy="${y2}" r="${w * 0.8}" fill="${BONE}" ${ol(5)}/>`;

const skeleton = () => `
  <g transform="translate(200 200)">
    <rect x="-10" y="-96" width="20" height="800" rx="6" fill="#7a8a99" ${ol(6)}/>
    <path d="M0 -96 V-70" fill="none" ${ol(8)}/>
    <path d="M-90 700 H90 Q100 700 100 716 V732 H-100 V716 Q-100 700 -90 700Z" fill="#2f7fd8" ${ol()}/>
    <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 0%">
      ${bone(-60, 100, -84, 200)}${bone(-84, 200, -90, 300, 12)}
      <circle cx="-92" cy="318" r="18" fill="${BONE}" ${ol(5)}/>
      ${bone(60, 100, 120, 24)}
      <g transform="translate(120 24) rotate(18)">
        <g class="bio-wave" style="transform-box:fill-box;transform-origin:50% 100%">
          ${bone(0, 0, 0, -80, 12)}
          <path d="M-20 -96 l-10 -24 M-8 -104 l-4 -28 M8 -104 l4 -28 M20 -96 l10 -24" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
          <path d="M-20 -96 l-10 -24 M-8 -104 l-4 -28 M8 -104 l4 -28 M20 -96 l10 -24" fill="none" stroke="${BONE}" stroke-width="6" stroke-linecap="round"/>
          <circle cx="0" cy="-96" r="20" fill="${BONE}" ${ol(5)}/>
        </g>
      </g>
      ${bone(-30, 360, -44, 520)}${bone(-44, 520, -50, 680)}
      ${bone(30, 360, 44, 520)}${bone(44, 520, 50, 680)}
      <path d="M-86 694 Q-80 670 -50 676 L-40 700 H-86Z M86 694 Q80 670 50 676 L40 700 H86Z" fill="${BONE}" ${ol(5)}/>
      <path d="M-62 330 Q0 300 62 330 Q66 380 30 384 Q0 360 -30 384 Q-66 380 -62 330Z" fill="${BONE}" ${ol(6)}/>
      ${bone(0, 70, 0, 330, 16)}
      ${[0, 1, 2, 3, 4]
        .map((i) => {
          const y = 120 + i * 28;
          const w = 62 - i * 5;
          return `<path d="M0 ${y} C ${-w} ${y - 10} ${-w - 6} ${y + 30} ${-w + 14} ${y + 24} M0 ${y} C ${w} ${y - 10} ${w + 6} ${y + 30} ${w - 14} ${y + 24}" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
            <path d="M0 ${y} C ${-w} ${y - 10} ${-w - 6} ${y + 30} ${-w + 14} ${y + 24} M0 ${y} C ${w} ${y - 10} ${w + 6} ${y + 30} ${w - 14} ${y + 24}" fill="none" stroke="${BONE}" stroke-width="9" stroke-linecap="round"/>`;
        })
        .join("")}
      <path d="M-66 96 Q0 80 66 96" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>
      <path d="M-66 96 Q0 80 66 96" fill="none" stroke="${BONE}" stroke-width="12" stroke-linecap="round"/>
      <path d="M-58 0 C -58 -80 58 -80 58 0 C 58 30 44 44 34 50 V74 H-34 V50 C -44 44 -58 30 -58 0Z" fill="${BONE}" ${ol()}/>
      <ellipse cx="-22" cy="-2" rx="16" ry="19" fill="${INK}"/>
      <ellipse cx="22" cy="-2" rx="16" ry="19" fill="${INK}"/>
      <circle cx="-17" cy="-8" r="5" fill="#fff"/><circle cx="27" cy="-8" r="5" fill="#fff"/>
      <path d="M-5 30 L0 20 L5 30Z" fill="${INK}"/>
      <path d="M-24 52 V70 M-8 52 V72 M8 52 V72 M24 52 V70 M-30 52 H30" fill="none" ${ol(4)}/>
      <path d="M-40 -46 q12 -12 26 -12" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>`;

const cellPoster = () =>
  poster(540, 18, 400, 214, {
    paper: "#fff6df",
    tilt: -2,
    content: `
      <ellipse cx="150" cy="112" rx="124" ry="82" fill="#b7f08f" ${ol(6)}/>
      <ellipse cx="150" cy="112" rx="108" ry="68" fill="#d6ffb8"/>
      <circle cx="160" cy="108" r="36" fill="#a27bf0" ${ol(5)}/>
      <circle cx="170" cy="100" r="11" fill="#6b45c9" ${ol(4)}/>
      <g transform="translate(78 82) rotate(-20)"><ellipse rx="26" ry="13" fill="#ff8f2e" ${ol(4)}/><path d="M-16 0 q5 -8 10 0 t10 0 t10 0" fill="none" ${ol(3)}/></g>
      <g transform="translate(230 140) rotate(25)"><ellipse rx="24" ry="12" fill="#ff8f2e" ${ol(4)}/><path d="M-14 0 q5 -8 10 0 t10 0 t10 0" fill="none" ${ol(3)}/></g>
      ${[
        [90, 150],
        [110, 60],
        [220, 70],
        [200, 160],
        [70, 120],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#3ec1d3" ${ol(3)}/>`)
        .join("")}
      <rect x="290" y="70" width="96" height="70" rx="10" fill="#7bd65b" ${ol(6)}/>
      ${label(338, 122, 40, "SOLU")}`,
  });

const butterfly = (x, y, colors, delay) => {
  const wing = (side) => `
    <g class="bio-wing" style="transform-box:fill-box;transform-origin:${side < 0 ? "100%" : "0%"} 50%;animation-delay:${delay}s">
      <path d="M0 0 C ${side * 30} -70 ${side * 90} -60 ${side * 70} -6 C ${side * 90} 30 ${side * 50} 60 0 8Z" fill="${colors[0]}" ${ol(5)}/>
      <circle cx="${side * 44}" cy="-24" r="12" fill="${colors[1]}" ${ol(4)}/>
      <circle cx="${side * 38}" cy="26" r="7" fill="#fff" ${ol(3)}/>
    </g>`;
  return `
  <g transform="translate(${x} ${y})">
    <g class="bob" style="transform-box:fill-box;transform-origin:50% 50%;animation-delay:${delay}s">
      ${wing(-1)}${wing(1)}
      <ellipse cx="0" cy="4" rx="9" ry="34" fill="${INK}"/>
      <path d="M-3 -26 q-10 -24 -22 -26 M3 -26 q10 -24 22 -26" fill="none" ${ol(4)}/>
      <circle cx="-25" cy="-52" r="5" fill="${INK}"/><circle cx="25" cy="-52" r="5" fill="${INK}"/>
    </g>
  </g>`;
};

const fishTank = () => `
  <g transform="translate(1530 540)">
    <rect x="0" y="240" width="360" height="160" rx="10" fill="#c9822f" ${ol()}/>
    <rect x="30" y="270" width="140" height="100" rx="8" fill="#e9b86f" ${ol(5)}/>
    <rect x="190" y="270" width="140" height="100" rx="8" fill="#e9b86f" ${ol(5)}/>
    <circle cx="150" cy="320" r="8" fill="${INK}"/><circle cx="210" cy="320" r="8" fill="${INK}"/>
    <rect x="10" y="20" width="340" height="220" rx="12" fill="#5ec8f0" ${ol()}/>
    <rect x="10" y="20" width="340" height="30" fill="#bfefff" opacity="0.7"/>
    <path d="M14 204 Q90 186 180 200 T346 196 V230 Q346 236 340 236 H20 Q14 236 14 230Z" fill="#f2d39b" ${ol(5)}/>
    <g transform="translate(60 210)">
      <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 100%">
        <path d="M0 0 C -20 -40 20 -70 0 -110 C 30 -80 0 -40 12 0Z" fill="#3fa53d" ${ol(5)}/>
      </g>
    </g>
    <g transform="translate(300 210)">
      <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 100%;animation-delay:-1.2s">
        <path d="M0 0 C -24 -50 24 -80 0 -140 C 34 -90 4 -40 14 0Z" fill="#4cb84a" ${ol(5)}/>
      </g>
    </g>
    <g transform="translate(70 110)">
      <g class="bio-fish" style="transform-box:fill-box;transform-origin:50% 50%">
        <path d="M-40 0 L-66 -26 L-62 0 L-66 26Z" fill="#ff8f2e" ${ol(5)}/>
        <ellipse cx="0" cy="0" rx="46" ry="32" fill="#ff8f2e" ${ol(6)}/>
        <path d="M-6 -30 Q4 -50 22 -28" fill="#ffd23f" ${ol(5)}/>
        <path d="M-8 -28 Q-18 0 -8 28" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
        <circle cx="22" cy="-6" r="10" fill="#fff" ${ol(4)}/><circle cx="25" cy="-6" r="5" fill="${INK}"/>
        <path d="M36 12 q6 4 10 0" fill="none" ${ol(4)}/>
      </g>
    </g>
    ${[0, 1, 2, 3]
      .map((i) => `<circle class="bio-bubble" style="--k:${i}" cx="${240 + (i % 2) * 14}" cy="190" r="${7 + (i % 2) * 3}" fill="#fff" ${ol(3)}/>`)
      .join("")}
    <rect x="22" y="58" width="12" height="140" rx="6" fill="#fff" opacity="0.6"/>
    <rect x="0" y="6" width="360" height="22" rx="8" fill="#2f7fd8" ${ol(6)}/>
  </g>`;

const microscope = () => `
  <g transform="translate(1530 220)">
    <path d="M40 210 V270 L90 220Z M320 210 V270 L270 220Z" fill="#a0612a" ${ol(6)}/>
    <g transform="translate(150 0)">
      <rect x="-70" y="176" width="150" height="30" rx="10" fill="#2f7fd8" ${ol()}/>
      <path d="M40 176 V110 C 40 60 20 40 -6 30" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/>
      <path d="M40 176 V110 C 40 60 20 40 -6 30" fill="none" stroke="#2f7fd8" stroke-width="26" stroke-linecap="round"/>
      <rect x="-64" y="120" width="110" height="18" rx="6" fill="#d9dde3" ${ol(5)}/>
      <circle class="bio-light" style="transform-box:fill-box;transform-origin:50% 50%" cx="-14" cy="156" r="12" fill="#ffd23f" ${ol(4)}/>
      <g transform="rotate(-25 -20 50)">
        <rect x="-40" y="-30" width="40" height="120" rx="8" fill="#e9eef3" ${ol(6)}/>
        <rect x="-48" y="-50" width="56" height="26" rx="8" fill="#e2463f" ${ol(6)}/>
        <rect x="-32" y="90" width="24" height="24" rx="4" fill="#7a8a99" ${ol(5)}/>
        <rect x="-32" y="-20" width="8" height="90" rx="4" fill="#fff"/>
      </g>
      <circle cx="40" cy="100" r="18" fill="#7a8a99" ${ol(5)}/>
    </g>
    <g transform="translate(280 206)">
      <path d="M-28 -60 H28 V-6 Q28 0 22 0 H-22 Q-28 0 -28 -6Z" fill="#e8f7ff" ${ol(5)}/>
      <path d="M-22 -30 H22 V-8 H-22Z" fill="#7bd65b"/>
      <path d="M0 -40 C -20 -60 -10 -90 10 -96 C 14 -70 8 -54 0 -40Z" fill="#4cb84a" ${ol(4)}/>
      <rect x="-32" y="-68" width="64" height="14" rx="5" fill="#a0612a" ${ol(4)}/>
    </g>
    <rect x="0" y="200" width="360" height="26" rx="8" fill="#c9822f" ${ol()}/>
  </g>`;

const style = `<style>
  .bio-wave { animation: bio-wave 1.1s ease-in-out infinite; }
  .bio-wing { animation: bio-flap 0.35s ease-in-out infinite alternate; }
  .bio-fish { animation: bio-swim 9s ease-in-out infinite; }
  .bio-bubble { opacity: 0; animation: bio-bubble 2.4s ease-in infinite; animation-delay: calc(var(--k) * 0.6s); transform-box: fill-box; transform-origin: 50% 50%; }
  .bio-light { animation: bio-light 1.6s ease-in-out infinite; }
  @keyframes bio-wave { 0%, 100% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } }
  @keyframes bio-flap { from { transform: scaleX(1); } to { transform: scaleX(0.25); } }
  @keyframes bio-swim { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(160px) scaleX(1); } 50% { transform: translateX(160px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes bio-bubble { 0% { opacity: 0; transform: translateY(0) scale(0.4); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateY(-150px) scale(1.1); } }
  @keyframes bio-light { 0%, 100% { opacity: 0.6; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.2); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#6fc98a", floor: "#b8743a", pattern: "dots" })}
    ${pop(0.25, cellPoster(), "50% 0%")}
    ${pop(0.4, butterfly(1080, 120, ["#ff8f2e", "#ffd23f"], 0), "50% 50%")}
    ${pop(0.5, butterfly(1340, 170, ["#e05b7c", "#8fd8ff"], -0.6), "50% 50%")}
    ${pop(0.6, skeleton())}
    ${pop(0.75, microscope())}
    ${pop(0.9, plant(350, 960, 0.8))}
    ${pop(1.0, fishTank())}
  `,
};
