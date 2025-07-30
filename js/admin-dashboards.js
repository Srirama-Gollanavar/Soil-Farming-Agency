// Firebase config (your provided config)
const firebaseConfig = {
  apiKey: "AIzaSyC1T0lw6VTwKG0wH9A_9ofx79o350icVxM",
  authDomain: "carrer-guidance-82361.firebaseapp.com",
  projectId: "carrer-guidance-82361",
  storageBucket: "carrer-guidance-82361.firebasestorage.app",
  messagingSenderId: "692445679733",
  appId: "1:692445679733:web:e5e940f63bf864ecd8e83c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Role check (admin or not)
auth.onAuthStateChanged((user) => {
  if (!user) {
    alert("You are not logged in.");
    window.location.href = "home.html";
  } else {
    // You can optionally fetch Firestore user role data here and confirm it's 'admin'
    console.log("Admin logged in:", user.email);
  }
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

// Navigation
function navigateTo(page) {
  window.location.href = page;
}
