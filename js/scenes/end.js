import { INK, ol, pop, starPath, W, H } from "../art/kit.js";

const COLORS = ["#ffd23f", "#ff5d8f", "#3ec1d3", "#7bd65b", "#ff8f2e", "#c08bff"];

const trophy = () => `
  <g transform="translate(960 625) scale(0.85)">
    <g class="end-trophy" style="transform-box:fill-box;transform-origin:50% 100%">
      <path d="M-170 -250 C -290 -250 -290 -90 -150 -70" fill="none" ${ol(30)}/>
      <path d="M-170 -250 C -290 -250 -290 -90 -150 -70" fill="none" stroke="#ffd23f" stroke-width="16"/>
      <path d="M170 -250 C 290 -250 290 -90 150 -70" fill="none" ${ol(30)}/>
      <path d="M170 -250 C 290 -250 290 -90 150 -70" fill="none" stroke="#ffd23f" stroke-width="16"/>
      <path d="M-190 -290 H190 C 190 -60 100 30 0 40 C -100 30 -190 -60 -190 -290Z" fill="#ffd23f" ${ol(10)}/>
      <path d="M-140 -260 C -140 -120 -90 -40 -30 -10" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity="0.6"/>
      <rect x="-40" y="30" width="80" height="90" fill="#f0b429" ${ol(9)}/>
      <rect x="-150" y="110" width="300" height="90" rx="20" fill="#a5642c" ${ol(10)}/>
      <path d="${starPath(70)}" transform="translate(0 -150)" fill="#fff" ${ol(8)}/>
    </g>
  </g>`;

const confetti = () =>
  Array.from({ length: 46 }, (_, i) => {
    const x = (i * 173) % W;
    const color = COLORS[i % COLORS.length];
    const shape = i % 2 ? `<rect x="-20" y="-9" width="40" height="18" rx="5" fill="${color}" ${ol(4)}/>` : `<path d="${starPath(22)}" fill="${color}" ${ol(4)}/>`;
    return `<g transform="translate(${x} -60)"><g class="end-confetti" style="--c:${i}">${shape}</g></g>`;
  }).join("");

const style = `<style>
  .end-bg { position: absolute; inset: 0; background: radial-gradient(circle at 50% 55%, #ffe49a 0, #ff8fb1 45%, #a66cff 100%); }
  .end-rays { position: absolute; left: 50%; top: 52%; width: 2600px; height: 2600px; margin: -1300px 0 0 -1300px;
    background: repeating-conic-gradient(rgba(255,255,255,.35) 0 8deg, rgba(255,255,255,0) 8deg 20deg); animation: spin 50s linear infinite; }
  .end-trophy { animation: pop-in 0.8s 0.3s cubic-bezier(.34,1.7,.5,1) both, end-hop 2.2s 1.1s ease-in-out infinite; }
  .end-confetti { animation: end-fall 5s linear infinite; animation-delay: calc(var(--c) * -0.29s); }
  @keyframes end-hop { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-30px) rotate(2deg); } }
  @keyframes end-fall { from { transform: translateY(0) rotate(0); } to { transform: translateY(1200px) rotate(540deg); } }
  .end-title { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font-size: 190px; -webkit-text-stroke-width: 24px;
    text-shadow: 0 18px 0 ${INK}; animation: pop-in 0.8s cubic-bezier(.34,1.7,.5,1) both, wobble-end 3s 1s ease-in-out infinite; }
  @keyframes wobble-end { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg) scale(1.03); } }
  .end-sub { position: absolute; left: 50%; top: 300px; transform: translateX(-50%) rotate(-2deg); padding: 10px 46px 14px;
    border: 9px solid ${INK}; border-radius: 999px; background: #fff6df; font-family: var(--display); font-size: 52px; white-space: nowrap;
    box-shadow: 0 10px 0 ${INK}; animation: cover-pop 0.6s 0.9s cubic-bezier(.34,1.7,.5,1) both; }
  .end-home { position: absolute; left: 50%; top: 860px; translate: -50% 0; display: inline-flex; align-items: center; gap: 18px;
    padding: 14px 60px 22px; border: 10px solid ${INK}; border-radius: 999px; background: #7bd65b; cursor: pointer;
    box-shadow: inset 0 -14px 0 rgba(0,0,0,.18), inset 0 10px 0 rgba(255,255,255,.3), 0 14px 0 ${INK};
    font-family: var(--display); font-size: 72px; color: #fff; -webkit-text-stroke: 12px ${INK}; paint-order: stroke fill;
    animation: cover-pop 0.6s 1.3s cubic-bezier(.34,1.7,.5,1) both; transition: transform .15s; }
  .end-home:hover { transform: translateY(-4px) scale(1.04); }
  .end-home:focus-visible { outline: 8px solid #fff; outline-offset: 6px; }
  @keyframes cover-pop { 0% { scale: 0; } 100% { scale: 1; } }
</style>`;

export function endScene(root) {
  root.innerHTML = `
    ${style}
    <div class="end-bg"></div>
    <div class="end-rays"></div>
    <svg class="backdrop" viewBox="0 0 ${W} ${H}">
      ${confetti()}
      ${trophy()}
      ${pop(0.6, `<path d="${starPath(60)}" transform="translate(560 520)" fill="#ffd23f" ${ol(8)}/>`, "50% 50%")}
      ${pop(0.8, `<path d="${starPath(48)}" transform="translate(1370 470)" fill="#3ec1d3" ${ol(8)}/>`, "50% 50%")}
      ${pop(1, `<path d="${starPath(40)}" transform="translate(1420 720)" fill="#ff5d8f" ${ol(8)}/>`, "50% 50%")}
    </svg>
    <div class="end-title game-text">Vastausten aika!</div>
    <div class="end-sub">Kynät alas – tarkistetaan! ✏️</div>
    <button class="end-home" type="button">↺ Alkuun</button>`;
  root.querySelector(".end-home").addEventListener("click", () => window.dispatchEvent(new Event("game:home")));
  return { skip: () => false, destroy() {} };
}
