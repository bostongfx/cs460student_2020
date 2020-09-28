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
        this.scene.add(body.mesh);
        if (body.type === 'Planet') this.scene.add(body.path);
        if (body.type === 'Sun') this.scene.add(body.light);
    },
    removeBody: function (body) {
        for (let i = 0; i < this.bodies.length; i++) {
            if (this.bodies[i] === body) {
                this.bodies.splice(i, 1);
                return;
            }
        }
    },
    update: function (time) {
        for (let body of this.bodies) {
            body.update(time);
        }
    }
} );

export { System };