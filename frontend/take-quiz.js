fetch("http://127.0.0.1:5000/api/quizzes")
  .then(res => res.json())
  .then(quizzes => {
    const quizList = document.getElementById("quizList");

    quizzes.forEach(quiz => {
      const card = document.createElement("div");
      card.className = "quiz-card";

      card.innerHTML = `
  <h3>${quiz.title}</h3>
  <button onclick="startQuiz('${quiz._id}')">Start</button>
  <button class="delete" onclick="deleteQuiz('${quiz._id}')">Delete</button>
`;


      quizList.appendChild(card);
    });
  });

function startQuiz(id) {
  window.location.href = `quiz.html?id=${id}`;
}
