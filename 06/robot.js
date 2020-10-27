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

// part 1
class Robot{
  // part 2
  constructor(x, y, z) {
    // part 3, 4, 5, 9
    this.head = new THREE.Bone();
    this.head.position.set(x, y, z);

    this.neck = new THREE.Bone();
    this.neck.position.y = -10;
    this.head.add(this.neck);

    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    // part 6
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.set(5, -5, 0);
    this.neck.add(this.left_upper_arm);
    
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.set(5, -15, 0);
    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone();
    this.left_hand.position.set(5, -5, 0);
    this.left_lower_arm.add(this.left_hand);

    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.set(-5, -5, 0);
    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.set(-5, -15, 0);
    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone();
    this.right_hand.position.set(-5, -5, 0);
    this.right_lower_arm.add(this.right_hand);

    // part 7
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.set(5, -5, 0);
    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.set(5, -15, 0);
    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone();
    this.left_foot.position.set(5, -5, 0);
    this.left_lower_leg.add(this.left_foot);

    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.set(-5, -5, 0);
    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.set(-5, -15, 0);
    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone();
    this.right_foot.position.set(-5, -5, 0);
    this.right_lower_leg.add(this.right_foot);

    // part 11
    this.movement = "none";

    this.height = -(this.neck.position.y + this.torso.position.y + 
      this.left_upper_leg.position.y + this.left_lower_leg.position.y + 
      this.left_foot.position.y);
  }

  // part 8
  show(scene) {
    var rGroup = new THREE.Group();
    rGroup.add( this.head );
    
    var helper = new THREE.SkeletonHelper( rGroup );
    // make the skeleton thick
    // doesn't work on Chrome, but works on FireFox
    helper.material.linewidth = 3; 
    
    scene.add(rGroup);
    scene.add(helper);
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
    }
  }

  // bonus 1
  moveTo(point) {
    this.head.position.set(point.x, point.y+this.height, point.z);
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

