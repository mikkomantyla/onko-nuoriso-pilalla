import { pisa } from "../data.js";
import { INK, ol, pop, W, H } from "../art/kit.js";

const BOARD = { x: 250, y: 190, w: 1420, h: 760 };
const PLOT = { left: 190, right: 1300, top: 150, bottom: 610 };
const MAX_VALUE = 480;
const DRAW_DELAY_MS = 900;
const DRAW_MS = 4800;

const xOf = (year) =>
  PLOT.left + ((year - pisa.years[0]) / (pisa.years.at(-1) - pisa.years[0])) * (PLOT.right - PLOT.left);
const yOf = (value) => PLOT.bottom - (value / MAX_VALUE) * (PLOT.bottom - PLOT.top);
const points = (values) => values.map((v, i) => [xOf(pisa.years[i]), yOf(v)]);
const pathOf = (values) => points(values).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

/** The y of a polyline at x, for riding the leading dots along the lines. */
function yAt(values, x) {
  const pts = points(values);
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    if (x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return pts.at(-1)[1];
}

const finnishFlag = (x, y, w = 96) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="${w * 0.62}" rx="6" fill="#fff" ${ol(5)}/>
    <rect x="${w * 0.28}" y="0" width="${w * 0.17}" height="${w * 0.62}" fill="#1f5fbf"/>
    <rect x="0" y="${w * 0.22}" width="${w}" height="${w * 0.17}" fill="#1f5fbf"/>
    <rect width="${w}" height="${w * 0.62}" rx="6" fill="none" ${ol(5)}/>
  </g>`;

const landscape = () => `
  <defs>
    <linearGradient id="pisa-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5fc4f5"/><stop offset="1" stop-color="#c9f0ff"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#pisa-sky)"/>
  <g class="pisa-sun" style="transform-box:fill-box;transform-origin:50% 50%">
    <circle cx="1780" cy="150" r="70" fill="#ffd23f" ${ol(7)}/>
    ${Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return `<line x1="${1780 + Math.cos(a) * 95}" y1="${150 + Math.sin(a) * 95}" x2="${1780 + Math.cos(a) * 125}" y2="${150 + Math.sin(a) * 125}" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/>`;
    }).join("")}
  </g>
  <g class="drift"><ellipse cx="200" cy="140" rx="110" ry="40" fill="#fff"/><ellipse cx="250" cy="115" rx="70" ry="45" fill="#fff"/></g>
  <g class="drift" style="animation-duration:13s"><ellipse cx="1500" cy="90" rx="90" ry="32" fill="#fff"/><ellipse cx="1540" cy="70" rx="55" ry="36" fill="#fff"/></g>
  <path d="M-20 900 Q 300 760 700 880 T 1400 860 T 1960 830 V1100 H-20Z" fill="#7bd65b" ${ol(7)}/>
  <path d="M-20 980 Q 500 900 1000 990 T 1960 960 V1100 H-20Z" fill="#5fbf45" ${ol(7)}/>
  ${[120, 1790].map((x) => `
    <g transform="translate(${x} 900)">
      <rect x="-14" y="-30" width="28" height="80" fill="#8b4a22" ${ol(6)}/>
      <path d="M0 -230 L70 -40 H-70Z" fill="#2e9d5b" ${ol(6)}/>
      <path d="M0 -290 L55 -130 H-55Z" fill="#3fb36a" ${ol(6)}/>
    </g>`).join("")}`;

function chart() {
  const yearTicks = [2006, 2015, 2025];
  return `
    <g transform="translate(${BOARD.x} ${BOARD.y})">
      <!-- easel legs -->
      <path d="M200 700 L120 900 M${BOARD.w - 200} 700 L${BOARD.w - 120} 900" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/>
      <path d="M200 700 L120 900 M${BOARD.w - 200} 700 L${BOARD.w - 120} 900" fill="none" stroke="#a5642c" stroke-width="26" stroke-linecap="round"/>
      <rect x="-26" y="-26" width="${BOARD.w + 52}" height="${BOARD.h + 52}" rx="22" fill="#a5642c" ${ol(8)}/>
      <rect width="${BOARD.w}" height="${BOARD.h}" rx="10" fill="#244a3b" ${ol(6)}/>
      <rect x="14" y="14" width="${BOARD.w - 28}" height="200" rx="8" fill="#fff" opacity="0.05"/>

      <!-- legend -->
      <g font-family="Baloo 2, sans-serif" font-weight="800" font-size="36" fill="#f4f1e6">
        ${pisa.series
          .map((s, i) => {
            const x = 360 + i * 320;
            return `<line x1="${x}" y1="72" x2="${x + 50}" y2="72" stroke="${s.color}" stroke-width="12" stroke-linecap="round"/>
              <text x="${x + 66}" y="84">${s.label}</text>`;
          })
          .join("")}
      </g>

      ${yearTicks
        .map(
          (year) => `<line x1="${xOf(year)}" y1="${PLOT.top - 30}" x2="${xOf(year)}" y2="${PLOT.bottom + 20}" stroke="#f4f1e6" stroke-width="4" stroke-dasharray="4 14" stroke-linecap="round" opacity="0.45"/>
          <text x="${xOf(year)}" y="${PLOT.bottom + 80}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="46" fill="#f4f1e6">${year}</text>`
        )
        .join("")}

      ${finnishFlag(48, yOf(pisa.series[1].finland[0]) - 10, 100)}
      <text x="98" y="${yOf(pisa.series[1].finland[0]) + 100}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="38" fill="#f4f1e6">Suomi</text>
      <text x="98" y="${yOf(pisa.series[0].oecd[0]) + 14}" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="40" fill="#f4f1e6">OECD</text>

      <clipPath id="pisa-reveal"><rect class="pisa-clip" x="${PLOT.left - 20}" y="0" width="0" height="${BOARD.h}"/></clipPath>
      <g clip-path="url(#pisa-reveal)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${pisa.series.map((s) => `<path d="${pathOf(s.oecd)}" stroke="${s.color}" stroke-width="9" stroke-dasharray="20 16" opacity="0.9"/>`).join("")}
        ${pisa.series.map((s) => `<path d="${pathOf(s.finland)}" stroke="${s.color}" stroke-width="13"/>`).join("")}
      </g>
      ${pisa.series.map((s, i) => `<circle class="pisa-dot" data-series="${i}" cx="${PLOT.left}" cy="${yOf(s.finland[0])}" r="16" fill="${s.color}" ${ol(5)}/>`).join("")}

      <text x="${BOARD.w / 2}" y="${BOARD.h - 26}" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="700" font-size="28" fill="#c7b8ff">Lähde: OECD</text>

      <!-- appears once the lines reach 2025 -->
      <g class="pisa-ending">
        <g transform="translate(${xOf(2025) - 40} ${yOf(150)})">
          <g class="pisa-cloud" style="transform-box:fill-box;transform-origin:50% 50%">
            <ellipse cx="0" cy="-250" rx="110" ry="56" fill="#9aa7b8" ${ol(7)}/>
            <ellipse cx="-60" cy="-280" rx="60" ry="50" fill="#9aa7b8" ${ol(7)}/>
            <ellipse cx="50" cy="-290" rx="66" ry="56" fill="#9aa7b8" ${ol(7)}/>
            <ellipse cx="0" cy="-250" rx="104" ry="48" fill="#9aa7b8"/>
            <path d="M-30 -258 q8 -10 16 0 M14 -258 q8 -10 16 0" fill="none" ${ol(5)}/>
            <path d="M-14 -228 q14 -12 28 0" fill="none" ${ol(5)}/>
          </g>
          ${Array.from({ length: 7 }, (_, i) => `<line class="pisa-rain" style="--r:${i}" x1="${-80 + i * 26}" y1="-200" x2="${-88 + i * 26}" y2="-172" stroke="#5fc4f5" stroke-width="8" stroke-linecap="round"/>`).join("")}
        </g>
        <g transform="translate(${xOf(2018)} ${yOf(70)}) rotate(-12)">
          <g class="pisa-stamp" style="transform-box:fill-box;transform-origin:50% 50%">
            <rect x="-150" y="-62" width="300" height="124" rx="26" fill="#e2463f" ${ol(9)}/>
            <text x="0" y="34" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="96" fill="#fff" stroke="${INK}" stroke-width="12" paint-order="stroke fill">AUTS!</text>
          </g>
        </g>
      </g>
    </g>`;
}

const style = `<style>
  .pisa-sun { animation: spin 40s linear infinite; }
  .pisa-ending { display: none; }
  .pisa-done .pisa-ending { display: inline; }
  .pisa-done .pisa-stamp { animation: pisa-stamp 0.6s cubic-bezier(.3,1.8,.5,1) both, pisa-wobble 2.6s 0.6s ease-in-out infinite; }
  .pisa-done .pisa-cloud { animation: pop-in 0.6s cubic-bezier(.34,1.7,.5,1) both, bob 3s 0.6s ease-in-out infinite; }
  .pisa-rain { opacity: 0; }
  .pisa-done .pisa-rain { animation: pisa-rain 0.9s linear infinite; animation-delay: calc(0.6s + var(--r) * 0.13s); }
  .pisa-title { animation: pop-in 0.8s cubic-bezier(.34,1.7,.5,1) both; }
  @keyframes pisa-stamp { 0% { transform: scale(3); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  @keyframes pisa-wobble { 0%, 100% { transform: rotate(-3deg) scale(1); } 50% { transform: rotate(3deg) scale(1.06); } }
  @keyframes pisa-rain { 0% { opacity: 0; transform: translateY(0); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(110px); } }
</style>`;

export function pisaScene(root) {
  root.innerHTML = `
    <svg class="backdrop" viewBox="0 0 ${W} ${H}">
      ${style}
      ${landscape()}
      ${pop(0.1, chart(), "50% 100%")}
    </svg>
    <div class="pisa-title game-text" style="position:absolute;left:0;right:0;top:46px;text-align:center;font-size:110px">Pisa-tulokset</div>`;

  const svg = root.querySelector("svg");
  const clip = root.querySelector(".pisa-clip");
  const dots = [...root.querySelectorAll(".pisa-dot")];
  const width = PLOT.right - PLOT.left + 40;
  let start = null;
  let frame = 0;
  let done = false;

  const render = (progress) => {
    clip.setAttribute("width", String(width * progress));
    const x = PLOT.left + (PLOT.right - PLOT.left) * Math.min(progress * (width / (PLOT.right - PLOT.left)), 1);
    dots.forEach((dot) => {
      const series = pisa.series[Number(dot.dataset.series)];
      dot.setAttribute("cx", x.toFixed(1));
      dot.setAttribute("cy", yAt(series.finland, x).toFixed(1));
    });
  };

  const finish = () => {
    done = true;
    cancelAnimationFrame(frame);
    render(1);
    svg.classList.add("pisa-done");
  };

  const tick = (now) => {
    start ??= now;
    const t = Math.max(0, now - start - DRAW_DELAY_MS) / DRAW_MS;
    if (t >= 1) return finish();
    // Ease in-out so the slide down feels dramatic at the end.
    render(t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return {
    skip() {
      if (done) return false;
      finish();
      return true;
    },
    destroy() {
      cancelAnimationFrame(frame);
    },
  };
}
