Monster = function(x,y,z, objectloader, animloader, scene, mixers, monsters, range_left, range_right) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dead = 0;
    this.dead_start_time;
    this.done = 0;
    this.range_left = range_left;
    this.range_right = range_right;

    objectloader.load('monster.fbx', (fbx) => {
        fbx.position.x = this.x;
        fbx.position.y = this.y;
        fbx.position.z = this.z;
        this.body = fbx;
        

        fbx.traverse(c => {
            c.castShadow = true;
        });
        animloader.load('monster_run.fbx', (anim) => {
            const m = new THREE.AnimationMixer(fbx);
            mixers.push(m);
            this.walk_forward = m.clipAction(anim.animations[0]);
            this.walk_forward.play();

        });
        animloader.load('monster_die.fbx', (anim) => {
            const m = new THREE.AnimationMixer(fbx);
            mixers.push(m);
            this.die = m.clipAction(anim.animations[0]);
            this.die.play();
            this.die.fadeOut();

        });


        scene.add(this.body);
        monsters.push(this);
        fbx.rotation.y = -Math.PI / 2;
        this.done = 1;
    });
};


Monster.prototype.die_state = function() {
    this.dead = 1;
    if(this.walk_forward.isRunning()){
        
        this.walk_forward.crossFadeTo(this.die,0,false);
        this.die.stop().play();
    }
};