import { Body } from './Body.js';
import { EARTHMASS, EARTHRADIUS } from '../constants.js';

function Planet(  parameters ) {
    Body.call( this );
    this.type = 'Planet';
    this.tilt = parameters.tilt;
    this.dayLength = parameters.dayLength;
    delete parameters.tilt;
    delete parameters.dayLength;
    parameters = checkParam('radius', EARTHRADIUS, parameters, 'Earth\'s');
    parameters = checkParam('mass', EARTHMASS, parameters, 'Earth\'s');
    parameters = checkParam('position', new THREE.Vector3(0, 0, 0), parameters, '(0,0,0)');

    const geometry = new THREE.SphereBufferGeometry(parameters.radius, 128, 128);
    const material = new THREE.MeshPhongMaterial( {
        color: parameters.texture === undefined ? 0x505050 : 0xffffff,
        specular: parameters.specular ? parameters.specular : 0x070707,
        shininess: parameters.shininess ? parameters.shininess : 100,
        map: parameters.texture === undefined ? undefined : new THREE.TextureLoader().load(parameters.texture),
    } );

    parameters.mesh = new THREE.Mesh(geometry, material);
    this.add(parameters.mesh);
    this.add(this.createAxesLines(parameters.radius));

    // this.position.set(parameters.position.x, parameters.position.y, parameters.position.z);
    if (this.tilt) this.rotateZ(this.tilt);

    this.setValues( parameters );
    // this.add(this.createPath());
    this.path = this.createPath();
}

function checkParam(paramName, defaultValue, parameters, note) {
    let warning = `Planet ${parameters.name}: '${paramName}' parameter undefined. Assigning ${note} ${paramName}.`;
    if (parameters[paramName] === undefined) console.warn(warning);
    return setDefaultParam(paramName, defaultValue, parameters)
}

function setDefaultParam(paramName, defaultValue, parameters) {
    if (parameters[paramName] === undefined) parameters[paramName] = defaultValue;
    return parameters;
}
Planet.prototype = Object.create( Body.prototype );
Planet.prototype.constructor = Planet;
Planet.prototype.createAxesLines = function(radius, position) {
    const axesHelper = new THREE.AxesHelper(radius*3);
    return axesHelper;
}
Planet.prototype.createPath = function() {
    const geometry = new THREE.TorusBufferGeometry(this.position.x, this.radius/8, 16, 64);
    const material = new THREE.MeshBasicMaterial( { color: this.color, transparent: true, opacity: 0.25 } );
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0,0,0);
    mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2);
    return mesh;
}
Planet.prototype.update = function(elapsedTime, step, stepSize, newPos, newVel) {
    if (this.dayLength > 0) {
        let currentStep = elapsedTime % this.dayLength;
        this.mesh.rotateY((2 * Math.PI / this.dayLength)*stepSize);
    }
    this.position.set(newPos.x, newPos.y, newPos.z);
    this.velocity.set(newVel.x, newVel.y, newVel.z);

}
export { Planet };