import { areaHeight, areaWidth } from "./utils.js";

/**
 * @type {HTMLCanvasElement}
 */
export let canvas = null;

/**
 * @type {CanvasRenderingContext2D}
 */
export let canvasCtx = null;

export function instantiateCanvas() {
    canvas = document.createElement('canvas');
}

export function instantiateContext() {
    canvasCtx = canvas.getContext("2d");
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize)
}

function updateCanvasSize() {
    canvasCtx.canvas.width = areaWidth;
    canvasCtx.canvas.height = areaHeight;
}

export function removeCanvas() {
    if (canvas) canvas.remove();
    window.removeEventListener('resize', updateCanvasSize);
}