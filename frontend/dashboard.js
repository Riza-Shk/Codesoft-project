// Get username from localStorage
const userName = localStorage.getItem("userName");

// If username exists, update welcome message
if (userName) {
  const nameHeading = document.getElementById("mainName");
  nameHeading.innerText = `Welcome, ${userName}!`;
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Clear all stored user data
    localStorage.clear();

    // Redirect to landing page
    window.location.href = "index.html";
  });
}
