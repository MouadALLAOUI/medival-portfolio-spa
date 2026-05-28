import { HOME } from "./pages/home";
import { CRMEF } from "./pages/crmef";
import { BLOGS } from "./pages/blogs";
import { COMMON } from "./pages/common";
import { CRMEF_LANDING } from "./data/crmef.landing";
import { CRMEF_SEMESTERS } from "./data/crmef.semesters";

const MEDIEVAL_FR = {
    HOME,
    CRMEF,
    BLOGS,
    COMMON,
    CRMEF_LANDING,
    CRMEF_SEMESTERS,
    blogs: {
        title: "Les Chroniques du Scribe",
        subtitle: 'Bienvenue, Voyageur !',
        allScrolls: 'Tous les Parchemins',
        readScroll: 'Lire le Parchemin',
        minRead: 'min de lecture',
        post: {
            scrollStats: 'Progression du Parchemin',
            wordsRead: 'mots déchiffrés',
            timeLeft: 'sabliers restants',
            backToBlogs: 'Retourner aux Chroniques',
            nextPost: 'Dérouler le Prochain Parchemin',
            prevPost: 'Retourner au Parchemin Précédent',
            publishedOn: 'Griffonné le',
            dayOf: 'Jour de',
            year: 'An',
            at: 'à l\'heure de',
            tags: 'Sceaux',
            readTime: 'sabliers de lecture',
            tableOfContents: 'Carte du Parchemin',
        }
    },
    projects: {
        title: 'Hauts Faits',
        subtitle: 'Quêtes légendaires et reliques enchantées',
        searchPlaceholder: 'Rechercher des exploits...',
        filterAll: 'Toutes les Quêtes',
        noResults: 'Nul exploit ne correspond',
        viewProject: 'Inspecter l\'Exploit',
        viewCode: 'Examiner les Runes',
        liveDemo: 'Observer la Vision',
        readMore: 'Dérouler l\'Aperçu de la Quête',
        backToProjects: 'Retourner aux Quêtes',
        notFoundTitle: 'Registre de Quêtes Introuvable',
        notFoundText: 'Cette chronique n\'a pas encore été rédigée ou a été perdue dans les archives.',
        clickToEnlarge: 'Inspecter la Relique',
        featuredQuest: 'Quête En Vedette',
        questYear: 'Inscrit en l\'an',
        specSheet: 'Spécifications de la Quête',
        statusLabel: 'Statut de la Quête',
        categoryLabel: 'Classification',
        relics: 'Reliques Enchantées',
        questOverview: 'Aperçu de la Quête',
        detailedChronicle: 'Chronique Détaillée',
        prevQuest: 'Quête Précédente',
        nextQuest: 'Quête Suivante',
        allQuests: 'Toutes les Quêtes',
        categories: {
            web: 'Citadelles Web',
            app: 'Reliques Mobiles & Bureau',
            tool: 'Outils Alchimiques',
        },
        status: {
            completed: 'Achevée',
            'in-progress': 'En Cours',
            archived: 'Archivée',
        },
    },
    about: {
        showMore: 'Révéler plus de Grimoires',
        showLess: 'Refermer le Grimoire',
    },
    contextMenu: {
        copy: 'Transcrire le Parchemin',
        copyLink: 'Recopier le Lien du Sceau',
        openInNewTab: 'Scryer dans un Nouveau Miroir',
        search: 'Chercher via l\'Oracle',
        share: 'Expédier par Faucon',
        inspect: 'Inspecter les Sortilèges',
        back: 'Battre en Retraite',
        forward: 'Aller de l\'Avant',
        reload: 'Ré-invoquer la Vision',
        print: 'Graver sur Vélin',
        selectAll: 'Saisir toutes les Runes',
        saveAs: 'Conserver dans la Crypte',
    }
}

export {
    MEDIEVAL_FR,
}
