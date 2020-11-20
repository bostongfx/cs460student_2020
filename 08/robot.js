function Robot(x, y, z) {
    var color = '#CE2D25';

    var [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 20, color);
    [this.root, this.head, this.neck, this.pelvis] = bones;
    
    this.spine_mesh = new THREE.SkinnedMesh(geom, mat);
    var skeleton = new THREE.Skeleton(bones);
    this.spine_mesh.add(this.root);
    this.spine_mesh.bind(skeleton);
    
    this.root.position.set(x, y, z);
    this.head.position.set(0, 0, 0);
    this.neck.position.set(0, 0, 0);
    this.pelvis.position.set(0, -15, 0);

    var root;
    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 6, color);
    [root, this.l_shoulder, this.l_elbow, this.l_hand] = bones;
    
    this.l_arm_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.l_arm_mesh.add(root);
    this.l_arm_mesh.bind(skeleton);
    
    this.neck.add(root);
    this.l_shoulder.position.set(12, -10, 17);
    this.l_elbow.position.set(10, 10, 0);
    this.l_hand.position.set(5, 10, 0);

    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 6, color);
    [root, this.r_shoulder, this.r_elbow, this.r_hand] = bones;
    
    this.r_arm_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.r_arm_mesh.add(root);
    this.r_arm_mesh.bind(skeleton);
    
    this.neck.add(root);
    this.r_shoulder.position.set(-12, -10, 17);
    this.r_elbow.position.set(-10, 10, 0);
    this.r_hand.position.set(-5, 10, 0);

    this.l = [{}, {}, {}];

    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 3, color);
    [root, this.l[0].hip, this.l[0].knee, this.l[0].foot] = bones;
    
    this.l[0].leg_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.l[0].leg_mesh.add(root);
    this.l[0].leg_mesh.bind(skeleton);
    
    this.pelvis.add(root);
    this.l[0].hip.position.set(12, 5, 12);
    this.l[0].knee.position.set(15, -10, 3);
    this.l[0].foot.position.set(3, -5, 1);

    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 3, color);
    [root, this.l[1].hip, this.l[1].knee, this.l[1].foot] = bones;
    
    this.l[1].leg_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.l[1].leg_mesh.add(root);
    this.l[1].leg_mesh.bind(skeleton);
    
    this.pelvis.add(root);
    this.l[1].hip.position.set(17, 5, 0);
    this.l[1].knee.position.set(15, -10, 0);
    this.l[1].foot.position.set(3, -5, 0);
    
    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 3, color);
    [root, this.l[2].hip, this.l[2].knee, this.l[2].foot] = bones;
    
    this.l[2].leg_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.l[2].leg_mesh.add(root);
    this.l[2].leg_mesh.bind(skeleton);
    
    this.pelvis.add(root);
    this.l[2].hip.position.set(12, 5, -12);
    this.l[2].knee.position.set(15, -10, -3);
    this.l[2].foot.position.set(3, -5, -1);

    this.r = [{}, {}, {}];

    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 3, color);
    [root, this.r[0].hip, this.r[0].knee, this.r[0].foot] = bones;
    
    this.r[0].leg_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.r[0].leg_mesh.add(root);
    this.r[0].leg_mesh.bind(skeleton);
    
    this.pelvis.add(root);
    this.r[0].hip.position.set(-12, 5, 12);
    this.r[0].knee.position.set(-15, -10, 3);
    this.r[0].foot.position.set(-3, -5, 1);

    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 3, color);
    [root, this.r[1].hip, this.r[1].knee, this.r[1].foot] = bones;
    
    this.r[1].leg_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.r[1].leg_mesh.add(root);
    this.r[1].leg_mesh.bind(skeleton);
    
    this.pelvis.add(root);
    this.r[1].hip.position.set(-17, 5, 0);
    this.r[1].knee.position.set(-15, -10, 0);
    this.r[1].foot.position.set(-3, -5, 0);
    
    [geom, mat, bones] = HELPER.cylinderSkeletonMesh(3, 3, color);
    [root, this.r[2].hip, this.r[2].knee, this.r[2].foot] = bones;
    
    this.r[2].leg_mesh = new THREE.SkinnedMesh(geom, mat);
    skeleton = new THREE.Skeleton(bones);
    this.r[2].leg_mesh.add(root);
    this.r[2].leg_mesh.bind(skeleton);
    
    this.pelvis.add(root);
    this.r[2].hip.position.set(-12, 5, -12);
    this.r[2].knee.position.set(-15, -10, -3);
    this.r[2].foot.position.set(-3, -5, -1);
    
    this.movement = '';
}

Robot.prototype.show = function show() {
    scene.add(this.spine_mesh);
    scene.add(this.l_arm_mesh);
    scene.add(this.r_arm_mesh);
    scene.add(this.l[0].leg_mesh);
    scene.add(this.l[1].leg_mesh);
    scene.add(this.l[2].leg_mesh);
    scene.add(this.r[0].leg_mesh);
    scene.add(this.r[1].leg_mesh);
    scene.add(this.r[2].leg_mesh);
};

Robot.prototype.rave = function raise_left_arm() {
    this.movement = 'bob'
};

var speed = 2 * Math.PI / 1000;
Robot.prototype.onAnimate = function onAnimate(time) {
    var factor = time * speed + this.i + this.j;
    var cos = Math.cos(factor);
    // var sin = Math.sin(factor);
    if (this.movement == 'bob') {
        this.root.position.y = -60 + 10 + 5 * cos;

        this.l_elbow.position.x = 10 - 10 * cos;
        this.l_hand.position.x = 5 - 12 * cos;
        this.l_hand.position.y = 10 + 4 + 5 * cos;

        this.r_elbow.position.x = -10 + 10 * cos;
        this.r_hand.position.x = -5 + 12 * cos;
        this.r_hand.position.y = 10 + 4 + 5 * cos;

        for (var i = 0; i < 3; i++) {
            this.l[i].knee.position.y = -10 - 2 - 2 * cos;
            this.l[i].foot.position.y = -10 - 3 - 3 * cos;

            this.r[i].knee.position.y = -10 - 2 - 2 * cos;
            this.r[i].foot.position.y = -10 - 3 - 3 * cos;
        }
    }
};

let identity = new THREE.Quaternion(0, 0, 0, 1);

function rotation(x, y, z, angle) {
    let c = Math.cos(angle / 2);
    let s = Math.sin(angle / 2);
    return new THREE.Quaternion(
        x * s,
        y * s,
        z * s,
        c
    )
}