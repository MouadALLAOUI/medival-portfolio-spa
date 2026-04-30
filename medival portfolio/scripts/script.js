import timelines from "../content/timelines.js";
import renderImage, { closeImage } from "./viewimage.js";
import showAlert from "./alerts.js";
import setCookie, { getAllCookies, getCookie } from "./cookies.js";
import TrackMe from "./track.js";
import { renderLanguages } from "./languages.js";
import { renderLearning } from "./learning.js";
import { renderHobbies } from "./hobbies.js";
import { renderDesigns } from "./designs.js";
import { initSettings } from "./settings.js";

const TimelinesContainer = document.querySelector('.timeline');
const imageViewerClose = document.getElementById('image-viewer-close');

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});



document.addEventListener('DOMContentLoaded', () => {
  // TrackMe("ip", "userAgent", "home", "referrer", new Date().toISOString());
  if (!getCookie("dailyVisitHome")) {
    const userAgent = navigator.userAgent;
    const referrer = document.referrer || "Direct visit";
    let ip = "0.0.0.0";
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => {
        ip = data.ip;
      });
    const today = new Date().toISOString().split("T")[0];
    setCookie("dailyVisitHome", today, { expiresAtMidnight: true });
    showAlert("hello, welcome", "greeting", 2000);
    TrackMe(ip, userAgent, "home", referrer, new Date().toISOString());
  } else {
    showAlert("Welcome back", "greeting", 2000);
  }
  // const allCookies = getAllCookies();
  // console.log("All Cookies:", allCookies);
  showAlert("Welcome to my palace, hope you find whatever you desire", "royal", 3000);
  showAlert("this portfolio is still under development thank you for your understanding", "chaos", 4000);
  showAlert("current section under development is projects", "info", 4000);
  imageViewerClose.addEventListener("click", e => closeImage());

  initSettings({ showAlert });
  renderLanguages();
  renderLearning();
  renderHobbies();
  renderDesigns();

  timelines.toReversed().forEach(element => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';

    timelineItem.innerHTML = `
    <div class="timeline-content">
      <div class="timeline-year">${element.year}</div>
      <h3 class="timeline-title">${element.title}</h3>
      <p>${element.desc}</p>
      <p class="timeline-detailled-desc">${element.detailledDesc}</p>
    </div>
    `

    TimelinesContainer.appendChild(timelineItem);

    timelineItem.addEventListener("click", () => {
      // Remove "active" from all timeline items first
      document.querySelectorAll('.timeline-item.active').forEach(item => {
        if (!timelineItem.classList.contains('active')) {
          item.classList.remove('active');
        }
      });

      // Activate the clicked item
      timelineItem.classList.toggle('active');
    });
  });
});

document.addEventListener("click", (e) => {
  const designCard = e.target.closest("[data-image-src]");
  if (designCard) {
    const src = designCard.getAttribute("data-image-src") || "";
    const isMobile = designCard.getAttribute("data-image-mobile") === "true";
    if (src) renderImage(src, isMobile);
  }

  if (e.target.classList.contains("copy-btn")) {
    const targetId = e.target.getAttribute("data-target");
    const codeElement = document.getElementById(targetId);
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent).then(() => {
        e.target.textContent = "✅";
        showAlert("Copied to clipboard ✅", "success");
        setTimeout(() => (e.target.textContent = "📋"), 1500);
      });
    }
  }

  // Inline code click-to-copy
  if (e.target.classList.contains("inline-code")) {
    const text = e.target.textContent;
    navigator.clipboard.writeText(text).then(() => {
      e.target.classList.add("copied");
      showAlert(`Copied to clipboard ✅: ${text}`, "success");
      setTimeout(() => e.target.classList.remove("copied"), 1200);
    });
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const active = document.activeElement;
    if (active && active instanceof HTMLElement && active.hasAttribute("data-image-src")) {
      e.preventDefault();
      const src = active.getAttribute("data-image-src") || "";
      const isMobile = active.getAttribute("data-image-mobile") === "true";
      if (src) renderImage(src, isMobile);
    }
  }
});
