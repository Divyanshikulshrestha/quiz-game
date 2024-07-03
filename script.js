const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalTime = 30;
let timeLeft = totalTime;

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const timerDisplay = document.getElementById('timer-display');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = totalTime;
    restartButton.style.display = 'none';
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
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
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
    questionElement.textContent = 'Game Over!';
    resetState();
    restartButton.style.display = 'block';
    clearInterval(timer);
}

restartButton.addEventListener('click', startGame);

// Start the game initially
startGame();