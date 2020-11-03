Robot = function(x, y, z) {
    // ROBOT GOES HERE!
    //TOP OF BODY
    //default constructor
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    this.neck = new THREE.Bone();
    this.neck.position.y = -10;
    this.head.add( this.neck );

   //LEFT ARM PART
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

    //RIGHT ARM PART
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
    //BOTTOM PART
    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add( this.torso );
    
    //LEFT LEG PART
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -15;
    this.left_upper_leg.position.x = 10;
    this.torso.add( this.left_upper_leg );

    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -10;
    this.left_lower_leg.position.x = 5;
    this.left_upper_leg.add( this.left_lower_leg );

    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 5;
    this.left_lower_leg.add( this.left_foot );

    //RIGHT LEG PART
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -15;
    this.right_upper_leg.position.x = -10;
    this.torso.add( this.right_upper_leg );

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -10;
    this.right_lower_leg.position.x = -5;
    this.right_upper_leg.add( this.right_lower_leg );

    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -5;
    this.right_lower_leg.add( this.right_foot );

};

Robot.prototype.show = function(scene) {
    //create group and point to the robot head
    this.group = new THREE.Group();
    this.group.add(this.head);
    scene.add(this.group);

    //use the skeleton helper to visualize the skeleton
    this.helper = new THREE.SkeletonHelper(this.group);
    this.helper.material.linewidth = 3; // not working in my windowOS.
    scene.add( this.helper );

    //no movement by default
    this.movement = '';
};

Robot.prototype.raiseleftarm = function() {
    this.movement = 'raiseleftarm';
};

Robot.prototype.lowerleftarm = function() {
    this.movement = 'lowerleftarm';
};

Robot.prototype.kick = function() {
    this.movement = 'kick';
};
Robot.prototype.dance = function() {
    this.movement = 'dance';
}
Robot.prototype.stand = function() {
    this.movement = 'stand';
}

Robot.prototype.onAnimate = function() {

    if( this.movement == 'raiseleftarm') {
        T = Math.PI;
        x = 1;
        y = 0;
        z = 0;
        this.left_upper_arm.quaternion.slerp(new  THREE.Quaternion (
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2)), 0.1);
    }
    else if( this.movement == 'lowerleftarm' ) {
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            0,
            0,
            0,
            1), 0.1);
    }
    else if( this.movement == 'kick'){
        if(this.right_upper_leg.quaternion.w < 0.72) {
         this.movement = 'kick done';   
        } else {
            T = -Math.PI/2;
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
                Math.sin(T/2),
                0,
                0,
                Math.cos(T/2)), 0.1);
        }
 
    }
    else if( this.movement == 'kick done') {
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
            0,
            0,
            0,
            1), 0.1);
    }
    else if( this.movement == 'dance') {
        T = Math.PI;
        xxis = new THREE.Quaternion( Math.sin(T/2), 0, 0, Math.cos(T/2));
        yxis = new THREE.Quaternion( 0, Math.sin(T/2), 0, Math.cos(T/2));
        T = Math.PI;
        t= this.right_upper_leg.quaternion.slerp(yxis, 0.05);
        this.left_upper_leg.quaternion.slerp(yxis, 0.05);
        this.left_upper_arm.quaternion.slerp(yxis, 0.05);
        this.right_upper_arm.quaternion.slerp(yxis, 0.05);
        this.left_upper_arm.quaternion.slerp(xxis, 0.05);
        this.right_upper_arm.quaternion.slerp(xxis, 0.05);
        if (t.y > 0.9) {
            this.movement = 'dance done';
        }
    }
    else if( this.movement == 'dance done') {
        reset = new THREE.Quaternion ( 0, 0, 0, 1);
        t=this.right_upper_leg.quaternion.slerp(reset, 0.05);
        this.left_upper_leg.quaternion.slerp(reset, 0.05);
        this.left_upper_arm.quaternion.slerp(reset, 0.05);
        this.right_upper_arm.quaternion.slerp(reset, 0.05);
        if (t.y < 0.2) {
            this.movement = 'dance';
        }

    }
    else if( this.movement == 'stand') {
        reset = new THREE.Quaternion ( 0, 0, 0, 1);
        this.right_upper_leg.quaternion.slerp(reset, 0.05);
        this.left_upper_leg.quaternion.slerp(reset, 0.05);
        this.left_upper_arm.quaternion.slerp(reset, 0.05);
        this.right_upper_arm.quaternion.slerp(reset, 0.05);
    }
};