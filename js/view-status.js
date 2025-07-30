import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

const appointmentList = document.getElementById("appointmentList");

async function loadAppointments() {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  appointmentList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("card");

    const statusClass = data.status?.toLowerCase() || "pending";

    div.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Purpose:</strong> ${data.purpose}</p>
      <p><strong>Status:</strong> <span class="status ${statusClass}">${data.status || "Pending"}</span></p>
    `;

    appointmentList.appendChild(div);
  });
}

loadAppointments();
