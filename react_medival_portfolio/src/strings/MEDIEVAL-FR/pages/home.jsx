// home.jsx
const HERO = {
    title: "Mouad du Code",
    subtitle: "Consulte l'Oracle sur la légende de Mouad",
    ariaLabel: "Ouvrir la chambre de l'Oracle",
    buttonText: "Consulter l'Oracle",
}

const PRESENTATION = {
    title: "Le Grimoire du Sorcier",
    subtitle: "🛡️ Le Chevalier du Royaume Numérique",
    portraitAlt: "Effigie de Mouad",
    greetings: "Salutations, voyageurs ! Je suis Mouad du Code, un tisseur de tapisseries numériques. Mon voyage a commencé dans les anciens scripts HTML, où j'ai appris à forger les bases du web.",
    tiredless: "Grâce à une étude infatigable, j'ai maîtrisé de nombreux outils arcaniques : les sorts élégants de JavaScript, les puissantes incantations de Python, et l'art flexible de React. Ce sont mon épée et mon bouclier contre les dragons de la complexité.",
    sworn: "En tant que chevalier dévoué au royaume, je défends un code propre, une architecture sécurisée et un design convivial. Ma mission est de forger des applications qui mêlent sagesse ancienne et technologie de pointe.",
    ongoing: "Lorsque je ne suis pas à la forge, je plonge dans des grimoires technologiques ou je partage mes connaissances avec des apprentis. Ma quête est éternelle — résoudre des problèmes concrets avec créativité et excellence.",
}

const LANGUAGES = {
    title: "Langues du Royaume",
    intro: "Langues que je parle + niveau :",
    arabic: "Arabe",
    french: "Français",
    english: "Anglais",
    native: "Natif / Bilingue",
    working: "Professionnel",
}

const SKILLS = {
    title: "Codex Arcanique des Compétences",
    intro: "Au fil des années d'étude arcanique, j'ai maîtrisé ces arts puissants :",
    introNote: "clique sur la carte ci-dessous pour plus de détails",
    general: "Générales",
    specialized: "Spécialisées",
    detailsTitle: "Description Détaillée",
    storyTitle: "Histoire Derrière le Sort",
    level: "Niveau du Sort : {{level}} / 5",
    levelName: {
        1: "Apprenti",
        2: "Compagnon",
        3: "Adepte",
        4: "Expert",
        5: "Archimage",
    },
    levelDesc: {
        1: "Novice — Compréhension fondamentale et capacités de base pour les quêtes.",
        2: "Initié — À l'aise avec les tâches courantes et la sorcellerie mineure.",
        3: "Adepte — Capable d'entreprises indépendantes standard et de travaux sur mesure.",
        4: "Spécialiste — Compréhension approfondie des mécanismes avancés et de l'architecture.",
        5: "Archimage — Maîtrise parfaite et architecte de systèmes grandioses.",
    },
    radarTitle: "📊 Graphique des Capacités Arcaniques",
    radarFooter: "Aperçu visuel de toutes les compétences combinées",
    general_frontend: "Frontend",
    general_backend: "Backend",
    general_ai: "Invocation d'IA",
    general_solving: "Résolution de Problèmes",
    general_mobile: "Applications Mobiles",
    general_code: "Gardes du Code",
}

const PROJECTS = {
    title: "Quêtes Technologiques",
    subtitle: "Chroniques de forge numérique et de quêtes système.",
    introNote: "clique sur la carte ci-dessous pour plus de détails",
    viewQuest: "Entreprendre la Quête",
    technologies: "Runes Maniées",
    role: "Position",
    details: "Détails du Journal de Quête",
    siteLink: "Visiter le Royaume",
    codeLink: "Examiner le Grimoire",
    back: "Retour aux Quêtes",
    intro: "Aperçu de la Quête",
    features: "Fonctionnalités Enchantées",
    gallery: "Artéfacts Visuels (Galerie)",
    links: "Connexions du Royaume (Liens)",
    unknown: "Époque Inconnue",
}

const ABOUT = {
    title: "Légende du Code",
    subtitle: "Chroniques de mon voyage à travers les royaumes des développeurs.",
    readMore: "Développer les Chroniques",
    readLess: "Réduire les Chroniques",
    philosophy: "Je crois que le code est une forme de magie qui transforme les idées en réalité. J'aborde chaque projet avec précision, créativité et engagement envers l'excellence.",
    timelines: {
        1: {
            title: "Les Années d'Apprentissage",
            desc: "J'ai commencé mon voyage en apprenant les anciens scripts HTML et CSS.",
            detailledDesc: "Durant ces premières années, j'ai exploré les arts mystiques du design web, maîtrisant les sorts fondamentaux d'HTML et CSS."
        },
        2: {
            title: "L'Année du Débogueur",
            desc: "J'ai maîtrisé les incantations JavaScript et vaincu d'innombrables bugs.",
            detailledDesc: "Pendant cette période, j'ai perfectionné mes compétences en JavaScript, apprenant à déboguer des problèmes complexes et à optimiser les performances."
        },
        3: {
            title: "L'Âge du Chiffrement",
            desc: "J'ai forgé des communications sécurisées avec des sorts PGP et créé des gardes de sécurité.",
            detailledDesc: "À cette époque, je me suis concentré sur la cybersécurité, apprenant à protéger mes créations numériques contre les forces obscures."
        },
        4: {
            title: "L'Ère de l'Invocation d'IA",
            desc: "J'ai invoqué des entités intelligentes grâce aux rituels d'apprentissage automatique.",
            detailledDesc: "Je me suis aventuré dans le royaume de l'intelligence artificielle, explorant les algorithmes d'apprentissage automatique et les réseaux de neurones."
        }
    }
}

const CONTACT = {
    title: "Envoyer un Corbeau",
    desc: "Recherche mon conseil ou propose une alliance via ces canaux mystiques :",
    nameLabel: "Ton Noble Nom",
    namePlaceholder: "Entre ton noble nom",
    emailLabel: "Adresse du Pigeon",
    emailPlaceholder: "Dans quel royaume le corbeau doit-il se rendre ?",
    messageLabel: "Ton Message Scellé",
    messagePlaceholder: "Inscris ton message ici...",
    submit: "Sceller & Envoyer le Corbeau",
    connectionsTitle: "Connexions de Guilde",
    connectionsDesc: "Cherche-moi dans ces royaumes numériques où je partage mon savoir arcanique :",
    deliveryTitle: "Livraison par Corbeau",
    deliveryDesc: "Pour les affaires urgentes, envoie un corbeau à :",
    success: "Corbeau envoyé avec succès ! 🦅",
    error: "Corbeau perdu en transit, réessaie ! 💀",
}

const LEARNING = {
    title: "Grimoire d'Apprentissage",
    intro: "Matériels d'apprentissage que j'ai créés (PDF, diapositives et parchemins d'étude) :",
}

const HOBBIES = {
    title: "Hors du Code",
    desc: "Ce que je fais en dehors de la programmation — des habitudes qui aiguisent l'esprit.",
}

const DESIGN = {
    title: "La Forge du Design",
    desc: "Artéfacts Figma et Canva — maquettes d'interface et parchemins visuels forgés pour de vraies quêtes.",
}

const HOME = {
    HERO,
    PRESENTATION,
    LANGUAGES,
    SKILLS,
    PROJECTS,
    LEARNING,
    HOBBIES,
    DESIGN,
    ABOUT,
    CONTACT,
}

export {
    HOME,
}