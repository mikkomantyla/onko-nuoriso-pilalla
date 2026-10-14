import { INK, ol, pop, roomBase, poster, starPath, shade } from "../kit.js";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 6)}" paint-order="stroke fill">${text}</text>`;

const head = (x, y, color, s) =>
  `<ellipse cx="${x}" cy="${y}" rx="${20 * s}" ry="${14 * s}" transform="rotate(-20 ${x} ${y})" fill="${color}" ${ol(5)}/>`;

/** A single note (quarter, or eighth when `flag`) whose head sits at (x, y). */
const note = (x, y, color, { s = 1, flag = false } = {}) => `
  <line x1="${x + 17 * s}" y1="${y - 4 * s}" x2="${x + 17 * s}" y2="${y - 90 * s}" ${ol(7)}/>
  ${flag ? `<path d="M${x + 17 * s} ${y - 90 * s} q${30 * s} ${20 * s} ${22 * s} ${58 * s}" fill="none" ${ol(7)}/>` : ""}
  ${head(x, y, color, s)}`;

/** Two eighth notes joined by a beam. */
const beamed = (x, y, dx, dy, color, s = 1) => `
  <line x1="${x + 17 * s}" y1="${y - 4 * s}" x2="${x + 17 * s}" y2="${y - 90 * s}" ${ol(7)}/>
  <line x1="${x + dx + 17 * s}" y1="${y + dy - 4 * s}" x2="${x + dx + 17 * s}" y2="${y - 90 * s + dy}" ${ol(7)}/>
  <path d="M${x + 17 * s} ${y - 90 * s} L${x + dx + 17 * s} ${y - 90 * s + dy} v${16 * s} L${x + 17 * s} ${y - 74 * s}Z" fill="${INK}" ${ol(5)}/>
  ${head(x, y, color, s)}${head(x + dx, y + dy, color, s)}`;

const staffPoster = () => {
  const colors = ["#e2463f", "#2f7fd8", "#7bd65b", "#8a5cf0", "#ff8f2e", "#e05b7c"];
  const notes = [
    [150, 140, false],
    [230, 110, true],
    [400, 120, false],
    [560, 90, true],
  ];
  return poster(470, 22, 660, 206, {
    paper: "#fff6df",
    tilt: 1,
    content: `
      ${[0, 1, 2, 3, 4].map((i) => `<line x1="30" y1="${60 + i * 20}" x2="630" y2="${60 + i * 20}" stroke="${INK}" stroke-width="4"/>`).join("")}
      <line x1="30" y1="60" x2="30" y2="140" stroke="${INK}" stroke-width="6"/>
      <line x1="630" y1="60" x2="630" y2="140" stroke="${INK}" stroke-width="6"/>
      ${label(70, 98, 40, "4")}${label(70, 138, 40, "4")}
      ${notes
        .map(
          ([x, y, flag], i) =>
            `<g class="mus-dance" style="transform-box:fill-box;transform-origin:50% 100%;animation-delay:${i * 0.25}s">${note(x, y, colors[i], { s: 0.9, flag })}</g>`
        )
        .join("")}
      <g class="mus-dance" style="transform-box:fill-box;transform-origin:50% 100%;animation-delay:0.5s">${beamed(290, 130, 50, -20, colors[4], 0.9)}</g>
      <g class="mus-dance" style="transform-box:fill-box;transform-origin:50% 100%;animation-delay:1s">${beamed(460, 100, 50, 20, colors[5], 0.9)}</g>`,
  });
};

/** Notes that keep floating up and fading from a spot. */
const floatingNotes = (spots) =>
  spots
    .map(
      ([x, y, color, kind], i) => `
      <g transform="translate(${x} ${y})">
        <g class="mus-float" style="transform-box:fill-box;transform-origin:50% 50%;animation-delay:${i * 0.8}s">
          ${kind === "beam" ? beamed(0, 0, 44, -12, color, 0.8) : note(0, 0, color, { s: 0.9, flag: kind === "eighth" })}
        </g>
      </g>`
    )
    .join("");

const guitar = () => `
  <g transform="translate(240 360) rotate(18)">
    <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 0%">
      <rect x="-40" y="-330" width="80" height="80" rx="16" fill="#8b4a22" ${ol(6)}/>
      ${[-290, -265].map((y) => `<circle cx="-48" cy="${y}" r="9" fill="#d9dde3" ${ol(4)}/><circle cx="48" cy="${y}" r="9" fill="#d9dde3" ${ol(4)}/>`).join("")}
      <rect x="-18" y="-260" width="36" height="250" fill="#a85a2a" ${ol(6)}/>
      ${[-230, -200, -170, -140, -110].map((y) => `<line x1="-18" y1="${y}" x2="18" y2="${y}" stroke="#d9dde3" stroke-width="4"/>`).join("")}
      <path d="M0 -60 C 60 -60 76 -20 60 20 C 120 50 120 190 0 190 C -120 190 -120 50 -60 20 C -76 -20 -60 -60 0 -60Z" fill="#ff8f2e" ${ol()}/>
      <path d="M-70 60 C -90 100 -70 150 -30 166" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
      <circle cx="0" cy="40" r="30" fill="${INK}"/>
      <circle cx="0" cy="40" r="38" fill="none" stroke="#ffd23f" stroke-width="6"/>
      <rect x="-36" y="120" width="72" height="16" rx="5" fill="#6b3518" ${ol(4)}/>
      <g class="mus-strings" style="transform-box:fill-box;transform-origin:50% 50%">
        ${[-9, -3, 3, 9].map((x) => `<line x1="${x}" y1="-320" x2="${x}" y2="128" stroke="#f4f1e6" stroke-width="2.5"/>`).join("")}
      </g>
    </g>
    <circle cx="0" cy="-340" r="10" fill="#7a8a99" ${ol(4)}/>
  </g>`;

const piano = () => {
  const whites = Array.from({ length: 14 }, (_, i) => {
    const x = 40 + i * 25;
    return `<rect x="${x}" y="720" width="25" height="54" fill="#fff" ${ol(4)}/>
      ${i === 3 || i === 7 || i === 10 ? `<rect class="mus-key" style="animation-delay:${i * 0.15}s" x="${x + 3}" y="722" width="19" height="50" fill="${INK}"/>` : ""}`;
  }).join("");
  const blacks = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12]
    .map((i) => `<rect x="${40 + i * 25 + 17}" y="720" width="16" height="32" rx="3" fill="${INK}"/>`)
    .join("");
  return `
  <g>
    <rect x="30" y="560" width="370" height="340" rx="14" fill="#d8433b" ${ol()}/>
    <rect x="44" y="574" width="20" height="130" rx="8" fill="#fff" opacity="0.3"/>
    <rect x="16" y="544" width="398" height="34" rx="10" fill="${shade("#d8433b", -0.2)}" ${ol()}/>
    <rect x="120" y="600" width="190" height="96" rx="8" fill="#fff6df" ${ol(5)}/>
    ${[0, 1, 2, 3, 4].map((i) => `<line x1="132" y1="${620 + i * 13}" x2="298" y2="${620 + i * 13}" stroke="${INK}" stroke-width="2.5"/>`).join("")}
    ${[160, 200, 240, 276].map((x, i) => `<ellipse cx="${x}" cy="${[672, 646, 659, 633][i]}" rx="8" ry="6" fill="${INK}"/>`).join("")}
    <rect x="20" y="706" width="390" height="20" rx="6" fill="${shade("#d8433b", -0.2)}" ${ol(6)}/>
    ${whites}${blacks}
    <rect x="20" y="770" width="390" height="22" rx="6" fill="${shade("#d8433b", -0.2)}" ${ol(6)}/>
    <rect x="70" y="810" width="290" height="70" rx="10" fill="${shade("#d8433b", -0.12)}" ${ol(5)}/>
    <rect x="180" y="886" width="22" height="14" rx="4" fill="#ffd23f" ${ol(4)}/>
    <rect x="228" y="886" width="22" height="14" rx="4" fill="#ffd23f" ${ol(4)}/>
  </g>`;
};

const drum = (cx, top, w, h, color, cls, delay) => `
  <g class="${cls}" style="transform-box:fill-box;transform-origin:50% 100%;animation-delay:${delay}s">
    <path d="M${cx - w / 2} ${top} V${top + h} A${w / 2} ${w / 8} 0 0 0 ${cx + w / 2} ${top + h} V${top}Z" fill="${color}" ${ol(6)}/>
    ${[0.25, 0.5, 0.75].map((f) => `<line x1="${cx - w / 2 + w * f}" y1="${top + 8}" x2="${cx - w / 2 + w * f}" y2="${top + h + w / 10}" ${ol(4)}/>`).join("")}
    <ellipse cx="${cx}" cy="${top}" rx="${w / 2}" ry="${w / 8}" fill="#f4f1e6" ${ol(6)}/>
  </g>`;

const drumKit = () => `
  <g>
    <path d="M1830 940 L1830 640 M1795 940 L1830 760 L1870 940" fill="none" ${ol(7)}/>
    <path d="M1830 940 L1830 640" fill="none" stroke="#d9dde3" stroke-width="3"/>
    <g transform="translate(1830 636)">
      <g class="mus-cymbal" style="transform-box:fill-box;transform-origin:50% 50%">
        <ellipse rx="68" ry="16" fill="#ffd23f" ${ol(6)}/>
        <ellipse rx="40" ry="8" fill="none" stroke="#e2a020" stroke-width="5"/>
        <ellipse rx="10" ry="5" fill="${INK}"/>
      </g>
    </g>
    <path d="M1560 940 L1580 800 L1600 940" fill="none" ${ol(7)}/>
    ${drum(1580, 740, 130, 56, "#2f7fd8", "mus-hit", 0)}
    <circle cx="1720" cy="830" r="112" fill="#e2463f" ${ol()}/>
    <circle cx="1720" cy="830" r="88" fill="#f4f1e6" ${ol(6)}/>
    <g transform="translate(1720 830)">
      <path class="mus-star" style="transform-box:fill-box;transform-origin:50% 50%" d="${starPath(48)}" fill="#ffd23f" ${ol(6)}/>
    </g>
    <path d="M1650 930 L1630 950 M1790 930 L1810 950" fill="none" ${ol(10)}/>
    ${drum(1720, 668, 120, 46, "#7bd65b", "mus-hit", 0.3)}
  </g>`;

const speaker = () => `
  <g transform="translate(1600 150)">
    <rect x="70" y="-30" width="40" height="40" fill="#7a8a99" ${ol(5)}/>
    <rect x="0" y="0" width="190" height="290" rx="20" fill="#3b3f46" ${ol()}/>
    <rect x="10" y="10" width="170" height="22" rx="10" fill="#fff" opacity="0.15"/>
    ${[
      [80, 34],
      [196, 66],
    ]
      .map(
        ([cy, r], i) => `<g class="mus-thump" style="transform-box:fill-box;transform-origin:50% 50%;animation-delay:${i * 0.1}s">
          <circle cx="95" cy="${cy}" r="${r}" fill="#7a8a99" ${ol(6)}/>
          <circle cx="95" cy="${cy}" r="${r * 0.6}" fill="#ff8f2e" ${ol(5)}/>
          <circle cx="95" cy="${cy}" r="${r * 0.22}" fill="${INK}"/>
        </g>`
      )
      .join("")}
    <g class="mus-waves">
      <path d="M-24 150 q-22 46 0 92 M-50 130 q-34 66 0 132" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      <path d="M214 150 q22 46 0 92 M240 130 q34 66 0 132" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
    </g>
  </g>`;

const style = `<style>
  .mus-dance { animation: bob 1s ease-in-out infinite; }
  .mus-float { opacity: 0; animation: mus-float 4s ease-out infinite; }
  .mus-strings { animation: mus-strum 0.12s linear infinite alternate; }
  .mus-key { opacity: 0; animation: mus-key 1.6s steps(1) infinite; }
  .mus-hit { animation: mus-hit 0.5s ease-out infinite; }
  .mus-cymbal { animation: mus-cymbal 1s ease-in-out infinite; }
  .mus-star { animation: spin 8s linear infinite; }
  .mus-thump { animation: mus-thump 0.5s ease-out infinite; }
  .mus-waves { animation: mus-waves 0.5s ease-out infinite; }
  @keyframes mus-float { 0% { opacity: 0; transform: translate(0, 0) rotate(-10deg) scale(0.6); } 15% { opacity: 1; } 50% { transform: translate(24px, -90px) rotate(10deg) scale(1); } 100% { opacity: 0; transform: translate(-10px, -190px) rotate(-8deg) scale(1.1); } }
  @keyframes mus-strum { from { transform: translateX(-1.5px); } to { transform: translateX(1.5px); } }
  @keyframes mus-key { 0% { opacity: 0.3; } 25% { opacity: 0; } }
  @keyframes mus-hit { 0% { transform: scale(1.06, 0.84); } 40%, 100% { transform: scale(1, 1); } }
  @keyframes mus-cymbal { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
  @keyframes mus-thump { 0% { transform: scale(1.14); } 50%, 100% { transform: scale(1); } }
  @keyframes mus-waves { 0% { opacity: 1; } 100% { opacity: 0.1; } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#f7a556", floor: "#a76a35" })}
    ${pop(0.25, staffPoster(), "50% 0%")}
    ${pop(0.4, guitar(), "50% 0%")}
    ${pop(0.55, speaker(), "50% 0%")}
    ${pop(0.7, piano())}
    ${pop(0.85, drumKit())}
    ${pop(1.0, floatingNotes([
      [1200, 220, "#e2463f", "eighth"],
      [1320, 200, "#2f7fd8", "beam"],
      [1440, 230, "#7bd65b", "quarter"],
      [150, 560, "#8a5cf0", "eighth"],
      [300, 550, "#ffd23f", "quarter"],
    ]), "50% 50%")}
  `,
};
