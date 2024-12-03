// Apply dark mode based on saved preference
document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem("darkMode");

    // If dark mode is enabled in localStorage, apply it to the body
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Update the toggle button's icon if it exists
    const toggleButton = document.getElementById("dark-mode-toggle");
    if (toggleButton) {
        const icon = toggleButton.querySelector(".toggle-icon");
        icon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    }
});

// Toggle dark mode and update the preference
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle("dark-mode");

    // Save the current mode in localStorage
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

    // Update the toggle button's icon
    const toggleButton = document.getElementById("dark-mode-toggle");
    const icon = toggleButton.querySelector(".toggle-icon");
    icon.textContent = isDarkMode ? "☀️" : "🌙";
}

// Attach the toggle function to the toggle button if it exists
document.getElementById("dark-mode-toggle")?.addEventListener("click", toggleDarkMode);

// Apply dark mode based on localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem("darkMode");

    // Apply the dark mode class if it was enabled previously
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});
