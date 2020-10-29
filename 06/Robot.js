Robot = function(x,y,z) {
  // Init main body bones
  this.head = new THREE.Bone();
  this.head.position.set(x,y,z);

  this.neck = new THREE.Bone();
  this.neck.position.y = -10;
  this.head.add(this.neck);

  this.torso = new THREE.Bone();
  this.torso.position.y = -30;
  this.neck.add(this.torso);


  // Init arm bones
  this.r_upper_arm = new THREE.Bone();
  this.r_upper_arm.position.x = -5;
  this.r_upper_arm.position.y = -5;
  this.neck.add(this.r_upper_arm);

  this.r_lower_arm = new THREE.Bone();
  this.r_lower_arm.position.x = -5;
  this.r_lower_arm.position.y = -15;
  this.r_upper_arm.add(this.r_lower_arm);

  this.r_hand = new THREE.Bone();
  this.r_hand.position.x = -5;
  this.r_hand.position.y = -5;
  this.r_lower_arm.add(this.r_hand);

  this.l_upper_arm = new THREE.Bone();
  this.l_upper_arm.position.x = 5;
  this.l_upper_arm.position.y = -5;
  this.neck.add(this.l_upper_arm);

  this.l_lower_arm = new THREE.Bone();
  this.l_lower_arm.position.x = 5;
  this.l_lower_arm.position.y = -15;
  this.l_upper_arm.add(this.l_lower_arm);

  this.l_hand = new THREE.Bone();
  this.l_hand.position.x = 5;
  this.l_hand.position.y = -5;
  this.l_lower_arm.add(this.l_hand);

  // Init leg bones
  this.l_upper_leg = new THREE.Bone();
  this.l_upper_leg.position.x = 5;
  this.l_upper_leg.position.y = -5;
  this.torso.add(this.l_upper_leg);

  this.l_lower_leg = new THREE.Bone();
  this.l_lower_leg.position.x = 5;
  this.l_lower_leg.position.y = -15;
  this.l_upper_leg.add(this.l_lower_leg);

  this.l_foot = new THREE.Bone();
  this.l_foot.position.x = 5;
  this.l_foot.position.y = -5;
  this.l_lower_leg.add(this.l_foot);

  this.r_upper_leg = new THREE.Bone();
  this.r_upper_leg.position.x = -5;
  this.r_upper_leg.position.y = -5;
  this.torso.add(this.r_upper_leg);

  this.r_lower_leg = new THREE.Bone();
  this.r_lower_leg.position.x = -5;
  this.r_lower_leg.position.y = -15;
  this.r_upper_leg.add(this.r_lower_leg);

  this.r_foot = new THREE.Bone();
  this.r_foot.position.x = -5;
  this.r_foot.position.y = -5;
  this.r_lower_leg.add(this.r_foot);
};
Robot.prototype.show = function(scene) {
  var rGroup = new THREE.Group();
  rGroup.add( this.head );
  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3; // make the skeleton thick
  scene.add(rGroup);
  scene.add(helper);
};

Robot.prototype.show = function(scene) {

  // create group and point to the robot head
  this.group = new THREE.Group();
  this.group.add( this.head );
  scene.add( this.group );

  // use the skeleton helper to visualize the skeleton
  this.helper = new THREE.SkeletonHelper( this.group );
  this.helper.material.linewidth = 3;
  scene.add( this.helper );

  // no movement by default
  this.movement = '';

};

Robot.prototype.raiseLeftArm = function() {
  this.movement = 'raise left arm';
};
Robot.prototype.lowerLeftArm = function() {
  this.movement = 'lower left arm';
};
Robot.prototype.kick = function() {
  this.movement = 'kick';
};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {
    var T = -Math.PI;
    this.l_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
  }
  else if (this.movement == 'lower left arm') {
    var T = -Math.PI;
    this.l_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  }
  else if (this.movement == 'kick') {
    // check if slerp reached almost the end
    if (this.r_upper_leg.quaternion.w < 0.72) {
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
    }
    else {
      var T = -Math.PI/2;
      this.r_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
    }
  }
  else if (this.movement == 'kick done') {
    // reset leg back to identity
    this.r_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  }
};
