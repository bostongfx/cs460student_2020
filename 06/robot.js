
Robot = function(x, y, z) {
    this.head = new THREE.Bone();
    this.head.position.x = x; // world coordinates
    this.head.position.y = y;
    this.head.position.z = z;
    this.neck = new THREE.Bone();
    this.neck.position.y = -10;
    this.head.add(this.neck);
    // LEFT ARM
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
    // RIGHT ARM
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
    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);
    // LEFT LEG
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
    // RIGHT LEG
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
};
Robot.prototype.show = function(scene) {
    // create group and point to the robot head
    this.group = new THREE.Group();
    this.group.add(this.head);
    scene.add(this.group);
    // use the skeleton helper to visualize the skeleton
    this.helper = new THREE.SkeletonHelper(this.group);
    this.helper.material.linewidth = 5;
    scene.add(this.helper);
    // no movement by default
    this.movement = '';
};
Robot.prototype.raiseLeftArm = function() {
    this.movement = 'raise_left_arm';
};
Robot.prototype.lowerLeftArm = function() {
    this.movement = 'lower_left_arm';
};

Robot.prototype.kick = function() {
    this.movement = 'kick';
};
Robot.prototype.onAnimate = function() {
    if (this.movement == 'raise_left_arm') {
        T = Math.PI; // 180 degrees
        x = 1;
        y = 0;
        z = 0;
        this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
            Math.sin(T / 2) * x,
            Math.sin(T / 2) * y,
            Math.sin(T / 2) * z,
            Math.cos(T / 2)), 0.05);
    }else if (this.movement == 'lower_left_arm') {
        T = 0;
        x = 0;
        y = 0;
        z = 0;

        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.05 );
    }
    else if (this.movement == 'kick') {

        if (this.left_upper_leg.quaternion.w < 0.7) {
            this.movement = 'kick2';
        }else{
            T = Math.PI; // 180 degrees
            x = 1;
            y = 0;
            z = 0;
            this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(
                Math.sin(T / 2) * x,
                Math.sin(T / 2) * y,
                Math.sin(T / 2) * z,
                Math.cos(T / 2)), 0.05);
        }




        }else if(this.movement == 'kick2') {

        T = 0;
        x = 0;
        y = 0;
        z = 0;

        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.05 );

            }
};

