import { Boid } from "./lib/boid.js";
import { Vector } from "./lib/vector.js";

let boidCount = 100;
let boidVLimit = 300;
let boidViewRadius = 10;

/**
 * @type {Boid[]}
 */
const boids = [];
let lastUpdate = Date.now();


for (let i = 0; i < boidCount; i++) {
    let boid = new Boid();
    boid.spawn();
    boids.push(boid);

}

function render() {
    const dt = (Date.now() - lastUpdate) / 500;
    lastUpdate = Date.now();

    boids.forEach(boid => {
        const v1 = rule1(boid);
        const v2 = rule2(boid);
        const v3 = rule3(boid);
        boid.velocity = boid.velocity.add(v1).add(v2).add(v3);

        if (boid.velocity.length() > boidVLimit) {
            boid.velocity = boid.velocity.unitVector().scale(boidVLimit)
        }


        boid.advance(dt);
        boid.updateInstance();
    })
    window.requestAnimationFrame(render);
}

/**
 * 
 * @param {Boid} boid 
 * @returns {Vector}  
*/
function rule1(boid) {
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
function rule2(boid) {
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
function rule3(boid) {
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


render();


