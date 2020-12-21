import {World} from "./World.js";
import * as THREE from "three";
import {addMotions, addSolarMeshes, celestialBodies} from "./celestialBody.js";
import {addInteractions} from "./gui.js";
import {createBGDots} from "./background_dots.js";


const container = document.querySelector('#scene-container');
export const world = new World(container);
export const updatables = world.updatables;
export let camera = world.camera;
createBGDots(world.scene);

const solar_meshes = addSolarMeshes(world);
addMotions(solar_meshes, celestialBodies);

addInteractions();
// world.scene.rotateZ(MathUtils.degToRad(-90));

world.start();
window.world = world;
window.THREE = THREE;