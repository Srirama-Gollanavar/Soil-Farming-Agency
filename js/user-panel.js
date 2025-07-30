// Firebase config (already initialized in other pages if needed)

function navigateTo(page) {
  window.location.href = page;
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "/page/user-login.html";
  });
});
