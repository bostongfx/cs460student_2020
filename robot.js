
// Simplifies creating limbs
function limb_creator(x, y, z) {
    var limb = new THREE.Bone();
    limb.position.set(x, y, z);
    return limb;
}

Robot = function(x, y, z) {
    // Head (Root)
    this.head = limb_creator(x, y, z);
    
    // Neck
    this.neck = limb_creator(0, -10, 0);
    this.head.add(this.neck);

    //Torso
    this.torso = limb_creator(0, -40, 0);
    this.neck.add(this.torso);
 
    /* Left Arm*/

    // Upper Arm 
    this.left_upper_arm = limb_creator(5, -5, 0);
    this.neck.add(this.left_upper_arm);

    // Lower Arm
    this.left_lower_arm = limb_creator(5, -15, 0);
    this.left_upper_arm.add(this.left_lower_arm);

    // Left Hand
    this.left_hand = limb_creator(5, -5, 0);
    this.left_lower_arm.add(this.left_hand);

    /* Right Arm */

    // Upper Arm 
    this.right_upper_arm = limb_creator(-5, -5, 0);
    this.neck.add(this.right_upper_arm);

    // Lower Arm
    this.right_lower_arm = limb_creator(-5, -15, 0);
    this.right_upper_arm.add(this.right_lower_arm);

    // Right Hand
    this.right_hand = limb_creator(-5, -5, 0);
    this.right_lower_arm.add(this.right_hand);

    /* Left Leg */

    // Upper Leg  
    this.left_upper_leg = limb_creator(10, -15, 0);
    this.torso.add(this.left_upper_leg);

    // Lower Leg
    this.left_lower_leg = limb_creator(5, -15);
    this.left_upper_leg.add(this.left_lower_leg);

    // Foot
    this.left_foot = limb_creator(5, -5);
    this.left_lower_leg.add(this.left_foot);

    /* Right Leg */
    this.right_upper_leg = limb_creator(-10, -15, 0);
    this.torso.add(this.right_upper_leg);

    // Lower Leg
    this.right_lower_leg = limb_creator(-5, -15, 0);
    this.right_upper_leg.add(this.right_lower_leg);

    // Foot
    this.right_foot = limb_creator(-5, -5, 0);
    this.right_lower_leg.add(this.right_foot);
};

Robot.prototype.show = function(scene) {

    // create group and point to the robot head
    this.group = new THREE.Group();
    this.group.add( this.head );
    scene.add( this.group );
  
    // use the skeleton helper to visualize the skeleton
    this.helper = new THREE.SkeletonHelper( this.group );
    this.helper.material.linewidth = 5;
    scene.add( this.helper );
  
    // no movement by default
    this.movement = '';
  
  };