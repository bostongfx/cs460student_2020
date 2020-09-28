import { Planet } from './Planet.js';
import { Sun }    from './Sun.js';

const Sol = new Sun( {
    name: 'Sol',
    mass: 1.98892e30,
    radius: 6.957e8,
    texture: '../../textures/sun.jpg',
    color: new THREE.Color(1, 1, 0.6)
} );

const Earth = new Planet( {
    name: 'Earth',
    mass: 5.9742e24,
    radius: 6.371e6,
    texture: '../../textures/earth_dat.jpg',
    color: new THREE.Color(0,0,1)
} );

const SolBodies = {
    Earth: Earth,
    Sol: Sol
};

export { SolBodies };