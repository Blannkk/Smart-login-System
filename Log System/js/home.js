document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const userName = localStorage.getItem("userNameInput");

    if (userName) {
        welcomeMessage.textContent = `Welcome, ${userName}!`;
    } else {
        window.location.href = "index.html";
    }
});

function logout() {
    localStorage.removeItem("userNameInput");
    window.location.href = "index.html";
}
