
// Quiz Code

// Timer Variables
let timer = document.getElementById('timer');

let timeLeft = 76;


// Reference for buttons
let pageButtons = document.getElementById("buttons");

let viewScoresBtn = document.getElementById("view-scores");


// Variables for the quiz questions and answers
let currentQuestion = 0; // keep count

let quizQuestions = document.getElementById("quiz-questions");

let choiceResult = document.getElementById("choice-result");

let quizChoices = document.getElementById("quiz-choices");


// Variables for the users score
let scoresContainer = document.getElementById("scores-container");

let userScores = JSON.parse(window.localStorage.getItem("highScores"));

let emptyScore = [];

let score = 0

// Start Game Button
let startQuiz = document.getElementById("start-quiz");
startQuiz.addEventListener("click", startTimer);

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
    if (timeLeft <= 0 || currentQuestion === questions.length) {
      clearInterval(timeInterval);
      storeUserScore();
    }
  }, 1000);
}

// Questions function for the quiz
function startQuestions() {
  removeEls(startQuiz);

  if (currentQuestion < questions.length) {
    quizQuestions.innerHTML = questions[currentQuestion].title;
    quizChoices.textContent = "";

    for (let i = 0; i < questions[currentQuestion].userChoice.length; i++) {
      let el = document.createElement("button")
      el.innerText = questions[currentQuestion].userChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[currentQuestion].correct) {
          score += timeLeft;
        } else {
          score -=10;
          timeLeft = timeLeft - 15;
        }
          quizQuestions.innerHTML = "";

          if (currentQuestion === questions.length) {
            return;
          } else {
            currentQuestion++;
            startQuestions();
          }
        });
      quizChoices.append(el);
    }
  }
}

// Store the user score
function storeUserScore() {
  timer.remove();
  quizChoices.textContent = "";

  let userInitials = document.createElement("input");
  let userScoresBtn = document.createElement("input");

  choiceResult.innerHTML = 'You completed the quiz! Your score was ${score}! ENTER Initials: ';
  userInitials.setAttribute("type", "text");
  userScoresBtn.setAttribute("type", "button");
  userScoresBtn.setAttribute("value", "My Score!");
  userScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let scoresGathered = defineScoresGathered(userScores, emptyScore);
    let initials = userInitials.value;
    let userInitialsScore = {
      initials: initials,
      score: score,
    };
  
    scoresGathered.push(userInitialsScore);
    keepScore(scoresGathered);
    displayAllUserScores();
    removeScoreBtn();
    goToQuizBtn();
    viewScoresBtn.remove();
  });
  results.append(userInitials);
  results.append(userScoresBtn);
}

// Section of code is for adding scores to local storage and displaying high scores.

let keepScore = array => {
  window.localStorage.setItem("userScores", JSON.stringify(array));
}

// Code to give definition to array
let defineScoresGathered = (arr1, arr2) => {
  if (arr1 !== null) {
    return arr1;
  } else {
    return arr2;
  }
};

let removeEls = (...els) => {
  for (let el of els) el.remove();
}

// Function to display past scores
function displayAllUserScores() {
  removeEls(timer, startQuiz, results);
  let scoresGathered = defineScoresGathered(userScores, emptyScore);

  scoresGathered.forEach(obj => {
    let userSavedScores = obj.score;
    let initials = obj.initials;
    let choiceResultP = document.createElement("p");
    choiceResultP.innerText = `${initials}: ${userSavedScores}`;
    pageButtons.append(choiceResultsP);
  });
}

// Function for viewing the saved scores by clicking a button on the page
function highScore () {
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startQuiz);
    displayAllUserScores();
    removeEls(viewScoresBtn);
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
    removeEls(scoresContainer);
    window.localStorage.removeItem("userScores");
  })
  
  scoresContainer.append(removeBtn)
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

highScore();