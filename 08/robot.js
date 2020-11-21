function Robot(x, y, z, size) {
    // The human body is approximately 7.5-8 heads in height.
    this.size     = size;
    this.headSize = size/8.0;
    this.xOffset  = x;
    this.yOffset  = y;
    this.zOffset  = z;
    this.joints   = {};
    this.meshes   = [];

    // Mostly taken from helper.js, this function produces individual bones. In modifying this
    // I found out first hand why the invisible anchor is needed. Eesh, that was a pain!
    Robot.prototype.makeBone = function(name, parent, width, color, xx, yy, zz, geo, mat) {
        let length = Math.ceil(Math.sqrt(xx*xx + yy*yy + zz*zz));
        let isBall = xx === 0 && yy === 0 && zz === 0;
        let shape = new THREE.Shape();
        let step = Math.PI/16
        shape.moveTo(Math.cos(0)*(width/2), Math.sin(0)*(width/2));
        for (let i = step; i <= 2*Math.PI; i += step) {
            shape.lineTo(Math.cos(i)*(width/2), Math.sin(i)*(width/2));
        }
        let curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(xx,yy,zz)]);
        let geometry = geo ? geo : isBall ?
            new THREE.SphereBufferGeometry(width,16,16) :
            new THREE.ExtrudeBufferGeometry(
                shape, {
                    steps: 4,
                    depth: length,
                    extrudePath: curve
                }
            );

        let position = geometry.attributes.position;
        let vertex = new THREE.Vector3();
        let skinIndices = [];
        let skinWeights = [];
        for (let i = 0; i < position.count; i++) {
            vertex.fromBufferAttribute(position, i);
            let dist = (vertex.length() + length)/4;
            // If geometry was passed in, these calculations don't work well. Set them up so that
            // index and weight are 1 and 1  at the same index.
            let skinIndex  = geo || isBall ? 0 : Math.floor(dist/length);
            let skinWeight = geo || isBall ? 1 : (dist % length)/length;
            skinIndices.push(skinIndex, skinIndex+1, 0, 0 );
            skinWeights.push(1-skinWeight, skinWeight, 0, 0 );
        }
        geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
        geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );
        let material = mat ? mat : new THREE.MeshStandardMaterial({
            skinning: true, // IMPORTANT!
            color: color,
            side: THREE.DoubleSide,
            flatShading: true
        });
        let invisibleBone = new THREE.Bone();
        invisibleBone.name = "invisible" + name;
        let currentBone = new THREE.Bone();
        currentBone.name = name;

        let mesh = new THREE.SkinnedMesh(geometry, material);
        let skeleton = new THREE.Skeleton([parent, invisibleBone, currentBone]);
        mesh.add(invisibleBone);
        mesh.bind(skeleton);
        this.joints[name] = currentBone;
        this.meshes.push(mesh);
        invisibleBone.add(currentBone);
        parent.add(invisibleBone);
        currentBone.position.set(xx, yy, zz);
    }
    // Set the colors for this robot.
    let color0 = 0x000000;
    let color1 = Math.floor(Math.random() * 0xFFFFFF);
    let color2 = Math.floor(Math.random() * 0xFFFFFF);
    let color3 = Math.floor(Math.random() * 0xFFFFFF);
    let color4 = Math.floor(Math.random() * 0xFFFFFF);

    // Create the root
    this.root = new THREE.Bone();
    this.root.name = "root";
    this.root.position.set(x, y+size/2, z);

    // And all the bones                            width
    //             name      , parent               , ^, color ,  (x, y, z) position
    this.makeBone('pelvis'   , this.root            , 1, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lowerBack', this.joints.pelvis   , 4, color1,  this.headSize*0.00,  this.headSize*0.75,  this.headSize*0.00)
    this.makeBone('midBack'  , this.joints.lowerBack, 4.5, color2,  this.headSize*0.00,  this.headSize*0.75,  this.headSize*0.00)
    this.makeBone('upperBack', this.joints.midBack  , 5, color3,  this.headSize*0.00,  this.headSize*1.00,  this.headSize*0.00)
    this.makeBone('neck'     , this.joints.upperBack, 6, color4,  this.headSize*0.00,  this.headSize*1.00,  this.headSize*0.00)
    // left arm
    this.makeBone('lCollar'  , this.joints.upperBack, 1, color0,  this.headSize*0.20,  this.headSize*0.35,  this.headSize*0.00)
    this.makeBone('lShoulder', this.joints.lCollar  , 3, color1,  this.headSize*0.50, -this.headSize*0.15,  this.headSize*0.00)
    this.makeBone('lBicep'   , this.joints.lShoulder, 3, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lElbow'   , this.joints.lBicep   , 3, color2,  this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lForearm' , this.joints.lElbow   , 2, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lWrist'   , this.joints.lForearm , 2, color1,  this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lWristJ'  , this.joints.lWrist   , 1, color0, -this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lHand'    , this.joints.lWristJ  , 1, color2,  this.headSize*0.75,  this.headSize*0.00,  this.headSize*0.00)
    // right arm
    this.makeBone('rCollar'  , this.joints.upperBack, 1, color0, -this.headSize*0.20,  this.headSize*0.35,  this.headSize*0.00)
    this.makeBone('rShoulder', this.joints.rCollar  , 3, color2, -this.headSize*0.50, -this.headSize*0.15,  this.headSize*0.00)
    this.makeBone('rBicep'   , this.joints.rShoulder, 3, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rElbow'   , this.joints.rBicep   , 3, color1, -this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rForearm' , this.joints.rElbow   , 2, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rWrist'   , this.joints.rForearm , 2, color2, -this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rWristJ'  , this.joints.rWrist   , 1, color0, -this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rHand'    , this.joints.rWristJ  , 1, color1, -this.headSize*0.75,  this.headSize*0.00,  this.headSize*0.00)
    // left leg
    this.makeBone('lHip'     , this.joints.pelvis   , 4, color4,  this.headSize*0.50, -this.headSize*0.25,  this.headSize*0.00)
    this.makeBone('lHipRottr', this.joints.lHip     , 3, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lKnee'    , this.joints.lHipRottr, 3, color3,  this.headSize*0.00, -this.headSize*2.00,  this.headSize*0.10)
    this.makeBone('lKneeCap' , this.joints.lKnee    , 2, color0,  this.headSize*0.00,  this.headSize*0.00, -this.headSize*0.00)
    this.makeBone('lAnkle'   , this.joints.lKneeCap , 2, color4,  this.headSize*0.00, -this.headSize*1.50, -this.headSize*0.10)
    this.makeBone('lHeel'    , this.joints.lAnkle   , 2, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('lFoot'    , this.joints.lHeel    , 2, color3,  this.headSize*0.00, -this.headSize*0.00,  this.headSize*0.75)
    // right leg
    this.makeBone('rHip'     , this.joints.pelvis   , 4, color3, -this.headSize*0.50, -this.headSize*0.25,  this.headSize*0.00)
    this.makeBone('rHipRottr', this.joints.rHip     , 3, color0,  this.headSize*0.00,  this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rKnee'    , this.joints.rHipRottr, 3, color4,  this.headSize*0.00, -this.headSize*2.00,  this.headSize*0.10)
    this.makeBone('rKneeCap' , this.joints.rKnee    , 2, color0,  this.headSize*0.00,  this.headSize*0.00, -this.headSize*0.00)
    this.makeBone('rAnkle'   , this.joints.rKneeCap , 2, color3,  this.headSize*0.00, -this.headSize*1.50, -this.headSize*0.10)
    this.makeBone('rHeel'    , this.joints.rAnkle   , 2, color0,  this.headSize*0.00, -this.headSize*0.00,  this.headSize*0.00)
    this.makeBone('rFoot'    , this.joints.rHeel    , 2, color4,  this.headSize*0.00, -this.headSize*0.00,  this.headSize*0.75)

    // Head
    let geo = new THREE.SphereBufferGeometry(
        this.headSize / 1.5, // radius
        32, // width segments
        32, // height segments
    );
    let textures = ['earth_day.jpg', 'earth_day.jpg', 'earth_night.jpg', 'jupiter.jpg', 'mars.jpg', 'mercury.jpg',
        'moon.jpg', 'neptune.jpg', 'pluto.jpg', 'saturn.jpg', 'sun.jpg', 'uranus.jpg', 'venus_atmo.jpg', 'venus_surface.jpg'];
    let texture = new THREE.TextureLoader().load('./textures/' + textures[Math.floor(Math.random() * textures.length)]);
    let mat = new THREE.MeshPhongMaterial({
        skinning: true,
        color: 0xffffff,
        specular: 0x050505,
        shininess: 100,
        map: texture
    });
    this.makeBone('head', this.joints.neck, 0, 0x000000, 0,0,0, geo, mat);

    // Set some joint ranges of motion, in degrees
    this.joints.lElbow.minFlex          =  -10;
    this.joints.lElbow.maxFlex          =  140;
    this.joints.lForearm.minSpin        =  -80;
    this.joints.lForearm.maxSpin        =   80;
    this.joints.lWrist.minFlex          =  -60;
    this.joints.lWrist.maxFlex          =   60;
    this.joints.lHand.minFlex           =  -20;
    this.joints.lHand.maxFlex           =   30;
    this.joints.lShoulder.minRaise      = -120;
    this.joints.lShoulder.maxRaise      =   90;
    this.joints.lShoulder.minSwing      =  -40;
    this.joints.lShoulder.maxSwing      =  130;
    this.joints.lBicep.minRotate        =  -90;
    this.joints.lBicep.maxRotate        =   90;
    this.joints.lHip.minFlex            =  -30;
    this.joints.lHip.maxFlex            =  120;
    this.joints.lHip.minAbduct          =    0;
    this.joints.lHip.maxAbduct          =   60;
    this.joints.lHipRottr.minRotate     =  -40;
    this.joints.lHipRottr.maxRotate     =   40;
    this.joints.lKnee.minFlex           =   -5;
    this.joints.lKnee.maxFlex           =  150;
    this.joints.lAnkle.minFlex          =  -20;
    this.joints.lAnkle.maxFlex          =   50;
    this.joints.lowerBack.minFlex       =  -25;
    this.joints.lowerBack.maxFlex       =   25;
    this.joints.midBack.minFlex         =  -10;
    this.joints.midBack.maxFlex         =   10;
    this.joints.upperBack.minRotate     =  -45;
    this.joints.upperBack.maxRotate     =   45;
    this.joints.pelvis.minRotate        =  -25;
    this.joints.pelvis.maxRotate        =   25;

    // Some prototypes for body movements
    Robot.prototype.moveLeg = function(side, amountAbduct, amountFlex, t) {
        // If the side isn't left or right, return right away and do nothing
        if (!(side === 'left' || side === 'right')) return;

        // Get the correct joint
        let joint = side === 'left' ? this.joints.lHip : this.joints.rHip;

        // Force the angle to within range of motion
        let angleAbduct = amountAbduct < this.joints.lHip.minAbduct ? this.joints.lHip.minAbduct :
                          amountAbduct > this.joints.lHip.maxAbduct ? this.joints.lHip.maxAbduct : amountAbduct;
        let angleFlex   = amountFlex   < this.joints.lHip.minFlex   ? this.joints.lHip.minFlex   :
                          amountFlex   > this.joints.lHip.maxFlex   ? this.joints.lHip.maxFlex   : amountFlex;

        // Adjust for left vs right side
        angleAbduct = side === 'left' ?  angleAbduct : -angleAbduct;

        // Rotating around x-axis is the same for both sides. Set to negative for more intuitive use.
        angleFlex   = -angleFlex;

        // Slerp calls moved into separate functions for reuse and space-savings.
        slerpXZ(joint, angleFlex, angleAbduct, t);
    }

    Robot.prototype.rotateHip = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lHipRottr : this.joints.rHipRottr;
        let angle = amount < this.joints.lHipRottr.minRotate ? this.joints.lHipRottr.minRotate :
                    amount > this.joints.lHipRottr.maxRotate ? this.joints.lHipRottr.maxRotate : amount;
        angle = side === 'left' ? angle : -angle;
        slerpY(joint, angle, t);
    }

    Robot.prototype.flexAnkle = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lAnkle : this.joints.rAnkle;
        let angle = amount < this.joints.lAnkle.minFlex ? this.joints.lAnkle.minFlex :
                    amount > this.joints.lAnkle.maxFlex ? this.joints.lAnkle.maxFlex : amount;
        slerpX(joint, -angle, t);
    }

    Robot.prototype.flexKnee = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lKnee : this.joints.rKnee;
        let angle = amount < this.joints.lKnee.minFlex ? this.joints.lKnee.minFlex :
                    amount > this.joints.lKnee.maxFlex ? this.joints.lKnee.maxFlex : amount;
        slerpX(joint, angle, t);
    }

    Robot.prototype.flexElbow = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lElbow : this.joints.rElbow;
        let angle = amount < this.joints.lElbow.minFlex ? this.joints.lElbow.minFlex :
                    amount > this.joints.lElbow.maxFlex ? this.joints.lElbow.maxFlex : amount;
        angle = side === 'left' ? -angle : angle;
        slerpY(joint, angle, t);
    }

    Robot.prototype.spinForearm = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lForearm : this.joints.rForearm;
        let angle = amount < this.joints.lForearm.minSpin ? this.joints.lForearm.minSpin :
                    amount > this.joints.lForearm.maxSpin ? this.joints.lForearm.maxSpin : amount;
        slerpX(joint, angle, t);
    }

    Robot.prototype.moveShoulder = function(side, amountSwing, amountRaise, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lShoulder : this.joints.rShoulder;
        let angleSwing = amountSwing < this.joints.lShoulder.minSwing ? this.joints.lShoulder.minSwing :
                         amountSwing > this.joints.lShoulder.maxSwing ? this.joints.lShoulder.maxSwing : amountSwing;
        let angleRaise = amountRaise < this.joints.lShoulder.minRaise ? this.joints.lShoulder.minRaise :
                         amountRaise > this.joints.lShoulder.maxRaise ? this.joints.lShoulder.maxRaise : amountRaise;
        angleSwing = side === 'left' ? -angleSwing : angleSwing;
        angleRaise = side === 'left' ? angleRaise : -angleRaise;
        slerpYZ(joint, angleSwing, angleRaise, t);
    }

    Robot.prototype.rotateShoulder = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lBicep : this.joints.rBicep;
        let angle = amount < this.joints.lBicep.minRotate ? this.joints.lBicep.minRotate :
                    amount > this.joints.lBicep.maxRotate ? this.joints.lBicep.maxRotate : amount;
        slerpX(joint, angle, t);
    }

    Robot.prototype.flexWrist = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lWrist : this.joints.rWrist;
        let angle = amount < this.joints.lWrist.minFlex ? this.joints.lWrist.minFlex :
                    amount > this.joints.lWrist.maxFlex ? this.joints.lWrist.maxFlex : amount;
        angle = side === 'left' ?  angle : -angle;
        slerpZ(joint, angle, t);
    }

    // This is for side to side flexing of the wrist
    Robot.prototype.tiltHand = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lWrist : this.joints.rWrist;
        let angle = amount < this.joints.lHand.minFlex ? this.joints.lHand.minFlex :
                    amount > this.joints.lHand.maxFlex ? this.joints.lHand.maxFlex : amount;
        angle = side === 'left' ?  angle : -angle;
        slerpY(joint, angle, t);
    }

    // Used to tilt the pelvis for kick motion
    Robot.prototype.tiltBody = function(direction, amount, t) {
        let joint = this.joints.pelvis;
        if (direction === 'z') {
            slerpZ(joint, amount, t);
        }
    }

    Robot.prototype.rotateBack = function(amount, t) {
        let joint = this.joints.upperBack;
        let angle = amount < joint.minRotate ? joint.minRotate :
                    amount > joint.maxRotate ? joint.maxRotate : amount;
        slerpY(joint, angle, t);
    }

    Robot.prototype.rotatePelvis = function(amount, t) {
        let joint = this.joints.pelvis;
        let angle = amount < joint.minRotate ? joint.minRotate :
                    amount > joint.maxRotate ? joint.maxRotate : amount;
        slerpY(joint, angle, t);
    }

    Robot.prototype.tiltBack = function(amount, t) {
        let lowBack = this.joints.lowerBack;
        let midBack = this.joints.midBack;
        // Split the flex between two back joints
        let splitLow = amount * 5.0/7.0;
        let splitMid = amount * 2.0/7.0;
        let angleLow = splitLow < lowBack.minFlex ? lowBack.minFlex :
                       splitLow > lowBack.maxFlex ? lowBack.maxFlex : splitLow;
        let angleMid = splitMid < midBack.minFlex ? midBack.minFlex :
                       splitMid > midBack.maxFlex ? midBack.maxFlex : splitMid;
        slerpZ(lowBack, angleLow, t);
        slerpZ(midBack, angleMid, t);
    }

    // Setting T to the conversion from degrees to radians
    const T = Math.PI/180.0;

    function slerpX(joint, angle, t) {
        joint.quaternion.slerp(new THREE.Quaternion(
            Math.sin((angle * T) / 2),
            joint.quaternion.y,
            joint.quaternion.z,
            Math.cos((angle * T) / 2)
        ).normalize(), t);
    }

    function slerpY(joint, angle, t) {
        joint.quaternion.slerp(new THREE.Quaternion(
            joint.quaternion.x,
            Math.sin((angle * T) / 2),
            joint.quaternion.z,
            Math.cos((angle * T) / 2)
        ).normalize(), t);
    }

    function slerpZ(joint, angle, t) {
        joint.quaternion.slerp(new THREE.Quaternion(
            joint.quaternion.x,
            joint.quaternion.y,
            Math.sin((angle * T) / 2),
            Math.cos((angle * T) / 2)
        ).normalize(), t);
    }

    function slerpYZ(joint, angleY, angleZ, t) {
        joint.quaternion.slerp(new THREE.Quaternion(
            joint.quaternion.x,
            Math.sin((angleY * T) / 2),
            Math.sin((angleZ * T) / 2),
            Math.cos((((angleY+angleZ)/2) * T) / 2)
        ).normalize(), t);
    }

    function slerpXZ(joint, angleX, angleZ, t) {
        joint.quaternion.slerp(new THREE.Quaternion(
            Math.sin((angleX * T) / 2),
            joint.quaternion.y,
            Math.sin((angleZ * T) / 2),
            Math.cos((((angleX+angleZ)/2) * T) / 2)
        ).normalize(), t);
    }

    // Set a starting position for the robot. Arms loose at sides
    this.moveShoulder('left', 0, -90, 1);
    this.moveShoulder('right', 0, -90, 1);
    this.flexElbow('left', 20, 1);
    this.flexElbow('right', 20, 1);
    this.spinForearm('left',  60, 1);
    this.spinForearm('right', 60, 1);
    this.flexWrist('left',  20, 1);
    this.flexWrist('right',  10, 1);

    // Save all quaternions as starting positions
    for (let joint in this.joints) {
        this.joints[joint].startingPosition = this.joints[joint].quaternion.clone();
    }

    this.movement = 'startingPose';

    // Let's make an array of dance moves.
    this.danceMoves = [];

    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lHip;
        let angleFlex   = Math.random() * (joint.maxFlex   - joint.minFlex  ) + joint.minFlex;
        let angleAbduct = Math.random() * (joint.maxAbduct - joint.minAbduct) + joint.minAbduct;
        this.moveLeg(side, angleFlex, angleAbduct, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lHipRottr;
        let angle = Math.random() * (joint.maxRotate - joint.minRotate) + joint.minRotate;
        this.rotateHip(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lAnkle;
        let angle = Math.random() * (joint.maxFlex - joint.minFlex) + joint.minFlex;
        this.flexAnkle(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lKnee;
        let angle = Math.random() * (joint.maxFlex - joint.minFlex) + joint.minFlex;
        this.flexKnee(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lElbow;
        let angle = Math.random() * (joint.maxFlex - joint.minFlex) + joint.minFlex;
        this.flexElbow(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lForearm;
        let angle = Math.random() * (joint.maxSpin - joint.minSpin) + joint.minSpin;
        this.spinForearm(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lShoulder;
        let angleSwing = Math.random() * (joint.maxSwing - joint.minSwing) + joint.minSwing;
        let angleRaise = Math.random() * (joint.maxRaise - joint.minRaise) + joint.minRaise;
        this.moveShoulder(side, angleSwing, angleRaise, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lBicep;
        let angle = Math.random() * (joint.maxRotate - joint.minRotate) + joint.minRotate;
        this.rotateShoulder(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lWrist;
        let angle = Math.random() * (joint.maxFlex - joint.minFlex) + joint.minFlex;
        this.flexWrist(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        let joint = this.joints.lHand;
        let angle = Math.random() * (joint.maxFlex - joint.minFlex) + joint.minFlex;
        this.tiltHand(side, angle, speed);
    });
    this.danceMoves.push((speed) => {
        let joint = this.joints.upperBack;
        let angle = Math.random() * (joint.maxRotate - joint.minRotate) + joint.minRotate;
        this.rotateBack(angle, speed);
    });
    this.danceMoves.push((speed) => {
        let lowBack = this.joints.lowerBack;
        let midBack = this.joints.midBack;
        let magnitude = (lowBack.maxFlex+midBack.maxFlex - lowBack.minFlex-midBack.minFlex);
        let angle = Math.random() * magnitude  + lowBack.minFlex+midBack.minFlex;
        this.tiltBack(angle, speed);
    });

    // And some pre-set pose functions
    Robot.prototype.setRaiseLeftArmPose = function(t) {
        this.moveShoulder('left', 0, 90, t);
        this.rotateShoulder('left', -90, t);
        this.flexElbow('left', 20, t);
        this.spinForearm('left',  0, t);
        this.flexWrist('left', 0, t);
    }

    Robot.prototype.setLowerLeftArmPose = function(t) {
        this.moveShoulder('left', 0, -90, t);
        this.rotateShoulder('left', 0, t);
        this.flexElbow('left', 20, t);
        this.spinForearm('left',  0, t);
        this.flexWrist('left', 0, t);
    }

    Robot.prototype.setWavePose = function(t) {
        let minElbow = 30;
        let maxElbow = 60;
        let maxHand =  20;
        let minHand = -10;
        // periodic function allows repeated hand waving
        let elbowFlex = Math.sin(this.waveTimer) * (maxElbow-minElbow) + minElbow;
        let handTilt = -Math.sin(this.waveTimer) * (maxHand-minHand) + minHand;
        this.moveShoulder('right', 0, 50, t);
        this.rotateShoulder('right', -90, t);
        this.spinForearm('right', -40, t);
        this.flexElbow('right', elbowFlex, t);
        this.tiltHand('right',  handTilt, t);
        this.flexWrist('right', 0, t);
        this.waveTimer = (this.waveTimer + t) % 360;
    }

    Robot.prototype.setArmsCrossPose = function(t) {
        this.moveShoulder('left', 90, -50, t);
        this.moveShoulder('right', 90, -50, t);
        this.rotateShoulder('left', 40, t);
        this.rotateShoulder('right', 20, t);
        this.flexElbow('left', 100, t);
        this.flexElbow('right', 110, t);
        this.spinForearm('left',  20, t);
        this.spinForearm('right', 20, t);
        this.flexWrist('left',  50, t);
        this.flexWrist('right', -50, t);
    }

    // Step one is to get on one leg, raised leg bent (ready to kick out)
    Robot.prototype.setKickPoseStepOne = function(t) {
        this.rotateHip('left', 40, t);
        this.rotateHip('right', 50, t);
        this.tiltBody('z', -60, t);
        this.tiltBack(35, t);
        this.rotateBack(-35, t);
        this.moveLeg('left', 60,0, t);
        this.moveLeg('right', 60,120, t);
        this.flexKnee('right', 120, t)
        this.moveShoulder('left', 60, -40, t);
        this.moveShoulder('right', -30, -90, t);
        this.rotateShoulder('left', 10, t);
        this.rotateShoulder('right', -20, t);
        this.flexElbow('left', 130, t);
        this.flexElbow('right', 110, t);
        this.spinForearm('left',  60, t);
        this.spinForearm('right', 60, t);
        this.flexWrist('left', 20, t);
        this.flexWrist('right', 0, t);
    }

    // Step two quickly extends the foot by un-bending knee and hip
    Robot.prototype.setKickPoseStepTwo = function(t) {
        this.rotateHip('left', 40, t);
        this.rotateHip('right', 40, t);
        this.tiltBody('z', -60, t);
        this.tiltBack(35, t);
        this.rotateBack(-35, t);
        this.moveLeg('left', 60, 0, t);
        this.moveLeg('right', 60, 0, t);
        this.flexKnee('right', -10, t)
        this.moveShoulder('left', 60, -40, t);
        this.moveShoulder('right', -30, -90, t);
        this.rotateShoulder('left', 10, t);
        this.rotateShoulder('right', -20, t);
        this.flexElbow('left', 130, t);
        this.flexElbow('right', 110, t);
        this.spinForearm('left', 60, t);
        this.spinForearm('right', 60, t);
        this.flexWrist('left', 20, t);
        this.flexWrist('right', 0, t);
    }

    Robot.prototype.setKickPose = function(t) {
        // This waits for the lower back to get in position before step two
        if (this.joints.lowerBack.quaternion.z < 0.21) {
            this.setKickPoseStepOne(t);
        } else {
            // 4x as fast, for snappy kick action
            this.setKickPoseStepTwo(4*t <= 1 ? 4*t : 1);
            // kickTimer allows the robot to hold the pose for about a second after knee is extended
            if (this.joints.rKnee.quaternion.x < 0.04 && this.kickTimer++ > 60) {
                this.movement = 'startingPose';
            }
        }
    }

    Robot.prototype.setWalkStepOne = function(t) {
        let side1 = this.stepSide ? 'left' : 'right';
        let side2 = this.stepSide ? 'right' : 'left';
        // side1 is the leg that goes from the front to the back (the leg with a foot on the ground)
        this.moveLeg(side1, 0, -30, t);
        this.flexKnee(side1, 35, t);
        this.flexAnkle(side1, -20, t);

        // side2 is the leg that is moving towards the front, lifted off the ground
        this.moveLeg(side2, 0, 30, t);
        this.flexKnee(side2, 20, t);
        this.flexAnkle(side2, 0, t);

        // Some spinal rotation for a more natural appearance
        this.rotatePelvis(this.stepSide ? 7 : -7, t);
        this.rotateBack(this.stepSide ? -15 : 15, t);

        // And some arm swinging to go with it
        this.moveShoulder(side1, 20, -90, t);
        this.moveShoulder(side2, -20, -90, t);
        this.flexElbow(side1, 40,t);
        this.flexElbow(side2, 20, t);

        if (Math.abs(this.joints.pelvis.quaternion.y) > 0.048) {
            this.stepSide = !this.stepSide; // This is where the leg directions switch
            this.movement = 'walk2'
        }
    }

    Robot.prototype.setWalkStepTwo = function(t) {
        let side1 = this.stepSide ? 'left' : 'right';
        let side2 = this.stepSide ? 'right' : 'left';
        this.moveLeg(side1, 0, 20, t);
        this.flexKnee(side1, 40, t);
        this.flexAnkle(side1, 15, t);

        this.moveLeg(side2, 0, -10, t);
        this.flexKnee(side2, 100, t);
        this.flexAnkle(side2, -10, t);

        this.rotatePelvis(this.stepSide ? -3.5 : 3.5, t);
        this.rotateBack(this.stepSide ? 7.5 : -7.5, t);

        this.moveShoulder(side1, -10, -90, t);
        this.moveShoulder(side2, 10, -90, t);
        this.flexElbow(side1, 30,t);
        this.flexElbow(side2, 20, t);

        if (Math.abs(this.joints.pelvis.quaternion.y) < 0.040) {
            this.movement = 'walk3'
        }
    }
    Robot.prototype.setWalkStepThree = function(t) {
        let side1 = this.stepSide ? 'left' : 'right';
        let side2 = this.stepSide ? 'right' : 'left';
        this.moveLeg(side1, 0, 0, t);
        this.flexKnee(side1, 10, t);
        this.flexAnkle(side1, 5, t);

        this.moveLeg(side2, 0, 50, t*0.8);
        this.flexKnee(side2, 130, t);
        this.flexAnkle(side2, 0, t);

        this.rotatePelvis(0, t);
        this.rotateBack(0, t);

        this.moveShoulder(side1, 0, -90, t);
        this.moveShoulder(side2, 0, -90, t);
        this.flexElbow(side1, 20,t);
        this.flexElbow(side2, 20, t);

        if (Math.abs(this.joints.pelvis.quaternion.y) < 0.015) {
            this.movement = 'walk4'
        }
    }
    Robot.prototype.setWalkStepFour = function(t) {
        let side1 = this.stepSide ? 'left' : 'right';
        let side2 = this.stepSide ? 'right' : 'left';
        this.moveLeg(side1, 0, -20, t);
        this.flexKnee(side1, 40, t);
        this.flexAnkle(side1, 35, t);

        this.moveLeg(side2, 0, 50, t);
        this.flexKnee(side2, 30, t);
        this.flexAnkle(side2, 10, t);

        this.rotatePelvis(this.stepSide ? 3.5 : -3.5, t);
        this.rotateBack(this.stepSide ? -7.5 : 7.5, t);

        this.moveShoulder(side1, 10, -90, t);
        this.moveShoulder(side2, -10, -90, t);
        this.flexElbow(side1, 30,t);
        this.flexElbow(side2, 20, t);

        if (Math.abs(this.joints.pelvis.quaternion.y) > 0.020) {
            this.movement = 'walk1'
        }
    }

    // This method keeps the robot rooted to the ground (assuming the floor is at y=0)
    // It also processes the movement of the robot, based on whichever foot is moving from front to back
    Robot.prototype.adjustPosition = function() {
        // Get the ankle/foot positions of both legs, relative to the world
        let l1 = new THREE.Vector3();
        let r1 = new THREE.Vector3();
        let l2 = new THREE.Vector3();
        let r2 = new THREE.Vector3();
        this.joints.lAnkle.getWorldPosition(l1);
        this.joints.rAnkle.getWorldPosition(r1);
        this.joints.lFoot.getWorldPosition(l2);
        this.joints.rFoot.getWorldPosition(r2);
        // Calculate the difference in x, z position of each ankle between this frame and the last
        let dx = 0;
        let dz = 0;
        if (this.movement.includes("walk")) {
            let lAnklePos = new THREE.Vector3();
            let rAnklePos = new THREE.Vector3();
            let pelvisPos = new THREE.Vector3();
            this.joints.lAnkle.getWorldPosition(lAnklePos);
            this.joints.rAnkle.getWorldPosition(rAnklePos);
            this.joints.pelvis.getWorldPosition(pelvisPos);
            let currentLDiff = lAnklePos.sub(pelvisPos);
            let currentRDiff = rAnklePos.sub(pelvisPos);
            // Pick which leg is driving the robot
            let currentDiff  = this.stepSide ? currentLDiff : currentRDiff;
            let previousDiff = this.stepSide ? this.previousLDiff : this.previousRDiff;
            // Calculate the difference in x,z position
            dx = previousDiff.x - currentDiff.x;
            dz = previousDiff.z - currentDiff.z;
            // Record the differences for the next frame
            this.previousLDiff = currentLDiff;
            this.previousRDiff = currentRDiff;
        }
        // Finally, set the robot's position using the above calculations
        this.root.position.set(
            this.root.position.x + dx,
            this.root.position.y - Math.min(l1.y, l2.y, r1.y, r2.y)+1, // +1 to keep the foot on top of floor
            this.root.position.z + dz
        );
    }

    Robot.prototype.setResetPose = function(t) {
        for (let joint in this.joints) {
            this.joints[joint].quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), t);
        }
    }

    Robot.prototype.setStartingPose = function(t) {
        for (let joint in this.joints) {
            this.joints[joint].quaternion.slerp(this.joints[joint].startingPosition, t);
        }
    }

    Robot.prototype.setDance = function() {
        let move = Math.floor(Math.random() * this.danceMoves.length);
        let speed = Math.random() * (0.2 - 0.01) + 0.2
        this.danceMoves[move](speed);
    }

    Robot.prototype.show = function (scene) {
        scene.add(this.root);
        for (let i in this.meshes) {
            scene.add(this.meshes[i]);
        }

        // Leaving this here, but commented out.
        // const rGroup = new THREE.Group();
        // rGroup.add(this.root);
        // const helper = new THREE.SkeletonHelper(rGroup);
        // helper.material.linewidth = 3; // make the skeleton thick (doesn't work on my machine)
        // scene.add(rGroup);
        // scene.add(helper);
    }

    Robot.prototype.checkForCollisions = function(floor, robots) {
        // Check for walking off the floor. There's a 5 unit buffer
        if (this.root.position.x > floor.position.x + floor.geometry.parameters.width/2 - 5 ||
            this.root.position.x < floor.position.x - floor.geometry.parameters.width/2 + 5 ||
            this.root.position.z > floor.position.z + floor.geometry.parameters.height/2 - 5||
            this.root.position.z < floor.position.z - floor.geometry.parameters.height/2 + 5) {
            // Rotate by 180 +- 20 degrees
            this.root.rotateY((Math.random() * 40 + 160) * Math.PI/180);
        }
        // Check for collisions with other robots
        for (let i in robots) {
            if (this === robots[i]) continue; // Don't collide with self!
            if (this.root.position.distanceTo(robots[i].root.position) < 40) {
                this.root.rotateY((Math.random() * 40 + 160) * Math.PI/180);
            }
        }
        for (let i in pillars) {
            if (this.root.position.distanceTo(pillars[i].position) < 40) {
                this.root.rotateY((Math.random() * 40 + 160) * Math.PI/180);
            }
        }
    }

    Robot.prototype.raise_left_arm  = function() { this.movement = 'raise_left_arm'; }
    Robot.prototype.lower_left_arm  = function() { this.movement = 'lower_left_arm'; }
    Robot.prototype.resetPose       = function() { this.movement = 'resetPose';      }
    Robot.prototype.startingPose    = function() { this.movement = 'startingPose';   }
    Robot.prototype.crossArms       = function() { this.movement = 'crossArms';      }
    Robot.prototype.dance           = function() { this.movement = 'dance';          }
    Robot.prototype.walk = function() {
        // Used to determine which foot is stepping. true means left foot moving from front to back.
        this.stepSide = true;
        // Used to set position when walking
        this.previousLDiff = new THREE.Vector3(0,0,0);
        this.previousRDiff = new THREE.Vector3(0,0,0);
        this.setStartingPose(1);
        this.movement = 'walk3';
    }
    Robot.prototype.wave = function() {
        this.waveTimer = 0;
        this.movement = 'wave';
    }
    Robot.prototype.kick = function() {
        this.kickTimer = 0;
        this.movement = 'kick';
    }

    Robot.prototype.onAnimate = function(floor, robots, pillars) {
        this.adjustPosition();
        this.checkForCollisions(floor, robots, pillars);
        if (this.movement === 'raise_left_arm')         this.setRaiseLeftArmPose(0.05);
        else if (this.movement === 'lower_left_arm')    this.setLowerLeftArmPose(0.05);
        else if (this.movement === 'startingPose')      this.setStartingPose(0.05);
        else if (this.movement === 'resetPose')         this.setResetPose(0.1);
        else if (this.movement === 'wave')              this.setWavePose(0.1);
        else if (this.movement === 'crossArms')         this.setArmsCrossPose(0.05);
        else if (this.movement === 'kick')              this.setKickPose(0.05);
        else if (this.movement === 'dance')             this.setDance();
        else if (this.movement === 'walk1')             this.setWalkStepOne(0.1);
        else if (this.movement === 'walk2')             this.setWalkStepTwo(0.1);
        else if (this.movement === 'walk3')             this.setWalkStepThree(0.1);
        else if (this.movement === 'walk4')             this.setWalkStepFour(0.1);
    }
}