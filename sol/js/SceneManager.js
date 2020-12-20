import { SolSystem } from "./sceneSubjects/SolSystem.js";
import { AU } from "./constants.js";

function SceneManager(canvas) {
    const clock = new THREE.Clock();
    const gui = new dat.GUI();
    const systemScale = 1/AU;

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    let demoCounter = 1;
    const controller = {
        // stepSize: 23.93*3600, // 1 day per second
        stepSize: 1, // 1 second per second
        scaleMultiplier: 1,
        pathOpacity: 0.25,
        pathVisible: function() { sceneSubjects.togglePathVisibility() },

        // These variables assist OrbitControls in pointing at a moving body.
        controlsTarget: undefined,
        cameraTarget: undefined,

        // These prevent additional tween actions during a tween.
        controlsTweening: false,
        cameraTweening: false,

        lightMapSize: 4,

        // Repeatedly click the demo button to iterate viewing of planets
        demo: function() {
            if (!controller.cameraTweening) {
                const target = sceneSubjects.allBodies[demoCounter++];
                const newPos = calculateTweenVector(target);
                controller.controlsTarget = target;
                controller.cameraTarget = target;
                controls.tween.to(target.position, 2000).start();
                camera.tween.to(newPos, 8000).start();
                if (demoCounter === sceneSubjects.bodies.length) {
                    demoCounter = 0;
                }
            }
        },
    }

    const scene = buildScene();
    const renderer = buildRenderer(screenDimensions);
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

    // Calculates a vector from current camera position to 3*radius away
    // from the new target.
    const calculateTweenVector = function(object) {
        const multiplier = Math.max(1, controller.scaleMultiplier * object.scaleFactor);
        const radius = object.radius * multiplier;
        console.log(object.radius, multiplier, radius);
        const length = object.position.distanceTo(camera.position);
        const factor = (length - 3*radius) / length;
        const newPos = object.position.clone().sub(camera.position).multiplyScalar(factor).add(camera.position);
        return newPos;
    }

    const timeFolder = gui.addFolder('Time Stuff');
    timeFolder.add(controller, 'stepSize', -23.93*3600, 23.93*3600*10, 1);
    timeFolder.open();

    const sizeFolder = gui.addFolder('Size Stuff');
    sizeFolder.add(controller, 'scaleMultiplier', 0, 1, 0.001)
        .onChange(function(val) { sceneSubjects.updateSize(val) });
    sizeFolder.open();

    const pathFolder = gui.addFolder('Path Stuff');
    pathFolder.add(controller, 'pathOpacity', 0, 1, 0.01)
        .onChange(function(val) { sceneSubjects.updatePathOpacity(val) });
    pathFolder.add(controller, 'pathVisible');
    pathFolder.open();

    const demoFolder = gui.addFolder('Demo');
    demoFolder.add(controller, 'demo');
    demoFolder.open();

    this.handleOnClick = function(e) {
        if (e.shiftKey) {
            // If shift key held, move to target
            this.clickToTarget(new THREE.Vector2( e.clientX, e.clientY ));
        } else {
            e.preventDefault();
            return false;
        }
    }

    // Uses a raycaster to select the clicked target, then moves camera to it.
    this.clickToTarget = function(pixel_coords) {
        const vp_coords = new THREE.Vector2(
            ( pixel_coords.x / window.innerWidth ) * 2 - 1,
            -(pixel_coords.y / window.innerHeight) * 2 + 1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vp_coords, camera);
        const intersects = raycaster.intersectObjects(sceneSubjects.allBodies, true);
        if (intersects.length > 0) {
            const obj = intersects[0].object.parent;
            controller.controlsTarget = obj;
            controller.cameraTarget = obj;
            const newPos = calculateTweenVector(obj);
            console.log(obj, obj.position, newPos);

            controls.tween.to(obj.position, 2000).start();
            camera.tween.to(newPos, 2000).start();
        }
    }

    this.handleKeyDown = function(e) {
        // Nothing to do yet
    }

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000000");
        return scene;
    }

    function buildRenderer({ width, height }) {
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            logarithmicDepthBuffer: true,
        });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.BasicShadowMap;
        // renderer.physicallyCorrectLights = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 75;
        const nearPlane = systemScale;
        // 1 light year, scaled down using systemScale
        const farPlane = 9.461e+15 * systemScale;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 2, 0);
        camera.tween = new TWEEN.Tween(camera.position).onStart(function() {
            controller.cameraTweening = true;
        }).onComplete(function() {
            controller.cameraTweening = false;
        }).easing( TWEEN.Easing.Cubic.InOut );
        return camera;
    }

    function buildControls() {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.tween = new TWEEN.Tween(controls.target).onStart(function() {
            controller.controlsTweening = true;
        }).onComplete(function() {
            controller.controlsTweening = false;
        }).easing( TWEEN.Easing.Cubic.InOut );
        return controls;
    }

    function createAmbientEffects(scene) {
        const ambientLight = new THREE.AmbientLight(0x202020, 0.5);
        scene.add(ambientLight);
        return { ambientLight: ambientLight };
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = new SolSystem(scene, controller.scaleMultiplier, systemScale);
        return sceneSubjects;
    }

    // Calculates the time slice to calculate, then passes it to system
    let step = 1;
    this.updateSubjects = function() {
        const elapsedTime = clock.getElapsedTime();
        let dt = (elapsedTime / step++) * controller.stepSize;
        sceneSubjects.update(dt);
    }

    // Makes sure the camera is pointing at the target and that the
    // Oribit Controls are targeting it as it moves.
    this.updateCamAndControls = function() {
        if (!controller.controlsTweening && controller.controlsTarget !== undefined) {
            controls.target.copy(controller.controlsTarget.position);
        }
        if (!controller.cameraTweening && controller.cameraTarget !== undefined) {
            camera.lookAt(controller.cameraTarget.position);
        }
        controls.update();
    }

    this.update = function() {
        TWEEN.update();
        this.updateSubjects();
        renderer.render(scene, camera);
        this.updateCamAndControls();
    }
}

export { SceneManager };