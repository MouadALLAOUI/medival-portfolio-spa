// ============================================================
// Blog posts data — migrated from medival portfolio/blogs/content/blogs.js
// Each entry adds a URL-safe `slug` and a `readTime` estimate.
// ============================================================

export const blogs = [
  {
    id: 1,
    slug: 'your-first-beginner-course-to-html',
    logo: '🟢',
    title: 'Your First Beginner Course to HTML',
    desc: 'Start from scratch and learn the foundation of web development with HTML.',
    tags: ['HTML', 'Beginner', 'Web Development'],
    series: 'Web Foundations',
    thumbnail: '/media/blogs/html_css_cover.png',
    date: { hh: 17, mm: 30, dd: 14, MM: 8, yyyy: 2025 },
    readTime: '5 min read',
    blogcontent: {
      title: 'Your First Beginner Course to HTML',
      content: `# Your First Beginner Course to HTML

Welcome to your first step into web development! HTML (HyperText Markup Language) is the backbone of every webpage.

## What is HTML?

HTML is not a programming language — it's a **markup language** used to define the structure of web content. Browsers read HTML and render it as visible web pages.

## Basic Structure

Every HTML document starts with this boilerplate:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first paragraph.</p>
</body>
</html>
\`\`\`

## Key Tags to Know

- \`<h1>\` to \`<h6>\`: Headings (h1 is most important)
- \`<p>\`: Paragraphs
- \`<a href="url">\`: Hyperlinks
- \`<img src="image.jpg" alt="description">\`: Images
- \`<ul>\`, \`<ol>\`, \`<li>\`: Lists
- \`<div>\` and \`<span>\`: Layout and inline containers

## Try It Yourself

Create a file called \`index.html\`, paste the boilerplate, and open it in your browser. You're now a web developer!

> 💡 Tip: Use VS Code with the "Live Server" extension for instant preview.

Next up: Let's style it with CSS!`,
    },
  },
  {
    id: 2,
    slug: 'how-to-implement-css-into-your-html',
    logo: '🟣',
    title: 'How to Implement CSS Into Your HTML',
    desc: 'Learn how to style your static website using internal, external, and inline CSS.',
    tags: ['CSS', 'Styling', 'Web Development'],
    series: 'Web Foundations',
    thumbnail: '/media/blogs/html_css_cover.png',
    date: { hh: 9, mm: 15, dd: 16, MM: 8, yyyy: 2025 },
    readTime: '6 min read',
    blogcontent: {
      title: 'How to Implement CSS Into Your HTML',
      content: `# How to Implement CSS Into Your HTML

Now that you've built a basic HTML page, it's time to make it look good! CSS (Cascading Style Sheets) controls layout, colors, fonts, and animations.

## Three Ways to Add CSS

### 1. Inline CSS (Not Recommended for Large Projects)

Apply styles directly to an element using the \`style\` attribute.

\`\`\`html
<p style="color: blue; font-size: 18px;">This text is styled!</p>
\`\`\`

### 2. Internal CSS (Good for Single Pages)

Use the \`<style>\` tag inside the \`<head>\`.

\`\`\`html
<head>
  <style>
    body { background-color: #f0f0f0; }
    h1 { color: purple; }
  </style>
</head>
\`\`\`

### 3. External CSS (Best Practice)

Create a separate file (e.g., \`styles.css\`) and link it:

\`\`\`html
<link rel="stylesheet" href="styles.css">
\`\`\`

And in \`styles.css\`:
\`\`\`css
h1 {
  color: teal;
  font-family: 'Arial', sans-serif;
}
\`\`\`

## Why External CSS?

- Reusable across multiple pages
- Cleaner separation of concerns
- Easier maintenance

> 🛠️ Pro Tip: Always use external CSS in real projects.

Now your site isn't just structured — it's beautiful!`,
    },
  },
  {
    id: 3,
    slug: 'add-javascript-to-your-first-static-website',
    logo: '🟡',
    title: 'Add JavaScript to Your First Static Website',
    desc: 'Bring interactivity to life by adding scripts to your HTML page.',
    tags: ['JavaScript', 'Frontend', 'Interactivity'],
    series: 'Web Foundations',
    thumbnail: '/media/blogs/javascript_cover.png',
    date: { hh: 12, mm: 45, dd: 18, MM: 8, yyyy: 2025 },
    readTime: '7 min read',
    blogcontent: {
      title: 'Add JavaScript to Your First Static Website',
      content: `# Add JavaScript to Your First Static Website

HTML builds structure. CSS adds style. Now, **JavaScript** brings behavior and interactivity.

## What Can JavaScript Do?

- Respond to user clicks
- Update content dynamically
- Validate forms
- Fetch data from servers

## How to Include JavaScript

### Option 1: Inline Script

\`\`\`html
<button onclick="alert('Hello!')">Click Me</button>
\`\`\`

### Option 2: Internal Script

Inside \`<head>\` or before \`</body>\`:

\`\`\`html
<script>
  function greet() {
    alert("Welcome to my site!");
  }
</script>
\`\`\`

### Option 3: External Script (Recommended)

Create \`script.js\` and link it:

\`\`\`html
<script src="script.js"></script>
\`\`\`

In \`script.js\`:
\`\`\`js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    console.log("Button clicked!");
  });
});
\`\`\`

## Where to Place Scripts?

Always place the \`<script>\` tag **before the closing \`</body>\`** tag to ensure the DOM is loaded.

> ⚠️ Never block page rendering with heavy scripts in the head.

You've now made a fully interactive webpage!`,
    },
  },
  {
    id: 4,
    slug: 'essential-html-tags-you-should-know',
    logo: '🔵',
    title: 'Essential HTML Tags You Should Know',
    desc: 'A curated list of must-know HTML elements for every beginner developer.',
    tags: ['HTML', 'Tips', 'Structure'],
    thumbnail: '/media/blogs/html_css_cover.png',
    date: { hh: 10, mm: 0, dd: 20, MM: 8, yyyy: 2025 },
    readTime: '6 min read',
    blogcontent: {
      title: 'Essential HTML Tags You Should Know',
      content: `# Essential HTML Tags You Should Know

While learning HTML, some tags are used far more than others. Here's a list of **essential tags** you'll use daily.

## 1. Semantic Tags (Modern HTML5)

Use these for better SEO and accessibility:

- \`<header>\`: Top section (logo, nav)
- \`<nav>\`: Navigation links
- \`<main>\`: Main content
- \`<section>\`: Thematic grouping
- \`<article>\`: Self-contained content (blog post)
- \`<aside>\`: Sidebar or related content
- \`<footer>\`: Bottom info (copyright, links)

\`\`\`html
<main>
  <article>
    <h2>My Blog Post</h2>
    <p>Content goes here...</p>
  </article>
</main>
\`\`\`

## 2. Form Elements

For user input:

- \`<form>\`: Container for inputs
- \`<input type="text">\`: Text field
- \`<input type="email">\`: Email validation
- \`<textarea>\`: Multi-line text
- \`<button type="submit">\`: Submit button

## 3. Multimedia

- \`<img src="cat.jpg" alt="A cute cat">\`
- \`<audio controls>\`: Play audio
- \`<video width="320" height="240" controls>\`: Embed video

## 4. Useful Utility Tags

- \`<br>\`: Line break
- \`<hr>\`: Horizontal rule
- \`<code>\`: Inline code snippet
- \`<pre>\`: Preformatted text (preserves spaces)

> 🧠 Remember: Always use semantic tags over generic \`<div>\` when possible.

These tags will carry you through 90% of your HTML work.`,
    },
  },
  {
    id: 5,
    slug: 'dont-underestimate-css-advanced-tricks-you-need',
    logo: '🟠',
    title: "Don't Underestimate CSS: Advanced Tricks You Need",
    desc: 'Level up your styling game with powerful CSS techniques like Flexbox, Grid, and custom properties.',
    tags: ['CSS', 'Advanced', 'Layout'],
    thumbnail: '/media/blogs/html_css_cover.png',
    date: { hh: 16, mm: 20, dd: 22, MM: 8, yyyy: 2025 },
    readTime: '8 min read',
    blogcontent: {
      title: "Don't Underestimate CSS: Advanced Tricks You Need",
      content: `# Don't Underestimate CSS: Advanced Tricks You Need

CSS is often underestimated, but modern CSS is incredibly powerful. Let's explore advanced features that make layouts a breeze.

## 1. CSS Flexbox

Perfect for one-dimensional layouts (rows or columns).

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
\`\`\`

Useful for navigation bars, cards, and responsive alignment.

## 2. CSS Grid

For two-dimensional layouts (rows and columns):

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
}
\`\`\`

Ideal for dashboards, image galleries, and complex UIs.

## 3. CSS Variables (Custom Properties)

Define reusable values:

\`\`\`css
:root {
  --primary-color: #3498db;
  --font-main: 'Segoe UI', sans-serif;
}

button {
  background: var(--primary-color);
  font-family: var(--font-main);
}
\`\`\`

## 4. Responsive Design with Media Queries

\`\`\`css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`

## 5. Hover & Transitions

Add smooth effects:

\`\`\`css
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}
\`\`\`

> 🎯 Master these, and you'll write cleaner, more maintainable CSS.

CSS isn't just decoration — it's architecture.`,
    },
  },
  {
    id: 6,
    slug: 'javascript-dom-manipulation-for-beginners',
    logo: '🔴',
    title: 'JavaScript DOM Manipulation for Beginners',
    desc: 'Learn how to change HTML content and styles dynamically using JavaScript.',
    tags: ['JavaScript', 'DOM', 'Dynamic'],
    thumbnail: '/media/blogs/javascript_cover.png',
    date: { hh: 11, mm: 10, dd: 24, MM: 8, yyyy: 2025 },
    readTime: '7 min read',
    blogcontent: {
      title: 'JavaScript DOM Manipulation for Beginners',
      content: `# JavaScript DOM Manipulation for Beginners

The **Document Object Model (DOM)** is a tree-like representation of your HTML. With JavaScript, you can **read and modify** it in real time.

## Selecting Elements

\`\`\`js
document.getElementById("title");
document.querySelector(".btn");
document.querySelectorAll("li");
\`\`\`

## Changing Content

\`\`\`js
const heading = document.getElementById("title");
heading.textContent = "Updated Title!";
heading.innerHTML = "<em>New italic title</em>";
\`\`\`

## Modifying Styles

\`\`\`js
heading.style.color = "red";
heading.style.fontSize = "2rem";
\`\`\`

## Adding/Removing Classes

\`\`\`js
const box = document.querySelector(".box");
box.classList.add("highlight");
box.classList.remove("old-style");
box.classList.toggle("visible");
\`\`\`

## Creating New Elements

\`\`\`js
const newLi = document.createElement("li");
newLi.textContent = "New item";
document.querySelector("ul").appendChild(newLi);
\`\`\`

## Event Listeners

\`\`\`js
button.addEventListener("click", () => {
  alert("Button clicked!");
});
\`\`\`

> 🧪 Try building a todo list that adds and removes items.

DOM manipulation turns static sites into dynamic apps.`,
    },
  },
  {
    id: 7,
    slug: 'understanding-variables-data-types-and-operators-in-js',
    logo: '⚪️',
    title: 'Understanding Variables, Data Types & Operators in JS',
    desc: 'A deep dive into JavaScript fundamentals: variables, types, and operations.',
    tags: ['JavaScript', 'Basics', 'Concepts'],
    thumbnail: '/media/blogs/javascript_cover.png',
    date: { hh: 14, mm: 5, dd: 26, MM: 8, yyyy: 2025 },
    readTime: '6 min read',
    blogcontent: {
      title: 'Understanding Variables, Data Types & Operators in JS',
      content: `# Understanding Variables, Data Types & Operators in JS

Before diving into complex logic, master the building blocks of JavaScript.

## Variables: \`let\`, \`const\`, and \`var\`

\`\`\`js
let age = 25;           // can be reassigned
const name = "Alex";    // cannot be changed
var oldStyle = true;    // avoid (legacy)
\`\`\`

👉 Always prefer \`const\` unless you need reassignment.

## Primitive Data Types

- \`String\`: "Hello"
- \`Number\`: 42 or 3.14
- \`Boolean\`: true / false
- \`null\`: intentional empty value
- \`undefined\`: variable declared but not assigned
- \`Symbol\`: unique identifiers
- \`BigInt\`: very large numbers

## Operators

- Arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`
- Comparison: \`==\`, \`===\`, \`!=\`, \`<\`, \`>\`
- Logical: \`&&\` (and), \`||\` (or), \`!\` (not)

## Type Checking

\`\`\`js
typeof "hello"  // "string"
typeof 42       // "number"
\`\`\`

> 📌 Use \`===\` (strict equality) to avoid type coercion bugs.

These concepts are the foundation of all JavaScript programs.`,
    },
  },
  {
    id: 8,
    slug: 'how-to-debug-javascript-like-a-pro',
    logo: '🔷',
    title: 'How to Debug JavaScript Like a Pro',
    desc: 'Master console.log, breakpoints, and browser dev tools to squash bugs fast.',
    tags: ['JavaScript', 'Debugging', 'Tools'],
    thumbnail: '/media/blogs/portal_cover.png',
    date: { hh: 13, mm: 30, dd: 28, MM: 8, yyyy: 2025 },
    readTime: '7 min read',
    blogcontent: {
      title: 'How to Debug JavaScript Like a Pro',
      content: `# How to Debug JavaScript Like a Pro

Even expert developers write buggy code. The key is knowing how to **find and fix** issues quickly.

## 1. \`console.log()\` (The Classic)

\`\`\`js
console.log("User clicked:", user);
console.log("Current state:", state);
\`\`\`

👉 Use descriptive labels and log objects/arrays.

## 2. Browser Dev Tools

Open with \`F12\` or right-click → "Inspect".

### Key Panels:
- **Console**: View logs and errors
- **Sources**: Set breakpoints
- **Network**: Monitor API calls
- **Elements**: Inspect HTML/CSS live

## 3. Breakpoints

Pause code execution:

\`\`\`js
debugger; // Pauses here when Dev Tools are open
\`\`\`

Or click line numbers in "Sources" tab.

## 4. Handle Errors Gracefully

\`\`\`js
try {
  riskyOperation();
} catch (error) {
  console.error("Something went wrong:", error.message);
}
\`\`\`

## 5. Use \`console.table()\` for Arrays

\`\`\`js
const users = [{name: "Alice"}, {name: "Bob"}];
console.table(users);
\`\`\`

> 🛠️ Pro Tip: Avoid \`alert()\` for debugging — it blocks the UI.

Debugging isn't a sign of failure — it's part of the process.`,
    },
  },
  {
    id: 9,
    slug: 'intro-to-responsive-web-design-with-media-queries',
    logo: '🔶',
    title: 'Intro to Responsive Web Design with Media Queries',
    desc: 'Make your websites mobile-friendly using CSS media queries and viewport settings.',
    tags: ['CSS', 'Responsive', 'Mobile'],
    thumbnail: '/media/blogs/html_css_cover.png',
    date: { hh: 10, mm: 40, dd: 30, MM: 8, yyyy: 2025 },
    readTime: '6 min read',
    blogcontent: {
      title: 'Intro to Responsive Web Design with Media Queries',
      content: `# Intro to Responsive Web Design with Media Queries

Over 60% of web traffic comes from mobile devices. Your site **must** look good on all screens.

## Step 1: The Viewport Meta Tag

Add this to your \`<head>\`:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

This tells mobile browsers to render at actual device width.

## Step 2: Mobile-First Approach

Write styles for small screens first, then enhance for larger ones.

\`\`\`css
/* Base (mobile) */
.container {
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

## Step 3: Flexible Layouts

Use relative units:
- \`%\`, \`rem\`, \`em\`, \`vw\`, \`vh\`
- Avoid fixed widths like \`width: 300px;\`

## Step 4: Test on Real Devices

Use Chrome DevTools' device emulator or test on actual phones.

> 📱 A responsive site isn't optional — it's essential.

Your users will thank you.`,
    },
  },
  {
    id: 10,
    slug: 'from-zero-to-deploy-hosting-your-first-website',
    logo: '⚫️',
    title: 'From Zero to Deploy: Hosting Your First Website',
    desc: 'Learn how to publish your HTML/CSS/JS site online using free platforms like GitHub Pages and Netlify.',
    tags: ['Deployment', 'Hosting', 'Beginner'],
    thumbnail: '/media/blogs/portal_cover.png',
    date: { hh: 15, mm: 50, dd: 1, MM: 9, yyyy: 2025 },
    readTime: '8 min read',
    blogcontent: {
      title: 'From Zero to Deploy: Hosting Your First Website',
      content: `# From Zero to Deploy: Hosting Your First Website

You've built a beautiful site. Now, let's put it on the internet for the world to see!

## Option 1: GitHub Pages (Free & Simple)

1. Create a GitHub account
2. Create a new repo named \`yourusername.github.io\`
3. Upload your HTML, CSS, JS files
4. Wait a few minutes
5. Visit \`https://yourusername.github.io\`

` + '✅ Great for portfolios and static sites.' + `

## Option 2: Netlify (Drag & Drop)

1. Go to [netlify.com](https://www.netlify.com/)
2. Drag your project folder onto the dashboard
3. It auto-deploys with a random URL (e.g., \`calm-sunset-123.netlify.app\`)

` + '🔥 Bonus: Connect to GitHub for automatic updates.' + `

## Option 3: Vercel

Also free for static sites. Great for React, but works with plain HTML too.

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Final Checklist Before Deploying

- [ ] All links and image paths are correct
- [ ] Added \`<meta name="description">\`
- [ ] Tested on mobile
- [ ] Favicon added

> 🌍 Congratulations! You're officially a published web developer.

Your first website is live — share it proudly.`,
    },
  },
];

export const blogTags = [...new Set(blogs.flatMap((b) => b.tags))];

export default blogs;
