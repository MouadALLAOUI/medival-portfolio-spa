import blogs from "./content/blogs.js";
import setCookie, { getCookie } from "../scripts/cookies.js";
import TrackMe from "../scripts/track.js";
import showAlert from "../scripts/alerts.js";



const blogsPosts = document.getElementById("blog-posts");
const blogsPostspag = document.getElementById("blog-pagination");

const postsPerPage = 6;
let currentPage = 1;

function renderBlogs(page) {
  blogsPosts.innerHTML = ""; // Clear previous posts
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, endIndex);

  paginatedBlogs.forEach(blog => {
    const article = document.createElement("article");

    // Thumbnail
    const imgDiv = document.createElement("div");
    imgDiv.className = "article-images";
    const img = document.createElement("img");
    img.src = blog.thumbnail || "https://placehold.co/600x400";
    img.alt = blog.title;
    imgDiv.appendChild(img);

    // Description section
    const descDiv = document.createElement("div");
    descDiv.className = "article-desc";

    const h3 = document.createElement("h3");
    h3.className = "title";
    h3.textContent = `${blog.logo} ${blog.title}`;

    const date = document.createElement("p");
    date.className = "date";
    let formattedDate = "__-__-__";
    if (blog.date) {
      const { hh, mm, dd, MM, yyyy } = blog.date;
      formattedDate = formattime(hh, mm, dd, MM, yyyy);
    }
    date.textContent = formattedDate || "Date unknown";

    const p = document.createElement("p");
    p.className = "desc";
    p.textContent = blog.desc;

    const a = document.createElement("a");
    a.href = `./blog/index.html?blog=${blog.id}`;
    a.className = "readmore";
    a.textContent = "Read Scroll";

    descDiv.append(h3, date, p, a);
    article.append(imgDiv, descDiv);
    blogsPosts.appendChild(article);
  });
}

function formattime(hh, mm, dd, MM, yyyy) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const pad = (n) => String(n).padStart(2, "0");

  const suffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${pad(dd)}${suffix(dd)} Day of ${months[MM - 1]}, Year ${yyyy} at ${pad(hh)}:${pad(mm)}`;
}

function renderPagination() {
  blogsPostspag.innerHTML = "";
  const pageCount = Math.ceil(blogs.length / postsPerPage);

  // Prev button
  const prev = document.createElement("a");
  prev.href = "#";
  prev.className = "pagination-container-link";
  prev.textContent = "<";
  prev.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      update();
    }
  });
  blogsPostspag.appendChild(prev);

  // Page numbers
  for (let i = 1; i <= pageCount; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.className = "pagination-container-link" + (i === currentPage ? " active" : "");
    pageLink.textContent = i;
    pageLink.addEventListener("click", e => {
      e.preventDefault();
      currentPage = i;
      update();
    });
    blogsPostspag.appendChild(pageLink);
  }

  // Next button
  const next = document.createElement("a");
  next.href = "#";
  next.className = "pagination-container-link";
  next.textContent = ">";
  next.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage < pageCount) {
      currentPage++;
      update();
    }
  });
  blogsPostspag.appendChild(next);
}

function update() {
  renderBlogs(currentPage);
  renderPagination();
}

document.addEventListener("DOMContentLoaded", update);

document.addEventListener('DOMContentLoaded', () => {
  if (!getCookie("dailyVisitBlogs")) {
    const userAgent = navigator.userAgent;
    const referrer = document.referrer || "Direct visit";
    let ip = "0.0.0.0";
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => {
        ip = data.ip;
      });
    const today = new Date().toISOString().split("T")[0];
    setCookie("dailyVisitBlogs", today, { expiresAtMidnight: true });
    showAlert("hello, welcome", "greeting", 2000);
    TrackMe(ip, userAgent, "blogs", referrer, new Date().toISOString());
  } else {
    showAlert("Welcome back", "greeting", 2000);
  }
  showAlert("Welcome to my Treasures, hope you find whatever you desire", "royal", 3000);
  showAlert("these blogs are still under development thank you for your understanding", "chaos", 4000);
});