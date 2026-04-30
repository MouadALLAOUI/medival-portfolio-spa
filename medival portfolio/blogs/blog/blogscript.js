import blogs from "../content/blogs.js";
import { markdownToHtml } from "../../scripts/markdowntohtml.js";
import setCookie, { getCookie } from "../../scripts/cookies.js";
import TrackMe from "../../scripts/track.js";
import showAlert from "../../scripts/alerts.js";

const blogInfo = document.getElementById("blog-info");
const blogInfoTitle = document.getElementById("blog-title");
const blogInfoGenDesc = document.getElementById("blog-gen-desc");
const blogInfoDate = document.getElementById("blog-date");
const blogContent = document.getElementById("blog-content");
const previousPage = document.getElementById("previous-page");
const nextPage = document.getElementById("next-page");

const sidebarLinks = document.getElementById("sidebar-links");

function changeBlog(curr_param, type = 'next') {
  const currentIndex = blogs.findIndex(blog => blog.id == curr_param);

  if (currentIndex === -1) return; // Blog not found

  let newIndex;
  if (type === 'next') {
    newIndex = (currentIndex + 1) % blogs.length; // Wrap to first
  } else {
    newIndex = (currentIndex - 1 + blogs.length) % blogs.length; // Wrap to last
  }

  const newBlogId = blogs[newIndex].id;
  window.location.href = `${window.location.pathname}?blog=${newBlogId}`;
}

function addToSideBar(bloglink) {
  const item = document.createElement('li');
  const itemLink = document.createElement('a');
  itemLink.setAttribute('href', `?blog=${bloglink.id}`);
  itemLink.textContent = `${bloglink.logo} ${bloglink.title}`;
  item.append(itemLink)
  sidebarLinks.append(item);
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

document.addEventListener(
  "DOMContentLoaded", () => {
    sidebarLinks.innerHTML = "";
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("blog");
    const blogById = blogs.find(blog => blog.id == blogId);
    if (!getCookie(`dailyVisitBlogs${blogId}`)) {
      const userAgent = navigator.userAgent;
      const referrer = document.referrer || "Direct visit";
      let ip = "0.0.0.0";
      fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
          ip = data.ip;
        });
      const today = new Date().toISOString().split("T")[0];
      setCookie(`dailyVisitBlogs${blogId}`, today, { expiresAtMidnight: true });
      showAlert("hello, welcome", "greeting", 2000);
      TrackMe(ip, userAgent, `blog : ${blogById.title}`, referrer, new Date().toISOString());
    } else {
      showAlert("Welcome back", "greeting", 2000);
    }

    blogs.slice(-5).reverse().forEach(addToSideBar);

    if (blogById) {
      try {
        blogInfo.style.setProperty('--bg-image', `url("${blogById.thumbnail}")`);
      } catch (error) {
        console.error("Failed to set blog background image:", error);
      }
      blogContent.innerHTML = "";
      const thumbnail = document.createElement("div");
      thumbnail.className = "blog-thumbnail";
      thumbnail.innerHTML = `<img src="${blogById.thumbnail || "https://placehold.co/600x300"}" alt="${blogById.title}"/>`
      blogInfoTitle.textContent = `${blogById.logo} ${blogById.title}`;
      blogInfoGenDesc.textContent = `${blogById.desc}`;
      let formattedDate = "__-__-__";
      if (blogById.date) {
        const { hh, mm, dd, MM, yyyy } = blogById.date;
        formattedDate = formattime(hh, mm, dd, MM, yyyy);
      }
      blogInfoDate.textContent = formattedDate;
      const content = document.createElement("div");
      content.innerHTML = `${markdownToHtml(blogById.blogcontent.content)}`;
      blogContent.append(thumbnail, content);
    } else {
      blogInfoTitle.textContent = "Blog Not Found";
      blogInfoGenDesc.textContent = "";
      blogInfoDate.textContent = "__-__-__";
      blogContent.textContent = "The scroll you seek has vanished into the void.";
    }
    previousPage.addEventListener("click", () => changeBlog(blogId, "prev"));
    nextPage.addEventListener("click", () => changeBlog(blogId, "next"));
  }
)