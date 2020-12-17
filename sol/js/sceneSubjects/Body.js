import { G, AU } from "../constants.js";

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
    this.hasRings = false;
    this.dayLength = null;
    this.tilt = null;
    this.orbitalPeriod = null;
    this.ringTexture = null;
    this.ringRadius = null;
    this.orbitalVelocity = 0;
    this.scaleFactor = 1;
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
                console.warn(`Body.setValues(): '${key}' parameter is undefined.`);
                continue;
            }

            if ( key === 'KeplerianData' ) {
                this.setKeplerianData(newValue);
                continue;
            }

            if ( key === 'scaleFactor' ) {
                this.scale.set(newValue, newValue, newValue);
            }

            const currentValue = this[key];
            if ( currentValue === undefined ) {
                console.warn(`${this.type}: '${key}' is not a property of this body.`);
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
                console.warn(`${this.type}.setKeplerianData(): '${key}' missing from argument data. Data not set`);
                return;
            }
        }
        this.KeplerianData = KeplerianData;
    },

    calculatePositionFromKeplerianData: function(T) {
        T = T / 36525;
        const data = this.KeplerianData;

        const semiMajorAxis = data.semiMajorAxis.au                    + T * data.semiMajorAxis.auPerCentury;
        const eccentricity  = data.eccentricity.eccentricity           + T * data.eccentricity.eccentricityPerCentury;
        const inclination   = data.inclination.degrees                 + T * data.inclination.degreesPerCentury;
        const meanLongitude = data.meanLongitude.degrees               + T * data.meanLongitude.degreesPerCentury;
        const lonPeri       = data.longitudeOfPerihelion.degrees       + T * data.longitudeOfPerihelion.degreesPerCentury;
        const lonAscNode    = data.longitudeOfTheAscendingNode.degrees + T * data.longitudeOfTheAscendingNode.degreesPerCentury;

        // Let's work in radians, shall we?
        const a = semiMajorAxis * AU;
        const e = eccentricity * (Math.PI/180);
        const I = inclination * (Math.PI/180);
        const L = meanLongitude * (Math.PI/180);
        const lp = lonPeri * (Math.PI/180);
        const ln = lonAscNode * (Math.PI/180);

        const ap = lp - ln;
        const meanAnomaly = meanLongitude - lonPeri;
        const meanAnomalyModulus = (meanAnomaly % 360) > 180 ? -(360-(meanAnomaly % 360)) : (meanAnomaly % 360);
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

        // console.log(`${this.name}:
        //  semiMajorAxis: ${semiMajorAxis}, a: ${a}
        //   eccentricity: ${eccentricity}, e: ${e}
        //    inclination: ${inclination}, I: ${I}
        //  meanLongitude: ${meanLongitude}, L: ${L}
        //        lonPeri: ${lonPeri}, lp: ${lp}
        //     lonAscNode: ${lonAscNode}, ln: ${ln}
        //        argPeri: ${lonPeri-lonAscNode}, ap: ${ap}`);
        // console.log(`${this.name}: E: ${E}, M: ${M}, xPrime: ${xPrime}, yPrime: ${yPrime}`);
        // console.log(`${this.name}: x: ${x}, y: ${y}, z: ${z}`);
        return new THREE.Vector3(x,y,z);
    },

    createAxesLines: function(radius) {
        const axesHelper = new THREE.AxesHelper(radius*3);
        return axesHelper;
    },

    interact: function (other) {
        // A body does not interact with itself
        if (other === this) return new THREE.Vector3(0,0,0);

        let distanceToSquared   = other.position.clone().distanceToSquared(this.position);
        let forceMagnitude      = (G * other.mass * this.mass) / distanceToSquared;
        let direction           = other.position.clone().sub(this.position).divideScalar(
                                  other.position.clone().distanceTo(this.position));
        let force               = direction.multiplyScalar(forceMagnitude);
        return force;
    },

    updateSize: function (val) {
        const newScale = Math.max(1, val * this.scaleFactor);
        this.scale.set(newScale,newScale,newScale);
    },
} );

export { Body };