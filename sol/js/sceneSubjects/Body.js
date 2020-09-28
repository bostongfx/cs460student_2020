let bodyId = 0;

function Body(name, mass, radius, position, velocity, texture, color) {
    Object.defineProperty(this, 'id', {value: bodyId++});
    this.name = '';
    this.type = 'Body';
    this.mass = 0;
    this.radius = 1;
    this.velocity = undefined;
    this.texture = null;
    this.color = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;
}

Object.assign( Body.prototype, {
    constructor: Body,
    // setValue function taken and modified from the three.js 'Material' source code.
    setValues: function ( values ) {
        if ( values === undefined ) return;
        for (const key in values ) {
            const newValue = values[key];
            if ( newValue === undefined ) {
                console.warn("Body: '" + key + "' parameter is undefined.");
                continue;
            }
            if ( key === 'position' ) {
                this.setPosition(values);
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
    setPosition: function(allValues) {
        const mesh = this.mesh ? this.mesh : allValues.mesh ? allValues.mesh : undefined;
        const position = allValues.position;
        if (mesh === undefined || mesh === null) {
            console.warn(this.type + ": " + this.name + " has no mesh, and its position cannot be set");
            return;
        }
        mesh.position.set(position.x, position.y, position.z);
    },
    interact: function (other) {
        let vectorFromThisToOther = other.mesh.position.clone().sub(mesh.position);
        let distanceToSquared = other.mesh.position.distanceToSquared(mesh.position);
    },
    update: function (time) {
        // const scale = Math.sin(time)+2;
        //
        // mesh.scale.set(scale, scale, scale);
    }
} );

export { Body };