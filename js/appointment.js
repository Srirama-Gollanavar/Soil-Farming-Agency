import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1T0lw6VTwKG0wH9A_9ofx79o350icVxM",
  authDomain: "carrer-guidance-82361.firebaseapp.com",
  projectId: "carrer-guidance-82361",
  storageBucket: "carrer-guidance-82361.appspot.com",
  messagingSenderId: "692445679733",
  appId: "1:692445679733:web:e5e940f63bf864ecd8e83c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const purpose = document.getElementById("purpose").value;

  try {
    await addDoc(collection(db, "appointments"), {
      name,
      email,
      date,
      purpose,
      status: "Pending"
    });

    form.reset();
    successMsg.textContent = "Appointment booked successfully!";
    setTimeout(() => (successMsg.textContent = ""), 4000);
  } catch (err) {
    console.error("Error booking appointment:", err);
    successMsg.textContent = "Something went wrong. Try again.";
  }
});
