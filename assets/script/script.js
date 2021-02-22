
// Assignment Javascript Code
// Questions and answers array for the quiz
var quizQuestions = [
  {
    question:
      "Which of the following is not Javascript frameworks or libraries?",
    choiceA: "Polymer",
    choiceB: "Meteor",
    choiceC: "Cassandra",
    choiceD: "jQuery",
    correctAnswer: "c",
  },
  {
    question: "Among the following, which one is a ternary operator?",
    choiceA: "#",
    choiceB: "::",
    choiceC: "&",
    choiceD: "?",
    correctAnswer: "d",
  },
  {
    question: "What are the two basic groups of datatypes in Javascript?",
    choiceA: "Primitive",
    choiceB: "Reference Types",
    choiceC: "All of the above",
    choiceD: "None of the above",
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following methods checks if its argument is not a number?",
    choiceA: "isNaN()",
    choiceB: "nonNaN()",
    choiceC: "NaN()",
    choiceD: "None of the above",
    correctAnswer: "a",
  },
  {
    question: "What is the purpose of the Attr object in HTML DOM?",
    choiceA: "Used to focus on a particular part of the HTML page",
    choiceB: "HTML Attribute",
    choiceC: "Used to arrange elements",
    choiceD: "Not mentioned",
    correctAnswer: "b",
  },
  {
    question: "JavaScript can be written __________?",
    choiceA: "directly into HTML pages",
    choiceB: "directly on the server page",
    choiceC: "into a css file",
    choiceD: "directly into JS file and included in HTML file",
    correctAnswer: "d",
  },
  {
    question: "With which of the following do you wrap an array?",
    choiceA: "[]",
    choiceB: "<>",
    choiceC: "()",
    choiceD: "{}",
    correctAnswer: "a",
  },
];

// HTML elements as global variables to plug in generated information
let quizBody = document.getElementById("quiz-body");
let choiceResult = document.getElementById("choice-result");
let startContainer = document.getElementById("start-container");
let quizTimer = document.getElementById("timer");
let startQuizButton = document.getElementById("start-btn");
let userScore = document.getElementById("user-score");
let quizComplete = document.getElementById("quiz-complete");
let scoreContainer = document.getElementById("score-container");
let questionsElement = document.getElementById("questions");
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");
let scoresPage = document.getElementById("scores-page");
let userInitials = document.getElementById("initials");
let scoreInitials = document.getElementById("score-initials");
let backClearBtns = document.getElementById("back-clear");
let saveScoreBtn = document.getElementById("save-score");
let userSavedScores = document.getElementById("user-saved");

// Global Variables to be called on 
var questionIndex = quizQuestions.length;
var questionsCurrent = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// Start the quiz and produce question
function generateQuizQuestion() {
  quizComplete.style.display = "none";
  if (questionsCurrent === questionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[questionsCurrent];
  questionsElement.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}


function startQuiz() {
  quizComplete.style.display = "none";
  startContainer.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 500);
  quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
  quizBody.style.display = "none";
  quizComplete.style.display = "flex";
  clearInterval(timerInterval);
  userInitials.value = "";
  userScore.innerHTML =
    "You got " + score + " points!";
}

// User is able to save the score to local storage to be viewed later
saveScoreBtn.addEventListener("click", function showScore() {
  if (userInitials.value === "") {
    alert("This cannot be blank!");
    return false;
  } else {
    var prevUserScores =
      JSON.parse(localStorage.getItem("prevUserScores")) || [];
    var currentUser = userInitials.value.trim();
    var gameScore = {
      name: currentUser,
      score: score,
    };

    quizComplete.style.display = "none";
    scoreContainer.style.display = "flex";
    scoresPage.style.display = "block";
    backClearBtns.style.display = "flex";

    prevUserScores.push(gameScore);
    localStorage.setItem("prevUserScores", JSON.stringify(prevUserScores));
    generateUserScores();
  }
});

// Create a list from local storage with user saved scores
function generateUserScores() {
  scoreInitials.innerHTML = "";
  userSavedScores.innerHTML = "";
  var highScores = JSON.parse(localStorage.getItem("prevUserScores")) || [];
  for (i = 0; i < highScores.length; i++) {
    var enterName = document.createElement("li");
    var userNewScore = document.createElement("li");
    enterName.textContent = highScores[i].name;
    userNewScore.textContent = highScores[i].score;
    scoreInitials.appendChild(enterName);
    userSavedScores.appendChild(userNewScore);
  }
}


function showScores() {
  startContainer.style.display = "none";
  quizComplete.style.display = "none";
  scoreContainer.style.display = "flex";
  scoresPage.style.display = "block";
  backClearBtns.style.display = "flex";

  generateUserScores();
}

// User is able to clear the local storage and start fresh
function clearScore() {
  window.localStorage.clear();
  scoreInitials.textContent = "";
  userSavedScores.textContent = "";
}

// User may go back to the quiz and try for better score
function tryAgain() {
  scoreContainer.style.display = "none";
  quizComplete.style.display = "none";
  startContainer.style.display = "flex";
  timeLeft = 76;
  score = 0;
  questionsCurrent = 0;
}

// This allows us to check each answer and subtract time when incorrect or let them know they were right
function checkAnswer(answer) {
  correct = quizQuestions[questionsCurrent].correctAnswer;

  if (answer === correct && questionsCurrent !== questionIndex) {
    score+= timeLeft;
    alert("That Is Correct!");
    questionsCurrent++;
    generateQuizQuestion();
    //display in the results div that the answer is correct.
  } else if (
    answer !== correct &&
    questionsCurrent !== questionIndex
  ) {
    alert("That Is Incorrect.");
    timeLeft = timeLeft - 15;
    questionsCurrent++;
    generateQuizQuestion();
    //display in the results div that the answer is wrong.
  } else {
    showScore();
  }

}

startQuizButton.addEventListener("click", startQuiz);
