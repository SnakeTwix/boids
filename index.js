import { canvas, canvasCtx, instantiateCanvas, instantiateContext, removeCanvas } from "./lib/canvas.js";
import { CanvasBoid } from "./lib/canvasBoid.js";
import { HtmlBoid } from "./lib/htmlBoid.js";
import { store } from "./lib/store.js";
import { areaHeight, areaWidth } from "./lib/utils.js";

let lastUpdate = Date.now();

/**
 * @type {CanvasBoid | HtmlBoid}
 */
let BoidInstancer = null;

init();
updateBoidCount();
render();

function init() {
    switch (store.renderMode) {
        case "canvas":
            BoidInstancer = CanvasBoid
            prepareRenderForCanvas();
            break;
        case "htmlElements":
            BoidInstancer = HtmlBoid;
            prepareRenderForHTMLElements();
            break;
    }
}
function render() {
    const dt = (Date.now() - lastUpdate) / 100;
    lastUpdate = Date.now();

    if (store.renderMode === "canvas") {
        canvasCtx.clearRect(0, 0, areaWidth, areaHeight);
    }

    store.boids.forEach(viewBoid => {
        viewBoid.advance(dt);
        viewBoid.updateInstance();
    })
    window.requestAnimationFrame(render);
}

function updateBoidCount() {
    if (store.boids.length <= store.boidCount) {
        while (store.boids.length < store.boidCount) {
            let boid = new BoidInstancer();
            boid.spawn();
            store.boids.push(boid);
        }
    } else {
        for (let i = store.boidCount; i < store.boids.length; i++) {
            store.boids[i].destroy();
        }

        store.boids.length = store.boidCount;
    }
}

const boidSliderMinimum = 1;
const boidSliderMaximum = 500;
document.addEventListener("boid-count", (e) => {
    const newBoidCount = Math.floor(e.detail * (boidSliderMaximum - boidSliderMinimum) + boidSliderMinimum);
    if (store.boidCount !== newBoidCount) {
        store.boidCount = newBoidCount;
        updateBoidCount();
    }
})

document.addEventListener("render-mode", (e) => {
    store.renderMode = e.detail;

    if (e.detail === "canvas") {
        prepareRenderForCanvas()
    } else {
        prepareRenderForHTMLElements();
    }
})

function prepareRenderForCanvas() {
    BoidInstancer = CanvasBoid

    for (let i = 0; i < store.boids.length; i++) {
        store.boids[i].destroy();
        store.boids[i] = new CanvasBoid(store.boids[i].boid);
    }

    if (!canvas) {
        instantiateCanvas();
    }
    instantiateContext()
    document.body.appendChild(canvas);
}

function prepareRenderForHTMLElements() {
    BoidInstancer = HtmlBoid

    for (let i = 0; i < store.boids.length; i++) {
        store.boids[i].destroy();
        store.boids[i] = new HtmlBoid(store.boids[i].boid);
        store.boids[i].spawn();
    }

    removeCanvas();
}


