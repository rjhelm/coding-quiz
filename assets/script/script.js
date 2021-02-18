let start = document.getElementById("start");

let quiz = document.getElementById("quiz");

let question = document.getElementById("question");

let qImg = document.getElementById("qImg");

let choiceA = document.getElementById("A");

let choiceB = document.getElementById("B");

let choiceC = document.getElementById("C");

let counter = document.getElementById("counter");

let timeGauge = document.getElementById("timeGauge");

let progress = document.getElementById("progress");

let scoreDiv = document.getElementById("scoreContainer");

let startQuestion = 0;
let endQuestion = question.length -1;

let questions = [
  {
    title:
      "Question: When using an if / else statement, how do you enclose the statement condition",
    choices: ["parenthesis", "brackets", "quotations", "curly brackets"],
    answer: "parenthesis",
  },
  {
    title: "Question: Javascript is a ___ type language. Fill in the ___",
    choices: ["dynamic", "static", "systemic", "variable"],
    answer: "dynamic",
  },
  {
    title:
      "Question: When using Javascript, which of these passes data types by value?",
    choices: ["non-primitive", "primitive", "variable", "operator"],
    answer: "primitive",
  },
  {
    title: "Which of the following is not a JavaScript Data Type?",
    choices: ["Undefined", "Number", "Boolean", "Float"],
    answer: "Float",
  },
  {
    title:
      "Question: Which of the following is correct about features of JavaScript?",
    choices: [
      "It can not Handling dates and time.",
      "JavaScript is a object-based scripting language.",
      "JavaScript is not interpreter based scripting language.",
      "ALL",
    ],
    answer: "JavaScript is a object-based scripting language."
  }
];

function renderQuestion() {
    let q = questions[startQuestions];

    question.innerHTML = "<p>" + q.question +"</p>";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}



