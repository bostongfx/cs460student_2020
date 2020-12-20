import { Body } from './Body.js';

function Sun( parameters, systemScale ) {
    Body.call( this, systemScale );
    this.type = 'Sun';

    this.setValues( parameters );

    const geometry = new THREE.SphereBufferGeometry(
        this.radius,
        256,
        256
    );
    const material = new THREE.MeshMatcapMaterial( {
        color: this.texture === undefined ? 0x050505 : 0xffffff,
        map: this.texture === undefined ? undefined : new THREE.TextureLoader().load(this.texture)
    } );
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    if (this.tilt) this.rotateX(-this.tilt);
    this.mesh = mesh;
    // this.add(this.createAxesLines(parameters.radius));

    // Getting the lighting right took some serious work.
    this.light = new THREE.PointLight("#ffface", 1);
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 4096;  // Larger map means less
    this.light.shadow.mapSize.height = 4096; // jagged shadow edges
    this.light.shadow.camera.near = 0.01;
    this.light.shadow.camera.far  = 100;
    this.light.shadow.bias = -0.0003;        // helps reduce artifacts
    this.light.shadow.radius = 3;            // adds a slight blur to edges
    this.add(this.light);
}

Sun.prototype = Object.create( Body.prototype );

Sun.prototype.constructor = Sun;

export { Sun };