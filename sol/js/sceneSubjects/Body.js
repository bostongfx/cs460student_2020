import { G, AU } from "../constants.js";

function Body(systemScale) {
    THREE.Object3D.call(this);
    this.systemScale = systemScale;
    this.type = 'Body';
    this._radius = 1;
    this._ringRadius = 1;
    Object.defineProperty(this, 'radius', {
        get: function() { return this._radius * this.systemScale },
        set: function(val) { this._radius = val }
    });
    Object.defineProperty(this, 'ringRadius', {
        get: function() { return this._ringRadius * this.systemScale },
        set: function(val) { this._ringRadius = val }
    });
    Object.defineProperty(this, 'position', {
        get: function() { return this.fullPosition.clone().multiplyScalar(this.systemScale) }
    });
    this.name = '';
    this.mass = 0;
    this.velocity = new THREE.Vector3(0,0,0);
    this.fullPosition = new THREE.Vector3(0,0,0);
    this.texture = null;
    this.color = null;
    this.mesh = null;
    this.hasRings = false;
    this.dayLength = null;
    this.tilt = null;
    this.orbitalPeriod = null;
    this.ringTexture = null;
    this.orbitalVelocity = 0;
    this.scaleFactor = 1;
    this.toUpdate = [];
}
Body.prototype = new THREE.Object3D();

Object.assign( Body.prototype, {
    constructor: Body,

    // setValue function taken and modified from the three.js 'Material' source code.
    setValues: function ( values ) {
        if ( values === undefined ) return;
        for ( const key in values ) {

            const newVal = values[key];
            if ( newVal === undefined ) {
                console.warn(`Body.setValues(): '${key}' parameter is undefined.`);
                continue;
            }

            if ( key === 'KeplerianData' ) {
                this.setKeplerianData(newVal);
                continue;
            }

            if ( key === 'scaleFactor' ) {
                this.scale.set(newVal, newVal, newVal);
            }

            const currVal = this[key];
            if ( currVal === undefined ) {
                console.warn(`${this.type}: '${key}' is not a property of this body.`);
                continue;
            }

            if ( currVal && currVal.isColor ) {
                currVal.set( newVal );
            } else if ((currVal && currVal.isVector3) && (newVal && newVal.isVector3)) {
                currVal.copy( newVal );
            } else {
                this[key] = newVal;
            }
        }
    },

    setPosition: function(newPos) {
        this.fullPosition.copy(newPos);
        const scaledPosition = newPos.clone().multiplyScalar(this.systemScale);
        this.position.copy(scaledPosition);
    },

    interact: function (other) {
        // A body does not interact with itself
        if (other === this) return new THREE.Vector3(0,0,0);

        const thisPos = this.fullPosition;
        const thatPos = other.fullPosition;

        const distanceToSquared   = thatPos.clone().distanceToSquared(thisPos);
        const forceMagnitude      = (G * other.mass * this.mass) / distanceToSquared;
        const direction           = thatPos.clone().sub(thisPos).divideScalar(
                                    thatPos.clone().distanceTo(thisPos));
        const force               = direction.multiplyScalar(forceMagnitude);
        return force;
    },

    updateSize: function (val) {
        const scale = Math.max(1, val * this.scaleFactor);
        this.scale.set(scale, scale, scale);
    },

    createAxesLines: function(radius) {
        const axesHelper = new THREE.AxesHelper(radius*3);
        axesHelper.castShadow = false;
        axesHelper.receiveShadow = false;
        return axesHelper;
    },

    // Sets this body's orbital data, ensuring all parts present
    setKeplerianData: function(data) {
        if ( data === undefined ) return;
        const KeplerianData = {
            semiMajorAxis                 : data['semiMajorAxis'],
            eccentricity                  : data['eccentricity'],
            inclination                   : data['inclination'],
            meanLongitude                 : data['meanLongitude'],
            longitudeOfPerihelion         : data['longitudeOfPerihelion'],
            longitudeOfTheAscendingNode   : data['longitudeOfTheAscendingNode']
        }
        for ( const key in KeplerianData ) {
            if (KeplerianData[key] === undefined) {
                let msg = "missing from argument data. Data not set";
                console.warn(`${this.type}.setKeplerianData(): '${key}' ${msg}`);
                return;
            }
        }
        this.KeplerianData = KeplerianData;
    },

    // Calculates this body's position using its orbital data and
    // the T argument, which is the Julian time since J2000 at which
    // this body's position is required.
    // See https://ssd.jpl.nasa.gov/txt/aprx_pos_planets.pdf for the
    // formulas implemented below.
    calculatePositionFromKeplerianData: function(T) {
        // Data from NASA has change per century. Divide by that many days.
        T = T / 36525;
        const data = this.KeplerianData;

        const semiMajorAxis = data.semiMajorAxis.au
                        + T * data.semiMajorAxis.auPerCentury;
        const eccentricity  = data.eccentricity.eccentricity
                        + T * data.eccentricity.eccentricityPerCentury;
        const inclination   = data.inclination.degrees
                        + T * data.inclination.degreesPerCentury;
        const meanLongitude = data.meanLongitude.degrees
                        + T * data.meanLongitude.degreesPerCentury;
        const lonPeri       = data.longitudeOfPerihelion.degrees
                        + T * data.longitudeOfPerihelion.degreesPerCentury;
        const lonAscNode    = data.longitudeOfTheAscendingNode.degrees
                        + T * data.longitudeOfTheAscendingNode.degreesPerCentury;

        // Let's work in radians, shall we?
        const a = semiMajorAxis * AU;
        const e = eccentricity * (Math.PI/180);
        const I = inclination * (Math.PI/180);
        const L = meanLongitude * (Math.PI/180);
        const lp = lonPeri * (Math.PI/180);
        const ln = lonAscNode * (Math.PI/180);

        const ap = lp - ln;
        const meanAnomaly = meanLongitude - lonPeri;
        const meanAnomalyModulus = (meanAnomaly % 360) > 180
            ? -(360-(meanAnomaly % 360))
            :       (meanAnomaly % 360);
        const M = meanAnomalyModulus * (Math.PI/180);

        let deltaE = 1;
        let deltaM = 0;
        let Ecurr = M + e * Math.sin(M);
        const tolerance = 1e-6 * (Math.PI/180);
        while (deltaE > tolerance) {
            deltaM = M - (Ecurr - e * Math.sin(Ecurr));
            deltaE = deltaM / (1- e * Math.cos(Ecurr));
            Ecurr = Ecurr + deltaE;
        }
        const E = Ecurr;

        const xPrime = a * (Math.cos(E)-e);
        const zPrime = a * (Math.sqrt(1-e*e) * Math.sin(E));
        const yPrime = 0;

        const x =   xPrime * ( Math.cos(ap)*Math.cos(ln) - Math.sin(ap)*Math.sin(ln)*Math.cos(I))
                  + zPrime * (-Math.sin(ap)*Math.cos(ln) - Math.cos(ap)*Math.sin(ln)*Math.cos(I));
        const z = -(xPrime * ( Math.cos(ap)*Math.sin(ln) + Math.sin(ap)*Math.cos(ln)*Math.cos(I))
                  + zPrime * (-Math.sin(ap)*Math.sin(ln) + Math.cos(ap)*Math.cos(ln)*Math.cos(I)));
        const y =   xPrime * ( Math.sin(ap)*Math.sin(I)) + zPrime * (Math.cos(ap)*Math.sin(I));

        return new THREE.Vector3(x,y,z);
    },

    update: function(dt, newPos, newVel) {
        if (this.dayLength > 0) {
            this.mesh.rotateY((2 * Math.PI / this.dayLength)*dt);
        }
        this.setPosition(newPos);
        this.velocity.copy(newVel);
        this.orbitalVelocity = newVel.length();
        for (let i = 0; i < this.toUpdate.length; i++) {
            this.toUpdate[i].update();
        }
    },
} );

export { Body };