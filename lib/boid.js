import { store } from "./store.js";
import { clampWithDifference, rand, areaHeight, areaWidth } from "./utils.js";
import { Vector } from "./vector.js";

export let boidViewRadius = 100;

export class Boid {
    constructor() {
        // Magic value as I can't figure out how to elegantly find out how big the boid's going to be
        // So this is just how big they are anyway in pixels.
        this.position = new Vector(rand(20, areaWidth - 20), rand(20, areaHeight - 20))
        this.velocity = new Vector(rand(-100, 100), rand(-100, 100));
    }

    advance(dt) {
        const v1 = rule1(this);
        const v2 = rule2(this);
        const v3 = rule3(this);
        this.velocity = this.velocity.add(v1).add(v2).add(v3);

        if (this.velocity.length() > store.boidVLimit) {
            this.velocity = this.velocity.unitVector().scale(store.boidVLimit)
        }
        
        this.position = this.position.add(this.velocity.scale(dt));

        let [newX, differenceX] = clampWithDifference(this.position.x, 20, areaWidth - 20);
        if (differenceX !== 0) {
            this.velocity.x = -this.velocity.x;
        }
        
        let [newY, differenceY] = clampWithDifference(this.position.y, 20, areaHeight - 20);
        if (differenceY !== 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.position.x = newX;
        this.position.y = newY;
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


    for (let i = 0; i < store.boids.length; i++) {
        if (store.boids[i] === boid)
            continue;

        const vectorDifference = store.boids[i].position.subtract(boid.position)
        const distance = vectorDifference.length();

        if (distance < boidViewRadius) {
            impact = impact.add(store.boids[i].position)
            nearbyBoids++;
        }

    }

    if (nearbyBoids !== 0) {
        impact = impact.scale(1 / (nearbyBoids));
        impact = impact.subtract(boid.position);
    }

    return impact.scale(1 / 10);
}

/**
 * 
 * @param {Boid} boid 
 * @returns {Vector}  
*/
export function rule2(boid) {
    let impact = new Vector(0, 0);

    for (let i = 0; i < store.boids.length; i++) {
        if (store.boids[i] === boid)
            continue;

        const vectorDifference = store.boids[i].position.subtract(boid.position)
        const distance = vectorDifference.length();

        if (distance < 10) {
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

    for (let i = 0; i < store.boids.length; i++) {
        if (store.boids[i] === boid)
            continue;

        const vectorDifference = boid.position.subtract(store.boids[i].position)
        const distance = vectorDifference.length();

        if (distance < boidViewRadius) {
            impact = impact.add(store.boids[i].velocity);
            nearbyBoids++;
        }

    }


    if (nearbyBoids !== 0) {
        impact = impact.scale(1 / (nearbyBoids))
        impact = impact.subtract(boid.velocity);
    }

    return impact.scale(1 / 100);
}