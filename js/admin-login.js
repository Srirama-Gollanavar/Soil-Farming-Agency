import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm = document.getElementById('adminLoginForm');
const emailInput = document.getElementById('adminEmail');
const passwordInput = document.getElementById('adminPassword');
const errorMsg = document.getElementById('adminErrorMsg');
const successMsg = document.getElementById('adminSuccessMsg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  errorMsg.textContent = "";
  successMsg.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    errorMsg.textContent = "Please enter both email and password.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    successMsg.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "/page/admin-dashboards.html"; // replace with your actual admin page
    }, 1000);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      errorMsg.textContent = "No admin found with this email.";
    } else if (error.code === 'auth/wrong-password') {
      errorMsg.textContent = "Incorrect password.";
    } else {
      errorMsg.textContent = "Login failed. Please try again.";
    }
  }
});
