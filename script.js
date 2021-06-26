const message = document.querySelector("#message");
const input = document.querySelector("#input");
const guessBtn = document.querySelector("#guess-btn");
const resetBtn = document.querySelector("#reset-btn");
const scoreDisplay = document.querySelector("#score-display");
const highscoreDisplay = document.querySelector("#highscore-display");

const attempts = 20;

let prevAttempts = 0;
let currentAttempts = 0;
let highscore = 0;
let score = 20;

function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 20);
    return randomNumber;
}

randomNumber = generateRandomNumber();

function gameLogic() {
    let guessedNumber = parseInt(input.value);
    if(guessedNumber === randomNumber) {
        currentAttempts++;
        score--;
        scoreDisplay.textContent = score;
        message.textContent = "Correct!";
        if(currentAttempts <= prevAttempts || prevAttempts === 0) {
            highscore++;
            highscoreDisplay.textContent = highscore;
        }
        resetBtn.disabled = false;
        guessBtn.disabled = true;
    }else {
        if(score > 0) {
            if(guessedNumber > randomNumber) {
                message.textContent = "Higher Than Expected!";
            }else {
                message.textContent = "Lower Than Expected!";
            }
            score--;
            currentAttempts++;
            scoreDisplay.textContent = score;
        }else {
            message.textContent = "You Lost!"
            resetBtn.disabled = false;
            guessBtn.disabled = true;
        }
    }
}

function reset() {
    prevAttempts = attempts - score;
    currentAttempts = 0;
    score = 20;
    scoreDisplay.textContent = score;
    message.textContent = "";
    randomNumber = generateRandomNumber();
    resetBtn.disabled = true;
    guessBtn.disabled = false;
}

guessBtn.addEventListener("click", gameLogic);
resetBtn.addEventListener("click", reset);