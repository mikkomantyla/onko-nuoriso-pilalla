// Placeholder until this world is drawn.
export function coverScene(root) {
  root.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-items:center;background:#3ec1d3">
    <div class="game-text" style="font-size:150px;text-align:center">Onko nuoriso pilalla?<br><span style="font-size:70px">(tulossa)</span></div></div>`;
  return { skip: () => false, destroy() {} };
}
