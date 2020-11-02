
// Simplifies creating limbs
function limb_creator(x, y, z) {
    var limb = new THREE.Bone();
    limb.position.set(x, y, z);
    return limb;
}


/*
Note Left and Right are from the Robot Perspective, but
for the camera perspective the "left arm" will raise on the camera's right side 
*/

Robot = function(x, y, z) {
    this.select = 0;
    this.check = false;
    
    // Head (Root)
    this.head = limb_creator(x, y, z);
    
    // Neck
    this.neck = limb_creator(0, -10, 0);
    this.head.add(this.neck);

    // Torso
    this.torso = limb_creator(0, -40, 0);
    this.neck.add(this.torso);
 
    /* Left Arm: Upper and Lower Arms, Left Hand  */

    
    this.left_upper_arm = limb_creator(5, -5, 0);
    this.neck.add(this.left_upper_arm);

    
    this.left_lower_arm = limb_creator(5, -15, 0);
    this.left_upper_arm.add(this.left_lower_arm);

    
    this.left_hand = limb_creator(5, -5, 0);
    this.left_lower_arm.add(this.left_hand);

    /* Right Arm: Upper and Lower arms, Right Hand */

    this.right_upper_arm = limb_creator(-5, -5, 0);
    this.neck.add(this.right_upper_arm);

   
    this.right_lower_arm = limb_creator(-5, -15, 0);
    this.right_upper_arm.add(this.right_lower_arm);

    
    this.right_hand = limb_creator(-5, -5, 0);
    this.right_lower_arm.add(this.right_hand);

    /* Left Leg: Upper and Lower Leg, Left Foot */
    this.left_upper_leg = limb_creator(10, -15, 0);
    this.torso.add(this.left_upper_leg);

    
    this.left_lower_leg = limb_creator(5, -15);
    this.left_upper_leg.add(this.left_lower_leg);

    
    this.left_foot = limb_creator(5, -5);
    this.left_lower_leg.add(this.left_foot);

    /* Right Leg: Upper and Lower Leg, Right Foot */
    this.right_upper_leg = limb_creator(-10, -15, 0);
    this.torso.add(this.right_upper_leg);

    
    this.right_lower_leg = limb_creator(-5, -15, 0);
    this.right_upper_leg.add(this.right_lower_leg);

    
    this.right_foot = limb_creator(-5, -5, 0);
    this.right_lower_leg.add(this.right_foot);

};

Robot.prototype.show = function(scene) {
    var rGroup = new THREE.Group();
    rGroup.add( this.head );

    var helper = new THREE.SkeletonHelper( rGroup );
    helper.material.linewidth = 10; // make the skeleton thick

    scene.add(rGroup);
    scene.add(helper);

};

// Movements
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
}
Robot.prototype.reset = function() {
    this.movement = 'reset';
}

 
// Animations
Robot.prototype.onAnimate = function() {
    
    if (this.movement == 'raise left arm') {

        T = -Math.PI;
        x = 1;
        y = 0;
        z = 0;

        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                   Math.sin(T/2)*y, 
                                                                   Math.sin(T/2)*z, 
                                                                   Math.cos(T/2)), 
                                                                   0.1);
    } else if (this.movement == 'lower left arm') {
        
        T = Math.PI;
        x = 0;
        y = 0;
        z = 0;
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                   Math.sin(T/2)*y, 
                                                                   Math.sin(T/2)*z, 
                                                                   Math.cos(T/2)), 
                                                                   0.1);
    } else if (this.movement == 'kick') {
        if (this.left_upper_leg.quaternion.w < 0.4) {
 
            // signal that the kick is done and the leg should move back
            this.movement = 'kick done';
       
          } 
        else {
            T = -Math.PI;
            x = 1;
            y = 0;
            z = 0;
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                   Math.sin(T/2)*y, 
                                                                   Math.sin(T/2)*z, 
                                                                   Math.cos(T/2)), 
                                                                   0.1);
            
            
        }

    } else if (this.movement == 'kick done') {
 
        // reset leg back to identity
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    
        // Extra Credit
      } else if (this.movement == 'dance') {
        if(this.left_upper_leg.quaternion.w < 0.4) {
            this.movement = 'dancing';
        }
        T = -Math.PI;
        if (this.check == false) {
            this.select = Math.ceil((Math.random() * 3) + 1);
            switch(this.select) {
                case 1:
                    x = 1;
                    y = 0;
                    z = 0;
                    break;
                case 2:
                    x = 0;
                    y = 1;
                    z = 0;
                    break;
                case 3:
                    x = 0;
                    y = 0;
                    z = 1;
                    break;
            }
            this.check = true;
        }
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                   Math.sin(T/2)*y, 
                                                                   Math.sin(T/2)*z, 
                                                                   Math.cos(T/2)), 
                                                                   0.1);
        
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                   Math.sin(T/2)*y, 
                                                                   Math.sin(T/2)*z, 
                                                                   Math.cos(T/2)), 
                                                                   0.1);
        T = Math.PI;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                   Math.sin(T/2)*y, 
                                                                   Math.sin(T/2)*z, 
                                                                   Math.cos(T/2)), 
                                                                   0.1);
        
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x, 
                                                                    Math.sin(T/2)*y, 
                                                                    Math.sin(T/2)*z, 
                                                                    Math.cos(T/2)), 
                                                                    0.1);
        
    // Continues the dance animation
      } else if (this.movement == 'dancing') {
        if(this.left_upper_leg.quaternion.w > .9) {
            this.check = false;
            this.movement = 'dance';
        }
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
        
      } else if(this.movement == 'reset') {
        var ensure = 0;
        while (ensure < 20) {
            this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
            ensure++;
        }
        this.movement = '';
      }

      
};
