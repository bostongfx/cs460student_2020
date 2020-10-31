function Robot(x, y, z, size) {
    // The human body is approximately 7.5-8 heads in height.
    this.headSize = size/8.0;
    this.joints = {};

    // Main trunk
    this.joints.pelvis    = new THREE.Bone();
    this.joints.lowerBack = new THREE.Bone();
    this.joints.midBack   = new THREE.Bone();
    this.joints.upperBack = new THREE.Bone();
    this.joints.neck      = new THREE.Bone();
    this.joints.head      = new THREE.Bone();
    this.joints.pelvis    .add(this.joints.lowerBack);
    this.joints.lowerBack .add(this.joints.midBack);
    this.joints.midBack   .add(this.joints.upperBack);
    this.joints.upperBack .add(this.joints.neck);
    this.joints.neck      .add(this.joints.head);

    // Left arm
    this.joints.lCollar   = new THREE.Bone();
    this.joints.lShoulder = new THREE.Bone();
    this.joints.lElbow    = new THREE.Bone();
    this.joints.lWrist    = new THREE.Bone();
    this.joints.lHand     = new THREE.Bone();
    this.joints.upperBack .add(this.joints.lCollar);
    this.joints.lCollar   .add(this.joints.lShoulder);
    this.joints.lShoulder .add(this.joints.lElbow);
    this.joints.lElbow    .add(this.joints.lWrist);
    this.joints.lWrist    .add(this.joints.lHand);

    // Right arm
    this.joints.rCollar   = new THREE.Bone();
    this.joints.rShoulder = new THREE.Bone();
    this.joints.rElbow    = new THREE.Bone();
    this.joints.rWrist    = new THREE.Bone();
    this.joints.rHand     = new THREE.Bone();
    this.joints.upperBack .add(this.joints.rCollar);
    this.joints.rCollar   .add(this.joints.rShoulder);
    this.joints.rShoulder .add(this.joints.rElbow);
    this.joints.rElbow    .add(this.joints.rWrist);
    this.joints.rWrist    .add(this.joints.rHand);

    // Left leg
    this.joints.lHip      = new THREE.Bone();
    this.joints.lKnee     = new THREE.Bone();
    this.joints.lAnkle    = new THREE.Bone();
    this.joints.lfoot     = new THREE.Bone();
    this.joints.pelvis    .add(this.joints.lHip);
    this.joints.lHip      .add(this.joints.lKnee);
    this.joints.lKnee     .add(this.joints.lAnkle);
    this.joints.lAnkle    .add(this.joints.lfoot);

    // Right leg
    this.joints.rHip      = new THREE.Bone();
    this.joints.rKnee     = new THREE.Bone();
    this.joints.rAnkle    = new THREE.Bone();
    this.joints.rfoot     = new THREE.Bone();
    this.joints.pelvis    .add(this.joints.rHip);
    this.joints.rHip      .add(this.joints.rKnee);
    this.joints.rKnee     .add(this.joints.rAnkle);
    this.joints.rAnkle    .add(this.joints.rfoot);

    // Set up initial skeletal position
    this.joints.pelvis   .position.set( x                 ,  y/2               ,  z                 );
    // Main trunk goes straight up
    this.joints.lowerBack.position.set( this.headSize*0.00,  this.headSize*0.75,  this.headSize*0.00);
    this.joints.midBack  .position.set( this.headSize*0.00,  this.headSize*0.75,  this.headSize*0.00);
    this.joints.upperBack.position.set( this.headSize*0.00,  this.headSize*1.00,  this.headSize*0.00);
    this.joints.neck     .position.set( this.headSize*0.00,  this.headSize*0.50,  this.headSize*0.00);
    this.joints.head     .position.set( this.headSize*0.00,  this.headSize*0.25,  this.headSize*0.00);
    // Skeleton frame looks really weird with a long head, so setting head to smaller than headSize.

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

    // Set some joint ranges of motion. Degrees converted to radians.
    this.joints.lHip.minX       = -120 * (Math.PI/180.0);
    this.joints.lHip.maxX       =   30 * (Math.PI/180.0);
    this.joints.lHip.minY       =  -40 * (Math.PI/180.0);
    this.joints.lHip.maxY       =   40 * (Math.PI/180.0);
    this.joints.lHip.minZ       =  -10 * (Math.PI/180.0);
    this.joints.lHip.maxZ       =   40 * (Math.PI/180.0);
    this.joints.rHip.minX       = -120 * (Math.PI/180.0);
    this.joints.rHip.maxX       =   30 * (Math.PI/180.0);
    this.joints.rHip.minY       =  -40 * (Math.PI/180.0);
    this.joints.rHip.maxY       =   40 * (Math.PI/180.0);
    this.joints.rHip.minZ       =  -40 * (Math.PI/180.0);
    this.joints.rHip.maxZ       =   10 * (Math.PI/180.0);

    this.joints.lKnee.minX      =    0 * (Math.PI/180.0);
    this.joints.lKnee.maxX      =  150 * (Math.PI/180.0);
    this.joints.lKnee.minY      =    0 * (Math.PI/180.0);
    this.joints.lKnee.maxY      =    0 * (Math.PI/180.0);
    this.joints.lKnee.minZ      =    0 * (Math.PI/180.0);
    this.joints.lKnee.maxZ      =    0 * (Math.PI/180.0);
    this.joints.rKnee.minX      =    0 * (Math.PI/180.0);
    this.joints.rKnee.maxX      =  150 * (Math.PI/180.0);
    this.joints.rKnee.minY      =    0 * (Math.PI/180.0);
    this.joints.rKnee.maxY      =    0 * (Math.PI/180.0);
    this.joints.rKnee.minZ      =    0 * (Math.PI/180.0);
    this.joints.rKnee.maxZ      =    0 * (Math.PI/180.0);

    this.joints.lfoot.minX      =  -20 * (Math.PI/180.0);
    this.joints.lfoot.maxX      =   50 * (Math.PI/180.0);
    this.joints.lfoot.minY      =    0 * (Math.PI/180.0);
    this.joints.lfoot.maxY      =    0 * (Math.PI/180.0);
    this.joints.lfoot.minZ      =    0 * (Math.PI/180.0);
    this.joints.lfoot.maxZ      =    0 * (Math.PI/180.0);
    this.joints.rfoot.minX      =  -20 * (Math.PI/180.0);
    this.joints.rfoot.maxX      =   50 * (Math.PI/180.0);
    this.joints.rfoot.minY      =    0 * (Math.PI/180.0);
    this.joints.rfoot.maxY      =    0 * (Math.PI/180.0);
    this.joints.rfoot.minZ      =    0 * (Math.PI/180.0);
    this.joints.rfoot.maxZ      =    0 * (Math.PI/180.0);

    this.joints.lowerBack.minX  =  -20 * (Math.PI/180.0);
    this.joints.lowerBack.maxX  =   50 * (Math.PI/180.0);
    this.joints.lowerBack.minY  =    0 * (Math.PI/180.0);
    this.joints.lowerBack.maxY  =    0 * (Math.PI/180.0);
    this.joints.lowerBack.minZ  =  -35 * (Math.PI/180.0);
    this.joints.lowerBack.maxZ  =   35 * (Math.PI/180.0);

    this.joints.lShoulder.minX  = -180 * (Math.PI/180.0);
    this.joints.lShoulder.maxX  =   50 * (Math.PI/180.0);
    this.joints.lShoulder.minY  = -120 * (Math.PI/180.0);
    this.joints.lShoulder.maxY  =   30 * (Math.PI/180.0);
    this.joints.lShoulder.minZ  = -130 * (Math.PI/180.0);
    this.joints.lShoulder.maxZ  =   90 * (Math.PI/180.0);
    this.joints.rShoulder.minX  = -180 * (Math.PI/180.0);
    this.joints.rShoulder.maxX  =   50 * (Math.PI/180.0);
    this.joints.rShoulder.minY  =  -30 * (Math.PI/180.0);
    this.joints.rShoulder.maxY  =  120 * (Math.PI/180.0);
    this.joints.rShoulder.minZ  =  -90 * (Math.PI/180.0);
    this.joints.rShoulder.maxZ  =  130 * (Math.PI/180.0);

    this.joints.lElbow.minX     =  -80 * (Math.PI/180.0);
    this.joints.lElbow.maxX     =   80 * (Math.PI/180.0);
    this.joints.lElbow.minY     = -140 * (Math.PI/180.0);
    this.joints.lElbow.maxY     =   10 * (Math.PI/180.0);
    this.joints.lElbow.minZ     =    0 * (Math.PI/180.0);
    this.joints.lElbow.maxZ     =    0 * (Math.PI/180.0);
    this.joints.rElbow.minX     =  -80 * (Math.PI/180.0);
    this.joints.rElbow.maxX     =   80 * (Math.PI/180.0);
    this.joints.rElbow.minY     =  -10 * (Math.PI/180.0);
    this.joints.rElbow.maxY     =  140 * (Math.PI/180.0);
    this.joints.rElbow.minZ     =    0 * (Math.PI/180.0);
    this.joints.rElbow.maxZ     =    0 * (Math.PI/180.0);

    this.joints.lWrist.minX     =    0 * (Math.PI/180.0);
    this.joints.lWrist.maxX     =    0 * (Math.PI/180.0);
    this.joints.lWrist.minY     =  -20 * (Math.PI/180.0);
    this.joints.lWrist.maxY     =   30 * (Math.PI/180.0);
    this.joints.lWrist.minZ     =  -60 * (Math.PI/180.0);
    this.joints.lWrist.maxZ     =   60 * (Math.PI/180.0);
    this.joints.rWrist.minX     =    0 * (Math.PI/180.0);
    this.joints.rWrist.maxX     =    0 * (Math.PI/180.0);
    this.joints.rWrist.minY     =  -30 * (Math.PI/180.0);
    this.joints.rWrist.maxY     =   20 * (Math.PI/180.0);
    this.joints.rWrist.minZ     =  -60 * (Math.PI/180.0);
    this.joints.rWrist.maxZ     =   60 * (Math.PI/180.0);

    // Now set the starting rotations. Going for an arms crossed pose.
    const T = Math.PI;
    // Shoulders forward and down a bit.
    this.joints.lShoulder.quaternion.copy(new THREE.Quaternion(
        Math.sin((-0.0*T)/2),
        Math.sin((-0.4*T)/2),
        Math.sin((-0.4*T)/2),
        Math.cos((-0.4*T)/2)).normalize());
    this.joints.rShoulder.quaternion.copy(new THREE.Quaternion(
        Math.sin((-0.0*T)/2),
        Math.sin(( 0.4*T)/2),
        Math.sin(( 0.3*T)/2),
        Math.cos(( 0.4*T)/2)).normalize());

    // Elbows bent and slightly rotated
    this.joints.lElbow.quaternion.copy(new THREE.Quaternion(
        Math.sin(( 0.3*T)/2),
        Math.sin((-0.7*T)/2),
        0,
        Math.cos((-0.6*T)/2)).normalize());
    this.joints.rElbow.quaternion.copy(new THREE.Quaternion(
        Math.sin(( 0.2*T)/2),
        Math.sin(( 0.7*T)/2),
        0,
        Math.cos(( 0.6*T)/2)).normalize());

    // Left wrist angles up a bit, right wrist angles down.
    this.joints.lWrist.quaternion.copy(new THREE.Quaternion(
        0,
        0,
        Math.sin(( 0.1*T)/2),
        Math.cos(( 0.1*T)/2)).normalize());
    this.joints.rWrist.quaternion.copy(new THREE.Quaternion(
        0,
        Math.sin(( 0.1*T)/2),
        Math.sin(( 0.3*T)/2),
        Math.cos(( 0.3*T)/2)).normalize());

    // Give the back a slight arch
    this.joints.lowerBack.quaternion.copy(new THREE.Quaternion(Math.sin((-0.02*T)/2), 0, 0,  Math.cos((-0.02*T)/2)));
    this.joints.midBack.quaternion.copy(new THREE.Quaternion(Math.sin(( 0.02*T)/2), 0, 0, Math.cos(( 0.02*T)/2)));

    // Save all quaternions into starting positions
    for (let joint in this.joints) {
        this.joints[joint].startingPosition = this.joints[joint].quaternion.clone();
    }

    Robot.prototype.show = function (scene) {
        const rGroup = new THREE.Group();
        rGroup.add(this.joints.pelvis);
        const helper = new THREE.SkeletonHelper(rGroup);
        helper.material.linewidth = 3; // make the skeleton thick (doesn't work on my machine)
        scene.add(rGroup);
        scene.add(helper);
    }

    Robot.prototype.raise_left_arm = function() {
        this.movement = 'raise_left_arm';
    }

    Robot.prototype.lower_left_arm = function() {
        this.movement = 'lower_left_arm';
    }

    Robot.prototype.kick = function() {
        this.movement = 'kick';
    }

    Robot.prototype.onAnimate = function() {
        if (this.movement === 'raise_left_arm') {
            // todo
        } else if (this.movement === 'lower_left_arm') {
            // todo
        } else if (this.movement === 'kick') {
            // todo
        }
    }


}