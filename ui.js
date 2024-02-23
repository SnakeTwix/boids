import { clamp } from "./lib/utils.js";
import { store } from "./lib/store.js";

const settingsBtn = document.getElementById("settings-btn");
const settingsMenu = document.getElementById("settings-menu")
const options = document.querySelectorAll(".option")
const toggles = document.querySelectorAll('input[type="checkbox"]')

settingsBtn.addEventListener("click", (e) => {
    settingsMenu.classList.remove("hidden")
})

document.addEventListener("click", (e) => {
    if (settingsBtn.contains(e.target) || settingsMenu.contains(e.target)) {
        return;
    }

    settingsMenu.classList.add("hidden")
})

options.forEach(slider => {
    const sliderBall = slider.querySelector(".slider-ball");
    if (sliderBall === null) {
        return;
    }


    sliderBall.onpointerdown = (event) => {
        event.preventDefault();
        const shiftX = event.clientX - sliderBall.getBoundingClientRect().left;
        sliderBall.setPointerCapture(event.pointerId);

        sliderBall.onpointermove = (event) => {
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
            const rightEdge = slider.offsetWidth - sliderBall.offsetWidth;
            newLeft = clamp(newLeft, 0, rightEdge)
            sliderBall.style.left = newLeft + "px";

            fireCustomEvent(event.target.dataset.prop, newLeft / (slider.offsetWidth - sliderBall.offsetWidth))
        }

        sliderBall.onpointerup = (event) => {
            sliderBall.onpointermove = null;
            sliderBall.onpointerup = null;
        }
    }
})

toggles.forEach(checkbox => {
    checkbox.addEventListener('input', (e) => {
        let newValue;

        if (checkbox.checked) {
            newValue = "canvas"
        } else {
            newValue = "htmlElements"
        }
        
        fireCustomEvent(e.target.dataset.prop, newValue)
    })
})

function fireCustomEvent(name, detail) {
    // console.log("Firing event: ", name, " with detail: ", detail)
    const cevent = new CustomEvent(name, { detail })
    document.dispatchEvent(cevent);
}