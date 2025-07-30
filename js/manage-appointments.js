import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const appointmentsContainer = document.getElementById("appointmentsContainer");

async function loadAppointments() {
  appointmentsContainer.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "appointments"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("appointment-card");

    div.innerHTML = `
      <h4>${data.name}</h4>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Status:</strong> 
        <span class="status-label" style="background:${
          data.status === "approved" ? "#4caf50" :
          data.status === "rejected" ? "#f44336" :
          "#ff9800"
        }; color: white">${data.status || "pending"}</span>
      </p>
      <div class="status-btns">
        <button class="approve" onclick="updateStatus('${docSnap.id}', 'approved')">Approve</button>
        <button class="reject" onclick="updateStatus('${docSnap.id}', 'rejected')">Reject</button>
        <button class="pending" onclick="updateStatus('${docSnap.id}', 'pending')">Pending</button>
      </div>
    `;
    appointmentsContainer.appendChild(div);
  });
}

window.updateStatus = async function (id, status) {
  const docRef = doc(db, "appointments", id);
  await updateDoc(docRef, { status });
  loadAppointments();
};

loadAppointments();
