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
    currentTurn: null,
    reset: () => {
     appState.playerOne = { mark: null, score: 0 };
     appState.playerTwo = { mark: null, score: 0 };
     appState.totalTies = 0;
     appState.mode = null;
     appState.currentScreen = 'menu';
     appState.currentTurn = null;
    }
}



function mainMenu() {
     appState.reset();
     appState.currentScreen = 'menu'
     document.getElementById('menuScreen').classList.remove('is-hidden');
     document.getElementById('gameScreen').classList.add('is-hidden');
     document.getElementById('endScreen').classList.add('is-hidden');
     document.getElementById('focusContent').classList.add('is-hidden');

     document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', (e) => {
     Object.assign(appState, setMenu(e));
     appState.currentScreen = 'game';
     gameStart();
}));
}

function clearBoard() {
     appState.currentTurn = (appState.playerOne.mark === 'x' ? 'playerOne' : 'playerTwo');
     const tiles = document.querySelectorAll('.tile');
     tiles.forEach(e => {
          e.dataset.isSelected = '';
          e.classList.remove('x-win');
          e.classList.remove('o-win');
          while(e.firstChild) {
               e.removeChild(e.firstChild)
          }
     })
}

function gameStart() {
     document.getElementById('endScreen').classList.add('is-hidden');
     document.getElementById('gameScreen').classList.remove('is-hidden');
     document.getElementById('focusContent').classList.add('is-hidden');
     clearBoard()
     nextTurn()
}

mainMenu();

document.getElementById('quitBtn').addEventListener('click', mainMenu);
document.getElementById('nextRoundBtn').addEventListener('click', gameStart);
document.getElementById('restartBtn').addEventListener('click', gameStart)