import { schools, subjects } from "../data.js";
import { INK, starPath } from "../art/kit.js";
import { playSfx } from "../sfx.js";
import {
  BASES,
  MODIFIERS,
  academicAverage,
  bestSchool,
  formatAverage,
  gradeLabel,
  gradeWord,
  modifierAllowed,
} from "../report/grades.js";

const INTRO_MS = 2800;
const BIG_REPORT_MS = 5000;
const COUNT_MS = 1600;

const rows = [...subjects.map((s) => ({ key: s.key, title: s.title })), { key: "kaytos", title: "Käytös" }];

// Kept while the page is open, so stepping back and forth does not lose what was entered.
const entered = { name: "", grades: {} };

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function finnishDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const crest = () => `
  <svg viewBox="-60 -70 120 140" class="rep-crest" aria-hidden="true">
    <path d="M-50 -60 H50 V0 C50 40 20 58 0 66 C-20 58 -50 40 -50 0Z" fill="#1f4fa8" stroke="${INK}" stroke-width="5"/>
    <path d="M-30 -14 Q-15 -24 0 -14 Q15 -24 30 -14 V22 Q15 12 0 22 Q-15 12 -30 22Z" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <path d="M0 -14 V22" stroke="${INK}" stroke-width="3"/>
    <path d="${starPath(13)}" transform="translate(0 -38)" fill="#ffd23f" stroke="${INK}" stroke-width="3"/>
  </svg>`;

function reportCard() {
  const subjectRows = rows
    .filter((r) => r.key !== "kaytos")
    .map((r) => {
      const g = entered.grades[r.key];
      return `<tr><td>${escapeHtml(r.title)}</td><td class="num">${gradeLabel(g)}</td><td class="word">${gradeWord(g)}</td></tr>`;
    })
    .join("");
  const conduct = entered.grades.kaytos;
  const name = entered.name.trim() || "Nimetön Nuori";
  return `
    <article class="rep-card">
      <header>
        ${crest()}
        <div class="rep-school">ONKO NUORISO PILALLA -YLÄASTE</div>
        <h2>PÄÄTTÖTODISTUS</h2>
        <div class="rep-sub">perusopetuksen koko oppimäärästä</div>
      </header>
      <div class="rep-pupil"><span>Oppilas</span><strong>${escapeHtml(name)}</strong><span class="rep-class">luokka 9B</span></div>
      <table>
        <thead><tr><th>Oppiaine</th><th class="num">Arvosana</th><th class="word"></th></tr></thead>
        <tbody>${subjectRows}</tbody>
        <tbody class="rep-conduct"><tr><td>Käytös</td><td class="num">${gradeLabel(conduct)}</td><td class="word">${gradeWord(conduct)}</td></tr></tbody>
      </table>
      <footer>
        <div class="rep-sign">
          <div>Helsingissä ${finnishDate(new Date())}</div>
          <svg viewBox="0 0 220 60" aria-hidden="true"><path d="M8 44 C 30 4 40 58 62 30 S 92 10 104 36 S 140 50 150 24 C 160 6 176 46 212 18" fill="none" stroke="#1f2f6b" stroke-width="3" stroke-linecap="round"/></svg>
          <div class="rep-line">Rehtori</div>
        </div>
        <div class="rep-stamp">HYVÄKSYTTY<span>★ 2026 ★</span></div>
      </footer>
    </article>`;
}

function form() {
  const row = (r) => {
    const g = entered.grades[r.key];
    const bases = BASES.map(
      (b) => `<button type="button" class="rep-grade${g?.base === b ? " on" : ""}" data-key="${r.key}" data-base="${b}" aria-pressed="${g?.base === b}">${b}</button>`
    ).join("");
    const mods = MODIFIERS.map((m) => {
      const disabled = !g || !modifierAllowed(g.base, m.key);
      return `<button type="button" class="rep-mod${g?.modifier === m.key ? " on" : ""}" data-key="${r.key}" data-mod="${m.key}" aria-pressed="${g?.modifier === m.key}" aria-label="${r.title} ${m.label}"${disabled ? " disabled" : ""}>${m.label}</button>`;
    }).join("");
    return `<div class="rep-row${g ? " done" : ""}"><span class="rep-label">${escapeHtml(r.title)}</span><span class="rep-bases">${bases}</span><span class="rep-mods">${mods}</span></div>`;
  };
  const done = rows.filter((r) => entered.grades[r.key]).length;
  return `
    <label class="rep-name">Oppilaan nimi <input type="text" maxlength="40" placeholder="Kirjoita nimi…" value="${escapeHtml(entered.name)}" /></label>
    <div class="rep-grid">${rows.map(row).join("")}</div>
    <div class="rep-actions">
      <button type="button" class="rep-random">🎲 Arvo arvosanat</button>
      <span class="rep-count">${done}/${rows.length} merkitty</span>
      <button type="button" class="rep-submit"${done === rows.length ? "" : " disabled"}>Valmis! ✏️</button>
    </div>`;
}

function randomGrade() {
  const base = 5 + Math.floor(Math.random() * 6);
  const mods = [null, null, ...MODIFIERS.map((m) => m.key)].filter((m) => m === null || modifierAllowed(base, m));
  return { base, modifier: mods[Math.floor(Math.random() * mods.length)] };
}

const bunting = () =>
  `<svg class="rep-bunting" viewBox="0 0 1920 120" aria-hidden="true">
    <path d="M0 20 Q960 90 1920 20" fill="none" stroke="${INK}" stroke-width="5"/>
    ${Array.from({ length: 22 }, (_, i) => {
      const x = 30 + i * 88;
      const y = 20 + Math.sin((x / 1920) * Math.PI) * 50;
      return `<path class="rep-flag" style="--f:${i}" d="M${x} ${y} L${x + 70} ${y + 2} L${x + 35} ${y + 62}Z" fill="${i % 2 ? "#fff" : "#1f5fbf"}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    }).join("")}
  </svg>`;

const confetti = () =>
  Array.from({ length: 40 }, (_, i) => {
    const color = ["#ffd23f", "#ff5d8f", "#3ec1d3", "#7bd65b", "#ff8f2e", "#fff"][i % 6];
    return `<span class="rep-confetti" style="left:${(i * 47) % 100}%;--c:${i};background:${color}"></span>`;
  }).join("");

export function reportScene(root) {
  root.innerHTML = `
    <div class="rep-bg"></div>
    ${bunting()}
    <div class="rep-intro game-text">Todistusten<br />aika!</div>
    <section class="rep-form" hidden></section>
    <section class="rep-reveal" hidden></section>`;

  const intro = root.querySelector(".rep-intro");
  const formEl = root.querySelector(".rep-form");
  const reveal = root.querySelector(".rep-reveal");
  const timers = [];
  let frame = 0;
  let phase = "intro";

  const renderForm = () => {
    formEl.innerHTML = form();
  };

  const showForm = () => {
    if (phase !== "intro") return;
    phase = "form";
    intro.remove();
    renderForm();
    formEl.hidden = false;
  };

  const finishReveal = () => {
    timers.forEach(clearTimeout);
    cancelAnimationFrame(frame);
    phase = "done";
    reveal.classList.add("small", "show-average", "show-school");
    reveal.querySelector(".rep-average-value").textContent = formatAverage(academicAverage(subjects, entered.grades));
  };

  const startReveal = () => {
    phase = "reveal";
    formEl.hidden = true;
    const average = academicAverage(subjects, entered.grades);
    const school = bestSchool(schools, average);
    reveal.innerHTML = `
      ${reportCard()}
      <div class="rep-average"><span>Lukuaineiden keskiarvo</span><strong class="rep-average-value">0,00</strong></div>
      <div class="rep-result">
        <div class="rep-passed game-text">Pääsit</div>
        ${
          school
            ? `<div class="rep-school-name">${escapeHtml(school.name)}</div>
               <div class="rep-limit">${school.year} keskiarvoraja: ${formatAverage(school.limit)}</div>`
            : `<div class="rep-school-name">kesäkouluun!</div>
               <div class="rep-limit">Keskiarvo ei riittänyt yhteenkään lukioon.</div>`
        }
      </div>
      <div class="rep-confetti-layer">${confetti()}</div>`;
    reveal.hidden = false;
    playSfx("stamp", 0.15);

    timers.push(
      setTimeout(() => {
        reveal.classList.add("small");
        playSfx("drumroll", 0);
      }, BIG_REPORT_MS),
      setTimeout(() => {
        reveal.classList.add("show-average");
        const value = reveal.querySelector(".rep-average-value");
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / COUNT_MS);
          value.textContent = formatAverage(average * (1 - (1 - p) ** 3));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, BIG_REPORT_MS + 900),
      setTimeout(() => {
        reveal.classList.add("show-school");
        phase = "done";
        playSfx("fanfare", 0);
      }, BIG_REPORT_MS + 900 + COUNT_MS + 500)
    );
  };

  formEl.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) entered.name = event.target.value;
  });

  formEl.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("button") : null;
    if (!button) return;
    const { key, base, mod } = button.dataset;
    if (base) {
      const current = entered.grades[key];
      const b = Number(base);
      const modifier = current?.modifier && modifierAllowed(b, current.modifier) ? current.modifier : null;
      entered.grades[key] = { base: b, modifier };
    } else if (mod) {
      const g = entered.grades[key];
      entered.grades[key] = { ...g, modifier: g.modifier === mod ? null : mod };
    } else if (button.classList.contains("rep-random")) {
      rows.forEach((r) => (entered.grades[r.key] = randomGrade()));
    } else if (button.classList.contains("rep-submit")) {
      startReveal();
      return;
    }
    renderForm();
  });

  timers.push(setTimeout(showForm, INTRO_MS));

  return {
    // Arrow keys never leave this world mid-way: they fast-forward the intro and the reveal instead.
    skip() {
      if (phase === "intro") showForm();
      else if (phase === "reveal") finishReveal();
      else if (phase === "done") return false;
      return true;
    },
    destroy() {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
    },
  };
}
