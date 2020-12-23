Robot = function(x, y, z, rand) {
  //var rand = Math.floor(Math.random() * 5);
  // create head, neck, and torso
  console.log(rand);
  switch(rand) {
      case 0:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
        break;
      case 1:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
        break;
      case 2:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow')
        break;
      case 3:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
        break;
      case 4:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'green')
        break;
      case 5:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#FF69B4')
        break;
  }
  //var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  
  // add the head/face
  var geom = new THREE.SphereGeometry(10, 10, 100 );
  switch(rand) {
      case 0:
        var texture = new THREE.TextureLoader().load( "faces/red.png" );
        break;
      case 1:
        var texture = new THREE.TextureLoader().load( "faces/blue.png" );
        break;
      case 2:
        var texture = new THREE.TextureLoader().load( "faces/yellow.png" );
        break;
      case 3:
        var texture = new THREE.TextureLoader().load( "faces/black.png" );
        break;
      case 4:
        var texture = new THREE.TextureLoader().load( "faces/green.png" );
        break;
      case 5:
        var texture = new THREE.TextureLoader().load( "faces/pink.png" );
        break;
  }
  
  texture.offset.x = 0.2;
  var matz = new THREE.MeshPhongMaterial( { map: texture } );
  matz.shininess = 5;
  var ball = new THREE.Mesh( geom, matz );

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = 5;

  this.torso = bones[ 3 ];
  this.torso.position.y = -35;

  this.body_mesh = mesh;
  
  this.head.add( ball );
  this.head.position.y = -10;
  //this.head = mesh;
  //this.neck = mesh;
  


  // this.head = new THREE.Bone();
  // this.head.position.set( x, y, z );

  // this.neck = new THREE.Bone();
  // this.neck.position.y = -10;

  // this.head.add(this.neck);

  // this.torso = new THREE.Bone();
  // this.torso.position.y = -30;

  // this.neck.add(this.torso);

  console.log('fdsklfjd');
  // create left upper arm, lower arm, and hand
  switch(rand) {
      case 0:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
        break;
      case 1:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
        break;
      case 2:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow')
        break;
      case 3:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
        break;
      case 4:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'green')
        break;
      case 5:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#FF69B4')
        break;
  }
  //var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  // this.root = bones[ 0 ]; // invisible anchor point
  // this.root.position.set( x, y, z );
  
  this.neck.add( bones[0] );

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 7;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;  

  this.leftarm_mesh = mesh;
  
//   var geom = new THREE.CylinderBufferGeometry(10, 10, 100 );
//   var texture = new THREE.TextureLoader().load( "arm.jpg" );
//   texture.offset.x = 0.2;
//   var matz = new THREE.MeshPhongMaterial( { map: texture } );
//   matz.shininess = 5;
//   var ball = new THREE.Mesh( geom, matz );
//   
//   this.leftarm_mesh.add(ball);
//   this.leftarm_mesh.position.x = 30;
//   this.leftarm_mesh.position.y = 0;
  
  
  // create right upper arm, lower arm, and hand
  switch(rand) {
      case 0:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
        break;
      case 1:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
        break;
      case 2:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow')
        break;
      case 3:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
        break;
      case 4:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'green')
        break;
      case 5:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#FF69B4')
        break;
  }
  //var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  
  this.neck.add( bones[0] );

  this.right_upperarm = bones[ 1 ];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones[ 2 ];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -7;

  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;  

  this.rightarm_mesh = mesh;
  
  
  


  // create left leg
  switch(rand) {
      case 0:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
        break;
      case 1:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
        break;
      case 2:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow')
        break;
      case 3:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
        break;
      case 4:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'green')
        break;
      case 5:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#FF69B4')
        break;
  }
  //var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  
  this.torso.add( bones[0] );
  
  
  this.left_upperleg = bones[ 1 ];
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = bones[ 2 ];
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = bones[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  
  this.leftleg_mesh = mesh;
  
  
  // create right leg
  switch(rand) {
      case 0:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
        break;
      case 1:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
        break;
      case 2:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow')
        break;
      case 3:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
        break;
      case 4:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'green')
        break;
      case 5:
        var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#FF69B4')
        break;
  }
  //var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, '#fa1400')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  
  this.torso.add( bones[0] );
  
  
  this.right_upperleg = bones[ 1 ];
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[ 2 ];
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
  
  this.rightleg_mesh = mesh;
  
  
  this.movement = null;

}


Robot.prototype.show = function(scene) {

  scene.add( this.body_mesh );
  scene.add( this.leftarm_mesh );
  scene.add( this.rightarm_mesh );
  scene.add( this.leftleg_mesh );
  scene.add( this.rightleg_mesh );

}



Robot.prototype.raiseLeftArm = function() {
    this.movement = 'raise left arm';
}
    
Robot.prototype.lowerLeftArm = function() {
    this.movement = 'lower left arm';
}

Robot.prototype.raiseRightArm = function() {
    this.movement = 'raise right arm';
}
    
Robot.prototype.lowerRightArm = function() {
    this.movement = 'lower right arm';
}

Robot.prototype.rightKick = function() {
    this.movement = 'right kick';
}

Robot.prototype.leftKick = function() {
    this.movement = 'left kick';
}

Robot.prototype.Dance = function() {
    var that = this
    setInterval(function() {
        var rand = Math.floor(Math.random() * 6);
        if (rand == 0) {
            that.raiseLeftArm();
        } else if (rand == 1) {
            that.raiseRightArm();
        } else if (rand == 2) {
            that.lowerLeftArm();
        } else if (rand == 3) {
            that.lowerRightArm();
        } else if (rand == 4) {
            that.leftKick();
        } else if (rand == 5) {
            that.rightKick();
        }
    }, 110);
};

   
Robot.prototype.choreo = function() {
    var that = this
    /*setInterval(function() {
        setInterval(function() {
            that.lowerLeftArm();
        }, 90);
        that.raiseLeftArm();
    }, 30);*/
    /* do one set of dance moves and repeat them with a for loop */
//     var p;
//     for (p = 0; p < 1; p++) {
//         if (p < 1) {
           setTimeout(() => { that.leftKick(); }, 00);
           setTimeout(() => { that.raiseLeftArm(); }, 200);
           setTimeout(() => { that.lowerLeftArm(); }, 300);
           setTimeout(() => { that.rightKick(); }, 500);
           setTimeout(() => { that.raiseRightArm(); }, 700);
           setTimeout(() => { that.lowerRightArm(); }, 800);
           setTimeout(() => { that.choreo(); }, 1000);
//         setTimeout(() => {  that.leftKick(); }, 100);
//         setTimeout(() => {  that.raiseLeftArm(); }, 200);
//         setTimeout(() => {  that.lowerLeftArm(); }, 400);
//         setTimeout(() => {  that.rightKick(); }, 500);
//         setTimeout(() => {  that.raiseRightArm(); }, 600);
//         setTimeout(() => {  that.lowerRightArm(); }, 700);
    //    }
   // }
}

Robot.prototype.onAnimate = function() {
    
    // RAISE LEFT ARM
    if ( this.movement == 'raise left arm' ) {
        var T = Math.PI // 180 degrees
        var x = 1
        var y = 0
        var z = 0
        
        this.left_upperarm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.3); // where the 0.01 is the delta
    
    // LOWER LEFT ARM
    } else if ( this.movement == 'lower left arm') {
        var T = Math.PI // 180 degrees
        var x = 0
        var y = 0
        var z = 0
        
        this.left_upperarm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.3); // where the 0.01 is the delta
    
    // RAISE RIGHT ARM
    } else if ( this.movement == 'raise right arm' ) {
        var T = Math.PI // 180 degrees
        var x = 1
        var y = 0
        var z = 0
        
        this.right_upperarm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.3); // where the 0.01 is the delta
    
    // LOWER RIGHT ARM
    } else if ( this.movement == 'lower right arm') {
        var T = Math.PI // 180 degrees
        var x = 0
        var y = 0
        var z = 0
        
        this.right_upperarm.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2)*x,
            Math.sin(T/2)*y,
            Math.sin(T/2)*z,
            Math.cos(T/2) ), 0.3); // where the 0.01 is the delta
            
    // KICK
    } else if ( this.movement == 'right kick' ) {
        if ( this.right_upperleg.quaternion.w < 0.72 ) {
            // signal for a kick that is done
            this.movement = 'kick done';
        } else {
            var T = Math.PI / 2;
            x = -1;
            y = 0;
            z = 0;
            this.right_upperleg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2) * x, // x
                Math.sin(T/2) * y, // y
                Math.sin(T/2) * z, // z
                Math.sin(T/2) ), 0.5); // w
        }
    } else if ( this.movement == 'kick done') {
        //put leg back
        var x = 0;
        var y = 0;
        var z = 0;
        this.right_upperleg.quaternion.slerp( new THREE.Quaternion( x, y, z, 1), 0.5);
    } else if ( this.movement == 'left kick' ) {
        if ( this.left_upperleg.quaternion.w < 0.72 ) {
            // signal for a kick that is done
            this.movement = 'leftkick done';
        } else {
            var T = Math.PI / 2;
            x = -1;
            y = 0;
            z = 0;
            this.left_upperleg.quaternion.slerp( new THREE.Quaternion( 
                Math.sin(T/2) * x, // x
                Math.sin(T/2) * y, // y
                Math.sin(T/2) * z, // z
                Math.sin(T/2) ), 0.5); // w
        }
    } else if ( this.movement == 'leftkick done') {
        //put leg back
        var x = 0;
        var y = 0;
        var z = 0;
        this.left_upperleg.quaternion.slerp( new THREE.Quaternion( x, y, z, 1), 0.5);
    } else if ( this.movement == 'dance') {
        //this.rightKick();
        //this.movement == 'raise left arm');
    }

};












