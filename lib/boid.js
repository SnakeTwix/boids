import { clampWithDifference, rand, windowHeight, windowWidth } from "./utils.js";
import { Vector } from "./vector.js";

export class Boid {
    constructor() {
        const boid = document.createElement('div');
        boid.classList.add('boid');
        this.instance = boid;
        
        // Magic value as I can't figure out how to elegantly find out how big the boid's going to be
        // So this is just how big they are anyway.
        this.position = new Vector(rand(20, windowWidth - 20), rand(20, windowHeight - 20))
        this.velocity = new Vector(rand(-100, 100), rand(-100, 100));
    }

    spawn() {      
        document.body.appendChild(this.instance)
        this.updateInstance();
    }

    advance(dt) {
        this.position = this.position.add(this.velocity.scale(dt));

        let [newX, differenceX] = clampWithDifference(this.position.x, 20, windowWidth - 20);
        if (differenceX !== 0) {
            this.velocity.x = -this.velocity.x;
        }
        
        let [newY, differenceY] = clampWithDifference(this.position.y, 20, windowHeight - 20);
        if (differenceY !== 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.position.x = newX;
        this.position.y = newY;
    }

    updateInstance() {
        let angle = Math.atan2(this.velocity.y, this.velocity.x);

        this.instance.style.transform = `rotate(${angle}rad)`;

        this.instance.style.left = `${this.position.x}px`
        this.instance.style.top = `${this.position.y}px`
    }

}