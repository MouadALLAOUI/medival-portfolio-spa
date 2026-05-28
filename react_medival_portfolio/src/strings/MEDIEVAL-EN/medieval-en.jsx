import { MEDIA } from "./data/media.data";
import { HOME } from "./pages/home";
import { CRMEF } from "./pages/crmef";
import { BLOGS } from "./pages/blogs";
import { COMMON } from "./pages/common";
import { CRMEF_LANDING } from "./data/crmef.landing";
import { CRMEF_SEMESTERS } from "./data/crmef.semesters";

const MEDIEVAL_EN = {
    HOME,
    CRMEF,
    BLOGS,
    COMMON,
    CRMEF_LANDING,
    CRMEF_SEMESTERS,
    blogs: {
        title: "The Scribe's Chronicles",
        subtitle: 'Welcome, Traveler!',
        allScrolls: 'All Scrolls',
        readScroll: 'Read Scroll',
        minRead: 'min read',
        post: {
            scrollStats: 'Scroll of Progress',
            wordsRead: 'words unfurled',
            timeLeft: 'minutes remaining',
            backToBlogs: 'Return to the Chronicles',
            nextPost: 'Unfurl Next Scroll',
            prevPost: 'Return to Previous Scroll',
            publishedOn: 'Penned on the',
            dayOf: 'Day of',
            year: 'Year',
            at: 'at the hour of',
            tags: 'Glyphs',
            readTime: 'min read',
            tableOfContents: 'Map of Scroll',
        }
    },
    projects: {
        title: 'Tech Quests',
        subtitle: 'Legendary quests and enchanted artifacts',
        searchPlaceholder: 'Search quests...',
        filterAll: 'All Quests',
        noResults: 'No quests match your search',
        viewProject: 'View Quest',
        viewCode: 'View Rune Code',
        liveDemo: 'Scry Live Demo',
        readMore: 'Unfurl Quest Overview',
        backToProjects: 'Return to Quests',
        notFoundTitle: 'Quest Registry Missing',
        notFoundText: 'This chronicle has not been penned yet or was lost in the archives.',
        clickToEnlarge: 'Inspect Relic',
        featuredQuest: 'Featured Quest',
        questYear: 'Penciled in',
        specSheet: 'Quest Specification',
        statusLabel: 'Quest Status',
        categoryLabel: 'Classification',
        relics: 'Enchanted Relics',
        questOverview: 'Quest Overview',
        detailedChronicle: 'Detailed Chronicle',
        prevQuest: 'Previous Quest',
        nextQuest: 'Next Quest',
        allQuests: 'All Quests',
        categories: {
            web: 'Web Citadels',
            app: 'Mobile & Desktop Relics',
            tool: 'Alchemical Tools',
        },
        status: {
            completed: 'Achev\'d',
            'in-progress': 'In Progress',
            archived: 'Archiv\'d',
        },
    },
    about: {
        showMore: 'Unveil More Lore',
        showLess: 'Conceal Lore',
    },
    contextMenu: {
        copy: 'Transcribe Text',
        copyLink: 'Transcribe Scroll Link',
        openInNewTab: 'Scry in New Window',
        search: 'Seek in Google Portal',
        share: 'Send via Raven',
        inspect: 'Inspect Wards',
        back: 'Retreat',
        forward: 'Advance',
        reload: 'Re-summon Page',
        print: 'Inscribe Scroll to Paper',
        selectAll: 'Encompass All Glyphs',
        saveAs: 'Store Scroll',
    },
    MEDIA
}

export {
    MEDIEVAL_EN,
}
