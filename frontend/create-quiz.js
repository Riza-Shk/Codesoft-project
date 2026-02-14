let questions = [];

const addQuestionBtn = document.getElementById("addQuestion");

addQuestionBtn.addEventListener("click", () => {
  const question = document.getElementById("questionText").value.trim();
  const options = [
    opt1.value.trim(),
    opt2.value.trim(),
    opt3.value.trim(),
    opt4.value.trim()
  ];

  const selected = document.querySelector(
    'input[name="correctOption"]:checked'
  );

  if (!question || options.some(opt => opt === "") || !selected) {
    alert("Please fill question, all options, and select the correct answer");
    return;
  }

  const questionData = {
    question,
    options,
    correctAnswer: Number(selected.value),
  };

  questions.push(questionData);

  // clear inputs
  document.getElementById("questionText").value = "";
  opt1.value = opt2.value = opt3.value = opt4.value = "";

  document
    .querySelectorAll('input[name="correctOption"]')
    .forEach(r => r.checked = false);
});

const quizForm = document.getElementById("quizForm");

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (questions.length === 0) {
    alert("Add at least one question");
    return;
  }

  const quizTitle = document.getElementById("quizT").value;

  try {
    const res = await fetch("http://127.0.0.1:5000/api/quizzes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: quizTitle,
        questions: questions,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Quiz saved successfully 🎉");
      window.location.href = "dashboard.html";
    } else {
      alert(data.message);
    }
  } catch {
    alert("Something went wrong");
  }
});
