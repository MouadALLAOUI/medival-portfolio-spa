import hobbies from "../content/hobbies.js";

export function renderHobbies(target = "#hobbies-grid") {
  const container = typeof target === "string" ? document.querySelector(target) : target;
  if (!container) return;

  container.innerHTML = "";

  hobbies.forEach((hobby) => {
    const card = document.createElement("div");
    card.className = "skill-card hobby-card";

    const head = document.createElement("div");
    head.className = "hobby-head";

    const icon = document.createElement("span");
    icon.className = "hobby-icon";
    icon.textContent = hobby.icon || "✨";

    const title = document.createElement("h3");
    title.className = "hobby-title";
    title.textContent = hobby.title;

    head.append(icon, title);

    const desc = document.createElement("p");
    desc.className = "hobby-desc";
    desc.textContent = hobby.desc || "";

    card.append(head, desc);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHobbies();
});
