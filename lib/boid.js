import { clampWithDifference, rand, windowHeight, windowWidth } from "./utils.js";
import { Vector } from "./vector.js";

export let boidVLimit = 300;
export let boidViewRadius = 10;

/**
 * @type {Boid[]}
 */
export const boids = [];



export class Boid {
    constructor() {
        const boid = document.createElement('div');
        boid.classList.add('boid');
        this.instance = boid;
        
        // Magic value as I can't figure out how to elegantly find out how big the boid's going to be
        // So this is just how big they are anyway in pixels.
        this.position = new Vector(rand(20, windowWidth - 20), rand(20, windowHeight - 20))
        this.velocity = new Vector(rand(-100, 100), rand(-100, 100));
    }

    spawn() {      
        document.body.appendChild(this.instance)
        this.updateInstance();
    }

    destroy() {
        this.instance.remove();
        console.log(this.instance)
    }

    advance(dt) {
        const v1 = rule1(this);
        const v2 = rule2(this);
        const v3 = rule3(this);
        this.velocity = this.velocity.add(v1).add(v2).add(v3);

        if (this.velocity.length() > boidVLimit) {
            this.velocity = this.velocity.unitVector().scale(boidVLimit)
        }
        
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

/**
 * 
 * @param {Boid} boid 
 * @returns {Vector}  
*/
export function rule1(boid) {
    let impact = new Vector(0, 0);
    let nearbyBoids = 0;


    for (let i = 0; i < boids.length; i++) {
        if (boids[i] === boid)
            continue;

        const vectorDifference = boids[i].position.subtract(boid.position)
        const distance = vectorDifference.length();

        if (distance < boidVLimit) {
            impact = impact.add(boids[i].position)
            nearbyBoids++;
        }

    }

    if (nearbyBoids !== 0) {
        impact = impact.scale(1 / (nearbyBoids));
        impact = impact.subtract(boid.position);
    }

    return impact.scale(1 / 100);
}

/**
 * 
 * @param {Boid} boid 
 * @returns {Vector}  
*/
export function rule2(boid) {
    let impact = new Vector(0, 0);

    for (let i = 0; i < boids.length; i++) {
        if (boids[i] === boid)
            continue;

        const vectorDifference = boids[i].position.subtract(boid.position)
        const distance = vectorDifference.length();

        if (distance < boidViewRadius) {
            impact = impact.subtract(vectorDifference)
        }


    }

    return impact;
}

/**
 * 
 * @param {Boid} boid 
 * @returns {Vector}  
*/
export function rule3(boid) {
    let impact = new Vector(0, 0);
    let nearbyBoids = 0;

    for (let i = 0; i < boids.length; i++) {
        if (boids[i] === boid)
            continue;

        const vectorDifference = boid.position.subtract(boids[i].position)
        const distance = vectorDifference.length();

        if (distance < 100) {
            impact = impact.add(boids[i].velocity);
            nearbyBoids++;
        }

    }


    if (nearbyBoids !== 0) {
        impact = impact.scale(1 / (nearbyBoids))
        impact = impact.subtract(boid.velocity);
    }

    return impact.scale(1 / 100);
}