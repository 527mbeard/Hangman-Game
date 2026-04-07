let wordBank = [
    "duke", "ball", "gown", "regency", "queen",
    "court", "dance", "love", "secret", "scandal",
    "carriage", "waltz", "tea", "promenade", "garden", 
    "bee", "ton", "heir", "viscount", 
];

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let maxWrong = 6;
let gameActive = false;

function setDifficulty(num) {
    maxWrong = num;
    startGame();

    document.getElementById("difficulty").style.display = "none";

    let game = document.getElementById("game");
    game.style.display = "block";

    setTimeout(() => {
        game.style.opacity = "1";
    }, 10);
}

function startGame() {
    selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    gameActive = true;
    updateDisplay();
    setMessage("The season begins… choose wisely.");
}

function updateDisplay() {
    let display = "";

    for (let i = 0; i < selectedWord.length; i++) {
        let letter = selectedWord.charAt(i);
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    document.getElementById("wordDisplay").innerText = display;
    document.getElementById("usedLetters").innerText = guessedLetters.join(", ");
    document.getElementById("wrongCount").innerText = wrongGuesses + " / " + maxWrong;
    document.getElementById("healthImage").src = "images/" + (maxWrong - wrongGuesses) + ".png";
}

function setMessage(text) {
    document.getElementById("message").innerText = text;
}

function handleGuess() {
    if (!gameActive) return;

    let input = document.getElementById("guessInput");
    let guess = input.value.toLowerCase();
    input.value = "";

    if (!guess.match(/^[a-z]$/)) {
        setMessage("Only proper letters, dear reader.");
        return;
    }

    if (guessedLetters.includes(guess)) {
        setMessage("You have already whispered that letter.");
        return;
    }

    guessedLetters.push(guess);

    if (!selectedWord.includes(guess)) {
        wrongGuesses++;
        setMessage("A misstep… how unfortunate.");
    } else {
        setMessage("How delightful… quite correct.");
    }

    updateDisplay();
    checkWin();
}

function checkWin() {
    let won = true;

    for (let i = 0; i < selectedWord.length; i++) {
        if (!guessedLetters.includes(selectedWord.charAt(i))) {
            won = false;
        }
    }

    if (won) {
        setMessage("You have triumphed this season, Your Grace 👑");
        gameActive = false;
        createConfetti();
    }

    if (wrongGuesses >= maxWrong) {
        setMessage("Utter scandal! The word was: " + selectedWord);
        gameActive = false;
    }
}

function restartGame() {
    let game = document.getElementById("game");

    game.style.opacity = "0";

    setTimeout(() => {
        game.style.display = "none";
        document.getElementById("difficulty").style.display = "block";
    }, 500); 

    setMessage("");
    document.getElementById("wordDisplay").innerText = "";
    document.getElementById("usedLetters").innerText = "";
    document.getElementById("wrongCount").innerText = "";
    document.getElementById("healthImage").src = "images/6.png";

    gameActive = false;
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        let div = document.createElement("div");
        div.className = "sparkle";
        div.style.left = Math.random() * 100 + "vw";
        div.style.animationDuration = (Math.random() * 3 + 3) + "s";
        document.body.appendChild(div);

        setTimeout(() => div.remove(), 6000);
    }
}

document.getElementById("guessInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleGuess();
    }
});
