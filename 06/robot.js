Robot = function(x, y, z) {

    // default constructor
    // ROBOT GOES HERE!
    this.head = new THREE.Bone(); // create a head
    this.head.position.x = x; // world coordinates
    this.head.position.y = y;
    this.head.position.z = z;
        
    this.neck = new THREE.Bone(); // add a neck to the head
    this.neck.position.y = -10;
    this.head.add( this.neck );
        
        
    // LEFT ARM
    this.left_upper_arm = new THREE.Bone(); // add an arm to the neck: elbow
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;
    this.neck.add( this.left_upper_arm );
        
    this.left_lower_arm = new THREE.Bone(); // add an arm to the upper arm: wrist
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 5;
    this.left_upper_arm.add( this.left_lower_arm );
        
    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -5;
    this.left_hand.position.x = 5;
    this.left_lower_arm.add( this.left_hand );
        
        
    // RIGHT ARM
    this.right_upper_arm = new THREE.Bone(); // add arm to neck: elbow
    this.right_upper_arm.position.y = -5;
    this.right_upper_arm.position.x = -5;
    this.neck.add( this.right_upper_arm );
        
    this.right_lower_arm = new THREE.Bone(); // add arm to arm: wrist
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -5;
    this.right_upper_arm.add( this.right_lower_arm );
        
    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -5;
    this.right_hand.position.x = -5;
    this.right_lower_arm.add( this.right_hand );
        
    // TORSO
    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);
        
    // LEFT LEG
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -15;
    this.left_upper_leg.position.x = 5;
    this.torso.add( this.left_upper_leg );
        
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -15;
    this.left_lower_leg.position.x = 5;
    this.left_upper_leg.add( this.left_lower_leg );
        
    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 5
    this.left_lower_leg.add( this.left_foot );
        
        
    // RIGHT LEG
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -15;
    this.right_upper_leg.position.x = -5;
    this.torso.add( this.right_upper_leg );
        
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -15;
    this.right_lower_leg.position.x = -5;
    this.right_upper_leg.add( this.right_lower_leg );
        
    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -5
    this.right_lower_leg.add( this.right_foot );
    console.log('hello!');

};

Robot.prototype.show = function() {
    console.log(this.name);
    // create group and point to the robot head
    this.group = new THREE.Group();
    this.group.add(this.head);
    scene.add(this.group);
        

    // use the skeleton helper to visualize the skeleton
    this.helper = new THREE.SkeletonHelper( this.group ); // helper helps to visualize the skeleton
    this.helper.material.linewidth = 3;
    scene.add(this.helper);
}


Robot.prototype.raiseLeftArm = function() {
    this.movement = 'raise left arm';
}
    
Robot.prototype.lowerLeftArm = function() {
    this.movement = 'lower left arm';
}

Robot.prototype.raiseRightArm = function() {
    this.movement = 'raise right arm';
}
    
Robot.prototype.lowerRightArm = function() {
    this.movement = 'lower right arm';
}

Robot.prototype.rightKick = function() {
    this.movement = 'right kick';
}

Robot.prototype.leftKick = function() {
    this.movement = 'left kick';
}

Robot.prototype.Dance = function() {
    var that = this
    setInterval(function() {
        var rand = Math.floor(Math.random() * 6);
        if (rand == 0) {
            that.raiseLeftArm();
        } else if (rand == 1) {
            that.raiseRightArm();
        } else if (rand == 2) {
            that.lowerLeftArm();
        } else if (rand == 3) {
            that.lowerRightArm();
        } else if (rand == 4) {
            that.leftKick();
        } else if (rand == 5) {
            that.rightKick();
        }
    }, 90);
};

Robot.prototype.onAnimate = function() {
    
    // RAISE LEFT ARM
    if ( this.movement == 'raise left arm' ) {
        var T = Math.PI // 180 degrees
        var x = 1
        var y = 0
        var z = 0
        
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.5); // where the 0.01 is the delta
    
    // LOWER LEFT ARM
    } else if ( this.movement == 'lower left arm') {
        var T = Math.PI // 180 degrees
        var x = 0
        var y = 0
        var z = 0
        
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.5); // where the 0.01 is the delta
    
    // RAISE RIGHT ARM
    } else if ( this.movement == 'raise right arm' ) {
        var T = Math.PI // 180 degrees
        var x = 1
        var y = 0
        var z = 0
        
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.5); // where the 0.01 is the delta
    
    // LOWER RIGHT ARM
    } else if ( this.movement == 'lower right arm') {
        var T = Math.PI // 180 degrees
        var x = 0
        var y = 0
        var z = 0
        
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.5); // where the 0.01 is the delta
            
    // KICK
    } else if ( this.movement == 'right kick' ) {
        if ( this.right_upper_leg.quaternion.w < 0.72 ) {
            // signal for a kick that is done
            this.movement = 'kick done';
        } else {
            var T = Math.PI / 2;
            x = 1;
            y = 0;
            z = 0;
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2) * x, // x
                Math.sin(T/2) * y, // y
                Math.sin(T/2) * z, // z
                Math.sin(T/2) ), 0.5); // w
        }
    } else if ( this.movement == 'kick done') {
        //put leg back
        var x = 0;
        var y = 0;
        var z = 0;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( x, y, z, 1), 0.5);
    } else if ( this.movement == 'left kick' ) {
        if ( this.left_upper_leg.quaternion.w < 0.72 ) {
            // signal for a kick that is done
            this.movement = 'leftkick done';
        } else {
            var T = Math.PI / 2;
            x = 1;
            y = 0;
            z = 0;
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2) * x, // x
                Math.sin(T/2) * y, // y
                Math.sin(T/2) * z, // z
                Math.sin(T/2) ), 0.5); // w
        }
    } else if ( this.movement == 'leftkick done') {
        //put leg back
        var x = 0;
        var y = 0;
        var z = 0;
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( x, y, z, 1), 0.5);
    } else if ( this.movement == 'dance') {
        //this.rightKick();
        //this.movement == 'raise left arm');
    }

};















