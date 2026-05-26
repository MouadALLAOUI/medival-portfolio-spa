const COMMON = {
    nav: {
        logoText: "Mouad le Codeur",
        home: "Accueil",
        landing: "Aperçu",
        projects: "Projets",
        blogs: "Blog",
        crmef: "Portail CRMEF",
        game: "Jeu de Dactylo",
        settingsGear: "Ouvrir les paramètres",
        medieval: {
            hero: "Assistant",
            presentation: "Présentation",
            skills: "Compétences",
            projects: "Projets",
            about: "À propos",
            contact: "Contact",
            hobbies: "Loisirs",
            design: "Design",
            languages: "Langues",
        }
    },
    settings: {
        title: "Paramètres",
        subtitle: "Personnalisez votre expérience du portfolio",
        backBtn: "← Retour",
        themeLabel: "Thème",
        langLabel: "Langue",
        fontSizeLabel: "Taille de police",
        motionLabel: "Animations",
        motionActive: "Réduction des animations",
        motionNormal: "Animations complètes",
        advancedBtn: "⚙️ Paramètres avancés",
        applyBtn: "Enregistrer",
        closeBtn: "Fermer les paramètres",
        sections: {
            appearance: {
                title: "🎨 Apparence",
                description: "Thème visuel et préférences d'affichage"
            },
            language: {
                title: "🌐 Langue",
                description: "Préférences de langue de l'interface"
            },
            pdf: {
                title: "📄 Lecteur PDF",
                description: "Mode d'ouverture et d'affichage des documents PDF"
            },
            accessibility: {
                title: "♿ Accessibilité",
                description: "Options de confort et d'accessibilité"
            }
        },
        keys: {
            theme: {
                label: "Thème",
                description: "Choisir l'apparence générale du portfolio",
                options: {
                    light: { label: "Clair", description: "Passer au thème clair" },
                    dark: { label: "Sombre", description: "Passer au thème sombre" },
                    medieval: { label: "Classique", description: "Passer au thème classique" }
                }
            },
            markdownTheme: {
                label: "Style Markdown",
                description: "Style d'affichage du contenu des articles et du markdown",
                options: {
                    default: { label: "Par défaut", description: "Suit le thème actif" },
                    github: { label: "GitHub", description: "Style propre type GitHub" },
                    medieval: { label: "Classique", description: "Style classique" }
                }
            },
            language: {
                label: "Langue de l'interface",
                description: "Langue utilisée dans tout le portfolio",
                options: {
                    en: { label: "English", description: "" },
                    fr: { label: "Français", description: "" },
                    ar: { label: "العربية", description: "" },
                    'medieval-en': { label: "Anglais médiéval", description: "" },
                    'medieval-fr': { label: "Français médiéval", description: "" }
                }
            },
            pdfMode: {
                label: "Mode d'ouverture",
                description: "Comment les PDF sont ouverts",
                options: {
                    inline: { label: "Intégré", description: "Affiché directement dans la page" },
                    modal: { label: "Fenêtre modale", description: "Ouvre une fenêtre centrée" },
                    newWindow: { label: "Nouvel onglet", description: "Ouvre dans un nouvel onglet" }
                }
            },
            pdfReadingMode: {
                label: "Mode de lecture",
                description: "Disposition des pages dans le lecteur PDF",
                options: {
                    paginated: { label: "Page par page", description: "Navigation page par page" },
                    longStrip: { label: "Défilement continu", description: "Défilement vertical continu" },
                    separatedStrip: { label: "Défilement séparé", description: "Pages séparées visuellement" },
                    doublePage: { label: "Double page", description: "Deux pages côte à côte" }
                }
            },
            reducedMotion: {
                label: "Réduction des animations",
                description: "Réduire ou désactiver les animations"
            },
            fontSize: {
                label: "Taille de police",
                description: "Taille de base du texte",
                options: {
                    small: { label: "Petite", description: "14px" },
                    medium: { label: "Moyenne", description: "16px (par défaut)" },
                    large: { label: "Grande", description: "18px" }
                }
            },
            soundEnabled: {
                label: "Sons",
                description: "Activer les effets sonores"
            }
        }
    },
    contextMenu: {
        navigateTitle: "Navigation",
        navigateHome: "Retour à l'accueil",
        copyUrl: "Copier l'URL",
        urlLabel: "URL",
        cycleTheme: "Changer de thème",
        printPage: "Imprimer",
        viewSource: "Voir le code source",
        unlockAchievement: "Débloquer un secret",
    },
    pdfViewer: {
        loading: "🔮 Chargement du document...",
        errorNotFound: "⚠️ Document introuvable.",
        errorCorrupted: "⚠️ Document corrompu ou illisible.",
        errorNoData: "Aucun document sélectionné.",
        previous: "← Précédent",
        next: "Suivant →",
        pagePrefix: "Page",
    },
    chatbot: {
        title: "Assistant",
        placeholder: "Posez une question sur Mouad...",
        send: "Envoyer",
        triggerText: "Ouvrir l'assistant",
        triggerAria: "Ouvrir l'assistant",
        closeAria: "Fermer l'assistant",
        suggestions: {
            whoIsMouad: "Qui est Mouad ?",
            listProjects: "Lister les projets",
            listCyberProjects: "Projets cybersécurité",
        },
        howToUseTitle: "Comment utiliser ce chatbot :",
        howToUseAsk: "Poser des questions :",
        howToUseAskDesc: "Sur Mouad, ses projets ou des informations générales",
        howToUseFollowUp: "Questions de suivi :",
        howToUseFollowUpDesc: "Le chatbot garde le contexte de la conversation",
        worthAsking: "Est-ce utile ?",
        worthAskingDesc: "Oui, il est encore en amélioration mais déjà fonctionnel.",
        greeting: "Bonjour ! Je suis l'assistant. Posez-moi vos questions sur Mouad le Codeur.",
        underDevNotice: "Ce chatbot est encore en développement.",
        context: "Contexte :",
        statParagraphs: "Paragraphes",
        statSentences: "Phrases",
        statEntities: "Entités",
    },
    alerts: {
        copySuccess: "{{label}} copié avec succès ! ✅",
        copyFailed: "Échec de la copie ! ❌",
        pdfError: "Impossible d'ouvrir le document. 🗂️",
        welcomeHome: "Bienvenue sur mon portfolio, j'espère que vous trouverez ce que vous cherchez",
        chaosUnderDev: "Ce portfolio est encore en développement",
        projectsUnderDev: "La section projets est en cours de développement",
        welcomeBack: "Bon retour",
        themeAltered: "Thème changé en {{theme}} ! 🎨",
        portalAlreadyBreached: "Ce secret a déjà été débloqué ! 🛡️",
        dateUnknown: "Date inconnue",
        developmentAlertBar: "Bienvenue sur le portfolio de Mouad le Codeur ! Encore en développement.",
    },
    footer: {
        copyright: "© {{year}} Mouad le Codeur | Créé avec du code et de la créativité",
        disclaimer: "Ce portfolio ne peut pas être copié sans autorisation",
    },
    thankyou: {
        title: "📜 Message envoyé !",
        body: "Votre message a bien été reçu.\nJe vous répondrai dès que possible.",
        returnBtn: "⬅️ Retour à l'accueil",
    },
    achievements: {
        title: 'Coffre des Succès',
        subtitle: 'Débloqués · XP',
        unlocked: 'Débloqué',
        locked: 'Verrouillé',
        showLocked: 'Afficher les Verrouillés',
        category: 'Catégorie',
        rarity: 'Rareté',
        allCategories: 'Tout',
        allRarities: 'Toutes Raretés',
        xpSuffix: 'XP',
        empty: 'Aucun succès ne correspond à vos filtres',
        navLabel: 'Succès',
    },
    notFound: {
        title: "🛡️ 404 - Page introuvable",
        subtitle: "Cette page n'existe pas.",
        description: "L'URL est incorrecte ou la page a été supprimée.",
        backBtn: "⬅️ Retour à l'accueil",
    }
}

export {
    COMMON,
}