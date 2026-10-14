import { INK, ol, pop, roomBase, desk, shade } from "../kit.js";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 6)}" paint-order="stroke fill">${text}</text>`;

/** A bubble that rises `rise` px and fades; `k` staggers it against its siblings. */
const bubble = (cx, cy, r, k, rise) =>
  `<circle class="kem-bubble" style="--k:${k};--rise:${-rise}px" cx="${cx}" cy="${cy}" r="${r}" fill="#fff" ${ol(3)}/>`;

const periodicTable = () => {
  const groupColor = {
    alkali: "#e2463f",
    earth: "#ff8f2e",
    nonmetal: "#7bd65b",
    metalloid: "#3ec1d3",
    metal: "#c9a6ff",
    halogen: "#ffd23f",
    noble: "#8a5cf0",
  };
  // [symbol, column (0-17), row, group]
  const tiles = [
    ["H", 0, 0, "nonmetal"],
    ["He", 17, 0, "noble"],
    ["Li", 0, 1, "alkali"],
    ["Be", 1, 1, "earth"],
    ["B", 12, 1, "metalloid"],
    ["C", 13, 1, "nonmetal"],
    ["N", 14, 1, "nonmetal"],
    ["O", 15, 1, "nonmetal"],
    ["F", 16, 1, "halogen"],
    ["Ne", 17, 1, "noble"],
    ["Na", 0, 2, "alkali"],
    ["Mg", 1, 2, "earth"],
    ["Fe", 6, 2, "metal"],
    ["Cu", 9, 2, "metal"],
    ["Al", 12, 2, "metal"],
    ["Si", 13, 2, "metalloid"],
    ["P", 14, 2, "nonmetal"],
    ["S", 15, 2, "nonmetal"],
    ["Cl", 16, 2, "halogen"],
    ["Ar", 17, 2, "noble"],
  ];
  return `
  <g transform="translate(460 22)">
    <rect x="8" y="12" width="1000" height="208" rx="12" fill="${INK}" opacity="0.25"/>
    <rect width="1000" height="208" rx="12" fill="#fff6df" ${ol()}/>
    ${tiles
      .map(([sym, col, row, group]) => {
        const x = 26 + col * 53;
        const y = 22 + row * 60;
        return `<rect x="${x}" y="${y}" width="48" height="52" rx="8" fill="${groupColor[group]}" ${ol(5)}/>
          <rect x="${x + 6}" y="${y + 5}" width="36" height="8" rx="4" fill="#fff" opacity="0.45"/>
          ${label(x + 24, y + 42, 28, sym)}`;
      })
      .join("")}
    ${label(500, 70, 44, "JAKSOLLINEN JÄRJESTELMÄ", "#7bd65b")}
    <circle cx="500" cy="10" r="13" fill="#e2463f" ${ol(5)}/>
  </g>`;
};

const jar = (x, w, h, color, text) => `
  <g transform="translate(${x} 0)">
    <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="14" fill="#e8f7ff" ${ol(6)}/>
    <rect x="${-w / 2 + 6}" y="${-h * 0.62}" width="${w - 12}" height="${h * 0.62 - 6}" rx="10" fill="${color}"/>
    <rect x="${-w / 2 - 6}" y="${-h - 22}" width="${w + 12}" height="26" rx="8" fill="${shade(color, -0.25)}" ${ol(6)}/>
    <rect x="${-w / 2 + 8}" y="${-h * 0.5}" width="${w - 16}" height="34" rx="6" fill="#fff" ${ol(4)}/>
    ${label(0, -h * 0.5 + 27, 24, text, color)}
    <rect x="${-w / 2 + 10}" y="${-h + 10}" width="10" height="${h * 0.6}" rx="5" fill="#fff" opacity="0.7"/>
  </g>`;

const goggles = () => `
  <g transform="translate(60 0)">
    <path d="M-10 30 Q90 -20 190 30" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>
    <path d="M-10 30 Q90 -20 190 30" fill="none" stroke="#2f7fd8" stroke-width="9" stroke-linecap="round"/>
    <path d="M10 30 H170 Q178 86 126 88 Q100 90 96 62 H84 Q80 90 54 88 Q2 86 10 30Z" fill="#8fd8ff" opacity="0.9" ${ol(6)}/>
    <path d="M28 42 l18 26 M118 42 l18 26" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
  </g>`;

const shelf = () => `
  <g transform="translate(30 330)">
    <path d="M40 0 V60 L90 10Z M320 0 V60 L270 10Z" fill="#a0612a" ${ol(6)}/>
    <g transform="translate(0 -6)">
      ${jar(80, 76, 110, "#2f7fd8", "NaCl")}
      ${jar(180, 70, 150, "#e05b7c", "!")}
      ${jar(285, 84, 96, "#7bd65b", "C")}
    </g>
    <rect x="0" y="-10" width="370" height="26" rx="8" fill="#c9822f" ${ol()}/>
          </g>`;

const bunsenDesk = () => `
  <g>
    ${desk(30, 800, 360, { top: "#e9eef3" })}
    <g transform="translate(262 748) scale(0.6)">${goggles()}</g>
    <g transform="translate(180 0)">
      <path d="M-60 800 L-34 640 M60 800 L34 640 M0 800 V700" fill="none" ${ol(8)}/>
      <path d="M-60 800 L-34 640 M60 800 L34 640" fill="none" stroke="#7a8a99" stroke-width="3"/>
      <rect x="-70" y="632" width="140" height="16" rx="6" fill="#7a8a99" ${ol(5)}/>
      <ellipse cx="0" cy="792" rx="46" ry="12" fill="#7a8a99" ${ol(5)}/>
      <rect x="-12" y="706" width="24" height="86" rx="4" fill="#d9dde3" ${ol(5)}/>
      <g transform="translate(0 706)">
        <g class="kem-flame" style="transform-box:fill-box;transform-origin:50% 100%">
          <path d="M-22 0 Q-30 -34 0 -62 Q30 -34 22 0Z" fill="#3ec1d3" ${ol(5)}/>
          <path d="M-10 0 Q-12 -20 0 -38 Q12 -20 10 0Z" fill="#e8f7ff"/>
        </g>
      </g>
      <rect x="-20" y="468" width="40" height="96" rx="6" fill="#e8f7ff" ${ol(6)}/>
      <circle cx="0" cy="584" r="62" fill="#e8f7ff" ${ol(6)}/>
      <path d="M-58 600 Q0 586 58 600 A62 62 0 0 1 -58 600Z" fill="#ff6fb5"/>
      <circle cx="0" cy="584" r="62" fill="none" ${ol(6)}/>
      <rect x="-26" y="460" width="52" height="16" rx="6" fill="#e8f7ff" ${ol(5)}/>
      <path d="M-40 560 a44 44 0 0 1 20 -30" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      ${bubble(-18, 628, 8, 0, 40)}${bubble(14, 636, 6, 1, 50)}${bubble(-2, 620, 7, 2, 34)}
      ${[0, 1, 2]
        .map((i) => `<circle class="kem-puff" style="--k:${i}" cx="${-8 + i * 10}" cy="450" r="${20 + i * 4}" fill="#ffd7ec" ${ol(4)}/>`)
        .join("")}
    </g>
  </g>`;

const tubeRack = () => {
  const tubes = [
    ["#e2463f", 110],
    ["#2f7fd8", 140],
    ["#7bd65b", 95],
    ["#8a5cf0", 125],
  ];
  return `
  <g>
    ${tubes
      .map(([c, fill], i) => {
        const x = 1580 + i * 50;
        return `<g>
          <path d="M${x - 17} 610 V752 A17 17 0 0 0 ${x + 17} 752 V610Z" fill="#e8f7ff" ${ol(5)}/>
          <path d="M${x - 12} ${770 - fill} V752 A12 12 0 0 0 ${x + 12} 752 V${770 - fill}Z" fill="${c}"/>
          ${bubble(x - 3, 756, 5, i * 0.7, 60)}${bubble(x + 4, 748, 4, i * 0.7 + 1.2, 50)}
          <rect x="${x - 23}" y="600" width="46" height="14" rx="5" fill="#e8f7ff" ${ol(5)}/>
          <rect x="${x - 10}" y="622" width="7" height="110" rx="3" fill="#fff" opacity="0.8"/>
        </g>`;
      })
      .join("")}
    <rect x="1545" y="736" width="210" height="30" rx="8" fill="#e9b86f" ${ol(6)}/>
    <rect x="1555" y="766" width="18" height="34" fill="#c9822f" ${ol(5)}/>
    <rect x="1727" y="766" width="18" height="34" fill="#c9822f" ${ol(5)}/>
  </g>`;
};

const erlenmeyer = () => `
  <g transform="translate(1830 0)">
    <path d="M-22 600 V666 L-72 790 Q-74 800 -62 800 H62 Q74 800 72 790 L22 666 V600Z" fill="#e8f7ff" ${ol(6)}/>
    <path d="M-50 736 H50 L68 788 Q68 794 60 794 H-60 Q-68 794 -68 788Z" fill="#ff8f2e"/>
    <path d="M-22 600 V666 L-72 790 Q-74 800 -62 800 H62 Q74 800 72 790 L22 666 V600Z" fill="none" ${ol(6)}/>
    <path d="M-30 700 L-48 750" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
    <g transform="translate(0 600)">
      <g class="kem-foam" style="transform-box:fill-box;transform-origin:50% 100%">
        <path d="M-28 0 C -50 -10 -46 -44 -20 -42 C -18 -70 18 -70 22 -44 C 48 -48 52 -10 28 0Z" fill="#ffd7a8" ${ol(6)}/>
        <circle cx="-8" cy="-40" r="7" fill="#fff"/>
      </g>
    </g>
    ${[0, 1, 2]
      .map((i) => `<circle class="kem-puff" style="--k:${i}" cx="${-6 + i * 8}" cy="540" r="${22 + i * 4}" fill="#fff" ${ol(4)}/>`)
      .join("")}
  </g>`;

const molecule = () => {
  const arms = [
    [0, -120, "#e2463f"],
    [110, 50, "#fff"],
    [-110, 50, "#fff"],
    [0, 110, "#2f7fd8"],
  ];
  return `
  <g transform="translate(1700 320)">
    <line x1="0" y1="-240" x2="0" y2="-150" ${ol(5)}/>
    <g class="kem-spin" style="transform-box:fill-box;transform-origin:50% 50%">
      ${arms.map(([x, y]) => `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><line x1="0" y1="0" x2="${x}" y2="${y}" stroke="#d9dde3" stroke-width="12" stroke-linecap="round"/>`).join("")}
      ${arms.map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="36" fill="${c}" ${ol(6)}/><circle cx="${x - 12}" cy="${y - 12}" r="10" fill="#fff" opacity="0.7"/>`).join("")}
      <circle r="52" fill="#3b3f46" ${ol(6)}/>
      <circle cx="-16" cy="-16" r="13" fill="#fff" opacity="0.5"/>
    </g>
  </g>`;
};

const style = `<style>
  .kem-bubble { opacity: 0; animation: kem-bubble 1.8s ease-in infinite; animation-delay: calc(var(--k) * 0.45s); transform-box: fill-box; transform-origin: 50% 50%; }
  .kem-flame { animation: kem-flame 0.18s ease-in-out infinite alternate; }
  .kem-puff { opacity: 0; animation: kem-puff 3s ease-out infinite; animation-delay: calc(var(--k) * 1s); transform-box: fill-box; transform-origin: 50% 50%; }
  .kem-foam { animation: kem-foam 1.4s ease-in-out infinite; }
  .kem-spin { animation: spin 16s linear infinite; }
  @keyframes kem-bubble { 0% { opacity: 0; transform: translateY(0) scale(0.4); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(var(--rise)) scale(1.1); } }
  @keyframes kem-flame { from { transform: scale(0.9, 0.8) rotate(-3deg); } to { transform: scale(1.05, 1.15) rotate(3deg); } }
  @keyframes kem-puff { 0% { opacity: 0; transform: translate(0, 0) scale(0.3); } 20% { opacity: 1; } 100% { opacity: 0; transform: translate(30px, -150px) scale(1.4); } }
  @keyframes kem-foam { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.12, 0.88); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#b6e36b", floor: "#a76a35" })}
    ${pop(0.25, periodicTable(), "50% 0%")}
    ${pop(0.45, shelf())}
    ${pop(0.6, molecule(), "50% 0%")}
    ${pop(0.75, bunsenDesk())}
    ${pop(0.9, `${desk(1520, 800, 370, { top: "#e9eef3" })}${tubeRack()}`)}
    ${pop(1.0, erlenmeyer())}
  `,
};
