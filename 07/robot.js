Robot = function(x, y, z) {

  // head, neck, torso
  [geometry, material, bones] = HELPER.cylinderSkeletonMesh(3,4,'#2F4F4F')
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[0];
  this.root.position.set( x,y,z );
  this.head = bones[1];
  this.neck = bones[2];
  this.neck.position.y = -10;
  this.torso = bones[3];
  this.torso.position.y = -30;
  this.body_mesh = mesh;


//face
  this.face = new THREE.Bone();
  var face_material = new THREE.MeshStandardMaterial( {
    skinning: true, // IMPORTANT!
    side: THREE.DoubleSide,
    flatShading: true,
    map: new THREE.TextureLoader().load( 'face.png' )
  } );

  this.face_mesh = new THREE.SkinnedMesh( new THREE.SphereBufferGeometry(  20, 80, 100 ), face_material );
  var skeleton = new THREE.Skeleton( bones );
  this.face_mesh.add( this.face );
  this.face_mesh.bind( skeleton );

  this.root.add(this.face);

  //arms
  //left
  [geometry_arms, material_arms, bones_arms] = HELPER.cylinderSkeletonMesh(3,4,'#00BFFF')

  this.leftarm_mesh = new THREE.SkinnedMesh( geometry_arms, material_arms );
  this.leftarm_mesh.add( bones_arms[0] );
  this.leftarm_mesh.bind( new THREE.Skeleton( bones_arms ));

  this.neck.add(bones_arms[0]);

  this.left_upperarm = bones_arms[ 1 ];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones_arms[ 2 ];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = bones_arms[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;

  //right

  [geometry_arms, material_arms, bones_arms] = HELPER.cylinderSkeletonMesh(3,4,'FF1493')

  this.rightarm_mesh = new THREE.SkinnedMesh( geometry_arms, material_arms );
  this.rightarm_mesh.add( bones_arms[0] );
  this.rightarm_mesh.bind( new THREE.Skeleton( bones_arms ));

  this.neck.add(bones_arms[0]);

  this.right_upperarm = bones_arms[ 1 ];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones_arms[ 2 ];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = bones_arms[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  //legs
  //right
  [geometry_legs, material_legs, bones_legs] = HELPER.cylinderSkeletonMesh(3,6,'grey')

  this.rightleg_mesh = new THREE.SkinnedMesh( geometry_legs, material_legs );
  this.rightleg_mesh.add( bones_legs[0] );
  this.rightleg_mesh.bind( new THREE.Skeleton( bones_legs ));

  this.torso.add(bones_legs[0]);

  this.right_upperleg = bones_legs[ 1 ];
  this.right_upperleg.position.y = -5;
  this.right_upperleg.position.x = -5;

  this.right_lowerleg = bones_legs[ 2 ];
  this.right_lowerleg.position.y = -15;
  this.right_lowerleg.position.x = -5;

  this.right_foot = bones_legs[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;


  //left
  [geometry_legs, material_legs, bones_legs] = HELPER.cylinderSkeletonMesh(3,6,'grey')

  this.leftleg_mesh = new THREE.SkinnedMesh( geometry_legs, material_legs );
  this.leftleg_mesh.add( bones_legs[0] );
  this.leftleg_mesh.bind( new THREE.Skeleton( bones_legs ));

  this.torso.add(bones_legs[0]);

  this.left_upperleg = bones_legs[ 1 ];
  this.left_upperleg.position.y = -5;
  this.left_upperleg.position.x = 5;

  this.left_lowerleg = bones_legs[ 2 ];
  this.left_lowerleg.position.y = -15;
  this.left_lowerleg.position.x = 5;

  this.left_foot = bones_legs[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;





};


Robot.prototype.show = function(scene) {

  // var rGroup = new THREE.Group();
  // rGroup.add( this.head );
  //
  // var helper = new THREE.SkeletonHelper( rGroup );
  // helper.material.linewidth = 3;
  //
  // scene.add(rGroup);
  // scene.add(helper);

  scene.add( this.body_mesh );
  scene.add( this.leftarm_mesh );
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
  scene.add(this.face_mesh);

};

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