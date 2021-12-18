const tdElements = document.querySelectorAll('td');
const gameOverElement = document.getElementById('winMessage');
const gameOverTextElement = document.querySelector('[win-Message]');
const turnTakenElement = document.getElementById('whosTurn')
const turnTakenTextElement = document.querySelector('[whos-Turn]');
const restartButton = document.getElementById('restart');
const xmarker = 'x';
const omarker = 'o';
let oTurn;
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame() 

function startGame() {
    oTurn = false;
    turnTakenTextElement.innerText = `${oTurn ? "O's" : "X's"} Turn`;
    tdElements.forEach(td => {
        td.classList.remove(omarker);
        td.classList.remove(xmarker);
        td.removeEventListener('click', clicking);
        td.addEventListener('click', clicking, { once: true });
});
    gameOverElement.classList.remove('show');
}

function clicking(i) {
    const td = i.target;
    const currentClass = oTurn ? omarker : xmarker;
    playerTurn(td, currentClass);
    if (winningPlayer(currentClass)) {
        endGame(false);
    } else if (draw()) {
        endGame(true);
    } else {
      takeTurns();  
    }   
}

function playerTurn(td, currentClass) {
    td.classList.add(currentClass);
}

function takeTurns() {
    oTurn = !oTurn;
    turnTakenTextElement.innerText = `${oTurn ? "O's" : "X's"} Turn`;
    turnTakenTextElement.classList.add('show');
}

function winningPlayer(currentClass) {
    return winCombos.some(combination => {
        return combination.every(index => {
            return tdElements[index].classList.contains(currentClass);
        })
    })
}

function draw() {
    return [...tdElements].every(td => {
        return td.classList.contains(xmarker) ||
        td.classList.contains(omarker)
    });
}

function endGame(tie) {
    if (tie) {
        alert(gameOverTextElement.innerText = 'Draw!');
    } else {
        alert(gameOverTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`);
    }
    gameOverElement.classList.add('show');
}

restartButton.addEventListener('click', startGame);