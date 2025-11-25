import { appState } from "./index.js";

function hoverTile(currentTile) {
    currentTile.addEventListener('mouseenter', () => {
        if(currentTile.dataset.isSelected) return;
        const mark = appState.mode === 'CPU' ? appState.playerOne.mark : appState[appState.currentTurn].mark;

        createImage(`assets/icon-${mark}-outline.svg`, currentTile)
    }),
    currentTile.addEventListener('mouseleave', () => {
        if(currentTile.dataset.isSelected) return;
        if(!currentTile.firstChild) return;
        currentTile.removeChild(currentTile.firstChild);
    })
}

function clickTile(currentTile) {
        if (currentTile.dataset.isSelected) return;
        
        const mark = appState.mode === 'CPU' ? appState.playerOne.mark : appState[appState.currentTurn].mark;
        createImage(`assets/icon-${mark}.svg`, currentTile, mark);
        currentTile.dataset.isSelected = "true";
        appState.currentTurn = appState.currentTurn === "playerOne" ? "playerTwo" : "playerOne";
        
        nextTurn();
}


function createImage(src, parent, mark) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }    
    const image = document.createElement('img'); 
    if(mark) image.dataset.markId = mark
    image.src = src;
    parent.appendChild(image);
}

export function nextTurn() {
    const tiles = document.querySelectorAll('.tile');
    checkBoard(tiles)
    updateUI()
    if(Array.from(tiles).every(t => t.dataset.isSelected)) return
    if(appState.mode === 'CPU' && appState.currentTurn === 'playerTwo') {
      CPU_move(tiles)
    }
    tiles.forEach(tile => { 
          hoverTile(tile)
          tile.addEventListener('click', () => {
            clickTile(tile)
        })
     })
}

function updateUI() {
    if(appState.currentScreen === 'endScreen') return

    const UIDom = {
        currentTurnElement: document.getElementById('currentTurn'),
        playerOneElement: document.getElementById('playerOne'),
        playerTwoElement: document.getElementById('playerTwo'),
        p1ScoreElement: document.getElementById('p1Score'),
        p2ScoreElement: document.getElementById('p2Score'),
        tieScoreElement: document.getElementById('tieScore')
    }
    const isPlayerOneX = appState.playerOne.mark === 'x';
    const scoreLabel = (mark, username) => `${mark} (${username})`;
  

    UIDom.currentTurnElement.firstElementChild.setAttribute("src", `assets/icon-${appState[appState.currentTurn].mark}.svg`);
   

    if(appState.mode === 'CPU') {
        UIDom.playerOneElement.textContent =  isPlayerOneX ? scoreLabel(appState.playerOne.mark, 'you') : scoreLabel(appState.playerTwo.mark, 'cpu');
        UIDom.playerTwoElement.textContent =  !isPlayerOneX ? scoreLabel(appState.playerOne.mark, 'you') : scoreLabel(appState.playerTwo.mark, 'cpu');

    } else {
        UIDom.playerOneElement.textContent =isPlayerOneX ? scoreLabel(appState.playerOne.mark, 'p1') : scoreLabel(appState.playerTwo.mark, 'p2');
        UIDom.playerTwoElement.textContent = !isPlayerOneX ? scoreLabel(appState.playerOne.mark, 'p1') : scoreLabel(appState.playerTwo.mark, 'p2'); 
    }
}

function updateScoreUI() {
    const p1ScoreElement = document.getElementById('p1Score');
    const p2ScoreElement = document.getElementById('p2Score');
    const tieScoreElement = document.getElementById('tieScore');
    
    const isPlayerOneX = appState.playerOne.mark === 'x';
    const playerOneKey = isPlayerOneX ? 'playerOne' : 'playerTwo';
    const playerTwoKey = isPlayerOneX ? 'playerTwo' : 'playerOne';
    p1ScoreElement.textContent = appState[playerOneKey].score;
    p2ScoreElement.textContent = appState[playerTwoKey].score;
    tieScoreElement.textContent = appState.totalTies;
}
function CPU_move(tileList) {
    const CPU_Mark = appState.playerTwo.mark;
    let CPU_tile = getRandomNumber(tileList.length)
    while(tileList[CPU_tile].dataset.isSelected) {
         CPU_tile = getRandomNumber(tileList.length)
    }
    createImage(`assets/icon-${CPU_Mark}.svg`, tileList[CPU_tile], CPU_Mark);
    tileList[CPU_tile].dataset.isSelected = "true";
    appState.currentTurn = "playerOne"
    nextTurn()
}

function getRandomNumber(max) {
    return  Math.floor(Math.random() * max)
}

function checkBoard(tiles) {
    const possibleLines = getWinningLines(Array.from(tiles))
    for(const line of possibleLines) {
        if(Array.from(tiles).every(t => t.dataset.isSelected)) displayWinner("tie");
        if(line.every(l => l.firstChild?.dataset.markId === "x")) displayWinner('x', line);
        if(line.every(l => l.firstChild?.dataset.markId === "o")) displayWinner('o', line);
    }
}

function getWinningLines(tilesArr) {
    return [
        [tilesArr[0], tilesArr[1], tilesArr[2]],
        [tilesArr[3], tilesArr[4], tilesArr[5]],
        [tilesArr[6], tilesArr[7], tilesArr[8]],

        [tilesArr[0], tilesArr[3], tilesArr[6]],
        [tilesArr[1], tilesArr[4], tilesArr[7]],
        [tilesArr[2], tilesArr[5], tilesArr[8]],

        [tilesArr[0], tilesArr[4], tilesArr[8]],
        [tilesArr[2], tilesArr[4], tilesArr[6]],
    ];
}

function displayWinner(mark, line) {
    const endScreenDOM = {
        endScreenImg: document.getElementById('endScreenImg'),
        endScreenElement: document.getElementById('endScreen'),
        focusContentElement: document.getElementById('focusContent'),
        winnerElement: document.getElementById('endScreenWinner'),
        resultTextElement: document.getElementById('resultText'),
        winnerContent: document.getElementById('winnerContentContainer')
    }
   
    const textColor = mark ==='x' ? 'secondary' : 'primary';
    appState.currentScreen = 'endScreen';
    endScreenDOM.endScreenElement.classList.remove('is-hidden');
    endScreenDOM.focusContentElement.classList.remove('is-hidden');
    endScreenDOM.resultTextElement.textContent = winningMessage(mark);
    updateScoreUI()
    if(mark === 'tie') {
        endScreenDOM.winnerContent.classList.add('is-hidden');
        endScreenDOM.resultTextElement.classList.add('is-tie');
        return
    } 
    endScreenDOM.endScreenImg.setAttribute("src", `assets/icon-${mark}.svg`);
    endScreenDOM.winnerElement.classList.add(`color-${textColor}`);
    line.forEach(e => e.classList.add(`${mark}-win`));
}

function winningMessage(mark) {
     const displayMessage = {
        vsCpuLose: "Oh no, you lost...",
        vsCpuWin: "you won!",
        p1Win: "Player 1 wins!", 
        p2Win: "Player 2 wins!", 
        tied: "round tied"
    }

    if(mark === "tie") {
        appState.totalTies ++;
        return displayMessage.tied ;
    } 
    if(appState.mode === 'CPU') {
        if(mark === 'x' && appState.playerOne.mark === 'x') {
            appState.playerOne.score++;
            return displayMessage.vsCpuWin;
        }
        appState.playerTwo.score++;
        return displayMessage.vsCpuLose;
    }
    if(mark === 'x' && appState.playerOne.mark === 'x') {
        appState.playerOne.score++;
        return displayMessage.p1Win;
    }
    appState.playerTwo.score++;
        console.log(appState)

    return displayMessage.p2Win;
}