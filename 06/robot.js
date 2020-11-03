Robot = function(x, y, z) {
    
    this.head = new THREE.Bone();
    this.head.position.x = x; // world coordinates
    this.head.position.y = y;
    this.head.position.z = z;
  
    // Create a scene graph hierachy
    // Adjust properly the positions of all properties
    this.neck = new THREE.Bone();
    this.neck.position.y = -10; // head 
    this.head.add( this.neck );

    // Create a scene graph hierachy
    // Adjust properly the positions of all properties
    this.torso = new THREE.Bone();
    this.torso.position.y = -30; // torso is 3x as long as the neck
    this.neck.add( this.torso );
  
    // Create the limbs of the robot
    // LEFT ARM
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -5; // head of left arm
    this.left_upper_arm.position.x = 5;
    this.neck.add( this.left_upper_arm );
  
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -15; // lower arm
    this.left_lower_arm.position.x = 5;
    this.left_upper_arm.add( this.left_lower_arm );
  
    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -5; // left hand
    this.left_hand.position.x = 5;
    this.left_lower_arm.add( this.left_hand );
  
    // RIGHT ARM
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -5; // head of right arm
    this.right_upper_arm.position.x = -5;
    this.neck.add( this.right_upper_arm );
  
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -15; // lower arm
    this.right_lower_arm.position.x = -5;
    this.right_upper_arm.add( this.right_lower_arm );
  
    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -5; // right hand
    this.right_hand.position.x = -5;
    this.right_lower_arm.add( this.right_hand );
    
  
    // LEFT LEG
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -15; // head of left leg 
    this.left_upper_leg.position.x = 10;
    this.torso.add( this.left_upper_leg );
  
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -15; // lower leg
    this.left_lower_leg.position.x = 5;
    this.left_upper_leg.add( this.left_lower_leg );
  
    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -5; // left foot
    this.left_foot.position.x = 5;
    this.left_lower_leg.add( this.left_foot );
  
    // RIGHT LEG
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -15; // head of right leg
    this.right_upper_leg.position.x = -10;
    this.torso.add( this.right_upper_leg );
  
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -15; // lower leg
    this.right_lower_leg.position.x = -5;
    this.right_upper_leg.add( this.right_lower_leg );
  
    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -5; // right foot
    this.right_foot.position.x = -5;
    this.right_lower_leg.add( this.right_foot );
  
};

Robot.prototype.show = function( scene ) {
    
    // create group and point to the robot head
    this.group = new THREE.Group();
    this.group.add( this.head );

    scene.add( this.group );
  
    // use the skeleton helper to visualize the skeleton
    this.helper = new THREE.SkeletonHelper( this.group );
    this.helper.material.linewidth = 5; // make the layer of the bone more thick

    scene.add( this.helper );
  
    // no movement by default to control animation movement 
    this.movement = null;

};


Robot.prototype.raise_left_arm = function() {
  
    this.movement = 'raise_left_arm';
  
};

Robot.prototype.lower_left_arm = function() {

    this.movement = 'lower_left_arm';
  
};
  
Robot.prototype.kick = function() {
  
    this.movement = 'kick';
  
};
  
Robot.prototype.dance = function() {
    
    this.movement = 'dance';
  
};

// Use slerp interpolation between quaternions to move robot's limbs
Robot.prototype.onAnimate = function() {

    if ( this.movement == 'raise_left_arm' ) {
    
        var T = Math.PI;

        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                            Math.sin(-T/2),  // w
                                            0,               // x
                                            0,               // y
                                            Math.cos(-T/2)), // z
                                            0.1 );
    
    } else  if ( this.movement == 'lower_left_arm' ) {

        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1), 0.1 );
    
    } else if ( this.movement == 'kick' ) {
        
        // check if slerp reached almost the end
        if (this.right_upper_leg.quaternion.w < 0.85) {
            
            // signal that the kick is done and the leg should do backward slerps.
            this.movement = 'kick_done';

        } else {
            
            var T = -Math.PI/2;
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                                                Math.sin( T / 2 ),   // x
                                                0,                   // y
                                                0,                   // z
                                                Math.cos( T / 2 ) ), // w
                                                0.1 );
        }
    
    } else if (this.movement == 'kick_done') {
        
        // reset leg back to identity
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1), 0.1 );
    
    }
    // Part 2 bonus. Add dance movement.
    else if ( this.movement == 'dance' ) {

        if ( typeof this.robot_dance === 'undefined' ) {

            var T = Math.PI
            x = 0
            y = 1
            z = 0;
            this.head.quaternion.slerp( new THREE.Quaternion (
                Math.sin(T/2) * x,
                Math.sin(T/2) * y,
                Math.sin(T/2) * z,
                Math.cos(T/2)), 0.05 );
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion (
                Math.sin(T/2) * y,
                Math.sin(T/2) * x,
                Math.sin(T/2) * z,
                Math.cos(T/2)), 0.05 );
            this.right_upper_arm.quaternion.slerp( new THREE.Quaternion (
                Math.sin(T/2) * y,
                Math.sin(T/2) * x,
                Math.sin(T/2) * z,
                Math.cos(T/2)), 0.05 );

        } else if ( this.movement == 'return_normal' ) {

            this.head.quaternion.slerp(new THREE.Quaternion (
                                                        0, 0, 0, 1 ), 0.05 );
            this.left_upper_leg.quaternion.slerp(new  THREE.Quaternion (
                                                        0, 0, 0, 1 ), 0.05 );
            this.right_upper_arm.quaternion.slerp(new  THREE.Quaternion (
                                                        0, 0, 0, 1), 0.05 );

        }
    }
}