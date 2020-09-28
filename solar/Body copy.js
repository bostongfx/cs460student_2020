class Body {
    constructor(name, mass, xPos, yPos, xVel, yVel, radius, texture, color) {
        this.name = name;
        this.mass = mass;
        this.x = xPos;
        this.y = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.radius = radius;
        this.texture = texture;
        this.color = color;
        this.merged = false;
    }

    attraction(other, future) {
        var fx = 0.0;
        var fy = 0.0;
        if (this == other) { return; } // ignore self

        if (future.length > 0) {
            var futureOther = future[future.length-1][other.name];
            var futureThis = future[future.length-1][this.name];
            var dx = futureOther[2] - futureThis[2];
            var dy = futureOther[3] - futureThis[3];
        } else {
            var dx = other.x - this.x;
            var dy = other.y - this.y;
        }

        var dsq = dx*dx + dy*dy;  // distance squared
        var dr = Math.sqrt(dsq);  // distance between

        // the merged / collision part of this program hasn't been implemented.
        // in theory, I wanted to write something that would account for planets colliding,
        // or falling into the sun. Maybe in the future...
        if (false && dr == 0) { // Then there's a collision **NOT USED**
            if (this.mass > other.mass) {
                fx = other.mass * other.xVel
                fy = other.mass * other.yVel
                this.mass += other.mass
                other.merged = true
                other.mass = 0
                other.x = 0
                other.y = 0
                other.xVel = 0
                other.yVel = 0
            }
        } else { // else, calculate the force
            var force = (G * this.mass * other.mass) / dsq
            // Give the force x-y directions
            fx += (dx/dr) * force // x component of unit vector * force
            fy += (dy/dr) * force // y component of unit vector * force
        }
        return [fx, fy] // <-- that's the returned force values
    }
}