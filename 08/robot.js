Robot = function(x, y, z) {

  // Create head, neckm and torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[0]; // see visible ancor point
  this.root.position.set( x, y, z );
  this.head = bones[1];
  this.neck = bones[2];
  this.neck.position.y = -10;
  this.torso = bones[3];
  this.torso.position.y = -30;

  this.body_mesh = mesh;


  // Bonus Box head.
  this.big_head = new THREE.Bone();
  var geometry = new THREE.BoxBufferGeometry( 25, 25, 25 );
  var texture = new THREE.TextureLoader().load( 'haehn.jpg' );
  var material = new THREE.MeshStandardMaterial( {
    skinning: true, // IMPORTANT!
    side: THREE.DoubleSide,
    flatShading: true,
    map: texture
  } );

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( this.big_head );
  mesh.bind( skeleton );

  this.root.add(this.big_head);
  this.big_head = mesh;



  // Create head, neckm and torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[0] ); // invisble ancor point

  this.left_upperarm = bones[1];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;
  this.left_lowerarm = bones[2];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;
  this.left_hand = bones[3];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;
  this.left_arm_mesh = mesh;
  // Left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[0] );
  this.left_upperleg = bones[1];
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;
  this.left_lowerleg = bones[2];
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;
  this.left_foot = bones[3];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.left_leg_mesh = mesh;


  // Right Hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[0] );
  this.right_upperarm = bones[1];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones[2];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = bones[3];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;
  this.right_arm_mesh = mesh;
  // Right Leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[0] );
  this.right_upperleg = bones[1];
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[2];
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[3];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.right_leg_mesh = mesh;




  this.movement = null;

};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.left_arm_mesh);
  scene.add(this.left_leg_mesh);
  scene.add(this.right_arm_mesh);
  scene.add(this.right_leg_mesh);
  scene.add(this.big_head);

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

Robot.prototype.walk = function() {

  this.movement = 'walk';

};

Robot.prototype.onStep = function() {
  const poke = new THREE.Vector3( 150, -50, 0 );
  this.root.translateZ(10);

  if(this.root.position.z >= 480) {
    this.root.rotateY(Math.PI);
  } if(this.root.position.z <= -480) {
    this.root.rotateY(Math.PI);
  }

  for( var a in allRobots ) {
    if(this.root.position.distanceTo(allRobots[a].root.position) < 50 
      && !this.root.position.equals(allRobots[a].root.position )
        )
      this.root.rotateY(Math.PI);
  }
  if(this.root.position.distanceTo(poke) < 110) {
    this.root.rotateY(Math.PI);
  }

};

Robot.prototype.dance = function() {
  // Plays music when dance it's called
  var music = document.getElementById('music');
  music.autoplay = true;
  music.load();
  // Plays video
  video.play();
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
  
  } else if (this.movement == 'walk2') {
  
    var T = -Math.PI/4;
    this.left_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.3 );

    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.3);

    if (this.left_upperleg.quaternion.w < .93) {
      this.movement  = 'walk';
      this.onStep();
    }
  
  } else if (this.movement == 'walk') {
  
    var T = -Math.PI/4;
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.3 );

    this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.3);
    
    if (this.right_upperleg.quaternion.w < .93) {
      this.movement  = 'walk2';
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