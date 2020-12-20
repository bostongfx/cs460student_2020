import { SceneManager } from "./SceneManager.js";

// The canvas from index.html
const canvas = document.getElementById('canvas');

// The object running things
const sceneManager = new SceneManager(canvas);

// Is the render loop paused?
let paused = false;

// Setup, then start the render loop
bindEventListeners();
render();

// Event listeners can add a layer of control over 'in-app' controls.
// See handleKeyDown for an example
function bindEventListeners() {
    window.onresize = resizeCanvas;
    window.onclick = handleOnClick;
    window.onkeydown = handleKeyDown;
    resizeCanvas();
}

// Listen for top-level (escape, for example) key presses here, and do
// whatever action you think might work well there, for example
// (escape -> menu, p -> pause, etc).
// Then pass in-app handling on to the Scene Manager.
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        paused = !paused;
        // open / close menu
        // TODO: Build menu
    }
    sceneManager.handleKeyDown(e);
}

// Mouse listeners can go here too. Example: Listen for ctrl+click for
// some kind of special handling.
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
    if (!paused) {
        sceneManager.update();
    }
}