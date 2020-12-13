import { G } from "../constants.js";

function Body() {
    // Object.defineProperty(this, 'id', {value: bodyId++});
    THREE.Object3D.call(this);
    this.name = '';
    this.type = 'Body';
    this.mass = 0;
    this.radius = 1;
    this.velocity = null;
    this.texture = null;
    this.color = null;
    this.mesh = null;
    this.dayCounter = 0;
}
Body.prototype = new THREE.Object3D();

Object.assign( Body.prototype, {
    constructor: Body,
    // setValue function taken and modified from the three.js 'Material' source code.
    setValues: function ( values ) {
        if ( values === undefined ) return;
        for ( const key in values ) {

            const newValue = values[key];
            if ( newValue === undefined ) {
                console.warn("Body: '" + key + "' parameter is undefined.");
                continue;
            }

            if ( key === 'position' ) {
                this.setPosition(values.position);
                continue;
            }

            const currentValue = this[key];
            if ( currentValue === undefined ) {
                console.warn(this.type + ": '" + key + "' is not a property of this body.");
                continue;
            }

            if ( currentValue && currentValue.isColor ) {
                currentValue.set( newValue );
            } else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {
                currentValue.copy( newValue );
            } else {
                this[key] = newValue;
            }
        }
    },
    setPosition: function(position) {
        this.position.set(position.x, position.y, position.z);
        // const mesh = this.mesh ? this.mesh : allValues.mesh ? allValues.mesh : undefined;
        // if (mesh === undefined || mesh === null) {
        //     console.warn(this.type + ": " + this.name + " has no mesh, and its position cannot be set");
        //     return;
        // }
        // mesh.position.set(position.x, position.y, position.z);
    },
    interact: function (other) {
        if (other === this) return new THREE.Vector3(0,0,0);
        let vectorFromThisToOther = other.position.clone().sub(this.position);
        let distanceToSquared = other.position.clone().distanceToSquared(this.position);
        let distanceTo = other.position.clone().distanceTo(this.position);
        let force = (G * other.mass * this.mass) / distanceToSquared;
        force = vectorFromThisToOther.divideScalar(distanceTo).multiplyScalar(force);
        return force;
    },
    update: function (time, step, stepSize) {

    }
} );

export { Body };