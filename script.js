// let wordBank = [
//     'collection',
//     'puzzle',
//     'musician',
//     'birthday',
//     'painting',
//     'surprise',
//     'genius',
//     'restaurant',
//     'candle',
//     'actress'
// ];

// function generateRandomNumber() {
//     let rndmNum = Math.floor(Math.random() * 7)
//     return rndmNum
// }

// function generateQuote(num) {
//     document.getElementById('press-quote').textContent = wordBank[num]
// }

// function buildPage() {
//     generateQuote(generateRandomNumber());
// }

// buildPage()

// let text = "${workBank}";
// let firstChar = text.charAt(0); 
// let thirdChar = text.charAt(2); 

let playerPhotoData = null;
let playerName = "";
let playerLives = 5;
let computerLives = 5;

function showScreen(id) {
    const current = document.querySelector('.screen.active');
    const next = document.getElementById(id);

    if (current === next) return;

    if (current) {
        current.classList.remove('active');
        setTimeout(() => {
            next.classList.add('active');
        }, 600); // matches CSS transition time
    } else {
        next.classList.add('active');
    }
}

function startGame() {
    playerName =
        document.getElementById('playerNameInput').value || "Player";
    document.getElementById('playerName').textContent = playerName;
    showScreen('screen-choose');
}

function play(playerChoice) {
    const gamePhoto = document.getElementById("playerPhotoGame");
    if (playerPhotoData && gamePhoto) {
        gamePhoto.src = playerPhotoData;
        gamePhoto.style.display = "block";
    }

    const choices = ['cupcake', 'cake', 'cookie'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let resultText = `You chose ${playerChoice}, Gingerbread man chose ${computerChoice}. `;

    if (playerChoice === computerChoice) {
        resultText += "It's a tie!";
    } else if (
        (playerChoice === 'cupcake' && computerChoice === 'cookie') ||
        (playerChoice === 'cake' && computerChoice === 'cupcake') ||
        (playerChoice === 'cookie' && computerChoice === 'cake')
    ) {
        computerLives--;
        resultText += `${playerName} wins this round!`;
    } else {
        playerLives--;
        resultText += "Gingerbread man wins this round!";
    }
}

function gameOver() {
    document.getElementById('gameOverText').textContent =
        playerLives > 0
            ? `${playerName} Wins!`
            : "Gingerbread man Wins";
    showScreen('screen-gameover');
}

function resetGame() {
    playerLives = 5;
    computerLives = 5;
    updateHearts();
    showScreen('screen-name');
}


function setScaledCursor(width, height, hotX, hotY) {
    const img = new Image();
    img.src = 'whisk.png';
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/png');
        document.body.style.cursor =
            `url(${dataUrl}) ${hotX} ${hotY}, auto`;
    };
}


window.addEventListener('load', () => {
    setScaledCursor(48, 48, 24, 24);

    const nameInput =
        document.getElementById('playerNameInput');
    if (nameInput) {
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                startGame();
            }
        });
    }
});


let quotesArray = [
    'You win!',
    'Congrats!',
    'It is not important to window, it is important to make the other guy lose.',
    'Now we have a one-game winning streak ',
    'You are amazing ',
    'Good Job! ',
    'Rock Paper Scissors Champion! '
];

function generateRandomNumber() {
    let rndmNum = Math.floor(Math.random() * 7)
    return rndmNum
}

function generateQuote(num) {
    document.getElementById('press-quote').textContent = quotesArray[num]
}

function buildPage() {
    generateQuote(generateRandomNumber());
}

buildPage()