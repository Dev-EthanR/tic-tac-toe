const checkbox = document.getElementById('switchCheckBox');

function sliderOption() {
    document.getElementById('sliderNortImg').classList.toggle('menu-img-active', checkbox.checked);
    document.getElementById('sliderCrossImg').classList.toggle('menu-img-active', !checkbox.checked);
}


export function setMenu(e) {
    const mark = checkbox.checked ? "o" : "x";
    const mode = e.target.dataset.mode;
    document.getElementById('menuScreen').classList.add('is-hidden');

    return {mark, mode}
}
checkbox.addEventListener('change', sliderOption)
