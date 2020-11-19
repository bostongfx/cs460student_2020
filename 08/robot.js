Robot = function(x, y, z) {
 
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'white')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;

  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;

  /*this.head = new THREE.Bone();
  this.head.position.set( x, y, z );

  this.neck = new THREE.Bone();
  this.neck.position.y = -10;

  this.head.add(this.neck);

  this.torso = new THREE.Bone();
  this.torso.position.y = -30;

  this.neck.add(this.torso);*/

  // create a textured spherical head for bonus.
  this.face = new THREE.Bone();
  var geometry = new THREE.SphereBufferGeometry( 10, 10, 10 );
  var texture = new THREE.TextureLoader().load( 'bean.png' );
  var material = new THREE.MeshStandardMaterial( {
    skinning: true, // IMPORTANT!
    side: THREE.DoubleSide,
    flatShading: true,
    map: texture
  } );

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( this.face );
  mesh.bind( skeleton );

  this.root.add(this.face);
  this.face = mesh;

  // create left upper arm, lower arm, and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  //this.neck.add(this.left_upperarm);
  this.neck.add(bones[0]);

  this.left_upper_arm = bones[ 1 ];
  this.left_upper_arm.position.y = -5;
  this.left_upper_arm.position.x = 5;

  this.left_lower_arm = bones[ 2 ];
  this.left_lower_arm.position.y = -15;
  this.left_lower_arm.position.x = 5;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;  


  this.leftarm_mesh = mesh;

  /*this.left_upperarm = new THREE.Bone();
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = new THREE.Bone();
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = new THREE.Bone();
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;

  this.neck.add(this.left_upperarm);
  this.left_upperarm.add(this.left_lowerarm)
  this.left_lowerarm.add(this.left_hand); */

  // create right upper arm, lower arm, and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  //this.neck.add(this.right_upperarm);
  this.neck.add(bones[0]);

  this.right_upper_arm = bones[ 1 ];
  this.right_upper_arm.position.y = -5;
  this.right_upper_arm.position.x = -5;

  this.right_lower_arm = bones[ 2 ];
  this.right_lower_arm.position.y = -15;
  this.right_lower_arm.position.x = -5;

  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;  


  this.rightarm_mesh = mesh;

  /*this.right_upperarm = new THREE.Bone();
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = new THREE.Bone();
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = new THREE.Bone();
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  this.neck.add(this.right_upperarm);
  this.right_upperarm.add(this.right_lowerarm)
  this.right_lowerarm.add(this.right_hand);*/

  // create left upper leg, lower leg, and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  //this.neck.add(this.left_upperleg);
  this.torso.add(bones[0]);

  this.left_upperleg = bones[ 1 ];
  this.left_upperleg.position.y = -5;
  this.left_upperleg.position.x = 5;

  this.left_lowerleg = bones[ 2 ];
  this.left_lowerleg.position.y = -15;
  this.left_lowerleg.position.x = 5;

  this.left_foot = bones[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;  


  this.leftleg_mesh = mesh;

  /*this.left_upperleg = new THREE.Bone();
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = new THREE.Bone();
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = new THREE.Bone();
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;

  this.torso.add(this.left_upperleg);
  this.left_upperleg.add(this.left_lowerleg)
  this.left_lowerleg.add(this.left_foot);*/

  // create right upper leg, lower leg, and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

 // this.neck.add(this.right_upperleg);
  this.torso.add(bones[0]);

  this.right_upper_leg = bones[ 1 ];
  this.right_upper_leg.position.y = -5;
  this.right_upper_leg.position.x = -5;

  this.right_lowerleg = bones[ 2 ];
  this.right_lowerleg.position.y = -15;
  this.right_lowerleg.position.x = -5;

  this.right_foot = bones[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;  


  this.rightleg_mesh = mesh;

  /*this.right_upperleg = new THREE.Bone();
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = new THREE.Bone();
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = new THREE.Bone();
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.torso.add(this.right_upperleg);
  this.right_upperleg.add(this.right_lowerleg)
  this.right_lowerleg.add(this.right_foot);*/


  //this.movement = null;

};

Robot.prototype.show = function(scene) {

  /*var rGroup = new THREE.Group();
  rGroup.add( this.head );

  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3;

  scene.add(rGroup);
  scene.add(helper);*/

  scene.add( this.body_mesh );
  scene.add( this.leftarm_mesh );
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
  scene.add(this.face);

};

Robot.prototype.raise_left_arm = function() {
  this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
  this.movement = 'lower left arm';
};

Robot.prototype.raise_right_arm = function() {
  this.movement = 'raise right arm';
};

Robot.prototype.lower_right_arm = function() {
  this.movement = 'lower right arm';
};

Robot.prototype.kick = function() {
  this.movement = 'kick';
};

Robot.prototype.dance = function() {
  this.movement = 'dance';
};

Robot.prototype.walk = function() {
  this.movement = 'walk';
};

Robot.prototype.onStep = function() {

  if (this.root.position.z > 500 || this.root.position.z < -500) {
    this.root.rotateY(Math.PI / 2);
  } else if ( this.root.position.x > 500 || this.root.position.x < -500) {
    this.root.rotateY(Math.PI / 2);
  }
  // if robot hits bounding box of geometry
  if (this.root.position.x > -250 && this.root.position.x < -150 && this.root.position.z > 150 && this.root.position.z < 250) {
    this.root.rotateY(Math.PI / 2);
  }
  for (var i in robots) {
    i = robots[i];
    if (i.root.position.equals(this.root.position)) {
      continue;
    }
    if (i.root.position.distanceTo(this.root.position) < 25) {
      this.root.rotateY(Math.PI / 2);
    }
  }
  this.root.translateZ(10);
};  

Robot.prototype.onAnimate = function() {

  if ( this.movement == 'raise left arm' ) {

    T = -Math.PI 
    x = 1 
    y = 0
    z = 0

    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

  } else if (this.movement == 'lower left arm') {
    T = 0; 
    x = 0;
    y = 0;
    z = 0;

    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

  } else if ( this.movement == 'raise right arm' ) {

    T = -Math.PI 
    x = 1 
    y = 0
    z = 0

    this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

  } else if (this.movement == 'lower right arm') {
    T = 0; 
    x = 0;
    y = 0;
    z = 0;

    this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

  } else if ( this.movement == 'kick' ) {

    // DO SOMETHING
    if (this.right_upper_leg.quaternion.w < 0.72) {
 
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
 
    } else {
 
      T = -Math.PI // 180 degrees
      x = 1 
      y = 0
      z = 0

    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );
                                      
    } 
  } else if (this.movement == 'kick done') {
 
    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  } else if (this.movement == 'dance') {
    this.dancer = setInterval(function() {

        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.raise_right_arm();
        }

        if (Math.random() < .3) {
          this.lower_right_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

  } else if (this.movement == 'walk') {

        if( this.right_upper_leg.quaternion.w < 0.93) {
          this.movement = 'walk2';
        }
    
        this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
        var T = -Math.PI/4;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 0, 0, Math.cos( T / 2 ) ), 0.05 );
    
        this.onStep();
    
      } else if (this.movement == 'walk2'){
    
        if( this.left_upperleg.quaternion.w < 0.93) {
          this.movement = 'walk';
        }
    
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
        var T = -Math.PI/4;
        this.left_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 0, 0, Math.cos( T / 2 ) ), 0.05 );
    
        this.onStep();
      }

};