export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns sum of one vector with another
     * @param {Vector} v
     * @returns {Vector} 
     */
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }


    /**
     * Returns difference from one vector with another
     * @param {Vector} v
     * @returns {Vector} 
     */
    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y)
    }

    /**
     * Returns a scaled vector with a number
     * @param {number} num 
     * @returns {Vector}
     */
    scale(num) {
        return new Vector(this.x * num, this.y * num)
    }


    /**
     * Returns the length between two vectors (Treats them as points)
     * @returns {number} 
     */
    length() {
        return Math.sqrt(this.lengthSqr());
    }

    /**
     * Returns the squared length between two vectors (Treats them as points)
     * @param {Vector} v
     * @returns {number} 
     */
    lengthSqr() {
        return this.x**2 + this.y**2;
    }

    /**
     * Returns the unit vector
     * @returns {Vector}
     */
    unitVector() {
        return this.scale(1/this.length())
    }

    /**
     * Returns the vector rotate around point p
     * @param {Vector} p 
     * @returns {Vector}
     */
    rotateAroundPoint(p, angle) {
        const centeredPoint = this.subtract(p);
        const rotatedPoint = new Vector(0, 0);
        
        rotatedPoint.x = centeredPoint.x * Math.cos(angle) - centeredPoint.y * Math.sin(angle);
        rotatedPoint.y = centeredPoint.x * Math.sin(angle) + centeredPoint.y * Math.cos(angle);

        return rotatedPoint.add(p);

    }
}