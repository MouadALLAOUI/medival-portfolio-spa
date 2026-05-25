const COMMON = {
    nav: {
        logoText: "Mouad the Coder",
        home: "Castle / Home",
        landing: "Home Overview",
        projects: "Tech Quests",
        blogs: "Chamber of Chronicles",
        crmef: "CRMEF Portal",
        game: "Typing Realm",
        settingsGear: "Open settings",
        medieval: {
            hero: "Oracle",
            presentation: "The Craftsman",
            skills: "Scroll of Skills",
            projects: "Tech Quests",
            about: "Coding Lore",
            contact: "Send Raven",
            hobbies: "Beyond Code",
            design: "Design Forge",
            languages: "Tongues of the Realm",
        }
    },
    settings: {
        title: "Arcane Settings Grimoire",
        subtitle: "Customize your portfolio experience",
        backBtn: "← Back",
        themeLabel: "Realm Theme",
        langLabel: "Speech / Tongue",
        fontSizeLabel: "Scribe Font Size",
        motionLabel: "Motion Spell (Animations)",
        motionActive: "Reduced (Calm)",
        motionNormal: "Full Magic (Animations)",
        advancedBtn: "⚙️ Advanced Settings",
        applyBtn: "Save Incantations",
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
                label: "Realm Theme",
                description: "Choose the overall visual style of the portfolio",
                options: {
                    light: { label: "Arcane Light", description: "Switch to Arcane Light theme" },
                    dark: { label: "Shadow Realm", description: "Switch to Shadow Realm theme" },
                    medieval: { label: "Medieval Scroll", description: "Switch to Medieval Scroll theme" }
                }
            },
            markdownTheme: {
                label: "Markdown Style",
                description: "How blog post and markdown content is styled",
                options: {
                    default: { label: "Default", description: "Matches the active visual theme" },
                    github: { label: "GitHub", description: "Clean GitHub-style markdown" },
                    medieval: { label: "Medieval Scroll", description: "Ornate medieval styling" }
                }
            },
            language: {
                label: "Interface Language",
                description: "Language used across the portfolio UI",
                options: {
                    en: { label: "English", description: "" },
                    fr: { label: "Français", description: "" },
                    ar: { label: "العربية", description: "" }
                }
            },
            pdfMode: {
                label: "Opening Mode",
                description: "Where PDF documents open when triggered",
                options: {
                    inline: { label: "Inline Scroll", description: "Expands inside the page below the trigger" },
                    modal: { label: "Arcane Portal (Modal)", description: "Opens in a centered floating window" },
                    newWindow: { label: "Outer Plane (New Window)", description: "Opens in a new browser tab" }
                }
            },
            pdfReadingMode: {
                label: "Reading Layout",
                description: "How pages are laid out inside the PDF viewer",
                options: {
                    paginated: { label: "Page by Page", description: "Navigate one page at a time" },
                    longStrip: { label: "Long Strip", description: "Continuous vertical scroll" },
                    separatedStrip: { label: "Separated Strip", description: "Scroll with clear page separators" },
                    doublePage: { label: "Double Page", description: "Two pages side by side (desktop)" }
                }
            },
            reducedMotion: {
                label: "Reduce Motion",
                description: "Minimize animations across the portfolio"
            },
            fontSize: {
                label: "Scribe Font Size",
                description: "Base reading font size",
                options: {
                    small: { label: "Small", description: "14px base" },
                    medium: { label: "Medium", description: "16px base (default)" },
                    large: { label: "Large", description: "18px base" }
                }
            }
        }
    },
    contextMenu: {
        navigateHome: "Return to Castle",
        copyUrl: "Copy Scroll URL",
        urlLabel: "Scroll URL",
        cycleTheme: "Cycle Realm Theme",
        viewSource: "Peek Source Code",
        unlockAchievement: "Breach Secret Portal",
    },
    pdfViewer: {
        loading: "🔮 Unrolling scroll...",
        errorNotFound: "⚠️ The requested scroll does not exist or is untraceable.",
        errorCorrupted: "⚠️ The scroll could not be unrolled or is corrupted.",
        errorNoData: "No scroll specified.",
        previous: "← Previous",
        next: "Next →",
        pagePrefix: "Page",
    },
    chatbot: {
        title: "The Grand Oracle",
        placeholder: "Consult the Oracle on Mouad's lore...",
        send: "Consult",
        triggerText: "Consult Oracle",
        triggerAria: "Open Oracle grimoire",
        closeAria: "Close Oracle grimoire",
        suggestions: {
            whoIsMouad: "Who is Mouad?",
            listProjects: "List projects",
            listCyberProjects: "List cybersecurity projects",
        },
        howToUseTitle: "How to use this chatbot:",
        howToUseAsk: "Ask questions:",
        howToUseAskDesc: "About the context or general inquiries about Mouad the Coder",
        howToUseFollowUp: "Follow-up questions:",
        howToUseFollowUpDesc: "The bot remembers the active topic context for seamless continuation",
        worthAsking: "Is it worth asking:",
        worthAskingDesc: "Yes! I work my brain out to build it — even if there are still some improvements needed. Thank you for using our simple chatbot.",
        greeting: "Greetings, seeker! I am the Oracle. Ask me anything about Mouad the Coder and his mystical coding powers.",
        underDevNotice: "This chatbot is still under development and training. Thank you for your understanding.",
        context: "Context:",
        statParagraphs: "Paragraphs",
        statSentences: "Sentences",
        statEntities: "Entities",
    },
    alerts: {
        copySuccess: "Copied {{label}} to spellbook! ✅",
        copyFailed: "Copy spell failed! 💀",
        pdfError: "The requested scroll could not be unrolled. Ensure the file exists. 🗂️",
        welcomeHome: "Welcome to my palace, hope you find whatever you desire",
        chaosUnderDev: "this portfolio is still under development thank you for your understanding",
        projectsUnderDev: "current section under development is projects",
        welcomeBack: "Welcome back, traveler",
        themeAltered: "Realm altered to {{theme}}! 🔮",
        portalAlreadyBreached: "The Secret Portal was already breached! 🛡️",
        dateUnknown: "Date unknown",
        developmentAlertBar: "Welcome to the portfolio of Mouad the Coder! This portfolio is still under development, thank you for your understanding.",
    },
    footer: {
        copyright: "© {{year}} Mouad the Coder | Crafted with magical code and enchanted pixels",
        disclaimer: "This grimoire shall not be copied without express permission from the wizard",
    },
    thankyou: {
        title: "📜 Your Message Has Been Sent!",
        body: "A raven has taken flight with your words, noble visitor.\nI shall read your scroll and reply with haste once the stars align.",
        returnBtn: "⬅️ Return to the Grand Archives",
    },
    notFound: {
        title: "🛡️ 404 - Scroll Lost in the Void",
        subtitle: "The parchment you seek has vanished from the kingdom's library.",
        description: "Perhaps the address was misspelled, or the page has been incinerated by dragon fire. Verify your coordinates and try again, traveler.",
        backBtn: "⬅️ Return to Castle",
    }
}


export {
    COMMON,
}
