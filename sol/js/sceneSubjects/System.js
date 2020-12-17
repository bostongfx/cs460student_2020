let systemId = 0;

function System(scene) {
    Object.defineProperty(this, 'id', {value: systemId++});
    this.bodies = [];
    this.scene = scene;
}

Object.assign( System.prototype, {
    constructor: System,
    setScene: function(scene) {
        this.scene = scene;
    },
    addBody: function (body) {
        this.bodies.push(body);
        this.scene.add(body);
        if (body.path !== undefined) {
            this.scene.add(body.path);
        }
        if (body.path2 !== undefined) {
            this.scene.add(body.path2);
        }
    },
    removeBody: function (body) {
        for (let i = 0; i < this.bodies.length; i++) {
            if (this.bodies[i] === body) {
                this.bodies.splice(i, 1);
                return;
            }
        }
    },
    update: function (dt) {

        let forces = {};
        for (let body1 of this.bodies) {
            let totalForce = new THREE.Vector3(0,0,0);
            for (let body2 of this.bodies) {
                totalForce.add(body1.interact(body2));
            }
            forces[body1.name] = totalForce;
        }
        for (let body of this.bodies) {
            let df = forces[body.name].divideScalar(body.mass).multiplyScalar(dt);
            let newVel = body.velocity.clone().add(df);
            let dPos = newVel.clone().multiplyScalar(dt);
            let newPos = body.position.clone().add(dPos);
            // console.log(df, vel, newPos);
            // let newPos = new THREE.Vector3(0,0,0);
            body.update(dt, newPos, newVel);
        }
    }
} );

export { System };