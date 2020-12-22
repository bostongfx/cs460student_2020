Robot = function Robot(x, y, z) {
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;

	this.neck = new THREE.Bone();
	this.neck.position.y = -10;
	this.head.add(this.neck);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;
	this.neck.add(this.torso);

	// left arm
	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.x = 5;
	this.left_upper_arm.position.y = -5;
	this.neck.add(this.left_upper_arm);

	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.x = 5;
	this.left_lower_arm.position.y = -15;
	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.x = 5;
	this.left_hand.position.y = -5;
	this.left_lower_arm.add(this.left_hand);

	// right arm
	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.x = -5;
	this.right_upper_arm.position.y = -5;
	this.neck.add(this.right_upper_arm);

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.x = -5;
	this.right_lower_arm.position.y = -15;
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.x = -5;
	this.right_hand.position.y = -5;
	this.right_lower_arm.add(this.right_hand);

	// left leg
	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.x = 10;
	this.left_upper_leg.position.y = -15;
	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.x = 5;
	this.left_lower_leg.position.y = -15;
	this.left_upper_leg.add(this.left_lower_leg);

	this.left_foot = new THREE.Bone();
	this.left_foot.position.x = 5;
	this.left_foot.position.y = -5;
	this.left_lower_leg.add(this.left_foot);

	// right leg
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

Robot.prototype.show = function() {
	this.group = new THREE.Group();
	this.group.add(this.head);

	this.helper = new THREE.SkeletonHelper(this.group);
	// see https://stackoverflow.com/questions/11638883/thickness-of-lines-using-three-linebasicmaterial
	this.helper.material.linewidth = 5;

	scene.add(this.group);
	scene.add(this.helper);

	this.movement = '';
	this.dancing = false;
}

var movements = ['left_raise_arm', 'left_lower_arm', 'right_raise_arm', 'right_lower_arm', 'left_kick', 'right_kick'];
var T = Math.PI;
var arm = new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2));
var leg = new THREE.Quaternion(-Math.sin(T/2), 0, 0, Math.cos(T/2));
var reset = new THREE.Quaternion(0, 0, 0, 1);

Robot.prototype.raiseLeftArm  = function() { this.movement = 'left_raise_arm' }
Robot.prototype.lowerLeftArm  = function() { this.movement = 'left_lower_arm' }
Robot.prototype.raiseRightArm = function() { this.movement = 'right_raise_arm' }
Robot.prototype.lowerRightArm = function() { this.movement = 'right_lower_arm' }
Robot.prototype.leftKick      = function() { this.movement = 'left_kick' }
Robot.prototype.rightKick     = function() { this.movement = 'right_kick' }
Robot.prototype.dance         = function() {
	// credits to Lori Franke (@lorifranke) for 'this' trick
	var that = this;
	var discoball = document.getElementById('discoball');
	if (that.dancing) {
		that.dancing = false;
		discoball.style.visibility = 'hidden';
		clearInterval(d);
	} else {
		that.dancing = true;
		discoball.style.visibility = 'visible';
		d = setInterval(function() {
			that.movement = movements[Math.floor(Math.random() * movements.length)];
		}, 200);
	}
}

Robot.prototype.onAnimate = function() {
	switch(this.movement) {
		case 'left_raise_arm':
			this.left_upper_arm.quaternion.slerp(arm, 0.1);
			break;

		case 'left_lower_arm':
			this.left_upper_arm.quaternion.slerp(reset, 0.1);
			break;

		case 'right_raise_arm':
			this.right_upper_arm.quaternion.slerp(arm, 0.1);
			break;

		case 'right_lower_arm':
			this.right_upper_arm.quaternion.slerp(reset, 0.1);
			break;

		case 'left_kick':
			if (this.left_upper_leg.quaternion.w < 0.5) {
				this.movement = 'left_kicked';
			} else {
				this.left_upper_leg.quaternion.slerp(leg, 0.075);
			}
			break;

		case 'left_kicked':
			this.left_upper_leg.quaternion.slerp(reset, 0.075);
			break;

		case 'right_kick':
			if (this.right_upper_leg.quaternion.w < 0.5) {
				this.movement = 'right_kicked';
			} else {
				this.right_upper_leg.quaternion.slerp(leg, 0.075);
			}
			break;

		case 'right_kicked':
			this.right_upper_leg.quaternion.slerp(reset, 0.075);
			break;
	}
}