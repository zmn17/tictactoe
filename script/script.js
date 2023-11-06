let turns = document.getElementById('player__turn-pic'); // this is an img element -> change the src value
let resetBtn = document.getElementById('reset');
let boxes = Array.from(document.getElementsByClassName('box'));

let x_score = document.getElementById('x-score');
let o_score = document.getElementById('o-score');
let draws = document.getElementById('ties-score');

const O_TEXT = '../images/circle.png';
const X_TEXT = '../images/close.png';

let currentPlayer = X_TEXT;
turns.src= currentPlayer;
let spaces = Array(9).fill(null);

let xScore = 0;
let oScore = 0;
let ties = 0; 

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        const imgElement = document.createElement('img');
        e.target.appendChild(imgElement);
        imgElement.className = 'player-box-img';
        imgElement.src = currentPlayer;
        turns.src = currentPlayer;

        if (playerHasWon() !== false) {
            if (currentPlayer === X_TEXT) {
                imgElement.id = 'X';
                xScore++;
                x_score.innerHTML = xScore;
            } else {
                imgElement.id = 'O';
                oScore++;
                o_score.innerHTML = oScore;
            }
            alert(`${imgElement.id} has won`);
            restart();
        } else if (spaces.every(space => space !== null) && playerHasWon() === false) {
            // Check for a draw when all spaces are filled
            ties++;
            draws.innerHTML = ties;
            alert('It\'s a draw!');
            restart();
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c];
        }
    }
    return false;
}

resetBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerHTML = '';
    });

    currentPlayer = X_TEXT;
    
}

startGame();


