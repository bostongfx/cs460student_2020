Robot = function(x, y, z){
    //default constructor
    // ROBOT GOES HERE!
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;


    this.neck = new THREE.Bone();
    this.neck.position.y = -10;
    this.head.add(this.neck);
    //left arm
    this.left_upper_arm = new THREE.Bone();
    setLeftBody(this.left_upper_arm);
    this.neck.add( this.left_upper_arm );

    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.x = 5;
    this.left_lower_arm.position.y = -15;
    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone();
    setLeftBody(this.left_hand);
    this.left_lower_arm.add(this.left_hand);

    // right arm
    this.right_upper_arm = new THREE.Bone();
    setRightBody(this.right_upper_arm);
    this.neck.add( this.right_upper_arm );

    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -5;
    this.right_lower_arm.position.y = -15;
    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone();
    setRightBody(this.right_hand);
    this.right_lower_arm.add(this.right_hand);

    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    this.joint = new THREE.Bone();
    //this.joint.position.y = -30;
    this.torso.add(this.joint);

    // left leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 10;
    this.left_upper_leg.position.y = -15;
    this.joint.add(this.left_upper_leg);

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
    this.right_upper_leg.position.x = -10;
    this.right_upper_leg.position.y = -15;
    this.joint.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.x = -5;
    this.right_lower_leg.position.y = -15;
    this.right_upper_leg.add(this.right_lower_leg);


    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -5;
    this.right_lower_leg.add(this.right_foot);

}

Robot.prototype.show = function(scene){
     // create group
    this.group = new THREE.Group();
    this.group.add(this.head);
    scene.add(this.group);
    //visualize
    this.helper = new THREE.SkeletonHelper( this.group );
    this.helper.material.linewidth = 10;
    //console.log(helper.material.linewidth);
    scene.add(this.helper);

     // no movement by default
     this.movement = '';
     
}

Robot.prototype.raiseLeftArm = function() {

    this.movement = 'raise_left_arm';

};

Robot.prototype.lowerLeftArm = function() {
    this.movement = 'lower_left_arm';
};

Robot.prototype.kick = function() {
    this.movement = 'kick';
};

Robot.prototype.unkick = function() {
    this.movement = 'restore_kick';
};

//bonus 2
Robot.prototype.dance = function() {
    //dance = false;
    this.movement = 'dance';
    
};

Robot.prototype.onAnimate = function(){

    if ( this.movement == 'raise_left_arm' ) {
        T = Math.PI 
        x = 1;
        y = 0;
        z = 0;

        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2) * x,
            Math.sin(T/2) * y,
            Math.sin(T/2) * z,
            Math.cos(T/2),
            ), 0.01 );

    }else if(this.movement == 'lower_left_arm'){
        //restore the position of left_arm
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            0,0,0,1), 0.01 );

    }else if(this.movement == 'kick'){
        T = Math.PI;
        x = 1;
        y = 1;
        z = 0;

        this.joint.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2) * x,
            Math.sin(T/2) * y,
            Math.sin(T/2) * z,
            Math.cos(T/2),
            ), 0.01 );
            console.log(r.quaternion.w);
    }else if(this.movement == 'restore_kick'){
            this.joint.quaternion.slerp( new THREE.Quaternion(
            0,0,0,1), 0.01 );
    } else if(this.movement == 'dance'){      
                T = Math.PI;
                //T2 = 2*Math.PI;
                x = 1;
                y = 0;
                z = 0;
                this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                    Math.sin(T/2) * x,
                    Math.sin(T/2) * y,
                    Math.sin(T/2) * z,
                    Math.cos(T/2),
                    ), 0.01 );
                this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(
                    Math.sin(T/2) * x,
                    Math.sin(T/2) * y,
                    Math.sin(T/2) * z,
                    Math.cos(T/2),
                    ), 0.01 );
                this.joint.quaternion.slerp( new THREE.Quaternion(
                    Math.sin(T/2) * x,
                    Math.sin(T/2) * y,
                    Math.sin(T/2) * z,
                    Math.cos(T/2),
                    ), 0.01 );
                   
                //console.log( this.right_upper_arm.quaternion.w); 
                if(this.right_upper_arm.quaternion.w < 0.32){
                    this.movement = 'finish_dance';
                }

    } else if(this.movement == 'finish_dance'){
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.01 );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1),0.01);
        this.joint.quaternion.slerp( new THREE.Quaternion(0,0,0,1),0.01);
        //console.log( this.right_upper_arm.quaternion.w); 
        if(this.right_upper_arm.quaternion.w > 0.97){
            this.movement = 'dance';
        }
    }
    
}

function setLeftBody(Body){
    Body.position.x = 5;
    Body.position.y = -5;
  }

function setRightBody(Body){
    Body.position.x = -5;
    Body.position.y = -5;
}