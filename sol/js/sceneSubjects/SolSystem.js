import { System } from './System.js';
import { Planet } from './Planet.js';
import { Sun }    from './Sun.js';
import { G, AU, STARSCALE, PLANETSCALE, PLUTOSCALE } from "../constants.js";

function SolSystem(scene) {
    System.call(this);
    this.setScene(scene);
    this.Sol = new Sun( {
        name: 'Sol',
        mass: 1.98892e30,
        radius: 6.957e8 * STARSCALE,
        position: new THREE.Vector3(0, 0, 0),
        texture: '../../textures/sun.jpg',
        color: new THREE.Color(1, 1, 0.6)
    } );
    this.addBody(this.Sol);
    this.Mercury = new Planet(  {
        name: 'Mercury',
        mass: 3.3e23,
        radius: 2.439e6 * PLANETSCALE,
        position: new THREE.Vector3(0.387*AU, 0, 0),
        texture: '../../textures/mercury.jpg',
        color: new THREE.Color(1, 0.27, 0)
    } );
    this.addBody(this.Mercury);
    this.Venus = new Planet(  {
        name: 'Venus',
        mass: 4.8685e24,
        radius: 6.052e6 * PLANETSCALE,
        position: new THREE.Vector3(-0.723*AU, 0, 0),
        texture: '../../textures/venus_atmo.jpg',
        color: new THREE.Color(0.8, 0.8, 0)
    } );
    this.addBody(this.Venus);
    this.Earth = new Planet(  {
        name: 'Earth',
        mass: 5.9742e24,
        radius: 6.371e6 * PLANETSCALE,
        position: new THREE.Vector3(-1*AU, 0, 0),
        texture: '../../textures/earth_day.jpg',
        color: new THREE.Color(0.05, 0.05, 0.75)
    } );
    this.addBody(this.Earth);
    this.Mars = new Planet(  {
        name: 'Mars',
        mass: 6.42e23,
        radius: 3.397e6 * PLANETSCALE,
        position: new THREE.Vector3(-1.524*AU, 0, 0),
        texture: '../../textures/mercury.jpg',
        color: new THREE.Color(1, 0, 0)
    } );
    this.addBody(this.Mars);
    this.Jupiter = new Planet(  {
        name: 'Jupiter',
        mass: 1.9e27,
        radius: 71.492e6 * PLANETSCALE,
        position: new THREE.Vector3( -5.203*AU, 0, 0),
        texture: '../../textures/jupiter.jpg',
        color: new THREE.Color(1, 0.85, 0.72)
    } );
    this.addBody(this.Jupiter);
    this.Saturn = new Planet(  {
        name: 'Saturn',
        mass: 5.69e26,
        radius: 60.268e6 * PLANETSCALE,
        position: new THREE.Vector3(9.582*AU, 0, 0),
        texture: '../../textures/saturn.jpg',
        color: new THREE.Color(0.82, 0.70, 0.55)
    } );
    this.addBody(this.Saturn);
    this.Uranus = new Planet(  {
        name: 'Uranus',
        mass: 8.68e25,
        radius: 25.559e6 * PLANETSCALE,
        position: new THREE.Vector3(20.07*AU, 0, 0),
        texture: '../../textures/uranus.jpg',
        color: new THREE.Color(0.68, 0.88, 0.90)
    } );
    this.addBody(this.Uranus);
    this.Neptune = new Planet(  {
        name: 'Neptune',
        mass: 1.03e26,
        radius: 24.764e6 * PLANETSCALE,
        position: new THREE.Vector3(30.05*AU, 0, 0),
        texture: '../../textures/neptune.jpg',
        color: new THREE.Color(0.25, 0.41, 0.88)
    } );
    this.addBody(this.Neptune);
    this.Pluto = new Planet(  {
        name: 'Pluto',
        mass: 1.46e22,
        radius: 1.185e6 * PLUTOSCALE,
        position: new THREE.Vector3(-39.48*AU, 0, 0),
        texture: '../../textures/pluto.jpg',
        color: new THREE.Color(0.96, 0.87, 0.70)
    } );
    this.addBody(this.Pluto);
}
SolSystem.prototype = Object.create( System.prototype );
SolSystem.prototype.constructor = SolSystem;


export { SolSystem };