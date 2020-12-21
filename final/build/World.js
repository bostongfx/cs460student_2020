import * as THREE from "./web_modules/three.js";
import {OrbitControls} from "./web_modules/three/examples/jsm/controls/OrbitControls.js";


const createRenderer = (container) => {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.physicallyCorrectLights = true;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.append(renderer.domElement);
    return renderer;
}

const createCamera = (container) => {
    const aspect = container.clientWidth / container.clientHeight;
    const cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
    cameraPersp.position.set(3000, 5000, 6000);
    // cameraPersp.lookAt(new THREE.Vector3(1000, 0, 0));
    return cameraPersp;
}
const createScene = () => {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color('skyblue');
    scene.add(new THREE.GridHelper(10000, 100, 0x888888, 0x444444));
    scene.add(new THREE.AxesHelper(10000));
    return scene;
}

const addLights = (scene) => {
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10000, 10000, 10000);
    scene.add(light);
    const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( alight );
    const light1 = new THREE.DirectionalLight(0xffffff, 2);
    light1.position.set(-10000, -10000, -10000);
    scene.add(light1);
}

const addOrbitControls = (camera, renderer, updatables) => {
    updatables.push(new OrbitControls(camera, renderer.domElement));
}

export class World {
    constructor(container) {
        this.renderer = createRenderer(container);
        this.camera = createCamera(container);
        this.scene = createScene();
        addLights(this.scene);

        this.updatables = [];
        this.clock = new THREE.Clock();

        addOrbitControls(this.camera, this.renderer, this.updatables);

    }

    render() {
        this.renderer.render(this.scene, this.camera)
    };

    start() {
        this.renderer.setAnimationLoop(() => {
                const delta = this.clock.getDelta();
                this.updatables.forEach((obj) => {
                    obj.update(delta);
                    this.renderer.render(this.scene, this.camera);
                });
            }
        )
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

}