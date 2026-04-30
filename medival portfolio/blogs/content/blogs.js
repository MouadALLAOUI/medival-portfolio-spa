const blogs = [
  {
    id: 1,
    logo: "🟢",
    title: "Your First Beginner Course to HTML",
    desc: "Start from scratch and learn the foundation of web development with HTML.",
    tags: ["HTML", "Beginner", "Web Development"],
    thumbnail: "",
    date: { hh: 17, mm: 30, dd: 14, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "Your First Beginner Course to HTML",
      content: "# Your First Beginner Course to HTML\n\nWelcome to your first step into web development! HTML (HyperText Markup Language) is the backbone of every webpage.\n\n## What is HTML?\n\nHTML is not a programming language — it’s a **markup language** used to define the structure of web content. Browsers read HTML and render it as visible web pages.\n\n## Basic Structure\n\nEvery HTML document starts with this boilerplate:\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first paragraph.</p>\n</body>\n</html>\n```\n\n## Key Tags to Know\n\n- `&lt;h1&gt;` to `&lt;h6&gt;`: Headings (h1 is most important)\n- `&lt;p&gt;`: Paragraphs\n- `&lt;a href=\"url\"&gt;`: Hyperlinks\n- `&lt;img src=\"image.jpg\" alt=\"description\"&gt;`: Images\n- `&lt;ul&gt;`, `&lt;ol&gt;`, `&lt;li&gt;`: Lists\n- `&lt;div&gt;` and `&lt;span&gt;`: Layout and inline containers\n\n## Try It Yourself\n\nCreate a file called `index.html`, paste the boilerplate, and open it in your browser. You’re now a web developer!\n\n> 💡 Tip: Use VS Code with the \"Live Server\" extension for instant preview.\n\nNext up: Let’s style it with CSS!"
    }
  },
  {
    id: 2,
    logo: "🟣",
    title: "How to Implement CSS Into Your HTML",
    desc: "Learn how to style your static website using internal, external, and inline CSS.",
    tags: ["CSS", "Styling", "Web Development"],
    thumbnail: "",
    date: { hh: 9, mm: 15, dd: 16, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "How to Implement CSS Into Your HTML",
      content: "# How to Implement CSS Into Your HTML\n\nNow that you’ve built a basic HTML page, it’s time to make it look good! CSS (Cascading Style Sheets) controls layout, colors, fonts, and animations.\n\n## Three Ways to Add CSS\n\n### 1. Inline CSS (Not Recommended for Large Projects)\n\nApply styles directly to an element using the `style` attribute.\n\n```\n<p style=\"color: blue; font-size: 18px;\">This text is styled!</p>\n```\n\n### 2. Internal CSS (Good for Single Pages)\n\nUse the `&lt;style&gt;` tag inside the `&lt;head&gt;`.\n\n```\n<head>\n  <style>\n    body { background-color: #f0f0f0; }\n    h1 { color: purple; }\n  </style>\n</head>\n```\n\n### 3. External CSS (Best Practice)\n\nCreate a separate file (e.g., `styles.css`) and link it:\n\n```\n<link rel=\"stylesheet\" href=\"styles.css\">\n```\n\nAnd in `styles.css`:\n```\nh1 {\n  color: teal;\n  font-family: 'Arial', sans-serif;\n}\n```\n\n## Why External CSS?\n\n- Reusable across multiple pages\n- Cleaner separation of concerns\n- Easier maintenance\n\n> 🛠️ Pro Tip: Always use external CSS in real projects.\n\nNow your site isn’t just structured — it’s beautiful!"
    }
  },
  {
    id: 3,
    logo: "🟡",
    title: "Add JavaScript to Your First Static Website",
    desc: "Bring interactivity to life by adding scripts to your HTML page.",
    tags: ["JavaScript", "Frontend", "Interactivity"],
    thumbnail: "",
    date: { hh: 12, mm: 45, dd: 18, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "Add JavaScript to Your First Static Website",
      content: "# Add JavaScript to Your First Static Website\n\nHTML builds structure. CSS adds style. Now, **JavaScript** brings behavior and interactivity.\n\n## What Can JavaScript Do?\n\n- Respond to user clicks\n- Update content dynamically\n- Validate forms\n- Fetch data from servers\n\n## How to Include JavaScript\n\n### Option 1: Inline Script\n\n```\n<button onclick=\"alert('Hello!')\">Click Me</button>\n```\n\n### Option 2: Internal Script\n\nInside `&lt;head&gt;` or before `&lt;/body&gt;`:\n\n```\n<script>\n  function greet() {\n    alert(\"Welcome to my site!\");\n  }\n</script>\n```\n\n### Option 3: External Script (Recommended)\n\nCreate `script.js` and link it:\n\n```\n<script src=\"script.js\"></script>\n```\n\nIn `script.js`:\n```\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const btn = document.querySelector(\"button\");\n  btn.addEventListener(\"click\", () => {\n    console.log(\"Button clicked!\");\n  });\n});\n```\n\n## Where to Place Scripts?\n\nAlways place the `&lt;script&gt;` tag **before the closing `&lt;/body&gt;`** tag to ensure the DOM is loaded.\n\n> ⚠️ Never block page rendering with heavy scripts in the head.\n\nYou’ve now made a fully interactive webpage!"
    }
  },
  {
    id: 4,
    logo: "🔵",
    title: "Essential HTML Tags You Should Know",
    desc: "A curated list of must-know HTML elements for every beginner developer.",
    tags: ["HTML", "Tips", "Structure"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 20, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "Essential HTML Tags You Should Know",
      content: "# Essential HTML Tags You Should Know\n\nWhile learning HTML, some tags are used far more than others. Here’s a list of **essential tags** you’ll use daily.\n\n## 1. Semantic Tags (Modern HTML5)\n\nUse these for better SEO and accessibility:\n\n- `&lt;header>`: Top section (logo, nav)\n- `&lt;nav>`: Navigation links\n- `&lt;main>`: Main content\n- `&lt;section>`: Thematic grouping\n- `&lt;article>`: Self-contained content (blog post)\n- `&lt;aside>`: Sidebar or related content\n- `&lt;footer>`: Bottom info (copyright, links)\n\n```\n<main>\n  <article>\n    <h2>My Blog Post</h2>\n    <p>Content goes here...</p>\n  </article>\n</main>\n```\n\n## 2. Form Elements\n\nFor user input:\n\n- `&lt;form>`: Container for inputs\n- `&lt;input type=\"text\">`: Text field\n- `&lt;input type=\"email\">`: Email validation\n- `&lt;textarea>`: Multi-line text\n- `&lt;button type=\"submit\">`: Submit button\n\n## 3. Multimedia\n\n- `&lt;img src=\"cat.jpg\" alt=\"A cute cat\">`\n- `&lt;audio controls>`: Play audio\n- `&lt;video width=\"320\" height=\"240\" controls>`: Embed video\n\n## 4. Useful Utility Tags\n\n- `&lt;br>`: Line break\n- `&lt;hr>`: Horizontal rule\n- `&lt;code>`: Inline code snippet\n- `&lt;pre>`: Preformatted text (preserves spaces)\n\n> 🧠 Remember: Always use semantic tags over generic `&lt;div>` when possible.\n\nThese tags will carry you through 90% of your HTML work."
    }
  },
  {
    id: 5,
    logo: "🟠",
    title: "Don't Underestimate CSS: Advanced Tricks You Need",
    desc: "Level up your styling game with powerful CSS techniques like Flexbox, Grid, and custom properties.",
    tags: ["CSS", "Advanced", "Layout"],
    thumbnail: "",
    date: { hh: 16, mm: 20, dd: 22, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "Don't Underestimate CSS: Advanced Tricks You Need",
      content: "# Don't Underestimate CSS: Advanced Tricks You Need\n\nCSS is often underestimated, but modern CSS is incredibly powerful. Let’s explore advanced features that make layouts a breeze.\n\n## 1. CSS Flexbox\n\nPerfect for one-dimensional layouts (rows or columns).\n\n```\n.container {\n  display: flex;\n  justify-content: center; /⍣ horizontal ⍣/\n  align-items: center;     /⍣ vertical ⍣/\n  gap: 10px;\n}\n```\n\nUseful for navigation bars, cards, and responsive alignment.\n\n## 2. CSS Grid\n\nFor two-dimensional layouts (rows and columns):\n\n```\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  grid-gap: 20px;\n}\n```\n\nIdeal for dashboards, image galleries, and complex UIs.\n\n## 3. CSS Variables (Custom Properties)\n\nDefine reusable values:\n\n```\n:root {\n  --primary-color: #3498db;\n  --font-main: 'Segoe UI', sans-serif;\n}\n\nbutton {\n  background: var(--primary-color);\n  font-family: var(--font-main);\n}\n```\n\n## 4. Responsive Design with Media Queries\n\n```\n@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}\n```\n\n## 5. Hover & Transitions\n\nAdd smooth effects:\n\n```\n.card {\n  transition: transform 0.3s ease;\n}\n\n.card:hover {\n  transform: scale(1.05);\n}\n```\n\n> 🎯 Master these, and you’ll write cleaner, more maintainable CSS.\n\nCSS isn’t just decoration — it’s architecture."
    }
  },
  {
    id: 6,
    logo: "🔴",
    title: "JavaScript DOM Manipulation for Beginners",
    desc: "Learn how to change HTML content and styles dynamically using JavaScript.",
    tags: ["JavaScript", "DOM", "Dynamic"],
    thumbnail: "",
    date: { hh: 11, mm: 10, dd: 24, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "JavaScript DOM Manipulation for Beginners",
      content: "# JavaScript DOM Manipulation for Beginners\n\nThe **Document Object Model (DOM)** is a tree-like representation of your HTML. With JavaScript, you can **read and modify** it in real time.\n\n## Selecting Elements\n\n```\ndocument.getElementById(\"title\");\ndocument.querySelector(\".btn\");\ndocument.querySelectorAll(\"li\");\n```\n\n## Changing Content\n\n```\nconst heading = document.getElementById(\"title\");\nheading.textContent = \"Updated Title!\";\nheading.innerHTML = \"<em>New italic title</em>\";\n```\n\n## Modifying Styles\n\n```\nheading.style.color = \"red\";\nheading.style.fontSize = \"2rem\";\n```\n\n## Adding/Removing Classes\n\n```\nconst box = document.querySelector(\".box\");\nbox.classList.add(\"highlight\");\nbox.classList.remove(\"old-style\");\nbox.classList.toggle(\"visible\"); // toggle on/off\n```\n\n## Creating New Elements\n\n```\nconst newLi = document.createElement(\"li\");\nnewLi.textContent = \"New item\";\ndocument.querySelector(\"ul\").appendChild(newLi);\n```\n\n## Event Listeners\n\n```\nbutton.addEventListener(\"click\", () => {\n  alert(\"Button clicked!\");\n});\n```\n\n> 🧪 Try building a todo list that adds and removes items.\n\nDOM manipulation turns static sites into dynamic apps."
    }
  },
  {
    id: 7,
    logo: "⚪️",
    title: "Understanding Variables, Data Types & Operators in JS",
    desc: "A deep dive into JavaScript fundamentals: variables, types, and operations.",
    tags: ["JavaScript", "Basics", "Concepts"],
    thumbnail: "",
    date: { hh: 14, mm: 5, dd: 26, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "Understanding Variables, Data Types & Operators in JS",
      content: "# Understanding Variables, Data Types & Operators in JS\n\nBefore diving into complex logic, master the building blocks of JavaScript.\n\n## Variables: `let`, `const`, and `var`\n\n```\nlet age = 25;           // can be reassigned\nconst name = \"Alex\";    // cannot be changed\nvar oldStyle = true;    // avoid (legacy)\n```\n\n👉 Always prefer `const` unless you need reassignment.\n\n## Primitive Data Types\n\n- `String`: \"Hello\"\n- `Number`: 42 or 3.14\n- `Boolean`: true / false\n- `null`: intentional empty value\n- `undefined`: variable declared but not assigned\n- `Symbol`: unique identifiers\n- `BigInt`: very large numbers\n\n## Operators\n\n- Arithmetic: `+`, `-`, `*`, `/`, `%`, ``\n- Comparison: `==`, `===`, `!=`, `<`, `>`\n- Logical: `&&` (and), `||` (or), `!` (not)\n\n## Type Checking\n\n```\ntypeof \"hello\"  // \"string\"\ntypeof 42       // \"number\"\n```\n\n> 📌 Use `===` (strict equality) to avoid type coercion bugs.\n\nThese concepts are the foundation of all JavaScript programs."
    }
  },
  {
    id: 8,
    logo: "🔷",
    title: "How to Debug JavaScript Like a Pro",
    desc: "Master console.log, breakpoints, and browser dev tools to squash bugs fast.",
    tags: ["JavaScript", "Debugging", "Tools"],
    thumbnail: "",
    date: { hh: 13, mm: 30, dd: 28, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "How to Debug JavaScript Like a Pro",
      content: "# How to Debug JavaScript Like a Pro\n\nEven expert developers write buggy code. The key is knowing how to **find and fix** issues quickly.\n\n## 1. `console.log()` (The Classic)\n\n```\nconsole.log(\"User clicked:\", user);\nconsole.log(\"Current state:\", state);\n```\n\n👉 Use descriptive labels and log objects/arrays.\n\n## 2. Browser Dev Tools\n\nOpen with `F12` or right-click → \"Inspect\".\n\n### Key Panels:\n- **Console**: View logs and errors\n- **Sources**: Set breakpoints\n- **Network**: Monitor API calls\n- **Elements**: Inspect HTML/CSS live\n\n## 3. Breakpoints\n\nPause code execution:\n\n```\ndebugger; // Pauses here when Dev Tools are open\n```\n\nOr click line numbers in \"Sources\" tab.\n\n## 4. Handle Errors Gracefully\n\n```\ntry {\n  riskyOperation();\n} catch (error) {\n  console.error(\"Something went wrong:\", error.message);\n}\n```\n\n## 5. Use `console.table()` for Arrays\n\n```\nconst users = [{name: \"Alice\"}, {name: \"Bob\"}];\nconsole.table(users);\n```\n\n> 🛠️ Pro Tip: Avoid `alert()` for debugging — it blocks the UI.\n\nDebugging isn’t a sign of failure — it’s part of the process."
    }
  },
  {
    id: 9,
    logo: "🔶",
    title: "Intro to Responsive Web Design with Media Queries",
    desc: "Make your websites mobile-friendly using CSS media queries and viewport settings.",
    tags: ["CSS", "Responsive", "Mobile"],
    thumbnail: "",
    date: { hh: 10, mm: 40, dd: 30, MM: 8, yyyy: 2025 },
    blogcontent: {
      title: "Intro to Responsive Web Design with Media Queries",
      content: "# Intro to Responsive Web Design with Media Queries\n\nOver 60% of web traffic comes from mobile devices. Your site **must** look good on all screens.\n\n## Step 1: The Viewport Meta Tag\n\nAdd this to your `<head>`:\n\n```\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n```\n\nThis tells mobile browsers to render at actual device width.\n\n## Step 2: Mobile-First Approach\n\nWrite styles for small screens first, then enhance for larger ones.\n\n```\n/* Base (mobile) */\n.container {\n  padding: 10px;\n}\n\n/* Tablet */\n@media (min-width: 768px) {\n  .container {\n    padding: 20px;\n  }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n}\n```\n\n## Step 3: Flexible Layouts\n\nUse relative units:\n- `%`, `rem`, `em`, `vw`, `vh`\n- Avoid fixed widths like `width: 300px;`\n\n## Step 4: Test on Real Devices\n\nUse Chrome DevTools' device emulator or test on actual phones.\n\n> 📱 A responsive site isn’t optional — it’s essential.\n\nYour users will thank you."
    }
  },
  {
    id: 10,
    logo: "⚫️",
    title: "From Zero to Deploy: Hosting Your First Website",
    desc: "Learn how to publish your HTML/CSS/JS site online using free platforms like GitHub Pages and Netlify.",
    tags: ["Deployment", "Hosting", "Beginner"],
    thumbnail: "",
    date: { hh: 15, mm: 50, dd: 1, MM: 9, yyyy: 2025 },
    blogcontent: {
      title: "From Zero to Deploy: Hosting Your First Website",
      content: "# From Zero to Deploy: Hosting Your First Website\n\nYou’ve built a beautiful site. Now, let’s put it on the internet for the world to see!\n\n## Option 1: GitHub Pages (Free & Simple)\n\n1. Create a GitHub account\n2. Create a new repo named `yourusername.github.io`\n3. Upload your HTML, CSS, JS files\n4. Wait a few minutes\n5. Visit `https://yourusername.github.io`\n\n✅ Great for portfolios and static sites.\n\n## Option 2: Netlify (Drag & Drop)\n\n1. Go to [netlify.com](https://www.netlify.com/)\n2. Drag your project folder onto the dashboard\n3. It auto-deploys with a random URL (e.g., `calm-sunset-123.netlify.app`)\n\n🔥 Bonus: Connect to GitHub for automatic updates.\n\n## Option 3: Vercel\n\nAlso free for static sites. Great for React, but works with plain HTML too.\n\n```\nnpm install -g vercel\nvercel\n```\n\n## Final Checklist Before Deploying\n\n- [ ] All links and image paths are correct\n- [ ] Added `&lt;meta name=\"description\">`\n- [ ] Tested on mobile\n- [ ] Favicon added\n\n> 🌍 Congratulations! You’re officially a published web developer.\n\nYour first website is live — share it proudly."
    }
  }
];

export default blogs;