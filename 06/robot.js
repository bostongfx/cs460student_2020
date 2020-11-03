function Robot(x, y, z, size) {
    // The human body is approximately 7.5-8 heads in height.
    this.size = size;
    this.headSize = size/8.0;
    this.joints = {};
    this.xOffset = x;
    this.yOffset = y;
    this.zOffset = z;

    // Main trunk
    this.joints.pelvis      = new THREE.Bone();
    this.joints.lowerBack   = new THREE.Bone();
    this.joints.midBack     = new THREE.Bone();
    this.joints.upperBack   = new THREE.Bone();
    this.joints.neck        = new THREE.Bone();
    this.joints.head        = new THREE.Bone();
    this.joints.pelvis      .add(this.joints.lowerBack);
    this.joints.lowerBack   .add(this.joints.midBack);
    this.joints.midBack     .add(this.joints.upperBack);
    this.joints.upperBack   .add(this.joints.neck);
    this.joints.neck        .add(this.joints.head);

    // Left arm
    this.joints.lCollar     = new THREE.Bone();
    this.joints.lShoulder   = new THREE.Bone();
    this.joints.lBicep      = new THREE.Bone();
    this.joints.lElbow      = new THREE.Bone();
    this.joints.lForearm    = new THREE.Bone();
    this.joints.lWrist      = new THREE.Bone();
    this.joints.lHand       = new THREE.Bone();
    this.joints.upperBack   .add(this.joints.lCollar);
    this.joints.lCollar     .add(this.joints.lShoulder);
    this.joints.lShoulder   .add(this.joints.lBicep);
    this.joints.lBicep      .add(this.joints.lElbow);
    this.joints.lElbow      .add(this.joints.lForearm);
    this.joints.lForearm    .add(this.joints.lWrist);
    this.joints.lWrist      .add(this.joints.lHand);

    // Right arm
    this.joints.rCollar     = new THREE.Bone();
    this.joints.rShoulder   = new THREE.Bone();
    this.joints.rBicep      = new THREE.Bone();
    this.joints.rElbow      = new THREE.Bone();
    this.joints.rForearm    = new THREE.Bone();
    this.joints.rWrist      = new THREE.Bone();
    this.joints.rHand       = new THREE.Bone();
    this.joints.upperBack   .add(this.joints.rCollar);
    this.joints.rCollar     .add(this.joints.rShoulder);
    this.joints.rShoulder   .add(this.joints.rBicep);
    this.joints.rBicep      .add(this.joints.rElbow);
    this.joints.rElbow      .add(this.joints.rForearm);
    this.joints.rForearm    .add(this.joints.rWrist);
    this.joints.rWrist      .add(this.joints.rHand);

    // Left leg
    this.joints.lHip        = new THREE.Bone();
    this.joints.lHipRotator = new THREE.Bone();
    this.joints.lKnee       = new THREE.Bone();
    this.joints.lAnkle      = new THREE.Bone();
    this.joints.lfoot       = new THREE.Bone();
    this.joints.pelvis      .add(this.joints.lHip);
    this.joints.lHip        .add(this.joints.lHipRotator);
    this.joints.lHipRotator .add(this.joints.lKnee);
    this.joints.lKnee       .add(this.joints.lAnkle);
    this.joints.lAnkle      .add(this.joints.lfoot);

    // Right leg
    this.joints.rHip        = new THREE.Bone();
    this.joints.rHipRotator = new THREE.Bone();
    this.joints.rKnee       = new THREE.Bone();
    this.joints.rAnkle      = new THREE.Bone();
    this.joints.rfoot       = new THREE.Bone();
    this.joints.pelvis      .add(this.joints.rHip);
    this.joints.rHip        .add(this.joints.rHipRotator);
    this.joints.rHipRotator .add(this.joints.rKnee);
    this.joints.rKnee       .add(this.joints.rAnkle);
    this.joints.rAnkle      .add(this.joints.rfoot);

    // Set up initial skeletal position
    // Main trunk goes straight up from pelvis
    this.joints.pelvis   .position.set( x                 ,  y+size/2          ,  z                 );
    this.joints.lowerBack.position.set( this.headSize*0.00,  this.headSize*0.75,  this.headSize*0.00);
    this.joints.midBack  .position.set( this.headSize*0.00,  this.headSize*0.75,  this.headSize*0.00);
    this.joints.upperBack.position.set( this.headSize*0.00,  this.headSize*1.00,  this.headSize*0.00);
    this.joints.neck     .position.set( this.headSize*0.00,  this.headSize*0.50,  this.headSize*0.00);
    this.joints.head     .position.set( this.headSize*0.00,  this.headSize*0.25,  this.headSize*0.00);
    // Skeleton frame looks really weird with a long head, so head is set to smaller than 'headSize'.

    // Arms go mostly out, with vertical variation.
    this.joints.lCollar  .position.set( this.headSize*0.20,  this.headSize*0.35,  this.headSize*0.00);
    this.joints.lShoulder.position.set( this.headSize*0.50, -this.headSize*0.15,  this.headSize*0.00);
    this.joints.lElbow   .position.set( this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00);
    this.joints.lWrist   .position.set( this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00);
    this.joints.lHand    .position.set( this.headSize*0.75,  this.headSize*0.00,  this.headSize*0.00);

    this.joints.rCollar  .position.set(-this.headSize*0.20,  this.headSize*0.35,  this.headSize*0.00);
    this.joints.rShoulder.position.set(-this.headSize*0.50, -this.headSize*0.15,  this.headSize*0.00);
    this.joints.rElbow   .position.set(-this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00);
    this.joints.rWrist   .position.set(-this.headSize*1.00,  this.headSize*0.00,  this.headSize*0.00);
    this.joints.rHand    .position.set(-this.headSize*0.75,  this.headSize*0.00,  this.headSize*0.00);

    // Legs go mostly down, with some z variation in knees and ankles
    this.joints.lHip     .position.set( this.headSize*0.50, -this.headSize*0.25,  this.headSize*0.00);
    this.joints.lKnee    .position.set( this.headSize*0.00, -this.headSize*2.00,  this.headSize*0.10);
    this.joints.lAnkle   .position.set( this.headSize*0.00, -this.headSize*1.50, -this.headSize*0.10);
    this.joints.lfoot    .position.set( this.headSize*0.00, -this.headSize*0.00,  this.headSize*0.75);

    this.joints.rHip     .position.set(-this.headSize*0.50, -this.headSize*0.25,  this.headSize*0.00);
    this.joints.rKnee    .position.set( this.headSize*0.00, -this.headSize*2.00,  this.headSize*0.10);
    this.joints.rAnkle   .position.set( this.headSize*0.00, -this.headSize*1.50, -this.headSize*0.10);
    this.joints.rfoot    .position.set( this.headSize*0.00, -this.headSize*0.00,  this.headSize*0.75);

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
    this.joints.lHipRotator.minRotate   =  -40;
    this.joints.lHipRotator.maxRotate   =   40;
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
        let joint = side === 'left' ? this.joints.lHipRotator : this.joints.rHipRotator;
        let angle = amount < this.joints.lHipRotator.minRotate ? this.joints.lHipRotator.minRotate :
                    amount > this.joints.lHipRotator.maxRotate ? this.joints.lHipRotator.maxRotate : amount;
        angle = side === 'left' ? angle : -angle;
        slerpY(joint, angle, t);
    }

    Robot.prototype.flexAnkle = function(side, amount, t) {
        if (!(side === 'left' || side === 'right')) return;
        let joint = side === 'left' ? this.joints.lAnkle : this.joints.rAnkle;
        let angle = amount < this.joints.lAnkle.minFlex ? this.joints.lAnkle.minFlex :
                    amount > this.joints.lAnkle.maxFlex ? this.joints.lAnkle.maxFlex : amount;
        angle = side === 'left' ? -angle : angle;
        slerpX(joint, angle, t);
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
        let joint = this.joints.lHipRotator;
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
        const rGroup = new THREE.Group();
        rGroup.add(this.joints.pelvis);
        const helper = new THREE.SkeletonHelper(rGroup);
        helper.material.linewidth = 3; // make the skeleton thick (doesn't work on my machine)
        scene.add(rGroup);
        scene.add(helper);
    }

    Robot.prototype.raise_left_arm  = function() { this.movement = 'raise_left_arm'; }
    Robot.prototype.lower_left_arm  = function() { this.movement = 'lower_left_arm'; }
    Robot.prototype.resetPose       = function() { this.movement = 'resetPose';      }
    Robot.prototype.startingPose    = function() { this.movement = 'startingPose';   }
    Robot.prototype.crossArms       = function() { this.movement = 'crossArms';      }
    Robot.prototype.dance           = function() { this.movement = 'dance';          }
    Robot.prototype.wave = function() {
        this.waveTimer = 0;
        this.movement = 'wave';
    }
    Robot.prototype.kick = function() {
        this.kickTimer = 0;
        this.movement = 'kick';
    }

    Robot.prototype.onAnimate = function() {
        if (this.movement === 'raise_left_arm')         this.setRaiseLeftArmPose(0.05);
        else if (this.movement === 'lower_left_arm')    this.setLowerLeftArmPose(0.05);
        else if (this.movement === 'startingPose')      this.setStartingPose(0.05);
        else if (this.movement === 'resetPose')         this.setResetPose(0.1);
        else if (this.movement === 'wave')              this.setWavePose(0.1);
        else if (this.movement === 'crossArms')         this.setArmsCrossPose(0.05);
        else if (this.movement === 'kick')              this.setKickPose(0.05);
        else if (this.movement === 'dance')             this.setDance();
    }
}