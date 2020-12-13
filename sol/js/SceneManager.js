// import { OrbitControls } from "https://threejs.org/examples/js/controls/OrbitControls.js";
import { SolSystem } from "./sceneSubjects/SolSystem.js";
import { AU } from "./constants.js";

function SceneManager(canvas) {
    const clock = new THREE.Clock();
    const timeline = [];
    let step = 0;
    const stepSize = 6000;

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls();
    const sceneSubjects = createSceneSubjects(scene);
    const ambientEffects = createAmbientEffects(scene);

    this.onWindowResize = function() {
        const { width, height } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    this.handleOnClick = function(e) {
        if (!e.shiftKey) {
            e.preventDefault();
            return false;
        }
        const pixel_coords = new THREE.Vector2( e.clientX, e.clientY );
        const vp_coords = new THREE.Vector2(
            ( pixel_coords.x / window.innerWidth ) * 2 - 1,
            -(pixel_coords.y / window.innerHeight) * 2 + 1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vp_coords, camera);
        const intersects = raycaster.intersectObjects(sceneSubjects.bodies, true);
        if (intersects.length > 0) {
            // intersects[0].object.add(camera);
            const controlTarget = intersects[0].object.parent.position;
            const radius = intersects[0].object.parent.radius;
            const camPos = intersects[0].object.parent.position.clone()
                .add(new THREE.Vector3(-3 * radius, 3 * radius, 3 * radius));
            controls.tween.to(controlTarget, 2000).start();
            camera.tween.to(camPos, 2000).start();
        }
    }

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
        camera.position.set(0, 10*AU, 0);
        camera.tween = new TWEEN.Tween(camera.position);
        return camera;
    }

    function buildControls() {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.tween = new TWEEN.Tween(controls.target);
        return controls;
    }

    function createAmbientEffects(scene) {
        const ambientLight = new THREE.AmbientLight(0x202020, 1);
        scene.add(ambientLight);
        return { ambientLight: ambientLight };
    }

    function createSceneSubjects(scene) {
        return new SolSystem(scene);
    }

    this.recordTimeSlice = function() {
        const elapsedTime = clock.getElapsedTime();
        sceneSubjects.update(elapsedTime, step++, stepSize);
    }

    this.update = function() {
        TWEEN.update();
        this.recordTimeSlice();
        renderer.render(scene, camera);
        controls.update();
    }
}

export { SceneManager };