// config/presets.js
export const PRESETS = {
    LANGUAGE: {
        baseClass: "skill-card language-card",
        titleKey: "name",
        descKey: "levelLabel",
        showStars: true
    },
    PROJECT: {
        baseClass: "project-card",
        titleKey: "title",
        descKey: "desc",
        showTags: true,
        imageKey: "thumbnail"
    },
    DESIGN: {
        baseClass: "design-card",
        titleKey: "caption",
        imageKey: "src"
    },
    LEARNING: {
        baseClass: "learning-card",
        titleKey: "title",
        descKey: "desc",
        isLink: true,
        linkKey: "href"
    }
};