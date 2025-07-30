// Firebase Modular v12 Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1T0lw6VTwKG0wH9A_9ofx79o350icVxM",
  authDomain: "carrer-guidance-82361.firebaseapp.com",
  projectId: "carrer-guidance-82361",
  storageBucket: "carrer-guidance-82361.firebasestorage.app",
  messagingSenderId: "692445679733",
  appId: "1:692445679733:web:e5e940f63bf864ecd8e83c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export for global use
export { auth, db };
