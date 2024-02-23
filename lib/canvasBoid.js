import { Boid } from "./boid.js";
import { canvasCtx } from "./canvas.js";
import { Triangle } from "./triangle.js";


export class CanvasBoid {
    /**
     * @type {Boid}
     */
    boid;

    constructor(boid = null) {
        if (!boid) {
            boid = new Boid();
        }

        this.boid = boid;
    }

    spawn() {
        this.updateInstance();
    }

    destroy() {
        // Not necessary to destroy for canvas rendering
    }

    updateInstance() {
        const rotationAngle = Math.atan2(this.boid.velocity.y, this.boid.velocity.x);
        canvasCtx.fillStyle = "rgb(255 255 255)"

        new Triangle(this.boid.position, rotationAngle).draw(canvasCtx)
    }

    advance(dt) {
        this.boid.advance(dt)
    }

    get position() {
        return this.boid.position;
    }

    get velocity() {
        return this.boid.velocity;
    }
}