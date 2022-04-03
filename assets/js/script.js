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
const scoreHigh = document.querySelector(".score-high")
const scoreBox = document.querySelector(".score-box")
const scoreLink = document.querySelector(".view-scores") 
const closeScores = scoreBox.querySelector(".hide-scores")
var userScore = 0;
var currentHigh = 0;
var userName = "";
//storage for user names and scores
var userLogs = [];

//questions array
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

//initial time start value equal to 300 seconds (5 minutes)
var timeStart = 300



var questionCount = 0;

// load previous high scores and user logs from previous sessions
window.onload = () => {
    retrieveScores();
    console.log(currentHigh);
    console.log(userLogs);
    
    function sortScore () {
        userLogs.sort((a,b) => {
            if (b.score < a.score) {
                return -1;
            }
            if (b.score > a.score) {
                return 1;
            }
            return 0;
            })
    }
    sortScore();
    return currentHigh, userLogs
}

// open and show current high score
var showScores = function () {
    var scoreText = "The Current High Score is: " + currentHigh;
    scoreHigh.textContent = scoreText;
    // const scoreItem = scoreBox.querySelector(".score-item")
    // for (i=0; i < userLogs.length; i++) {
    //     var scoreItemEl = document.createElement("p");
    //     scoreItemEl.textContent = "Name: " + userLogs[i].name + "  Score: " + userLogs[i].score;
        
    // }
    // scoreItem.appendChild(scoreItemEl);
    scoreBox.classList.add("activeScore")
    
}

scoreLink.addEventListener("click", showScores)


// close score box
var hideScores = function () {
    scoreBox.classList.remove("activeScore")
}

closeScores.addEventListener("click", hideScores)



// start button clicked - load instructions
var pressStart = function() {
    console.log("you pressed start");
    rulesBox.classList.add("activeRules");
};

startBtn.addEventListener("click", pressStart)

//cancel button clicked - return to start button screen

var pressCancel = function() {
    console.log ("you pressed cancel");
    rulesBox.classList.remove("activeRules");
}

btnCancel.addEventListener("click", pressCancel);


//start quiz after pressing start button on instructions screen
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
//start timer after pressing quiz start
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

//add question number, question text, and options for answers as quiz progresses
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
    var retrievedHigh = localStorage.getItem("high score");
    if (!retrievedHigh) {
        return false;
    };

    currentHigh = retrievedHigh;

    var retrievedUser = localStorage.getItem("User Scores");
    if (!retrievedUser) {
        return false;
    };

    retrievedUser = JSON.parse(retrievedUser);
    userLogs.push(retrievedUser);
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
        console.log(userName)
        var userArray = [
            {
                name: userName = resultsBox.querySelector("input[name='player-name']").value,
                score: userScore,
            }
        ];
        if (userArray.name === "") {
            alert("you must fill in your name");
            return quizEnd()
        };
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
