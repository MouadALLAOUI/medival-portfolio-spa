import { MEDIA } from "./data/media.data";
// PAGES
import { HOME } from "./pages/home";
import { CRMEF } from "./pages/crmef";
import { BLOGS } from "./pages/blogs";
import { BLOG_POST } from "./pages/blogPost";
import { COMMON } from "./pages/common";
import { ACHIEVEMENTS } from "./pages/achievements";
import { SETTINGS } from "./pages/settings";
import { PROJECTS_PAGE } from "./pages/projectsPage";

// COMPONENTS
import { COMPONENTS } from "./components/components";

// DATA
import { CRMEF_LANDING } from "./data/crmef.landing";
import { CRMEF_SEMESTERS } from "./data/crmef.semesters";
import { BLOGS_LEGACY } from "./data/blogs.legacy";
import { PROJECTS_LEGACY } from "./data/projects.legacy";
import { ABOUT_LEGACY } from "./data/about.legacy";
import { CONTEXT_MENU_LEGACY } from "./data/contextMenu.legacy";
import { PROJECTS_DATA } from "./data/projects.data";
import { BLOGS_DATA } from "./data/blogs.data";
import { SKILLS_DATA } from "./data/skills.data";
import { DESIGNS_DATA } from "./data/designs.data";
import { HOBBIES_DATA } from "./data/hobbies.data";
import { LEARNING_DATA } from "./data/learning.data";
import { SEMESTERS_LEARNED } from "./data/crmef.semestersLearned";
import { CRITIQUE_DATA } from "./data/crmef.critique";
import { MSP_DATA } from "./data/crmef.msp";
import { VIDEOS_DATA } from "./data/crmef.videos";
import { PEOPLE_NAME } from "./data/people";

const EN = {
    HOME,
    CRMEF,
    BLOGS,
    BLOG_POST,
    COMMON,
    COMPONENTS,
    ACHIEVEMENTS,
    SETTINGS,
    PROJECTS_PAGE,
    CRMEF_LANDING,
    CRMEF_SEMESTERS,
    blogs: BLOGS_LEGACY,
    projects: PROJECTS_LEGACY,
    about: ABOUT_LEGACY,
    contextMenu: CONTEXT_MENU_LEGACY,
    DATA: {
        projects: PROJECTS_DATA,
        blogs: BLOGS_DATA,
        skills: SKILLS_DATA,
        designs: DESIGNS_DATA,
        hobbies: HOBBIES_DATA,
        learning: LEARNING_DATA,
        semestersLearned: SEMESTERS_LEARNED,
        critique: CRITIQUE_DATA,
        msp: MSP_DATA,
        videos: VIDEOS_DATA,
    },
    MEDIA,
    PEOPLE: PEOPLE_NAME,
}

export {
    EN,
}