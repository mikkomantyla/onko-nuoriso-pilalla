import { subjects } from "./data.js";
import { isMuted, playWhoosh, setMuted, setTrack, startMusic } from "./music.js";
import { pisaScene } from "./scenes/pisa.js";
import { coverScene } from "./scenes/cover.js";
import { subjectScene } from "./scenes/subject.js";
import { endScene } from "./scenes/end.js";
import { reportScene } from "./scenes/report.js";
import { playSfx } from "./sfx.js";

const STAGE_W = 1920;
const STAGE_H = 1080;
const WIPE_COLORS = ["#ff5d8f", "#ffd23f", "#3ec1d3", "#7bd65b", "#ff8f2e", "#a66cff"];

// Each world: a label for the progress pill, its music track, and a scene factory `(root) => { skip(), destroy() }`.
const worlds = [
  // The Pisa world plays its own sound effect once the chart lands.
  { label: "Pisa-tulokset", track: "pisa", sfxOnEnter: false, create: pisaScene },
  { label: "Onko nuoriso pilalla?", track: "cover", create: coverScene },
  ...subjects.map((subject, i) => ({
    label: `${subject.title} · ${i + 1}/${subjects.length}`,
    track: subject.key,
    create: (root) => subjectScene(root, subject),
  })),
  { label: "Vastausten aika!", track: "end", create: endScene },
  { label: "Todistusten aika!", track: "todistus", create: reportScene },
];

const stage = document.getElementById("stage");
const sceneRoot = document.getElementById("scene");
const wipe = document.getElementById("wipe");
const progress = document.getElementById("progress");
const muteBtn = document.getElementById("btn-mute");

let index = 0;
let current = null;
let transitioning = false;

function fitStage() {
  const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
  stage.style.transform = `scale(${scale}) translate(-50%, -50%)`;
}

function mount(i) {
  current?.destroy();
  sceneRoot.replaceChildren();
  const root = document.createElement("div");
  root.className = "scene";
  sceneRoot.append(root);
  current = worlds[i].create(root);
  progress.textContent = worlds[i].label;
  setTrack(worlds[i].track);
  if (worlds[i].sfxOnEnter !== false) playSfx(worlds[i].track, 0.45);
}

// Chunky circles cover the stage, the world swaps underneath, and they shrink away again.
function buildWipe() {
  wipe.replaceChildren();
  const blobs = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const blob = document.createElement("div");
      blob.className = "blob";
      blob.style.left = `${(col + 0.5 + (row % 2) * 0.3) * (STAGE_W / 6)}px`;
      blob.style.top = `${(row + 0.5) * (STAGE_H / 4)}px`;
      blob.style.background = WIPE_COLORS[(row * 6 + col * 5) % WIPE_COLORS.length];
      wipe.append(blob);
      blobs.push({ blob, order: col + row * 0.6 });
    }
  }
  return blobs;
}

async function goTo(target) {
  if (transitioning || target === index || target < 0 || target >= worlds.length) return;
  transitioning = true;
  playWhoosh();
  const blobs = buildWipe();
  const forward = target > index;
  const grow = blobs.map(({ blob, order }) =>
    blob.animate(
      [{ transform: "scale(0)" }, { transform: "scale(1.15)" }],
      { duration: 380, delay: (forward ? order : 6 - order) * 55, easing: "cubic-bezier(.3,1.4,.6,1)", fill: "forwards" }
    ).finished
  );
  await Promise.all(grow);
  index = target;
  mount(index);
  const shrink = blobs.map(({ blob, order }) =>
    blob.animate(
      [{ transform: "scale(1.15)" }, { transform: "scale(0)" }],
      { duration: 360, delay: (forward ? order : 6 - order) * 45, easing: "cubic-bezier(.5,0,.8,.4)", fill: "forwards" }
    ).finished
  );
  await Promise.all(shrink);
  wipe.replaceChildren();
  transitioning = false;
}

function next() {
  startMusic();
  // A world still running its intro fast-forwards first; the next press moves on.
  if (current?.skip()) return;
  goTo(index + 1);
}

function prev() {
  startMusic();
  goTo(index - 1);
}

function home() {
  startMusic();
  goTo(0);
}

function toggleMute() {
  startMusic();
  setMuted(!isMuted());
  muteBtn.setAttribute("aria-pressed", String(isMuted()));
  muteBtn.setAttribute("aria-label", isMuted() ? "Musiikki päälle" : "Mykistä musiikki");
  try {
    localStorage.setItem("muted", isMuted() ? "1" : "0");
  } catch {
    // Storage can be unavailable (private mode); muting still works for this visit.
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen?.();
}

window.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target instanceof HTMLInputElement) return;
  switch (event.key) {
    case "ArrowRight":
    case "PageDown":
    case " ":
    case "Enter":
      if (event.key === "Enter" && event.target instanceof HTMLButtonElement) return;
      event.preventDefault();
      next();
      break;
    case "ArrowLeft":
    case "PageUp":
      event.preventDefault();
      prev();
      break;
    case "Home":
      event.preventDefault();
      home();
      break;
    case "m":
    case "M":
      toggleMute();
      break;
    case "f":
    case "F":
      toggleFullscreen();
      break;
  }
});

document.getElementById("btn-home").addEventListener("click", home);
document.getElementById("btn-next").addEventListener("click", next);
document.getElementById("btn-prev").addEventListener("click", prev);
document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
muteBtn.addEventListener("click", toggleMute);
sceneRoot.addEventListener("click", (event) => {
  if (!(event.target instanceof Element) || !event.target.closest("button")) startMusic();
});
document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-fullscreen", !!document.fullscreenElement);
});
window.addEventListener("resize", fitStage);

// Buttons are clicked with the mouse; keep keyboard arrows driving the slideshow, not the focused button.
document.querySelectorAll(".hud-btn").forEach((btn) => btn.addEventListener("mouseup", () => btn.blur()));

try {
  if (localStorage.getItem("muted") === "1") {
    setMuted(true);
    muteBtn.setAttribute("aria-pressed", "true");
  }
} catch {
  // No stored preference.
}

const start = Number(new URLSearchParams(location.search).get("w"));
index = Number.isInteger(start) && start >= 0 && start < worlds.length ? start : 0;
fitStage();
mount(index);

// Lets the end screen send everyone back to the first world.
window.addEventListener("game:home", home);
