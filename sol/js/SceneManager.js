// import { OrbitControls } from "https://threejs.org/examples/js/controls/OrbitControls.js";
import { SolSystem } from "./sceneSubjects/SolSystem.js";
import { AU } from "./constants.js";

function SceneManager(canvas) {
    const clock = new THREE.Clock();
    const timeline = [];
    const gui = new dat.GUI();

    let step = 1;

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

    let controlsTarget = undefined;
    let controlsTweening = false;
    let cameraTarget = undefined;
    let cameraTweening = false;

    this.onWindowResize = function() {
        const { width, height } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    let calculateTweenVector = function(object) {
        const radius = object.radius * controller.scaleMultiplier * object.scaleFactor;
        const length = object.position.distanceTo(camera.position);
        const factor = (length - 3*radius) / length;
        const newPos = object.position.clone().sub(camera.position).multiplyScalar(factor).add(camera.position);
        return newPos;
    }

    let demoCounter = 1;
    const controller = {
        // stepSize: 23.93*3600, // 1 day per second
        stepSize: 1, // 1 second per second
        scaleMultiplier: 1,
        demo: function() {
            if (!cameraTweening) {
                const target = sceneSubjects.bodies[demoCounter++];
                const newPos = calculateTweenVector(target);
                controlsTarget = target;
                cameraTarget = target;
                controls.tween.to(target.position, 2000).start();
                camera.tween.to(newPos, 8000).start();
            }
        },
    }

    const timeFolder = gui.addFolder('Time Stuff');
    timeFolder.add(controller, 'stepSize', -23.93*3600, 23.93*3600, 1);
    timeFolder.open();



    const sizeFolder = gui.addFolder('Size Stuff');
    sizeFolder.add(controller, 'scaleMultiplier', 0, 2, 0.0001).onChange(function(val) {
        sceneSubjects.updateSize(val);
    });
    sizeFolder.open();


    const demoFolder = gui.addFolder('Demo');
    demoFolder.add(controller, 'demo');
    demoFolder.open();

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
            const obj = intersects[0].object.parent;
            controlsTarget = obj;
            cameraTarget = obj;
            const newPos = calculateTweenVector(obj);

            controls.tween.to(obj.position, 2000).start();
            camera.tween.to(newPos, 2000).start();
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
        camera.tween = new TWEEN.Tween(camera.position).onStart(function() {
            cameraTweening = true;
        }).onComplete(function() {
            cameraTweening = false;
        });
        return camera;
    }

    function buildControls() {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.tween = new TWEEN.Tween(controls.target).onStart(function() {
            controlsTweening = true;
        }).onComplete(function() {
            controlsTweening = false;
        });
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
        let dt = (elapsedTime / step++) * controller.stepSize;
        sceneSubjects.update(dt);
    }

    this.update = function() {
        TWEEN.update();
        this.recordTimeSlice();
        renderer.render(scene, camera);
        if (!controlsTweening && controlsTarget !== undefined) {
            controls.target.copy(controlsTarget.position);
        }
        if (!cameraTweening && cameraTarget !== undefined) {
            camera.lookAt(cameraTarget.position);
        }
        controls.update();
    }
}

export { SceneManager };