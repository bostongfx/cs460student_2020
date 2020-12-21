import * as THREE from "three";
import {MathUtils} from "three";

let speed = 10;

function addSphere(parent, position, sun_size, segs, color) {
    const sphereGeometry = new THREE.SphereGeometry(sun_size, segs, segs);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: color,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    parent.add(sphere);
    sphere.position.copy(position);
    return sphere;
}

function addTrace(parent, position, trace_size, trace_num, color) {
    const trace = []
    for (let i = 0; i < trace_num; i++) {
        trace.push(addSphere(parent, position, trace_size, 2, color));
        trace[i].position.copy(position);
    }
    return trace;
}

export const addMovingSun = (world) => {
    const sun_size = 10, trace_size = 3, trace_num = 100,
        color = new THREE.Color('green'),
        postion = new THREE.Vector3(0, 0, 0);


    const sun = addSphere(world.scene, postion, sun_size, 20, color);
    const trace = addTrace(world.scene, postion, trace_size, trace_num, color);

    world.updatables.push(sun);
    sun.position.setX(0);

    let x = 0;
    sun.update = (delta) => {
        if (sun.position.distanceTo(trace[trace_num - 1].position) > 5) {
            const cur = trace.shift();
            cur.position.copy(sun.position);
            trace.push(cur);
        }
        x = sun.position.x + delta * speed;
        sun.position.setX(x);
    }
}


export const addMovingPlanet = (world) => {
    const planet_size = 5, trace_size = 1, trace_num = 100,
        color = new THREE.Color('red'),
        a = 50, b = 40, agular_speed = 30;
    const postion = new THREE.Vector3(0, 0, b);


    const planet = addSphere(world.scene, postion, planet_size, 20, color);
    const trace = addTrace(world.scene, postion, trace_size, trace_num, color);
    planet.theta = 0;

    world.updatables.push(planet);


    let x = 0, y = 0, z = 0;
    planet.update = (delta) => {

        planet.theta += MathUtils.degToRad(agular_speed) * delta;
        if (planet.position.distanceTo(trace[trace_num - 1].position) > 5) {
            const cur = trace.shift();
            cur.position.copy(planet.position);
            trace.push(cur);
        }

        x = planet.position.x + delta * speed;

        y = a * Math.sin(planet.theta);
        z = b * Math.cos(planet.theta);

        planet.position.fromArray([x, y, z]);

    }
}