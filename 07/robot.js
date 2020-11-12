// Create an empty robot.js
// Modify robot.js

class Robot{

    constructor( x, y, z ) {
        // (Bonus)Part-01: Skin the robot using the HELPER.cylinderSkeletonMesh function.
        // Now we create the limbs of the robot.
        // Start with the head and torso.

        var fromhelper = HELPER.cylinderSkeletonMesh(3,6,'red');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];
        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton( bones );
        mesh.add(bones[0]);
        mesh.bind( skeleton );

        this.root = bones[0];
        this.root.position.set( x,y,z );
        this.head = bones[1];
        this.neck = bones[2];
        this.neck.position.y = -10;
        this.torso = bones[3];
        this.torso.position.y = -30;
        this.body_mesh = mesh;

        // Then, create the left and the right arm.

        var fromhelper = HELPER.cylinderSkeletonMesh(4,6,'blue');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];

        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton( bones );
        mesh.add(bones[0]);
        mesh.bind( skeleton );

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
        this.leftArm_mesh = mesh;

        var fromhelper = HELPER.cylinderSkeletonMesh(4,6,'blue');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];

        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton( bones );
        mesh.add(bones[0]);
        mesh.bind( skeleton );

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

        this.neck.add(this.right_upperarm);
        this.right_upperarm.add(this.right_lowerarm)
        this.right_lowerarm.add(this.right_hand);
        this.rightArm_mesh = mesh;

        // Last, create the left and the right leg of the robot.

        var fromhelper = HELPER.cylinderSkeletonMesh(4,6,'green');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];

        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton( bones );
        mesh.add(bones[0]);
        mesh.bind( skeleton );

        this.torso.add(bones[0]);
        this.left_upperleg = bones[1];
        this.left_upperleg.position.x = 5;
        this.left_upperleg.position.y = -5;

        this.left_lowerleg = bones[2];
        this.left_lowerleg.position.x = 5;
        this.left_lowerleg.position.y = -15;

        this.left_foot = bones[3];
        this.left_foot.position.x = 5;
        this.left_foot.position.y = -5;
        this.leftLeg_mesh = mesh;


        var fromhelper = HELPER.cylinderSkeletonMesh(4,6,'green');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];

        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton( bones );
        mesh.add(bones[0]);
        mesh.bind( skeleton );

        this.torso.add(bones[0]);
        this.right_upperleg = bones[1];
        this.right_upperleg.position.x = -5;
        this.right_upperleg.position.y = -5;

        this.right_lowerleg = bones[2];
        this.right_lowerleg.position.x = -5;
        this.right_lowerleg.position.y = -15;

        this.right_foot = bones[3];
        this.right_foot.position.x = -5;
        this.right_foot.position.y = -5;

        this.torso.add(this.right_upperleg);
        this.right_upperleg.add(this.right_lowerleg)
        this.right_lowerleg.add(this.right_foot);
        this.rightLeg_mesh = mesh;

        this.movement = null;
    }

    // Write a Robot.prototype.show(scene) method that displays the robot by using the THREE.SkeletonHelper object.
    RobotPrototypeShow(scene) {
        scene.add(this.appearance_mesh);
        scene.add( this.body_mesh);
        scene.add(this.leftArm_mesh);
        scene.add(this.leftLeg_mesh);
        scene.add(this.rightArm_mesh);
        scene.add(this.rightLeg_mesh);
    }

    // Using slerp interpolation between quaternions to move the robots’ limbs.
    // First, there is the function for raising left arm.
    raise_left_arm() {
        this.movement = 'raise_left_arm';
    }

    // Similar with above, lowering left arm.
    lower_left_arm() {
        this.movement = 'lower_left_arm';
    }

    // There is the function for raising right arm.
    raise_right_arm() {
        this.movement = 'raise_right_arm';
    }

    // Similar with above, lowering right arm.
    lower_right_arm() {
        this.movement = 'lower_right_arm';
    }

    // Kick(If I have more time, maybe I would learn about how to do a Kamen-Rider Kick.)
    kick() {
        this.movement = 'kick';
    }


    dance() {
        this.movement = "dance";

    }

    onAnimate() {
        if (this.movement == 'raise_left_arm') {

            var T = Math.PI;
            this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                                      0,               // x
                                                                      0,               // y
                                                                      Math.cos(-T/2)), // z
                                                0.1 );

        } else  if (this.movement == 'lower_left_arm') {

               this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                                    0.1 );

        } else if (this.movement == 'kick') {

                // check if slerp reached almost the end
                if (this.right_upperleg.quaternion.w < 0.72) {

                  // signal that the kick is done and the leg should move back
                  this.movement = 'kick_done';

                } else {

                      var T = -Math.PI/2;
                      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                                  0,                   // y
                                                                                  0,                   // z
                                                                                  Math.cos( T / 2 ) ), // w
                                                            0.1 );

                }

        } else if (this.movement == 'kick_done') {

            // reset leg back to identity
            this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

        } else if (this.movement == 'dance') {

            if (typeof this.dancer === 'undefined') {

                this.dancer = setInterval(function() {

                    //
                    // some random translation
                    //
                    var shakehead = 3*Math.random();
                    if (Math.random() < .5) {
                        shakehead *= -1;
                    }

                    var shakeneck = 3*Math.random();
                    if (Math.random() < .5) {
                        shakeneck *= -1;
                    }

                    var shaketorso = 3*Math.random();
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
                        this.movement = 'kick_done';
                    }

                }.bind(this), 400);

            }

        }
    }
}