fetch("https://codesoft-backend-y6ph.onrender.com/api/quizzes")
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
function deleteQuiz(id) {
  const confirmDelete = confirm("Are you sure you want to delete this quiz?");

  if (!confirmDelete) return;

  fetch(`https://codesoft-backend-y6ph.onrender.com/api/quizzes/${id}`, {
    method: "DELETE",
  })
    .then(res => res.json())
    .then(data => {
      alert("Quiz deleted successfully");
      location.reload(); // refresh quiz list
    })
    .catch(err => {
      console.error("Delete failed", err);
      alert("Failed to delete quiz");
    });
}
