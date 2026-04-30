import designs from "../content/designs.js";

export function renderDesigns(target = "#design-grid") {
  const container = typeof target === "string" ? document.querySelector(target) : target;
  if (!container) return;

  container.innerHTML = "";

  designs.forEach((item) => {
    const card = document.createElement("div");
    card.className = "skill-card design-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("data-image-src", item.src);
    card.setAttribute("data-image-mobile", item.isMobile ? "true" : "false");

    const img = document.createElement("img");
    img.className = "design-thumb";
    img.src = item.src;
    img.alt = item.alt || item.caption || "Design";

    const caption = document.createElement("p");
    caption.className = "design-caption";
    caption.textContent = item.caption || "";

    card.append(img, caption);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDesigns();
});
