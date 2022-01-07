// Global Variables
const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const questions = [
  {
    title: "What is David Blaine's first name?",
    answers: ["David", "Chris", "Joe Exotic"],
    correct: "David",
  },
  {
    title: "What is God's last name?",
    answers: ["Smith", "Angel", "Blaine"],
    correct: "Smith",
  },
];

// Functions
function startGame() {
  // Show first question with answers
  questionDiv.innerHTML = questions[0].title;
  // Loop through answers
  // Create element button, add attributes value and text, add click event, and append button to the answers div
  answersDiv.innerHTML = questions[0].answers;
}
// Answer click function
// End quiz
// Save high score
// Initialization- start
startBtn.addEventListener("click", startGame);
