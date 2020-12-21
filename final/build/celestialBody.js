import {MathUtils} from "./web_modules/three.js";
import * as THREE from "./web_modules/three.js";
import {updatables, world,camera} from "./main.js";
import {controllers} from "./gui.js";

export const scale = {
    'dis': Math.pow(10, -10),
    'radius': Math.pow(10, -6),
    'angular': 365 * MathUtils.degToRad(20)
};
export const celestialBodies = {
    'sun': {
        'radius': 300 * Math.pow(10, 6),
        'distance': 0,
        'texture': 'textures/sun.jpg'
    },

    'mercury': {
        'radius': 40.3 * Math.pow(10, 6),
        'distance': 600.79 * Math.pow(10, 10),
        'angular_speed': 88, //days
        'texture': 'textures/mercury.jpg',
        'traceNum': 100
    },

    'venus': {
        'radius': 60.6 * Math.pow(10, 6),
        'distance': 800.082 * Math.pow(10, 10),
        'angular_speed': 225,
        'texture': 'textures/venus_surface.jpg',
        'traceNum': 100
    },


    'earth': {
        'radius': 63.7 * Math.pow(10, 6),
        'distance': 120.496 * Math.pow(10, 11),
        'angular_speed': 365,
        'texture': 'textures/earth_day.jpg',
        'traceNum': 100
    },

    'mars': {
        'radius': 33.7 * Math.pow(10, 6),
        'distance': 150.28 * Math.pow(10, 11),
        'angular_speed': 687,
        'texture': 'textures/mars.jpg',
        'traceNum': 150
    },
    'jupiter': {
        'radius': 140 * Math.pow(10, 6),
        'distance': 220.783 * Math.pow(10, 11),
        'angular_speed': 12 * 365,
        'texture': 'textures/jupiter.jpg',
        'traceNum': 200
    },
    'saturn': {
        'radius': 120 * Math.pow(10, 6),
        'distance': 300.427 * Math.pow(10, 11),
        'angular_speed': 30 * 365,
        'texture': 'textures/saturn.jpg',
        'traceNum': 300

    },
    'uranus': {
        'radius': 46 * Math.pow(10, 6),
        'distance': 400.871 * Math.pow(10, 11),
        'angular_speed': 84 * 365,
        'texture': 'textures/uranus.jpg',
        'traceNum': 400
    },

    'neptune': {
        'radius': 44 * Math.pow(10, 6),
        'distance': 500.913 * Math.pow(10, 11),
        'angular_speed': 165 * 365,
        'texture': 'textures/neptune.jpg',
        'traceNum': 500
    },
}

export const addSolarMeshes = (world) => {
    const solar_meshes = {}
    for (let [name, config] of Object.entries(celestialBodies)) {
        solar_meshes[name] = addCelestialBody(world, name, config);

    }
    return solar_meshes;
}


export const addCelestialBody = (world, name, config) => {
    let r = config.radius * scale.radius;
    console.log(name)
    console.log(r);
    const geometry = new THREE.SphereBufferGeometry(r, 32, 32);
    const material = name == 'sun' ?
        new THREE.MeshMatcapMaterial({
            color: 0xffffff,
            map: new THREE.TextureLoader().load(config.texture)
        })
        :
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x050505,
            shininess: 100,
            map: new THREE.TextureLoader().load(config.texture)
        });
    const mesh = new THREE.Mesh(geometry, material);
    let x = name == 'sun' ? 0 : config.distance * scale.dis;
    console.log(x)
    mesh.position.setX(x);
    world.scene.add(mesh);

    if (name == 'saturn') {
        const geometry = new THREE.RingBufferGeometry(r * 5 / 4, r * 2, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 'yellow',
            specular: 0x050505,
            shininess: 100,
            map: new THREE.TextureLoader().load('textures/saturn_ring.png'),
            side: THREE.DoubleSide
        });

        const mesh1 = new THREE.Mesh(geometry, material);
        mesh1.rotateX(-Math.PI / 2);
        // mesh1.position.setX(x);
        mesh.add(mesh1);
    }

    return mesh;
}

export let speedY = 500;
let traceNum = 50;
let trace_distance = 1;

const createTracePoint = (mesh, config, color) => {
    const sphereGeometry = new THREE.SphereGeometry(config.radius / 4 * scale.radius, 10, 10);
    const sphereMaterial = new THREE.MeshBasicMaterial({color: color});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(mesh.position);
    mesh.parent.add(sphere);
    return sphere;
}
const addMotion2Sun = (mesh, config, color) => {
    const traces = [];
    for (let i = 0; i < traceNum; i++)
        traces.push(createTracePoint(mesh, config, color));
    let trace, dis;
    updatables.push(mesh);
    const axis = new THREE.Vector3(0, 1,0);
    axis.normalize();
    const ang = Math.random()* Math.PI;
    mesh.update = (delta) => {
        mesh.rotateOnAxis(axis,ang*delta);
        if (controllers.moving) {
            dis = controllers.sun_speed * delta;
            mesh.translateY(dis);
            world.camera.translateY(dis);
            // camera.lookAt(mesh.position);
            if (mesh.position.distanceTo(traces[traces.length - 1].position)
                >= trace_distance * config.radius * scale.radius) {
                trace = traces.shift();
                trace.position.copy(mesh.position);
                traces.push(trace);
            }
        }

    }
}

export const addMotion = (name, mesh, config, color) => {
    if (name == 'sun') {
        addMotion2Sun(mesh, config, color);
        return;
    }


    mesh.theta = 0, mesh.trace_timer = 0;
    updatables.push(mesh);

    const angular_speed = config.angular_speed * scale.angular * 4;
    const distance = config.distance * scale.dis;
    const traces = [];
    for (let i = 0; i < config['traceNum']; i++)
        traces.push(createTracePoint(mesh, config, color));
    let trace, dis, x, z, delta_angular;
    const axis = new THREE.Vector3(0, 1,0);
    axis.normalize();
    const ang = Math.random()* Math.PI;
    mesh.update = (delta) => {
        mesh.rotateOnAxis(axis,ang*delta);

        if (controllers.moving) {

            dis = controllers.sun_speed * delta;
            mesh.translateY(dis);
            delta_angular = 4 / config.angular_speed * delta * scale.angular;
            mesh.theta =
                (mesh.theta + delta_angular)
                % (2 * Math.PI);

            x = config.distance * scale.dis * Math.cos(mesh.theta);
            z = config.distance * scale.dis * Math.sin(mesh.theta);
            mesh.position.setX(x);
            mesh.position.setZ(z);
            if (mesh.position.distanceTo(traces[traces.length - 1].position)
                >= trace_distance * config.radius * scale.radius) {
                trace = traces.shift();
                trace.position.copy(mesh.position);
                traces.push(trace);
            }
        }


    }
}

export const addMotions = (meshes, configs) => {
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#6666FF'];
    let i = 0;
    for (let [name, mesh] of Object.entries(meshes))
        addMotion(name, mesh, configs[name], colors[i++]);

}