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
    title:
      "Finish the lyric -- Britney says: <i>'Oops I did it again, I played with your heart ___'</i>",
    answers: [
      "...can't you see I'm a fool in so many ways",
      "...got lost in the game",
      "...that is just so typically me",
    ],
    correct: "...got lost in the game",
  },
  {
    title:
      "Finish the lyric -- Jimmy Eat World Says: <i>'You know you're doing better on your own? ___'</i>",
    answers: [
      "...so don't buy in",
      "...for someone else",
      "...you know they're all the same",
    ],
    correct: "...so don't buy in",
  },
  {
    title:
      "Finish the lyric -- OutKast says: <i>'I want to see you on your badest behavior! ___'</i>",
    answers: [
      "...now, what's cooler than being cool?",
      "...shake it, shake it, shake it",
      "...lend me some sugar, I am your neighbor!",
    ],
    correct: "...lend me some sugar, I am your neighbor!",
  },
  {
    title:
      "Finish the lyric -- Kelly Clarkson says: <i>'How can I put it? You put me on ___'</i>",
    answers: [
      "...since you been gone",
      "...I even fell for that stupid love song",
      "...guess you never felt that way",
    ],
    correct: "...I even fell for that stupid love song",
  },
  {
    title:
      "Finish the lyric -- N'sync says: <i>'Every little thing I do, never seems enough for you ___'</i>",
    answers: [
      "...but in the end, ya know it's gonna be me",
      "...guess what? It's gonna be me",
      "...you don't want to lose it again",
    ],
    correct: "...you don't want to lose it again",
  },
  {
    title:
      "Finish the lyric -- Blink 182 says: <i>'Where are you? And I'm so sorry ___'</i>",
    answers: [
      "...I cannot sleep, I cannot dream tonight",
      "...this sick, strange darkness",
      "...and as I stare, I counted the webs from all the spiders",
    ],
    correct: "...I cannot sleep, I cannot dream tonight",
  },
];
// let firstName;
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
    answerBtn.setAttribute("class", "btn");
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
    alert("Oops, try again!");
    // TODO: Subtract time from timer
    timerCount = timerCount - 5;
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
      alert(
        "🎶 You may hate me but it ain't no lie -- bye, bye, bye! You lost the game. 🎶"
      );
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
