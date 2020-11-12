function Robot(x, y, z) {
    this.skeleton = nodes([
        {
            name: 'head',
            translation: [x, y, z],
            children: [1],
        },
        {
            name: 'neck',
            translation: [0, -10, 0],
            children: [2, 5, 8],
        },
        {
            name: 'l_shoulder',
            translation: [10, 0, 0],
            children: [3],
        },
        {
            name: 'l_elbow',
            translation: [3, -15, 0],
            children: [4],
        },
        {
            name: 'l_hand',
            translation: [0, -15, 0],
        },
        {
            name: 'r_shoulder',
            translation: [-10, 0, 0],
            children: [6],
        },
        {
            name: 'r_elbow',
            translation: [-3, -15, 0],
            children: [7],
        },
        {
            name: 'r_hand',
            translation: [0, -15, 0],
        },
        {
            name: 'pelvis',
            translation: [0, -30, 0],
            children: [9, 12],
        },
        {
            name: 'l_hip',
            translation: [7, 0, 0],
            children: [10],
        },
        {
            name: 'l_knee',
            translation: [3, -20, 0],
            children: [11],
        },
        {
            name: 'l_foot',
            translation: [0, -20, 0],
        },
        {
            name: 'r_hip',
            translation: [-7, 0, 0],
            children: [13],
        },
        {
            name: 'r_knee',
            translation: [-3, -20, 0],
            children: [14],
        },
        {
            name: 'r_foot',
            translation: [0, -20, 0],
        }
    ]);
    for (let node of this.skeleton) {
        this[node.name] = node;
    }
    this.movememt = '';
}

Robot.prototype.show = function show() {
    var rGroup = new THREE.Group();
    rGroup.add( this.head );

    var helper = new THREE.SkeletonHelper( rGroup );
    helper.material.linewidth = 3; // make the skeleton thick

    scene.add(rGroup);
    scene.add(helper);
};

Robot.prototype.raise_left_arm = function raise_left_arm() {
    this.movememt = 'raise_left_arm'
};
Robot.prototype.lower_left_arm = function lower_left_arm() {
    this.movememt = 'lower_left_arm'
};
Robot.prototype.kick = function kick() {
    this.movememt = 'kick'
    setTimeout(() => this.movememt = 'unkick', 1000);
};

Robot.prototype.onAnimate = function onAnimate() {
    let speed = .05;
    if (this.movememt == 'raise_left_arm') {
        this.l_shoulder.quaternion.slerp(rotation(0, 0, 1, Math.PI * 3/4), speed);
        this.l_elbow.quaternion.slerp(rotation(0, 0, 1, Math.PI * 1/4), speed);
    } else if (this.movememt == 'lower_left_arm') {
        this.l_shoulder.quaternion.slerp(identity, speed);
        this.l_elbow.quaternion.slerp(identity, speed);
    } else if (this.movememt == 'kick') {
        this.r_hip.quaternion.slerp(rotation(-1, 0, 0, Math.PI * 1/3), speed);
        this.r_knee.quaternion.slerp(rotation(-1, 0, 0, Math.PI * 1/6), speed/3);
    } else if (this.movememt == 'unkick') {
        this.r_hip.quaternion.slerp(identity, speed);
        this.r_knee.quaternion.slerp(identity, speed);
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