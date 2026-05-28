// common.jsx
const COMMON = {
    nav: {
        logoText: "Mouad du Code",
        home: "Château / Accueil",
        landing: "Aperçu du Royaume",
        projects: "Quêtes Technologiques",
        blogs: "Chambre des Chroniques",
        crmef: "Portail CRMEF",
        game: "Royaume du Dactylographie",
        settingsGear: "Ouvrir les paramètres",
        medieval: {
            hero: "Oracle",
            presentation: "L'Artisan",
            skills: "Parchemin des Compétences",
            projects: "Quêtes Tech",
            about: "Légende du Code",
            contact: "Envoyer un Corbeau",
            hobbies: "Hors du Code",
            design: "Forge du Design",
            languages: "Langues du Royaume",
        }
    },
    settings: {
        title: "Grimoire des Paramètres Arcaniques",
        subtitle: "Personnalise ton expérience du portfolio",
        backBtn: "← Retour",
        themeLabel: "Thème du Royaume",
        langLabel: "Langue / Parole",
        fontSizeLabel: "Taille de la Police du Scribe",
        motionLabel: "Sort de Mouvement (Animations)",
        motionActive: "Réduit (Calme)",
        motionNormal: "Pleine Magie (Animations)",
        advancedBtn: "⚙️ Paramètres Avancés",
        applyBtn: "Enregistrer les Incantations",
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
                title: "📄 Visualiseur PDF",
                description: "Mode d'ouverture et d'affichage des documents PDF"
            },
            accessibility: {
                title: "♿ Accessibilité",
                description: "Préférences de confort et d'accessibilité"
            }
        },
        keys: {
            theme: {
                label: "Thème du Royaume",
                description: "Choisis le style visuel général du portfolio",
                options: {
                    light: { label: "Lumière Arcanique", description: "Passer au thème Lumière Arcanique" },
                    dark: { label: "Royaume des Ombres", description: "Passer au thème Royaume des Ombres" },
                    medieval: { label: "Parchemin Médiéval", description: "Passer au thème Parchemin Médiéval" },
                    github: { label: "GitHub Classique", description: "Style développeur classique blanc et bleu" }
                }
            },
            markdownTheme: {
                label: "Style Markdown",
                description: "Style des articles de blog et du contenu markdown",
                options: {
                    default: { label: "Défaut", description: "Correspond au thème visuel actif" },
                    github: { label: "GitHub", description: "Markdown propre style GitHub" },
                    medieval: { label: "Parchemin Médiéval", description: "Style médiéval orné" }
                }
            },
            language: {
                label: "Langue de l'Interface",
                description: "Langue utilisée dans l'interface du portfolio",
                options: {
                    en: { label: "English", description: "" },
                    fr: { label: "Français", description: "" },
                    ar: { label: "العربية", description: "" },
                    'medieval-en': { label: "Medieval English", description: "" },
                    'medieval-fr': { label: "Français Médiéval", description: "" }
                }
            },
            pdfMode: {
                label: "Mode d'Ouverture",
                description: "Où les documents PDF s'ouvrent lorsqu'ils sont déclenchés",
                options: {
                    inline: { label: "Parchemin Intégré", description: "S'agrandit dans la page sous le déclencheur" },
                    modal: { label: "Portail Arcanique (Modal)", description: "S'ouvre dans une fenêtre flottante centrée" },
                    newWindow: { label: "Plan Extérieur (Nouvelle Fenêtre)", description: "S'ouvre dans un nouvel onglet du navigateur" }
                }
            },
            pdfReadingMode: {
                label: "Mise en Page de Lecture",
                description: "Disposition des pages dans le visualiseur PDF",
                options: {
                    paginated: { label: "Page par Page", description: "Naviguer une page à la fois" },
                    longStrip: { label: "Longue Bande", description: "Défilement vertical continu" },
                    separatedStrip: { label: "Bande Séparée", description: "Défilement avec séparateurs de pages clairs" },
                    doublePage: { label: "Double Page", description: "Deux pages côte à côte (bureau)" }
                }
            },
            animationLevel: {
                label: "Optimisation / Animations",
                description: "Calmer les esprits magiques (ajuster les animations)",
                options: {
                    light: { label: "Sort Léger", description: "Animations minimales, meilleure performance de défilement" },
                    normal: { label: "Sort Équilibré", description: "Transitions régulières, flux magique normal" },
                    heavy: { label: "Sort Puissant", description: "Animations complètes et particules magiques" },
                    ultra: { label: "Sort de Haute Magie", description: "Transitions d'animations fluides maximales" }
                }
            },
            fontSize: {
                label: "Taille de Police du Scribe",
                description: "Taille de police de lecture de base",
                options: {
                    small: { label: "Petite", description: "14px de base" },
                    medium: { label: "Moyenne", description: "16px de base (défaut)" },
                    large: { label: "Grande", description: "18px de base" }
                }
            }
        }
    },
    contextMenu: {
        navigateTitle: "Naviguer",
        navigateHome: "Retour au Château",
        copyUrl: "Copier l'URL du Parchemin",
        urlLabel: "URL du Parchemin",
        cycleTheme: "Changer de Thème du Royaume",
        printPage: "Imprimer le Parchemin",
        viewSource: "Regarder le Code Source",
        unlockAchievement: "Forcer le Portail Secret",
    },
    pdfViewer: {
        loading: "🔮 Déroulement du parchemin...",
        errorNotFound: "⚠️ Le parchemin demandé n'existe pas ou est introuvable.",
        errorCorrupted: "⚠️ Le parchemin n'a pas pu être déroulé ou est corrompu.",
        errorNoData: "Aucun parchemin spécifié.",
        previous: "← Précédent",
        next: "Suivant →",
        pagePrefix: "Page",
    },
    chatbot: {
        title: "Le Grand Oracle",
        placeholder: "Consulte l'Oracle sur la légende de Mouad...",
        send: "Consulter",
        triggerText: "Consulter l'Oracle",
        triggerAria: "Ouvrir le grimoire de l'Oracle",
        closeAria: "Fermer le grimoire de l'Oracle",
        suggestions: {
            whoIsMouad: "Qui est Mouad ?",
            listProjects: "Lister les projets",
            listCyberProjects: "Lister les projets de cybersécurité",
        },
        howToUseTitle: "Comment utiliser ce chatbot :",
        howToUseAsk: "Pose des questions :",
        howToUseAskDesc: "Sur le contexte ou des demandes générales concernant Mouad le Codeur",
        howToUseFollowUp: "Questions de suivi :",
        howToUseFollowUpDesc: "Le bot se souvient du contexte actif pour une continuation fluide",
        worthAsking: "Est-ce que ça vaut la peine de demander :",
        worthAskingDesc: "Oui ! Je me creuse la tête pour le construire — même s'il reste des améliorations à faire. Merci d'utiliser notre simple chatbot.",
        greeting: "Salutations, chercheur ! Je suis l'Oracle. Demande-moi tout ce que tu veux sur Mouad le Codeur et ses mystérieux pouvoirs de code.",
        underDevNotice: "Ce chatbot est encore en développement et en apprentissage. Merci pour ta compréhension.",
        context: "Contexte :",
        statParagraphs: "Paragraphes",
        statSentences: "Phrases",
        statEntities: "Entités",
    },
    alerts: {
        copySuccess: "{{label}} copié dans le grimoire ! ✅",
        copyFailed: "Le sort de copie a échoué ! 💀",
        pdfError: "Le parchemin demandé n'a pas pu être déroulé. Assure-toi que le fichier existe. 🗂️",
        welcomeHome: "Bienvenue dans mon palais, j'espère que tu trouveras ce que tu désires",
        chaosUnderDev: "ce portfolio est encore en développement, merci pour ta compréhension",
        projectsUnderDev: "la section actuelle en développement est projets",
        welcomeBack: "Bon retour, voyageur",
        themeAltered: "Royaume modifié en {{theme}} ! 🔮",
        portalAlreadyBreached: "Le Portail Secret a déjà été forcé ! 🛡️",
        dateUnknown: "Date inconnue",
        developmentAlertBar: "Bienvenue sur le portfolio de Mouad le Codeur ! Ce portfolio est encore en développement, merci pour ta compréhension.",
    },
    footer: {
        copyright: "© {{year}} Mouad le Codeur | Créé avec du code magique et des pixels enchantés",
        disclaimer: "Ce grimoire ne peut être copié sans la permission expresse du sorcier",
    },
    thankyou: {
        title: "📜 Ton Message a été Envoyé !",
        body: "Un corbeau a pris son envol avec tes mots, noble visiteur.\nJe lirai ton parchemin et te répondrai rapidement lorsque les étoiles seront alignées.",
        returnBtn: "⬅️ Retour aux Grandes Archives",
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
        title: "🛡️ 404 - Parchemin Perdu dans le Vide",
        subtitle: "Le parchemin que tu cherches a disparu de la bibliothèque du royaume.",
        description: "Peut-être que l'adresse est mal écrite, ou que la page a été incinérée par du feu de dragon. Vérifie tes coordonnées et réessaie, voyageur.",
        backBtn: "⬅️ Retour au Château",
    }
}

export {
    COMMON,
}