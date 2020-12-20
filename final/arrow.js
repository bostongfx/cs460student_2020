arrow = function(x, y, z) {

  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[0];
  this.root.position.set( x, y, z );
  this.head = bones[1];
  this.neck = bones[2];
  this.neck.position.y = -10;
  this.torso = bones[3];
  this.torso.position.y = -30;

  this.body_mesh = mesh;


  // Cone Arrow.
  this.big_head = new THREE.Bone();
  var geometry = new THREE.ConeBufferGeometry( 15, 25, 30 );
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

  this.head.add(this.big_head);
  this.big_head = mesh;
  this.movement = null;

};


arrow.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.big_head);
};

arrow.prototype.moveLeft = function() {
  this.movement = 'moveLeft';
};
arrow.prototype.moveRight = function() {
  this.movement = 'moveRight';
};

// Used to point arrows left or right.
rightCount = 30;
leftCount = 30;

arrow.prototype.onAnimate = function() {
  if (this.movement == 'moveLeft') {
    if (rightCount == 30) {
      this.root.rotation.z = -Math.PI/leftCount;
      this.movement = ' ';
    }
    else {
      this.root.rotation.z = Math.PI/rightCount;
      this.movement = ' ';
    }
  } 
  else if (this.movement == 'moveRight') {
    if (rightCount == 30) {
      this.root.rotation.z = -Math.PI/leftCount;
      this.movement = ' ';
    }
    else {
      this.root.rotation.z = Math.PI/rightCount;
      this.movement = ' ';
    }
  }
};