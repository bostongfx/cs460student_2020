// Defining multiple frequently used Quaternions.
function getQuaternionX(T) {
  return new THREE.Quaternion( Math.sin( T / 2 ),0,0,Math.cos( T / 2 ) );
}
function getQuaternionY(T) {
  return new THREE.Quaternion( 0,Math.sin( T / 2 ),0,Math.cos( T / 2 ) );
}
function getQuaternionZ(T) {
  return new THREE.Quaternion( 0,0,Math.sin( T / 2 ),Math.cos( T / 2 ) );
}
function getQuaternionReset() {
  return new THREE.Quaternion(0,0,0,1);
}

Robot = function(x,y,z) {
  this.baseX = x;
  this.baseY = y;
  this.baseZ = z;

  var fromhelper = HELPER.cylinderSkeletonMesh(4, 5, 'red')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.root = bones[0];
  this.root.position.set(x,y,z);
  this.head = bones[1];
  this.head.position = this.root.position;
  this.neck = bones[2];
  this.neck.position.y = -10;
  this.shoulder = bones[3];
  this.shoulder.position.y = -1;
  this.torso = bones[4];
  this.torso.position.y = -20;
  this.body_mesh = mesh;

  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.shoulder.add(bones[0]);
  this.l_upper_arm = bones[1];
  this.l_upper_arm.position.x = 5;
  this.l_upper_arm.position.y = -10;
  this.l_lower_arm = bones[2];
  this.l_lower_arm.position.x = 5;
  this.l_lower_arm.position.y = -10;
  this.l_hand = bones[3];
  this.l_hand.position.x = 5;
  this.l_hand.position.y = -5;
  this.l_arm_mesh = mesh;

  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.shoulder.add(bones[0]);
  this.r_upper_arm = bones[1];
  this.r_upper_arm.position.x = -5;
  this.r_upper_arm.position.y = -10;
  this.r_lower_arm = bones[2];
  this.r_lower_arm.position.x = -5;
  this.r_lower_arm.position.y = -10;
  this.r_hand = bones[3];
  this.r_hand.position.x = -5;
  this.r_hand.position.y = -5;
  this.r_arm_mesh = mesh;

  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.torso.add(bones[0]);
  this.l_upper_leg = bones[1];
  this.l_upper_leg.position.x = 5;
  this.l_upper_leg.position.y = -15;
  this.l_lower_leg = bones[2];
  this.l_lower_leg.position.x = 5;
  this.l_lower_leg.position.y = -15;
  this.l_foot = bones[3];
  this.l_foot.position.x = 5;
  this.l_foot.position.y = -5;
  this.l_leg_mesh = mesh;

  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.torso.add(bones[0]);
  this.r_upper_leg = bones[1];
  this.r_upper_leg.position.x = -5;
  this.r_upper_leg.position.y = -15;
  this.r_lower_leg = bones[2];
  this.r_lower_leg.position.x = -5;
  this.r_lower_leg.position.y = -15;
  this.r_foot = bones[3];
  this.r_foot.position.x = -5;
  this.r_foot.position.y = -5;
  this.r_leg_mesh = mesh;

  // Clock and bones for dancing functionality
  this.dancing = {
    "new_x" : 0,
    "new_z" : 0,
    "dance_pos_clock" : new THREE.Clock(),
    "arms" : true,
    "arms_clock" : new THREE.Clock(),
    "legs" : true,
    "legs_clock" : new THREE.Clock(),
    "hip" : true,
    "hip_clock" : new THREE.Clock(),
    "neck" : true,
    "neck_clock" : new THREE.Clock(),
    "head" : true,
    "head_clock" : new THREE.Clock(),
    "shoulder" : true,
    "shoulder_clock" : new THREE.Clock(),
  };
  this.dancing["dance_pos_clock"].start();
  this.dancing["arms_clock"].start();
  this.dancing["legs_clock"].start();
  this.dancing["hip_clock"].start();
  this.dancing["neck_clock"].start();
  this.dancing["head_clock"].start();
  this.dancing["shoulder_clock"].start();

  this.bonesArr = [];

  // Init main body bones
  // this.head = new THREE.Bone();
  // this.head.position.set(x,y,z);
  //
  // this.neck = new THREE.Bone();
  // this.neck.position.y = -10;
  // this.head.add(this.neck);
  //
  // this.shoulder = new THREE.Bone();
  // this.shoulder.position.y = -1;
  // this.neck.add(this.shoulder);
  //
  // this.torso = new THREE.Bone();
  // this.torso.position.y = -20;
  // this.neck.add(this.torso);


  // Init arm bones
  // this.r_upper_arm = new THREE.Bone();
  // this.r_upper_arm.position.x = -5;
  // this.r_upper_arm.position.y = -10;
  // this.neck.add(this.r_upper_arm);
  //
  // this.r_lower_arm = new THREE.Bone();
  // this.r_lower_arm.position.x = -5;
  // this.r_lower_arm.position.y = -10;
  // this.r_upper_arm.add(this.r_lower_arm);
  //
  // this.r_hand = new THREE.Bone();
  // this.r_hand.position.x = -5;
  // this.r_hand.position.y = -5;
  // this.r_lower_arm.add(this.r_hand);

  // this.l_upper_arm = new THREE.Bone();
  // this.l_upper_arm.position.x = 5;
  // this.l_upper_arm.position.y = -10;
  // this.neck.add(this.l_upper_arm);
  //
  // this.l_lower_arm = new THREE.Bone();
  // this.l_lower_arm.position.x = 5;
  // this.l_lower_arm.position.y = -10;
  // this.l_upper_arm.add(this.l_lower_arm);
  //
  // this.l_hand = new THREE.Bone();
  // this.l_hand.position.x = 5;
  // this.l_hand.position.y = -5;
  // this.l_lower_arm.add(this.l_hand);

  // Init leg bones
  // this.l_upper_leg = new THREE.Bone();
  // this.l_upper_leg.position.x = 5;
  // this.l_upper_leg.position.y = -15;
  // this.torso.add(this.l_upper_leg);
  //
  // this.l_lower_leg = new THREE.Bone();
  // this.l_upper_leg.position.x = 5;
  // this.l_upper_leg.position.y = -15;
  // this.l_upper_leg.add(this.l_lower_leg);
  //
  // this.l_foot = new THREE.Bone();
  // this.l_upper_leg.position.x = 5;
  // this.l_upper_leg.position.y = -15;
  // this.l_lower_leg.add(this.l_foot);
  //
  // this.r_upper_leg = new THREE.Bone();
  // this.r_upper_leg.position.x = -5;
  // this.r_upper_leg.position.y = -15;
  // this.torso.add(this.r_upper_leg);
  //
  // this.r_lower_leg = new THREE.Bone();
  // this.r_lower_leg.position.x = -5;
  // this.r_lower_leg.position.y = -15;
  // this.r_upper_leg.add(this.r_lower_leg);
  //
  // this.r_foot = new THREE.Bone();
  // this.r_foot.position.x = -5;
  // this.r_foot.position.y = -5;
  // this.r_lower_leg.add(this.r_foot);

  // Push all bones into BONES array.
  this.bonesArr.push(this.head);
  this.bonesArr.push(this.neck);
  this.bonesArr.push(this.shoulder);
  this.bonesArr.push(this.torso);
  this.bonesArr.push(this.r_upper_arm);
  this.bonesArr.push(this.r_lower_arm);
  this.bonesArr.push(this.r_hand);
  this.bonesArr.push(this.l_upper_arm);
  this.bonesArr.push(this.l_lower_arm);
  this.bonesArr.push(this.l_hand);
  this.bonesArr.push(this.l_upper_leg);
  this.bonesArr.push(this.l_lower_leg);
  this.bonesArr.push(this.l_foot);
  this.bonesArr.push(this.r_upper_leg);
  this.bonesArr.push(this.r_lower_leg);
  this.bonesArr.push(this.r_foot);

};
Robot.prototype.show = function(scene) {
  // var rGroup = new THREE.Group();
  // rGroup.add( this.head );
  // var helper = new THREE.SkeletonHelper( rGroup );
  // helper.material.linewidth = 3; // make the skeleton thick
  // scene.add(rGroup);
  // scene.add(helper);
  scene.add( this.l_arm_mesh );
  scene.add( this.r_arm_mesh );
  scene.add( this.l_leg_mesh );
  scene.add( this.r_leg_mesh );
  scene.add( this.body_mesh );
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
Robot.prototype.dance = function() {
  this.movement = 'dance';
};
// Function to keep track of time for animation.
// Flips dancing boolean.
Robot.prototype.clockCheck = function(t,b) {
  var c = b.concat('_clock');

  if (this.dancing[c].getElapsedTime() > t) {
    this.dancing[c].stop();
    this.dancing[b] = !this.dancing[b];
    this.dancing[c].start();
  }
}
// Randomize position on the dance floor every t seconds.
Robot.prototype.randomizeDancePosRot = function(t) {
    this.root.position.lerp(
      new THREE.Vector3(
        this.dancing.new_x + this.baseX,
        this.root.position.y,
        this.dancing.new_z + this.baseX
      )
      ,0.05
    );

  if (this.dancing['dance_pos_clock'].getElapsedTime() > t) {
    this.dancing['dance_pos_clock'].stop();
    // Random x,z translate
    this.dancing.new_x = Math.floor(Math.random()*100) - 50 + this.baseX;
    this.dancing.new_z = Math.floor(Math.random()*100) - 50 + this.baseZ;
    // Random y rotate
    this.root.rotation.y = Math.floor(Math.random()*100) - 50;
    this.dancing['dance_pos_clock'].start();
  }
}


Robot.prototype.onAnimate = function() {
  if (this.movement == '') {
    for (var i = 0; i < this.bonesArr.length; i++) {
      this.bonesArr[i].quaternion.slerp( getQuaternionReset(), 1 );
    }
  }
  else if (this.movement == 'raise left arm') {
    this.l_upper_arm.quaternion.slerp( getQuaternionX(-Math.PI), 0.1 );
  }
  else if (this.movement == 'lower left arm') {
    this.l_upper_arm.quaternion.slerp( getQuaternionReset(), 0.1 );
  }
  else if (this.movement == 'kick') {
    // check if slerp reached almost the end
    if (this.r_upper_leg.quaternion.w < 0.72) {
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
    }
    else {
      this.r_upper_leg.quaternion.slerp( getQuaternionX(-Math.PI/2), 0.1 );
    }
  }
  else if (this.movement == 'kick done') {
    // reset leg back to identity
    this.r_upper_leg.quaternion.slerp( getQuaternionReset(), 0.1 );
  }
  else if (this.movement == 'dance') {
    this.randomizeDancePosRot(1);

    if (this.dancing.arms) {
      this.r_upper_arm.quaternion.slerp( getQuaternionZ(+Math.PI / 2), 0.1 );
      this.l_upper_arm.quaternion.slerp( getQuaternionZ(-Math.PI / 2), 0.1 );
      this.r_lower_arm.quaternion.slerp( getQuaternionZ(+Math.PI / 4), 0.1 );
      this.l_lower_arm.quaternion.slerp( getQuaternionZ(-Math.PI / 4), 0.1 );
      this.clockCheck(0.5,'arms');
    }
    else {
      this.r_upper_arm.quaternion.slerp( getQuaternionZ(-Math.PI / 2), 0.1 );
      this.l_upper_arm.quaternion.slerp( getQuaternionZ(+Math.PI / 2), 0.1 );
      this.r_lower_arm.quaternion.slerp( getQuaternionZ(0), 0.1 );
      this.l_lower_arm.quaternion.slerp( getQuaternionZ(0), 0.1 );
      this.clockCheck(0.5,'arms');
    }
    if (this.dancing.legs) {
      this.r_upper_leg.quaternion.slerp( getQuaternionZ(Math.PI / 4), 0.1 );
      this.l_upper_leg.quaternion.slerp( getQuaternionZ(-Math.PI / 4), 0.1 );
      this.clockCheck(0.5,'legs');
    }
    else {
      this.r_upper_leg.quaternion.slerp( getQuaternionZ(0), 0.1 );
      this.l_upper_leg.quaternion.slerp( getQuaternionZ(0), 0.1 );
      this.clockCheck(0.5,'legs');
    }
    if (this.dancing.hip) {
      this.torso.quaternion.slerp( getQuaternionZ(Math.PI / 8), 0.1 );
      this.clockCheck(0.3,'hip');
    }
    else {
      this.torso.quaternion.slerp( getQuaternionZ(-Math.PI / 8), 0.1 );
      this.clockCheck(0.3,'hip');
    }
    if (this.dancing.neck) {
      this.neck.quaternion.slerp( getQuaternionZ(-Math.PI / 15), 0.1 );
      this.clockCheck(0.6,'neck');
    }
    else {
      this.neck.quaternion.slerp( getQuaternionZ(Math.PI / 15), 0.1 );
      this.clockCheck(0.6,'neck');
    }
    if (this.dancing.head) {
      this.head.quaternion.slerp( getQuaternionZ(-Math.PI / 20), 0.1 );
      this.clockCheck(0.5,'head');
    }
    else {
      this.head.quaternion.slerp( getQuaternionZ(Math.PI / 20), 0.1 );
      this.clockCheck(0.5,'head');
    }
    if (this.dancing.shoulder) {
      this.shoulder.quaternion.slerp( getQuaternionX(-Math.PI / 5), 0.1 );
      this.clockCheck(0.3,'shoulder');
    }
    else {
      this.shoulder.quaternion.slerp( getQuaternionX(Math.PI / 5), 0.1 );
      this.clockCheck(0.3,'shoulder');
    }
  }
};
