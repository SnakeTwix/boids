import { Vector } from "./vector.js";

const squareWidth = 20;

const ZeroVec = new Vector(0, 0)
const trianglePoint1 = new Vector(-squareWidth / 2, -squareWidth / 2);
const trianglePoint2 = new Vector(-squareWidth / 2, squareWidth / 2);
const trianglePoint3 = new Vector(squareWidth / 2, 0);
const offset = new Vector(squareWidth / 2, squareWidth / 2);

export class Triangle {
    /**
     * @type {pos}
     */
    x

    constructor(pos, rotation) {
        this.pos = pos;
        this.rotation = rotation;
    }

    draw(ctx) {
        const point1 = trianglePoint1.rotateAroundPoint(ZeroVec, this.rotation).add(this.pos).add(offset);
        const point2 = trianglePoint2.rotateAroundPoint(ZeroVec, this.rotation).add(this.pos).add(offset);
        const point3 = trianglePoint3.rotateAroundPoint(ZeroVec, this.rotation).add(this.pos).add(offset);

        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.lineTo(point3.x, point3.y);
        ctx.fill();
    }
}