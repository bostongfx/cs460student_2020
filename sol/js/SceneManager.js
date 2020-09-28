import { OrbitControls } from "./sceneControllers/OrbitControls.js";
import { SolSystem } from "./sceneSubjects/SolSystem.js";
import { AU } from "./constants.js";

function SceneManager(canvas) {
    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const control = buildControls();
    const sceneSubjects = createSceneSubjects(scene);
    const ambientEffects = createAmbientEffects(scene);

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000000");
        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 75;
        const nearPlane = 1;
        const farPlane = 9.461e+15; // One light year
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 0, 2 * AU);
        return camera;
    }

    function buildControls() {
        const controls = new OrbitControls(camera, renderer.domElement);
        return controls;
    }

    function createSceneSubjects(scene) {
        return [
            new SolSystem(scene)
        ];
    }

    function createAmbientEffects(scene) {
        const ambientLight = new THREE.AmbientLight(0x202020, 1);
        scene.add(ambientLight);
        return { ambientLight: ambientLight };
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();
        // for (let subject of sceneSubjects) subject.update(elapsedTime);
        renderer.render(scene, camera);
    }

    this.onWindowResize = function() {
        const { width, height } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
}

export { SceneManager };