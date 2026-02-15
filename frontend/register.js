const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      "https://codesoft-backend-y6ph.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful 🎉");
      registerForm.reset();
      window.location.href = "./login.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
});
