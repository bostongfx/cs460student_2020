var T_up = -Math.PI;
var T_kick = -Math.PI/2;

var quaternion_up = new THREE.Quaternion(
  Math.sin( T_up/2 ), // x
  0, // y
  0, // z
  Math.cos( T_up/2 ) // w
);

var quaternion_kick = new THREE.Quaternion(
  Math.sin( T_kick/2 ), // x
  0, // y
  0, // z
  Math.cos( T_kick/2 ) // w
);

var quaternion_identity = new THREE.Quaternion(
  0, 0, 0, 1
);

randQua = function() {
  var T = - Math.random() * Math.PI;
  var xyz = [0, 0, 0];
  // random direction
  xyz[Math.floor(Math.random()*3)] = Math.sin( T/2 );
  return new THREE.Quaternion(
    xyz[0],
    xyz[1],
    xyz[2],
    Math.cos( T/2 ),
  );
}

var quaternions = [
  randQua(), randQua(), randQua(), randQua(),
  randQua(), randQua(), randQua(), randQua()
];

var howwide = 5;

// part 1
class Robot{
  // part 2
  constructor(x, y, z) {

    // create head, neck, and torse
    var fromhelper = HELPER.cylinderSkeletonMesh(3, howwide, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.body_mesh = mesh;

    this.root = bones[0]; // invisible anchor point
    this.root.position.set( x, y, z );

    this.head = bones[1];
    
    this.neck = bones[2];
    this.neck.position.y = -10

    this.torso = bones[3];
    this.torso.position.y = -30

    // head
    var geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    const texture = new THREE.TextureLoader().load( 'umb.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    this.cube_mesh = new THREE.Mesh( geometry, material );
    this.cube_mesh.position.set( x, y, z );

    // create left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, howwide, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.larm_mesh = mesh;

    this.neck.add( bones[0] );

    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.set(5, -5, 0);

    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.set(5, -15, 0);

    this.left_hand = bones[3];
    this.left_hand.position.set(5, -5, 0);

    // create right arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, howwide, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.rarm_mesh = mesh;

    this.neck.add( bones[0] );

    this.right_upper_arm = bones[1];
    this.right_upper_arm.position.set(-5, -5, 0);

    this.right_lower_arm = bones[2];
    this.right_lower_arm.position.set(-5, -15, 0);

    this.right_hand = bones[3];
    this.right_hand.position.set(-5, -5, 0);
    
    // create left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, howwide, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.lleg_mesh = mesh;

    this.torso.add( bones[0] );

    this.left_upper_leg = bones[1];
    this.left_upper_leg.position.set(5, -5, 0);

    this.left_lower_leg = bones[2];
    this.left_lower_leg.position.set(5, -15, 0);

    this.left_foot = bones[3];
    this.left_foot.position.set(5, -5, 0);

    // create right leg
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.rleg_mesh = mesh;

    this.torso.add( bones[0] );

    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.set(-5, -5, 0);

    this.right_lower_leg = bones[2];
    this.right_lower_leg.position.set(-5, -15, 0);

    this.right_foot = bones[3];
    this.right_foot.position.set(-5, -5, 0);

    // part 11
    this.movement = "none";

    this.height = -(this.neck.position.y + this.torso.position.y + 
      this.left_upper_leg.position.y + this.left_lower_leg.position.y + 
      this.left_foot.position.y) + howwide;
  }

  // part 8
  show(scene) {

    scene.add( this.cube_mesh );
    scene.add( this.body_mesh );
    scene.add( this.larm_mesh );
    scene.add( this.rarm_mesh );
    scene.add( this.lleg_mesh );
    scene.add( this.rleg_mesh );

  }

  // part 11
  raise_left_arm() {
    this.movement = 'raise left arm';
    console.log(this.movement); 
  }

  lower_left_arm() {
    this.movement = 'lower left arm';
    console.log(this.movement);
  }

  kick() {
    this.movement = 'kick';
    console.log(this.movement);
  }

  onAnimate() {
    this.cube_mesh.position.set(
      this.root.position.x,
      this.root.position.y,
      this.root.position.z
    );
    if ( this.movement == 'raise left arm' ) {
      this.left_upper_arm.quaternion.slerp(quaternion_up, .05);
    } else if ( this.movement == 'lower left arm' ) {
      this.left_upper_arm.quaternion.slerp(quaternion_identity, .05);
    } else if ( this.movement == 'kick' ) {
      this.left_upper_leg.quaternion.slerp(quaternion_kick, .3);
      if ( Math.abs(this.left_upper_leg.quaternion.x - quaternion_kick.x) < 0.01 ) {
        this.movement = 'unkick';
      }
    } else if ( this.movement == 'unkick' ) {
      this.left_upper_leg.quaternion.slerp(quaternion_identity, .05);
      if ( Math.abs(this.left_upper_leg.quaternion.x - quaternion_identity.x) < 0.01 ) {
        this.movement = 'none';
      }
    }
  }

  // bonus 1
  moveTo(point) {
    this.root.position.set(point.x, point.y+this.height, point.z);
  }

  // bonus 2
  dance() {
    var interpolation = 0.1;
    if ( Math.abs(this.left_upper_arm.quaternion.x - quaternions[0].x) < 0.01
         && Math.abs(this.left_upper_arm.quaternion.y - quaternions[0].y) < 0.01
         && Math.abs(this.left_upper_arm.quaternion.z - quaternions[0].z) < 0.01 ) {
      quaternions[0] = randQua();
    } else {
      this.left_upper_arm.quaternion.slerp(quaternions[0], interpolation);
    }
    if ( Math.abs(this.left_lower_arm.quaternion.x - quaternions[1].x) < 0.01
         && Math.abs(this.left_lower_arm.quaternion.y - quaternions[1].y) < 0.01
         && Math.abs(this.left_lower_arm.quaternion.z - quaternions[1].z) < 0.01 ) {
      quaternions[1] = randQua();
    } else {
      this.left_lower_arm.quaternion.slerp(quaternions[1], interpolation);
    }
    if ( Math.abs(this.right_upper_arm.quaternion.x - quaternions[2].x) < 0.01
         && Math.abs(this.right_upper_arm.quaternion.y - quaternions[2].y) < 0.01
         && Math.abs(this.right_upper_arm.quaternion.z - quaternions[2].z) < 0.01 ) {
      quaternions[2] = randQua();
    } else {
      this.right_upper_arm.quaternion.slerp(quaternions[2], interpolation);
    }
    if ( Math.abs(this.right_lower_arm.quaternion.x - quaternions[3].x) < 0.01
         && Math.abs(this.right_lower_arm.quaternion.y - quaternions[3].y) < 0.01
         && Math.abs(this.right_lower_arm.quaternion.z - quaternions[3].z) < 0.01 ) {
      quaternions[3] = randQua();
    } else {
      this.right_lower_arm.quaternion.slerp(quaternions[3], interpolation);
    }
    if ( Math.abs(this.left_upper_leg.quaternion.x - quaternions[4].x) < 0.01
         && Math.abs(this.left_upper_leg.quaternion.y - quaternions[4].y) < 0.01
         && Math.abs(this.left_upper_leg.quaternion.z - quaternions[4].z) < 0.01 ) {
      quaternions[4] = randQua();
    } else {
      this.left_upper_leg.quaternion.slerp(quaternions[4], interpolation);
    }
    if ( Math.abs(this.left_lower_leg.quaternion.x - quaternions[5].x) < 0.01
         && Math.abs(this.left_lower_leg.quaternion.y - quaternions[5].y) < 0.01
         && Math.abs(this.left_lower_leg.quaternion.z - quaternions[5].z) < 0.01 ) {
      quaternions[5] = randQua();
    } else {
      this.left_lower_leg.quaternion.slerp(quaternions[5], interpolation);
    }
    if ( Math.abs(this.right_upper_leg.quaternion.x - quaternions[6].x) < 0.01
         && Math.abs(this.right_upper_leg.quaternion.y - quaternions[6].y) < 0.01
         && Math.abs(this.right_upper_leg.quaternion.z - quaternions[6].z) < 0.01 ) {
      quaternions[6] = randQua();
    } else {
      this.right_upper_leg.quaternion.slerp(quaternions[6], interpolation);
    }
    if ( Math.abs(this.right_lower_leg.quaternion.x - quaternions[7].x) < 0.01
         && Math.abs(this.right_lower_leg.quaternion.y - quaternions[7].y) < 0.01
         && Math.abs(this.right_lower_leg.quaternion.z - quaternions[7].z) < 0.01 ) {
      quaternions[7] = randQua();
    } else {
      this.right_lower_leg.quaternion.slerp(quaternions[7], interpolation);
    }
  }

}

