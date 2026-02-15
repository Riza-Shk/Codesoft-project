// =====================
// VARIABLES
// =====================
let questions = [];
const questionCountEl = document.getElementById("questionCount");

const quizForm = document.getElementById("quizForm");
const addQuestionBtn = document.getElementById("addQuestion");

const quizTitleInput = document.getElementById("quizT");
const questionInput = document.getElementById("questionText");

const opt1 = document.getElementById("opt1");
const opt2 = document.getElementById("opt2");
const opt3 = document.getElementById("opt3");
const opt4 = document.getElementById("opt4");

// =====================
// ADD QUESTION LOGIC
// =====================
addQuestionBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();

  const options = [
    opt1.value.trim(),
    opt2.value.trim(),
    opt3.value.trim(),
    opt4.value.trim(),
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
  questionCount.textContent = `Questions added: ${questions.length}`;
  console.log("Questions added:", questions);

  // Clear inputs after adding question
  questionInput.value = "";
  opt1.value = opt2.value = opt3.value = opt4.value = "";

  document
    .querySelectorAll('input[name="correctOption"]')
    .forEach(r => (r.checked = false));

  alert("Question added ✅");
});

// =====================
// SAVE QUIZ LOGIC
// =====================
quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const quizTitle = quizTitleInput.value.trim();

  if (!quizTitle) {
    alert("Please enter a quiz title");
    return;
  }

  if (questions.length === 0) {
    alert("Add at least one question before saving");
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
