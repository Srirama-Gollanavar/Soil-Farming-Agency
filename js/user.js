// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Replace with your config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form handling
const form = document.getElementById("appointmentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const reasonInput = document.getElementById("reason");
const messageInput = document.getElementById("message");
const appointmentList = document.getElementById("appointmentList");

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const appointment = {
    name: nameInput.value,
    email: emailInput.value,
    reason: reasonInput.value,
    message: messageInput.value,
    status: "Pending", // Default status
    timestamp: new Date()
  };

  try {
    await addDoc(collection(db, "appointments"), appointment);
    alert("Appointment booked successfully!");
    form.reset();
    loadAppointments(emailInput.value);
  } catch (error) {
    alert("Error booking appointment: " + error.message);
  }
});

// Load appointments
async function loadAppointments(email) {
  appointmentList.innerHTML = "Loading...";

  const q = query(
    collection(db, "appointments"),
    where("email", "==", email)
  );
  const querySnapshot = await getDocs(q);

  appointmentList.innerHTML = "";
  if (querySnapshot.empty) {
    appointmentList.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "appointment-card";
    div.innerHTML = `
      <strong>${data.reason}</strong><br/>
      <small>${new Date(data.timestamp.toDate()).toLocaleString()}</small><br/>
      <p>${data.message}</p>
      <b>Status:</b> <span style="color:${
        data.status === "Approved"
          ? "green"
          : data.status === "Rejected"
          ? "red"
          : "orange"
      }">${data.status}</span>
    `;
    appointmentList.appendChild(div);
  });
}
