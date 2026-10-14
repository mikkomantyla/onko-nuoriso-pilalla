import { INK, ol, pop, roomBase, poster } from "../kit.js";

const pegboard = () => {
  const holes = Array.from({ length: 6 * 26 }, (_, i) => {
    const x = 30 + (i % 26) * 40;
    const y = 26 + Math.floor(i / 26) * 32;
    return `<circle cx="${x}" cy="${y}" r="5" fill="#a77a45"/>`;
  }).join("");
  return `
  <g transform="translate(420 30)">
    <rect width="1080" height="210" rx="12" fill="#d9a865" ${ol()}/>
    ${holes}
    <!-- hammer -->
    <g transform="translate(110 30) rotate(-12)">
      <rect x="-9" y="20" width="18" height="140" rx="6" fill="#c9822f" ${ol(5)}/>
      <path d="M-50 0 H40 Q55 0 55 16 V30 H-40 Q-55 30 -55 16Z" fill="#7a8a99" ${ol(6)}/>
    </g>
    <!-- hand saw -->
    <g transform="translate(300 40)">
      <path d="M0 0 H200 L230 120 H20Z" fill="#d9dde3" ${ol(6)}/>
      <path d="M20 120 ${Array.from({ length: 11 }, (_, i) => `l10 14 l10 -14`).join(" ")}" fill="#d9dde3" ${ol(4)}/>
      <path d="M-70 -10 H20 V70 H-70Z" rx="20" fill="#e2463f" ${ol(6)}/>
      <ellipse cx="-25" cy="30" rx="22" ry="18" fill="#d9a865" ${ol(5)}/>
    </g>
    <!-- chisels -->
    ${[0, 1, 2]
      .map(
        (i) => `<g transform="translate(${640 + i * 60} 30)">
          <rect x="-14" y="0" width="28" height="70" rx="8" fill="${["#2f7fd8", "#ffd23f", "#7bd65b"][i]}" ${ol(5)}/>
          <rect x="-8" y="70" width="16" height="${70 + i * 10}" fill="#d9dde3" ${ol(5)}/>
        </g>`
      )
      .join("")}
    <!-- wrench -->
    <g transform="translate(880 40) rotate(20)">
      <rect x="-12" y="20" width="24" height="130" rx="10" fill="#7a8a99" ${ol(5)}/>
      <path d="M-34 0 a34 34 0 1 1 68 0 l-14 0 l-6 -18 h-28 l-6 18Z" fill="#7a8a99" ${ol(5)}/>
    </g>
    <!-- folding rule -->
    <g transform="translate(990 30)">
      <rect x="-14" y="0" width="28" height="160" fill="#ffd23f" ${ol(5)}/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="-14" y1="${20 + i * 20}" x2="0" y2="${20 + i * 20}" ${ol(3)}/>`).join("")}
    </g>
  </g>`;
};

const workbench = () => `
  <g transform="translate(20 640)">
    <rect x="30" y="80" width="34" height="290" fill="#a0612a" ${ol()}/>
    <rect x="330" y="80" width="34" height="290" fill="#a0612a" ${ol()}/>
    <rect x="30" y="250" width="334" height="30" fill="#a0612a" ${ol(6)}/>
    <rect x="0" y="40" width="400" height="60" rx="8" fill="#e9b86f" ${ol()}/>
    <rect x="0" y="40" width="400" height="14" fill="#fff" opacity="0.25"/>
    <!-- vise -->
    <rect x="300" y="60" width="90" height="70" rx="8" fill="#e2763f" ${ol(6)}/>
    <rect x="360" y="85" width="80" height="16" rx="6" fill="#7a8a99" ${ol(5)}/>
    <circle cx="444" cy="93" r="14" fill="#7a8a99" ${ol(5)}/>
    <!-- plank on bench and the plane on top of it -->
    <rect x="40" y="10" width="250" height="32" rx="4" fill="#f2d39b" ${ol(6)}/>
    <path d="M70 26 q40 -8 80 0 t80 0" fill="none" stroke="#c9822f" stroke-width="4"/>
    <g class="wood-plane" style="transform-box:fill-box;transform-origin:50% 100%">
      <path d="M80 10 L90 -40 H210 L230 10Z" fill="#c9822f" ${ol(6)}/>
      <path d="M120 -40 Q130 -90 170 -84 Q160 -60 160 -40Z" fill="#e2463f" ${ol(6)}/>
      <circle cx="205" cy="-48" r="14" fill="#e2463f" ${ol(5)}/>
    </g>
    <!-- wood shavings -->
    ${[0, 1, 2]
      .map(
        (i) => `<path class="shaving" style="--s:${i}" d="M${260 + i * 26} ${-5 - i * 10} c 20 -20 50 -10 40 10 c -8 16 -30 10 -24 -4" fill="#f7deb0" ${ol(4)}/>`
      )
      .join("")}
  </g>`;

const tableSaw = () => `
  <g transform="translate(1500 660)">
    <g transform="translate(200 70)">
      <g class="saw-blade" style="transform-box:fill-box;transform-origin:50% 50%">
        <path d="${Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r = i % 2 === 0 ? 100 : 84;
          return `${i === 0 ? "M" : "L"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
        }).join(" ")}Z" fill="#d9dde3" ${ol(6)}/>
        <circle r="56" fill="none" stroke="#a9b2bd" stroke-width="6"/>
        <circle r="18" fill="#7a8a99" ${ol(5)}/>
        <rect x="-4" y="-80" width="8" height="40" fill="#a9b2bd"/>
      </g>
    </g>
    <rect x="40" y="110" width="320" height="250" rx="14" fill="#2f7fd8" ${ol()}/>
    <rect x="40" y="110" width="320" height="30" fill="#fff" opacity="0.2"/>
    <rect x="70" y="170" width="120" height="70" rx="10" fill="#ffd23f" ${ol(6)}/>
    <circle cx="300" cy="210" r="30" fill="#e2463f" ${ol(6)}/>
    <rect x="270" y="200" width="60" height="20" rx="4" fill="#fff" ${ol(3)}/>
    <rect x="60" y="360" width="30" height="40" fill="${INK}"/>
    <rect x="310" y="360" width="30" height="40" fill="${INK}"/>
    <rect x="0" y="80" width="400" height="40" rx="8" fill="#e9eef3" ${ol()}/>
    <rect x="0" y="80" width="400" height="12" fill="#fff" opacity="0.6"/>
    <g class="sawdust">
      ${Array.from({ length: 6 }, (_, i) => `<circle class="dust" style="--k:${i}" cx="${110 + i * 8}" cy="70" r="${7 + (i % 3) * 3}" fill="#f2d39b" ${ol(3)}/>`).join("")}
    </g>
  </g>`;

const safetyPoster = () =>
  poster(60, 120, 320, 400, {
    paper: "#ffd23f",
    tilt: 3,
    content: `
      <text x="160" y="80" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="46" fill="#fff" stroke="${INK}" stroke-width="8" paint-order="stroke fill">SUOJALASIT</text>
      <text x="160" y="130" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="46" fill="#e2463f" stroke="${INK}" stroke-width="8" paint-order="stroke fill">PÄÄHÄN!</text>
      <circle cx="160" cy="260" r="100" fill="#f2c9a0" ${ol(6)}/>
      <path d="M70 240 H250 Q256 290 210 292 Q180 294 170 266 H150 Q140 294 110 292 Q64 290 70 240Z" fill="#8fd8ff" ${ol(6)}/>
      <circle cx="115" cy="262" r="10" fill="${INK}"/><circle cx="205" cy="262" r="10" fill="${INK}"/>
      <path d="M125 320 Q160 345 195 320" fill="none" ${ol(6)}/>
      <path d="M80 190 Q160 130 240 190" fill="#c9822f" ${ol(6)}/>`,
  });

const plankStack = () => `
  <g transform="translate(1620 120)">
    ${["#f2d39b", "#e9b86f", "#d9a865"]
      .map((c, i) => `<rect x="${i * 70}" y="${i * 10}" width="54" height="420" rx="6" fill="${c}" ${ol(6)} transform="rotate(${-6 + i * 3} 27 420)"/>`)
      .join("")}
  </g>`;

const style = `<style>
  .saw-blade { animation: spin 0.9s linear infinite; }
  .wood-plane { animation: wood-plane 2.2s ease-in-out infinite; }
  .shaving { animation: shaving 2.2s ease-out infinite; animation-delay: calc(var(--s) * 0.2s); transform-box: fill-box; transform-origin: 50% 50%; }
  .dust { animation: dust 1.2s ease-out infinite; animation-delay: calc(var(--k) * 0.2s); transform-box: fill-box; transform-origin: 50% 50%; }
  @keyframes wood-plane { 0%, 100% { transform: translateX(-30px); } 50% { transform: translateX(40px); } }
  @keyframes shaving { 0%, 40% { opacity: 0; transform: translate(0, 0) scale(0.4); } 50% { opacity: 1; } 100% { opacity: 0; transform: translate(60px, -80px) rotate(160deg) scale(1); } }
  @keyframes dust { 0% { opacity: 1; transform: translate(0, 0) scale(0.5); } 100% { opacity: 0; transform: translate(calc(-120px - var(--k) * 30px), calc(-60px + var(--k) * 18px)) scale(1.2); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#e3bd85", floor: "#a76a35", pattern: "dots" })}
    ${pop(0.25, pegboard(), "50% 0%")}
    ${pop(0.45, safetyPoster(), "50% 0%")}
    ${pop(0.6, plankStack())}
    ${pop(0.75, workbench())}
    ${pop(0.95, tableSaw())}
  `,
};
