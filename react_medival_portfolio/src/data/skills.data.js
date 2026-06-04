import { getAssetById } from './mediaManager.js';
import { loadMarkdownAsset } from '../lib/utils/assetUtils.js';

export const skills = [
  {
    id: "skill-frontend-sorcery",
    overview: {
      thumbnail: getAssetById('skills-1-thumb').path,
      intro: "<strong>Frontend Sorcery</strong> is the noble art of turning raw elements—<code>HTML</code>, <code>CSS</code>, and <code>JavaScript</code>—into living, breathing pages. With this magic, I forge <code>responsive designs</code>, <code>interactive runes</code>, and smooth pathways for every traveler who visits.",
      desc: loadMarkdownAsset("skill-frontend-sorcery"),
      features: [
        "Responsive Layouts",
        "Cross-Browser Shielding",
        "Speed & Performance Buffs",
        "Accessibility Enchantments",
        "Git for Spell Versioning"
      ],
      imgs: [
        { src: getAssetById('skills-1-figma-arkani').path, alt: "figma arkani app", isBlured: false, isMobile: false },
        { src: getAssetById('skills-1-figma-stockmanagement').path, alt: "figma gestion de stock", isBlured: false, isMobile: false },
        { src: getAssetById('skills-1-figma-pharma').path, alt: "figma pharma", isBlured: false, isMobile: false },
        { src: getAssetById('skills-1-canva-gdd').path, alt: "canva GDD", isBlured: false, isMobile: false },
        { src: getAssetById('skills-1-vs-style').path, alt: "vs style", isBlured: false, isMobile: false }
      ],
      startdate: "2020-01-01",
      storyBehindIt: "My path into frontend sorcery began when I first wondered how scrolls (webpages) came to life. I began with simple `HTML`, then studied `CSS` to bring form and `JavaScript` to add movement. Over time, through many quests and trials, I learned to craft real experiences that users enjoy.\n\nEach project sharpened my skills, and now, I continue this journey—seeking to master deeper magic and forge even stronger interfaces.",
    },
  },
  {
    id: "skill-backend-alchemy",
    overview: {
      thumbnail: getAssetById('skills-2-thumb').path,
      intro: "<strong>Backend alchemy</strong> is the sacred art of turning logic and data into real-world applications. Using tools like Node.js, Python, and SQL, backend alchemists build server-side magic, manage spellbooks (databases), and keep the realm running smoothly.",
      desc: loadMarkdownAsset("skill-backend-alchemy"),
      features: [
        "RESTful API Development",
        "Database Management (SQL, NoSQL)",
        "Authentication and Authorization",
        "Server-Side Logic Implementation",
        "Performance Tuning and Optimization"
      ],
      imgs: [
        { src: getAssetById('skills-2-postman').path, alt: "postman", isBlured: false, isMobile: false },
        { src: getAssetById('skills-2-postman-methode').path, alt: "postman methode", isBlured: false, isMobile: true },
        { src: getAssetById('skills-2-wamp-launch').path, alt: "wamp launch", isBlured: false, isMobile: false },
        { src: getAssetById('skills-2-wamp-menu').path, alt: "wamp menu", isBlured: false, isMobile: false },
        { src: getAssetById('skills-2-phpmyadmin-shema').path, alt: "phpmyadmin shema", isBlured: false, isMobile: false },
        { src: getAssetById('skills-2-phpmyadmin-structure').path, alt: "phpmyadmin structure", isBlured: false, isMobile: false }
      ],
      startdate: "2021-01-01",
      storyBehindIt: "After many adventures in frontend lands, I realized something was missing—my websites had form, but no soul. I needed more than just beauty; I needed function.\nThat's when I discovered backend alchemy. My first steps were simple: storing data in `JSON` using JavaScript. It wasn't elegant, but it worked for small quests.\nAs my projects grew in size and complexity, I sought deeper magic. I began to learn how to summon servers, craft powerful APIs, and master databases. Now, I walk both paths—frontend and backend—capable of building full systems from the ground up.",
    },
  },
  {
    id: "skill-security-wards",
    overview: {
      thumbnail: getAssetById('skills-3-thumb').path,
      intro: "<strong>Security</strong> is the art of shielding systems from the dark forces of cyberspace. With this skill, I deploy firewalls, encryption, and secure protocols to protect users, data, and digital strongholds.<br /><br /> <strong>Security Wards</strong> focuses on forging and maintaining defenses against both common and advanced threats. From encryption and firewalls to OWASP defenses and secure authentication, these techniques help keep the realm safe from intruders.",
      desc: loadMarkdownAsset("skill-security-wards"),
      features: [
        "Encryption Techniques (PGP, SSL/TLS)",
        "Authentication & Authorization Shields",
        "Firewall and VPN Configurations",
        "Threat Detection and Incident Response"
      ],
      imgs: [
        { src: getAssetById('skills-3-burp').path, alt: "burp", isBlured: false, isMobile: false },
        { src: getAssetById('skills-3-burp2').path, alt: "burp2", isBlured: false, isMobile: false },
        { src: getAssetById('skills-3-kleopatra').path, alt: "kleopatra", isBlured: false, isMobile: false },
        { src: getAssetById('skills-3-wireshark').path, alt: "wireshark", isBlured: false, isMobile: false },
        { src: getAssetById('skills-3-zenmap').path, alt: "zenmap", isBlured: false, isMobile: false },
      ],
      startdate: "01-11-2024",
      storyBehindIt: "This skill didn't appear clearly at first. In my early days of frontend and backend development, I followed some protective practices without knowing their true nature.\n\nOver time, I began to notice a pattern—secure code, cautious logic, clean structure. Then came a turning point: studying `Systeme informatique et réseaux` `computer systems and networks`, where I met allies who shared a deep interest in cybersecurity.\n\nTogether, we explored new lands of knowledge—penetration testing, network defense, and encryption. Thanks to those companions, I began to truly understand and develop this craft."
    }
  },
  {
    id: "skill-ai-conjuring",
    overview: {
      thumbnail: getAssetById('skills-4-thumb').path,
      intro: "<strong>AI Conjuring</strong>is the craft of communicating with intelligent entities through carefully forged prompts and guided interaction.<br />With words as my spells, I awaken machines to assist, advise, and create.",
      desc: loadMarkdownAsset("skill-ai-conjuring"),
      features: [
        "Prompt Engineering",
        "Refining AI Outputs",
        "Context Management",
        "Instruction-based Prompting",
        "Creative Prompt Design",
        "Prompt Chaining & Iteration"
      ],
      imgs: [
        { src: getAssetById('skills-4-chatgpt').path, alt: "chatgpt", isBlured: false, isMobile: false },
        { src: getAssetById('skills-4-deepseek').path, alt: "deepseek", isBlured: false, isMobile: false },
        { src: getAssetById('skills-4-manus').path, alt: "manus", isBlured: false, isMobile: false },
        { src: getAssetById('skills-4-qwen').path, alt: "qwen", isBlured: false, isMobile: false },
        { src: getAssetById('skills-4-venice-ai').path, alt: "venice", isBlured: false, isMobile: false },
      ],
      startdate: "2023-01-01",
      storyBehindIt: "I didn't go looking for this skill—**AI came to me** as part of the world's transformation.\n\nAs machines began thinking, creating, and deciding, I realized I had two choices: ignore it and fall behind, or learn to **wield it with purpose**. But I also saw the danger—people relying on it blindly, losing the will to grow on their own.\n\nSo I made a decision:\n\n***Adapt, but never depend.***\n\nI trained hard, learned deeply, and built my own discipline. Now, I use AI as a tool—not a crutch.\n\nWhen a task isn't urgent, I push myself to do it as if **AI didn't exist**. That's how I sharpen my own mind, while still commanding the full power of AI when needed."
    }
  },
  {
    id: "skill-mobile-enchantments",
    overview: {
      thumbnail: getAssetById('skills-5-thumb').path,
      intro: "<strong>Mobile Enchantments</strong> involve casting cross-platform spells to build interactive mobile apps.<br />Creating responsive and engaging mobile applications with React Native and Flutter.",
      desc: loadMarkdownAsset("skill-mobile-enchantments"),
      features: [
        "Cross-Platform Development",
        "Responsive Layouts",
        "Navigation & State Management",
        "Native Module Integration",
        "Mobile Performance Optimization"
      ],
      imgs: [
        { src: getAssetById('skills-5-dssissa').path, alt: "dssissa", isBlured: false, isMobile: false },
        { src: getAssetById('skills-5-dssissa1').path, alt: "dssissa1", isBlured: false, isMobile: true },
        { src: getAssetById('skills-5-dssissa2').path, alt: "dssissa2", isBlured: false, isMobile: true },
        { src: getAssetById('skills-5-arkani').path, alt: "Arkani", isBlured: false, isMobile: true },
        { src: getAssetById('skills-5-arkani1').path, alt: "Arkani1", isBlured: false, isMobile: true },
        { src: getAssetById('skills-5-arkani3').path, alt: "Arkani2", isBlured: false, isMobile: true },
      ],
      startdate: "2022-01-01",
      storyBehindIt: "Long ago, in the days when glowing rectangles first entered the hands of the common folk, I held one and felt something stir within me. Not just awe—but purpose. I didn't merely see a device; I saw a spellbook waiting to be written, a window into infinite worlds. From that moment on, I knew: I would one day craft enchantments that lived within these magical tomes.\n\nIn my early days as a student of the full-stack order, I studied the ancient scrolls of web sorcery, learning the basics of structure, logic, and style. But while others were content mastering the scrolls of `HTML`, `CSS`, and `JavaScript`, my gaze often wandered to the realm of mobile magic—a realm where every touch was a rune, every swipe a command.\n\nI began by summoning simple interfaces using hybrid charms, mixing web spells with responsive enchantments. Soon, I uncovered the sacred scrolls of `React Native`, which allowed me to craft powerful cross-platform incantations. With the aid of `Expo`, I summoned my first fully working familiars—apps that answered to my every instruction.\n\nEven now, though I have journeyed through many lands of code and built artifacts for all kinds of devices, the path of Mobile Enchantments remains one of my favorite quests. With each app, I breathe life into my ideas—transforming them into spells others can hold in their hands.\n\nThis path is far from over. Many runes remain untranslated. But the fire that sparked from that first encounter still burns, guiding my hand as I craft ever more powerful enchantments for the devices of this world."
    }
  },
  {
    id: "skill-web-explorer",
    overview: {
      thumbnail: getAssetById('skills-6-thumb').path,
      intro: "<strong>Web Explorer</strong> — Navigating the enchanted realms of the Internet.<br/>Web Explorer is the art of understanding how the web truly works — from HTTP incantations to domain name rituals, browser behavior, and the hidden currents of online realms.",
      desc: loadMarkdownAsset("skill-web-explorer"),
      features: [
        "Web Performance Monitoring",
        "DevTools Network Inspection",
        "API Consumption & Debugging",
        "DNS and Domain Knowledge",
        "HTTP Headers Decoding",
        "Surfing through the internet wisely"
      ],
      imgs: [
        { src: getAssetById('skills-6-searchengine').path, alt: "search Engine", isBlured: false, isMobile: false },
        { src: getAssetById('skills-6-browsers').path, alt: "web Browsers", isBlured: false, isMobile: false },
      ],
      startdate: "2016-04-01",
      storyBehindIt: "My journey as a Web Explorer began in the early days of my youth, armed with nothing more than curiosity and a shared family computer. I still remember the very first phrase I entered into the sacred scrolls of Google: *'العاب اكشن'* It was a simple request, but it opened a portal to an entirely new world — one of endless discovery and digital wonder.\n\nBack then, I did not know how the results appeared, how clicking a link summoned pages from distant lands, or how the banners and games knew where I had been. But I returned, day after day, driven by that same fire of curiosity. I searched. I clicked. I explored.\n\nOver time, that innocent wonder grew into a desire to **understand**. I began to peek behind the veil using browser tools, inspecting network spells and learning how each part of a website was conjured. I learned that behind every link was a ritual — behind every page, a structure.\n\nWhat started as a child's game slowly became a quest for mastery. From reading response headers to analyzing performance bottlenecks, I grew into the role of a true Web Explorer — no longer just a visitor of the web, but a mapper of its hidden paths."
    }
  },
  {
    id: "skill-data-divination",
    overview: {
      thumbnail: getAssetById('skills-7-thumb').path,
      intro: "Data Divination is the art of gathering raw numbers, cleansing them of noise, and shaping them into charts and symbols that reveal truths unseen by the naked eye.",
      desc: loadMarkdownAsset("skill-data-divination"),
      features: [
        "Data Cleansing & Preparation",
        "Data Visualization (Charts, Graphs)",
        "Exploratory Data Analysis",
        "Basic Statistics & Correlation Finding",
        "Dashboard Crafting",
        "Storytelling with Data"
      ],
      imgs: [
        { src: getAssetById('skills-7-dashboard').path, alt: "Dashboard", isBlured: false, isMobile: false },
        { src: getAssetById('skills-7-rapport').path, alt: "Rapport", isBlured: false, isMobile: false },
      ],
      startdate: "2021-09-01",
      storyBehindIt: "My journey into the art of Data Divination began not in a grand hall of scholars, but at a quiet desk while working on the back end of a project. I was tasked with a strange challenge — to turn streams of raw, tangled numbers into something others could see and understand, or to transform a clear visualization back into precise code.\n\nAt first, it was like staring at an unreadable map, lines and figures scattered without meaning. But soon, I learned the runes of analysis and the symbols of visualization. The more I worked, the more I realized that every dataset tells a story — some are whispers, some are shouts, but all can be heard if you know the language.\n\nFrom that day forward, I have used my skills as a data seer to illuminate the unseen, guiding projects and decisions with the light of knowledge drawn from the shadows of raw information."
    }
  },
  {
    id: "skill-code-enchantments",
    overview: {
      thumbnail: getAssetById('skills-8-thumb').path,
      intro: "<strong>Code Enchantments</strong> — Crafting elegant and efficient code-spells to banish chaos and summon clarity.<br /><strong>Code Enchantments</strong> is the art of writing clean, maintainable, and reusable code through sacred practices and timeless patterns.",
      desc: loadMarkdownAsset("skill-code-enchantments"),
      features: [
        "Code Refactoring",
        "Design Patterns",
        "Clean Architecture",
        "Documentation & Comments",
        "Linting & Formatting"
      ],
      imgs: [
        { src: getAssetById('skills-8-eslint').path, alt: "eslint", isBlured: false, isMobile: false },
        { src: getAssetById('skills-8-editorconfig').path, alt: "editorconfig", isBlured: false, isMobile: false },
        { src: getAssetById('skills-8-markdown').path, alt: "markdown", isBlured: false, isMobile: false },
        { src: getAssetById('skills-8-documentation').path, alt: "documentation", isBlured: false, isMobile: false }
      ],
      startdate: "2017-11-01",
      storyBehindIt: "When I first began my journey into the world of code, I knew nothing of Code Enchantments. My early works were a tangle of unspaced lines, missing indentations, and scattered fragments—especially in the days of raw HTML.\n\nGradually, HTML itself guided me: each opening and closing tag taught me the rhythm of structure. CSS followed naturally, but JavaScript and PHP required deeper discipline. Over time, formatting and organizing code became second nature.\n\nWhen I began collaborating with friends and releasing projects into the open realms of GitHub, I realized the true weight of clean code. To stand alongside other developers, I studied the ancient scrolls of best practices and invoked modern tools like `prettier`, `TypeScript`, and `SASS` to refine my craft.\n\nCode Enchantments became not just a habit, but a creed—ensuring that my work endures, scales, and speaks clearly across the ages."
    }
  },
  {
    id: "skill-mentorship",
    overview: {
      thumbnail: getAssetById('skills-9-thumb').path,
      intro: "<strong>Mentorship</strong> is the magical act of teaching and empowering others to grow with confidence—unlocking their true potential through patience, empathy, and guidance.</br><strong>Mentorship</strong> It is the art of sharing knowledge, providing feedback, and nurturing growth in others while continuing to learn yourself.",
      desc: loadMarkdownAsset("skill-mentorship"),
      features: [
        "Pair Programming & Collaboration",
        "Knowledge Sharing & Debugging Guidance",
        "Learning Path Design",
        "Code Reviews & Constructive Feedback",
        "Communication & Soft Skill Development",
        "Adaptable Teaching & Leadership Styles",
      ],
      imgs: [
        { src: getAssetById('skills-9-anydesk').path, alt: "anydesk", isBlured: false, isMobile: false },
        { src: getAssetById('skills-9-cs-teacher').path, alt: "cs teacher", isBlured: false, isMobile: false },
        { src: getAssetById('skills-9-teacher').path, alt: "teacher", isBlured: false, isMobile: false },
      ],
      startdate: "2022-01-01",
      storyBehindIt: "From the very beginning, mentorship has been woven into my life. My father—himself a teacher and my first mentor—taught me how to read, write, and think critically. He shaped my curiosity, humility, and discipline. Even when he was strict, he was always fair and just, teaching me that mistakes are not failures but lessons that help us grow.\n\nFollowing in his footsteps came naturally. I started helping friends with homework, explaining concepts, and realizing that teaching others deepened my own understanding. Over time, I discovered that mentorship was not just something I enjoyed—it was something I *needed*.\n\nSince then, I've carried that same passion into everything I do—from coding to gaming, from teamwork to teaching. Each mentee, student, or player I've guided has reminded me that mentorship is a cycle: we give, we learn, and we grow together.\n\nMentorship is my way of giving back to the world—one learner, one conversation, and one breakthrough at a time."
    }
  },
  {
    id: "skill-problem-solving",
    overview: {
      thumbnail: getAssetById('skills-10-thumb').path,
      intro: "<strong>Problem Solving</strong> — The noble art of unraveling complexity through wisdom, logic, and enchanted creativity.<br /> Problem Solving is the wizard's craft — transforming chaos into harmony through the alchemy of thought and design.",
      desc: loadMarkdownAsset("skill-problem-solving"),
      features: [
        "Algorithmic Enchantment",
        "Data Structure Weaving",
        "Bug Exorcism",
        "Code Optimization Rituals",
        "Architectural Divination"
      ],
      imgs: [
        { src: getAssetById('skills-10-devconsole').path, alt: "browser dev tools", isBlured: false, isMobile: false },
        { src: getAssetById('skills-10-postman').path, alt: "postman", isBlured: false, isMobile: false },
        { src: getAssetById('skills-10-debuggingtools').path, alt: "debugging Tools", isBlured: false, isMobile: false },
      ],
      startdate: "2016-01-01",
      storyBehindIt: "From the first breath of existence, humanity has been tested with trials.\n\nSome simple, others labyrinthine.\n\nEach problem — a quest. Each failure — a lesson. Each solution — a victory etched into the soul.\n\nIn my own journey, I have faced dragons of confusion and dungeons of error.\n\nSome fell quickly to my blade of logic, others demanded patience, study, and at times, the counsel of fellow mages.\n\nYet with every encounter, I grew — wiser, sharper, and more attuned to the rhythm of the unseen.\n\nSo it is with code.\n\nEvery error message, every frozen loop, every inexplicable crash — a teacher in disguise.\n\nThrough these ordeals, I learned new spells, refined my tools, and forged my mind into a sharper weapon.\n\nProblem Solving became not just an art — but a calling.\n\nIt is a discipline, a ritual, a way of perceiving the world.\n\nIt transforms frustration into fascination, and despair into discovery.\n\nFor once a wizard tastes the thrill of conjuring a solution from chaos…\n\nthe journey becomes eternal.\n\nSolving problems becomes an *addiction of purpose* — a pursuit that kindles joy, mastery, and meaning.\n\nEach victory is a spark of magic, reminding the wizard that even the darkest bug can lead to the brightest revelation."
    }
  },
  {
    id: "skill-windows-dungeon",
    overview: {
      thumbnail: getAssetById('skills-11-thumb').path,
      intro: "<strong>Windows Dungeon</strong> — Exploring and mastering the mystical realms of the Windows operating system. <code>PowerShell</code> and <code>CMD</code> incantations are my tools of choice.<br /><strong>Windows Dungeon</strong> is my deep dive into system configuration, scripting, and automation within the cryptic corridors of the Windows OS.",
      desc: loadMarkdownAsset("skill-windows-dungeon"),
      features: [
        "PowerShell Scripting",
        "Batch Spellcraft (Batch Scripting)",
        "Registry Runes & Tweaks",
        "Task Scheduler Automation",
        "System Monitoring & Log Reading",
        "System Troubleshooting",
        "Windows Recovery Rituals",
        "Safe Mode Invocation",
      ],
      imgs: [
        { src: getAssetById('skills-11-blue-screen').path, alt: "blue screen", isBlured: false, isMobile: false },
        { src: getAssetById('skills-11-win7setup').path, alt: "Windows 7 Setup", isBlured: false, isMobile: false },
        { src: getAssetById('skills-11-winxphome').path, alt: "Windows XP Home", isBlured: false, isMobile: false },
        { src: getAssetById('skills-11-win10setting').path, alt: "Windows 10 Settings", isBlured: false, isMobile: false },
        { src: getAssetById('skills-11-win10controlpanel').path, alt: "Windows 10 Control Panel", isBlured: false, isMobile: false },
      ],
      startdate: "2005-10-18",
      storyBehindIt: "Windows — the world's most beloved and widespread operating system — became the first magical realm I ever explored. Praised for its simplicity and adaptability, it was the gateway to my lifelong journey in computing.\n\nMy first encounter was at the age of **four**, when our family's ancient PC ran **Windows 2000**. Despite my parents' strict rules, curiosity burned brighter than fear. I'd sneak into the study, often facing dire consequences, just to feel the hum of that machine. Those moments were my first sparks of digital wonder.\n\nBy the age of **six**, our household was blessed with a new artifact — a PC running **Windows XP**. Its shimmering interface and new powers captivated me. I spent countless hours exploring menus, experimenting with settings, and reviving the system whenever it froze.\n\nIf my fixes failed, I would call upon my elder brother — my first mentor in troubleshooting. Between adventures, I played legendary titles like `Age of Empires II`, `Stronghold Crusader`, `Counter-Strike 1.6`, and even `Banana` and `SNES` classics.\n\nAs time passed, I delved deeper into Windows magic — mastering its hidden mechanisms. I learned to command PowerShell and CMD, automate with Task Scheduler, observe system lifeforce through Event Viewer and Performance Monitor, and recover from calamities using the Recovery Environment.\n\nI explored every chamber: the Registry Editor, Group Policy, Device Manager, Disk Management, Defender, Firewall, Backup, Restore, and even the sacred art of dual-booting and virtualization.\n\nFrom *XP* to *11*, from *installation* to *resurrection*, I've walked every path of the **Windows Dungeon**, emerging as its steadfast guardian."
    }
  },
  {
    id: "skill-linux-slayer",
    overview: {
      thumbnail: getAssetById('skills-12-thumb').path,
      intro: "<strong>Linux Slayer</strong>best open-source OS for developers and hackers. mastering its command line is essential.<br /><strong>Linux Slayer</strong> is my journey into the powerful world of Linux—navigating its command line, mastering its services, and harnessing its open-source magic.",
      desc: loadMarkdownAsset("skill-linux-slayer"),
      features: [
        "Shell Scripting (Bash)",
        "Package Management (apt, yum)",
        "Cron Jobs & Services",
        "Log Monitoring",
        "User/Permission Management"
      ],
      imgs: [
        { src: getAssetById('skills-12-kalilinux').path, alt: "kali linux", isBlured: false, isMobile: false },
        { src: getAssetById('skills-12-filesystemstructure').path, alt: "file system structure", isBlured: false, isMobile: false },
        { src: getAssetById('skills-12-linuxcommand').path, alt: "linux command", isBlured: false, isMobile: false },
        { src: getAssetById('skills-12-linuxdistr').path, alt: "linux distribution", isBlured: false, isMobile: false },
        { src: getAssetById('skills-12-mint').path, alt: "kali linux", isBlured: false, isMobile: false },
        { src: getAssetById('skills-12-ubuntu').path, alt: "kali linux", isBlured: false, isMobile: false },
      ],
      startdate: "2019-02-01",
      storyBehindIt: "Linux — the world's most beloved and widespread open-source operating system.\n\nMy story with Linux began when I was **12 years old**, after hearing people talk about the *deep web* and *dark web*. I got curious and wanted to explore it myself. Installing the Tor browser on Windows worked fine, but I didn't feel secure. People kept saying it was dangerous and could even lead to trouble, so I started looking for a more private and safe way to do it. At that time, I didn't fully understand how things worked yet.\n\nOne day, my big brother — who was studying networking — installed **Kali Linux** on his laptop. It was my first time seeing what I thought was a \"real hacker\" in action (okay, he only hacked the Wi-Fi password 😅). But for a teenager who had only seen that kind of thing in movies, it was mind-blowing. I still remember him using **aircrack** and other cracking tools to get the password. I was amazed — I wanted to learn how to do that too.\n\nAfter that day, I started searching for information about Linux. I discovered that Kali Linux was based on **Debian**, so I downloaded **Ubuntu** and installed it on my old laptop. I began learning the basics of Linux — commands, the file system, and how everything worked. I was fascinated by the power of the terminal and how you could do *anything* with it.\n\nAfter some time, I lost interest in Linux until my first year at university. When I started learning programming and web development, I found that most tools and frameworks were built for Linux. So I decided to give it another try. I installed different distros — starting again with **Kali Linux**, then **Ubuntu**, **Mint**, and **Fedora**.\n\nWhen I reached my first bachelor year, I specialized in **cybersecurity**, and that was the moment I began using Linux more seriously. I learned how to use different tools and scripts, configure and manage Linux servers, and secure them against attacks.\n\nI still remember the first time I used **nmap** to scan a network — it felt like casting a spell that revealed every device in the room. From that point on, Linux became more than just an operating system — it became a weapon, a tool, and a way of thinking."
    }
  },
  {
    id: "skill-docker",
    overview: {
      thumbnail: getAssetById('skills-13-thumb').path,
      intro: "<strong>Docker</strong>Containerizing applications and orchestrating microservices across realms of code and cloud.<br/>Docker is about crafting lightweight, portable containers that bring consistency, speed, and isolation to modern development workflows.",
      desc: loadMarkdownAsset("skill-docker"),
      features: [
        "Dockerfile Creation & Optimization",
        "Image & Container Management",
        "Docker Compose for Multi-Container Apps",
        "Volume & Network Configuration",
        "Containerized Development Environments"
      ],
      imgs: [
        { src: getAssetById('skills-13-cheatsheet').path, alt: "docker cheatsheet", isBlured: false, isMobile: false },
        { src: getAssetById('skills-13-dockerarchitechur').path, alt: "docker architecture", isBlured: false, isMobile: false },
        { src: getAssetById('skills-13-dockerworkflow').path, alt: "docker workflow", isBlured: false, isMobile: false },
      ],
      startdate: "2023-04-01",
      storyBehindIt: "Achieving this skill wasn't something I planned from the start.\n\nIt all began during my **second year of development studies**, when our programming instructor first introduced us to Docker. At the time, it felt complex and abstract, so I gave up on it for a while.\n\nLater, as I advanced in my studies — particularly during my **cybersecurity specialization** — we started working on **big data** projects that required containerization. That's when I realized Docker wasn't just another tool; it was a cornerstone of modern infrastructure.\n\nI began learning it seriously, experimenting with containers, building small projects, and debugging my own environments. Over time, I became comfortable using Docker to deploy and manage applications seamlessly.\n\nNow, I can confidently say I understand Docker's core principles — from building images to managing containers — and appreciate its true power in creating scalable, isolated, and portable systems."
    }
  },
  {
    id: "skill-virtualization",
    overview: {
      thumbnail: getAssetById('skills-14-thumb').path,
      intro: "<strong>Virtualization</strong>— Creating and managing virtual environments for development and testing.<br /> Virtualization is the arcane craft of forging digital realms within realms—safe, isolated worlds for testing, deployment, and exploration.",
      desc: loadMarkdownAsset("skill-virtualization"),
      features: [
        "Virtual Machine Management",
        "ISO & OS Installation",
        "Snapshot & Rollback",
        "Virtual Networking",
        "Multi-OS Testing"
      ],
      imgs: [
        { src: getAssetById('skills-14-kaliimage').path, alt: "kali image", isBlured: false, isMobile: false },
        { src: getAssetById('skills-14-vboracle').path, alt: "virtualBox", isBlured: false, isMobile: false },
        { src: getAssetById('skills-14-vboracle-setting').path, alt: "virtualBox settings", isBlured: false, isMobile: false },
      ],
      startdate: "2022-06-01",
      storyBehindIt: "My journey into **virtualization** began right after mastering Linux.\n\nI needed a way to explore Linux freely—without constantly formatting my main system. Buying a second computer wasn't an option, so virtualization became my portal to freedom.\n\nIt allowed me to summon different operating systems within my own machine, experiment safely, and learn without limits. My hardware wasn't the strongest, but it was enough to open new worlds—and that's what mattered most."
    }
  }
];

export default skills;
