import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1T0lw6VTwKG0wH9A_9ofx79o350icVxM",
  authDomain: "carrer-guidance-82361.firebaseapp.com",
  projectId: "carrer-guidance-82361",
  storageBucket: "carrer-guidance-82361.firebasestorage.app",
  messagingSenderId: "692445679733",
  appId: "1:692445679733:web:e5e940f63bf864ecd8e83c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userList = document.getElementById("userList");

async function loadUsers() {
  userList.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    if (querySnapshot.empty) {
      userList.innerHTML = "<p>No users found.</p>";
      return;
    }

    querySnapshot.forEach((docSnap) => {
      const user = docSnap.data();

      const div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
        <h4>${user.name || "No Name"}</h4>
        <p><strong>Email:</strong> ${user.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
        <p><strong>Role:</strong> ${user.role || "N/A"}</p>
      `;

      userList.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading users: ", error);
    userList.innerHTML = "<p>Error fetching user data.</p>";
  }
}

loadUsers();
