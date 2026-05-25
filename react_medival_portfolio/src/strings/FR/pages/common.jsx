const COMMON = {
    nav: {
        logoText: "Mouad le Codeur",
        home: "Château / Accueil",
        landing: "Aperçu du Fief",
        projects: "Quêtes Tech",
        blogs: "Chambre des Chroniques",
        crmef: "Portail CRMEF",
        game: "Royaume Dactylo",
        settingsGear: "Ouvrir le grimoire des réglages",
        medieval: {
            hero: "L'Oracle",
            presentation: "L'Artisan",
            skills: "Parchemin de Compétences",
            projects: "Quêtes Tech",
            about: "Lore du Code",
            contact: "Envoyer Corbeau",
            hobbies: "Au-delà du Code",
            design: "Forge du Design",
            languages: "Langues du Royaume",
        }
    },
    settings: {
        title: "Grimoire des Réglages",
        subtitle: "Personnalisez l'expérience de votre portfolio",
        backBtn: "← Retour",
        themeLabel: "Thème du Royaume",
        langLabel: "Langue / Parler",
        fontSizeLabel: "Taille de Police du Scribe",
        motionLabel: "Sort de Mouvement (Animations)",
        motionActive: "Réduit (Calme)",
        motionNormal: "Pleine Magie (Animations)",
        advancedBtn: "⚙️ Paramètres Avancés",
        applyBtn: "Sauvegarder les Incantations",
        closeBtn: "Fermer les réglages",
        sections: {
            appearance: {
                title: "🎨 Apparence",
                description: "Thème visuel et préférences d'affichage"
            },
            language: {
                title: "🌐 Langue",
                description: "Préférences linguistiques de l'interface"
            },
            pdf: {
                title: "📄 Lecteur PDF",
                description: "Comment ouvrir et afficher les documents PDF"
            },
            accessibility: {
                title: "♿ Accessibilité",
                description: "Préférences de confort et d'accessibilité"
            }
        },
        keys: {
            theme: {
                label: "Thème du Royaume",
                description: "Choisissez le style visuel global du portfolio",
                options: {
                    light: { label: "Arcane Lumineux", description: "Passer au thème Arcane Lumineux" },
                    dark: { label: "Royaume des Ombres", description: "Passer au thème Royaume des Ombres" },
                    medieval: { label: "Parchemin Médiéval", description: "Passer au thème Parchemin Médiéval" }
                }
            },
            markdownTheme: {
                label: "Style Markdown",
                description: "Comment le contenu des blogs et du markdown est stylisé",
                options: {
                    default: { label: "Par Défaut", description: "Correspond au thème visuel actif" },
                    github: { label: "GitHub", description: "Style markdown propre à la GitHub" },
                    medieval: { label: "Parchemin Médiéval", description: "Style orné médiéval" }
                }
            },
            language: {
                label: "Langue de l'Interface",
                description: "Langue utilisée à travers l'interface du portfolio",
                options: {
                    en: { label: "English", description: "" },
                    fr: { label: "Français", description: "" },
                    ar: { label: "العربية", description: "" }
                }
            },
            pdfMode: {
                label: "Mode d'Ouverture",
                description: "Où ouvrir les documents PDF",
                options: {
                    inline: { label: "Déroulement en ligne", description: "S'affiche directement dans la page sous le déclencheur" },
                    modal: { label: "Portail Arcane (Modale)", description: "S'ouvre dans une fenêtre flottante centrée" },
                    newWindow: { label: "Plan Extérieur (Nouvel Onglet)", description: "S'ouvre dans un nouvel onglet" }
                }
            },
            pdfReadingMode: {
                label: "Disposition de Lecture",
                description: "Comment disposer les pages à l'intérieur du lecteur PDF",
                options: {
                    paginated: { label: "Page par Page", description: "Naviguer une page à la fois" },
                    longStrip: { label: "Bande Continue", description: "Défilement vertical continu" },
                    separatedStrip: { label: "Bande Séparée", description: "Défilement avec séparateurs de pages" },
                    doublePage: { label: "Double Page", description: "Deux pages côte à côte (sur ordinateur)" }
                }
            },
            reducedMotion: {
                label: "Réduire les Mouvements",
                description: "Minimiser les animations sur l'ensemble du portfolio"
            },
            fontSize: {
                label: "Taille de Police",
                description: "Taille de lecture de base",
                options: {
                    small: { label: "Petite", description: "Base de 14px" },
                    medium: { label: "Moyenne", description: "Base de 16px (par défaut)" },
                    large: { label: "Grande", description: "Base de 18px" }
                }
            }
        }
    },
    contextMenu: {
        navigateHome: "Retourner au Château",
        copyUrl: "Copier l'URL du Parchemin",
        urlLabel: "L'URL du Parchemin",
        cycleTheme: "Changer le Thème du Royaume",
        viewSource: "Examiner le Code Source",
        unlockAchievement: "Forcer le Portail Secret",
    },
    pdfViewer: {
        loading: "🔮 Déroulement du parchemin...",
        errorNotFound: "⚠️ Le parchemin demandé n'existe pas ou est introuvable.",
        errorCorrupted: "⚠️ Le parchemin n'a pas pu être chargé ou est corrompu.",
        errorNoData: "Aucun parchemin spécifié.",
        previous: "← Précédent",
        next: "Suivant →",
        pagePrefix: "Page",
    },
    chatbot: {
        title: "Le Grand Oracle",
        placeholder: "Consultez l'Oracle sur l'histoire de Mouad...",
        send: "Consulter",
        triggerText: "Consulter l'Oracle",
        triggerAria: "Consulter le grimoire de l'Oracle",
        closeAria: "Fermer le grimoire de l'Oracle",
        suggestions: {
            whoIsMouad: "Qui est Mouad ?",
            listProjects: "Lister les projets",
            listCyberProjects: "Projets de cybersécurité",
        },
        howToUseTitle: "Comment utiliser ce chatbot :",
        howToUseAsk: "Posez des questions :",
        howToUseAskDesc: "Sur le contexte ou des questions générales sur Mouad le Codeur",
        howToUseFollowUp: "Questions de suivi :",
        howToUseFollowUpDesc: "L'Oracle se souvient du sujet actif pour une conversation fluide",
        worthAsking: "Est-ce que ça vaut le coup :",
        worthAskingDesc: "Oui ! Je me creuse les méninges pour le construire — même s'il reste des améliorations. Merci d'utiliser notre chatbot simple.",
        greeting: "Salutations, chercheur ! Je suis l'Oracle. Demandez-moi tout ce que vous voulez sur Mouad le Codeur et ses pouvoirs magiques.",
        underDevNotice: "Ce chatbot est encore en cours d'enchantement et d'entraînement. Merci de votre indulgence.",
        context: "Contexte :",
        statParagraphs: "Paragraphes",
        statSentences: "Phrases",
        statEntities: "Entités",
    },
    alerts: {
        copySuccess: "{{label}} copié dans le grimoire ! ✅",
        copyFailed: "Le sort de copie a échoué ! 💀",
        pdfError: "Le parchemin demandé n'a pas pu être déroulé. Assurez-vous que le fichier existe. 🗂️",
        welcomeHome: "Bienvenue dans mon palais, j'espère que vous y trouverez tout ce que vous désirez",
        chaosUnderDev: "ce portfolio est encore en cours d'enchantement, merci de votre indulgence",
        projectsUnderDev: "la section actuellement en développement est 'Projets'",
        welcomeBack: "Bon retour, voyageur",
        themeAltered: "Royaume altéré en {{theme}} ! 🔮",
        portalAlreadyBreached: "Le Portail Secret a déjà été forcé ! 🛡️",
        dateUnknown: "Date inconnue",
        developmentAlertBar: "Bienvenue sur le portfolio de Mouad le Codeur ! Ce portfolio est encore en cours d'enchantement, merci de votre indulgence.",
    },
    footer: {
        copyright: "© {{year}} Mouad le Codeur | Façonné avec du code magique et des pixels enchantés",
        disclaimer: "Ce grimoire ne peut être copié sans la permission expresse du sorcier",
    },
    thankyou: {
        title: "📜 Votre Message a été Envoyé !",
        body: "Un corbeau a pris son envol avec vos mots, noble visiteur.\nJe lirai votre parchemin et vous répondrai en toute hâte dès que les étoiles s'aligneront.",
        returnBtn: "⬅️ Retourner aux Grandes Archives",
    },
    notFound: {
        title: "🛡️ 404 - Parchemin Perdu dans le Néant",
        subtitle: "Le parchemin que vous cherchez s'est volatilisé de la bibliothèque royale.",
        description: "Peut-être l'adresse a-t-elle été mal orthographiée, ou la page a été incinérée par le feu d'un dragon. Vérifiez vos coordonnées et réessayez, voyageur.",
        backBtn: "⬅️ Retourner au Château",
    }
}


export {
    COMMON,
}
