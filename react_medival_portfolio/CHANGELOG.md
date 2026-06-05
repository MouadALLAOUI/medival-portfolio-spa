# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Comprehensive documentation (README, CONTRIBUTING, DEPLOYMENT, TROUBLESHOOTING)
- Environment variable documentation (`.env.example`)
- API documentation

### Changed
- Updated improvement roadmap with documentation tasks completed

## [1.0.0] - 2025

### Added
- **Core**: React 19 + Vite 8 + Tailwind CSS 4 setup
- **Routing**: React Router DOM v7 with lazy-loaded routes
- **Styling**: SCSS modules with medieval theme system (Light/Dark/Medieval)
- **i18n**: 5 languages (EN, FR, AR, Medieval EN, Medieval FR)
- **Components**: DynamicCard, BlogCard, ProjectCard, SkillCard, ChatWindow, PdfViewer
- **Pages**: Home, Blogs, Projects, Settings, Achievements, CRMEF, Falling Letters, Privacy, 404
- **Sections**: Hero, Presentation, Languages, Skills, Projects, Learning, Hobbies, Design, About, Contact
- **Achievement System**: XP tracking, localStorage persistence, toast notifications
- **Chatbot**: NLP parser with conversation history
- **Blog**: Markdown rendering, tag filtering, search, TOC, reading progress, social sharing
- **PDF Viewer**: Inline PDF rendering with medieval parchment styling
- **Mini-Game**: Falling Letters keyboard typing game
- **PWA**: Service worker with cache-first strategy, web app manifest
- **Keyboard Shortcuts**: Global hotkeys with help overlay (`Ctrl+K` search, `Esc` close)
- **Context Menu**: Custom medieval-themed right-click menu with submenus
- **Settings**: Two-panel dashboard grimoire layout with sidebar navigation
- **SEO**: Dynamic meta tags, Open Graph, Twitter cards, sitemap.xml, RSS feed
- **Accessibility**: Keyboard navigation, skip links, reduced motion support, ARIA labels
- **Performance**: Code splitting, lazy loading, bundle optimization, React Compiler
- **Security**: Error boundaries, CSP headers, security.txt, contact form honeypot

### Fixed
- Hardcoded environment configuration moved to proper env vars
- Image path inconsistencies standardized
- Contact form security (removed hardcoded email)
- Duplicate alert calls in StrictMode
- Typos in skills and projects sections
- Right-click disable replaced with custom context menu

### Removed
- Right-click context menu blocker (replaced with custom medieval menu)

---

## Version History Summary

| Version | Key Milestone |
|---|---|
| 1.0.0 | Full-featured medieval portfolio with all core functionality |
| Unreleased | Documentation overhaul |
