const projects = [
  {
    id: 1,
    title: "Gantt Graph Process Algorithm App (MonoCore)",
    desc: "A Python application for visualizing process scheduling algorithms using Gantt charts. This educational tool helps demonstrate various CPU scheduling mechanisms through interactive visualization.",
    tags: ["Python"],
    link: {
      icon: "🔓",
      link: "https://github.com/MouadALLAOUI/Gantt-Graph-Process-Algorithm-App"
    },
    overview: {
      thumbnail: "../media/projects/1/thumb.png",
      intro: "An arcane desktop tool for visualizing CPU scheduling algorithms with animated Gantt charts. Designed to teach and demonstrate process scheduling techniques like FIFO, RR, and SRTF through magical visualizations.",
      desc: "# 📜 The Gantt Grimoire — A MonoCore Tale\n\n*An arcane desktop tome for conjuring Gantt charts and mastering the art of process scheduling across cooperative and preemptive realms.*\n\n## 📖 Prologue \n\nIn the heart of the MonoCore Tower, a digital grimoire was forged — *The Gantt Grimoire*. Born from the ancient scrolls of CPU incantation, it visualizes the mystic flow of process scheduling using enchanted Gantt diagrams.\n\n> Crafted by the code sorcerer **Mouad**, this relic allows initiates and masters alike to witness the hidden dance of processes, time quanta, and context switches.\n\n## 🧱 Tome Structure\n\n ```bash\nProcessusGanttGraphs/\n    ├── __main__.py\n    ├── __init__.py\n    ├── *readme.md*\n    ├── classes/\n    │   ├── graph.py\n    │   ├── processus.py\n    │   ├── gui.py\n    │   └── __init__.py\n    ├── data/\n    │   │── set_data.py\n    │   │── get_data.py\n    │   │── testdata.py\n    │   └── __init__.py\n    ├── assets/\n    │   └── Figure_1.png\n    └── ordannacement/\n        ├── __init__.py\n        ├── cooperatif/\n        │   ├── __init__.py\n        │   ├── fifo.py\n        │   ├── srtf.py\n        │   └── round_robin.py\n        └──  premtif/\n            ├── __init__.py\n            ├── fifo.py\n            ├── srtf.py\n            └── round_robin.py \n\n```\n\n## 📘 Invocation Ritual \n\nTo unlock the tome’s powers, you must: \n\n### 📌 Requirements: \n\n- Python 3.x or later\n- The `matplotlib` incantation:\n```bash\npip install matplotlib\n``` \n\n### 🔮 To awaken the grimoire: \n\n```bash\npython __main__.py\n```\nOr simply:\n```bash\npython .\n``` \n\n## ✨ Arcane Powers \n\nHarness the magic of time manipulation: \n\n> 📜 ** Algorithmic Scrolls:** \n\n- 🔸 First In, First Out * (FIFO) *\n- 🔸 Round Robin * (RR) *\n- 🔸 Shortest Remaining Time First * (SRTF) *\n- 🔸 Cooperative Incantations\n- 🔸 Preemptive Interventions\n\n> 📦 ** Mystical Data Sources:** \n\n- 💬 Console spellcasting(manual entry) \n- 📂 CSV rune importing\n- 🧪 Random test data conjuration\n\n> 📊 ** Live Visualization Rituals:** \n\n- Gantt charts rendered in real time with `matplotlib`\n - Intuitive GUI portals for mage - level ease\n\n## 🕹️ How to Channel Its Magic \n\n1.Begin the spell: \n```bash\npython __main__.py\n```\n2.Choose your scrying method: \n - `console` — Speak the values aloud\n - `ready` — Read from a sacred CSV scroll\n - `test` — Allow the system to conjure ghost processes\n3.Speak your variables: \n - Arrival incantations\n - CPU burst lengths\n - Priority glyphs(if applicable) \n4.Select the scheduling incantation you wish to summon.\n5.Behold the visualization — a living diagram etched by time and computation.\n\n## 🧑‍🔧 Contributions From Fellow Mages \n\nTo leave your mark upon this tome: \n\n1.Fork the repository via the magic mirror(GitHub) \n2.Forge your branch: \n```bash\ngit checkout -b AmazingFeature\n```\n3.Etch your changes: \n```bash\ngit commit -m 'Add some AmazingFeature'\n```\n4.Send your spell upstream: \n```bash\ngit push origin AmazingFeature\n```\n5.Open a summoning gate(Pull Request) \n\n## 📜 Scroll of Binding \n\nLicensed under the MIT Enchantment.See[LICENSE](https://github.com/MouadALLAOUI/Gantt-Graph-Process-Algorithm-App/blob/master/LICENSE) for the unbreakable seal.\n\n## 📅 The Tome’s Evolution \n\nTrack the grimoire’s growth in the *** [CHANGELOG.md](https://github.com/MouadALLAOUI/Gantt-Graph-Process-Algorithm-App/blob/master/CHANGELOG.md) ***.\n\n## 🔮 Acknowledgments from the Arcane Circle \n\nThe creation of this magical artifact was guided by: \n - The eternal flames of [Python](https://www.python.org/)\n- The scrolls of [W3Schools](https://www.w3schools.com/python/)\n- The digital familiars:\n  - [OpenAI](https://openai.com)\n  - [Blackbox AI](https://www.blackbox.ai)\n  - [Anthropic Claude](https://www.anthropic.com)\n",
      imgs: [
        { src: "../media/projects/1/gui.png", alt: "", isBlur: false },
        { src: "../media/projects/1/Figure_1.png", alt: "", isBlur: false },
      ],
      features: [
        "First In, First Out (FIFO)",
        "Round Robin (RR)",
        "Shortest Remaining Time First (SRTF)",
        "Cooperative Incantations",
        "Preemptive Interventions",
        "Console spellcasting (manual entry)",
        "CSV rune importing",
        "Random test data conjuration",
        "Live Visualization Rituals",
      ],
      startdate: "26 Dec 2024",
      enddate: "29 Dec 2024",
      status: "complete", // or "complete" | "in progress" | "abondonned" | unkonwn
      link: [
        // { icon: "🔓", label: "Live Demo", href: "#", isDisabled: true },
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Gantt-Graph-Process-Algorithm-App", isDisabled: false }
      ],
    }
  },
  {
    id: 2,
    title: "Book Bot",
    desc: "<strong>Book Bot</strong> - A Python program that analyzes novels and prints a detailed statistical report of word and letter usage.",
    tags: ["Python"],
    link: {
      icon: "🔓",
      link: "https://github.com/MouadALLAOUI/bootdev_bookbot"
    },
    overview: {
      thumbnail: "../media/projects/2/thumb.png",
      intro: "<strong>Book Bot</strong> - is a simple yet educational Python app that reads `.txt` books and generates a text-based report showing how many words and letters are used, along with how often each letter appears. <br />Originally inspired by lessons from <a href='https://www.boot.dev/'>Boot.dev</a>, it’s a foundational project that helped me practice file handling, loops, and sorting in Python.",
      desc: "## 📖 Introduction\n\n**Boot.dev BookBot** is a simple Python app that analyzes a `.txt` file — counting both the number of **words** and how many times each **letter** appears.\n\nIt’s a small but powerful project to practice Python fundamentals like:\n\n- File handling\n- Loops and conditionals\n- Dictionaries and lists\n- Sorting and reporting\n\n## ⚔️ Prologue\n\nWhen I started learning **Python**, I discovered an amazing platform called [**Boot.dev**](https://www.boot.dev/).\n\nThis app was one of my first learning projects from that course — so it holds a special place in my coding journey.\n\n## 🏗️ Project Structure\n\n```bash\nbootdev_bookbot/\n├── main.py\n├── README.md\n└── books/\n    └── frankenstein.txt\n```\n\n## ⚙️ Installation & Usage\n\n### 🧩 Requirements\n\n- Python (any recent version)\n\n### 💾 Installation\n\n  1. **Clone the repository**\n\n```bash\ngit clone https://github.com/MouadALLAOUI/bootdev_bookbot.git  \n\n```\n\n  2. **Open the directory**\n\n```bash\ncd bootdev_bookbot\n\n```\n\n### 🚀 Run the app\n\n```bash\npython main.py\n\n```\n\n## Change the Input File\n\nTo analyze a different file, open `main.py` and update **line 2** of the function:\n\n```python\ndef file_export():\n    with open('books/ frankenstein.txt') as f:\n```\n\nYou can replace `'books / frankenstein.txt'` with the path to your own text file.\n\n## ✨ Features\n\n- 📘 Count total words in a text file\n- 🔤 Count total letters used\n- 🧮 Count frequency of each individual letter\n\n## 🧭 Future Plans\n\n- [ ] Add a GUI interface\n- [ ] Support more file types (`.docx`, `.pdf`, `.md`, etc.)\n- [ ] Add import options (e.g., choose from more books)\n- [ ] Add export options (e.g., to `.csv` or `.json`)\n- [ ] Improve reporting visuals\n\n## 🤝 Contributing\n\nTo leave your mark upon this tome: \n\n1.Fork the repository via the magic mirror(GitHub) \n2.Forge your branch: \n```bash\ngit checkout -b AmazingFeature\n```\n3.Etch your changes: \n```bash\ngit commit -m 'Add some AmazingFeature'\n```\n4.Send your spell upstream: \n```bash\ngit push origin AmazingFeature\n```\n5.Open a summoning gate(Pull Request) \n\n## 💡 Acknowledgments\n\nSpecial thanks to:\n\n- [**Boot.dev**](https://www.boot.dev/) for the inspiration and learning materials.",
      imgs: [
        { src: "../media/projects/2/img 1.png", alt: "Screenshot – Report Example", isBlur: false },
        { src: "../media/projects/2/code.png", alt: "Screenshot – Code View", isBlur: false },
        { src: "../media/projects/2/structure.png", alt: "Screenshot – Folder Structure", isBlur: false },
      ],
      features: [
        "📘 Count total words in a text file",
        "🔤 Count total letters used",
        "🧮 Count frequency of each individual letter",
      ],
      startdate: "08 Jan 2025",
      enddate: "08 Jan 2025",
      status: "Complete", // or "complete" | "in progress" | "abondonned" | unknown
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/bootdev_bookbot", isDisabled: false }
      ],
    }
  },
  {
    id: 3,
    title: "AMZ AUTOMOBILE Front",
    desc: "<strong>AMZ AUTOMOBILE</strong>  is a desktop web application built to help manage mechanical tasks efficiently.",
    tags: ["JavaScript", "React", "Electron"],
    link: {
      icon: "🔓",
      link: "https://github.com/MouadALLAOUI/Amz-automobile-front"
    },
    overview: {
      thumbnail: "../media/projects/3/thumb.png",
      intro: "<strong>AMZ AUTOMOBILE</strong>  is a desktop web application built to help manage mechanical tasks efficiently. <br /> It allows users to track tasks such as <strong>oil changes</strong>, record <strong>who performed them</strong>, <strong>when</strong>, and for <strong>which vehicle (plate number)</strong>.<br /><blockquote>This system simplifies workshop management and ensures maintenance history is transparent and organized.</blockquote>",
      desc: "AMZ AUTOMOBILE Front is designed to simplify mechanical workshop management. It enables users to log, monitor, and visualize repair operations using a modern interface powered by React and Electron.\n\n## 📜 Prologue\n\nAfter my brother — who works as a mechanic — asked for a better way to organize his work,\n\nI started developing **AMZ AUTOMOBILE** to assist him and other mechanics in managing daily tasks more effectively.\n\n## 🏗️ Project Structure 🚗\n\n```bash\nAmz-automobile-front/\n├── public/\n│    ├── favicon.ico\n│    ├── index.html\n│    ├── manifest.json\n│    └── robots.txt\n├── src/\n│    ├── component/         # All reusable components\n│    ├── env/\n│    │    ├── strings/      # Multilingual support (FR/EN)\n│    │    ├── environnement.jsx\n│    │    └── routers.jsx\n│    ├── media/             # Images and icons\n│    ├── store/\n│    │    ├── store.js\n│    │    └── userSlice.js\n│    ├── styling/           # SCSS, fonts, and style assets\n│    ├── views/\n│    │    ├── content/      # Main client UI\n│    │    ├── Login/        # Login screen\n│    │    ├── notfound.jsx\n│    │    └── Templates.js\n│    └── index.js\n├── .editorconfig\n├── .eslintrc.json\n├── .gitbranch\n├── .gitignore\n├── main.js\n├── package-lock.json\n├── package.json\n├── preload.js\n├── README.md\n└── yarn.lock\n```\n\n## ⚙️ Installation & Usage 🚗\n\n### 📦 Requirements\n\n- `React` v18.3.1+\n- `Node.js`\n- `npm` (or `yarn`)\n\n### 🚀 Installation\n\n1. Clone the repository:\n\n```bash\ngit clone https://github.com/MouadALLAOUI/Amz-automobile-front\n\n```\n\n2. Navigate into the project directory:\n\n```bash\ncd Amz-automobile-front\n\n```\n\n3. Install dependencies:\n\n```bash\nnpm install\n\n```\n\n> ✅ Ensure there are no installation errors and that a `node_modules` folder is created in the root directory.\n\n### ▶️ Run the Application\n\nRun the following commands in **two separate terminals**:\n\n```bash\nnpm start\n\n```\n\n```bash\nnpm run electron\n\n```\n\nThis will start the React frontend and the Electron desktop shell.\n\n## 🧩 Future Plans\n\n- [ ] Fix bugs and optimize performance\n- [ ] Add user roles and permissions\n- [ ] Create admin dashboard\n- [ ] Deploy online\n- [ ] Enable offline functionality\n- [ ] Add more features based on client needs\n\n## 🤝 Contributing\n\nTo leave your mark upon this tome: \n\n1.Fork the repository via the magic mirror(GitHub) \n2.Forge your branch: \n\n```bash\ngit checkout -b AmazingFeature\n\n```\n\n3.Etch your changes: \n\n```bash\ngit commit -m 'Add some AmazingFeature'\n\n```\n\n4.Send your spell upstream: \n```bash\ngit push origin AmazingFeature\n```\n5.Open a summoning gate(Pull Request)\n\n## 💡 Acknowledgments 🚗\n\nSpecial thanks to:\n\n- [Stack Overflow](https://stackoverflow.com) — for debugging and problem-solving\n- [ChatGPT](https://chat.openai.com) — for guidance and development support",
      imgs: [
        {
          src: "../media/projects/3/login.png",
          alt: "Screenshot – login",
          isBlur: false
        },
        {
          src: "../media/projects/3/addTask.png",
          alt: "Screenshot – Add Task",
          isBlur: false
        },
        {
          src: "../media/projects/3/editTask.png",
          alt: "Screenshot – Edit Task",
          isBlur: false
        },
        {
          src: "../media/projects/3/pdfGeneration.png",
          alt: "Screenshot – PDF Generation",
          isBlur: false
        },
        {
          src: "../media/projects/3/setting.png",
          alt: "Screenshot – Settings",
          isBlur: false
        },
        {
          src: "../media/projects/3/about.png",
          alt: "Screenshot – About",
          isBlur: false
        },
      ],
      features: [
        "Electron-based desktop application",
        "React for frontend development",
        "Task management and tracking features",
        "Automobile repair tracking system",
        "Support for multiple vehicle types",
        "User-friendly interface with data visualization",
        "✅ CRUD operations for tasks",
        "👥 User management",
        "📊 Graph visualization",
        "📋 Dynamic table generation",
        "🧾 Export tasks to PDF"
      ],
      startdate: "06 Jun 2024",
      enddate: "Ongoing",
      status: "in progress",
      link: [
        {
          icon: "📦",
          label: "GitHub",
          href: "https://github.com/MouadALLAOUI/Amz-automobile-front",
          isDisabled: false
        }
      ]
    }
  },
  {
    id: 9,
    title: "LaraCRUD",
    desc: "A very beginner-friendly Laravel CRUD project that using controller, model, and view to create a simple CRUD application. mergerd with vite js",
    tags: ["PHP", "Laravel", "CRUD", "CSS", "vite js"],
    link: {
      icon: "🔓",
      link: "https://github.com/MouadALLAOUI/LaraCRUD"
    },
    overview: {
      thumbnail: "../media/projects/9/thumb.png",
      intro: "Laravel CRUD Project for very beginners that starting to learn laravel and want to make a simple CRUD application.",
      desc: "# LaraCRUD\n\nA very beginner-friendly Laravel CRUD project that using controller, model, and view to create a simple CRUD application. It is designed for beginners who want to learn Laravel and make a simple CRUD application.\n\n## Features\n- Simple, fast routing engine.\n- Powerful dependency injection container.\n- Multiple back-ends for session and cache storage.\n- Expressive, intuitive database ORM.\n- Database agnostic schema migrations.\n- Robust background job processing.\n- Real-time event broadcasting.",
      imgs: [
        { src: "../media/projects/9/1.png", alt: "", isBlur: false },
        { src: "../media/projects/9/2.png", alt: "", isBlur: false },
        { src: "../media/projects/9/3.png", alt: "", isBlur: false },
        { src: "../media/projects/9/4.png", alt: "", isBlur: false },
        { src: "../media/projects/9/5.png", alt: "", isBlur: false },
        { src: "../media/projects/9/6.png", alt: "", isBlur: false },
      ],
      features: [
        "CRUD operations",
        "Database migration",
        "Frontend and backend integration",
        "User-friendly interface",
        "Responsive design",
        "learning resource for beginners",
      ],
      startdate: "19 Mar 2023",
      enddate: "20 Mar 2023",
      status: "abandoned", // or "complete" | "in progress" | "abandoned" | unknown
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/LaraCRUD", isDisabled: false }
      ],
    }
  },
  {
    id: 10,
    title: "ecommerce",
    desc: "a simple project about an e-shop website using react js to simulate an e-commerce platform. It is a basic project that includes product listing, cart management, and checkout functionalities.",
    tags: ["JavaScript", "React js", "Web"],
    link: {
      icon: "🔓",
      link: "https://github.com/MouadALLAOUI/ecommerce"
    },
    overview: {
      thumbnail: "../media/main_menu.png",
      intro: "a learning project about an e-shop website using react js to simulate an e-commerce platform. It is a basic project that includes product listing, cart management, and checkout functionalities.",
      desc: "# ecommerce\n\na simple project about an e-shop website using react js to simulate an e-commerce platform. It is a basic project that includes product listing, cart management, and checkout functionalities.\n\n## Features\n- Product listing and details\n- Cart management\n- Checkout process\n- Responsive design\n- User-friendly interface",
      imgs: [],
      features: [
        "Product listing and details",
        "Cart management",
        "Checkout process",
        "Responsive design",
        "User-friendly interface",
        "Learning resource for beginners",
        "React js for frontend development",
        "Basic e-commerce functionalities"
      ],
      startdate: "15 Nov 2022",
      enddate: "15 Nov 2022",
      status: "abandoned", // or "complete" | "in progress" | "abandoned" | unknown
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/ecommerce", isDisabled: false }
      ],
    }
  },
  // TODO: not yet
  // {
  //   id: 4,
  //   title: "Amz-automobile-back",
  //   desc: "This is the backend for the Amz-automobile project, built with Laravel 11.",
  //   tags: ["PHP", "Laravel"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/Amz-automobile-front"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "this is the backend for the Amz-automobile project. It is built with Laravel 11.",
  //     desc: "# Amz-automobile-back\n\nthis backend is built with Laravel 11. It provides APIs for the Amz-automobile project, which is a task management system for automobile mechanics and repairs.",
  //     imgs: [],
  //     features: [
  //       "Database migration and seeding",
  //       "Vehicle data import command",
  //       "API endpoints for vehicle management",
  //       "User authentication and authorization",
  //       "Task management features",
  //       "Vehicle repair tracking",
  //       "Multiple vehicle makes and models support"
  //     ],
  //     startdate: "06 jun 2024",
  //     enddate: "ongoing",
  //     status: "in progress", // or "complete" | "in progress" | "abondonned" | unknown
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Amz-automobile-back", isDisabled: false }
  //     ],
  //   }
  // },
  // {
  //   id: 5,
  //   title: "tachiyomi-ar-ext",
  //   desc: "This repository provides Arabic extensions that have been removed from Tachiyomi.",
  //   tags: ["Apk", "Extensions", "Mobile"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/tachiyomi-ar-ext"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "Tachiyomi Arabic Extensions",
  //     desc: "This repository provides Arabic extensions that have been removed from Tachiyomi.",
  //     imgs: [],
  //     features: [
  //       "Update Tachiyomi to the latest version.",
  //       "Add the extension repository URL: https://raw.githubusercontent.com/MouadALLAOUI/tachiyomi-ar-ext/main/index.min.json",
  //       "Refresh extension management screen and download removed extensions.",
  //       "Approve installed extensions by tapping on the 'Trust' button."
  //     ],
  //     startdate: "20 Mar 2024",
  //     enddate: "17 Jul 2024",
  //     status: "abandoned", // or "complete" | "in progress" | "abandoned" | unknown
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/tachiyomi-ar-ext", isDisabled: false }
  //     ],
  //   }
  // },
  // {
  //   id: 6,
  //   title: "Pharma-efm-back",
  //   desc: "this my SFP (study final project) backend of my diploma project. It is a Laravel backend for a pharmacy stock management application. It leverages Laravel's features for routing, dependency injection, database ORM, schema migrations, job processing, and event broadcasting.",
  //   tags: ["PHP", "Laravel"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/Pharma-efm-back"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "this my SFP (study final project) backend of my diploma project. It is a Laravel backend for a pharmacy stock management application. It leverages Laravel's features for routing, dependency injection, database ORM, schema migrations, job processing, and event broadcasting.",
  //     desc: "# Pharma-efm-back\n\na project made by group of students for our SFP (study final project) in the university. It is a Laravel backend for a pharmacy stock management application. It leverages Laravel's features for routing, dependency injection, database ORM, schema migrations, job processing, and event broadcasting.\n\n## team members\n- Mouad ALLAOUI\n- Aboudamir Farouk\n\n## Features\n- Simple, fast routing engine.\n- Powerful dependency injection container.\n- Multiple back-ends for session and cache storage.\n- Expressive, intuitive database ORM.\n- Database agnostic schema migrations.\n- Robust background job processing.\n- Real-time event broadcasting.",
  //     imgs: [],
  //     features: [
  //       "Simple, fast routing engine.",
  //       "Powerful dependency injection container.",
  //       "Multiple back-ends for session and cache storage.",
  //       "Expressive, intuitive database ORM.",
  //       "Database agnostic schema migrations.",
  //       "Robust background job processing.",
  //       "Real-time event broadcasting."
  //     ],
  //     startdate: "01 Feb 2024",
  //     enddate: "20 May 2024",
  //     status: "complete", // or "complete" | "in progress" | "abandoned" | unknown
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Pharma-efm-back", isDisabled: false }
  //     ],
  //   }
  // },
  // {
  //   id: 7,
  //   title: "Pharma-efm-front",
  //   desc: "this my SFP (study final project) frontend of my diploma project. It is a React frontend for a pharmacy stock management application.",
  //   tags: ["JavaScript", "React"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/Pharma-efm-front"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "this my SFP (study final project) frontend of my diploma project. It is a React frontend for a pharmacy stock management application.",
  //     desc: "# Pharma-efm-front\n\na project made by group of students for our SFP (study final project) in the university. It is a React frontend for a pharmacy stock management application.\n\n## team members\n- Mouad ALLAOUI\n- Aboudamir Farouk\n\n## Features\n- Simple, fast routing engine.\n- Powerful dependency injection container.\n- Multiple back-ends for session and cache storage.\n- Expressive, intuitive database ORM.\n- Database agnostic schema migrations.\n- Robust background job processing.\n- Real-time event broadcasting.",
  //     imgs: [],
  //     features: [
  //       "Simple, fast routing engine.",
  //       "Powerful dependency injection container.",
  //       "Multiple back-ends for session and cache storage.",
  //       "Expressive, intuitive database ORM.",
  //       "Database agnostic schema migrations.",
  //       "Robust background job processing.",
  //       "Real-time event broadcasting."
  //     ],
  //     startdate: "01 Feb 2024",
  //     enddate: "20 May 2024",
  //     status: "complete", // or "complete" | "in progress" | "abandoned" | unknown
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Pharma-efm-front", isDisabled: false }
  //     ],
  //   }
  // },
  // {
  //   id: 8,
  //   title: "Arkani-app",
  //   desc: "I made this app to help other muslim to fully follow the right path. It is a React Native project.",
  //   tags: ["JavaScript", "React Native", "Mobile App"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/Arkani-app"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "i start mading this app after i encouter a problem of finding an app that gather all the islamic information in one place. So i made this app to help other muslim to fully follow the right path. It is a React Native project bootstrapped using `@react-native-community/cli`.",
  //     desc: "# Arkani-app\n\na project made by me for my personal use. It is a React Native project that aims to gather all the islamic information in one place.\n\n## Features\n- Simple, fast routing engine.\n- Powerful dependency injection container.\n- Multiple back-ends for session and cache storage.\n- Expressive, intuitive database ORM.\n- Database agnostic schema migrations.\n- Robust background job processing.\n- Real-time event broadcasting.",
  //     imgs: [],
  //     features: [
  //       "Quran reading and memorization",
  //       "Prayer times and notifications",
  //       "Islamic calendar and events",
  //       "Dua and Azkar collection",
  //     ],
  //     startdate: "09 Apr 2024",
  //     enddate: "ongoing",
  //     status: "stopped", // or "complete" | "in progress" | "abandoned" | unknown | "stopped"
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Arkani-app", isDisabled: false }
  //     ],
  //   }
  // },
  // {
  //   id: 11,
  //   title: "ChatWeb",
  //   desc: "an attempt to create a thread-based social media platform similar to Facebook, built with PHP and MySQL. It allows users to create accounts, post messages, and interact with others.",
  //   tags: ["PHP", "Web", "Social Media"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/ChatWeb"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "an attempt to create a thread-based social media platform similar to Facebook, built with PHP and MySQL. It allows users to create accounts, post messages, and interact with others.",
  //     desc: "# ChatWeb\n\nan attempt to create a thread-based social media platform similar to Facebook, built with PHP and MySQL. It allows users to create accounts, post messages, and interact with others.",
  //     imgs: [],
  //     features: [
  //       "Post creation and management",
  //       "Threaded comments",
  //       "Responsive design",
  //       "User-friendly interface",
  //       "Learning resource for beginners",
  //     ],
  //     startdate: "02 Jul 2022",
  //     enddate: "04 Jul 2022",
  //     status: "stopped", // or "complete" | "in progress" | "abandoned" | unknown
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/ChatWeb", isDisabled: false }
  //     ],
  //   }
  // },
  // {
  //   id: 12,
  //   title: "burp-payloads",
  //   desc: "A collection of Burp Suite payloads, forked from antichown/burp-payloads.",
  //   tags: ["Security", "Burp Suite", "Payloads"],
  //   link: {
  //     icon: "🔓",
  //     link: "https://github.com/MouadALLAOUI/burp-payloads"
  //   },
  //   overview: {
  //     thumbnail: "",
  //     intro: "A collection of Burp Suite payloads, useful for security testing and penetration testing.",
  //     desc: "# burp-payloads\n\nA collection of Burp Suite payloads, forked from antichown/burp-payloads. This repository contains various payloads that can be used with Burp Suite for security testing and penetration testing.\n\n## Features\n- Collection of Burp Suite payloads\n- Useful for security testing and penetration testing\n- Forked from antichown/burp-payloads",
  //     imgs: [],
  //     features: [
  //       "Collection of Burp Suite payloads",
  //       "Useful for security testing and penetration testing",
  //       "Forked from antichown/burp-payloads",
  //       "Payloads for various types of attacks",
  //       "Easy to use with Burp Suite",
  //       "Regularly updated with new payloads"
  //     ],
  //     startdate: "",
  //     enddate: "",
  //     status: "unknown",
  //     link: [
  //       { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/burp-payloads", isDisabled: false }
  //     ],
  //   }
  // }
];

export default projects;

