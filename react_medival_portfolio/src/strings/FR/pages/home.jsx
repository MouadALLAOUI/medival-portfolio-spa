const HERO = {
    title: "Mouad le Codeur",
    subtitle: "Posez n'importe quelle question à l'Oracle sur Mouad",
    ariaLabel: "Ouvrir le chat de l'Oracle",
    buttonText: "Consulter l'Oracle",
}

const PRESENTATION = {
    title: "Le Grimoire du Mage",
    subtitle: "🛡️ Le Chevalier derrière le Code",
    portraitAlt: "Portrait de Mouad",
    greetings: "Salutations, compagnons de voyage du royaume numérique ! Je suis Mouad le Codeur, un artisan des temps modernes et un magicien des expériences virtuelles immersives. Mon périple a débuté dans les contrées anciennes du HTML, où j'ai appris à structurer les fondations du web — une discipline que je manie aujourd'hui avec la précision d'un maître forgeron.",
    tiredless: "Grâce à des études sans relâche et des quêtes menées à travers d'innombrables frameworks et langages, j'ai maîtrisé de nombreux outils magiques : les sortilèges élégants de JavaScript, les puissantes incantations de Python et l'art flexible de React. Ce sont mon épée et mon bouclier dans la bataille contre les dragons de la complexité.",
    sworn: "Tel un chevalier jurant de protéger le royaume, je me bats pour du code propre, des architectures sécurisées et des designs intuitifs. Qu'il s'agisse de quêtes solitaires ou aux côtés d'autres guerriers, ma mission est de forger des applications qui mêlent sagesse d'antan et technologies d'avant-garde — des créations durables.",
    ongoing: "Quand je ne forge pas de code, je plonge dans des grimoires technologiques, j'explore des outils inexplorés ou je transmets mes connaissances à des apprentis développeurs. Ma quête est infinie — résoudre des problèmes réels avec créativité, rigueur et excellence technique.",
}

const LANGUAGES = {
    title: "Langues du Royaume",
    intro: "Langues maîtrisées et compétences :",
    arabic: "Arabe",
    french: "Français",
    english: "Anglais",
    native: "Langue Maternelle / Bilingue",
    working: "Usage Professionnel",
}

const SKILLS = {
    title: "Codex des Compétences",
    intro: "Grâce à des années d'études arcaniques et de pratique mystique, j'ai maîtrisé ces arts puissants :",
    introNote: "cliquez sur une carte ci-dessous pour plus de détails",
    general: "Général",
    specialized: "Spécialisé",
    detailsTitle: "Description Détaillée",
    storyTitle: "Histoire de l'Enchantement",
    level: "Niveau de Magie : {{level}} / 5",
    levelName: {
        1: "Apprenti",
        2: "Compagnon",
        3: "Adepte",
        4: "Expert",
        5: "Maître",
    },
    levelDesc: {
        1: "Novice — Compréhension de base et compétences initiales de quête.",
        2: "Initiateur — Confortable avec les tâches courantes et les petits sorts.",
        3: "Adepte — Capable d'entreprises indépendantes et de travail sur mesure.",
        4: "Spécialiste — Compréhension approfondie des mécanismes et architectures complexes.",
        5: "Archimage — Commande absolue et architecte de grands systèmes.",
    },
    radarTitle: "📊 Diagramme de Capacités Arcaniques",
    radarFooter: "Vue d'ensemble visuelle de toutes les compétences combinées",
    general_frontend: "Front-end",
    general_backend: "Back-end",
    general_ai: "Invocation d'IA",
    general_solving: "Résolution de Problèmes",
    general_mobile: "Applications Mobiles",
    general_code: "Défenses de Code",
}

const PROJECTS = {
    title: "Quêtes Tech",
    subtitle: "Chroniques de forge numérique et quêtes de systèmes.",
    introNote: "cliquez sur une carte ci-dessous pour plus de détails",
    viewQuest: "Entreprendre la Quête",
    technologies: "Runes Utilisées",
    role: "Position",
    details: "Journal de Quête",
    siteLink: "Visiter le Royaume",
    codeLink: "Examiner le Grimoire",
    back: "Retourner aux Quêtes",
    intro: "Aperçu de la Quête",
    features: "Fonctionnalités Enchantées",
    gallery: "Artefacts Visuels (Galerie)",
    links: "Connexions au Royaume (Liens)",
    unknown: "Époque Inconnue",
}

const ABOUT = {
    title: "Chroniques du Lore",
    subtitle: "Chroniques de mon parcours à travers les royaumes du code.",
    readMore: "Déplier les Chroniques",
    readLess: "Replier les Chroniques",
    philosophy: "Je crois que le code est une forme de magie qui transforme les idées en réalité. Comme les mages d'antan qui concevaient soigneusement leurs sortilèges, j'aborde chaque projet avec précision, créativité et un engagement envers l'excellence. Ma mission est de créer des expériences numériques intuitives et enchanteresses, résolvant des problèmes réels tout en ravissant les utilisateurs par des interactions soignées et un design raffiné.",
    timelines: {
        1: {
            title: "Les Années d'Apprentissage",
            desc: "Début de mon voyage d'apprentissage des anciens scripts de HTML et CSS sous la tutelle de sages en ligne.",
            detailledDesc: "Au cours de ces premières années, j'ai plongé dans les arts mystiques du design web, maîtrisant les sorts fondamentaux de HTML et CSS. J'ai conçu mes premiers parchemins interactifs, apprenant à marier les styles et les structures."
        },
        2: {
            title: "L'Année du Débogueur",
            desc: "Maîtrise des incantations JavaScript et victoire sur d'innombrables bugs dans le domaine du développement frontend.",
            detailledDesc: "Durant cette période, j'ai affûté mes compétences en JavaScript, apprenant à déboguer des problèmes complexes et à optimiser les performances. Je suis devenu adepte de l'utilisation des outils de développement pour inspecter le DOM et dynamiser mes créations."
        },
        3: {
            title: "L'Âge du Chiffrement",
            desc: "Création de communications sécurisées à l'aide de clés PGP et élaboration de puissants boucliers de protection.",
            detailledDesc: "À cette époque, je me suis concentré sur la cybersécurité, apprenant à protéger mes créations numériques des forces de l'ombre. J'ai mis en œuvre des techniques de chiffrement et des protocoles de sécurité pour rendre mes applications résilientes."
        },
        4: {
            title: "L'Ère de la Conjuration d'IA",
            desc: "Invocation d'entités intelligentes à travers des rituels d'apprentissage automatique et des enchantements de réseaux neuronaux.",
            detailledDesc: "Je me suis aventuré dans le domaine de l'intelligence artificielle, explorant les algorithmes d'apprentissage et les réseaux de neurones. J'ai construit des modèles capables d'apprendre des données, rendant mes applications plus intelligentes et réactives."
        }
    }
}

const CONTACT = {
    title: "Envoyer un Corbeau",
    desc: "Demandez mon conseil ou proposez une alliance par ces voies mystiques :",
    nameLabel: "Votre Noble Nom",
    namePlaceholder: "Entrez votre noble nom",
    emailLabel: "Adresse de Pigeon",
    emailPlaceholder: "Où le corbeau doit-il faire son nid ? (votre e-mail)",
    messageLabel: "Votre Message Scellé",
    messagePlaceholder: "Inscrivez votre message ici...",
    submit: "Sceller & Envoyer le Corbeau",
    connectionsTitle: "Connexions de Guilde",
    connectionsDesc: "Retrouvez-moi dans ces contrées virtuelles où je partage mon savoir arcanique :",
    deliveryTitle: "Livraison par Corbeau",
    deliveryDesc: "Pour les affaires urgentes, dépêchez un corbeau à :",
    success: "Corbeau envoyé avec succès ! 🦅",
    error: "Corbeau perdu en chemin, réessayez ! 💀",
}

const LEARNING = {
    title: "Grimoire d'Apprentissage",
    intro: "Matériel d'étude et d'apprentissage que j'ai forgé (PDFs, diapositives, et parchemins d'étude) :",
}

const HOBBIES = {
    title: "Au-delà du Code",
    desc: "Ce que je fais en dehors de la programmation — des habitudes qui aiguisent l'esprit et gardent le mage ancré.",
}

const DESIGN = {
    title: "La Forge du Design",
    desc: "Maquettes Figma et Canva — ébauches d'interfaces, prototypes et parchemins visuels forgés pour de réelles quêtes.",
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