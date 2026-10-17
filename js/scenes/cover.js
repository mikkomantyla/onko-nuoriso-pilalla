import { INK, ol, pop, starPath, W, H } from "../art/kit.js";

const LETTER_COLORS = ["#ffd23f", "#ff5d8f", "#3ec1d3", "#7bd65b", "#ff8f2e", "#c08bff"];

const titleLine = (text, offset) =>
  [...text]
    .map((ch, i) =>
      ch === " "
        ? `<span class="cover-space"></span>`
        : `<span class="cover-letter game-text" style="--i:${offset + i};color:${LETTER_COLORS[(offset + i) % LETTER_COLORS.length]}">${ch}</span>`
    )
    .join("");

const phone = () => `
  <g transform="translate(150 560) rotate(-14)">
    <rect width="190" height="330" rx="32" fill="#3d3a4b" ${ol(8)}/>
    <rect x="16" y="34" width="158" height="250" rx="12" fill="#8fd8ff" ${ol(5)}/>
    <path d="M40 60 L90 140 L60 170 L120 250" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
    <circle cx="95" cy="306" r="12" fill="#5d5a6b" ${ol(4)}/>
    <g class="cover-ping" style="transform-box:fill-box;transform-origin:50% 50%">
      <circle cx="170" cy="20" r="40" fill="#e2463f" ${ol(7)}/>
      <text x="170" y="38" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="48" fill="#fff">99+</text>
    </g>
    <circle cx="70" cy="150" r="30" fill="#ffd23f" ${ol(5)}/>
    <circle cx="60" cy="144" r="5" fill="${INK}"/><circle cx="82" cy="144" r="5" fill="${INK}"/>
    <path d="M58 166 q12 -10 24 0" fill="none" ${ol(4)}/>
  </g>`;

const backpack = () => `
  <g transform="translate(1530 560) rotate(8)">
    <path d="M60 40 Q150 -40 240 40" fill="none" ${ol(16)}/>
    <path d="M60 40 Q150 -40 240 40" fill="none" stroke="#e2463f" stroke-width="8"/>
    <rect x="20" y="40" width="260" height="330" rx="70" fill="#e2463f" ${ol(8)}/>
    <rect x="60" y="210" width="180" height="130" rx="34" fill="#ff8f6a" ${ol(7)}/>
    <path d="M80 250 H220" ${ol(6)}/>
    <circle cx="150" cy="120" r="44" fill="#ffd23f" ${ol(7)}/>
    <path d="${starPath(30)}" transform="translate(150 122)" fill="#fff" ${ol(5)}/>
  </g>`;

const pencil = () => `
  <g transform="translate(260 240) rotate(28)">
    <rect x="0" y="0" width="300" height="70" fill="#ffd23f" ${ol(8)}/>
    <rect x="0" y="0" width="300" height="22" fill="#ffe27a"/>
    <rect x="0" y="0" width="300" height="70" fill="none" ${ol(8)}/>
    <rect x="-56" y="0" width="56" height="70" rx="12" fill="#ff8fb1" ${ol(8)}/>
    <rect x="-8" y="-4" width="22" height="78" fill="#c9ccd2" ${ol(6)}/>
    <path d="M300 0 L380 35 L300 70Z" fill="#f2c9a0" ${ol(8)}/>
    <path d="M355 24 L380 35 L355 46Z" fill="${INK}"/>
  </g>`;

const can = () => `
  <g transform="translate(1590 180) rotate(-12)">
    <rect width="120" height="210" rx="20" fill="#7bd65b" ${ol(8)}/>
    <rect y="20" width="120" height="16" fill="#c9ccd2" ${ol(5)}/>
    <path d="M20 90 L60 70 L45 120 L95 100 L55 170" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M20 90 L60 70 L45 120 L95 100 L55 170" fill="none" ${ol(4)} opacity="0.4"/>
  </g>`;

const headphones = () => `
  <g transform="translate(1450 820)">
    <path d="M0 80 Q0 -60 140 -60 Q280 -60 280 80" fill="none" ${ol(26)}/>
    <path d="M0 80 Q0 -60 140 -60 Q280 -60 280 80" fill="none" stroke="#c08bff" stroke-width="12"/>
    <rect x="-30" y="50" width="70" height="110" rx="30" fill="#3ec1d3" ${ol(8)}/>
    <rect x="240" y="50" width="70" height="110" rx="30" fill="#3ec1d3" ${ol(8)}/>
  </g>`;

const badge = () => `
  <g transform="translate(330 930)">
    <g class="cover-badge" style="transform-box:fill-box;transform-origin:50% 50%">
      <path d="${Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2;
        const r = i % 2 === 0 ? 150 : 124;
        return `${i === 0 ? "M" : "L"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
      }).join(" ")}Z" fill="#ff5d8f" ${ol(8)}/>
    </g>
    <text x="0" y="-16" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="58" fill="#fff" stroke="${INK}" stroke-width="10" paint-order="stroke fill">13 AINETTA</text>
    <text x="0" y="46" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="40" fill="#ffd23f" stroke="${INK}" stroke-width="9" paint-order="stroke fill">39 KYSYMYSTÄ</text>
  </g>`;

const plane = () => `
  <g class="cover-plane">
    <path d="M0 0 L140 40 L0 80 L30 40Z" fill="#fff" ${ol(7)}/>
    <path d="M30 40 L140 40 L40 62Z" fill="#dfe6ee" ${ol(5)}/>
  </g>`;

const confetti = () =>
  Array.from({ length: 34 }, (_, i) => {
    const x = (i * 211) % W;
    const y = (i * 137) % H;
    const color = LETTER_COLORS[i % LETTER_COLORS.length];
    const shape =
      i % 3 === 0
        ? `<path d="${starPath(26)}" fill="${color}" ${ol(5)}/>`
        : i % 3 === 1
          ? `<circle r="16" fill="${color}" ${ol(5)}/>`
          : `<rect x="-22" y="-10" width="44" height="20" rx="6" fill="${color}" ${ol(5)}/>`;
    return `<g transform="translate(${x} ${y})"><g class="cover-confetti" style="--c:${i};transform-box:fill-box;transform-origin:50% 50%">${shape}</g></g>`;
  }).join("");

const style = `<style>
  .cover-burst {
    position: absolute; left: 50%; top: 50%; width: 3200px; height: 3200px; margin: -1600px 0 0 -1600px;
    background: repeating-conic-gradient(#ff8fb1 0 9deg, #ffb3cb 9deg 18deg, #ffd56b 18deg 27deg, #ffe49a 27deg 36deg, #7fdcea 36deg 45deg, #aeeaf3 45deg 54deg);
    animation: spin 70s linear infinite;
  }
  .cover-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 46%, rgba(255,255,255,.75) 0, rgba(255,255,255,0) 52%); }
  .cover-confetti { animation: cover-float 4s ease-in-out infinite; animation-delay: calc(var(--c) * -0.37s); }
  .cover-ping { animation: cover-ping 1.6s ease-in-out infinite; }
  .cover-badge { animation: spin 18s linear infinite; }
  .cover-plane { offset-path: path("M -200 300 C 400 60 900 520 1300 180 S 2000 300 2200 120"); offset-rotate: auto; animation: cover-plane 9s linear infinite; }
  @keyframes cover-float { 0%, 100% { transform: translateY(-14px) rotate(-20deg); } 50% { transform: translateY(14px) rotate(20deg); } }
  @keyframes cover-ping { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  @keyframes cover-plane { from { offset-distance: 0%; } to { offset-distance: 100%; } }

  .cover-title { position: absolute; left: 0; right: 0; top: 212px; margin: 0; text-align: center; z-index: 3; }
  .cover-line { display: block; white-space: nowrap; }
  .cover-line + .cover-line { margin-top: 10px; }
  .cover-letter {
    display: inline-block; font-size: 170px; -webkit-text-stroke-width: 26px; text-shadow: 0 18px 0 ${INK};
    animation: cover-drop 0.7s cubic-bezier(.34,1.7,.5,1) both, cover-wiggle 2.4s ease-in-out infinite;
    animation-delay: calc(0.3s + var(--i) * 0.07s), calc(2s + var(--i) * 0.12s);
  }
  .cover-line.mid .cover-letter { font-size: 200px; }
  .cover-line.big .cover-letter { font-size: 235px; }
  .cover-space { display: inline-block; width: 70px; }
  @keyframes cover-drop { 0% { transform: translateY(-700px) rotate(-30deg); } 100% { transform: none; } }
  @keyframes cover-wiggle { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-16px) rotate(3deg); } }

  .cover-kicker, .cover-sub {
    position: absolute; left: 50%; z-index: 4; padding: 12px 54px 16px; border: 10px solid ${INK}; border-radius: 999px;
    font-family: var(--display); white-space: nowrap; box-shadow: 0 12px 0 ${INK};
  }
  .cover-kicker { top: 88px; background: #3ec1d3; color: #fff; font-size: 64px; -webkit-text-stroke: 10px ${INK}; paint-order: stroke fill;
    transform: translateX(-50%) rotate(-3deg); animation: cover-sticker 0.7s 0.1s cubic-bezier(.34,1.7,.5,1) both; }
  .cover-sub { top: 884px; background: #fff6df; color: ${INK}; font-size: 58px;
    transform: translateX(-50%) rotate(2deg); animation: cover-sticker 0.7s 2.1s cubic-bezier(.34,1.7,.5,1) both; }
  @keyframes cover-sticker { 0% { scale: 0; } 100% { scale: 1; } }
</style>`;

export function coverScene(root) {
  root.innerHTML = `
    ${style}
    <div class="cover-burst"></div>
    <div class="cover-glow"></div>
    <svg class="backdrop" viewBox="0 0 ${W} ${H}">
      ${confetti()}
      ${pop(0.5, pencil(), "50% 50%")}
      ${pop(0.7, can(), "50% 50%")}
      ${pop(0.9, phone(), "50% 50%")}
      ${pop(1.1, backpack(), "50% 50%")}
      ${pop(1.3, headphones(), "50% 50%")}
      ${pop(1.5, badge(), "50% 50%")}
      ${plane()}
    </svg>
    <div class="cover-kicker">YLÄASTEVISA</div>
    <h1 class="cover-title">
      <span class="cover-line">${titleLine("ONKO ENTINEN", 0)}</span>
      <span class="cover-line mid">${titleLine("NUORISO", 12)}</span>
      <span class="cover-line big">${titleLine("PILALLA?", 19)}</span>
    </h1>
    <div class="cover-sub">Palataan yläasteelle! 🎒</div>`;
  return { skip: () => false, destroy() {} };
}
