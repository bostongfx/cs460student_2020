//-----------Part-1 and Part-2-------------
Robot = function(x, y, z) {
    
    
  // ROBOT GOES HERE!
    //-----------Part-3 and Part-4---------------
        this.head = new THREE.Bone();
    this.head.position.set(x, y, z); //-------Part-9------
         
          
          this.neck = new THREE.Bone();
          this.neck.position.y = -10; //-------Part-9------
            //----------Part-5-------------
           this.head.add(this.neck);
          
          
        //--------------Part-6--------------
    //LEFT ARM
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
          
          //RIGHT ARM
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
          
          //torso
           this.torso = new THREE.Bone();
          this.torso.position.y= -30; //-------Part-9------
            //-------------Part-5---------------
            this.neck.add(this.torso);
          
          
          //-----------PART-7-------------
          //LEGS
          //LEFT LEG
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
          
          //RIGHT LEG
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

//----------------Part-8-------------------
Robot.prototype.show = function(scene){
    
    //create group and point to the robot head
          this.group = new THREE.Group();
          this.group.add(this.head);
          scene.add(this.group);
        
          
          //use the skeleton helper to visualize the skeleton
          this.helper = new THREE.SkeletonHelper(this.group);
          this.helper.material.linewidth = 3;
          scene.add(this.helper);
    
    //no movement by default
    this.movement = '';
};

//-----------------Part-11------------------
Robot.prototype.raiseLeftArm = function() {
    
    this.movement = 'raise_left_arm';
    
};
Robot.prototype.kickLeg = function() {
    
    this.movement = 'kick';
    
};

Robot.prototype.lowerLeftArm = function() {
    this.movement = 'lower_left_arm';
};



Robot.prototype.dance = function() {
    
     this.movement = 'dance';
   
};



Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise_left_arm') {

   T = Math.PI //180 degrees
          x = 1
          y = 0
          z = 0
          
          this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(
          Math.sin(T/2)*x,
          Math.sin(T/2)*y,
          Math.sin(T/2)*z,
          Math.cos(T/2)), 0.01);
      

  } else if (this.movement == 'lower_left_arm'){
     T = Math.PI // 180 degrees
        var x = 0
        var y = 0
        var z = 0
        
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.08);
      
      
      
  }  else if (this.movement == 'kick') {  // Code from lecture notes

    // check if slerp reached almost the end
    if (this.right_upper_leg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI/2;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
                                      
    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  } else if(this.movement == 'dance'){  //---------Bonus-Part-2------------
     

var arr = [];
var robot = this
for (var i = 0; i < 500; i++)
{
  arr.push(Math.floor(Math.random() * 3));
     console.log('arr', arr);
}
setInterval(function() {
for (var i = 0; i < arr.length; i++){
   var arrNum = arr[i];
   switch (arrNum) {
      case 0:
			
            robot.raiseLeftArm();
			break;
           case 1: 
			
            robot.lowerLeftArm();
			break;
     
           case 2:
            robot.kickLeg();
			break;
           default:
               robot.kickLeg();
               break;
    }
  }
      
  
}, 60);
  }
};

