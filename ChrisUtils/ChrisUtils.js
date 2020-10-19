let gui;
const controller = {};


function createBasicCamera(window) {
    if (!gui) gui = new dat.GUI();
    let cameraGUI = gui.addFolder('Basic Camera');

    let ratio  = window.innerWidth / window.innerHeight;
    let zNear  = 1;
    let zFar   = 10000;

    let camera = new THREE.PerspectiveCamera(75, ratio, zNear, zFar);

    camera.position.set(32, 32, 60);
    cameraGUI.add(camera, 'fov', 20, 120).onChange(function() { camera.updateProjectionMatrix(); });
    cameraGUI.add(camera.position, 'x', -400, 400);
    cameraGUI.add(camera.position, 'y', -400, 400);
    cameraGUI.add(camera.position, 'z', -400, 400);
    cameraGUI.open();

    return camera;
}

function createDirectionalLight(scene) {
    if (!gui) gui = new dat.GUI();
    let lightGUI = gui.addFolder('Directional Light');

    controller.lightColor = 0xffffff;   // White light
    let light = new THREE.DirectionalLight(controller.lightColor, 1);
    let ambientLight = new THREE.AmbientLight(controller.lightColor, .3); // Soft white, full intensity

    light.position.set(32, 200, 8); // directly overhead

    lightGUI.addColor(controller, 'lightColor').onChange(function(val) { light.color.set(val) });

    lightGUI.add(light, 'intensity', 0, 1).onChange(function(val) { ambientLight.intensity = val/3 });
    lightGUI.add(light.position, 'x', -400, 400);
    lightGUI.add(light.position, 'y', -400, 400);
    lightGUI.add(light.position, 'z', -400, 400);
    lightGUI.open();

    scene.add(light);
    scene.add(ambientLight);
    return light;
}

function createAmbientLight() {
    if (!gui) gui = new dat.GUI();
    return ambientLight;
}

function createBasicCube() {
    if (!gui) gui = new dat.GUI();
    let cubeGUI = gui.addFolder('Basic Cube');
    controller.cubeSize = 22;
    controller.cubeColor = 0xffffff;

    let geometry = new THREE.BoxBufferGeometry( 1, 1, 1);
    let material = new THREE.MeshStandardMaterial({ color: controller.cubeColor });
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(0,0,0);
    cube.scale.x = 22;
    cube.scale.y = 22;
    cube.scale.z = 22;
    cubeGUI.add(controller, 'cubeSize', 1, 200).onChange(function(val) {
        cube.scale.x = val;
        cube.scale.y = val;
        cube.scale.z = val;
    });
    cubeGUI.addColor(controller, 'cubeColor').onChange(function() {
        cube.material.color.set(controller.cubeColor);
    });
    cubeGUI.open();
    return cube;
}
