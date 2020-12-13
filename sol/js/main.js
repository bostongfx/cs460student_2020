import { SceneManager } from "./SceneManager.js";

const canvas = document.getElementById('canvas');
const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
    window.onresize = resizeCanvas;
    window.onclick = handleOnClick;
    resizeCanvas();
}

function handleOnClick(e) {
    sceneManager.handleOnClick(e);
}
function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}