const message = document.querySelector("#message");                     // Get the p element with message id
const input = document.querySelector("#input");                         // Get the input element with input id
const guessBtn = document.querySelector("#guess-btn");                  // Get the button element with guess-btn id
const resetBtn = document.querySelector("#reset-btn");                  // Get the button element with reset-btn id
const scoreDisplay = document.querySelector("#score-display");          // Get the p element with score-display id
const highscoreDisplay = document.querySelector("#highscore-display");  // Get the p element with highscore-display id
const header = document.querySelector("#header");                       // Get the div element with header id

// Total number of attempts for the game
const attempts = 20;

// Green color to display if guessed correct number
const correctColor = "#3c7901";
// Default background color of header
const defaultColor = "#d2691e";

// To store attempts of previous game,
// (which we need to display the highscore)
let prevAttempts = 0;  

// To store the attempts of ongoing game,
// (also to compare with preAttempts and determine whether highscore should be incremented or not)
let currentAttempts = 0;    

// To store and display highscore
let highscore = 0;

// To store and display score  
let score = 20;             

// Function to generate random numbers between 0 - 20
function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 20);
    return randomNumber;
}

// Calling generateRandomNumber() function and storing the random number
randomNumber = generateRandomNumber();

// Main game logic
function gameLogic() {
    // Converting value of input to int in order to comapre it with randomNumber;
    let guessedNumber = input.value;
    if(guessedNumber != "") {
        // If guessedNumber is same as randomNumber
        if(guessedNumber == randomNumber) {    
            currentAttempts++;                              // Increase the attempts by +1
            score--;                                        // Decrease the score by -1
            scoreDisplay.textContent = score;               // Display the decreased score
            message.textContent = "Correct!";               // Display "correct!" message
            header.style.backgroundColor = correctColor;    // Change the background color of header to green

            // Condition to check whether current attempts are less than or equal to previous attempts
            // In order to determine whether to increase highscore or not
            // || (OR) condition for the first game because it is highscore by default
            if(currentAttempts <= prevAttempts || prevAttempts === 0) {  
                highscore++;                                // Increase highscore by +1
                highscoreDisplay.textContent = highscore;   // Display highscore
            }

            // Reset button is disabled by default so we enable it here to go to next round
            resetBtn.disabled = false;
            // Disable guess button so player cannot press guess button and confuse the program
            guessBtn.disabled = true;
        
        // If guessedNumber isn't same as randomNumber
        }else {
            // If score is greater than 0
            if(score > 0) {
                // If guessedNumber is higher than randomNumber
                if(guessedNumber > randomNumber) {
                    message.textContent = "Higher Than Expected!";  // Display "Higher Than Expected!"
                // If guessedNumber is not higher than randomNumber
                }else {
                    message.textContent = "Lower Than Expected!";   // Display "Lower Than Expected!"
                }
                score--;                            // Decrease the score
                currentAttempts++;                  // Increase attempts
                scoreDisplay.textContent = score;   // Display the score
            // If score is less than 0 (negative [-])
            }else {
                message.textContent = "You Lost!"   // Display "You Lost!"
                resetBtn.disabled = false;          // Enable reset button to restart the game
                guessBtn.disabled = true;           // Disable guess button
            }
        }
    }else {
        alert("Please Enter Number First!!!");      // Alert user if they didn't add anything in input
    }
}

// Function to restart the game 
function reset() {
    // Calculate the attempts you used in the game to use it in the next round and determine highscore
    prevAttempts = attempts - score;
    currentAttempts = 0;                            // Reset currentAttempts back to 0
    score = 20;                                     // Reset score back to 20
    header.style.backgroundColor = defaultColor;    // Change the background color of header back to default
    scoreDisplay.textContent = score;               // Display the default score
    message.textContent = "Start Guessing....";     // Clear the message
    randomNumber = generateRandomNumber();          // Call generateRandomNumber() function to get randomNumber
    resetBtn.disabled = true;                       // Disable reset button
    guessBtn.disabled = false;                      // Enable guess button
}

// Event Listener to hear the click event on guess button and call the gameLogic() funciton
guessBtn.addEventListener("click", gameLogic);

// Event Listener to hear the click event on reset button and call the reset() function
resetBtn.addEventListener("click", reset);