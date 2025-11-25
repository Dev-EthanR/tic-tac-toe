/* // TODO 
 Play the game either solo vs the computer or multiplayer against another person
 Save the game state in the browser so that it’s preserved if the player refreshes their browser
 Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win
*/

import { setMenu } from './menu.js';
import { nextTurn } from './game.js';

export const appState = {
     playerOne: {
          mark: null,
          score: 0
     },
      playerTwo: {
          mark: null,
          score: 0
     },
    totalTies: 0,
    mode: null,
    currentScreen: 'menu',
    currentTurn: null
}



document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', (e) => {
     Object.assign(appState, setMenu(e));
     appState.currentScreen = 'game';
     appState.currentTurn = (appState.playerOne.mark === 'x' ? 'playerOne' : 'playerTwo');
     gameStart();
}));

function gameStart() {
     document.getElementById('gameScreen').classList.remove('is-hidden')
     nextTurn()
     
}

