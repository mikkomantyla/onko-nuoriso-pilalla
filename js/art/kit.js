// Shared drawing kit for the cartoon classrooms: thick dark outlines, flat fills, chunky highlights.
export const INK = "#2b1a10";
export const W = 1920;
export const H = 1080;

/** Outline attributes every drawn shape uses. */
export const ol = (width = 7) =>
  `stroke="${INK}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"`;

/** Wraps a prop so it pops in after `delay` seconds; `origin` is the CSS transform-origin within the prop's box. */
export const pop = (delay, svg, origin = "50% 100%") =>
  `<g class="pop" style="--d:${delay}s;transform-origin:${origin}">${svg}</g>`;

/** A group whose looping CSS animation starts once the intro is over. */
export const idle = (className, svg, origin = "50% 50%") =>
  `<g class="${className}" style="transform-box:fill-box;transform-origin:${origin}">${svg}</g>`;

/** Lightens (amount > 0) or darkens (amount < 0) a #rrggbb color. */
export function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount));
  const r = mix(n >> 16);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** The empty classroom: patterned wall, wainscot, wooden floor and baseboard. */
export function roomBase({ wall, floor = "#c98a4b", pattern = "stripes" }) {
  const wallDark = shade(wall, -0.12);
  const wallLight = shade(wall, 0.18);
  const planks = Array.from({ length: 13 }, (_, i) => {
    const x = i * 160 - 40;
    return `<path d="M${x} 905 L${x - 90} 1080" ${ol(5)} fill="none" opacity="0.55"/>`;
  }).join("");
  const wallPattern =
    pattern === "dots"
      ? Array.from({ length: 70 }, (_, i) => {
          const x = (i % 14) * 140 + ((Math.floor(i / 14) % 2) * 70) + 40;
          const y = Math.floor(i / 14) * 140 + 60;
          return `<circle cx="${x}" cy="${y}" r="14" fill="${wallLight}" opacity="0.6"/>`;
        }).join("")
      : Array.from({ length: 12 }, (_, i) => `<rect x="${i * 170}" y="0" width="85" height="720" fill="${wallLight}" opacity="0.35"/>`).join("");
  return `
    <g class="room-base">
      <rect width="${W}" height="${H}" fill="${wall}"/>
      ${wallPattern}
      <rect x="-10" y="720" width="${W + 20}" height="190" fill="${wallDark}" ${ol(7)}/>
      <rect x="-10" y="720" width="${W + 20}" height="26" fill="${shade(wall, -0.25)}" ${ol(7)}/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 200 + 30}" y="770" width="150" height="110" rx="14" fill="none" stroke="${shade(wall, -0.3)}" stroke-width="6" opacity="0.5"/>`).join("")}
      <rect x="-10" y="900" width="${W + 20}" height="190" fill="${floor}" ${ol(7)}/>
      <rect x="-10" y="900" width="${W + 20}" height="22" fill="${shade(floor, -0.25)}"/>
      ${planks}
      <rect x="-10" y="1000" width="${W + 20}" height="90" fill="${shade(floor, -0.12)}" opacity="0.5"/>
    </g>`;
}

/** A chalkboard in a wooden frame; `content` is drawn in board coordinates (0..w, 0..h). */
export function chalkboard(x, y, w, h, content = "") {
  return `
    <g transform="translate(${x} ${y})">
      <rect x="-22" y="-22" width="${w + 44}" height="${h + 44}" rx="18" fill="#a5642c" ${ol()}/>
      <rect x="0" y="0" width="${w}" height="${h}" rx="8" fill="#2f5d48" ${ol(6)}/>
      <rect x="10" y="10" width="${w - 20}" height="${h * 0.3}" rx="6" fill="#fff" opacity="0.06"/>
      <g fill="none" stroke="#f4f1e6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.92"
         font-family="Lilita One, sans-serif">${content}</g>
      <rect x="${w * 0.15}" y="${h + 6}" width="${w * 0.7}" height="22" rx="6" fill="#8b5124" ${ol(6)}/>
      <rect x="${w * 0.6}" y="${h - 6}" width="70" height="20" rx="5" fill="#f4f1e6" ${ol(5)}/>
    </g>`;
}

/** A tacked-up poster; `content` uses poster coordinates (0..w, 0..h). */
export function poster(x, y, w, h, { paper = "#fff6df", tilt = 0, content = "" } = {}) {
  return `
    <g transform="translate(${x} ${y}) rotate(${tilt} ${w / 2} ${h / 2})">
      <rect x="8" y="12" width="${w}" height="${h}" rx="10" fill="${INK}" opacity="0.25"/>
      <rect width="${w}" height="${h}" rx="10" fill="${paper}" ${ol()}/>
      ${content}
      <circle cx="${w / 2}" cy="10" r="13" fill="#e2463f" ${ol(5)}/>
    </g>`;
}

/** A window with sky, clouds and a frame. */
export function windowPane(x, y, w, h, { sky = "#8fd8ff" } = {}) {
  return `
    <g transform="translate(${x} ${y})">
      <rect x="-18" y="-18" width="${w + 36}" height="${h + 36}" rx="14" fill="#fff" ${ol()}/>
      <rect width="${w}" height="${h}" rx="6" fill="${sky}" ${ol(6)}/>
      <g class="drift"><ellipse cx="${w * 0.3}" cy="${h * 0.3}" rx="${w * 0.18}" ry="${h * 0.08}" fill="#fff"/>
      <ellipse cx="${w * 0.4}" cy="${h * 0.26}" rx="${w * 0.12}" ry="${h * 0.09}" fill="#fff"/></g>
      <ellipse cx="${w * 0.5}" cy="${h * 1.05}" rx="${w * 0.7}" ry="${h * 0.25}" fill="#7cc957"/>
      <line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}" ${ol(10)}/>
      <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" ${ol(10)}/>
      <rect x="-28" y="${h + 10}" width="${w + 56}" height="22" rx="8" fill="#f2e3c6" ${ol(6)}/>
    </g>`;
}

/** A wall clock whose hands keep turning. */
export function clock(cx, cy, r = 70) {
  return `
    <g transform="translate(${cx} ${cy})">
      <circle r="${r + 10}" fill="#e2463f" ${ol()}/>
      <circle r="${r - 4}" fill="#fff" ${ol(5)}/>
      ${Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return `<line x1="${Math.sin(a) * (r - 18)}" y1="${-Math.cos(a) * (r - 18)}" x2="${Math.sin(a) * (r - 8)}" y2="${-Math.cos(a) * (r - 8)}" ${ol(5)}/>`;
      }).join("")}
      <g class="spin-slow" style="transform-box:fill-box;transform-origin:50% 100%"><line x1="0" y1="0" x2="0" y2="${-(r - 30)}" ${ol(8)}/></g>
      <g class="spin-fast" style="transform-box:fill-box;transform-origin:50% 100%"><line x1="0" y1="0" x2="0" y2="${-(r - 16)}" stroke="#e2463f" stroke-width="5" stroke-linecap="round"/></g>
      <circle r="8" fill="${INK}"/>
    </g>`;
}

/** A school desk seen from the front. */
export function desk(x, y, w = 300, { top = "#e9b86f" } = {}) {
  return `
    <g transform="translate(${x} ${y})">
      <rect x="20" y="40" width="16" height="150" fill="#7a8a99" ${ol(5)}/>
      <rect x="${w - 36}" y="40" width="16" height="150" fill="#7a8a99" ${ol(5)}/>
      <rect x="0" y="0" width="${w}" height="44" rx="10" fill="${top}" ${ol()}/>
      <rect x="10" y="44" width="${w - 20}" height="40" fill="${shade(top, -0.3)}" ${ol(5)}/>
    </g>`;
}

/** A leafy potted plant. */
export function plant(x, y, s = 1) {
  return `
    <g transform="translate(${x} ${y}) scale(${s})">
      <g class="sway-soft" style="transform-box:fill-box;transform-origin:50% 100%">
        <path d="M0 -60 C -80 -120 -90 -200 -40 -230 C -20 -160 -10 -110 0 -60Z" fill="#4cb84a" ${ol(6)}/>
        <path d="M0 -60 C 70 -130 110 -190 70 -240 C 30 -180 10 -120 0 -60Z" fill="#5fcf55" ${ol(6)}/>
        <path d="M0 -60 C -10 -150 10 -230 0 -290 C 30 -220 20 -140 0 -60Z" fill="#3fa53d" ${ol(6)}/>
      </g>
      <path d="M-60 -70 H60 L45 30 H-45Z" fill="#e2763f" ${ol()}/>
      <rect x="-70" y="-85" width="140" height="28" rx="8" fill="#f08a5a" ${ol(6)}/>
    </g>`;
}

/** Five-pointed star path centered on (0, 0). */
export function starPath(r = 30, inner = 0.45) {
  return Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * inner;
    return `${i === 0 ? "M" : "L"}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`;
  }).join(" ") + "Z";
}
