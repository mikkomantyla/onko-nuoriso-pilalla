import { INK, ol, pop, roomBase, starPath } from "../kit.js";

const PAINTS = ["#e2463f", "#ff8f2e", "#ffd23f", "#5fbf45", "#2f7fd8", "#8b4fc9"];

const splat = (x, y, r, color) => `
  <g transform="translate(${x} ${y})">
    <path d="M${-r} 0 C ${-r} ${-r * 0.9} ${-r * 0.3} ${-r * 1.1} 0 ${-r * 0.8} C ${r * 0.5} ${-r * 1.2} ${r * 1.1} ${-r * 0.6} ${r * 0.9} 0 C ${r * 1.2} ${r * 0.6} ${r * 0.4} ${r} 0 ${r * 0.8} C ${-r * 0.6} ${r * 1.1} ${-r * 1.2} ${r * 0.5} ${-r} 0Z" fill="${color}" ${ol(5)}/>
    <circle cx="${r * 1.4}" cy="${-r * 0.7}" r="${r * 0.2}" fill="${color}" ${ol(4)}/>
    <circle cx="${-r * 1.3}" cy="${r * 0.8}" r="${r * 0.15}" fill="${color}" ${ol(4)}/>
  </g>`;

const colorWheel = () => `
  <g transform="translate(262 186)">
    <g class="kuv-wheel" style="transform-box:fill-box;transform-origin:50% 50%">
      ${Array.from({ length: 12 }, (_, i) => {
        const a0 = (i / 12) * Math.PI * 2;
        const a1 = ((i + 1) / 12) * Math.PI * 2;
        const r = 92;
        return `<path d="M0 0 L${(Math.cos(a0) * r).toFixed(1)} ${(Math.sin(a0) * r).toFixed(1)} A${r} ${r} 0 0 1 ${(Math.cos(a1) * r).toFixed(1)} ${(Math.sin(a1) * r).toFixed(1)}Z" fill="hsl(${i * 30} 85% 58%)" stroke="${INK}" stroke-width="4"/>`;
      }).join("")}
    </g>
    <circle r="92" fill="none" ${ol(7)}/>
    <circle r="26" fill="#fff6df" ${ol(6)}/>
  </g>`;

const clothesline = () => {
  const pictures = [
    // A house under a sun.
    (w, h) => `<rect width="${w}" height="${h}" fill="#bfe8ff"/>
      <circle cx="${w * 0.78}" cy="${h * 0.25}" r="20" fill="#ffd23f" ${ol(4)}/>
      <rect x="${w * 0.2}" y="${h * 0.5}" width="${w * 0.42}" height="${h * 0.38}" fill="#e2463f" ${ol(4)}/>
      <path d="M${w * 0.14} ${h * 0.52} L${w * 0.41} ${h * 0.26} L${w * 0.68} ${h * 0.52}Z" fill="#8b4a22" ${ol(4)}/>
      <rect x="0" y="${h * 0.86}" width="${w}" height="${h * 0.14}" fill="#5fbf45"/>`,
    // A cat.
    (w, h) => `<rect width="${w}" height="${h}" fill="#ffe0ef"/>
      <ellipse cx="${w / 2}" cy="${h * 0.62}" rx="${w * 0.3}" ry="${h * 0.26}" fill="#ff8f2e" ${ol(4)}/>
      <path d="M${w * 0.28} ${h * 0.45} L${w * 0.32} ${h * 0.2} L${w * 0.44} ${h * 0.38}Z M${w * 0.72} ${h * 0.45} L${w * 0.68} ${h * 0.2} L${w * 0.56} ${h * 0.38}Z" fill="#ff8f2e" ${ol(4)}/>
      <circle cx="${w * 0.42}" cy="${h * 0.56}" r="5" fill="${INK}"/><circle cx="${w * 0.58}" cy="${h * 0.56}" r="5" fill="${INK}"/>`,
    // A rainbow.
    (w, h) => `<rect width="${w}" height="${h}" fill="#fff"/>
      ${PAINTS.map((c, i) => `<path d="M${10 + i * 9} ${h - 14} A${w / 2 - 10 - i * 9} ${w / 2 - 10 - i * 9} 0 0 1 ${w - 10 - i * 9} ${h - 14}" fill="none" stroke="${c}" stroke-width="9"/>`).join("")}`,
    // A big star.
    (w, h) => `<rect width="${w}" height="${h}" fill="#2f2a6b"/>
      <path d="${starPath(48)}" transform="translate(${w / 2} ${h / 2 + 6})" fill="#ffd23f" ${ol(4)}/>
      <circle cx="${w * 0.2}" cy="${h * 0.25}" r="4" fill="#fff"/><circle cx="${w * 0.8}" cy="${h * 0.8}" r="4" fill="#fff"/>`,
    // A scribbled flower.
    (w, h) => `<rect width="${w}" height="${h}" fill="#e9f8d8"/>
      <path d="M${w / 2} ${h * 0.95} V${h * 0.45}" stroke="#2e9d5b" stroke-width="8"/>
      ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="${w / 2}" cy="${h * 0.24}" rx="13" ry="24" fill="#ff5d8f" ${ol(3)} transform="rotate(${a} ${w / 2} ${h * 0.4})"/>`).join("")}
      <circle cx="${w / 2}" cy="${h * 0.4}" r="13" fill="#ffd23f" ${ol(4)}/>`,
  ];
  const w = 150;
  const h = 130;
  return `
    <path d="M430 46 Q960 92 1490 46" fill="none" stroke="${INK}" stroke-width="5"/>
    ${pictures
      .map((draw, i) => {
        const x = 470 + i * 206;
        const y = 64 + Math.sin((i / 4) * Math.PI) * 18;
        return `<g transform="translate(${x} ${y})">
          <g class="kuv-art" style="--k:${i};transform-box:fill-box;transform-origin:50% 0%">
            <g transform="rotate(${i % 2 ? 3 : -3} ${w / 2} 0)">
              <rect x="6" y="10" width="${w}" height="${h}" fill="${INK}" opacity="0.2"/>
              <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${draw(w, h)}</svg>
              <rect width="${w}" height="${h}" fill="none" ${ol(6)}/>
              <rect x="${w / 2 - 9}" y="-16" width="18" height="34" rx="4" fill="#d9a865" ${ol(4)}/>
            </g>
          </g>
        </g>`;
      })
      .join("")}`;
};

const easel = () => `
  <g transform="translate(70 330)">
    <path d="M150 -20 L40 660 M150 -20 L260 660 M150 300 L150 640" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>
    <path d="M150 -20 L40 660 M150 -20 L260 660 M150 300 L150 640" fill="none" stroke="#c9822f" stroke-width="18" stroke-linecap="round"/>
    <rect x="0" y="330" width="300" height="26" rx="6" fill="#a0612a" ${ol(6)}/>
    <rect x="12" y="20" width="276" height="310" rx="4" fill="#fff" ${ol(7)}/>
    <rect x="26" y="34" width="248" height="282" fill="#9fdcff"/>
    <circle cx="210" cy="96" r="34" fill="#ffd23f" ${ol(5)}/>
    <path d="M26 236 Q110 170 190 228 T274 214 V316 H26Z" fill="#7bd65b" ${ol(5)}/>
    <path d="M26 270 Q140 230 274 280 V316 H26Z" fill="#4cb84a" ${ol(5)}/>
    <path class="kuv-stroke" d="M50 150 C 90 120 130 175 170 140" fill="none" stroke="#e2463f" stroke-width="12" stroke-linecap="round"/>
    <g class="kuv-brush" style="transform-box:fill-box;transform-origin:10% 90%">
      <g transform="translate(160 140) rotate(-35)">
        <rect x="-8" y="-170" width="16" height="140" rx="8" fill="#ffd23f" ${ol(5)}/>
        <rect x="-10" y="-40" width="20" height="26" fill="#c9ccd2" ${ol(5)}/>
        <path d="M-10 -14 Q0 26 10 -14Z" fill="#e2463f" ${ol(5)}/>
      </g>
    </g>
  </g>`;

const bust = () => `
  <g transform="translate(1720 140)">
    <rect x="-70" y="200" width="140" height="40" rx="8" fill="#e9e3d6" ${ol(6)}/>
    <path d="M-62 200 Q-60 140 -30 128 L30 128 Q60 140 62 200Z" fill="#f4efe4" ${ol(6)}/>
    <rect x="-18" y="96" width="36" height="40" fill="#f4efe4" ${ol(5)}/>
    <ellipse cx="0" cy="56" rx="48" ry="58" fill="#f4efe4" ${ol(6)}/>
    <path d="M-48 40 Q-44 -6 0 -4 Q44 -6 48 40 Q36 18 22 22 Q10 6 -4 20 Q-20 6 -34 24Z" fill="#e3dccd" ${ol(5)}/>
    <path d="M-20 52 q8 -6 16 0 M6 52 q8 -6 16 0" fill="none" ${ol(4)}/>
    <path d="M0 58 L-6 80 L4 82" fill="none" ${ol(4)}/>
    <path d="M-12 94 q12 6 24 0" fill="none" ${ol(4)}/>
  </g>`;

const shelfWithJars = () => `
  <g transform="translate(1530 420)">
    <rect x="0" y="120" width="360" height="24" rx="6" fill="#a0612a" ${ol(6)}/>
    <path d="M30 144 L50 180 M330 144 L310 180" ${ol(10)}/>
    ${PAINTS.slice(0, 5)
      .map(
        (c, i) => `<g transform="translate(${24 + i * 66} 40)">
          <rect x="0" y="12" width="52" height="68" rx="10" fill="#fff" opacity="0.85" ${ol(5)}/>
          <rect x="4" y="38" width="44" height="38" rx="8" fill="${c}"/>
          <rect x="0" y="12" width="52" height="68" rx="10" fill="none" ${ol(5)}/>
          <rect x="-4" y="0" width="60" height="18" rx="5" fill="${c}" ${ol(5)}/>
        </g>`
      )
      .join("")}
    <!-- a tipped pot dripping paint -->
    <g transform="translate(250 -40) rotate(-14)">
      <rect x="0" y="0" width="66" height="56" rx="8" fill="#8b4fc9" ${ol(5)}/>
      <path d="M66 10 Q84 18 80 40" fill="none" stroke="#8b4fc9" stroke-width="12" stroke-linecap="round"/>
    </g>
    <circle class="kuv-drip" cx="330" cy="40" r="11" fill="#8b4fc9" ${ol(4)}/>
    ${splat(330, 128, 22, "#8b4fc9")}
  </g>`;

const paletteTable = () => `
  <g transform="translate(1540 760)">
    <rect x="30" y="60" width="22" height="180" fill="#7a8a99" ${ol(5)}/>
    <rect x="290" y="60" width="22" height="180" fill="#7a8a99" ${ol(5)}/>
    <rect x="0" y="30" width="340" height="40" rx="10" fill="#e9b86f" ${ol()}/>
    <path d="M40 30 C 20 -40 120 -80 220 -60 C 320 -40 330 10 280 20 C 250 26 260 -10 220 0 C 190 8 210 30 180 32Z" fill="#e8c48a" ${ol(6)}/>
    <ellipse cx="248" cy="2" rx="15" ry="11" fill="#c9a06a" ${ol(4)}/>
    ${PAINTS.map((c, i) => `<circle cx="${70 + i * 30}" cy="${-30 + (i % 2) * 18}" r="13" fill="${c}" ${ol(4)}/>`).join("")}
  </g>`;

const style = `<style>
  .kuv-wheel { animation: spin 20s linear infinite; }
  .kuv-art { animation: sway-soft 3.4s ease-in-out infinite; animation-delay: calc(var(--k) * -0.7s); }
  .kuv-brush { animation: kuv-brush 1.6s ease-in-out infinite; }
  .kuv-stroke { stroke-dasharray: 200; animation: kuv-stroke 3.2s ease-in-out infinite; }
  .kuv-drip { animation: kuv-drip 2.4s ease-in infinite; transform-box: fill-box; transform-origin: 50% 0%; }
  @keyframes kuv-brush { 0%, 100% { transform: translate(-40px, 10px) rotate(-6deg); } 50% { transform: translate(30px, -16px) rotate(6deg); } }
  @keyframes kuv-stroke { 0% { stroke-dashoffset: 200; } 50%, 80% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -200; } }
  @keyframes kuv-drip { 0%, 30% { transform: translateY(0) scale(0.3); opacity: 0; } 40% { transform: translateY(0) scale(1); opacity: 1; } 90% { transform: translateY(70px) scale(1, 1.3); opacity: 1; } 100% { transform: translateY(80px) scale(1.4, 0.4); opacity: 0; } }
</style>`;

export default {
  draw: () => `
    ${style}
    ${roomBase({ wall: "#f6e3b4", floor: "#c98a4b", pattern: "dots" })}
    ${splat(80, 860, 26, "#2f7fd8")}${splat(1850, 980, 30, "#e2463f")}${splat(460, 1030, 34, "#ffd23f")}${splat(1430, 1040, 24, "#5fbf45")}
    ${pop(0.25, clothesline(), "50% 0%")}
    ${pop(0.45, colorWheel(), "50% 50%")}
    ${pop(0.6, bust())}
    ${pop(0.75, easel())}
    ${pop(0.85, shelfWithJars())}
    ${pop(1, paletteTable())}
  `,
};
