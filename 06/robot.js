// Part-01: Create a empty robot.js
// Part-02: Modify robot.js

// Part-03: Constructor for a Robot object, it take x,y,and z parameters to configure the position of the robot.
class Robot{

    // Part-04: Initialize THREE.Bone objects for this.head,this.neck, and this.torso.
    constructor( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;


        this.head = new THREE.Bone();
        this.head.position.x = x;
        this.head.position.y = y;
        this.head.position.z = z;


        this.neck = new THREE.Bone();
        this.neck.position.y = -10;
        // Part-05: Create the scene graph hierarchy with this.head as root. Following "this.XXX.add" is same.
        this.head.add( this.neck );

        // Main body of the robots, it's the parent node of the arms and legs.
        this.torso = new THREE.Bone();
        this.torso.position.y = -30;
        this.neck.add( this.torso );

        // Part-06: Now we create the limbs of the robot.
        // Start with the left and right arms.

        // In the same time:

        // Part-09: Adjust the positions of all properties. Making them to be a nature skeleton as we did in class.
        this.left_upper_arm  = new THREE.Bone();
        this.left_upper_arm.position.y = -5;
        this.left_upper_arm.position.x = 5;
        this.neck.add( this.left_upper_arm  );

        this.left_lower_arm = new THREE.Bone();
        this.left_lower_arm.position.y = -15;
        this.left_lower_arm.position.x = 5;
        this.left_upper_arm.add( this.left_lower_arm );

        this.left_hand = new THREE.Bone();
        this.left_hand.position.y = -5;
        this.left_hand.position.x = 5;
        this.left_lower_arm.add( this.left_hand );

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


        // Part-07: Then, create the legs of the robots.
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

        this.directions = [-1,1];
    }

    // Write a Robot.prototype.show(scene) method that displays the robot by using the THREE.SkeletonHelper object.
    RobotPrototypeShow(scene) {
        var rGroup = new THREE.Group();
        rGroup.add( this.head );

        var helper = new THREE.SkeletonHelper( rGroup );
        helper.material.linewidth = 3; // make the skeleton thick.

        scene.add(rGroup);
        scene.add(helper);
    }

    // Part-11: Using slerp interpolation between quaternions to move the robots’ limbs.
    // First, there is the function for raising left arm.
    raise_left_arm() {
        this.movement = 'raise_left_arm';
    }

    // Similar with above, lowering left arm.
    lower_left_arm() {
        this.movement = 'lower_left_arm';
    }

    // Kick(If I have more time, maybe I would learn about how to do a Kamen-Rider Kick.)
    kick() {
        this.movement = 'kick';
    }

    step = 0;

    // If the robot kicked, restore its leg.
    restore() {
        this.movement = "restore";
    }

    dance() {
        this.movement = "dance";

    }

    onAnimate() {
        var move_direction = this.directions[Math.floor(Math.random() * 2)]

        if (this.movement == 'raise_left_arm') {
            var T = Math.PI;
            var x = 1;
            var y = 0;
            var z = 0;

            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                                    Math.sin(T/2) * x,
                                                    Math.sin(T/3) * y,
                                                    Math.sin(T/3) * z,
                                                    Math.cos(T/2) ), 0.01 );
        } else if (this.movement == 'lower_left_arm') {
            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                                    0,
                                                    0,
                                                    0,
                                                    1 ), 0.01 );

        } else if (this.movement == 'kick') {
            var T = Math.PI;
            var x = 1;
            var y = 0;
            var z = 0;
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(
                                                    Math.sin(T/2)*x,
                                                    Math.sin(T/2)*y,
                                                    Math.sin(T/2)*z,
                                                    Math.cos(T/2) ), 0.9 );
        }else if (this.movement == 'restore') {
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(
                                                    0,
                                                    0,
                                                    0,
                                                    1), 0.5 );

        }
    }
}