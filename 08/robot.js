
Robot = function(x, y, z) {
    
    //create head, neck, torso
   
var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
   
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );
    
    this.root = bones[0]; //invisible anchor point
    this.root.position.set(x, y, z); 
    
    this.head = bones[1];
    this.neck = bones[2];
    this.neck.position.y = -10; 
    this.torso = bones[3];
     this.torso.position.y= -30; 
    
    this.body_mesh = mesh;
    
 
  this.shape = new THREE.Bone();
    var geometry = new THREE.SphereBufferGeometry(10, 10, 10);
   var texture = new THREE.TextureLoader().load('hair1.png');
   // setup material
  var material = new THREE.MeshStandardMaterial( {
    skinning: true, // IMPORTANT!
  side: THREE.DoubleSide,
      map: texture,
      flatShading: true
  } );
    
    var face = new THREE.Mesh(geometry, material);
    
     var mesh = new THREE.SkinnedMesh( geometry, material );
     var skeleton = new THREE.Skeleton( bones );
     mesh.add( this.shape );
     mesh.bind( skeleton );
    
    this.head.add(face);
    this.head.position.y = -10; 
  
    
    
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
   
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );
    
     this.neck.add(bones[0]);
    
    this.neck = bones[0]; //invisible anchor point
    this.root.position.set(x, y, z); 
    
    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;
    
    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.y = -15;
          this.left_lower_arm.position.x = 5;
    
    
    this.left_hand = bones[3];
     this.left_hand.position.y = -5;
          this.left_hand.position.x = 5;
    
    this.left_arm_mesh = mesh;
    
    
    //RIGHT ARM
    
    
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
   
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );
    
     this.neck.add(bones[0]);
    
    this.neck = bones[0]; //invisible anchor point
    this.root.position.set(x, y, z); 
    
    this.right_upper_arm = bones[1];
   this.right_upper_arm.position.y = -5;
          this.right_upper_arm.position.x = -5;
    
    
    this.right_lower_arm = bones[2];
   this.right_lower_arm.position.y = -15;
          this.right_lower_arm.position.x = -5;
    
    
    this.right_hand = bones[3];
     this.right_hand.position.y = -5;
          this.right_hand.position.x = -5;
    
    this.right_arm_mesh = mesh;
    
    
    
         
          //torso
          // this.torso = new THREE.Bone();
        //  this.torso.position.y= -30; 
        //    this.neck.add(this.torso);
          
          
         
          //LEGS
          //LEFT LEG
    
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
   
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );
    
     this.torso.add(bones[0]);
    
    this.torso = bones[0]; //invisible anchor point
    this.root.position.set(x, y, z); 
    
    this.left_upper_leg = bones[1];
   this.left_upper_leg.position.y = -15;
          this.left_upper_leg.position.x = 10;
    
    
    this.left_lower_leg = bones[2];
   this.left_lower_leg.position.y = -15;
          this.left_lower_leg.position.x = 5;
    
    
    this.left_foot = bones[3];
      this.left_foot.position.y = -5;
          this.left_foot.position.x = 5;
    
    this.left_foot_mesh = mesh;
    

          
          //RIGHT LEG
    
    
     var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
   
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );
    
     this.torso.add(bones[0]);
    
    this.torso = bones[0]; //invisible anchor point
    this.root.position.set(x, y, z); 
    
    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.y = -15;
          this.right_upper_leg.position.x = -10;
    
    
    this.right_lower_leg = bones[2];
   this.right_lower_leg.position.y = -15;
          this.right_lower_leg.position.x = -5;
    
    
    this.right_foot = bones[3];
      this.right_foot.position.y = -5;
          this.right_foot.position.x = -5;
    
    this.right_foot_mesh = mesh;
    
    
       
    
};


Robot.prototype.show = function(scene){
    
    
    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_foot_mesh);
    scene.add(this.right_foot_mesh);
    scene.add(this.shape);
   
    //create group and point to the robot head
        /*  this.group = new THREE.Group();
          this.group.add(this.head);
          scene.add(this.group);
        
          
          //use the skeleton helper to visualize the skeleton
          this.helper = new THREE.SkeletonHelper(this.group);
          this.helper.material.linewidth = 3;
          scene.add(this.helper);*/
    
    //no movement by default
    this.movement = '';
};


Robot.prototype.raiseLeftArm = function() {
    
    this.movement = 'raise_left_arm';
    
};
Robot.prototype.kickLeg = function() {
    
    this.movement = 'kick';
    
};
Robot.prototype.kickLeftLeg = function() {
    
    this.movement = 'kickLeft';
    
};

Robot.prototype.lowerLeftArm = function() {
    this.movement = 'lower_left_arm';
};



Robot.prototype.dance = function() {
    
     this.movement = 'dance';
   
};

Robot.prototype.walk = function() {
    
     this.movement = 'walk';
   
};
Robot.prototype.walk2 = function() {
    
     this.movement = 'walk2';
   
};

Robot.prototype.onStep = function() {

objTexture = new THREE.TextureLoader().load( 'obj.png' );
        var geometry = new THREE.BoxGeometry( 100,100,100 );
        var material = new THREE.MeshBasicMaterial( {map: objTexture} );
        var box = new THREE.Mesh( geometry, material );
        box.position.x = 180;
        box.position.z = 50; 
          box.position.y= -40;
    
  this.root.translateZ(10);
  if (this.root.position.z >= 450 || this.root.position.z <= -450) {
     this.root.rotateY(Math.PI);
  } 
  for(var i in robots) {
    r = robots[i];

    if(this.root.position.equals(r.root.position)) { 
      continue;
       }
    if(this.root.position.distanceTo(r.root.position) < 60 ) {
      this.root.rotateY(Math.PI);
    
    }
      
  }
    if(this.root.position.distanceTo(box.position) < 90){
          this.root.rotateY(Math.PI);
      }
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
      
      
      
  } else if (this.movement == 'kickLeft') {  // Code from lecture notes

    // check if slerp reached almost the end
    if (this.left_upper_leg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick Left done';

    } else {

      var T = -Math.PI/2;
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
                                      
    }

  } else if (this.movement == 'kick Left done') {

    // reset leg back to identity
    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  } else if (this.movement == 'kick') {  // Code from lecture notes

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

  } else if (this.movement == 'walk'){
      
       
  
      var T = -Math.PI/4;
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );

      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      
      if (this.left_upper_leg.quaternion.w < 0.93) {

      this.movement = 'walk2';
        
   this.onStep(); 
    }
   
    }
    
  
   else if (this.movement == 'walk2') {
  
    
  
      var T = -Math.PI/4;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );

      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
    
      if (this.right_upper_leg.quaternion.w < 0.93) {

      this.movement = 'walk';
      this.onStep(); 
      
    }
       

      }
    
    
    
    else if(this.movement == 'dance'){  
     

var arr = [];
var robot = this
for (var i = 0; i < 500; i++)
{
  arr.push(Math.floor(Math.random() * 4));
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
           
           case 3:
            robot.kickLeftLeg();
			break;
           
           default:
               robot.kickLeg();
               break;
    }
  }
      
  
}, 60);
  }
};

