Monk = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.done = 0;
};

Monk.prototype.init = function (objectloader, animloader, scene, mixers, pose) {

    objectloader.load('monk.fbx', (fbx) => {
        fbx.position.x = this.x;
        fbx.position.y = this.y;
        fbx.position.z = this.z;
        this.body = fbx;

        fbx.traverse(c => {
            if (c.isMesh) {

                c.castShadow = true;
                c.receiveShadow = true;
            }
        });
        if(pose == 0) {
            animloader.load('monk_sleep.fbx', (anim) => {
                const m = new THREE.AnimationMixer(fbx);
                mixers.push(m);
                walk_forward = m.clipAction(anim.animations[0]);
                walk_forward.play();
    
            });
        } else {
            animloader.load('Excited.fbx', (anim) => {
                const m = new THREE.AnimationMixer(fbx);
                mixers.push(m);
                walk_forward = m.clipAction(anim.animations[0]);
                walk_forward.play();
    
            });
        }
        this.done = 1;


        scene.add(this.body);
        fbx.rotation.y = -Math.PI / 2;
    });
};