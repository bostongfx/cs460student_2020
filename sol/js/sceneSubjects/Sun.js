import { Body } from './Body.js';
import { SolSystem } from './SolSystem.js';

function Sun( parameters ) {
    Body.call( this );
    this.type = 'Sun';
    if (parameters.radius === undefined) {
        console.warn("Sun: 'radius' parameter undefined. Assigning Earth Sun's radius.");
        parameters.radius = SolSystem.Sol.radius;
    }
    const geometry = new THREE.SphereBufferGeometry(
        parameters.radius,
        256,
        256
    );
    const material = new THREE.MeshMatcapMaterial( {
        color: parameters.texture === undefined ? 0x050505 : 0xffffff,
        map: parameters.texture === undefined ? undefined : new THREE.TextureLoader().load(parameters.texture)
    } );
    const mesh = new THREE.Mesh(geometry, material);
    parameters.mesh = mesh;
    this.add(parameters.mesh);

    if (parameters.mass === undefined) {
        console.warn("Sun: 'mass' parameter undefined. Assigning Earth Sun's mass.");
        parameters.mass = SolSystem.Earth.mass;
    }
    if (parameters.position === undefined) {
        console.warn("Sun: 'position' parameter undefined. Sun will be placed at [0,0,0].");
        parameters.position = new THREE.Vector3(0,0,0);
    }
    this.add(this.createAxesLines(parameters.radius));

    this.setValues( parameters );
    if (this.tilt) this.rotateX(-this.tilt);
    this.light = new THREE.PointLight("#ffface", 1);
    this.light.castShadow = true;
    this.add(this.light);

}

Sun.prototype = Object.create( Body.prototype );
Sun.prototype.constructor = Sun;
Sun.prototype.update = function(dt, newPos, newVel) {
    if (this.dayLength > 0) {
        this.mesh.rotateY((2 * Math.PI / this.dayLength)*dt);
    }
    this.position.set(newPos.x, newPos.y, newPos.z);
    this.velocity.set(newVel.x, newVel.y, newVel.z);
}

export { Sun };