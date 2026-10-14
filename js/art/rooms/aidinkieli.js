import { INK, ol, pop, roomBase, poster, shade } from "../kit.js";

const label = (x, y, size, text, fill = "#fff") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${Math.round(size / 5.5)}" paint-order="stroke fill">${text}</text>`;

const floatingLetters = () =>
  [
    ["A", "#e2463f"],
    ["B", "#ffd23f"],
    ["C", "#3ec1d3"],
    ["D", "#7bd65b"],
    ["Ä", "#c06be0"],
    ["Ö", "#ff8f2e"],
  ]
    .map(
      ([l, c], i) => `<g class="aid-letter" style="--l:${i};transform-box:fill-box;transform-origin:50% 50%">
        ${label(510 + i * 180, i % 2 ? 225 : 190, 130, l, c)}
      </g>`
    )
    .join("");

const writingPaper = () =>
  poster(55, 100, 330, 250, {
    paper: "#ffffff",
    tilt: -3,
    content: `
      <line x1="40" y1="0" x2="40" y2="250" stroke="#f78fb3" stroke-width="4"/>
      ${Array.from({ length: 5 }, (_, i) => `<line x1="10" y1="${60 + i * 42}" x2="320" y2="${60 + i * 42}" stroke="#9cc3ea" stroke-width="3"/>`).join("")}
      <path d="M60 96 c 10 -40 30 -40 28 0 c -2 20 20 20 24 0 c 6 -36 28 -36 28 0 c 0 20 18 20 24 0 c 8 -40 30 -40 28 0 c -2 20 20 20 24 0 c 6 -30 24 -30 26 0"
        fill="none" stroke="#2f7fd8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" class="aid-ink"/>
      <g transform="translate(60 100)">
        <g class="aid-pencil-run">
          <g class="aid-pencil" style="transform-box:fill-box;transform-origin:0% 100%">
            <g transform="rotate(-40)">
              <path d="M0 0 L26 -14 L26 14Z" fill="#f2c9a0" ${ol(5)}/>
              <path d="M0 0 L9 -5 L9 5Z" fill="${INK}"/>
              <rect x="26" y="-14" width="140" height="28" fill="#ffd23f" ${ol(6)}/>
              <rect x="26" y="-14" width="140" height="9" fill="#fff" opacity="0.4"/>
              <rect x="166" y="-16" width="26" height="32" fill="#a9b2bd" ${ol(5)}/>
              <rect x="192" y="-15" width="30" height="30" rx="10" fill="#f78fb3" ${ol(6)}/>
            </g>
          </g>
        </g>
      </g>`,
  });

const book = (x, w, h, color, title) => `
  <g transform="translate(${x} 0)">
    <rect x="0" y="${-h}" width="${w}" height="${h}" rx="6" fill="${color}" ${ol(6)}/>
    <rect x="6" y="${-h + 14}" width="${w - 12}" height="10" fill="${shade(color, 0.4)}"/>
    <rect x="6" y="-28" width="${w - 12}" height="10" fill="${shade(color, 0.4)}"/>
    ${title ? `<text transform="translate(${w / 2 + 9} ${-h / 2}) rotate(-90)" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="26" fill="#fff" stroke="${INK}" stroke-width="5" paint-order="stroke fill">${title}</text>` : ""}
  </g>`;

const shelfRow = (y, books) => {
  let x = 20;
  const drawn = books
    .map(([w, h, color, title, wiggle]) => {
      const svg = book(x, w, h, color, title);
      x += w + 4;
      return wiggle ? `<g class="aid-book" style="transform-box:fill-box;transform-origin:100% 100%">${svg}</g>` : svg;
    })
    .join("");
  return `<g transform="translate(0 ${y})">${drawn}</g>`;
};

const bookshelf = () => `
  <g transform="translate(50 400)">
    <rect x="0" y="0" width="340" height="590" rx="10" fill="#a85a2a" ${ol()}/>
    <rect x="18" y="18" width="304" height="554" fill="#7a3f1c" ${ol(5)}/>
    ${shelfRow(180, [
      [44, 150, "#e2463f", "SATUJA"],
      [36, 130, "#ffd23f", null],
      [48, 160, "#2f7fd8", "RUNOJA"],
      [34, 120, "#7bd65b", null, true],
      [40, 140, "#c06be0", null],
      [46, 150, "#ff8f2e", "AAPINEN"],
    ])}
    ${shelfRow(370, [
      [52, 166, "#3ec1d3", "KALEVALA"],
      [36, 130, "#f78fb3", null],
      [40, 150, "#ffd23f", null, true],
      [46, 140, "#e2463f", "LORUJA"],
      [34, 120, "#7bd65b", null],
      [44, 160, "#2f7fd8", null],
    ])}
    ${shelfRow(560, [
      [40, 150, "#c06be0", null],
      [48, 160, "#ff8f2e", "TARINOITA"],
      [36, 128, "#3ec1d3", null],
      [44, 150, "#e2463f", null, true],
      [40, 140, "#ffd23f", null],
    ])}
    ${[180, 370, 560].map((y) => `<rect x="10" y="${y}" width="320" height="18" rx="4" fill="#c97a3f" ${ol(5)}/>`).join("")}
    <g transform="translate(272 560)"><path d="M0 0 V-60 a20 20 0 0 1 40 0 V0Z" fill="#7a8a99" ${ol(5)}/></g>
  </g>`;

const abcPoster = () =>
  poster(1545, 110, 330, 400, {
    paper: "#fff6df",
    tilt: 3,
    content: `
      ${label(95, 120, 110, "Aa", "#e2463f")}
      <g transform="translate(235 110)">
        <g class="aid-duck" style="transform-box:fill-box;transform-origin:50% 100%">
          <ellipse cx="0" cy="20" rx="56" ry="38" fill="#ffd23f" ${ol(6)}/>
          <circle cx="34" cy="-30" r="30" fill="#ffd23f" ${ol(6)}/>
          <path d="M58 -30 L88 -22 L58 -12Z" fill="#ff8f2e" ${ol(5)}/>
          <circle cx="42" cy="-36" r="6" fill="${INK}"/>
          <path d="M-20 10 q20 20 40 0" fill="none" ${ol(5)}/>
        </g>
      </g>
      ${label(165, 215, 46, "ANKKA", "#ffd23f")}
      <line x1="30" y1="245" x2="300" y2="245" stroke="${INK}" stroke-width="4" stroke-dasharray="10 10"/>
      ${label(70, 325, 54, "Ää", "#3ec1d3")}
      ${label(165, 325, 54, "Bb", "#7bd65b")}
      ${label(260, 325, 54, "Öö", "#c06be0")}
      <rect x="30" y="350" width="270" height="24" rx="8" fill="#f78fb3" ${ol(4)}/>`,
  });

const typewriter = () => `
  <g transform="translate(1530 640)">
    <rect x="40" y="250" width="290" height="40" rx="10" fill="#c97a3f" ${ol()}/>
    <rect x="70" y="290" width="26" height="60" fill="#a85a2a" ${ol(5)}/>
    <rect x="274" y="290" width="26" height="60" fill="#a85a2a" ${ol(5)}/>
    <g class="aid-carriage">
      <rect x="110" y="-10" width="150" height="110" rx="4" fill="#fff" ${ol(6)}/>
      ${[16, 36, 56].map((y, i) => `<rect class="aid-line" style="--t:${i};transform-box:fill-box;transform-origin:0% 50%" x="126" y="${y}" width="${[110, 90, 100][i]}" height="8" rx="4" fill="#a9b2bd"/>`).join("")}
      <rect x="60" y="90" width="250" height="36" rx="18" fill="#4a4f57" ${ol()}/>
      <circle cx="60" cy="108" r="22" fill="#e2463f" ${ol(6)}/>
      <circle cx="310" cy="108" r="22" fill="#e2463f" ${ol(6)}/>
      <rect x="296" y="76" width="56" height="14" rx="6" fill="#a9b2bd" ${ol(4)}/>
    </g>
    <path d="M40 130 H330 L350 250 H20Z" fill="#3ec1d3" ${ol()}/>
    <path d="M60 140 H310 L316 160 H54Z" fill="#fff" opacity="0.3"/>
    ${Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 7 - (r === 2 ? 2 : 0) }, (_, k) => {
        const x = 70 + k * 38 + r * 14 + (r === 2 ? 38 : 0);
        const y = 172 + r * 26;
        return `<g class="aid-key" style="--k:${(k * 3 + r * 5) % 7};transform-box:fill-box;transform-origin:50% 100%"><circle cx="${x}" cy="${y}" r="13" fill="#fff6df" ${ol(4)}/></g>`;
      }).join("")
    ).join("")}
    <g class="aid-ding" style="transform-box:fill-box;transform-origin:50% 50%">
      <path d="M350 40 l8 -24 l8 24 l24 8 l-24 8 l-8 24 l-8 -24 l-24 -8Z" fill="#ffd23f" ${ol(4)}/>
    </g>
  </g>`;

const style = `<style>
  .aid-letter { animation: aid-letter 3.2s ease-in-out infinite; animation-delay: calc(var(--l) * -0.5s); }
  .aid-ink { animation: aid-ink 4s linear infinite; }
  .aid-pencil-run { animation: aid-run 4s linear infinite; }
  .aid-pencil { animation: aid-wiggle 0.3s ease-in-out infinite alternate; }
  .aid-book { animation: aid-book 3.6s ease-in-out infinite; }
  .aid-duck { animation: sway-soft 2s ease-in-out infinite; }
  .aid-carriage { animation: aid-carriage 3s steps(12, end) infinite; }
  .aid-key { animation: aid-key 0.7s ease-in-out infinite; animation-delay: calc(var(--k) * -0.1s); }
  .aid-line { animation: aid-line 3s steps(6, end) infinite; animation-delay: calc(var(--t) * -1s); }
  .aid-ding { opacity: 0; animation: aid-ding 3s ease-out infinite; }
  @keyframes aid-letter { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-22px) rotate(6deg); } }
  @keyframes aid-ink { 0% { stroke-dashoffset: 100; opacity: 1; } 75% { stroke-dashoffset: 0; opacity: 1; } 92% { stroke-dashoffset: 0; opacity: 0; } 100% { stroke-dashoffset: 100; opacity: 0; } }
  @keyframes aid-run { 0% { transform: translateX(0); } 75% { transform: translateX(182px); } 92% { transform: translateX(182px); } 100% { transform: translateX(0); } }
  @keyframes aid-wiggle { from { transform: rotate(-5deg) translateY(-12px); } to { transform: rotate(4deg) translateY(8px); } }
  @keyframes aid-book { 0%, 60%, 100% { transform: rotate(0); } 70% { transform: rotate(-12deg); } 80% { transform: rotate(-4deg); } 88% { transform: rotate(-9deg); } }
  @keyframes aid-carriage { 0% { transform: translateX(20px); } 90% { transform: translateX(-30px); } 100% { transform: translateX(20px); } }
  @keyframes aid-key { 0%, 70%, 100% { transform: translateY(0); } 80% { transform: translateY(6px); } }
  @keyframes aid-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes aid-ding { 0%, 86% { opacity: 0; transform: scale(0.3) rotate(0); } 92% { opacity: 1; transform: scale(1.2) rotate(30deg); } 100% { opacity: 0; transform: scale(0.8) rotate(60deg); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#f7b9a6", floor: "#b9774a", pattern: "stripes" })}
    ${pop(0.25, floatingLetters(), "50% 50%")}
    ${pop(0.4, writingPaper(), "50% 0%")}
    ${pop(0.55, abcPoster(), "50% 0%")}
    ${pop(0.75, bookshelf())}
    ${pop(0.95, typewriter())}
  `,
};
