Robot = function(x, y, z) {
  
  //create neck,torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3,5,'blue'); // howmanybones howwide color
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton( bones );
  mesh.add(bones[0]);
  mesh.bind( skeleton );

  this.root = bones[0]; // anchor point
  this.root.position.set( x,y,z );
  this.head = bones[1];
  this.neck = bones[2];
  this.neck.position.y = -10;
  this.torso = bones[3];
  this.torso.position.y = -30;
  this.body_mesh = mesh;

  /*
  // add head
  var appearance = new THREE.BoxBufferGeometry( 10, 10, 10 ); 
  var texture = new THREE.TextureLoader().load( '1.png' );
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  var mesh = new THREE.SkinnedMesh( appearance, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.root.add(bones[0]);
  this.appearance_mesh = mesh;
  */

  // create left arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3,5,'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton( bones );
  mesh.add(bones[0]);
  mesh.bind( skeleton );

  this.neck.add(bones[0]);

  this.left_upperarm = bones[1];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones[2];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = bones[3];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;
  this.leftArm_mesh = mesh;
//-------------------------------------------------------------
//create left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3,5,'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton( bones );
  mesh.add(bones[0]);
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
  this.leftLeg_mesh = mesh;

//==========================================================
//create right arm

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
  this.rightArm_mesh = mesh;
//===================================================================
//create right leg
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
  this.rightLeg_mesh = mesh;

  this.movement = null;

};


Robot.prototype.show = function(scene) {
 /*
  var rGroup = new THREE.Group();
  rGroup.add( this.head );

  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3;

  scene.add(rGroup);
  scene.add(helper);
*/

  scene.add(this.appearance_mesh);
  scene.add( this.body_mesh);
  scene.add(this.leftArm_mesh);
  scene.add(this.leftLeg_mesh);
  scene.add(this.rightArm_mesh);
  scene.add(this.rightLeg_mesh);


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

  } else if (this.movement == 'raise right arm') {
    var T = Math.PI;
    this.right_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                                              0.1 );
  }else if (this.movement == 'lower right arm') {

    this.right_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );
  }else if (this.movement == 'kick') {
  
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

        this.root.position.x += shakehead;

        //this.neck.position.x += shakeneck;

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

      }.bind(this), 400);

    }

  }

};
