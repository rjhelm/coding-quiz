
// Application Code

// Game timer variables
let timeLeft = 75;

// Display Timer
let timer = document.getElementById('timer');

// Current game score display
let scoreDisplay = document.getElementById("score-display");

let scoreButton = document.getElementById("score-button");

// High Score Button
let highScoreButton = document.getElementById("high-score");

// Start Game Button
let startGame = document.getElementById("start-game");
startGame.addEventListener("click", startTimer);

// Questions Elements
let questionDisplay = document.getElementById("question-display");

// Variable for answer result
let answerResult = document.getElementById("answer-result");

// Multiple options for the user to answer question
let answerOptions = document.getElementById("answer-options");

// Store high score 
let previousScore = [];

// Access the high scores from local storage
let storedScores = JSON.parse(window.localStorage.getItem("highScores"));

// Question user currently on
let questionCurrent = 0;

// Variable for tracking game score
let score = 0

// Function to begin timer when the user clicks to start the quiz
function startTimer() {
  let timeInterval = setInterval(function(){
    secondsRemain--;
    timer.textContent = "";
    timer.textContent = "Time Remaining: " + timeLeft;
    if (timeLeft <= 0 || questionCurrent === questionDisplay.length) {
      clearInterval(timeInterval);
      userScore();
    }
  }, 1000);
}

// Questions function for the quiz







