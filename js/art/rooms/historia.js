import { INK, ol, pop, roomBase, poster, clock, shade } from "../kit.js";

const mannerheimPoster = () =>
  poster(55, 120, 320, 430, {
    paper: "#cfe3f2",
    tilt: -4,
    content: `
      <rect x="20" y="20" width="280" height="300" rx="8" fill="#9cc3e0" ${ol(5)}/>
      <path d="M45 320 C 60 250 110 235 160 235 C 210 235 260 250 275 320Z" fill="#7d8a5a" ${ol(6)}/>
      <path d="M130 238 L160 290 L190 238" fill="#e7d9a8" ${ol(5)}/>
      <circle cx="105" cy="285" r="11" fill="#ffd23f" ${ol(4)}/>
      <circle cx="215" cy="285" r="11" fill="#e2463f" ${ol(4)}/>
      <rect x="140" y="215" width="40" height="34" fill="#f2c9a0" ${ol(5)}/>
      <ellipse cx="160" cy="175" rx="58" ry="66" fill="#f2c9a0" ${ol(6)}/>
      <path d="M96 128 C 96 60 224 60 224 128 L 224 140 C 190 128 130 128 96 140Z" fill="#f4f1e6" ${ol(6)}/>
      <path d="M110 98 q8 -8 16 0 M140 86 q8 -8 16 0 M172 86 q8 -8 16 0 M200 98 q8 -8 16 0" fill="none" ${ol(4)}/>
      <path d="M126 160 q10 -8 20 0 M174 160 q10 -8 20 0" fill="none" ${ol(5)}/>
      <circle cx="137" cy="172" r="5" fill="${INK}"/><circle cx="183" cy="172" r="5" fill="${INK}"/>
      <path d="M160 178 q-6 18 0 22" fill="none" ${ol(4)}/>
      <path d="M160 204 C 140 196 112 200 104 214 C 122 210 140 214 160 210 C 180 214 198 210 216 214 C 208 200 180 196 160 204Z" fill="#8c8a84" ${ol(5)}/>
      <rect x="40" y="340" width="240" height="66" rx="10" fill="#e2463f" ${ol(6)}/>
      <text x="160" y="388" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="40" fill="#fff" stroke="${INK}" stroke-width="7" paint-order="stroke fill">MANNERHEIM</text>`,
  });

const grandfatherClock = () => `
  <g transform="translate(1610 330)">
    <rect x="0" y="80" width="220" height="590" rx="16" fill="#8b4a22" ${ol()}/>
    <path d="M-20 90 Q110 -60 240 90Z" fill="#a85a2a" ${ol()}/>
    <circle cx="110" cy="150" r="78" fill="#f4e6c4" ${ol(6)}/>
    ${clock(110, 150, 62).replace(/fill="#e2463f" stroke/, `fill="#d9a441" stroke`)}
    <rect x="40" y="250" width="140" height="330" rx="70" fill="#3b2516" ${ol(6)}/>
    <g transform="translate(110 262)">
      <g class="hist-pendulum" style="transform-box:fill-box;transform-origin:50% 0%">
        <line x1="0" y1="0" x2="0" y2="230" stroke="#d9a441" stroke-width="10"/>
        <circle cx="0" cy="250" r="38" fill="#ffd23f" ${ol(6)}/>
        <circle cx="-10" cy="240" r="10" fill="#fff" opacity="0.7"/>
      </g>
    </g>
    <rect x="-14" y="650" width="248" height="40" rx="10" fill="#6b3518" ${ol()}/>
  </g>`;

const shieldAndSwords = () => `
  <g transform="translate(1720 205)">
    <g transform="rotate(35)"><rect x="-10" y="-150" width="20" height="260" rx="6" fill="#d9dde3" ${ol(6)}/><rect x="-40" y="90" width="80" height="18" rx="6" fill="#d9a441" ${ol(5)}/><rect x="-9" y="105" width="18" height="50" rx="5" fill="#6b3518" ${ol(5)}/></g>
    <g transform="rotate(-35)"><rect x="-10" y="-150" width="20" height="260" rx="6" fill="#d9dde3" ${ol(6)}/><rect x="-40" y="90" width="80" height="18" rx="6" fill="#d9a441" ${ol(5)}/><rect x="-9" y="105" width="18" height="50" rx="5" fill="#6b3518" ${ol(5)}/></g>
    <path d="M-80 -90 H80 V0 C80 70 30 100 0 120 C-30 100 -80 70 -80 0Z" fill="#2f7fd8" ${ol()}/>
    <path d="M-80 -30 H80 M-15 -90 V112 M15 -90 V112" fill="none" stroke="#fff" stroke-width="16"/>
    <path d="M-80 -90 H80 V0 C80 70 30 100 0 120 C-30 100 -80 70 -80 0Z" fill="none" ${ol()}/>
  </g>`;

const timeline = () => {
  const marks = ["1300", "1500", "1700", "1918", "2000"];
  return `
  <g transform="translate(520 70)">
    <path d="M-40 40 H920" fill="none" stroke="#6b3518" stroke-width="22" stroke-linecap="round"/>
    <path d="M-40 40 H920" fill="none" stroke="#d9a441" stroke-width="10" stroke-linecap="round"/>
    ${marks
      .map(
        (m, i) => `<g transform="translate(${i * 220} 40)">
          <circle r="26" fill="${["#e2463f", "#ffd23f", "#3ec1d3", "#7bd65b", "#ff8f2e"][i]}" ${ol(6)}/>
          <text y="80" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="44" fill="#fff" stroke="${INK}" stroke-width="8" paint-order="stroke fill">${m}</text>
        </g>`
      )
      .join("")}
  </g>`;
};

const cannon = () => `
  <g transform="translate(60 820)">
    <g class="hist-cannon" style="transform-box:fill-box;transform-origin:20% 80%">
      <path d="M40 40 L300 -30 Q330 -38 334 -10 L340 30 Q342 56 316 60 L60 110Z" fill="#4a4f57" ${ol()}/>
      <rect x="318" y="-36" width="34" height="100" rx="12" fill="#5d636c" ${ol(6)}/>
      <ellipse cx="350" cy="14" rx="10" ry="40" fill="${INK}"/>
    </g>
    <circle cx="140" cy="110" r="68" fill="#a85a2a" ${ol()}/>
    <circle cx="140" cy="110" r="16" fill="#6b3518" ${ol(5)}/>
    ${Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return `<line x1="${140 + Math.cos(a) * 16}" y1="${110 + Math.sin(a) * 16}" x2="${140 + Math.cos(a) * 60}" y2="${110 + Math.sin(a) * 60}" ${ol(6)}/>`;
    }).join("")}
    <g class="hist-smoke">
      <circle cx="400" cy="0" r="34" fill="#fff" ${ol(5)}/>
      <circle cx="440" cy="-30" r="26" fill="#fff" ${ol(5)}/>
      <circle cx="430" cy="20" r="22" fill="#fff" ${ol(5)}/>
    </g>
    <g transform="translate(250 150)">
      <circle r="22" fill="#2b2f36" ${ol(5)}/><circle cx="46" r="22" fill="#2b2f36" ${ol(5)}/><circle cx="23" cy="-36" r="22" fill="#2b2f36" ${ol(5)}/>
    </g>
  </g>`;

const style = `<style>
  .hist-pendulum { animation: sway 1.6s ease-in-out infinite; }
  .hist-cannon { animation: hist-recoil 5s ease-in-out infinite; }
  .hist-smoke { opacity: 0; animation: hist-smoke 5s ease-out infinite; transform-box: fill-box; transform-origin: 0% 50%; }
  @keyframes hist-recoil { 0%, 70%, 100% { transform: none; } 72% { transform: translateX(-26px) rotate(-3deg); } 80% { transform: none; } }
  @keyframes hist-smoke { 0%, 70% { opacity: 0; transform: scale(0.2); } 74% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.8) translate(40px, -60px); } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#ecc98d", floor: "#b8743a" })}
    ${pop(0.25, timeline(), "50% 50%")}
    ${pop(0.45, mannerheimPoster(), "50% 0%")}
    ${pop(0.65, shieldAndSwords(), "50% 50%")}
    ${pop(0.8, grandfatherClock())}
    ${pop(0.95, cannon())}
    <rect x="0" y="0" width="1920" height="1080" fill="${shade("#ecc98d", -0.5)}" opacity="0.06" pointer-events="none"/>
  `,
};
