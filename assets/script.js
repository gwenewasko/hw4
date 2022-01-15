// Global Variables
const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("time");
const timerContainer = document.getElementById("timer");
const scoreBoardElement = document.getElementById("scoreboard");
const nameDiv = document.getElementById("name");
const finalScore = document.getElementById("score");
const restartQuizBtn = document.getElementById("restartQuiz");
const scoreTitleElement = document.getElementById("scoretitle");
const questions = [
  {
    title: "What is David Blaine's first name?",
    answers: ["David", "Chris", "Joe Exotic"],
    correct: "David",
  },
  {
    title: "What is Cris Angel's last name?",
    answers: ["Angel", "Smith", "Blaine"],
    correct: "Angel",
  },
  {
    title: "What is Gwen's last name?",
    answers: ["Ewasko", "Angel", "Blaine"],
    correct: "Ewasko",
  },
];
// let firstName;
let qIndex = 0;
let timerCount = 30;
let isWin = false;
// Functions
function startGame() {
  timerContainer.style.display = "block";
  // Clear out previous question
  answersDiv.textContent = "";
  // Show first question with answers
  questionDiv.innerHTML = questions[qIndex].title;
  // Loop through answers
  questions[qIndex].answers.forEach((answer) => {
    // Create element button, add attributes value and text, add click event, and append button to the answers div
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    answerBtn.onclick = answerClick;
    answersDiv.appendChild(answerBtn);
  });
}
// Answer click function
function answerClick() {
  // Determine the answer the user chose
  let clickedAnswer = this.value;
  // Verify to see answer is correct
  if (clickedAnswer === questions[qIndex].correct) {
    // Let user know they got the right answer
    alert("Correct");
    // Move to next question or end game
    qIndex++;
    if (questions.length > qIndex) {
      startGame();
    } else {
      endGame();
    }
  } else {
    // Let user know they got the answer wrong
    alert("Oops! Try again.");
    // TODO: Subtract time from timer
    timerCount = timerCount - 10;
  }
}

// End quiz
function endGame() {
  isWin = true;
}
function startTimer() {
  // Sets timer
  startGame();
  time = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        firstName = prompt(
          `Game over, your score is ${timerCount}. Enter your name below to record your high score`
        );

        // nameDiv.textContent = firstName;
        // finalScore.textContent = timerCount;
        scoreBoardElement.style.display = "block";
        restartQuizBtn.style.display = "block";
        questionDiv.innerHTML = " ";
        answersDiv.innerHTML = " ";
        timerContainer.innerHTML = " ";

        clearInterval(time);
        recordUserScore();
        // let playAgain = confirm("Play again?");
        // if (playAgain) {
        //   location.reload();
        // }

        // winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(time);
      // loseGame();
      alert("You ran out of time and lost.");
    }
  }, 1000);
}

// Save high score
function recordUserScore() {
  const highScores =
    JSON.parse(window.localStorage.getItem("highScores")) || [];
  const theScore = {
    firstname: firstName,
    score: timerCount,
  };
  highScores.push(theScore);
  window.localStorage.setItem("highScores", JSON.stringify(highScores));
  scoreTitleElement.innerHTML = "Scores";
  highScores.forEach((score) => {
    scoreBoardElement.innerHTML += `<li>${score.firstname}: ${score.score}</li>`;
  });
}
// get local data
// set local storage to save name and score
// reorder data from highest to lowest
// loop through data in order to show separate lines
// show all scores and names
// localStorage.setItem("timerCount", JSON.stringify(timerCount));
// renderMessage();

function renderMessage() {
  var finalScore = JSON.parse(localStorage.getItem("timerCount"));
  if (finalScore !== null) {
    document.querySelector(".message").textContent =
      " Your score is " + timerCount.value;
  }
}
// Initialization - Start
startBtn.addEventListener("click", startTimer);
restartQuizBtn.addEventListener("click", function () {
  location.reload();
});
