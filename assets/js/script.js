const startBtn = document.querySelector (".start-btn button");
const rulesBox = document.querySelector(".rules");
const btnBegin = rulesBox.querySelector(".begin");
const btnCancel = rulesBox.querySelector(".cancel");
const quizBox = document.querySelector(".quiz-box");
const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text");
const options = document.querySelector(".options");
const correct = document.querySelector(".correct");
const incorrect = document.querySelector(".incorrect");
const resultsBox = document.querySelector(".results-box");
const playerName = document.querySelector("#player-name");
const highScore = document.querySelector(".current-high-score");
const playerScore = document.querySelector(".player-score");
const timer = document.querySelector(".timer");
var user = [
    {
    name:"",
    score: 0,
    }
]
var userLogs = [

]

var questions = [
    {
        number:1,
        question: "Commonly used data types include",
        answer: "Numbers",
        opt: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ]
    },
    {
        number:2,
        question: "String values must be enclosed within _________ when being assigned to variables.",
        answer: "Quotes",
        opt: [
            "Commas",
            "Curly brackets",
            "Parenthesis",
            "Quotes"
        ]
    },
    {
        number:3,
        question: "A very useful tool for debugging is",
        answer: "Console Logging",
        opt: [
            "Javascript",
            "The DOM",
            "Console Logging",
            "For Loops"
        ]
    }
]
var timeStart = 300

var questionCount = 0;
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
    rulesBox.classList.remove("activeRules")
    // start counter
    showQuestions(0)
    startTimer(timeStart)
}

var startTimer = function (counter) {
    timeStart = setInterval(countdown, 1000);
    function countdown(){
        timer.textContent = counter;
        counter--;
        if (counter <= 0) {
            timer.textContent = 0
        }
    }
}

var quizEnd = function() {

}

btnBegin.addEventListener("click", quizStart);

var showQuestions = function(index) {
    var numb = questions[index].number;
    questionNumber.textContent = numb;
    var ask = questions[index].question;
    questionText.textContent = ask;
    var optDisplay = "<li>" + questions[index].opt[0] + "</li>" + "<li>" + questions[index].opt[1] + "</li>" + "<li>" + questions[index].opt[2] + "</li>" + "<li>" + questions[index].opt[3] + "</li>";
    options.innerHTML = optDisplay;                
}


