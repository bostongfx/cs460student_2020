import {SystemOfBodies} from './SystemOfBodies.js';
import {Planet} from './Planet.js';
import {Sun} from './Sun.js';
import {AU, STARSCALE, PLANETSCALE, PLUTOSCALE} from "../constants.js";

// Important Julian Days
const JDaysToStartOfEpoch = 2440587.5;  // Jan 1, 1970 00:00
const J2000 = 2451545.0;                // Jan 1, 2000 12:00 (noon)
const J2020 = 2458929.0;                // Jan 1, 2020 12:00 (noon)
const T2020 = 7384;                     // J2020 - J2000
const epochToJ2000 = 10957.5;           // J2000 - JDaysToStartOfEpoch;

function SolSystem(scene, scaleMultiplier, systemScale) {
    SystemOfBodies.call(this);
    this.setScene(scene);
    // Scale everything down so that earth is about 1 unit away from the sun.
    this.systemScale = systemScale;
    this.scaleMultiplier = scaleMultiplier;

    const UNIX_TIME = Date.now();
    this.TStart     = UNIX_TIME / 86400000 - epochToJ2000;
    const startTime = this.TStart;
    // const startTime = T2020;

    this.Sol = new Sun({
        name: 'Sol',
        mass: 1.98892e30,
        radius: 6.957e8,
        scaleFactor: STARSCALE,
        position: new THREE.Vector3(0,0,0),
        texture: 'textures/sun.jpg',
        color: new THREE.Color(1, 1, 0.6),
        tilt: 7.25 * Math.PI / 180,
        dayLength: 648 * 3600,
    }, this.systemScale);

    this.Earth = new Planet({
        name: 'Earth',
        mass: 5.9742e24,
        radius: 6.371e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/earth_day.jpg',
        color: 0x00FFFF,
        tilt: 23.4 * Math.PI / 180,
        dayLength: 23.93 * 3600,
        orbitalPeriod: 365.25,
        orbitalVelocity: 29800,
        KeplerianData: {
            semiMajorAxis:               {au: 1.00000261, auPerCentury: 0.00000562},
            eccentricity:                {eccentricity: 0.01671123, eccentricityPerCentury: -0.00004392},
            inclination:                 {degrees: -0.00001531, degreesPerCentury: -0.01294668},
            meanLongitude:               {degrees: 100.4645717, degreesPerCentury: 35999.37245},
            longitudeOfPerihelion:       {degrees: 102.9376819, degreesPerCentury: 0.32327364},
            longitudeOfTheAscendingNode: {degrees: 0, degreesPerCentury: 0},
        },
    }, this.systemScale, startTime);

    this.Mercury = new Planet({
        name: 'Mercury',
        mass: 3.3e23,
        radius: 2.439e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/mercury.jpg',
        color: new THREE.Color(1, 0.27, 0),
        tilt: 0.034 * Math.PI / 180,
        dayLength: 1407.6 * 3600,
        orbitalPeriod: 88.0,
        orbitalVelocity: 47400,
        KeplerianData: {
            semiMajorAxis: {au: 0.38709927, auPerCentury: 0.00000037},
            eccentricity: {eccentricity: 0.20563593, eccentricityPerCentury: 0.00001906},
            inclination: {degrees: 7.00497902, degreesPerCentury: -0.00594749},
            meanLongitude: {degrees: 252.2503235, degreesPerCentury: 149472.6741},
            longitudeOfPerihelion: {degrees: 77.45779628, degreesPerCentury: 0.16047689},
            longitudeOfTheAscendingNode: {degrees: 48.33076593, degreesPerCentury: -0.12534081},
        },
    }, this.systemScale, startTime);

    this.Venus = new Planet({
        name: 'Venus',
        mass: 4.8685e24,
        radius: 6.052e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/venus_atmo.jpg',
        color: new THREE.Color(0.8, 0.8, 0),
        tilt: 177.4 * Math.PI / 180,
        dayLength: 5832.5 * 3600,
        orbitalPeriod: 224.7,
        orbitalVelocity: 35000,
        KeplerianData: {
            semiMajorAxis: {au: 0.72333566, auPerCentury: 0.0000039},
            eccentricity: {eccentricity: 0.00677672, eccentricityPerCentury: -0.00004107},
            inclination: {degrees: 3.39467605, degreesPerCentury: -0.0007889},
            meanLongitude: {degrees: 181.9790995, degreesPerCentury: 58517.81539},
            longitudeOfPerihelion: {degrees: 131.6024672, degreesPerCentury: 0.00268329},
            longitudeOfTheAscendingNode: {degrees: 76.67984255, degreesPerCentury: -0.27769418},
        },
    }, this.systemScale, startTime);

    this.Mars = new Planet({
        name: 'Mars',
        mass: 6.42e23,
        radius: 3.397e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/mars.jpg',
        color: new THREE.Color(1, 0, 0),
        tilt: 25.2 * Math.PI / 180,
        dayLength: 24.6 * 3600,
        orbitalPeriod: 687.0,
        orbitalVelocity: 24100,
        KeplerianData: {
            semiMajorAxis: {au: 1.52371034, auPerCentury: 0.00001847},
            eccentricity: {eccentricity: 0.0933941, eccentricityPerCentury: 0.00007882},
            inclination: {degrees: 1.84969142, degreesPerCentury: -0.00813131},
            meanLongitude: {degrees: -4.55343205, degreesPerCentury: 19140.30268},
            longitudeOfPerihelion: {degrees: -23.94362959, degreesPerCentury: 0.44441088},
            longitudeOfTheAscendingNode: {degrees: 49.55953891, degreesPerCentury: -0.29257343},
        },
    }, this.systemScale, startTime);

    this.Jupiter = new Planet({
        name: 'Jupiter',
        mass: 1.9e27,
        radius: 71.492e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/jupiter.jpg',
        color: new THREE.Color(1, 0.85, 0.72),
        tilt: 3.1 * Math.PI / 180,
        dayLength: 9.9 * 3600,
        orbitalPeriod: 4331,
        orbitalVelocity: 13100,
        KeplerianData: {
            semiMajorAxis: {au: 5.202887, auPerCentury: -0.00011607},
            eccentricity: {eccentricity: 0.04838624, eccentricityPerCentury: -0.00013253},
            inclination: {degrees: 1.30439695, degreesPerCentury: -0.00183714},
            meanLongitude: {degrees: 34.39644051, degreesPerCentury: 3034.746128},
            longitudeOfPerihelion: {degrees: 14.72847983, degreesPerCentury: 0.21252668},
            longitudeOfTheAscendingNode: {degrees: 100.4739091, degreesPerCentury: 0.20469106},
        },
    }, this.systemScale, startTime);

    this.Saturn = new Planet({
        name: 'Saturn',
        mass: 5.69e26,
        radius: 58.232e6,
        scaleFactor: PLANETSCALE,
        hasRings: true,
        ringRadius: 282.0e6,
        // Texture found through threejs forum post:
        // https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990
        ringTexture: 'textures/saturn_rings_line.png',
        texture: 'textures/saturn.jpg',
        color: new THREE.Color(0.82, 0.70, 0.55),
        tilt: 26.7 * Math.PI / 180,
        dayLength: 10.7 * 3600,
        orbitalPeriod: 10747,
        orbitalVelocity: 9700,
        KeplerianData: {
            semiMajorAxis: {au: 9.53667594, auPerCentury: -0.0012506},
            eccentricity: {eccentricity: 0.05386179, eccentricityPerCentury: -0.00050991},
            inclination: {degrees: 2.48599187, degreesPerCentury: 0.00193609},
            meanLongitude: {degrees: 49.95424423, degreesPerCentury: 1222.493622},
            longitudeOfPerihelion: {degrees: 92.59887831, degreesPerCentury: -0.41897216},
            longitudeOfTheAscendingNode: {degrees: 113.6624245, degreesPerCentury: -0.28867794},
        },
    }, this.systemScale, startTime);

    this.Uranus = new Planet({
        name: 'Uranus',
        mass: 8.68e25,
        radius: 25.559e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/uranus.jpg',
        color: new THREE.Color(0.68, 0.88, 0.90),
        tilt: 97.8 * Math.PI / 180,
        dayLength: 17.2 * 3600,
        orbitalPeriod: 30589,
        orbitalVelocity: 6800,
        KeplerianData: {
            semiMajorAxis: {au: 19.18916464, auPerCentury: -0.00196176},
            eccentricity: {eccentricity: 0.04725744, eccentricityPerCentury: -0.00004397},
            inclination: {degrees: 0.77263783, degreesPerCentury: -0.00242939},
            meanLongitude: {degrees: 313.2381045, degreesPerCentury: 428.4820279},
            longitudeOfPerihelion: {degrees: 170.9542763, degreesPerCentury: 0.40805281},
            longitudeOfTheAscendingNode: {degrees: 74.01692503, degreesPerCentury: 0.04240589},
        },
    }, this.systemScale, startTime);

    this.Neptune = new Planet({
        name: 'Neptune',
        mass: 1.03e26,
        radius: 24.764e6,
        scaleFactor: PLANETSCALE,
        texture: 'textures/neptune.jpg',
        color: new THREE.Color(0.25, 0.41, 0.88),
        tilt: 28.3 * Math.PI / 180,
        dayLength: 16.1 * 3600,
        orbitalPeriod: 59800,
        orbitalVelocity: 5400,
        KeplerianData: {
            semiMajorAxis: {au: 30.06992276, auPerCentury: 0.00026291},
            eccentricity: {eccentricity: 0.00859048, eccentricityPerCentury: 0.00005105},
            inclination: {degrees: 1.77004347, degreesPerCentury: 0.00035372},
            meanLongitude: {degrees: -55.12002969, degreesPerCentury: 218.4594533},
            longitudeOfPerihelion: {degrees: 44.96476227, degreesPerCentury: -0.32241464},
            longitudeOfTheAscendingNode: {degrees: 131.7842257, degreesPerCentury: -0.00508664},
        },
    }, this.systemScale, startTime);

    this.Pluto = new Planet({
        name: 'Pluto',
        mass: 1.46e22,
        radius: 1.185e6,
        scaleFactor: PLUTOSCALE,
        texture: 'textures/pluto.jpg',
        color: new THREE.Color(0.96, 0.87, 0.70),
        tilt: 122.53 * Math.PI / 180,
        dayLength: 153.3 * 3600,
        orbitalPeriod: 90560,
        orbitalVelocity: 4700,
        KeplerianData: {
            semiMajorAxis: {au: 39.48211675, auPerCentury: -0.00031596},
            eccentricity: {eccentricity: 0.2488273, eccentricityPerCentury: 0.0000517},
            inclination: {degrees: 17.14001206, degreesPerCentury: 0.00004818},
            meanLongitude: {degrees: 238.9290383, degreesPerCentury: 145.2078052},
            longitudeOfPerihelion: {degrees: 224.0689163, degreesPerCentury: -0.04062942},
            longitudeOfTheAscendingNode: {degrees: 110.3039368, degreesPerCentury: -0.01183482},
        },
    }, this.systemScale, startTime);

    this.addBody(this.Sol);
    this.addBody(this.Mercury);
    this.addBody(this.Venus);
    this.addBody(this.Earth);
    this.addBody(this.Mars);
    this.addBody(this.Jupiter);
    this.addBody(this.Saturn);
    this.addBody(this.Uranus);
    this.addBody(this.Neptune);
    this.addBody(this.Pluto);
}

SolSystem.prototype = Object.create(SystemOfBodies.prototype);
SolSystem.prototype.constructor = SolSystem;

export {SolSystem};