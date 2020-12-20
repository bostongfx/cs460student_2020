import {Body} from './Body.js';

function Planet( parameters, systemScale, startTime ) {
    Body.call( this, systemScale, startTime );
    this.type = 'Planet';

    this.setValues( parameters );

    const geometry = new THREE.SphereBufferGeometry(
        this.radius,
        128,
        128
    );

    const material = new THREE.MeshPhongMaterial( {
        color: this.texture === undefined ? 0x505050 : 0xffffff,
        specular: this.specular ? this.specular : 0x070707,
        shininess: this.shininess ? this.shininess : 100,
        transparent: false,
        map: this.texture === undefined ? undefined : new THREE.TextureLoader().load(this.texture),
    } );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.add(mesh);
    this.mesh = mesh;


    if (this.tilt) this.rotateX(-this.tilt);

    const pos = this.calculatePositionFromKeplerianData(startTime);
    const nextPos = this.calculatePositionFromKeplerianData(startTime+0.00001);
    const direction = nextPos.clone().sub(pos).normalize();
    this.velocity.copy(direction.multiplyScalar(this.orbitalVelocity));
    this.setPosition(pos);

    this.path = this.createPath(startTime);
    if (this.hasRings) this.add(this.createRing());
    // this.updateSize(1);
}

Planet.prototype = Object.create( Body.prototype );

Planet.prototype.constructor = Planet;

Planet.prototype.createPath = function(startTime) {
    const points = [];
    const steps = 32;
    const step = (this.orbitalPeriod / steps);
    for (let i = steps; i >= 0; i--) {
        let pastStep = this.calculatePositionFromKeplerianData(startTime - i*step);
        points.push(pastStep.clone().multiplyScalar(this.systemScale));
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
    const path = new THREE.Line(geometry, material);
    return path;
}

Planet.prototype.createRing = function() {
    const ringGeo = new THREE.RingBufferGeometry(
        this.radius*1.25, // inner radius
        this.ringRadius,  // outer radius
        256,              // thetaSegments: more means more circular
        1,                // phiSegments  :
        0,                // thetaStart   : 0=x axs
        2 * Math.PI       // thetaEnd     : full circle
    );

    // uv mapping algorithm found thought threejs forum post:
    // https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990
    const threshold = (this.radius * 1.25 + this.ringRadius) / 2;
    let pos = ringGeo.attributes.position;
    let vec = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
        vec.fromBufferAttribute(pos, i);
        ringGeo.attributes.uv.setXY(i, vec.length() < threshold ? 0 : 1, 1);
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
        opacity: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2);
    ringMesh.castShadow = true;
    ringMesh.receiveShadow = true;
    return ringMesh;
}

export { Planet };