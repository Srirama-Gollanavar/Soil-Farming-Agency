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

const soilList = document.getElementById("soilList");

async function loadSoilData() {
  const querySnapshot = await getDocs(collection(db, "soilInfo"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${data.soilType}</h4>
      <p><strong>Crop:</strong> ${data.crop}</p>
      <p>${data.description}</p>
    `;

    soilList.appendChild(card);
  });
}

loadSoilData();
