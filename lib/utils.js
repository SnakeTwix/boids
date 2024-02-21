export function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

export function clampWithDifference(value, min, max) {
    return [clamp(value, min, max), value - clamp(value, min, max)]
}

export let windowWidth = window.innerWidth;
export let windowHeight = window.innerHeight;


window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
})