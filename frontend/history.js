const userId = localStorage.getItem("userId");

if (!userId) {
  window.location.href = "login.html";
}

fetch(`https://codesoft-backend-y6ph.onrender.com/api/history/${userId}`)
  .then(res => res.json())
  .then(history => {
    const list = document.getElementById("historyList");

    if (history.length === 0) {
      list.innerHTML = "<p>No quiz history yet.</p>";
      return;
    }

    history.forEach(item => {
      const card = document.createElement("div");
      card.className = "history-card";

      card.innerHTML = `
        <h3>${item.quizTitle}</h3>
        <p>Score: ${item.score} / ${item.totalQuestions}</p>
        <p>Date: ${new Date(item.takenAt).toLocaleString()}</p>
      `;

      list.appendChild(card);
    });
  });
