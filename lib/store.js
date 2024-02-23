import { CanvasBoid } from "./canvasBoid.js";
import { HtmlBoid } from "./htmlBoid.js";


export let store = {
    boidCount: 100,
    renderMode: "htmlElements",
    boidVLimit: 100,

    /**
     * @type {HtmlBoid | CanvasBoid}
     */
    boids: [],
}