Robot = function(x, y, z) {
	// ROBOT GOES HERE!
    this.head = new THREE.Bone();
    this.head.position.set(x, y, z);
    this.neck = new THREE.Bone();
    this.neck.position.y = -10;
    this.head.add(this.neck);

    // Left Arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;
    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 5;
    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -5;
    this.left_hand.position.x = 5;
    this.left_lower_arm.add(this.left_hand);

    // Right arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -5;
    this.right_upper_arm.position.x = -5;
    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -5;
    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -5;
    this.right_hand.position.x = -5;
    this.right_lower_arm.add(this.right_hand);

    // Torso
    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    // Left Leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -15;
    this.left_upper_leg.position.x = 10;
    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -15;
    this.left_lower_leg.position.x = 5;
    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 5;
    this.left_lower_leg.add(this.left_foot);

    // Right Leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -15;
    this.right_upper_leg.position.x = -10;
    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -15;
    this.right_lower_leg.position.x = -5;
    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -5;
    this.right_lower_leg.add(this.right_foot);
}

Robot.prototype.show = function (scene) {
	// create group and point to the robot head
    this.group = new THREE.Group();
    this.group.add(this.head);
    scene.add(this.group);

	// use the skeleton helper to visualize the skeleton
    this.helper = new THREE.SkeletonHelper( this.group );
    this.helper.material.linewidth = 3;
    scene.add(this.helper);

    // default movement
    this.movement = '';
}

Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise_left_arm';
}
Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower_left_arm';
}
Robot.prototype.left_kick = function() {
	this.movement = 'left_kick';
}

Robot.prototype.onAnimate = function() {
	if (this.movement == 'raise_left_arm'){
		T = Math.PI;
	    x = 1;
	    y = 0;
	    z = 0;
	    this.left_upper_arm.quaternion.slerp(new  THREE.Quaternion (
	      	Math.sin(T/2)*x,
	       	Math.sin(T/2)*y,
	      	Math.sin(T/2)*z,
	     	Math.cos(T/2)), 0.01);
	}
	else if (this.movement == 'lower_left_arm'){
		T = Math.PI;
	    x = 1;
	    y = 0;
	    z = 0;
	    this.left_upper_arm.quaternion.slerp(new  THREE.Quaternion (
	      	0,0,0,1), 0.01);
	}
	else if (this.movement == 'left_kick'){
		T = Math.PI;
	    x = 1;
	    y = 0;
	    z = 0;
	    quat = this.left_upper_leg.quaternion.slerp(new  THREE.Quaternion (
	      	Math.sin(T/2)*x,
	       	Math.sin(T/2)*y,
	      	Math.sin(T/2)*z,
	     	Math.cos(T/2)), 0.01);
	    if (quat._x > 0.99) {
	      	this.movement = 'lower_left_leg';
	    }
	}
	else if (this.movement == 'lower_left_leg'){
		T = Math.PI;
	    x = 1;
	    y = 0;
	    z = 0;
	    this.left_upper_leg.quaternion.slerp(new  THREE.Quaternion (
	      	0,0,0,1), 0.01);
	}
}