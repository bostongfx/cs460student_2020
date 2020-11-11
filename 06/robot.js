// part 2 
Robot = function(x, y ,z){
	// Part3, 4, 5, 6, 7, 9
	// head
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
  	this.head.position.z = z;

  	//neck 
  	//add to head
  	this.neck = new THREE.Bone();
  	this.neck.position.y = -10;
	this.head.add(this.neck);

	//left upper arm
	//put it to neck
	this.left_upper_arm = new THREE.Bone();
  	this.left_upper_arm.position.y = -5;
 	this.left_upper_arm.position.x = 5;
  	this.neck.add( this.left_upper_arm );

  	//left lower arm
  	//put it to left upper arm
  	this.left_lower_arm = new THREE.Bone();
  	this.left_lower_arm.position.y = -15;
  	this.left_lower_arm.position.x = 5;
  	this.left_upper_arm.add( this.left_lower_arm );

  	//left hand
  	// put it to left lower arm
 	this.left_hand = new THREE.Bone();
  	this.left_hand.position.y = -5;
  	this.left_hand.position.x = 5;
  	this.left_lower_arm.add( this.left_hand );

  	//right upper arm
  	//put it to neck
  	this.right_upper_arm = new THREE.Bone();
  	this.right_upper_arm.position.y = -5;
 	this.right_upper_arm.position.x = -5;
  	this.neck.add( this.right_upper_arm );

  	//right lower arm
  	//put it to right upper arm
	this.right_lower_arm = new THREE.Bone();
  	this.right_lower_arm.position.y = -15;
  	this.right_lower_arm.position.x = -5;
  	this.right_upper_arm.add( this.right_lower_arm );

  	//right hand
  	//put it to right lower arm
  	this.right_hand = new THREE.Bone();
  	this.right_hand.position.y = -5;
  	this.right_hand.position.x = -5;
  	this.right_lower_arm.add( this.right_hand );

  	//torso
  	//put it to neck
  	this.torso = new THREE.Bone();
  	this.torso.position.y = -30;
  	this.neck.add( this.torso );

  	//left upper leg
  	//put it to torso
  	this.left_upper_leg = new THREE.Bone();
  	this.left_upper_leg.position.y = -15;
  	this.left_upper_leg.position.x = 10;
  	this.torso.add( this.left_upper_leg );

  	//left lower leg
  	//put it to left upper leg
  	this.left_lower_leg = new THREE.Bone();
  	this.left_lower_leg.position.y = -15;
  	this.left_lower_leg.position.x = 5;
  	this.left_upper_leg.add( this.left_lower_leg );

  	//left foot
  	//put it to left lower leg
  	this.left_foot = new THREE.Bone();
  	this.left_foot.position.y = -5;
  	this.left_foot.position.x = 5;
  	this.left_lower_leg.add( this.left_foot );

	//right upper leg
  	//put it to torso
  	this.right_upper_leg = new THREE.Bone();
  	this.right_upper_leg.position.y = -15;
  	this.right_upper_leg.position.x = -10;
  	this.torso.add( this.right_upper_leg );

  	//right lower leg
  	//put it to right upper leg
  	this.right_lower_leg = new THREE.Bone();
  	this.right_lower_leg.position.y = -15;
  	this.right_lower_leg.position.x = -5;
  	this.right_upper_leg.add( this.right_lower_leg );

  	//right foot
  	//put it to right lower leg
  	this.right_foot = new THREE.Bone();
  	this.right_foot.position.y = -5;
  	this.right_foot.position.x = -5;
  	this.right_lower_leg.add( this.right_foot );
};
// Part 8
Robot.prototype.show = function(scene) {

  // create group and point to the robot head
  this.group = new THREE.Group();
  this.group.add( this.head );
  scene.add( this.group );

  // use the skeleton helper to visualize the skeleton
  this.helper = new THREE.SkeletonHelper( this.group );
  this.helper.material.linewidth = 3;
  scene.add( this.helper );

  // no movement by default
  this.movement = '';

};

Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
};

Robot.prototype.kick_right = function() {
	this.movement = 'kick right';
};

Robot.prototype.kick_left = function() {
	this.movement = 'kick left';
};

Robot.prototype.dance = function() {
	this.movement = 'dance';
};

Robot.prototype.onAnimate = function() {
	
	if (this.movement == 'raise left arm') {
		T = - Math.PI;
		x = 1;
		y = 0;
		z = 0;
		this.left_upper_arm.quaternion.slerp(
			new THREE.Quaternion(
				Math.sin(T/2) * x, 
				Math.sin(T/2) * y,
				Math.sin(T/2) * z,
				Math.cos(T/2) ), 0.1)
		console.log(this.left_upper_arm.quaternion.x);
	} else if (this.movement == 'lower left arm') {
		T = 0;
		x = 0;
		y = 0;
		z = 0;
		this.left_upper_arm.quaternion.slerp(
			new THREE.Quaternion(
				Math.sin(T/2) * x, 
				Math.sin(T/2) * y,
				Math.sin(T/2) * z,
				Math.cos(T/2) ), 0.1)
	} else if (this.movement == 'kick right') {
		if (this.right_upper_leg.quaternion.x < -0.70){
			this.movement = 'kick back right';
		} else {
			T = - Math.PI;
			x = 1;
			y = 0;
			z = 0;
			this.right_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
				Math.sin(T/4) * x, 
        		Math.sin(T/4) * y, 
        		Math.sin(T/4) * z, 
        		Math.cos(T/4) ), 0.1 );
		}
	} else if (this.movement == 'kick back right'){
		T = 0;
		x = 0;
		y = 0;
		z = 0;
		this.right_upper_leg.quaternion.slerp(
			new THREE.Quaternion(
			Math.sin(T/4) * x, 
    		Math.sin(T/4) * y, 
    		Math.sin(T/4) * z, 
    		Math.cos(T/4) ), 0.1 );
	} else if (this.movement == 'kick left') {
		if (this.left_upper_leg.quaternion.x < -0.70){
			this.movement = 'kick back left';
		} else {
			T = - Math.PI;
			x = 1;
			y = 0;
			z = 0;
			this.left_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
				Math.sin(T/4) * x, 
        		Math.sin(T/4) * y, 
        		Math.sin(T/4) * z, 
        		Math.cos(T/4) ), 0.1 );
		}
	} else if (this.movement == 'kick back left'){
		T = 0;
		x = 0;
		y = 0;
		z = 0;
		this.left_upper_leg.quaternion.slerp(
			new THREE.Quaternion(
			Math.sin(T/4) * x, 
    		Math.sin(T/4) * y, 
    		Math.sin(T/4) * z, 
    		Math.cos(T/4) ), 0.1 );
		// bonus 2
	} else if (this.movement == 'dance'){
		if (this.left_upper_leg.quaternion.x < -0.70){
			this.movement = 'kick back left';
		} else {
			T = - Math.PI;
			x = 1;
			y = 0;
			z = 0;
			this.left_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
				Math.sin(T/4) * x, 
        		Math.sin(T/4) * y, 
        		Math.sin(T/4) * z, 
        		Math.cos(T/4) ), 0.1 );
		}
		if (this.right_upper_leg.quaternion.x < -0.70){
			this.movement = 'kick back right';
		} else {
			T = - Math.PI;
			x = 1;
			y = 0;
			z = 0;
			this.right_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
				Math.sin(T/4) * x, 
        		Math.sin(T/4) * y, 
        		Math.sin(T/4) * z, 
        		Math.cos(T/4) ), 0.1 );
		}
		if (this.left_upper_arm.x < -0.98){
			this.movement = 'lower left arm';
		} else {
			T = - Math.PI;
			x = 1;
			y = 0;
			z = 0;
			this.left_upper_arm.quaternion.slerp(
			new THREE.Quaternion(
				Math.sin(T/2) * x, 
				Math.sin(T/2) * y,
				Math.sin(T/2) * z,
				Math.cos(T/2) ), 0.1);

		}
			T = - Math.PI;
			x = 1;
			y = 0;
			z = 0;
		this.neck.quaternion.slerp(
			new THREE.Quaternion(
				Math.sin(T/4) * x, 
				Math.sin(T/2) * y,
				Math.sin(T/2) * z,
				Math.cos(T/4) ), 0.1);
		

	} 
};
// placeTo funtion for bonus 1
Robot.prototype.placeTo = function(x, y, z) {
	this.head.position.x = x;
	this.head.position.y = y + 75; // 75 is the total height of the robot
  	this.head.position.z = z;
};