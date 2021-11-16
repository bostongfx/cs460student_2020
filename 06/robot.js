Robot = function(x,y,z) {
  this.head = new THREE.Bone();
  this.head.position.x = x;
  this.head.position.y = y;
  this.head.position.z = z;

  this.neck = new THREE.Bone();
  this.neck.position.y = -10;
  this.head.add(this.neck);
//left arm

  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.y = -5;
  this.left_upper_arm.position.x = 5;
  this.neck.add(this.left_upper_arm);

  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.y = -15;
  this.left_lower_arm.position.x = 5;
  this.left_upper_arm.add(this.left_lower_arm);

  this.left_hand = new THREE.Bone();
  this.left_hand.position.y = -5;
  this.left_hand.position.x = 5;
  this.left_lower_arm.add(this.left_hand);

//right arm
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
//left leg
  this.left_upper_leg = new THREE.Bone();
  this.left_upper_leg.position.y = -15;
  this.left_upper_leg.position.x = 10;
  this.torso.add(this.left_upper_leg);

  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.y = -15;
  this.left_lower_leg.position.x = 5;
  this.left_upper_leg.add(this.left_lower_leg);

  this.left_foot = new THREE.Bone();
  this.left_foot.position.y = -5;
  this.left_foot.position.x = 5;
  this.left_lower_leg.add(this.left_foot);

//right leg

  this.right_upper_leg = new THREE.Bone();
  this.right_upper_leg.position.y = -15;
  this.right_upper_leg.position.x = -10;
  this.torso.add(this.right_upper_leg);

  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.y = -15;
  this.right_lower_leg.position.x = -5;
  this.right_upper_leg.add(this.right_lower_leg);

  this.right_foot = new THREE.Bone();
  this.right_foot.position.y = -5;
  this.right_foot.position.x = -5;
  this.right_lower_leg.add(this.right_foot);
};

Robot.prototype.show = function(scene) {

this.group = new THREE.Group();
this.group.add(this.head);
scene.add(this.group);

// // use the skeleton helper to visualize the skeleton
this.helper = new THREE.SkeletonHelper( this.group );
this.helper.material.linewidth = 3;
scene.add(this.helper);

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
Robot.prototype.leftkick = function() {
  this.movement = 'leftkick';
};
Robot.prototype.dance = function() {
  var rbt = this
  setInterval(function() {
        var x = Math.floor(Math.random() * 4);
        if (x == 0) {
            rbt.raiseLeftArm();
        } else if (x == 1) {
            rbt.lowerLeftArm();
        } else if (x == 2) {
            rbt.leftkick();
        } else if (x == 3) {
            rbt.kick();
        }
    }, 40);
};

Robot.prototype.onAnimate = function() {
  if( this.movement == 'raise left arm') {
    T = Math.PI
    x = 1
    y = 0
    z = 0

    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
    Math.sin(T/2)*x,
    Math.sin(T/2)*y,
    Math.sin(T/2)*z,
    Math.cos(T/2) ), 0.01);
  }

  else if (this.movement == 'lower left arm') {
    T = Math.PI
    x = 0
    y = 0
    z = 0

    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
    Math.sin(T/2)*x,
    Math.sin(T/2)*y,
    Math.sin(T/2)*z,
    Math.cos(T/2) ), 0.09);
  }

  //Right Kick
  else if (this.movement == 'kick') {


    if (this.right_upper_leg.quaternion.w < 0.72) {

      this.movement = 'kick done';

    }

    else {

      var T = -Math.PI/2;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
        Math.sin( T / 2 ),   // x
        0,                   // y
        0,                   // z
       Math.cos( T / 2 ) ), // w
       0.1 );

    }

  }

  else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  }


  // Left kick
  else if (this.movement == 'leftkick') {

    // check if slerp reached almost the end
    if (this.left_upper_leg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'left kick done';

    }

    else {

      var T = -Math.PI/2;
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(
        Math.sin( T / 2 ),   // x
        0,                   // y
        0,                   // z
       Math.cos( T / 2 ) ), // w
       0.1 );

    }

  }

  else if (this.movement == 'left kick done') {

    // reset leg back to identity
    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  }


  else{

  }
};
