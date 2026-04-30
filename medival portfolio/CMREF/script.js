// SPA Routing Logic
function navigate(pageId) {
  // Update Navigation Links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active-link');
  });
  document.getElementById('link-' + pageId).classList.add('active-link');

  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active-page');
  });

  // Show target page
  document.getElementById('page-' + pageId).classList.add('active-page');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger reveals
  revealOnScroll();
}

// MSP Tabs Logic
function switchTab(tabId) {
  // Update Tab Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active-tab');
  });
  event.target.classList.add('active-tab');

  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active-content');
  });

  // Show target tab content
  document.getElementById('tab-' + tabId).classList.add('active-content');
}

// Scroll Reveal Animation Logic
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  reveals.forEach(reveal => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

// Event Listeners
window.addEventListener('scroll', revealOnScroll);

// Initialize Default State
document.addEventListener('DOMContentLoaded', () => {
  navigate('home'); // Load home by default
});
