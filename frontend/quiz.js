const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

let quiz;
let currentIndex = 0;
let score = 0;

fetch(`http://127.0.0.1:5000/api/quizzes/${quizId}`)
  .then(res => res.json())
  .then(data => {
    quiz = data;
    renderQuestion();
  });

function renderQuestion() {
  const q = quiz.questions[currentIndex];
  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <h3>Question ${currentIndex + 1} of ${quiz.questions.length}</h3>
    <p>${q.question}</p>

    ${q.options.map((opt, i) => `
      <div class="option">
        <button onclick="selectAnswer(${i})">${opt}</button>
      </div>
    `).join("")}
  `;
}

function selectAnswer(index) {
  const correct = quiz.questions[currentIndex].correctAnswer;

  const buttons = document.querySelectorAll(".option button");
  buttons.forEach(btn => btn.disabled = true);

  if (index === correct) {
    score++;
    buttons[index].classList.add("correct");
  } else {
    buttons[index].classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quiz.questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 1000);
}


function showResult() {
  const container = document.getElementById("quizContainer");

  const userId = localStorage.getItem("userId");

  // save history to backend
  fetch("http://127.0.0.1:5000/api/history/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      quizId: quiz._id,
      quizTitle: quiz.title,
      score: score,
      totalQuestions: quiz.questions.length,
    }),
  });

  container.innerHTML = `
    <div class="result-container">
      <h2>Quiz Completed 🎉</h2>
      <p>Your Score</p>
      <div class="score">${score} / ${quiz.questions.length}</div>
      <button onclick="goBack()">Back to Dashboard</button>
    </div>
  `;
}



function goBack() {
  window.location.href = "dashboard.html";
}
