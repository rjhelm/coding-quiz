
// Application Code

// Game timer variables
let timeLeft = 75;

// Display Timer
let timer = document.getElementById('timer');

// Current game score display
let scoreDisplay = document.getElementById("score-display");

let pageButtons = document.getElementById("page-buttons");

// High Score Button
let highScore = document.getElementById("high-score");

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

// Variable for tracking quiz score
let score = 0

// Array for questions and answers
let questions = [
  {
    title: "Which of the following is not Javascript frameworks or libraries?",
    userChoice: ["1. Polymer", "2. Meteor", "3. Cassandra", "4. jQuery"],
    correct: "Cassandra",
  },
  {
    title:
      "Among the following, which one is a ternary operator in Javascript?",
    userChoice: ["1. #", "2. ::", "3. &", "4. ?"],
    correct: "?",
  },
  {
    title: "What are the two basic groups of dataypes in JavaScript?",
    userChoice: [
      "1. Primitive",
      "2. Reference types",
      "3. All of the above",
      "4. None of the above",
    ],
    correct: "All of the above",
  },
  {
    title:
      "Which of the following method checks if its argument is not a number?",
    userChoice: ["1. isNan()", "2. nonNaN()", "3. NaN()", "4. None of the above"],
    correct: "isNaN()",
  },
  {
    title: "What is the purpose of the Attr object in the HTML DOM?",
    userChoice: [
      "1. Used to focus on a particular part of the HTML page",
      "2. HTML Attribute",
      "3. Used to arrange elements",
      "4. Not mentioned",
    ],
    correct: "HTML Attribute",
  },
  {
    title: "JavaScript can be written __________",
    userChoice: [
      "1. directly into HTML pages",
      "2. directly on the server page",
      "3. directly into css file",
      "4. directly into JS file and included in the HTML file",
    ],
    correct: "directly into JS file and included in the HTML file"
  }
];

// Function to begin timer when the user clicks to start the quiz
function startTimer() {
  startQuestions();
  let timeInterval = setInterval(function(){
    timeLeft--;
    timer.textContent = "";
    timer.textContent = "Time Remaining: " + timeLeft;
    if (timeLeft <= 0 || questionCurrent === questions.length) {
      clearInterval(timeInterval);
      storeUserScore();
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
      let el = document.createElement("button").style.backgroundColor = "purple";
      el.innerText = question[questionCurrent].userChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[questionCurrent].correct) {
          document.getElementById("el").style.backgroundColor = "green";
          score += timeLeft;
        } else {
          document.getElementById("el").style.backgroundColor = "red";
          score -=10;
          timeLeft = timeLeft - 15;
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
    pageButtons.append(answerResultsP);
  });
}

// Function for viewing the saved scores by clicking a button on the page
function yourScores () {
  highScore.addEVentListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startQuiz);
    displayAllUserScores();
    removeEls(highScore);
    removeScoreBtn();
    toQuizBtn();
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

yourScores();