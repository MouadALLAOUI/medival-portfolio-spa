const COMMON = {
    nav: {
        logoText: "Mouad the Coder",
        home: "Home",
        landing: "Overview",
        projects: "Projects",
        blogs: "Blog",
        crmef: "CRMEF Portal",
        game: "Typing Game",
        settingsGear: "Open settings",
        medieval: {
            hero: "Assistant",
            presentation: "Presentation",
            skills: "Skills",
            projects: "Projects",
            about: "About",
            contact: "Contact",
            hobbies: "Hobbies",
            design: "Design",
            languages: "Languages",
        }
    },
    settings: {
        title: "Settings",
        subtitle: "Customize your portfolio experience",
        backBtn: "← Back",
        themeLabel: "Theme",
        langLabel: "Language",
        fontSizeLabel: "Font Size",
        motionLabel: "Animations",
        motionActive: "Reduced Motion",
        motionNormal: "Full Animations",
        advancedBtn: "⚙️ Advanced Settings",
        applyBtn: "Save Settings",
        closeBtn: "Close settings",
        sections: {
            appearance: {
                title: "🎨 Appearance",
                description: "Visual theme and display preferences"
            },
            language: {
                title: "🌐 Language",
                description: "Interface language preferences"
            },
            pdf: {
                title: "📄 PDF Viewer",
                description: "How PDF documents are opened and displayed"
            },
            accessibility: {
                title: "♿ Accessibility",
                description: "Comfort and accessibility preferences"
            }
        },
        keys: {
            theme: {
                label: "Theme",
                description: "Choose the overall visual style of the portfolio",
                options: {
                    light: { label: "Light", description: "Switch to light theme" },
                    dark: { label: "Dark", description: "Switch to dark theme" },
                    medieval: { label: "Classic", description: "Switch to classic theme" }
                }
            },
            markdownTheme: {
                label: "Markdown Style",
                description: "How blog posts and markdown content are displayed",
                options: {
                    default: { label: "Default", description: "Matches the active visual theme" },
                    github: { label: "GitHub", description: "Clean GitHub-style markdown" },
                    medieval: { label: "Classic", description: "Classic styled markdown" }
                }
            },
            language: {
                label: "Interface Language",
                description: "Language used across the portfolio UI",
                options: {
                    en: { label: "English", description: "" },
                    fr: { label: "Français", description: "" },
                    ar: { label: "العربية", description: "" },
                    'medieval-en': { label: "Classic English", description: "" },
                    'medieval-fr': { label: "Français Classique", description: "" }
                }
            },
            customCursor: {
                label: "Custom Cursor",
                options: {
                    enabled: { label: "Enabled" },
                    disabled: { label: "Default Cursor" }
                }
            },
            soundEnabled: {
                label: "Sound Effects",
                options: {
                    enabled: { label: "On" },
                    disabled: { label: "Muted" }
                }
            },
            pdfMode: {
                label: "Opening Mode",
                description: "Where PDF documents open when triggered",
                options: {
                    inline: { label: "Inline", description: "Expands inside the page below the trigger" },
                    modal: { label: "Popup Window", description: "Opens in a centered floating window" },
                    newWindow: { label: "New Tab", description: "Opens in a new browser tab" }
                }
            },
            pdfReadingMode: {
                label: "Reading Layout",
                description: "How pages are displayed inside the PDF viewer",
                options: {
                    paginated: { label: "Page by Page", description: "Navigate one page at a time" },
                    longStrip: { label: "Continuous Scroll", description: "Continuous vertical scroll" },
                    separatedStrip: { label: "Separated Pages", description: "Scroll with clear page separators" },
                    doublePage: { label: "Double Page", description: "Two pages side by side (desktop)" }
                }
            },
            reducedMotion: {
                label: "Reduce Motion",
                description: "Minimize animations across the portfolio"
            },
            fontSize: {
                label: "Font Size",
                description: "Base reading font size",
                options: {
                    small: { label: "Small", description: "14px base" },
                    medium: { label: "Medium", description: "16px base (default)" },
                    large: { label: "Large", description: "18px base" }
                }
            },
            soundEnabled: {
                label: "Sound Effects",
                description: "Enable interface audio feedback"
            }
        }
    },
    contextMenu: {
        navigateTitle: "Go to...",
        navigateHome: "Return Home",
        copyUrl: "Copy Page URL",
        actionsTitle: "Actions",
        printLabel: "Print Page",
        sourceLabel: "View Source Code",
        unlockTitle: "Unlock Secret",
        urlLabel: "URL",
        cycleTheme: "Switch Theme",
        printPage: "Print Page",
        viewSource: "View Source Code",
        unlockAchievement: "Unlock Hidden Feature",
    },
    pdfViewer: {
        loading: "📄 Loading document...",
        errorNotFound: "⚠️ The requested document could not be found.",
        errorCorrupted: "⚠️ The document could not be opened or is corrupted.",
        errorNoData: "No document specified.",
        previous: "← Previous",
        next: "Next →",
        pagePrefix: "Page",
    },
    chatbot: {
        title: "AI Assistant",
        placeholder: "Ask something about Mouad...",
        send: "Send",
        triggerText: "Open Assistant",
        triggerAria: "Open assistant",
        closeAria: "Close assistant",
        suggestions: {
            whoIsMouad: "Who is Mouad?",
            listProjects: "List projects",
            listCyberProjects: "List cybersecurity projects",
        },
        howToUseTitle: "How to use this chatbot:",
        howToUseAsk: "Ask questions:",
        howToUseAskDesc: "About Mouad, his projects, or general information",
        howToUseFollowUp: "Follow-up questions:",
        howToUseFollowUpDesc: "The chatbot remembers the active topic for smoother conversations",
        worthAsking: "Is it worth using:",
        worthAskingDesc: "Yes! This chatbot was built with effort and is still improving over time. Thanks for trying it.",
        greeting: "Hello! I’m the AI assistant. Ask me anything about Mouad the Coder and his projects.",
        underDevNotice: "This chatbot is still under development and training. Thank you for your understanding.",
        context: "Context:",
        statParagraphs: "Paragraphs",
        statSentences: "Sentences",
        statEntities: "Entities",
    },
    alerts: {
        copySuccess: "{{label}} copied successfully! ✅",
        copyFailed: "Copy failed! ❌",
        pdfError: "The requested document could not be opened. Please make sure the file exists. 🗂️",
        welcomeHome: "Welcome to my portfolio, hope you find what you're looking for",
        chaosUnderDev: "This portfolio is still under development. Thank you for your understanding.",
        projectsUnderDev: "The projects section is currently under development",
        welcomeBack: "Welcome back",
        themeAltered: "Theme changed to {{theme}}! 🎨",
        secretPortraitUnlocked: "🎉 You discovered a hidden feature!",
        portalAlreadyBreached: "This hidden feature has already been unlocked! 🔒",
        dateUnknown: "Unknown date",
        developmentAlertBar: "Welcome to the portfolio of Mouad the Coder! This portfolio is still under development, thank you for your understanding.",
    },
    footer: {
        copyright: "© {{year}} Mouad the Coder | Built with code and creativity",
        disclaimer: "This portfolio may not be copied without permission",
    },
    thankyou: {
        title: "📨 Your Message Has Been Sent!",
        body: "Your message has been received successfully.\nI’ll review it and get back to you as soon as possible.",
        returnBtn: "⬅️ Return to Home",
    },
    achievements: {
        title: 'Achievement Vault',
        subtitle: 'Unlocked · XP',
        unlocked: 'Unlocked',
        locked: 'Locked',
        showLocked: 'Show Locked',
        category: 'Category',
        rarity: 'Rarity',
        allCategories: 'All',
        allRarities: 'All Rarities',
        xpSuffix: 'XP',
        empty: 'No achievements match your filters',
        navLabel: 'Achievements',
    },
    notFound: {
        title: "🛡️ 404 - Page Not Found",
        subtitle: "The page you are looking for does not exist.",
        description: "The address may be incorrect, or the page may have been moved or deleted. Please check the URL and try again.",
        backBtn: "⬅️ Return Home",
    }
}

export {
    COMMON,
}