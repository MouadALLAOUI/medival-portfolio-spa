const navContainer = document.getElementById("nav-container");
const navLinks = document.querySelectorAll(".nav-links a");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navToggle = document.querySelector(".nav-toggle");
const sections = document.querySelectorAll("section");
const presentation = document.getElementById("presentation");


window.addEventListener("scroll", () => {

  // Active section detection for navigation
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  /* =================== NAVBAR ANIMATIONS ======================== */
  // Add a class to navContainer if scroll down
  if (window.scrollY > 50) {
    navContainer.classList.add("nav-scrolled");
  } else {
    navContainer.classList.remove("nav-scrolled");
  }


  // Highlight the active link in the navigation
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });

  // Check if craftsman bio is already visible
  if (
    window.scrollY >
    document.getElementById("presentation").offsetTop -
    window.innerHeight * 0.5
  ) {
    document.querySelector(".scroll-content").classList.add("visible");
  }

  if (
    window.scrollY >
    document.getElementById("skills").offsetTop -
    window.innerHeight * 0.5
  ) {
    document.querySelector("#skills-parchment").classList.add("visible");
  }

  if (
    window.scrollY >
    document.getElementById("projects").offsetTop -
    window.innerHeight * 0.5
  ) {
    document.querySelector("#projects-parch").classList.add("visible");
  }

  if (
    window.scrollY >
    document.getElementById("about").offsetTop -
    window.innerHeight * 0.5
  ) {
    document.getElementById("about-parch").classList.add("visible");
  }

  if (
    window.scrollY >
    document.getElementById("contact").offsetTop -
    window.innerHeight * 0.5
  ) {
    document.getElementById("contact-parch").classList.add("visible");
  }

  // Trigger scroll event to set initial nav state
  // window.dispatchEvent(new Event("scroll"));
});

mobileMenuBtn.addEventListener("click", () => {
  navContainer.classList.toggle("active");
});
