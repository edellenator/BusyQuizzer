const startBtn = document.querySelector (".start-btn button");
const rulesBox = document.querySelector(".rules");
const btnBegin = rulesBox.querySelector(".begin");
const btnCancel = rulesBox.querySelector(".cancel");
const quizBox = document.querySelector(".quiz-box");
const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text");
const optionList = document.querySelector(".options");
const correct = document.querySelector(".correct");
const incorrect = document.querySelector(".incorrect");
const resultsBox = document.querySelector(".results-box");
const highScore = document.querySelector(".current-high-score");
const playerScore = document.querySelector(".player-score");
const timer = document.querySelector(".timer");
var userScore = 0;
var currentHigh = 0;
var userName = "";
var userLogs = [];


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
    // reveal quiz box
    quizBox.classList.add("activeQuiz");
    rulesBox.classList.remove("activeRules")
    // add questions to quiz box
    showQuestions(questionCount)
    // start counter
    startTimer(timeStart)
    
}

var startTimer = function (counter) {
    timeStart = setInterval(countdown, 1000);
    function countdown(){
        timer.textContent = counter;
        counter--;
        if (counter <= 0) {
            timer.textContent = 0
            quizEnd();
        }
    }
}



btnBegin.addEventListener("click", quizStart);

var showQuestions = function(index) {
    var numb = questions[index].number;
    questionNumber.textContent = numb;
    var ask = questions[index].question;
    questionText.textContent = ask;
    var optDisplay = "<li class='option-item'>" + questions[index].opt[0] + "</li>" + "<li class='option-item'>" + questions[index].opt[1] + "</li>" + "<li class='option-item'>" + questions[index].opt[2] + "</li>" + "<li class='option-item'>" + questions[index].opt[3] + "</li>";
    optionList.innerHTML = optDisplay;
    
    const optionItem = optionList.querySelectorAll(".option-item");

    for (i=0; i < optionItem.length; i++) {
        optionItem[i].setAttribute("onclick", "optionSelected(this)");
    }
    // const optionItem = optionList.querySelectorAll(".option-list")
    // optionItem.addEventListener("click", optionSelected)
    console.log(optionItem);

}

var optionSelected = function(select) {
    var userSelect = select.textContent;
    var correctAns = questions[questionCount].answer;
    if (userSelect === correctAns) {
        userScore = userScore + 10;
        correct.classList.add("correctActive");
        incorrect.classList.remove("incorrectActive"); 
    }
    else {
        console.log(timer.textContent);
        var decrementTime = timer.textContent;
        decrementTime = decrementTime - 10;
        clearInterval(timeStart);
        timeStart = decrementTime;
        startTimer(timeStart);
        incorrect.classList.add("incorrectActive");
        correct.classList.remove("correctActive");
    }
    console.log(userScore);
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
    }
    else {
        quizEnd();
    }
    
}

var saveScores = function () {
    localStorage.setItem("high score", currentHigh);
    localStorage.setItem("User Scores", JSON.stringify(userLogs));
    
}

var retrieveScores = function () {

}

var quizEnd = function() {
    quizBox.classList.remove("activeQuiz");
    correct.classList.remove("correctActive");
    incorrect.classList.remove("incorrectActive");
    resultsBox.classList.add("activeResults");
    clearInterval(timeStart);
    const submitName = document.querySelector(".submit-name")
    playerScore.textContent="Your Score is " + userScore
    highScore.textContent = " " + currentHigh;
    submitName.onclick = ()=> {
        console.log("you clicked it");
        userName 
        console.log(userName)
        var userArray = [
            {
                name: userName = resultsBox.querySelector("input[name='player-name']").value,
                score: userScore,
            }
        ];
        userLogs.push(userArray);
        console.log(userLogs)
        if (userScore > currentHigh) {
            const highScoreEl = document.querySelector(".high-scores");
            var highScoreMes = document.createElement("p");
            highScoreMes.textContent = "Congratulations, you have the new high score!";
            highScoreEl.appendChild(highScoreMes);
            currentHigh = userScore
            console.log(currentHigh);
        
    };
    saveScores();  
    };
   
}
