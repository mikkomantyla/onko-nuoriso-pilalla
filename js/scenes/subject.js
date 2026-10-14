import { rooms } from "../art/rooms/index.js";
import { W, H, starPath, INK } from "../art/kit.js";

const TITLE_AT_MS = 1300;
const TITLE_HOLD_MS = 2300;
const QUESTIONS_AT_MS = TITLE_AT_MS + TITLE_HOLD_MS + 450;

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function spark(x, y, color, delay) {
  return `<svg class="spark" viewBox="-40 -40 80 80" style="left:${x}px;top:${y}px;animation-delay:${delay}s">
    <path d="${starPath(34)}" fill="${color}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`;
}

/**
 * A classroom world: the room builds itself, the subject's name bounces in and away,
 * then the three questions pop in while the room's idle loops keep playing.
 */
export function subjectScene(root, subject) {
  const room = rooms[subject.key];
  root.style.setProperty("--subject-color", subject.color);
  root.innerHTML = `
    <svg class="backdrop room-${subject.key}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
      ${room.draw()}
    </svg>
    <div class="subject-title">
      <div class="banner" style="display:none">
        <span class="kicker">Tervetuloa tunnille!</span>
        <span class="game-text">${escapeHtml(subject.title)}</span>
        ${spark(-50, -40, "#ffd23f", 0)}${spark(-20, 150, "#fff", 0.5)}
      </div>
    </div>
    <div class="questions">
      ${subject.questions
        .map((q, i) => {
          const text = typeof q === "string" ? q : q.text;
          const symbol = typeof q === "string" ? "" : `<div class="q-symbol" aria-label="nuottiavain">${q.symbol}</div>`;
          return `<div class="q-card" style="--i:${i}">
            <div class="q-num"><span class="game-text">${i + 1}</span></div>
            <div class="q-text">${escapeHtml(text)}</div>${symbol}
          </div>`;
        })
        .join("")}
    </div>`;

  const titleLayer = root.querySelector(".subject-title");
  const banner = root.querySelector(".banner");
  const questions = root.querySelector(".questions");
  const timers = [];
  let questionsShown = false;

  const showQuestions = () => {
    if (questionsShown) return;
    questionsShown = true;
    titleLayer.remove();
    questions.classList.add("show");
    root.classList.add("intro-done");
  };

  timers.push(
    setTimeout(() => {
      banner.style.display = "";
      // Right-hand sparks depend on the banner's laid-out width.
      const w = banner.offsetWidth;
      banner.insertAdjacentHTML("beforeend", spark(w - 30, -30, "#ff5d8f", 0.3) + spark(w - 60, 170, "#3ec1d3", 0.8));
    }, TITLE_AT_MS),
    setTimeout(() => titleLayer.classList.add("leaving"), TITLE_AT_MS + TITLE_HOLD_MS),
    setTimeout(showQuestions, QUESTIONS_AT_MS)
  );

  return {
    skip() {
      if (questionsShown) return false;
      showQuestions();
      return true;
    },
    destroy() {
      timers.forEach(clearTimeout);
    },
  };
}
