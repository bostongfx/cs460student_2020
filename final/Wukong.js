Wukong = function(x,y,z, objectloader, animloader, scene, mixers) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.done = 0;

    objectloader.load('Wukong.fbx', (fbx) => {
        fbx.position.x = this.x;
        fbx.position.y = this.y;
        fbx.position.z = this.z;
        this.body = fbx;
        

        fbx.traverse(c => {
            if ( c.isMesh ) {

                c.castShadow = true;
                c.receiveShadow = true;
                c.material = new THREE.MeshPhongMaterial( { color: 0x888c8d, skinning: true});

            }
            
        });
        animloader.load('run_forward.fbx', (anim) => {
            const m = new THREE.AnimationMixer(fbx);
            mixers.push(m);
            walk_forward = m.clipAction(anim.animations[0]);
            walk_forward.play();
            walk_forward.fadeOut();
            this.run = walk_forward;
        });
        animloader.load('attack.fbx', (anim) => {
            const m = new THREE.AnimationMixer(fbx);
            
            mixers.push(m);
            this.attack = m.clipAction(anim.animations[0]);
            this.attack.play();
            this.attack.fadeOut();
        });
        animloader.load('idle.fbx', (anim) => {
            const m = new THREE.AnimationMixer(fbx);
            mixers.push(m);
            idle = m.clipAction(anim.animations[0]);
            idle.play();
            this.idle = idle;
            idle.fadeOut();
        });

        animloader.load('wukong_excited.fbx', (anim) => {
            const m = new THREE.AnimationMixer(fbx);
            mixers.push(m);
            this.happy = m.clipAction(anim.animations[0]);
            this.happy.play();
            this.happy.fadeOut();
        });

        scene.add(this.body);
        fbx.rotation.y = Math.PI / 2;
        this.done = 1;
    });
};

Wukong.prototype.move = function() {
    if(this.idle.isRunning()){
        this.idle.fadeOut();
        this.attack.fadeOut();
        this.run.fadeIn();
    }
    if(this.attack.isRunning()){
        this.run.fadeOut();
        this.attack.fadeOut();
        this.run.fadeIn();
    }
    

};

Wukong.prototype.idle_state = function() {
    if(this.run.isRunning()){
        this.attack.fadeOut();
        this.run.fadeOut();
        this.idle.fadeIn();
    }
};


Wukong.prototype.attack_state = function() {
    if(this.run.isRunning()){
        this.run.fadeOut();
        this.idle.fadeOut();
        this.attack.stop().play();
    }
    if(this.idle.isRunning()){
        this.run.fadeOut();
        this.idle.fadeOut();
        this.attack.stop().play();
    }
};


Wukong.prototype.happy_state = function() {
    if(this.run.isRunning()){
        this.run.fadeOut();
        this.idle.fadeOut();
        this.attack.fadeOut();
        this.happy.fadeIn();
    }
    if(this.idle.isRunning()){
        this.run.fadeOut();
        this.idle.fadeOut();
        this.attack.fadeOut();
        this.happy.fadeIn();
    }
    if(this.attack.isRunning()){
        this.run.fadeOut();
        this.idle.fadeOut();
        this.attack.fadeOut();
        this.happy.fadeIn();
    }
};