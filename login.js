import { validateLoginUser } from "./validate.js";
import { authenticateUser } from "./api/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    handleLogin(event);
  });
});

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { isValid, errors } = validateLoginUser({ username, password });
  if (!isValid) {
    console.log(errors);
    alert(errors.join("\n"));
    return;
  }

  const user = authenticateUser(username, password);
  if (user) {
    alert("Login successful");
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    alert("Login failed. Please check your username and password.");
  }
}

export function handleLogout() {
  localStorage.removeItem("user");
  alert("You have been logged out.");
  window.location.href = "login.html";
}