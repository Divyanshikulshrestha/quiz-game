const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: " Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "Who wrote the play “Romeo and Juliet”?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "George Orwell", correct: false },
      { text: "William Shakespeare", correct: true },
    ],
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false },
    ],
  },
  {
    question: "Which element is represented by the chemical symbol “Au”?",
    answers: [
      { text: "Silver", correct: false },
      { text: "Gold", correct: true },
      { text: "Copper", correct: false },
      { text: "Iron", correct: false },
    ],
  },
  {
    question: "Who was the first President of the United States?",
    answers: [
      { text: "Abraham Lincoln", correct: false },
      { text: "Thomas Jefferson", correct: false },
      { text: "George Washington", correct: true },
      { text: " John Adams", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: " Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Galileo Galilei", correct: false },
      { text: "Nikola Tesla", correct: false },
    ],
  },
  {
    question: "What is the main ingredient in guacamole?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Avocado", correct: true },
      { text: "Pepper", correct: false },
      { text: "Onion", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: 'Which continent is known as the "Dark Continent"?',
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
      { text: "South America", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalTime = 120;
let timeLeft = totalTime;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerDisplay = document.getElementById("timer-display");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = totalTime;
  restartButton.style.display = "none";
  nextQuestion();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function nextQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  const correct = answer.correct;
  if (correct) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    nextQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  questionElement.textContent = "Game Over!";
  resetState();
  restartButton.style.display = "block";
  clearInterval(timer);
}

restartButton.addEventListener("click", startGame);

startGame();
