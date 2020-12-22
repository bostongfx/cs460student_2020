class Robot{

    constructor( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;
        // dancing move direction
        this.directions = [1,-1];


        this.head = new THREE.Bone();
        this.head.position.x = x;
        this.head.position.y = y;
        this.head.position.z = z;


        this.neck = new THREE.Bone();
        this.neck.position.y = -10;
        this.head.add( this.neck );

        this.torso = new THREE.Bone();
        this.torso.position.y = -30;
        this.neck.add( this.torso );

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

    }
    
    show(scene) {
        var rGroup = new THREE.Group();
        rGroup.add( this.head );
        var helper = new THREE.SkeletonHelper( rGroup );
        helper.material.linewidth = 3; // make the skeleton thick
        scene.add(rGroup);
        scene.add(helper);
    }

    // raise_left_arm will change movement to raise_left_arm
    raise_left_arm() {
        this.movement = 'raise_left_arm';
    }

    // lower_left_arm will change movement to lower_left_arm
    lower_left_arm() {
        this.movement = 'lower_left_arm';
    }

    // kick will change movement to kick
    kick() {
        this.movement = 'kick';
    }

    // dance will change movement to a random one in the dance_movment array.
    dance() {
        let dance_movment = ['raise_left_upper_arm', 'lower_left_upper_arm', 'raise_lower_left_arm', 'lower_lower_left_arm', 'raise_upper_right_arm', 'lower_upper_right_arm', 'raise_lower_right_arm', 'lower_lower_right_arm', 'raise_left_hand', 'lower_left_hand', 'raise_right_hand', 'lower_right_hand', 'raise_left_upper_leg', 'lower_left_upper_leg', 'raise_left_lower_leg', 'lower_left_lower_leg', 'raise_left_foot', 'lower_left_foot', 'raise_right_upper_leg', 'lower_right_upper_leg', 'raise_right_lower_leg', 'lower_right_lower_leg', 'raise_right_foot', 'lower_right_foot'];
        this.movement = dance_movment[Math.floor(Math.random() * 24)];
    }

    // kicked will change movement to kick
    kicked() {
        this.movement = "kicked";
    }

    onAnimate() {
        // move_directionchoose a 1 or -1. 
        var move_direction = this.directions[Math.floor(Math.random() * 2)]

        if (this.movement == 'raise_left_arm') {
            var T = Math.PI; // 180 degrees
            var x = 1; 
            var y = 0;
            var z = 0;

            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.01 );
        } else if (this.movement == 'lower_left_arm') {
            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.01 );

        } else if (this.movement == 'kick') {
            var T = Math.PI; // 180 degrees
            var x = 1; 
            var y = 0;
            var z = 0;
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.5 );
        }else if (this.movement == 'kicked') {
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1), 0.2 );

        // below is for dancing
        }else if(this.movement == 'raise_lower_left_arm') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.left_lower_arm.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_lower_left_arm') {
            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_upper_right_arm') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_upper_right_arm') {
            this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        }else if(this.movement == 'raise_lower_right_arm') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.right_lower_arm.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_lower_right_arm') {
            this.right_lower_arm.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_right_hand') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.right_hand.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_right_hand') {
            this.right_hand.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_left_hand') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.left_hand.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_left_hand') {
            this.left_hand.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_left_upper_leg') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_left_upper_leg') {
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_left_lower_leg') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.left_lower_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_left_lower_leg') {
            this.left_lower_leg.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_left_foot') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.left_foot.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_left_foot') {
            this.left_foot.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_right_upper_leg') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_right_upper_leg') {
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_right_lower_leg') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.right_lower_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_right_lower_leg') {
            this.right_lower_leg.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.01 );
        } else if(this.movement == 'raise_right_foot') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.right_foot.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_right_foot') {
            this.right_foot.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        } else if(this.movement == 'raise_left_upper_arm') {
            var T = Math.PI;
            var x = move_direction * 1;
            var y = move_direction * 1;
            var z = move_direction * 1;

            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2)*x, 
                Math.sin(T/2)*y, 
                Math.sin(T/2)*z, 
                Math.cos(T/2) ), 0.1 );
        } else if(this.movement == 'lower_left_upper_arm') {
            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                0, 
                0, 
                0, 
                1 ), 0.1 );
        }
    }
}