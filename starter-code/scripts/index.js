/* // TODO 
 Play the game either solo vs the computer or multiplayer against another person
 Save the game state in the browser so that it’s preserved if the player refreshes their browser
 Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win
*/

import { setMenu } from './menu.js';

const appState = {
    mark: null,
    mode: null,
    currentScreen: 'menu'
}

document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', (e) => {
     Object.assign(appState, setMenu(e));
     appState.currentScreen = 'game';
}));
