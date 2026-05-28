import { HOME } from "./pages/home";
import { CRMEF } from "./pages/crmef";
import { BLOGS } from "./pages/blogs";
import { COMMON } from "./pages/common";
import { CRMEF_LANDING } from "./data/crmef.landing";
import { CRMEF_SEMESTERS } from "./data/crmef.semesters";

const FR = {
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
            scrollStats: 'Progression de Lecture',
            wordsRead: 'mots lus',
            timeLeft: 'min restantes',
            backToBlogs: 'Retour aux Chroniques',
            nextPost: 'Parchemin Suivant',
            prevPost: 'Parchemin Précédent',
            publishedOn: 'Publié le',
            dayOf: 'Jour de',
            year: 'Année',
            at: 'à',
            tags: 'Mots-clés',
            readTime: 'min de lecture',
            tableOfContents: 'Table des Matières',
        }
    },
    projects: {
        title: 'Quêtes Techniques',
        subtitle: 'Quêtes légendaires et artefacts enchantés',
        searchPlaceholder: 'Rechercher des quêtes...',
        filterAll: 'Toutes les Quêtes',
        noResults: 'Aucune quête ne correspond à votre recherche',
        viewProject: 'Voir la Quête',
        viewCode: 'Voir le Code',
        liveDemo: 'Démo en Direct',
        readMore: 'En savoir plus',
        backToProjects: 'Retour aux Quêtes',
        notFoundTitle: 'Registre de Quêtes Introuvable',
        notFoundText: 'Cette chronique n\'a pas encore été rédigée ou a été perdue dans les archives.',
        clickToEnlarge: 'Inspecter l\'Artéfact',
        featuredQuest: 'Quête En Vedette',
        questYear: 'Inscrit en',
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
            app: 'Reliques Bureau & Mobiles',
            tool: 'Outils Alchimiques',
        },
        status: {
            completed: 'Achevée',
            'in-progress': 'En Cours',
            archived: 'Archivée',
        },
    },
    about: {
        showMore: 'En Savoir Plus',
        showLess: 'En Savoir Moins',
    },
    contextMenu: {
        copy: 'Copier',
        copyLink: 'Copier le Lien',
        openInNewTab: 'Ouvrir dans un Nouvel Onglet',
        search: 'Rechercher la Sélection',
        share: 'Partager',
        inspect: 'Inspecter',
        back: 'Retour',
        forward: 'Suivant',
        reload: 'Recharger la Page',
        print: 'Imprimer la Page',
        selectAll: 'Tout Sélectionner',
        saveAs: 'Enregistrer Sous',
    }
}

export {
    FR,
}