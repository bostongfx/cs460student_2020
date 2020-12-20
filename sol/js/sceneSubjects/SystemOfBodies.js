let systemId = 0;

function SystemOfBodies(scene) {
    Object.defineProperty(this, 'id', { value: systemId++ });
    Object.defineProperty(this, 'allBodies', {
        get: function() { return [
            ...this.bodies.suns,
            ...this.bodies.planets,
            ...this.bodies.comets,
            ...this.bodies.asteroids
        ]}
    });
    Object.defineProperty(this, 'suns', {
        get: function() { return this.bodies.suns; },
    });
    Object.defineProperty(this, 'planets', {
        get: function() { return this.bodies.planets; },
    });
    Object.defineProperty(this, 'comets', {
        get: function() { return this.bodies.suns; },
    });
    Object.defineProperty(this, 'asteroids', {
        get: function() { return this.bodies.planets; },
    });

    this.scene = scene;

    this.systemScale = 1;
    this.scaleMultiplier = 1;

    this.bodies = {
        suns: [],
        planets: [],
        comets: [],
        asteroids: [],
    };

    this.paths = {
        future: [],
        past: [],
        orbital: []
    };
}

Object.assign( SystemOfBodies.prototype, {
    constructor: SystemOfBodies,

    setScene: function(scene) {
        this.scene = scene;
    },

    addBody: function (body) {
        if (body.type === 'Sun'     ) this.suns     .push(body);
        if (body.type === 'Planet'  ) this.planets  .push(body);
        if (body.type === 'Comet'   ) this.comets   .push(body);
        if (body.type === 'Asteroid') this.asteroids.push(body);
        this.scene.add(body);
        if (body.path !== undefined) {
            this.paths.past.push(body.path);
            this.scene.add(body.path);
        }
    },

    removeBody: function (body) {
        // TODO: re-write this. Include paths.
        // const bodyArray = this.bodies[body.type === 'Sun' ? 'suns' : 'planets'];
        // for (let i = 0; i < bodyArray.length; i++) {
        //     if (bodyArray[i] === body) {
        //         bodyArray.splice(i, 1);
        //         return;
        //     }
        // }
    },

    togglePathVisibility: function() {
        for (let i = 0; i < this.paths.past.length; i++) {
            this.paths.past[i].visible = !this.paths.past[i].visible;
        }
    },

    updateSize: function(scaleMultiplier) {
        this.scaleMultiplier = scaleMultiplier;

        for (const sun of this.bodies.suns) {
            sun.updateSize(scaleMultiplier);
        }

        for (const body of this.bodies.planets) {
            body.updateSize(scaleMultiplier);
        }
    },

    updatePathOpacity: function(val) {
        for (let i = 0; i < this.paths.past.length; i++) {
            this.paths.past[i].material.opacity = val;
        }
    },


    update: function (dt) {
        let forces = {};

        // Calculate the total forces acting on each body from every other body
        // (Gravity calculations)
        for (let body1 of this.allBodies) {
            let totalForce = new THREE.Vector3(0,0,0);
            for (let body2 of this.allBodies) {
                totalForce.add(body1.interact(body2));
            }
            forces[body1.name] = totalForce;
        }

        // Then calculate new position and velocities based on forces
        // (Momentum principle)
        for (let body of this.allBodies) {
            let df = forces[body.name].clone();
            df.divideScalar(body.mass).multiplyScalar(dt);
            let newVel = body.velocity.clone().add(df);
            let dPos = newVel.clone().multiplyScalar(dt);
            let newPos = body.fullPosition.clone().add(dPos);
            body.update(dt, newPos, newVel);
        }
    }
} );

export { SystemOfBodies };