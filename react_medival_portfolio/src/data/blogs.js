const blogs = [
  {
    id: "blog-your-first-beginner-course-to-html",
    logo: "🟢",
    title: "Your First Beginner Course to HTML",
    desc: "Start from scratch and learn the foundation of web development with HTML.",
    tags: ["HTML", "Beginner", "Web Development"],
    thumbnail: "/media/blogs/blog-html.svg",
    date: { hh: 17, mm: 30, dd: 14, MM: 8, yyyy: 2025 },
    readTime: "5 min read"
  },
  {
    id: "blog-how-to-implement-css-into-your-html",
    logo: "🟣",
    title: "How to Implement CSS Into Your HTML",
    desc: "Learn how to style your static website using internal, external, and inline CSS.",
    tags: ["CSS", "Styling", "Web Development"],
    thumbnail: "/media/blogs/blog-css.svg",
    date: { hh: 9, mm: 15, dd: 16, MM: 8, yyyy: 2025 },
    readTime: "6 min read"
  },
  {
    id: "blog-add-javascript-to-your-first-static-website",
    logo: "🟡",
    title: "Add JavaScript to Your First Static Website",
    desc: "Bring interactivity to life by adding scripts to your HTML page.",
    tags: ["JavaScript", "Frontend", "Interactivity"],
    thumbnail: "/media/blogs/blog-js.svg",
    date: { hh: 12, mm: 45, dd: 18, MM: 8, yyyy: 2025 },
    readTime: "7 min read"
  },
  {
    id: "blog-essential-html-tags-you-should-know",
    logo: "🔵",
    title: "Essential HTML Tags You Should Know",
    desc: "A curated list of must-know HTML elements for every beginner developer.",
    tags: ["HTML", "Tips", "Structure"],
    thumbnail: "/media/blogs/blog-html-tags.svg",
    date: { hh: 10, mm: 0, dd: 20, MM: 8, yyyy: 2025 },
    readTime: "6 min read"
  },
  {
    id: "blog-dont-underestimate-css-advanced-tricks-you-need",
    logo: "orange",
    title: "Don't Underestimate CSS: Advanced Tricks You Need",
    desc: "Level up your styling game with powerful CSS techniques like Flexbox, Grid, and custom properties.",
    tags: ["CSS", "Advanced", "Layout"],
    thumbnail: "/media/blogs/blog-css-advanced.svg",
    date: { hh: 16, mm: 20, dd: 22, MM: 8, yyyy: 2025 },
    readTime: "8 min read"
  },
  {
    id: "blog-javascript-dom-manipulation-for-beginners",
    logo: "🔴",
    title: "JavaScript DOM Manipulation for Beginners",
    desc: "Learn how to change HTML content and styles dynamically using JavaScript.",
    tags: ["JavaScript", "DOM", "Dynamic"],
    thumbnail: "/media/blogs/blog-dom.svg",
    date: { hh: 11, mm: 10, dd: 24, MM: 8, yyyy: 2025 },
    readTime: "7 min read"
  },
  {
    id: "blog-understanding-variables-data-types-and-operators-in-js",
    logo: "⚪️",
    title: "Understanding Variables, Data Types & Operators in JS",
    desc: "A deep dive into JavaScript fundamentals: variables, types, and operations.",
    tags: ["JavaScript", "Basics", "Concepts"],
    thumbnail: "/media/blogs/blog-variables.svg",
    date: { hh: 14, mm: 5, dd: 26, MM: 8, yyyy: 2025 },
    readTime: "6 min read"
  },
  {
    id: "blog-how-to-debug-javascript-like-a-pro",
    logo: "🔷",
    title: "How to Debug JavaScript Like a Pro",
    desc: "Master console.log, breakpoints, and browser dev tools to squash bugs fast.",
    tags: ["JavaScript", "Debugging", "Tools"],
    thumbnail: "/media/blogs/blog-debug.svg",
    date: { hh: 13, mm: 30, dd: 28, MM: 8, yyyy: 2025 },
    readTime: "7 min read"
  },
  {
    id: "blog-intro-to-responsive-web-design-with-media-queries",
    logo: "🔶",
    title: "Intro to Responsive Web Design with Media Queries",
    desc: "Make your websites mobile-friendly using CSS media queries and viewport settings.",
    tags: ["CSS", "Responsive", "Mobile"],
    thumbnail: "/media/blogs/blog-responsive.svg",
    date: { hh: 10, mm: 40, dd: 30, MM: 8, yyyy: 2025 },
    readTime: "6 min read"
  },
  {
    id: "blog-from-zero-to-deploy-hosting-your-first-website",
    logo: "⚫️",
    title: "From Zero to Deploy: Hosting Your First Website",
    desc: "Learn how to publish your HTML/CSS/JS site online using free platforms like GitHub Pages and Netlify.",
    tags: ["Deployment", "Hosting", "Beginner"],
    thumbnail: "/media/blogs/blog-deploy.svg",
    date: { hh: 15, mm: 50, dd: 1, MM: 9, yyyy: 2025 },
    readTime: "8 min read"
  },
  {
    id: "blog-logo-programming-basic-syntax",
    logo: "🔤",
    title: "Logo Programming: Basic Syntax",
    desc: "Learn the fundamentals of Logo programming and its simple, turtle-based syntax.",
    tags: ["Logo", "Programming", "Beginner"],
    thumbnail: "",
    date: { hh: 9, mm: 0, dd: 5, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-what-is-algorithm-pseudocode",
    logo: "📐",
    title: "Algorithm: What is an Algorithm and Pseudocode",
    desc: "Understand what algorithms are and how pseudocode helps you plan solutions before coding.",
    tags: ["Algorithm", "Basics", "Computer Science"],
    thumbnail: "",
    date: { hh: 10, mm: 30, dd: 7, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-2-variables-write-and-read",
    logo: "📦",
    title: "Algorithm 2: Variables — Write and Read",
    desc: "Explore how variables store and retrieve data within algorithms.",
    tags: ["Algorithm", "Variables", "Basics"],
    thumbnail: "",
    date: { hh: 14, mm: 15, dd: 9, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-3-conditional-operations",
    logo: "🔀",
    title: "Algorithm 3: Conditional Operations",
    desc: "Learn how if/else statements and conditionals direct the flow of an algorithm.",
    tags: ["Algorithm", "Conditionals", "Logic"],
    thumbnail: "",
    date: { hh: 11, mm: 45, dd: 12, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-4-loops",
    logo: "🔁",
    title: "Algorithm 4: Loops",
    desc: "Master loops to repeat actions efficiently in your algorithms.",
    tags: ["Algorithm", "Loops", "Programming"],
    thumbnail: "",
    date: { hh: 16, mm: 0, dd: 14, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-5-arrays-and-lists",
    logo: "📋",
    title: "Algorithm 5: Arrays and Lists",
    desc: "Discover how arrays and lists organize and manage collections of data.",
    tags: ["Algorithm", "Data Structures", "Arrays"],
    thumbnail: "",
    date: { hh: 13, mm: 20, dd: 17, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-6-functions-and-procedures",
    logo: "⚙️",
    title: "Algorithm 6: Functions and Procedures",
    desc: "Learn how functions and procedures break complex problems into reusable blocks.",
    tags: ["Algorithm", "Functions", "Programming"],
    thumbnail: "",
    date: { hh: 10, mm: 10, dd: 20, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-7-recursion",
    logo: "🌀",
    title: "Algorithm 7: Recursion",
    desc: "Understand recursion and how functions can call themselves to solve problems.",
    tags: ["Algorithm", "Recursion", "Advanced"],
    thumbnail: "",
    date: { hh: 15, mm: 30, dd: 22, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-8-sorting-algorithms",
    logo: "📊",
    title: "Algorithm 8: Sorting Algorithms",
    desc: "Compare popular sorting algorithms like bubble sort, merge sort, and quicksort.",
    tags: ["Algorithm", "Sorting", "Data Structures"],
    thumbnail: "",
    date: { hh: 9, mm: 45, dd: 25, MM: 1, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-algorithm-9-searching-algorithms",
    logo: "🔍",
    title: "Algorithm 9: Searching Algorithms",
    desc: "Explore searching techniques including linear search and binary search.",
    tags: ["Algorithm", "Searching", "Data Structures"],
    thumbnail: "",
    date: { hh: 12, mm: 0, dd: 28, MM: 1, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-algorithm-10-time-and-space-complexity",
    logo: "⏱️",
    title: "Algorithm 10: Time and Space Complexity (Big O)",
    desc: "Learn how Big O notation measures algorithm efficiency and performance.",
    tags: ["Algorithm", "Big O", "Complexity"],
    thumbnail: "",
    date: { hh: 17, mm: 15, dd: 30, MM: 1, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-flowcharts-visualizing-logic",
    logo: "🗺️",
    title: "Flowcharts: Visualizing Logic",
    desc: "Use flowcharts to map out algorithm steps and visualize decision logic.",
    tags: ["Flowcharts", "Logic", "Basics"],
    thumbnail: "",
    date: { hh: 10, mm: 30, dd: 2, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-debugging-how-to-find-and-fix-bugs",
    logo: "🐛",
    title: "Debugging: How to Find and Fix Bugs",
    desc: "Learn systematic techniques to identify, trace, and fix bugs in your code.",
    tags: ["Debugging", "Tools", "Programming"],
    thumbnail: "",
    date: { hh: 14, mm: 0, dd: 5, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-html-your-first-web-page-from-scratch",
    logo: "📄",
    title: "HTML: Your First Web Page from Scratch",
    desc: "Build your very first HTML web page from the ground up with clean structure.",
    tags: ["HTML", "Beginner", "Web Development"],
    thumbnail: "",
    date: { hh: 9, mm: 15, dd: 8, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-html-2-forms-inputs-and-user-interaction",
    logo: "📝",
    title: "HTML 2: Forms, Inputs, and User Interaction",
    desc: "Create interactive forms to collect user data with various input types.",
    tags: ["HTML", "Forms", "Web Development"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 11, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-html-3-semantic-html-and-accessibility",
    logo: "♿",
    title: "HTML 3: Semantic HTML and Accessibility",
    desc: "Write meaningful HTML with semantic tags to improve accessibility and SEO.",
    tags: ["HTML", "Accessibility", "Semantic"],
    thumbnail: "",
    date: { hh: 15, mm: 45, dd: 14, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-css-styling-your-first-website",
    logo: "🎨",
    title: "CSS: Styling Your First Website",
    desc: "Apply your first CSS styles to bring color, layout, and personality to your site.",
    tags: ["CSS", "Beginner", "Styling"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 17, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-css-2-flexbox-the-complete-guide",
    logo: "📦",
    title: "CSS 2: Flexbox — The Complete Guide",
    desc: "Master Flexbox layout to align and distribute space among items in a container.",
    tags: ["CSS", "Flexbox", "Layout"],
    thumbnail: "",
    date: { hh: 13, mm: 20, dd: 20, MM: 2, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-css-3-css-grid-layout-for-modern-pages",
    logo: "🔲",
    title: "CSS 3: CSS Grid Layout for Modern Pages",
    desc: "Build complex two-dimensional layouts with CSS Grid for modern web pages.",
    tags: ["CSS", "Grid", "Layout"],
    thumbnail: "",
    date: { hh: 9, mm: 45, dd: 23, MM: 2, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-css-4-responsive-design-with-media-queries",
    logo: "📱",
    title: "CSS 4: Responsive Design with Media Queries",
    desc: "Make your website adapt to any screen size using CSS media queries.",
    tags: ["CSS", "Responsive", "Mobile"],
    thumbnail: "",
    date: { hh: 16, mm: 30, dd: 26, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-css-5-animations-and-transitions",
    logo: "✨",
    title: "CSS 5: Animations and Transitions",
    desc: "Add smooth animations and transitions to enhance user experience.",
    tags: ["CSS", "Animations", "Transitions"],
    thumbnail: "",
    date: { hh: 12, mm: 10, dd: 28, MM: 2, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-css-6-css-variables-and-custom-properties",
    logo: "🎛️",
    title: "CSS 6: CSS Variables and Custom Properties",
    desc: "Use CSS variables to create maintainable, reusable, and themeable styles.",
    tags: ["CSS", "Variables", "Theming"],
    thumbnail: "",
    date: { hh: 14, mm: 50, dd: 1, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-javascript-adding-interactivity-to-your-site",
    logo: "⚡",
    title: "JavaScript: Adding Interactivity to Your Site",
    desc: "Make your static pages interactive with basic JavaScript event handling.",
    tags: ["JavaScript", "Beginner", "Interactivity"],
    thumbnail: "",
    date: { hh: 10, mm: 30, dd: 4, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-javascript-2-dom-manipulation",
    logo: "🌳",
    title: "JavaScript 2: DOM Manipulation",
    desc: "Learn to select, create, and modify DOM elements to build dynamic pages.",
    tags: ["JavaScript", "DOM", "Dynamic"],
    thumbnail: "",
    date: { hh: 13, mm: 0, dd: 7, MM: 3, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-javascript-3-events-and-event-handling",
    logo: "🖱️",
    title: "JavaScript 3: Events and Event Handling",
    desc: "Handle user interactions with event listeners, bubbling, and delegation.",
    tags: ["JavaScript", "Events", "DOM"],
    thumbnail: "",
    date: { hh: 9, mm: 15, dd: 10, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-javascript-4-fetch-api-and-asynchronous-programming",
    logo: "🌐",
    title: "JavaScript 4: Fetch API and Async Programming",
    desc: "Fetch data from APIs and understand async/await for non-blocking operations.",
    tags: ["JavaScript", "Async", "API"],
    thumbnail: "",
    date: { hh: 15, mm: 45, dd: 13, MM: 3, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-javascript-5-es6-features-you-need-to-know",
    logo: "🚀",
    title: "JavaScript 5: ES6+ Features You Need to Know",
    desc: "Explore modern JavaScript features including arrow functions, destructuring, and modules.",
    tags: ["JavaScript", "ES6", "Modern"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 16, MM: 3, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-javascript-6-json-data-exchange-format",
    logo: "📋",
    title: "JavaScript 6: JSON — Data Exchange Format",
    desc: "Learn JSON syntax and how to parse and stringify data in JavaScript.",
    tags: ["JavaScript", "JSON", "Data"],
    thumbnail: "",
    date: { hh: 14, mm: 0, dd: 19, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-git-version-control-for-beginners",
    logo: "🌿",
    title: "Git: Version Control for Beginners",
    desc: "Start tracking changes in your code with Git's essential commands.",
    tags: ["Git", "Version Control", "Beginner"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 22, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-git-2-branching-merging-and-collaboration",
    logo: "🔀",
    title: "Git 2: Branching, Merging, and Collaboration",
    desc: "Use branches to work on features in parallel and merge changes safely.",
    tags: ["Git", "Branching", "Collaboration"],
    thumbnail: "",
    date: { hh: 16, mm: 20, dd: 25, MM: 3, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-github-hosting-your-first-repository",
    logo: "🐙",
    title: "GitHub: Hosting Your First Repository",
    desc: "Create a GitHub repository and push your project to the cloud.",
    tags: ["GitHub", "Hosting", "Pages"],
    thumbnail: "",
    date: { hh: 12, mm: 45, dd: 28, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-vs-code-essential-extensions-and-shortcuts",
    logo: "⌨️",
    title: "VS Code: Essential Extensions and Shortcuts",
    desc: "Boost your productivity with must-have extensions and keyboard shortcuts in VS Code.",
    tags: ["VS Code", "Tools", "Extensions"],
    thumbnail: "",
    date: { hh: 9, mm: 30, dd: 31, MM: 3, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-terminal-command-line-basic-commands",
    logo: "💻",
    title: "Terminal/Command Line: Basic Commands Every Developer Should Know",
    desc: "Master essential terminal commands for navigating files, directories, and system tasks.",
    tags: ["Terminal", "CLI", "Commands"],
    thumbnail: "",
    date: { hh: 14, mm: 10, dd: 2, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-how-the-internet-works-from-browser-to-server",
    logo: "🌍",
    title: "How the Internet Works: From Browser to Server",
    desc: "Understand the journey of data from your browser through networks to web servers.",
    tags: ["Internet", "Networking", "HTTP"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 5, MM: 4, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-python-getting-started",
    logo: "🐍",
    title: "Python: Getting Started",
    desc: "Install Python and write your first program in this beginner-friendly guide.",
    tags: ["Python", "Beginner", "Setup"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 8, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-python-2-data-types-and-variables",
    logo: "📊",
    title: "Python 2: Data Types and Variables",
    desc: "Learn about Python's core data types and how to use variables effectively.",
    tags: ["Python", "Data Types", "Variables"],
    thumbnail: "",
    date: { hh: 15, mm: 15, dd: 11, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-python-3-control-flow-and-loops",
    logo: "🔄",
    title: "Python 3: Control Flow and Loops",
    desc: "Use conditionals and loops to control program execution in Python.",
    tags: ["Python", "Loops", "Conditionals"],
    thumbnail: "",
    date: { hh: 12, mm: 45, dd: 14, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-python-4-functions-and-modules",
    logo: "🔧",
    title: "Python 4: Functions and Modules",
    desc: "Write reusable functions and organize code with Python modules.",
    tags: ["Python", "Functions", "Modules"],
    thumbnail: "",
    date: { hh: 9, mm: 30, dd: 17, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-python-5-file-handling",
    logo: "📁",
    title: "Python 5: File Handling",
    desc: "Read from and write to files using Python's built-in file handling capabilities.",
    tags: ["Python", "Files", "I/O"],
    thumbnail: "",
    date: { hh: 16, mm: 0, dd: 20, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-python-6-object-oriented-programming",
    logo: "🏗️",
    title: "Python 6: Object-Oriented Programming (OOP)",
    desc: "Understand classes, objects, inheritance, and encapsulation in Python.",
    tags: ["Python", "OOP", "Classes"],
    thumbnail: "",
    date: { hh: 13, mm: 20, dd: 23, MM: 4, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-python-7-working-with-libraries",
    logo: "📚",
    title: "Python 7: Working with Libraries",
    desc: "Install and use third-party libraries with pip to extend Python's functionality.",
    tags: ["Python", "Libraries", "pip"],
    thumbnail: "",
    date: { hh: 10, mm: 45, dd: 26, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-java-introduction-and-setup",
    logo: "☕",
    title: "Java: Introduction and Setup",
    desc: "Get started with Java by installing the JDK and writing your first program.",
    tags: ["Java", "Beginner", "Setup"],
    thumbnail: "",
    date: { hh: 14, mm: 15, dd: 29, MM: 4, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-java-2-oop-in-java-classes-and-objects",
    logo: "🧱",
    title: "Java 2: OOP in Java — Classes and Objects",
    desc: "Build object-oriented programs with classes, objects, and methods in Java.",
    tags: ["Java", "OOP", "Classes"],
    thumbnail: "",
    date: { hh: 11, mm: 0, dd: 2, MM: 5, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-java-3-collections-framework",
    logo: "🗂️",
    title: "Java 3: Collections Framework",
    desc: "Use Java's Collections framework to store and manipulate groups of objects.",
    tags: ["Java", "Collections", "Data Structures"],
    thumbnail: "",
    date: { hh: 15, mm: 30, dd: 5, MM: 5, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-c-language-basics-and-setup",
    logo: "⚙️",
    title: "C Language: Basics and Setup",
    desc: "Set up your C development environment and learn the language fundamentals.",
    tags: ["C", "Beginner", "Setup"],
    thumbnail: "",
    date: { hh: 10, mm: 15, dd: 8, MM: 5, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-c-2-pointers-and-memory-management",
    logo: "📍",
    title: "C 2: Pointers and Memory Management",
    desc: "Understand pointers, memory addresses, and dynamic allocation in C.",
    tags: ["C", "Pointers", "Memory"],
    thumbnail: "",
    date: { hh: 13, mm: 45, dd: 11, MM: 5, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-c-3-structures-and-file-io",
    logo: "📄",
    title: "C 3: Structures and File I/O",
    desc: "Use structures to group data and perform file operations in C.",
    tags: ["C", "Structures", "Files"],
    thumbnail: "",
    date: { hh: 9, mm: 0, dd: 14, MM: 5, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-php-server-side-scripting-basics",
    logo: "🐘",
    title: "PHP: Server-Side Scripting Basics",
    desc: "Learn the basics of PHP for building dynamic server-side web applications.",
    tags: ["PHP", "Backend", "Beginner"],
    thumbnail: "",
    date: { hh: 16, mm: 30, dd: 17, MM: 5, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-php-2-working-with-mysql",
    logo: "🗄️",
    title: "PHP 2: Working with MySQL",
    desc: "Connect PHP to a MySQL database and perform CRUD operations.",
    tags: ["PHP", "MySQL", "Database"],
    thumbnail: "",
    date: { hh: 12, mm: 15, dd: 20, MM: 5, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-sql-database-queries-for-beginners",
    logo: "🗃️",
    title: "SQL: Database Queries for Beginners",
    desc: "Write your first SQL queries to retrieve, filter, and sort data from a database.",
    tags: ["SQL", "Database", "Beginner"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 23, MM: 5, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-sql-2-joins-subqueries-and-indexes",
    logo: "🔗",
    title: "SQL 2: JOINs, Subqueries, and Indexes",
    desc: "Combine tables with JOINs and optimize queries with subqueries and indexes.",
    tags: ["SQL", "JOINs", "Database"],
    thumbnail: "",
    date: { hh: 14, mm: 45, dd: 26, MM: 5, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-sql-3-database-design-and-normalization",
    logo: "🏗️",
    title: "SQL 3: Database Design and Normalization",
    desc: "Design efficient databases using normalization principles to reduce redundancy.",
    tags: ["SQL", "Design", "Normalization"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 29, MM: 5, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-ms-excel-starting-a-new-sheet",
    logo: "📗",
    title: "MS Excel: Starting a New Sheet",
    desc: "Create and set up a new Excel spreadsheet for organizing your data.",
    tags: ["Excel", "Beginner", "Spreadsheet"],
    thumbnail: "",
    date: { hh: 15, mm: 0, dd: 1, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-ms-excel-2-formulas-and-functions",
    logo: "🧮",
    title: "MS Excel 2: Formulas and Functions",
    desc: "Use essential Excel formulas and functions to automate calculations.",
    tags: ["Excel", "Formulas", "Spreadsheet"],
    thumbnail: "",
    date: { hh: 9, mm: 30, dd: 4, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-ms-excel-3-charts-and-data-visualization",
    logo: "📈",
    title: "MS Excel 3: Charts and Data Visualization",
    desc: "Create charts and graphs to visualize your data in Excel.",
    tags: ["Excel", "Charts", "Visualization"],
    thumbnail: "",
    date: { hh: 13, mm: 15, dd: 7, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-ms-excel-4-pivot-tables",
    logo: "🔄",
    title: "MS Excel 4: Pivot Tables",
    desc: "Summarize and analyze large datasets with powerful pivot tables.",
    tags: ["Excel", "Pivot Tables", "Data"],
    thumbnail: "",
    date: { hh: 16, mm: 45, dd: 10, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-ms-excel-5-advanced-functions",
    logo: "🔬",
    title: "MS Excel 5: Advanced Functions",
    desc: "Master VLOOKUP, INDEX-MATCH, and other advanced Excel functions.",
    tags: ["Excel", "VLOOKUP", "Advanced"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 13, MM: 6, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-ms-word-formatting-and-templates",
    logo: "📄",
    title: "MS Word: Formatting and Templates",
    desc: "Format documents professionally and use templates to save time in Word.",
    tags: ["Word", "Formatting", "Templates"],
    thumbnail: "",
    date: { hh: 12, mm: 30, dd: 16, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-ms-powerpoint-creating-presentations",
    logo: "📊",
    title: "MS PowerPoint: Creating Presentations",
    desc: "Design engaging slide decks with animations, layouts, and visual elements.",
    tags: ["PowerPoint", "Presentations", "Design"],
    thumbnail: "",
    date: { hh: 14, mm: 0, dd: 19, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-google-sheets-collaboration-and-basics",
    logo: "🟢",
    title: "Google Sheets: Collaboration and Basics",
    desc: "Get started with Google Sheets and collaborate in real time with others.",
    tags: ["Google Sheets", "Collaboration", "Spreadsheet"],
    thumbnail: "",
    date: { hh: 11, mm: 15, dd: 22, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-notion-organizing-your-workflow",
    logo: "📒",
    title: "Notion: Organizing Your Workflow",
    desc: "Use Notion to organize projects, notes, and tasks in one workspace.",
    tags: ["Notion", "Productivity", "Organization"],
    thumbnail: "",
    date: { hh: 15, mm: 30, dd: 25, MM: 6, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-figma-ui-ux-design-basics",
    logo: "🖌️",
    title: "Figma: UI/UX Design Basics",
    desc: "Learn the fundamentals of UI/UX design using Figma's powerful tools.",
    tags: ["Figma", "UI/UX", "Design"],
    thumbnail: "",
    date: { hh: 9, mm: 45, dd: 28, MM: 6, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-docker-containerization-for-beginners",
    logo: "🐳",
    title: "Docker: Containerization for Beginners",
    desc: "Package and run applications in isolated containers with Docker.",
    tags: ["Docker", "DevOps", "Containers"],
    thumbnail: "",
    date: { hh: 13, mm: 0, dd: 1, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-linux-essential-commands",
    logo: "🐧",
    title: "Linux: Essential Commands",
    desc: "Navigate the Linux terminal with essential commands for file and system management.",
    tags: ["Linux", "Commands", "CLI"],
    thumbnail: "",
    date: { hh: 10, mm: 15, dd: 4, MM: 7, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-linux-2-shell-scripting-basics",
    logo: "📜",
    title: "Linux 2: Shell Scripting Basics",
    desc: "Write shell scripts to automate tasks and streamline your Linux workflow.",
    tags: ["Linux", "Shell", "Scripting"],
    thumbnail: "",
    date: { hh: 16, mm: 30, dd: 7, MM: 7, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-what-is-a-computer-hardware-vs-software",
    logo: "🖥️",
    title: "What is a Computer? Hardware vs Software",
    desc: "Understand the difference between computer hardware and software components.",
    tags: ["Computer", "Hardware", "Software"],
    thumbnail: "",
    date: { hh: 12, mm: 0, dd: 10, MM: 7, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-operating-systems-how-they-work",
    logo: "⚙️",
    title: "Operating Systems: How They Work",
    desc: "Learn how operating systems manage hardware resources and run programs.",
    tags: ["OS", "Operating Systems", "Computer"],
    thumbnail: "",
    date: { hh: 14, mm: 45, dd: 13, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-computer-networks-the-basics",
    logo: "🌐",
    title: "Computer Networks: The Basics (IP, DNS, HTTP)",
    desc: "Explore fundamental networking concepts including IP addresses, DNS, and HTTP protocols.",
    tags: ["Networking", "IP", "DNS"],
    thumbnail: "",
    date: { hh: 9, mm: 30, dd: 16, MM: 7, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-computer-networks-2-osi-model-explained",
    logo: "📚",
    title: "Computer Networks 2: OSI Model Explained",
    desc: "Break down the OSI model's seven layers and understand how data travels across networks.",
    tags: ["Networking", "OSI", "Layers"],
    thumbnail: "",
    date: { hh: 11, mm: 0, dd: 19, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-data-structures-arrays-linked-lists-stacks-queues",
    logo: "🗂️",
    title: "Data Structures: Arrays, Linked Lists, Stacks, Queues",
    desc: "Understand the most fundamental data structures and when to use each one.",
    tags: ["Data Structures", "Arrays", "Linked Lists"],
    thumbnail: "",
    date: { hh: 15, mm: 15, dd: 22, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-data-structures-2-trees-and-graphs",
    logo: "🌲",
    title: "Data Structures 2: Trees and Graphs",
    desc: "Explore hierarchical and connected data structures like trees and graphs.",
    tags: ["Data Structures", "Trees", "Graphs"],
    thumbnail: "",
    date: { hh: 10, mm: 30, dd: 25, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-object-oriented-programming-the-four-pillars",
    logo: "🏛️",
    title: "Object-Oriented Programming: The Four Pillars",
    desc: "Master encapsulation, abstraction, inheritance, and polymorphism in OOP.",
    tags: ["OOP", "Concepts", "Programming"],
    thumbnail: "",
    date: { hh: 13, mm: 0, dd: 28, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-design-patterns-every-developer-should-know",
    logo: "🧩",
    title: "Design Patterns Every Developer Should Know",
    desc: "Learn essential design patterns that solve common software architecture problems.",
    tags: ["Design Patterns", "Architecture", "Programming"],
    thumbnail: "",
    date: { hh: 16, mm: 45, dd: 31, MM: 7, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-binary-and-number-systems-explained",
    logo: "🔢",
    title: "Binary and Number Systems Explained",
    desc: "Understand binary, octal, hexadecimal, and how computers represent numbers.",
    tags: ["Binary", "Number Systems", "Computer Science"],
    thumbnail: "",
    date: { hh: 9, mm: 15, dd: 3, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-boolean-logic-and-logic-gates",
    logo: "🔲",
    title: "Boolean Logic and Logic Gates",
    desc: "Learn how AND, OR, NOT gates form the foundation of digital circuits.",
    tags: ["Boolean", "Logic", "Circuits"],
    thumbnail: "",
    date: { hh: 12, mm: 30, dd: 6, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-compilers-vs-interpreters-whats-the-difference",
    logo: "⚖️",
    title: "Compilers vs Interpreters: What's the Difference",
    desc: "Compare how compilers and interpreters translate and execute code.",
    tags: ["Compilers", "Interpreters", "Concepts"],
    thumbnail: "",
    date: { hh: 14, mm: 0, dd: 9, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-cybersecurity-basics-protecting-your-data",
    logo: "🛡️",
    title: "Cybersecurity Basics: Protecting Your Data",
    desc: "Learn the essential practices to keep your data safe from cyber threats.",
    tags: ["Cybersecurity", "Security", "Beginner"],
    thumbnail: "",
    date: { hh: 10, mm: 45, dd: 12, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-passwords-and-authentication-best-practices",
    logo: "🔐",
    title: "Passwords and Authentication: Best Practices",
    desc: "Create strong passwords and enable multi-factor authentication for better security.",
    tags: ["Security", "Passwords", "2FA"],
    thumbnail: "",
    date: { hh: 16, mm: 0, dd: 15, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-network-security-firewalls-and-encryption",
    logo: "🔒",
    title: "Network Security: Firewalls and Encryption",
    desc: "Protect your network with firewalls and understand how encryption keeps data safe.",
    tags: ["Security", "Firewalls", "Encryption"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 18, MM: 8, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-common-web-vulnerabilities-xss-sql-injection",
    logo: "⚠️",
    title: "Common Web Vulnerabilities (XSS, SQL Injection)",
    desc: "Identify and understand the most common web security vulnerabilities and how to prevent them.",
    tags: ["Security", "XSS", "SQL Injection"],
    thumbnail: "",
    date: { hh: 13, mm: 15, dd: 21, MM: 8, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-ethical-hacking-an-introduction",
    logo: "🕵️",
    title: "Ethical Hacking: An Introduction",
    desc: "Discover the principles and practices of ethical hacking and penetration testing.",
    tags: ["Hacking", "Security", "Ethical"],
    thumbnail: "",
    date: { hh: 9, mm: 0, dd: 24, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-kali-linux-getting-started-with-security-tools",
    logo: "🐉",
    title: "Kali Linux: Getting Started with Security Tools",
    desc: "Set up Kali Linux and explore its powerful suite of security testing tools.",
    tags: ["Kali Linux", "Security", "Tools"],
    thumbnail: "",
    date: { hh: 15, mm: 30, dd: 27, MM: 8, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-privacy-on-the-internet-what-you-should-know",
    logo: "👁️",
    title: "Privacy on the Internet: What You Should Know",
    desc: "Understand online privacy risks and learn how to protect your personal information.",
    tags: ["Privacy", "Security", "Internet"],
    thumbnail: "",
    date: { hh: 12, mm: 0, dd: 30, MM: 8, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-how-to-write-a-lesson-plan-step-by-step",
    logo: "📋",
    title: "How to Write a Lesson Plan: Step by Step",
    desc: "Follow a structured approach to create effective lesson plans for any subject.",
    tags: ["Pedagogy", "Lesson Plan", "Teaching"],
    thumbnail: "",
    date: { hh: 10, mm: 30, dd: 2, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-classroom-management-strategies-that-work",
    logo: "🏫",
    title: "Classroom Management Strategies That Work",
    desc: "Implement proven strategies to maintain a productive and respectful learning environment.",
    tags: ["Pedagogy", "Classroom", "Management"],
    thumbnail: "",
    date: { hh: 14, mm: 15, dd: 5, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-differentiated-teaching-reaching-every-student",
    logo: "🎯",
    title: "Differentiated Teaching: Reaching Every Student",
    desc: "Adapt your teaching methods to meet the diverse needs of all learners.",
    tags: ["Pedagogy", "Differentiation", "Teaching"],
    thumbnail: "",
    date: { hh: 9, mm: 45, dd: 8, MM: 9, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-using-ict-in-education-practical-tips",
    logo: "💻",
    title: "Using ICT in Education: Practical Tips",
    desc: "Integrate technology effectively into your teaching with practical ICT strategies.",
    tags: ["ICT", "Education", "Technology"],
    thumbnail: "",
    date: { hh: 16, mm: 0, dd: 11, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-formative-assessment-tools-and-techniques",
    logo: "📝",
    title: "Formative Assessment: Tools and Techniques",
    desc: "Use formative assessments to monitor student progress and guide instruction.",
    tags: ["Assessment", "Pedagogy", "Evaluation"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 14, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-blooms-taxonomy-applied-to-computer-science",
    logo: "🧠",
    title: "Bloom's Taxonomy Applied to Computer Science",
    desc: "Apply Bloom's Taxonomy levels to design CS curricula that develop critical thinking.",
    tags: ["Bloom", "Pedagogy", "CS Education"],
    thumbnail: "",
    date: { hh: 13, mm: 0, dd: 17, MM: 9, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-teaching-programming-to-beginners-common-mistakes",
    logo: "🎓",
    title: "Teaching Programming to Beginners: Common Mistakes",
    desc: "Avoid pitfalls when teaching programming and help beginners build confidence.",
    tags: ["Teaching", "Programming", "Pedagogy"],
    thumbnail: "",
    date: { hh: 15, mm: 45, dd: 20, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-gamification-in-the-classroom",
    logo: "🎮",
    title: "Gamification in the Classroom",
    desc: "Use game elements to boost engagement and motivation in educational settings.",
    tags: ["Gamification", "Teaching", "Engagement"],
    thumbnail: "",
    date: { hh: 10, mm: 0, dd: 23, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-student-motivation-what-works-and-what-doesnt",
    logo: "💡",
    title: "Student Motivation: What Works and What Doesn't",
    desc: "Understand the science behind student motivation and apply effective strategies.",
    tags: ["Motivation", "Teaching", "Pedagogy"],
    thumbnail: "",
    date: { hh: 14, mm: 30, dd: 26, MM: 9, yyyy: 2026 },
    readTime: "7 min read"
  },
  {
    id: "blog-reflective-teaching-improving-through-self-evaluation",
    logo: "🪞",
    title: "Reflective Teaching: Improving Through Self-Evaluation",
    desc: "Develop reflective practices to continuously improve your teaching effectiveness.",
    tags: ["Reflection", "Teaching", "Growth"],
    thumbnail: "",
    date: { hh: 12, mm: 15, dd: 29, MM: 9, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-problem-solving-techniques-for-developers",
    logo: "🧩",
    title: "Problem-Solving Techniques for Developers",
    desc: "Sharpen your problem-solving skills with structured approaches and mental models.",
    tags: ["Problem Solving", "Thinking", "Development"],
    thumbnail: "",
    date: { hh: 16, mm: 0, dd: 2, MM: 10, yyyy: 2026 },
    readTime: "5 min read"
  },
  {
    id: "blog-how-to-learn-programming-effectively",
    logo: "📚",
    title: "How to Learn Programming Effectively",
    desc: "Discover proven strategies and habits to accelerate your programming learning journey.",
    tags: ["Learning", "Programming", "Tips"],
    thumbnail: "",
    date: { hh: 11, mm: 30, dd: 5, MM: 10, yyyy: 2026 },
    readTime: "7 min read"
  }
];

export default blogs;
