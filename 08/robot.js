Robot = function (x, y, z) {

  // create head, neck, and, torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'gray')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.root = bones[0];
  this.root.position.set(x, y, z);

  this.head = bones[1];
  this.neck = bones[2];
  this.neck.position.y = -10;
  this.torso = bones[3];
  this.torso.position.y = -30;
  this.body_mesh = mesh;


  // create left arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'gray')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.neck.add(bones[0]);

  this.left_upperarm = bones[1];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;
  this.left_lowerarm = bones[2];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;
  this.left_hand = bones[3];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;
  this.leftarm_mesh = mesh;



  // create right arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'gray')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.neck.add(bones[0]);

  this.right_upperarm = bones[1];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;
  this.right_lowerarm = bones[2];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;
  this.right_hand = bones[3];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;
  this.rightarm_mesh = mesh;


  // create left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'cornflowerblue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.torso.add(bones[0]);

  this.left_upperleg = bones[1];
  this.left_upperleg.position.y = -5;
  this.left_upperleg.position.x = 5;
  this.left_lowerleg = bones[2];
  this.left_lowerleg.position.y = -15;
  this.left_lowerleg.position.x = 5;
  this.left_foot = bones[3];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.leftleg_mesh = mesh;

  // create right leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'cornflowerblue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.torso.add(bones[0]);

  this.right_upperleg = bones[1];
  this.right_upperleg.position.y = -5;
  this.right_upperleg.position.x = -5;
  this.right_lowerleg = bones[2];
  this.right_lowerleg.position.y = -15;
  this.right_lowerleg.position.x = -5;
  this.right_foot = bones[3];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
  this.rightleg_mesh = mesh;


  this.movement = null;

};


Robot.prototype.show = function (scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);

};

Robot.prototype.raise_left_arm = function () {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function () {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function () {

  this.movement = 'kick';

};

Robot.prototype.dance = function () {

  this.movement = 'dance';

};

Robot.prototype.walk = function () {

  this.movement = 'walk';

};

Robot.prototype.onStep = function (allrobots, objects) {

  this.root.translateZ(10);

  // the following is just to make the movement smoother
  // if an edge is hit, the robot will keep turning and taking a few steps
  // until it is back within the borders
  while (this.root.position.z > 500 || this.root.position.z < -500) {
    this.root.rotateY(Math.random() * Math.PI + 0.2);
    this.root.translateZ(10);
  }
  while (this.root.position.x < -500 || this.root.position.x > 500) {
    this.root.rotateY(Math.random() * Math.PI + 0.2);
    this.root.translateX(10);
  }

  for (var i = 0; i < allrobots.length; i++) {
    if (this != allrobots[i]) {
      while (this.root.position.distanceTo(allrobots[i].root.position) <= 30) {
        this.root.rotateY(Math.random() * Math.PI + 0.2);
        this.root.translateX(10);
      }
    }
  }
  // bonus part 2, don't crash into obstacles
  for (var i = 0; i < objects.length; i++) {
    while (this.root.position.distanceTo(objects[i].position) <= 60) {
      this.root.rotateY(Math.random() * Math.PI + 0.2);
      this.root.translateX(10);
    }
  }
};

Robot.prototype.onAnimate = function (allrobots, objects) {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp(new THREE.Quaternion(Math.sin(-T / 2),  // w
      0,               // x
      0,               // y
      Math.cos(-T / 2)), // z
      0.1);

  } else if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1),
      0.1);

  } else if (this.movement == 'kick') {

    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI / 2;
      this.right_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
        0,                   // y
        0,                   // z
        Math.cos(T / 2)), // w
        0.1);

    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

  } else if (this.movement == 'walk') {
    var T = -Math.PI / 4; // 90 degrees
    this.left_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
      0,                   // y
      0,                   // z
      Math.cos(T / 2)), // w
      0.1);
    this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

    if (this.left_upperleg.quaternion.w < 0.93) {
      this.movement = 'walk2';

    }
    this.onStep(allrobots, objects);
  } else if (this.movement == 'walk2') {
    var T = -Math.PI / 4;
    this.right_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
      0,                   // y
      0,                   // z
      Math.cos(T / 2)), // w
      0.1);
    this.left_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
    if (this.right_upperleg.quaternion.w < 0.93) {
      this.movement = 'walk';

    }
    this.onStep(allrobots, objects);

  }

  else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function () {

        // 
        // some random translation
        //
        var shakehead = 3 * Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3 * Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3 * Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.root.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};