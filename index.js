import { Boid, boids } from "./lib/boid.js";

let lastUpdate = Date.now();
let boidCount = 100;


updateBoidCount();


function render() {
    const dt = (Date.now() - lastUpdate) / 500;
    lastUpdate = Date.now();

    boids.forEach(boid => {
        boid.advance(dt);
        boid.updateInstance();
    })
    window.requestAnimationFrame(render);
}


const boidSliderMinimum = 1;
const boidSliderMaximum = 500;
document.addEventListener("boid-count", (e) => {
    const newBoidCount = Math.floor(e.detail * (boidSliderMaximum - boidSliderMinimum) + boidSliderMinimum);
    if (boidCount !== newBoidCount) {
        boidCount = newBoidCount;
        updateBoidCount();
    }
})

function updateBoidCount() {
    if (boids.length <= boidCount) {
        while(boids.length < boidCount) {
            let boid = new Boid();
            boid.spawn();
            boids.push(boid);
        }
    } else {
        for (let i = boidCount - 1; i < boids.length; i++) {
            boids[i].destroy();
        }

        boids.length = boidCount;
    }
}

render();


