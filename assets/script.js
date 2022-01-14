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
let qIndex = 0;
let timerCount = 60;
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
        let firstName = prompt(
          `Game over, your score is ${timerCount}. Enter your name below to record your high score`
        );
        nameDiv.textContent = firstName;
        finalScore.textContent = timerCount;
        scoreBoardElement.style.display = "block";
        // questions.style.display = "hidden";

        clearInterval(time);
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
