import { getAssetById } from './mediaManager.js';
import { loadMarkdownAsset } from '../lib/utils/assetUtils.js';

export const projects = [
  {
    id: "project-gantt-graph-process",
    overview: {
      thumbnail: getAssetById('projects-1-thumb').path,
      intro: "An arcane desktop tool for visualizing CPU scheduling algorithms with animated Gantt charts. Designed to teach and demonstrate process scheduling techniques like FIFO, RR, and SRTF through magical visualizations.",
      desc: loadMarkdownAsset("project-gantt-graph-process"),
      imgs: [
        { src: getAssetById('projects-1-gui').path, alt: "", isBlur: false },
        { src: getAssetById('projects-1-figure-1').path, alt: "", isBlur: false },
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
      status: "complete",
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Gantt-Graph-Process-Algorithm-App", isDisabled: false }
      ],
    }
  },
  {
    id: "project-book-bot",
    overview: {
      thumbnail: getAssetById('projects-2-thumb').path,
      intro: "<strong>Book Bot</strong> - is a simple yet educational Python app that reads `.txt` books and generates a text-based report showing how many words and letters are used, along with how often each letter appears. <br />Originally inspired by lessons from <a href='https://www.boot.dev/'>Boot.dev</a>, it's a foundational project that helped me practice file handling, loops, and sorting in Python.",
      desc: loadMarkdownAsset("project-book-bot"),
      imgs: [
        { src: getAssetById('projects-2-img-1').path, alt: "Screenshot – Report Example", isBlur: false },
        { src: getAssetById('projects-2-code').path, alt: "Screenshot – Code View", isBlur: false },
        { src: getAssetById('projects-2-structure').path, alt: "Screenshot – Folder Structure", isBlur: false },
      ],
      features: [
        "📘 Count total words in a text file",
        "🔤 Count total letters used",
        "🧮 Count frequency of each individual letter",
      ],
      startdate: "08 Jan 2025",
      enddate: "08 Jan 2025",
      status: "Complete",
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/bootdev_bookbot", isDisabled: false }
      ],
    }
  },
  {
    id: "project-amz-automobile-front",
    overview: {
      thumbnail: getAssetById('projects-3-thumb').path,
      intro: "<strong>AMZ AUTOMOBILE</strong>  is a desktop web application built to help manage mechanical tasks efficiently. <br /> It allows users to track tasks such as <strong>oil changes</strong>, record <strong>who performed them</strong>, <strong>when</strong>, and for <strong>which vehicle (plate number)</strong>.<br /><blockquote>This system simplifies workshop management and ensures maintenance history is transparent and organized.</blockquote>",
      desc: loadMarkdownAsset("project-amz-automobile-front"),
      imgs: [
        { src: getAssetById('projects-3-login').path, alt: "Screenshot – login", isBlur: false },
        { src: getAssetById('projects-3-addtask').path, alt: "Screenshot – Add Task", isBlur: false },
        { src: getAssetById('projects-3-edittask').path, alt: "Screenshot – Edit Task", isBlur: false },
        { src: getAssetById('projects-3-pdfgeneration').path, alt: "Screenshot – PDF Generation", isBlur: false },
        { src: getAssetById('projects-3-setting').path, alt: "Screenshot – Settings", isBlur: false },
        { src: getAssetById('projects-3-about').path, alt: "Screenshot – About", isBlur: false },
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
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/Amz-automobile-front", isDisabled: false }
      ]
    }
  },
  {
    id: "project-lara-crud-vite",
    overview: {
      thumbnail: getAssetById('projects-9-thumb').path,
      intro: "Laravel CRUD Project for very beginners that starting to learn laravel and want to make a simple CRUD application.",
      desc: loadMarkdownAsset("project-lara-crud-vite"),
      imgs: [
        { src: getAssetById('projects-9-1').path, alt: "", isBlur: false },
        { src: getAssetById('projects-9-2').path, alt: "", isBlur: false },
        { src: getAssetById('projects-9-3').path, alt: "", isBlur: false },
        { src: getAssetById('projects-9-4').path, alt: "", isBlur: false },
        { src: getAssetById('projects-9-5').path, alt: "", isBlur: false },
        { src: getAssetById('projects-9-6').path, alt: "", isBlur: false },
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
      status: "abandoned",
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/LaraCRUD", isDisabled: false }
      ],
    }
  },
  {
    id: "project-ecommerce-shop-react",
    overview: {
      thumbnail: getAssetById('main-menu').path,
      intro: "a learning project about an e-shop website using react js to simulate an e-commerce platform. It is a basic project that includes product listing, cart management, and checkout functionalities.",
      desc: loadMarkdownAsset("project-ecommerce-shop-react"),
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
      status: "abandoned",
      link: [
        { icon: "📦", label: "GitHub", href: "https://github.com/MouadALLAOUI/ecommerce", isDisabled: false }
      ],
    }
  }
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Quests' },
  { id: 'app', label: 'Applications' },
  { id: 'web', label: 'Web' },
  { id: 'tool', label: 'Tools' },
  { id: 'game', label: 'Games' },
];
