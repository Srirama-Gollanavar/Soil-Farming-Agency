// 4️⃣ Login Script (login.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC1T0lw6VTwKG0wH9A_9ofx79o350icVxM",
  authDomain: "carrer-guidance-82361.firebaseapp.com",
  projectId: "carrer-guidance-82361",
  storageBucket: "carrer-guidance-82361.firebasestorage.app",
  messagingSenderId: "692445679733",
  appId: "1:692445679733:web:e5e940f63bf864ecd8e83c"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Form Submit Handler
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const role = userDocSnap.data().role;

      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else if (role === "user") {
          window.location.href = "user-dashboard.html";
        } else {
          message.textContent = "Invalid user role.";
        }
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = "User data not found.";
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = error.message;
  }
});
