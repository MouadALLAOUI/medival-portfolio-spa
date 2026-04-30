function showAlert(message, type = "info", duration = 3000) {
  const container = document.getElementById("alert-container");
  if (!container) return;

  const alertBox = document.createElement("div");
  alertBox.className = `alert-box alert-${type}`;

  // Add icon depending on alert type
  const icons = {
    success: "🧿",    // enchanted orb
    warning: "⚠️",
    error: "💀",
    info: "📜",
    quest: "🗡️",
    arcane: "🔮",
    divine: "🌟",
    royal: "👑",
    cursed: "☠️",
    neutral: "🕯️",
    chaos: "🔥",
    greeting: "👋"
  };


  const icon = document.createElement("span");
  icon.className = "alert-icon";
  icon.textContent = icons[type] || "✨";

  // Append icon + message
  alertBox.appendChild(icon);
  alertBox.appendChild(document.createTextNode(message));

  // Add new alert to top (stack)
  container.prepend(alertBox);

  // Fade out and remove
  setTimeout(() => {
    alertBox.style.animation = "fadeOutScroll 0.5s forwards";
    setTimeout(() => alertBox.remove(), 500);
  }, duration);
}


export default showAlert;