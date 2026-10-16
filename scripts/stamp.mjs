// Stamps every script and the stylesheet in index.html with a content hash, so browsers fetch a
// changed file right away instead of waiting out GitHub Pages' 10-minute cache. Run before committing:
//   node scripts/stamp.mjs
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const hash = (file) => createHash("sha1").update(readFileSync(join(root, file))).digest("hex").slice(0, 8);

const scripts = readdirSync(join(root, "js"), { recursive: true })
  .filter((f) => f.endsWith(".js"))
  .map((f) => `js/${f}`)
  .sort();

const imports = Object.fromEntries(scripts.map((f) => [`./${f}`, `./${f}?v=${hash(f)}`]));
const importMap = `<script type="importmap">\n${JSON.stringify({ imports }, null, 2)}\n    </script>`;

let html = readFileSync(join(root, "index.html"), "utf8");
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/, importMap);
html = html.replace(/href="css\/style\.css(\?v=\w+)?"/, `href="css/style.css?v=${hash("css/style.css")}"`);
html = html.replace(/src="js\/main\.js(\?v=\w+)?"/, `src="js/main.js?v=${hash("js/main.js")}"`);
writeFileSync(join(root, "index.html"), html);
console.log(`Stamped ${scripts.length} scripts and the stylesheet.`);
