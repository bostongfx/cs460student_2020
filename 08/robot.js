// Create an empty robot.js
// Modify robot.js

Robot = function (x, y, z) {

    // create head, neck, and, torso
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 6, 'red')
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
    var fromhelper = HELPER.cylinderSkeletonMesh(4, 6, 'blue')
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
    var fromhelper = HELPER.cylinderSkeletonMesh(4, 6, 'blue')
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
    var fromhelper = HELPER.cylinderSkeletonMesh(4, 6, 'green')
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
    var fromhelper = HELPER.cylinderSkeletonMesh(4, 6, 'green')
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


// Write a Robot.prototype.show(scene) method that displays the robot by using the THREE.SkeletonHelper object.
Robot.prototype.show = function (scene) {

    scene.add(this.body_mesh);
    scene.add(this.leftarm_mesh);
    scene.add(this.rightarm_mesh);
    scene.add(this.leftleg_mesh);
    scene.add(this.rightleg_mesh);

};

// Part-06: Create Robot.prototype.onStep.
Robot.prototype.onStep = function () {
    // Use the following code to move the robots in Z-axis.
    this.root.translateZ(-10);

    T = Math.PI;

    // Part-07: Add safety that the robots do not walk off the plane.
    // Whenever they reach the ends of the plane (think about which coordinates of this.root.position to check)
    // ,turn the robots by 180 degree along the Y-axis.
    if (this.root.position.z >= 480 || this.root.position.z <= -480) {
        this.root.rotateY(T);
    }
    // Use the following code to move the robots in X-axis.
    // As a result, this will make robots move along diagonal lines.
    this.root.translateX(10);
    // Same with above, safety for the robots.
    if (this.root.position.x >= 480 || this.root.position.x <= -480) {
        this.root.rotateY(T);
    }

    // Part-08: loops through all the robots in the scene and
    // checks if the current robot (based off this.root.position)
    // is close to another one with the this.root.position.distanceTo() method.
    for(var i in robots) {
        r = robots[i];

        if(this.root.position.equals(r.root.position)) {
            continue;
        }
        if(this.root.position.distanceTo(r.root.position) < 30) {
            this.root.rotateY(T);
            this.root.translateZ(10);
        }
    }

};

Robot.prototype.raise_left_arm = function () {

    this.movement = 'raise_left_arm';

};

Robot.prototype.lower_left_arm = function () {

    this.movement = 'lower_left_arm';

};

Robot.prototype.kick = function () {

    this.movement = 'kick';

};

Robot.prototype.dance = function () {

    this.movement = 'dance';

};

// Part-01: Create a Robot.prototype.walk method that sets this.movement to "walk".
Robot.prototype.walk = function () {

    this.movement = 'walk';

};

// Part-02: Change Robot.prototype.onAnimate to catch if this.movement=="walk".
// Part-03: Change Robot.prototype.onAnimate to catch if this.movement=="walk2".
Robot.prototype.onAnimate = function () {

      if (this.movement == 'raise_left_arm') {

            var T = Math.PI;
            this.left_upperarm.quaternion.slerp(new THREE.Quaternion(Math.sin(-T / 2),  // w
                                                                       0,               // x
                                                                       0,               // y
                                                                     Math.cos(-T / 2)), // z
                                                                       0.1);

      } else if (this.movement == 'lower_left_arm') {

            this.left_upperarm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1),
                                                                       0.1);

      } else if (this.movement == 'kick') {

            // check if slerp reached almost the end
            if (this.right_upperleg.quaternion.w < 0.72) {

                  // signal that the kick is done and the leg should move back
                  this.movement = 'kick done';

            } else {

                  var T = -Math.PI / 2;
                  this.right_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),    // x
                                                                              0,                // y
                                                                              0,                // z
                                                                              Math.cos(T / 2)), // w
                                                                              0.1);

            }

      } else if (this.movement == 'kick done') {

            // reset leg back to identity
            this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

      } else if (this.movement == 'walk') {
            var T = -Math.PI / 4;
            // Part-04: On ”walk”, slerp the right upper leg to identity.
            this.left_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),     // x
                                                                       0,                 // y
                                                                       0,                 // z
                                                                       Math.cos(T / 2)),  // w
                                                                       0.2);
            this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.2);

            // Part-05: Check for this.left_upperleg.quaternion.w
            if (this.left_upperleg.quaternion.w < 0.93) {
                this.movement = 'walk2';

            }

            // Call this.onStep() at the end of each of the ”walk”and”walk2”.
            this.onStep();

      } else if (this.movement == 'walk2') {
            var T = -Math.PI / 4;
            // Part-04: On ”walk2”, slerp the left upper leg to identity.
            this.right_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),  // x
                                                                      0,                // y
                                                                      0,                // z
                                                                      Math.cos(T / 2)), // w
                                                                      0.2);
            this.left_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.2);
            // Part-05: Check for this.right_upperleg.quaternion.w
            if (this.right_upperleg.quaternion.w < 0.93) {
              this.movement = 'walk';
            }

            // Call this.onStep() at the end of each of the ”walk”and”walk2”
            this.onStep();

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