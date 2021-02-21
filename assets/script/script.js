// Javascript Quiz Code 

// Questions array for questions user will be asked
let questions = [
  {
    askUser: "Which of the following is not Javascript frameworks or libraries?",
    userChoice: ["1. Polymer", "2. Meteor", "3. Cassandra", "4. jQuery"],
    correctAnswer: "Cassandra",
  },
  {
    askUser:
      "Among the following, which one is a ternary operator in Javascript?",
    userChoice: ["1. #", "2. ::", "3. &", "4. ?"],
    correctAnswer: "?",
  },
  {
    askUser: "What are the two basic groups of dataypes in JavaScript?",
    userChoice: [
      "1. Primitive",
      "2. Reference types",
      "3. All of the above",
      "4. None of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    askUser:
      "Which of the following method checks if its argument is not a number?",
    userChoice: [
      "1. isNan()",
      "2. nonNaN()",
      "3. NaN()",
      "4. None of the above",
    ],
    correctAnswer: "isNaN()",
  },
  {
    askUser: "What is the purpose of the Attr object in the HTML DOM?",
    userChoice: [
      "1. Used to focus on a particular part of the HTML page",
      "2. HTML Attribute",
      "3. Used to arrange elements",
      "4. Not mentioned",
    ],
    correctAnswer: "HTML Attribute",
  },
  {
    askUser: "JavaScript can be written __________",
    userChoice: [
      "1. directly into HTML pages",
      "2. directly on the server page",
      "3. directly into css file",
      "4. directly into JS file and included in the HTML file",
    ],
    correctAnswer: "directly into JS file and included in the HTML file",
  },
];

// Start time for quiz timer
let timeLeft = 75;

let timer = document.getElementById("timer");

let scoresContainer = document.getElementById("scores-container");
// Reference for created buttons to placed in
let pageButtons = document.getElementById("buttons");
// Reference for score information
let viewScoresBtn = document.getElementById("view-scores");

// Start the quiz 
let startQuiz = document.getElementById("start-quiz");
startQuiz.addEventListener("click", quizTime);

// Quiz questions, multiple choices, and answer result(correct or wrong)
let quizQuestions = document.getElementById("quiz-questions");

let quizResults = document.getElementById("quiz-results");

let quizChoice = document.getElementById("quiz-choice");

// Variables for tracking user input information
let emptyScore = [];

let userScores = JSON.parse(window.localStorage.getItem("userScores"));

let currentQuestion = 0;

let score = 0;

// Timer start function
function quizTime() {
  generateQuestions();
  let defineTimer = setInterval(function () {
    timeLeft--;
    timer.textContent = "";
    timer.textContent = "Time Remaining: " + timeLeft;
    if (timeLeft <= 0 || currentQuestion === questions.length) {
      clearInterval(defineTimer);
      generateScore();
    }
  }, 1000);
}

// Once quiz is started pull the information from the array above
// Create the Question Dialog and buttons to select a choice
function generateQuestions() {
  removeElement(startQuiz);

  if (currentQuestion < questions.length) {
    quizQuestions.innerHTML = questions[currentQuestion].askUser;
    quizChoice.textContent = "";

    for (let i = 0; i < questions[currentQuestion].userChoice.length; i++) {
      let quizBtn = document.createElement("button");
      quizBtn.innerText = questions[currentQuestion].userChoice[i];
      quizBtn.setAttribute("data-id", i);
      quizBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        if (quizBtn.innerText === questions[currentQuestion].correctAnswer) {
          score += timeLeft;
        } else {
          score -= 10;
          timeLeft = timeLeft - 15;
        }

        quizQuestions.innerHTML = "";

        if (currentQuestion === questions.length) {
          return;
        } else {
          currentQuestion++;
          generateQuestions();
        }
      });
      quizChoice.append(quizBtn);
    }
  }
}

// Generate the score after quiz is complete and then gives user option to save
function generateScore() {
  timer.remove();
  quizChoice.textContent = "";

  let userInitials = document.createElement("input");
  let saveScoreBtn = document.createElement("input");

  quizResults.innerHTML = `You scored ${score} points! Enter initials: `;
  userInitials.setAttribute("type", "text");
  saveScoreBtn.setAttribute("type", "button");
  saveScoreBtn.setAttribute("value", "Post My Score!");
  saveScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let savedScores = isLocalScores(userScores, emptyScore);

    let initials = userInitials.value;
    let initialsScore = {
      initials: initials,
      score: score,
    };

    savedScores.push(initialsScore);
    localScores(savedScores);
    userViewScores();
    userClearBtn();
    returnToQuiz();
    viewScoresBtn.remove();
  });
  quizResults.append(userInitials);
  quizResults.append(saveScoreBtn);
}

const removeElement = (...els) => {
  for (let el of els) el.remove();
};

const isLocalScores = (arr1, arr2) => {
  if (arr1 !== null) {
    return arr1;
  } else {
    return arr2;
  }
};

const localScores = (array) => {
  window.localStorage.setItem("userScores", JSON.stringify(array));
};

function userViewScores() {
  removeElement(timer, startQuiz, quizResults);
  let savedScores = isLocalScores(userScores, emptyScore);

  savedScores.forEach((obj) => {
    let initials = obj.initials;
    let userScores = obj.score;
    let quizResultsP = document.createElement("p");
    quizResultsP.innerText = `${initials}: ${userScores}`;
    scoresContainer.append(quizResultsP);
  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function (event) {
    event.preventDefault();
    removeElement(timer, startQuiz);
    userViewScores();
    removeElement(viewScoresBtn);
    userClearBtn();
    returnToQuiz();
  });
}

function userClearBtn() {
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Your Scores");
  clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    removeElement(scoresContainer);
    window.localStorage.removeItem("userScores");
  });
  scoresContainer.append(clearBtn);
}

function returnToQuiz() {
  let toQuizBtn = document.createElement("input");
  toQuizBtn.setAttribute("type", "button");
  toQuizBtn.setAttribute("value", "Return To Quiz");
  toQuizBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.reload();
  });
  pageButtons.append(toQuizBtn);
}

viewScores();
