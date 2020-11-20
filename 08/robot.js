
// Simplifies creating bones
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

  
  // Create Mesh and Bones for body
  this.select = 0;
  this.check = false;
  this.danceCheck = 1;
  color = '#' + (Math.floor((Math.random() * 16777215))).toString(16);
  
  if(color.length < 7) {
    var new_color = color;
    for(var i = 0; i < 7 - color.length; i++){
        new_color = new_color + '0';
    }
    color = new_color;
  }
  
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color);
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[ 0 ]);
  mesh.bind( skeleton );

  this.root = bones[0]; // Anchor Point 
  this.root.position.set(x, y ,z);

  // Head
  this.head = bones[1];

  // Neck
  this.neck = bones[2];
  this.neck.position.y = -10;

  // Torso
  this.torso = bones[3];
  this.torso.position.y = -30;

  this.body_mesh = mesh;


  /* Left Arm: Upper and Lower Arms, Left Hand  */ 

  // Create Mesh and Bones for left arm
  fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color);
  geometry = fromhelper[0];
  material = fromhelper[1];
  bones = fromhelper[2];

  mesh = new THREE.SkinnedMesh(geometry, material);
  skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[ 0 ]);
  mesh.bind( skeleton );

  this.neck.add(bones[0]);
  
  // Left Upper Arm
  this.left_upper_arm = bones[1];
  this.left_upper_arm.position.set(5, -5, 0);
  
  // Left Lower Arm
  this.left_lower_arm = bones[2];
  this.left_lower_arm.position.set(5, -15, 0);

  // Left Hand
  this.left_hand = bones[3];
  this.left_hand.position.set(5, -5, 0);

  this.leftarm_mesh = mesh;

  /* Right Arm: Upper and Lower arms, Right Hand */
  
  // Create Mesh and Bones for right arm
  fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color);
  geometry = fromhelper[0];
  material = fromhelper[1];
  bones = fromhelper[2];

  mesh = new THREE.SkinnedMesh(geometry, material);
  skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[ 0 ]);
  mesh.bind( skeleton );

  this.neck.add(bones[0]);
  
  // Right Upper Arm
  this.right_upper_arm = bones[1];
  this.right_upper_arm.position.set(-5, -5, 0);
  
  // Right Lower Arm
  this.right_lower_arm = bones[2];
  this.right_lower_arm.position.set(-5, -15, 0);

  // Right Hand
  this.right_hand = bones[3];
  this.right_hand.position.set(-5, -5, 0);

  this.rightarm_mesh = mesh;

 

  /* Left Leg: Upper and Lower Leg, Left Foot */

  // Create Mesh and Bones for Left Leg
  fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color);
  geometry = fromhelper[0];
  material = fromhelper[1];
  bones = fromhelper[2];

  mesh = new THREE.SkinnedMesh(geometry, material);
  skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[ 0 ]);
  mesh.bind( skeleton );

  this.torso.add(bones[0]);
  
  // Left Upper Leg
  this.left_upper_leg = bones[1];
  this.left_upper_leg.position.set(10, -15, 0);
  
  // Left Lower Leg
  this.left_lower_leg = bones[2];
  this.left_lower_leg.position.set(5, -15, 0);

  // Left Foot
  this.left_foot = bones[3];
  this.left_foot.position.set(5, -5, 0);

  this.leftleg_mesh = mesh;


  /* Right Leg: Upper and Lower Leg, Right Foot */
  // Create Mesh and Bones for Left Leg
  fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color);
  geometry = fromhelper[0];
  material = fromhelper[1];
  bones = fromhelper[2];

  mesh = new THREE.SkinnedMesh(geometry, material);
  skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[ 0 ]);
  mesh.bind( skeleton );

  this.torso.add(bones[0]);
  
  // Right Upper Leg
  this.right_upper_leg = bones[1];
  this.right_upper_leg.position.set(-10, -15, 0);
  
  // Right Lower Arm
  this.right_lower_leg = bones[2];
  this.right_lower_leg.position.set(-5, -15, 0);

  // Right Foot
  this.right_foot = bones[3];
  this.right_foot.position.set(-5, -5, 0);

  this.rightleg_mesh = mesh;

};

Robot.prototype.show = function(scene) {
  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
 
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

Robot.prototype.walk = function() {
  this.movement = 'walk';
}
Robot.prototype.onStep = function() {
  this.root.translateZ(15);
  if (this.root.position.z >= 500 || this.root.position.z <= -500) {
     this.root.rotateY(Math.PI);
  }
  for(var index in r) {
    robots = r[index];
    
    if(this.root.position.equals(robots.root.position)) { continue; }
    if(this.root.position.distanceTo(robots.root.position) < 40) {
      this.root.rotateY(Math.PI);
      this.root.translateZ(15);
    }
  }
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
                                                                   
  } else if (this.movement == 'walk') {
    x = 1;
    y = 0;
    z = 0;
    T = -Math.PI/4
    this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(T)*x,
                                                               y, 
                                                               z, 
                                                               Math.cos(T)), 
                                                               0.1);
    this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(-Math.sin(T),
                                                                y,
                                                                z,
                                                                Math.cos(T)), 0.1);

    if (this.left_upper_leg.quaternion.w < .9) {
      this.movement = 'walk2';
      this.onStep();
    }
    
  
} else if (this.movement == 'walk2') {
  x = 1;
  y = 0;
  z = 0;
  T = -Math.PI/4
  this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(T),
                                                               0, 
                                                               0, 
                                                               Math.cos(T)), 
                                                               0.1);
  this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(-Math.sin(T),
                                                               y,
                                                               z,
                                                               Math.cos(T)), 0.1);

if (this.right_upper_leg.quaternion.w < .9) {
  this.movement = 'walk';
  this.onStep();
}


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
     
      
      if(this.left_upper_leg.quaternion.w < .3) {
          this.movement = 'dancing';
      }
      T = -Math.PI;
      if (this.check == false) {
          this.select = Math.floor((Math.random() * 3) + 1);
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
      
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2)*x*this.danceCheck, 
                                                                  Math.sin(T/2)*y, 
                                                                  Math.sin(T/2)*z, 
                                                                  Math.cos(T/2)), 
                                                                  0.1);
      
  // Continues the dance animation
    } else if (this.movement == 'dancing') {
      if(this.left_upper_leg.quaternion.w > .9) {
          this.check = false;
          this.movement = 'dance';
          this.danceCheck = this.danceCheck * -1;
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
