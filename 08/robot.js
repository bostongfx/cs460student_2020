Robot = function(x, y, z) {

  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  // bonus1: inspired by @lorifranke's code at: https://github.com/lorifranke/cs460student/blob/master/07/robot.js
  var geo = new THREE.SphereGeometry( 15, 64,  64);
  var texture = new THREE.TextureLoader().load( "face.png" );
  texture.offset.x = 0.25;
  var mat = new THREE.MeshPhongMaterial( {map: texture} );
  mat.shininess = 5;
  var sphere = new THREE.Mesh( geo, mat );


  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.head.add( sphere );
  this.head.position.y = 10;

  this.neck = bones[ 2 ];
  this.neck.position.y = -10;

  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;

  
  this.head = mesh;
  // this.neck = mesh;


  // this.head = new THREE.Bone();
  // this.head.position.set( x, y, z );

  // this.neck = new THREE.Bone();
  // this.neck.position.y = -10;

  // this.head.add(this.neck);

  // this.torso = new THREE.Bone();
  // this.torso.position.y = -30;

  // this.neck.add(this.torso);
  //-----------------------------------------------------------------

  // create left upper arm, lower arm, and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  // this.root = bones[ 0 ]; // invisible anchor point
  // this.root.position.set( x, y, z );

  // this.neck.add(this.left_upperarm);
  this.neck.add(bones[0]);
  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;  


  this.leftarm_mesh = mesh;


  // this.left_upperarm = new THREE.Bone();
  // this.left_upperarm.position.y = -5;
  // this.left_upperarm.position.x = 5;

  // this.left_lowerarm = new THREE.Bone();
  // this.left_lowerarm.position.y = -15;
  // this.left_lowerarm.position.x = 5;

  // this.left_hand = new THREE.Bone();
  // this.left_hand.position.x = 5;
  // this.left_hand.position.y = -5;

  // this.neck.add(this.left_upperarm);
  // this.left_upperarm.add(this.left_lowerarm)
  // this.left_lowerarm.add(this.left_hand);

  //-----------------------------------------------------------------

  // create left upper leg, lower leg, and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add(bones[0]);
  this.left_upperleg = bones[1];
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = bones[2];
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = bones[3];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.leftleg_mesh = mesh;


  // this.left_upperleg = new THREE.Bone();
  // this.left_upperleg.position.x = 5;
  // this.left_upperleg.position.y = -5;

  // this.left_lowerleg = new THREE.Bone();
  // this.left_lowerleg.position.x = 5;
  // this.left_lowerleg.position.y = -15;

  // this.left_foot = new THREE.Bone();
  // this.left_foot.position.x = 5;
  // this.left_foot.position.y = -5;

  // this.torso.add(this.left_upperleg);
  // this.left_upperleg.add(this.left_lowerleg)
  // this.left_lowerleg.add(this.left_foot);

  //-----------------------------------------------------------------
  // create right upper arm, lower arm, and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3,5,'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton( bones );
  mesh.add(bones[0]);
  mesh.bind( skeleton );

  this.neck.add(bones[0]);
  this.right_upperarm = bones[1];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones[2];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = bones[3];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  this.neck.add(this.right_upperarm);
  this.right_upperarm.add(this.right_lowerarm)
  this.right_lowerarm.add(this.right_hand);
  this.rightarm_mesh = mesh;


  // this.right_upperarm = new THREE.Bone();
  // this.right_upperarm.position.y = -5;
  // this.right_upperarm.position.x = -5;

  // this.right_lowerarm = new THREE.Bone();
  // this.right_lowerarm.position.y = -15;
  // this.right_lowerarm.position.x = -5;

  // this.right_hand = new THREE.Bone();
  // this.right_hand.position.x = -5;
  // this.right_hand.position.y = -5;

  // this.neck.add(this.right_upperarm);
  // this.right_upperarm.add(this.right_lowerarm)
  // this.right_lowerarm.add(this.right_hand);

  //-----------------------------------------------------------------
  // create right upper leg, lower leg, and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3,5,'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton( bones );
  mesh.add(bones[0]);
  mesh.bind( skeleton );

  this.torso.add(bones[0]);
  this.right_upperleg = bones[1];
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[2];
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[3];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.torso.add(this.right_upperleg);
  this.right_upperleg.add(this.right_lowerleg)
  this.right_lowerleg.add(this.right_foot);
  this.rightleg_mesh = mesh;


  // this.right_upperleg = new THREE.Bone();
  // this.right_upperleg.position.x = -5;
  // this.right_upperleg.position.y = -5;

  // this.right_lowerleg = new THREE.Bone();
  // this.right_lowerleg.position.x = -5;
  // this.right_lowerleg.position.y = -15;

  // this.right_foot = new THREE.Bone();
  // this.right_foot.position.x = -5;
  // this.right_foot.position.y = -5;

  // this.torso.add(this.right_upperleg);
  // this.right_upperleg.add(this.right_lowerleg)
  // this.right_lowerleg.add(this.right_foot);

  //-----------------------------------------------------------------


  this.movement = null;

};


Robot.prototype.show = function(scene) {

  scene.add( this.body_mesh );
  scene.add( this.leftarm_mesh );

  scene.add( this.leftleg_mesh );
  scene.add( this.rightarm_mesh );
  scene.add( this.rightleg_mesh );


  // var rGroup = new THREE.Group();
  // rGroup.add( this.head );

  // var helper = new THREE.SkeletonHelper( rGroup );
  // helper.material.linewidth = 3;

  // scene.add(rGroup);
  // scene.add(helper);

};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

// Robot.prototype.raise_right_arm = function() {

//   this.movement = 'raise right arm';

// };

// Robot.prototype.lower_right_arm = function() {

//   this.movement = 'lower right arm';

// };

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.dance = function() {
  
  this.movement = 'dance';

};

//hw8
Robot.prototype.walk = function() {
  
  this.movement = 'walk';

};

// hw8
Robot.prototype.onStep = function() {
    
    this.root.translateZ(10);
    if(this.root.position.z > 500 || this.root.position.z < -500){
        this.root.rotateY(Math.PI);
    }

    for(var i in robots){
        if(!this.root.position.equals(robots[i].root.position)){
            if(this.root.position.distanceTo(robots[i].root.position) < 30){
                this.root.rotateY(Math.PI);
            }
        }
    }
};


Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else  if (this.movement == 'walk') {

    var T = -Math.PI/4;

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z

    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),0.1 );

    if(this.left_upperleg.quaternion.w < .93){
        this.movement = 'walk2';
        this.onStep();
    }
    
} else  if (this.movement == 'walk2') {

    var T = -Math.PI/4;

    this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );

    this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),0.1 );

    if(this.right_upperleg.quaternion.w < .93){
        this.movement = 'walk';
        this.onStep();
    }
   
} else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        // 
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.head.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};