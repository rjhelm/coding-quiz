
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
let startQuiz = document.getElementById("start-quiz");
startQuiz.addEventListener("click", startTimer);

// Questions Elements
let quizQuestions = document.getElementById("quiz-questions");

// Variable for answer result
let answerResult = document.getElementById("answer-result");

// Multiple options for the user to answer question
let quizChoices = document.getElementById("quiz-choices");

// Store high score 
let storeHighScore = [];

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
function startQuestions() {
  removeEls(startQuiz);

  if (questionCurrent < questions.length) {
    quizQuestions.innerHTML = questions[questionCurrent].title;
    quizChoices.textContent = "";

    for (let i = 0; i < questions[questionCurrent].userChoice.length; i++) {
      let el = document.createElement("button");
      el.innerText = question[questionCurrent].userChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[questionCurrent].answer) {
          score += secondsRemain;
        } else {
          score -=7;
          secondsRemain = secondsRemain - 7;
        }
          quizQuestions.innerHTML = "";

          if (questionCurrent === questions.length) {
            return;
          } else {
            questionCurrent++;
            startQuestions();
          }
        });
      userChoice.append(el);
    }
  }
}

// Store the user score
function storeUserScore() {
  timer.remove();
  userChoice.textContent = "";

  let userInitials = document.createElement("input");
  let userScoresBtn = document.createElement("input");

  results.innerHTML = 'You completed the quiz! You got a score of ${score} points! ENTER Initials: ';
  userInitials.setAttribute("type", "text");
  userScoresBtn.setAttribute("type", "button");
  userScoresBtn.setAttribute("value", "My Score!");
  userScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    let allUserScores = scoresDefined(storedScores, storeHighScore);
    let initials = userInitials.value;
    let userInitialsScore = {
      initials: initials,
      score: score,
    };
  
    allUserScores.push(userInitialsScore);
    keepScore(allUserScores);
    displayAllUserScores();
    clearUserScoresBtn();
    goToQuizBtn();
    seeHighScoresBtn.remove();
  });
  results.append(userInitials);
  results.append(userScoresBtn);
}

// Section of code is for adding scores to local storage and displaying high scores.

let keepScore = array => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

// Code to give definition to array
let getAllUserScores = (arr1, arr2) => {
  if (arr1 !== null){
    return arr1
  } else {
    return arr2
  }
}

let removeEls = (...els) => {
  for (let el of els) el.remove();
}

// Function to display past scores
function displayAllUserScores() {
  removeEls(timer, startQuiz, results);
  let keepScore = getAllUserScores(storedScores, storeHighScore);

  keepScore.forEach(obj => {
    let userSavedScores = obj.score;
    let initials = obj.initials;
    let answerResultP = document.createElement("p");
    answerResultP.innerText = `${initials}: ${userSavedScores}`;
    scoresDiv.append(answerResultsP);
  });
}

// Function for viewing the saved scores by clicking a button on the page
function yourScores () {
  yourScoresBtn.addEVentListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startQuiz);
    displayAllUserScores();
    removeEls(yourScoresBtn);
    removeScoreBtn();
    backBtn();
  });
}

