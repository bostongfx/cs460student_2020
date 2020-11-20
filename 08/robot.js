Robot = function(x, y, z) {
  /* create a sphere to represent the robots head without texture
  var geometry = new THREE.SphereBufferGeometry( 10, 10, 10 );
  var material = new THREE.MeshStandardMaterial( { color: 'blue', wireframe: false } );
  shape = new THREE.Mesh( geometry, material );
  shape.position.set(x, y, z); */

  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  // console.log(fromhelper);
  // console.log(bones);

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;

  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;

  // create a textured spherical head for bonus.
  this.face = new THREE.Bone();
  var geometry = new THREE.SphereBufferGeometry( 10, 10, 10 );
  var texture = new THREE.TextureLoader().load( 'face.jpg' );
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
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'brown')
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

  // create right upper arm, lower arm, and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'brown')
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

  // create left upper leg, lower leg, and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'brown')
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

  // create right upper leg, lower leg, and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'brown')
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

  //this.movement = null;

};

Robot.prototype.show = function(scene) {

  scene.add( this.body_mesh );
  scene.add( this.leftarm_mesh );
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
  scene.add(this.face);

  //scene.add(shape);

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

Robot.prototype.walk = function() {
  this.movement = 'walk';
};

Robot.prototype.onStep = function() {
    if (this.root.position.z > 490 || this.root.position.z < -490) {
      this.root.rotateY(Math.PI);
    } 
    else if ( this.root.position.x > 490 || this.root.position.x < -490) {
      this.root.rotateY(Math.PI);
    }
    /*  not needed because no walking in y plane.
    else if (this.root.position.y > 490 || this.root.position.y < -490) {
      this.root.rotateY(Math.PI);
    } */

   for (var robot in robots) {
      this.root.translateZ(10);
      if (!robots[robot].root.position.equals(this.root.position) && robots[robot].root.position.distanceTo(this.root.position) < 2) {
        this.root.rotateY(Math.PI);
      }
    }
  };

Robot.prototype.onAnimate = function() {

  if ( this.movement == 'raise left arm' ) {

    T = -Math.PI // 180 degrees
    x = 1 
    y = 0
    z = 0

    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

  }

  else if (this.movement == 'lower left arm') {
    T = 0; // 180 degrees -- doesnt matter here.
    x = 0;
    y = 0;
    z = 0;

    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );
  }

  else if ( this.movement == 'kick' ) {

    // DO SOMETHING
    if (this.right_upper_leg.quaternion.w < 0.72) {
      this.movement = 'kick done';
    }
    else {
      T = -Math.PI/2;
      x = 1;
      y = 0;
      z = 0;

      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
        Math.sin(T/2)*x, 
        Math.sin(T/2)*y, 
        Math.sin(T/2)*z, 
        Math.cos(T/2) ), 0.1 );
    }
  }

  else if (this.movement == 'kick done') {
    T = 0; // 180 degrees -- doesnt matter here.
      x = 0;
      y = 0;
      z = 0;

      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
        Math.sin(T/2)*x, 
        Math.sin(T/2)*y, 
        Math.sin(T/2)*z, 
        Math.cos(T/2) ), 0.1 );
  }

  // added the code for dancing from Prof. Haehn's assgnement 6 solution since my submission was buggy and I'm still trying to figure it out.
  else if (this.movement == 'dance') {
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

  else if (this.movement == 'walk') {
        if( this.right_upper_leg.quaternion.w < 0.93) {
          this.movement = 'walk2';
        }

        // Pi = 180 degrees thus 45 degrees = Pi/4 ... using 45 degrees made the robot glide across which looked less like walking so i used 60 degrees instead.
        var T = -Math.PI/3; 
        x = 1;
        y = 0;
        z = 0;
    
        this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
          Math.sin(T/2)*x, 
          Math.sin(T/2)*y, 
          Math.sin(T/2)*z, 
          Math.cos(T/2) ), 0.1 );
    
        this.onStep();
    
      } 
  else if (this.movement == 'walk2') {
    if( this.left_upperleg.quaternion.w < 0.93) {
      this.movement = 'walk';
    }

    // Pi = 180 degrees thus 45 degrees = Pi/4 ... using 45 degrees made the robot glide across which looked less like walking so i used 60 degrees instead.
    var T = -Math.PI/3;
    x = 1;
    y = 0;
    z = 0;

    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    this.left_upperleg.quaternion.slerp( new THREE.Quaternion( 
      Math.sin(T/2)*x, 
      Math.sin(T/2)*y, 
      Math.sin(T/2)*z, 
      Math.cos(T/2) ), 0.1 );

    this.onStep();
  }

};