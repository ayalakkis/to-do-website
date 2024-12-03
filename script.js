function redirectToSignup() {
    window.location.href = "signup.html"; // Replace with the URL of your signup page
}

// Dark mode toggle logic
document.getElementById("dark-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change the icon based on the mode
    const icon = this.querySelector(".toggle-icon");
    icon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
