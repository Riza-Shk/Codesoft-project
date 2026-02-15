const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(
      "https://codesoft-backend-y6ph.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // store user info
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userId", data.user.id);

      // redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
});
