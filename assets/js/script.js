const startBtn = document.querySelector (".start-btn button");
const rulesBox = document.querySelector(".rules");
const btnBegin = rulesBox.querySelector(".begin");
const btnCancel = rulesBox.querySelector(".cancel");
const quizBox = document.querySelector(".quiz-box");
const questionText = document.querySelector(".question-text");
const options = document.querySelector(".options");
const correct = document.querySelector(".correct");
const incorrect = document.querySelector(".incorrect");
const resultsBox = document.querySelector(".results-box");
const playerName = document.querySelector("#player-name");
const highScore = document.querySelector(".current-high-score");
const playerScore = document.querySelector(".player-score");
const timer = document.querySelector(".timer");

// start button clicked

var pressStart = function() {
    console.log("you pressed start");
    rulesBox.classList.add("activeRules");
};

startBtn.addEventListener("click", pressStart)

var pressCancel = function() {
    console.log ("you pressed cancel");
    rulesBox.classList.remove("activeRules");
}

btnCancel.addEventListener("click", pressCancel);

var quizStart = function() {
    console.log("you started the quiz")
    quizBox.classList.add("activeQuiz");
}

btnBegin.addEventListener("click", quizStart);
