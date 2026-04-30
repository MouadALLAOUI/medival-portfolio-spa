import languages from "../content/languages.js";

function renderStars(level, ariaLabel = "") {
  const starContainer = document.createElement("div");
  starContainer.className = "proficiency";
  if (ariaLabel) starContainer.setAttribute("aria-label", ariaLabel);

  let remaining = Number.isFinite(level) ? level : 0;
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "★";
    if (remaining >= 1) {
      remaining--;
    } else {
      star.classList.add("empty");
    }
    starContainer.appendChild(star);
  }

  return starContainer;
}

export function renderLanguages(target = "#languages-grid") {
  const container = typeof target === "string" ? document.querySelector(target) : target;
  if (!container) return;

  container.innerHTML = "";

  languages.forEach((lang) => {
    const card = document.createElement("div");
    card.className = "skill-card language-card";

    const head = document.createElement("div");
    head.className = "language-head";

    const icon = document.createElement("span");
    icon.className = "language-icon";
    icon.textContent = lang.icon || "🗣️";

    const name = document.createElement("h3");
    name.className = "language-name";
    name.textContent = lang.name;

    head.append(icon, name);

    const levelLabel = document.createElement("p");
    levelLabel.className = "language-level";
    levelLabel.textContent = lang.levelLabel || "";

    const stars = renderStars(lang.level, `${lang.name} proficiency: ${lang.level} out of 5`);

    card.append(head, levelLabel, stars);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLanguages();
});
