
Robot = function(x, y, z) {
    
    // Part 1: Robot skinning

    // create head, neck, torso
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.root = bones[0];  // invisible anchor point
    this.root.position.set( x, y, z );

    this.head = bones[1];
    this.neck = bones[2];
    this.neck.position.y = -10;

    this.torso = bones[3];
    this.torso.position.y = -30;

    this.body_mesh = mesh;
    // end of head, neck, and torso

    // left arm, hand, upper and lower 
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.neck.add( bones[0] );  // invisible anchor point

    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.x = 10
    this.left_upper_arm.position.y = -5

    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.x = 8
    this.left_lower_arm.position.y = -18

    this.left_hand = bones[3];
    this.left_hand.position.x = -1
    this.left_hand.position.y = -5

    this.leftarm_mesh = mesh;
    // end of left arm

    // right arm, hand, upper and lower
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.neck.add( bones[0] );  // invisible anchor point

    this.right_upper_arm = bones[1];
    this.right_upper_arm.position.x = -10
    this.right_upper_arm.position.y = -5

    this.right_lower_arm = bones[2];
    this.right_lower_arm.position.x = -8
    this.right_lower_arm.position.y = -18

    this.right_hand = bones[3];
    this.right_hand.position.x = 1
    this.right_hand.position.y = -5

    this.rightarm_mesh = mesh;
    // end of right arm

    // left leg
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] );  // invisible anchor point

    this.left_upper_leg = bones[1];
    this.left_upper_leg.position.x = 8
    this.left_upper_leg.position.y = -18

    this.left_lower_leg = bones[2];
    this.left_lower_leg.position.y = -25

    this.left_foot = bones[3];
    this.left_foot.position.x = 6
    this.left_foot.position.y = 2

    this.leftleg_mesh = mesh;
    // end of left leg

    // right leg
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 0x625C54 );
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] );  // invisible anchor point

    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.x = -8
    this.right_upper_leg.position.y = -18

    this.right_lower_leg = bones[2];
    this.right_lower_leg.position.y = -25

    this.right_foot = bones[3];
    this.right_foot.position.x = -6
    this.right_foot.position.y = 2

    this.rightleg_mesh = mesh;
    // end of right leg

    // // this will control which animation to run
    this.movement = null; // for instance 'raise left arm', 
                            // raises the left arm   
};
    
Robot.prototype.show = function(scene) {
    
    scene.add(this.body_mesh);
    scene.add(this.leftarm_mesh);
    scene.add(this.rightarm_mesh);
    scene.add(this.leftleg_mesh);
    scene.add(this.rightleg_mesh);
    
};
  
Robot.prototype.raise_left_arm = function() {
      
    this.movement = 'raise-left-arm';
  
};
  
Robot.prototype.lower_left_arm = function() {
  
    this.movement = 'lower-left-arm';
  
};
  
Robot.prototype.kick = function() {
  
    this.movement = 'kick';
  
};
  
Robot.prototype.dance = function() {
    
    this.movement = 'dance';
  
};
  
Robot.prototype.onAnimate = function() {
  
    if ( this.movement == 'raise-left-arm' ) {
        
        var T = Math.PI;
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                                Math.sin(-T/2),  // w
                                                0,               // x
                                                0,               // y
                                                Math.cos(-T/2)), // z
                                                0.1 );
    
    } else  if ( this.movement == 'lower-left-arm' ) {

        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 
                                            0, 0, 0, 1 ),
                                            0.1 );
  
    } else if ( this.movement == 'kick' ) {
        
        // check if slerp reached almost the end
        if (this.right_upper_leg.quaternion.w < 0.72) {
        
            // signal that the kick is done and the leg should move back
            this.movement = 'kick done';
        
        } else {
            var T = -Math.PI/2;
            this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 
                                                    Math.sin( T / 2 ),   // x
                                                    0,                   // y
                                                    0,                   // z
                                                    Math.cos( T / 2 ) ), // w
                                                    0.1 );
        }
    
    } else if ( this.movement == 'kick done' ) {
        
        // reset leg back to identity
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
                                                0, 0, 0, 1), 
                                                0.1 );

    } else if ( this.movement == 'dance' ) {
  
        if ( typeof this.dancer === 'undefined' ) {
    
            this.dancer = setInterval( function() {
    
                // some random translation
                var shakehead = 3 * Math.random();
                if (Math.random() < .5) {

                    shakehead *= -1;
                    
                }
        
                var shakeneck = 3 * Math.random();
                if (Math.random() < .5) {

                    shakeneck *= -1;

                }
        
                var shaketorso = 3 * Math.random();
                if (Math.random() < .5) {

                    shaketorso *= -1;

                }
        
                this.head.position.x += shakehead;
        
                this.neck.position.x += shakeneck;
        
                this.torso.position.x += shaketorso;
        
                // use actions
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