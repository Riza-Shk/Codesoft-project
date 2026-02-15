const quizForm = document.getElementById("quizForm");

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (questions.length === 0) {
    alert("Add at least one question");
    return;
  }

  const quizTitle = document.getElementById("quizT").value.trim();

  if (!quizTitle) {
    alert("Please enter a quiz title");
    return;
  }

  try {
    const res = await fetch(
      "https://codesoft-backend-y6ph.onrender.com/api/quizzes/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: quizTitle,
          questions: questions,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save quiz");
      return;
    }

    alert("Quiz saved successfully 🎉");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert("Something went wrong while saving the quiz");
  }
});
