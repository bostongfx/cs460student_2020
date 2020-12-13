const G             = 6.67428e-11;              // Newtons*meters^2/kg^2, Universal Gravitational Constant
const AU            = 1.496e+11;                // meters, Astronomical Unit
const STARSCALE     = 10                        // number to scale up the size of the sun
const PLANETSCALE   = 1000                      // number to scale up the size of planets
const PLUTOSCALE    = 20000                     // because Pluto is so small
const TARGETFPS     = 60                        // 60 FPS target
const EARTHRADIUS   = 6.371e6 * PLANETSCALE;    // Earth's radius
const EARTHMASS     = 5.9742e24;                // Earth's mass
export { EARTHMASS, EARTHRADIUS, G, AU, STARSCALE, PLANETSCALE, PLUTOSCALE };