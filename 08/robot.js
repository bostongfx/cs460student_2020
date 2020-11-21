function Robot(x, y, z) {
    var color = '#965819';

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
    this.movement = 'bob';
};


Robot.prototype.walk = function raise_left_arm() {
    this.movement = 'walk';
};

let kneeFore = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 8);
let kneeBack = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 8);

let footFore = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 16);
let footBack = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 16);

// convert to seconds
var speed = 1 / 1000;
Robot.prototype.onAnimate = function onAnimate(time) {
    if (this.movement == 'bob') {
        var factor = time * speed * 2 / Math.pi;
        var cos = Math.cos(factor);
        this.root.position.y = 10 + 5 * cos;

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
    } else if (this.movement == 'walk') {
        // animation (both walk1 and walk2 handled in one case)
        var factor = time * speed * 2;
        var t = factor % 1
        if (factor % 2 < 1) { // phase 1
            t = 1 - t;
        }
        THREE.Quaternion.slerp(footFore, footBack, this.l_elbow.quaternion, t);
        THREE.Quaternion.slerp(footFore, footBack, this.r_elbow.quaternion, 1 - t);

        for (let leg of [this.l[0], this.r[1], this.l[2]]) {
            THREE.Quaternion.slerp(kneeFore, kneeBack, leg.knee.quaternion, t);
            THREE.Quaternion.slerp(footFore, footBack, leg.foot.quaternion, 1 - t);
        }
        for (let leg of [this.r[0], this.l[1], this.r[2]]) {
            THREE.Quaternion.slerp(kneeFore, kneeBack, leg.knee.quaternion, 1 - t);
            THREE.Quaternion.slerp(footFore, footBack, leg.foot.quaternion, t);
        }

        this.onStep();
    }
};

let flip = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
Robot.prototype.onStep = function() {
    // movement
    // check for edge of floor
    if (this.root.position.x < -500 || this.root.position.x > 500 || 
            this.root.position.z < -500 || this.root.position.z > 500 ||
            this.root.position.distanceTo(blob.position) < 100) {
        this.root.rotateY(Math.PI);
        // needed to ensure it doesnt glich outside the board
        this.outside = true;
    } else {
        // boids-like algorithm
        var radius = 300;
        var near = [];
        var closeRad = 100;
        var close = [];
        for (var robot of robots) {
            if (robot == this) continue;
            var d = robot.root.position.distanceTo(this.root.position);
            if (d < radius) {
                if (d < closeRad) {
                    close.push(robot);
                } else {
                    near.push(robot);
                }
            }
            if (close.length > 0) {
                // separation
                var center = new THREE.Vector3();
                for (let r of close) {
                    center.add(r.root.position);
                }
                center.multiplyScalar(1 / close.length);
                // set target position
                var target = new THREE.Vector3()
                    .subVectors(this.root.position, center)
                    .normalize();
                var targetRot = new THREE.Quaternion()
                    .setFromUnitVectors(new THREE.Vector3(1, 0, 0), target);
                this.root.quaternion.slerp(targetRot, .1);
            } else if (near.length > 0) {
                // cohesion and alignment
                var center = new THREE.Vector3();
                var angle = new THREE.Vector3();
                for (let r of near) {
                    center.add(r.root.position);
                    angle.add(
                        new THREE.Euler()
                        .setFromQuaternion(r.root.quaternion)
                        .toVector3()
                    )
                }
                center.multiplyScalar(1 / near.length);
                angle.multiplyScalar(1 / near.length);
                // set target position
                var target = new THREE.Vector3()
                    .subVectors(center, this.root.position)
                    .normalize();
                var targetRot = new THREE.Quaternion()
                    .setFromUnitVectors(new THREE.Vector3(1, 0, 0), target);
                this.root.quaternion.slerp(targetRot, .05);
                // alignment
                targetRot = new THREE.Quaternion()
                    .setFromEuler(new THREE.Euler().setFromVector3(angle));
                this.root.quaternion.slerp(targetRot, .1)
            }
        }
        // var seen = false;
        // for (let robot of robots) {
        //     if (robot == this) continue;
        //     if (robot.root.position.distanceTo(this.root.position) < 50) {
        //         if (!this.avoiding) {
        //             this.root.rotateY(Math.PI);
        //         }
        //         seen = true;
        //         this.avoiding = true;
        //         break;
        //     }
        // }
        // if (!seen) {
        //     this.avoiding = false;
        // }
    }

    var moveDir = new THREE.Vector3(0, 0, 1);
    moveDir.applyQuaternion(this.root.quaternion);

    this.root.position.add(moveDir);
}

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