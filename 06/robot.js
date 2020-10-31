Robot = function (x, y, z) {
  // ROBOT GOES HERE!
  this.head = new THREE.Bone();
  //this.head.position.x = x;
  //this.head.position.y = y;
  //this.head.position.z = z;
  this.head.position.set(x, y, x);
  this.neck = new THREE.Bone();
  this.neck.position.y = -10;
  this.head.add(this.neck);

  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.y = -5;
  this.left_upper_arm.position.x = 5;
  this.neck.add(this.left_upper_arm);

  /*
  T = Math.PI;
  x = 1
  y = 0
  z = 0
   
  left_upper_arm.quaternion.slerp(new THREE.Quaternion( Math.sin(T/2)*x, Math.sin(T/2)*y, Math.sin(T/2)*z, Math.cos(T/2)), 0.01);
  */

  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.y = -15;
  this.left_lower_arm.position.x = 5;
  this.left_upper_arm.add(this.left_lower_arm);

  this.left_hand = new THREE.Bone();
  this.left_hand.position.y = -5;
  this.left_hand.position.x = 5;
  this.left_lower_arm.add(this.left_hand);

  // RIGHT HAND

  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.y = -5;
  this.right_upper_arm.position.x = -5;
  this.neck.add(this.right_upper_arm);

  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.y = -15;
  this.right_lower_arm.position.x = -5;
  this.right_upper_arm.add(this.right_lower_arm);

  this.right_hand = new THREE.Bone();
  this.right_hand.position.y = -5;
  this.right_hand.position.x = -5;
  this.right_lower_arm.add(this.right_hand);



  this.torso = new THREE.Bone();
  this.torso.position.y = -30;
  this.neck.add(this.torso);

  // left leg
  this.leftupperleg = new THREE.Bone();
  this.leftupperleg.position.y = -15;
  this.leftupperleg.position.x = 5;
  this.torso.add(this.leftupperleg);

  this.leftlowerleg = new THREE.Bone();
  this.leftlowerleg.position.y = -15;
  this.leftlowerleg.position.x = 5;
  this.leftupperleg.add(this.leftlowerleg);

  this.leftfoot = new THREE.Bone();
  this.leftfoot.position.y = -5;
  this.leftfoot.position.x = 5;
  this.leftlowerleg.add(this.leftfoot)

  //right leg
  this.rightupperleg = new THREE.Bone();
  this.rightupperleg.position.y = -15;
  this.rightupperleg.position.x = -5;
  this.torso.add(this.rightupperleg);

  this.rightlowerleg = new THREE.Bone();
  this.rightlowerleg.position.y = -15;
  this.rightlowerleg.position.x = -5;
  this.rightupperleg.add(this.rightlowerleg);

  this.rightfoot = new THREE.Bone();
  this.rightfoot.position.y = -5;
  this.rightfoot.position.x = -5;
  this.rightlowerleg.add(this.rightfoot);
};

Robot.prototype.show = function (scene) {
  // // create group and point to the robot head
  this.group = new THREE.Group();
  this.group.add(this.head);
  scene.add(this.group);

  // // use the skeleton helper to visualize the skeleton
  this.helper = new THREE.SkeletonHelper(this.group);
  this.helper.material.linewidth = 3;

  scene.add(this.helper);
  this.movement = '';
};

Robot.prototype.raiseLeftArm = function () {
  this.movement = 'raise left arm';

};
Robot.prototype.lowerLeftArm = function () {
  this.movement = 'lower left arm';
};
Robot.prototype.kick = function () {
  this.movement = 'kick';
};

Robot.prototype.onAnimate = function () {

  if (this.movement == 'raise left arm') {

    var T = -Math.PI;
    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
      0,               // y
      0,               // z
      Math.cos(T / 2)),  // w
      0.1);

  } else if (this.movement == 'kick') {

    // check if slerp reached almost the end
    if (this.rightupperleg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI / 2;
      this.rightupperleg.quaternion.slerp(
        new THREE.Quaternion(Math.sin(T / 2),   // x
          0,                   // y
          0,                   // z
          Math.cos(T / 2)), // w
        0.1);

    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.rightupperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

  } else if (this.movement == 'lower left arm') {
    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
  }

};