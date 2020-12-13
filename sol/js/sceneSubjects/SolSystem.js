import { System } from './System.js';
import { Planet } from './Planet.js';
import { Sun }    from './Sun.js';
import { G, AU, STARSCALE, PLANETSCALE, PLUTOSCALE } from "../constants.js";

function SolSystem(scene) {
    System.call(this);
    this.setScene(scene);

    this.Earth = new Planet(  {
        name: 'Earth',
        mass: 5.9742e24,
        radius: 6.371e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, -29783),
        position: new THREE.Vector3(1*AU, 0, 0),
        texture: 'textures/earth_day.jpg',
        color: new THREE.Color(0.05, 0.05, 0.75),
        tilt: 23.4*Math.PI/180,
        dayLength: 23.9*3600,
    } );
    this.Sol = new Sun( {
        name: 'Sol',
        mass: 1.98892e30,
        radius: 6.957e8 * STARSCALE*4,
        velocity: new THREE.Vector3(0,0, 0),
        position: new THREE.Vector3(0, 0, 0),
        texture: 'textures/sun.jpg',
        color: new THREE.Color(1, 1, 0.6),
    } );
    this.Mercury = new Planet(  {
        name: 'Mercury',
        mass: 3.3e23,
        radius: 2.439e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, -47400),
        position: new THREE.Vector3(0.387*AU, 0, 0),
        texture: 'textures/mercury.jpg',
        color: new THREE.Color(1, 0.27, 0),
        tilt: 0.034*Math.PI/180,
        dayLength: 1407.6*3600,
    } );
    this.Venus = new Planet(  {
        name: 'Venus',
        mass: 4.8685e24,
        radius: 6.052e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, 35020),
        position: new THREE.Vector3(-0.723*AU, 0, 0),
        texture: 'textures/venus_atmo.jpg',
        color: new THREE.Color(0.8, 0.8, 0),
        tilt: 177.4*Math.PI/180,
        dayLength: 5832.5*3600,
    } );
    this.Mars = new Planet(  {
        name: 'Mars',
        mass: 6.42e23,
        radius: 3.397e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, 24100),
        position: new THREE.Vector3(-1.524*AU, 0, 0),
        texture: 'textures/mars.jpg',
        color: new THREE.Color(1, 0, 0),
        tilt: 25.2*Math.PI/180,
        dayLength: 24.6*3600,
    } );
    this.Jupiter = new Planet(  {
        name: 'Jupiter',
        mass: 1.9e27,
        radius: 71.492e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, 13100),
        position: new THREE.Vector3( -5.203*AU, 0, 0),
        texture: 'textures/jupiter.jpg',
        color: new THREE.Color(1, 0.85, 0.72),
        tilt: 3.1*Math.PI/180,
        dayLength: 9.9*3600,
    } );
    this.Saturn = new Planet(  {
        name: 'Saturn',
        mass: 5.69e26,
        radius: 60.268e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, -9600),
        position: new THREE.Vector3(9.582*AU, 0, 0),
        texture: 'textures/saturn.jpg',
        color: new THREE.Color(0.82, 0.70, 0.55),
        tilt: 26.7*Math.PI/180,
        dayLength: 10.7*3600,
    } );
    this.Uranus = new Planet(  {
        name: 'Uranus',
        mass: 8.68e25,
        radius: 25.559e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, -6800),
        position: new THREE.Vector3(20.07*AU, 0, 0),
        texture: 'textures/uranus.jpg',
        color: new THREE.Color(0.68, 0.88, 0.90),
        tilt: 97.8*Math.PI/180,
        dayLength: 17.2*3600,
    } );
    this.Neptune = new Planet(  {
        name: 'Neptune',
        mass: 1.03e26,
        radius: 24.764e6 * PLANETSCALE,
        velocity: new THREE.Vector3(0,0, -5400),
        position: new THREE.Vector3(30.05*AU, 0, 0),
        texture: 'textures/neptune.jpg',
        color: new THREE.Color(0.25, 0.41, 0.88),
        tilt: 28.3*Math.PI/180,
        dayLength: 16.1*3600,
    } );
    this.Pluto = new Planet(  {
        name: 'Pluto',
        mass: 1.46e22,
        radius: 1.185e6 * PLUTOSCALE,
        velocity: new THREE.Vector3(0,0, 4740),
        position: new THREE.Vector3(-39.48*AU, 0, 0),
        texture: 'textures/pluto.jpg',
        color: new THREE.Color(0.96, 0.87, 0.70),
        tilt: 122.53*Math.PI/180,
        dayLength: 153.3*3600,
    } );
    this.addBody(this.Pluto);
    this.addBody(this.Neptune);
    this.addBody(this.Uranus);
    this.addBody(this.Saturn);
    this.addBody(this.Jupiter);
    this.addBody(this.Mars);
    this.addBody(this.Earth);
    this.addBody(this.Venus);
    this.addBody(this.Mercury);
    this.addBody(this.Sol);
}
SolSystem.prototype = Object.create( System.prototype );
SolSystem.prototype.constructor = SolSystem;


export { SolSystem };