import { appState } from "./index.js";

const checkbox = document.getElementById('switchCheckBox');

function sliderOption() {
    document.getElementById('sliderNortImg').classList.toggle('menu-img-active', checkbox.checked);
    document.getElementById('sliderCrossImg').classList.toggle('menu-img-active', !checkbox.checked);
}


export function setMenu(e) {
    const playerOneMark = checkbox.checked ? "o" : "x";
    const playerTwoMark = !checkbox.checked ? "o" : "x";
    const mode = e.target.dataset.mode;
    document.getElementById('menuScreen').classList.add('is-hidden');

    return {
        playerOne: {mark: playerOneMark, score: appState.playerOne.score}, 
        playerTwo: {mark: playerTwoMark, score: appState.playerTwo.score}, 
        mode
    }
}
checkbox.addEventListener('change', sliderOption)
