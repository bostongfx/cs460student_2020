import {Body} from './Body.js';
import {EARTHMASS, EARTHRADIUS} from '../constants.js';

function Planet( parameters, startTime ) {
    Body.call( this );
    this.type = 'Planet';

    const geometry = new THREE.SphereBufferGeometry(
        parameters.radius,
        128,
        128
    );
    const material = new THREE.MeshPhongMaterial( {
        color: parameters.texture === undefined ? 0x505050 : 0xffffff,
        specular: parameters.specular ? parameters.specular : 0x070707,
        shininess: parameters.shininess ? parameters.shininess : 100,
        transparent: false,
        map: parameters.texture === undefined ? undefined : new THREE.TextureLoader().load(parameters.texture),
    } );

    parameters.mesh = new THREE.Mesh(geometry, material);
    parameters.mesh.castShadow = true;
    parameters.mesh.receiveShadow = true;
    this.add(parameters.mesh);
    this.add(this.createAxesLines(parameters.radius));


    this.setValues( parameters );
    if (this.tilt) this.rotateX(-this.tilt);

    const pos = this.calculatePositionFromKeplerianData(startTime);
    const nextPos = this.calculatePositionFromKeplerianData(startTime+0.001);
    const direction = nextPos.clone().sub(pos).normalize();
    this.velocity.copy(direction.multiplyScalar(this.orbitalVelocity));
    this.position.copy(pos);

    this.path2 = this.createPathV2(startTime);
    if (this.hasRings) this.add(this.createRing());
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
Planet.prototype.createPathV2 = function(startTime) {
    startTime = startTime;
    const points = [];
    const steps = 32;
    const step = (this.orbitalPeriod / steps);
    for (let i = steps; i >= 0; i--) {
        let pastStep = this.calculatePositionFromKeplerianData(startTime - i*step);
        points.push(pastStep);
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const p2 = curve.getPoints( 512 );
    const geometry = new THREE.BufferGeometry().setFromPoints( p2 );
    const material = new THREE.MeshBasicMaterial( {
        color : this.color,
        transparent: true,
        opacity: 0.25,
    } );

    // Create the final object to add to the scene
    return new THREE.Line(geometry, material);
}
Planet.prototype.createRing = function() {
    const ringGeo = new THREE.RingBufferGeometry(
        this.radius*1.25,
        this.ringRadius,
        256
    );
    let pos = ringGeo.attributes.position;
    let vec = new THREE.Vector3();
    const mid = (this.radius * 1.25 + this.ringRadius) / 2;
    for (let i = 0; i < pos.count; i++) {
        vec.fromBufferAttribute(pos, i);
        ringGeo.attributes.uv.setXY(i, vec.length() < mid ? 0 : 1, 1);
    }
    const texture = this.ringTexture === undefined ? undefined
        : new THREE.TextureLoader().load(this.ringTexture);
    const ringMat = new THREE.MeshPhongMaterial( {
        color: texture === undefined ? 0x505050 : 0xffffff,
        specular: this.specular ? this.specular : 0x070707,
        shininess: this.shininess ? this.shininess : 100,
        side: THREE.DoubleSide,
        map: texture,
        transparent: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2);
    ringMesh.castShadow = true;
    ringMesh.receiveShadow = true;
    return ringMesh;
}

Planet.prototype.update = function(dt, newPos, newVel) {
    if (this.dayLength > 0) {
        this.mesh.rotateY((2 * Math.PI / this.dayLength)*dt);
    }
    this.position.set(newPos.x, newPos.y, newPos.z);
    this.velocity.set(newVel.x, newVel.y, newVel.z);
    this.orbitalVelocity = newVel.length();
    // if (this.name === 'Earth') console.log(this.orbitalVelocity)
}

export { Planet };