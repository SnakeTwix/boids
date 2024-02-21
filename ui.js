import { clamp } from "./lib/utils.js";

const settingsBtn = document.getElementById("settings-btn");
const settingsMenu = document.getElementById("settings-menu")
const sliders = document.querySelectorAll(".slider")
const sliderBalls = document.querySelectorAll(".slider-ball")

settingsBtn.addEventListener("click", (e) => {
    settingsMenu.classList.remove("hidden")
})

document.addEventListener("click", (e) => {
    if (settingsBtn.contains(e.target) || settingsMenu.contains(e.target)) {
        return;
    }

    settingsMenu.classList.add("hidden")
})

sliders.forEach(slider => {
    const sliderBall = slider.querySelector(".slider-ball");

    sliderBall.onpointerdown = (event) => {
        event.preventDefault();
        const shiftX = event.clientX - sliderBall.getBoundingClientRect().left;
        sliderBall.setPointerCapture(event.pointerId);
        
        sliderBall.onpointermove = (event) => {
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
            const rightEdge = slider.offsetWidth - sliderBall.offsetWidth;
            newLeft = clamp(newLeft, 0, rightEdge)          
            sliderBall.style.left = newLeft + "px";

            const cevent = new CustomEvent(event.target.dataset.prop, {detail: newLeft / (slider.offsetWidth - sliderBall.offsetWidth)})
            document.dispatchEvent(cevent);
        }

        sliderBall.onpointerup = (event) => {
            sliderBall.onpointermove = null;
            sliderBall.onpointerup = null;
        }
    }
})