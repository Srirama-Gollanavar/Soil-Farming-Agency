import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

// DOM Elements
const form = document.getElementById("soilForm");
const soilList = document.getElementById("soilList");

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const soilType = document.getElementById("soilType").value;
  const crop = document.getElementById("crop").value;
  const description = document.getElementById("description").value;

  try {
    await addDoc(collection(db, "soilInfo"), {
      soilType,
      crop,
      description
    });

    form.reset();
    loadSoilData(); // Reload list
  } catch (error) {
    console.error("Error adding soil info: ", error);
  }
});

// Load all soil info
async function loadSoilData() {
  soilList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "soilInfo"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h4>${data.soilType}</h4>
      <p><strong>Crop:</strong> ${data.crop}</p>
      <p>${data.description}</p>
      <button onclick="deleteSoil('${docSnap.id}')">Delete</button>
    `;

    soilList.appendChild(div);
  });
}

window.deleteSoil = async function (id) {
  try {
    await deleteDoc(doc(db, "soilInfo", id));
    loadSoilData();
  } catch (error) {
    console.error("Error deleting: ", error);
  }
};

// Initial Load
loadSoilData();
