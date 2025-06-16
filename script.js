const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    answer: 1,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: 0,
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: 2,
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: 1,
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: 1,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: 2,
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    answer: 1,
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score").innerText = `Score: ${score} / ${questions.length}`;
  nextButton.innerHTML = "Next Question";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  let questionNumber = currentQuestionIndex + 1;
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = questionNumber + "." + currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("btn");
    answerButton.appendChild(button);
    button.addEventListener("click", () => selectAnswer(index));
  });
}

function selectAnswer(selectedIndex) {
  let currentQuestion = questions[currentQuestionIndex];
  const selectedButton = answerButton.children[selectedIndex];
  if (selectedIndex === currentQuestion.answer) {
    selectedButton.classList.add("correct");
    score++;
    document.getElementById("score").innerText = `Score: ${score} / ${questions.length}`;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button, index) => {
    button.disabled = true;
    if (index !== selectedIndex) {
      if (index === currentQuestion.answer) {
        button.classList.add("correct");
      }
    }
  });
  nextButton.style.display = "block";
}

function resetState() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function handleNextButton() {
  currentQuestionIndex++;
  resetState();
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {

    questionElement.innerHTML = "Quiz completed! Your final score is " + Math.round(score / questions.length * 100) + "%";
    nextButton.innerHTML = "Restart Quiz";
  }
}

startQuiz();