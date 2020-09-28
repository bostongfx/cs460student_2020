import { Body } from './Body.js';
import { SolSystem } from './SolSystem.js';

function Planet(  parameters ) {
    Body.call( this );
    this.type = 'Planet';
    if (parameters.radius === undefined) {
        console.warn("Planet: 'radius' parameter undefined. Assigning Earth's radius.");
        parameters.radius = SolSystem.Earth.radius;
    }
    const geometry = new THREE.SphereBufferGeometry(parameters.radius, 32, 32);
    const material = new THREE.MeshPhongMaterial( {
        color: parameters.texture === undefined ? 0x050505 : 0xffffff,
        specular: 0x050505,
        shininess: 100,
        map: parameters.texture === undefined ? undefined : new THREE.TextureLoader().load(parameters.texture)
    } );
    const mesh = new THREE.Mesh(geometry, material);
    parameters.geometry = geometry;
    parameters.material = material;
    parameters.mesh = mesh;

    if (parameters.mass === undefined) {
        console.warn("Planet: 'mass' parameter undefined. Assigning Earth's mass.");
        parameters.mass = SolSystem.Earth.mass;
    }
    if (parameters.position === undefined) {
        console.warn("Planet: 'position' parameter undefined. Planet will be placed at [0,0,0].");
        parameters.position = new THREE.Vector3(0,0,0);
    }
    mesh.position.set(parameters.position.x, parameters.position.y, parameters.position.z);
    this.setValues( parameters );
    this.path = this.createPath();
}

Planet.prototype = Object.create( Body.prototype );
Planet.prototype.constructor = Planet;
Planet.prototype.createPath = function() {
    const geometry = new THREE.TorusBufferGeometry(this.mesh.position.x, this.radius/4, 4, 64);
    const material = new THREE.MeshBasicMaterial( { color: this.color, transparent: true, opacity: 0.15 } );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,0);
    mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2);
    // mesh.position.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0).normalize(), Math.PI/3));
    return mesh;
}
export { Planet };