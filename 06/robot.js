Robot = function(x, y, z) {

  this.head = new THREE.Bone();
  this.head.position.x = x; // world coordinates
  this.head.position.y = y;
  this.head.position.z = z;


  this.neck = new THREE.Bone();
  this.neck.position.y = -10;
  this.head.add( this.neck );

  // LEFT ARM
  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.y = -5;
  this.left_upper_arm.position.x = 5;
  this.neck.add( this.left_upper_arm );

  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.y = -15;
  this.left_lower_arm.position.x = 5;
  this.left_upper_arm.add( this.left_lower_arm );

  this.left_hand = new THREE.Bone();
  this.left_hand.position.y = -5;
  this.left_hand.position.x = 5;
  this.left_lower_arm.add( this.left_hand );

  // RIGHT ARM
  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.y = -5;
  this.right_upper_arm.position.x = -5;
  this.neck.add( this.right_upper_arm );

  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.y = -15;
  this.right_lower_arm.position.x = -5;
  this.right_upper_arm.add( this.right_lower_arm );

  this.right_hand = new THREE.Bone();
  this.right_hand.position.y = -5;
  this.right_hand.position.x = -5;
  this.right_lower_arm.add( this.right_hand );


  this.torso = new THREE.Bone();
  this.torso.position.y = -30;
  this.neck.add( this.torso );

  // LEFT LEG
  this.left_upper_leg = new THREE.Bone();
  this.left_upper_leg.position.y = -15;
  this.left_upper_leg.position.x = 10;
  this.torso.add( this.left_upper_leg );

  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.y = -15;
  this.left_lower_leg.position.x = 5;
  this.left_upper_leg.add( this.left_lower_leg );

  this.left_foot = new THREE.Bone();
  this.left_foot.position.y = -5;
  this.left_foot.position.x = 5;
  this.left_lower_leg.add( this.left_foot );

  // RIGHT LEG
  this.right_upper_leg = new THREE.Bone();
  this.right_upper_leg.position.y = -15;
  this.right_upper_leg.position.x = -10;
  this.torso.add( this.right_upper_leg );

  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.y = -15;
  this.right_lower_leg.position.x = -5;
  this.right_upper_leg.add( this.right_lower_leg );

  this.right_foot = new THREE.Bone();
  this.right_foot.position.y = -5;
  this.right_foot.position.x = -5;
  this.right_lower_leg.add( this.right_foot );

};

Robot.prototype.show = function(scene) {

  // create group and point to the robot head
  var rGroup = new THREE.Group();
  rGroup.add( this.head );
  scene.add( rGroup );

  // use the skeleton helper to visualize the skeleton
  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3;
  scene.add( helper );

  // no movement by default
  this.movement = '';

};

Robot.prototype.raise_left_arm = function() {
  this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
  this.movement = 'lower left arm';
};

Robot.prototype.kick = function() {
  this.movement = 'kick';
};

Robot.prototype.dance = function() {
  this.movement = 'dance';
};

Robot.prototype.reset = function() {
  this.movement = 'reset';
};

Robot.prototype.onAnimate = function() {

  if ( this.movement == 'raise left arm' ) {

    T = -Math.PI // 180 degrees
    x = 1 
    y = 0
    z = 0

    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

  }

  else if (this.movement == 'lower left arm') {
    T = 0; // 180 degrees -- doesnt matter here.
    x = 0;
    y = 0;
    z = 0;

    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );
  }

  else if ( this.movement == 'kick' ) {

    // DO SOMETHING
    if (this.right_upper_leg.quaternion.w < 0.72) {
      this.movement = 'kick done';
    }
    else {
      T = -Math.PI/2; // 180 degrees
      x = 1;
      y = 0;
      z = 0;

      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
        Math.sin(T/2)*x, 
        Math.sin(T/2)*y, 
        Math.sin(T/2)*z, 
        Math.cos(T/2) ), 0.1 );
    }
  }

  else if (this.movement == 'kick done') {
    T = 0; // 180 degrees -- doesnt matter here.
      x = 0;
      y = 0;
      z = 0;

      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
        Math.sin(T/2)*x, 
        Math.sin(T/2)*y, 
        Math.sin(T/2)*z, 
        Math.cos(T/2) ), 0.1 );
  }

  else if (this.movement == 'dance') {
    moves = [this.right_upper_arm.quaternion,
            this.right_lower_arm.quaternion,
            this.left_upper_arm.quaternion,
            this.left_lower_arm.quaternion,
            this.right_upper_leg.quaternion,
            this.right_lower_leg.quaternion,
            this.left_upper_leg.quaternion,
            this.left_lower_leg.quaternion,
    ];

    move = moves[Math.floor(Math.random() * 8)];

    if (move.w < 0.72) {
      this.movement = 'reset';
    }
    else {
      T = Math.PI/2; // 180 degrees
      x = 1;
      y = 0;
      z = 0;

      move.slerp( new THREE.Quaternion(
        Math.sin(T/2)*x, 
        Math.sin(T/2)*y, 
        Math.sin(T/2)*z, 
        Math.cos(T/2) ), 0.1 );
    }

  }

  else if (this.movement == 'reset') {
    this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.right_lower_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.left_lower_arm.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.right_lower_leg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
  }

};