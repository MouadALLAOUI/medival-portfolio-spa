import learning from "../content/learning.js";

export function renderLearning(target = "#learning-grid") {
  const container = typeof target === "string" ? document.querySelector(target) : target;
  if (!container) return;

  container.innerHTML = "";

  learning.forEach((item) => {
    const a = document.createElement("a");
    a.className = "skill-card learning-card";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const head = document.createElement("div");
    head.className = "learning-head";

    const icon = document.createElement("span");
    icon.className = "learning-icon";
    icon.textContent = item.icon || "📜";

    const title = document.createElement("h3");
    title.className = "learning-title";
    title.textContent = item.title;

    head.append(icon, title);

    const meta = document.createElement("p");
    meta.className = "learning-meta";
    meta.textContent = item.meta || "";

    const desc = document.createElement("p");
    desc.className = "learning-desc";
    desc.textContent = item.desc || "";

    a.append(head, meta, desc);
    container.appendChild(a);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLearning();
});
