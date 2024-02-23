import { Boid } from "./boid.js";


export class HtmlBoid {
    constructor(boid = null) {
        if (!boid) {
            boid = new Boid();
        }

        /**
         * @type {Boid}
         */
        this.boid = boid;

        const instance = document.createElement('div');
        instance.classList.add('boid');
        this.instance = instance;
    }

    spawn() {      
        document.body.appendChild(this.instance)
        this.updateInstance();
    }

    destroy() {
        this.instance.remove();
    }

    updateInstance() {
        let angle = Math.atan2(this.boid.velocity.y, this.boid.velocity.x);

        this.instance.style.transform = `rotate(${angle}rad)`;

        this.instance.style.left = `${this.boid.position.x}px`
        this.instance.style.top = `${this.boid.position.y}px`
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