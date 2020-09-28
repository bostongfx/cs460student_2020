import { Body } from './Body.js';
import { SolSystem } from './SolSystem.js';

function Sun( parameters ) {
    Body.call( this );
    this.type = 'Sun';
    if (parameters.radius === undefined) {
        console.warn("Sun: 'radius' parameter undefined. Assigning Earth Sun's radius.");
        parameters.radius = SolSystem.Sol.radius;
    }
    const geometry = new THREE.SphereBufferGeometry(parameters.radius, 32, 32);
    const material = new THREE.MeshMatcapMaterial( {
        color: parameters.texture === undefined ? 0x050505 : 0xffffff,
        map: parameters.texture === undefined ? undefined : new THREE.TextureLoader().load(parameters.texture)
    } );
    const mesh = new THREE.Mesh(geometry, material);
    parameters.geometry = geometry;
    parameters.material = material;
    parameters.mesh = mesh;

    if (parameters.mass === undefined) {
        console.warn("Sun: 'mass' parameter undefined. Assigning Earth Sun's mass.");
        parameters.mass = SolSystem.Earth.mass;
    }
    if (parameters.position === undefined) {
        console.warn("Sun: 'position' parameter undefined. Sun will be placed at [0,0,0].");
        parameters.position = new THREE.Vector3(0,0,0);
    }
    this.setValues( parameters );
    this.light = new THREE.PointLight("#ffface", 1);
}

Sun.prototype = Object.create( Body.prototype );
Sun.prototype.constructor = Sun;
Sun.prototype.update = function(time) {
    this.light.intensity = ((Math.sin(time) / 16) + 1);
}

export { Sun };


// function Sun(scene) {
//     this.scene = scene;
//     this.name = name;
//     this.mass = mass;
//     this.radius = radius;
//     this.velocity = velocity;
//     this.texture = texture;
//     this.color = color;
//     this.geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
//     this.material = new THREE.MeshMatcapMaterial( {
//         color: 0xffffff,
//         specular: 0x050505,
//         shininess: 100,
//         map: new THREE.TextureLoader().load( 'textures/' + texture + '.jpg' )
//     } );
//     this.mesh = new THREE.mesh(geometry, material);
//     this.mesh.position = position;
//
//     const light = new THREE.PointLight("#ffface", 1);
//     scene.add(light);
//
//     this.update = function(time) {
//         light.intensity = ((Math.sin(time) / 16) + 1);
//     }
// }