import {GUI} from "./web_modules/three/examples/jsm/libs/dat.gui.module.js"

export const controllers = {
    'moving' : false,
    'sun_speed': 500,
}

export const addInteractions = () => {
    const gui = new GUI();
    const moving = gui.addFolder('Controller');
    moving.add(controllers, 'moving');
    moving.add(controllers, 'sun_speed', 0, 2000);
    moving.open();
}