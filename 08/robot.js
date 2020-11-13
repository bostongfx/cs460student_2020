var T_up = -Math.PI;
var T_kick = -Math.PI/2;
var T_walk = -Math.PI/4;
var personal_space = 20;
var speed = 1;

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

var quaternion_walk = new THREE.Quaternion(
  Math.sin( T_walk/2 ), // x
  0, // y
  0, // z
  Math.cos( T_walk/2 ) // w
);

var quaternion_walk2 = new THREE.Quaternion(
  Math.sin( -T_walk/2 ), // x
  0, // y
  0, // z
  Math.cos( -T_walk/2 ) // w
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
  randQua(), randQua(), randQua(), 
  randQua(), randQua(), randQua(), 
  randQua(), randQua(), randQua(),
  randQua(), randQua(), randQua()
];

var howwide = 5;

// part 1
class Robot{
  // part 2
  constructor(x, y, z, floor) {

    this.floor = floor;

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

    this.bones = [ // for animation
      this.left_upper_arm, this.left_lower_arm, this.left_hand,
      this.right_upper_arm, this.right_lower_arm, this.right_hand,
      this.left_upper_leg, this.left_lower_leg, this.left_foot,
      this.right_upper_leg, this.right_lower_leg, this.right_foot
    ];

    this.raycaster_down = new THREE.Raycaster(); // for detecting floor edge
    this.eye_point = new THREE.Bone();
    this.eye_point.position.z = 10;
    this.root.add(this.eye_point);
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
    // console.log(this.movement); 
  }

  lower_left_arm() {
    this.movement = 'lower left arm';
    // console.log(this.movement);
  }

  kick() {
    this.movement = 'kick';
    // console.log(this.movement);
  }

  onAnimate(allBots) {
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
    } else if ( this.movement == 'dance') {
      var interpolation = 0.1;
      for (var i = 0; i < this.bones.length; i++) {
        if ( Math.abs(this.bones[i].quaternion.x - quaternions[i].x) < 0.01
             && Math.abs(this.bones[i].quaternion.y - quaternions[i].y) < 0.01
             && Math.abs(this.bones[i].quaternion.z - quaternions[i].z) < 0.01 )
          quaternions[i] = randQua();
        else
          this.bones[i].quaternion.slerp(quaternions[i], interpolation);
      }
    } else if ( this.movement == 'none' ) {
      var interpolation = 0.1;
      for (var i = 0; i < this.bones.length; i++) {
        if ( Math.abs(this.bones[i].quaternion.x - quaternion_identity.x) < 0.01
            && Math.abs(this.bones[i].quaternion.y - quaternion_identity.y) < 0.01
            && Math.abs(this.bones[i].quaternion.z - quaternion_identity.z) < 0.01 )
          ; // do nothing
        else
          this.bones[i].quaternion.slerp(quaternion_identity, interpolation);
      }
    } else if ( this.movement == 'walk') {
      // part 2
      this.left_upper_leg.quaternion.slerp(quaternion_walk, .1);
      // part 4
      this.right_upper_leg.quaternion.slerp(quaternion_walk2, .1);
      // part 5
      if ( Math.abs(this.left_upper_leg.quaternion.x - quaternion_walk.x) < 0.05 )
        this.movement = 'walk2';
      this.onStep(allBots);
    } else if ( this.movement == 'walk2') {
      // part 3
      this.right_upper_leg.quaternion.slerp(quaternion_walk, .1);
      // part 4
      this.left_upper_leg.quaternion.slerp(quaternion_walk2, .1);
      // part 5
      if ( Math.abs(this.right_upper_leg.quaternion.x - quaternion_walk.x) < 0.05 )
        this.movement = 'walk';
      this.onStep(allBots);
    }
  }

  // bonus 1
  moveTo(point) {
    this.root.position.set(point.x, point.y+this.height, point.z);
  }

  // bonus 2
  dance() {
    this.movement = 'dance';
    // console.log(this.movement);
  }

  dontMove() {
    this.movement = 'none';
    // console.log(this.movement);
  }

  // assignment 8

  // part 1
  walk() {
    this.movement = 'walk';
    // console.log(this.movement);
  }

  // part 6
  onStep(allBots) { 
    this.root.translateZ(speed)
    // part 7
    this.updateEye()
    if (!this.onGround() || this.hitObstacle()) {
      var radians = Math.random(Math.PI) + Math.PI/2; // b/w 90 ~ 270 degree
      this.root.rotateY(radians);
    }
    // part 8
    for (var i = 0; i < allBots.length; i++) {
      if (this != allBots[i]) {
        var eye_glob_po = new THREE.Vector3();
        this.eye_point.getWorldPosition(eye_glob_po);
        if (eye_glob_po.distanceTo(allBots[i].root.position) < personal_space) {
          var radians = Math.random(Math.PI) + Math.PI/2; // b/w 90 ~ 270 degree
          this.root.rotateY(radians);
        }
      }
    }
  }

  // part 7
  onGround() {
    var intersects = this.raycaster_down.intersectObject( this.floor );
    // scene.add(new THREE.ArrowHelper(
    //   this.raycaster_down.ray.direction, 
    //   this.raycaster_down.ray.origin, 300, 0xff0000) );
    return intersects[0] != undefined;
  }

  hitObstacle() {
    var eye_glob_po = new THREE.Vector3();
    this.eye_point.getWorldPosition(eye_glob_po);
    if (eye_glob_po.distanceTo(new THREE.Vector3(200, -60, 0)) < 100)
      return true;
    return false;
  }

  updateEye() {
    var eye_glob_po = new THREE.Vector3();
    this.eye_point.getWorldPosition(eye_glob_po);
    this.raycaster_down.set(eye_glob_po, new THREE.Vector3(0,-1,0));
  }

}

