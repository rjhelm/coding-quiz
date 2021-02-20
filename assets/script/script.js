
// Application Code

// Game timer variables
let timeLeft = 75;

// Display Timer
let timer = document.getElementById('timer');

// Current game score display
let scoreDisplay = document.getElementById("score-display");

let pageButtons = document.getElementById("page-buttons");

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

// Array for questions and answers
let questions = [
  {
    title: "Which of the following is not Javascript frameworks or libraries?",
    userChoice: ["Polymer", "Meteor", "Cassandra", "jQuery"],
    correct: "Cassandra",
  },
  {
    title:
      "Among the following, which one is a ternary operator in Javascript?",
    userChoice: ["#", "::", "&", "?"],
    correct: "?",
  },
  {
    title: "What are the two basic groups of dataypes in JavaScript?",
    userChoice: [
      "Primitive",
      "Reference types",
      "All of the above",
      "None of the above",
    ],
    correct: "All of the above",
  },
  {
    title:
      "Which of the following method checks if its argument is not a number?",
    userChoice: ["isNan()", "nonNaN()", "NaN()", "None of the above"],
    correct: "isNaN()",
  },
  {
    title: "What is the purpose of the Attr object in the HTML DOM?",
    userChoice: [
      "Used to focus on a particular part of the HTML page",
      "HTML Attribute",
      "Used to arrange elements",
      "Not mentioned",
    ],
    correct: "HTML Attribute",
  },
  {
    title: "JavaScript can be written __________",
    userChoice: [
      "directly into HTML pages",
      "directly on the server page",
      "directly into css file",
      "directly into JS file and included in the HTML file",
    ],
    correct: "directly into JS file and included in the HTML file"
  }
];

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

        if (el.innerText === questions[questionCurrent].correct) {
          score += secondsRemain;
        } else {
          score -=5;
          secondsRemain = secondsRemain - 10;
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

  answerResult.innerHTML = 'You completed the quiz! You got a score of ${score} points! ENTER Initials: ';
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
  window.localStorage.setItem("userScores", JSON.stringify(array));
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
// Option to remove the scores from the high score page
function removeScoreBtn() {
  let removeBtn = document.createElement("input");

  removeBtn.setAttribute("type", "button");
  removeBtn.setAttribute("value", "Remove Your Scores");
  
  removeBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoreDisplay);
    window.localStorage.removeItem("userScores");
  })
  scoreDisplay.append(removeBtn)
}

// Return to quiz
function quizReturnBtn() {
  let toQuizBtn = document.createElement("input");
  toQuizBtn.setAttribute("type", "button");
  toQuizBtn.setAttribute("value", "Return To Quiz");
  toQuizBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  pageButtons.append(toQuizBtn)
}

viewScores();