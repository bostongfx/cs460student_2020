Robot = function(x, y, z) {
    
    
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
    
  //--------Bonus-Part-1----------
 this.shape = new THREE.Bone();
    const loader1 = new THREE.GLTFLoader();
     loader1.load( 'notexture.glb', function ( gltf ) {

    
	//var mesh1 = gltf.scene;

}, undefined, function ( error ) {

	console.error( error );

});
    
    var geometry1 = new THREE.SphereBufferGeometry(10, 10, 10);
   var texture1 = new THREE.TextureLoader().load('hair1.png');
   // setup material
  var material1 = new THREE.MeshStandardMaterial( {
    skinning: true, // IMPORTANT!
  side: THREE.DoubleSide,
      map: texture1
  } );
    
    var face = new THREE.Mesh(geometry1, material1);
    
    // var mesh = new THREE.SkinnedMesh( geometry, material );
     //var skeleton = new THREE.Skeleton( bones );
    // mesh.add( this.shape );
    // mesh.bind( skeleton );
    
   this.head.add(face);
    this.head.position.y = -10; 
  
    
    
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'red')
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
    
    
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'red')
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
    
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'red')
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
    
    
     var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'red')
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
   // scene.add(gltf.scene);
   // scene.add(this.shape);
    // scene.add(mesh1);
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



