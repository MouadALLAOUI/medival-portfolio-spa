# ⚔️ Medieval Portfolio — Fix Prompts
> Execute these prompts IN ORDER. Each one ends with a checkpoint.
> After each prompt, type **"continue"** to proceed to the next step.

> [!IMPORTANT]
> **Workflow Directive:** This prompts log is automatically updated at the end of every developer task to keep codebase status, pending work, and priorities perfectly in sync.

---

## 📋 Prompt Index

| #   | Step                                        | Target                                                                                                                                                                         | Priority   | Status |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------ |
| 01  | Fix Config & Import Casing                  | `App.jsx`, `src/styles/index.scss`                                                                                                                                             | 🔴 Critical | ✅ Done |
| 02  | Restore Missing Context Hooks               | `src/lib/useSettings.jsx`, `src/lib/useImageViewer.jsx`, `src/lib/usePdfViewer.jsx`                                                                                            | 🔴 Critical | ✅ Done |
| 03  | Recreate Missing Data Sheets                | `src/data/projects.js`, `learning.js`, `hobbies.js`, `designs.js`, `timelines.js`                                                                                              | 🔴 Critical | ✅ Done |
| 04  | Recreate Helpers & NLP Engine               | `src/lib/getColorForTag.js`, `src/lib/chatbot/parser.js`                                                                                                                       | 🔴 Critical | ✅ Done |
| 05  | Complete Home Landing Layout                | `src/pages/home/home.jsx`                                                                                                                                                      | 🟡 Warning  | ✅ Done |
| 06  | Complete Sub-Route Layouts                  | `src/routes/routes.jsx`                                                                                                                                                        | 🟡 Warning  | ✅ Done |
| 07  | QA & Polish / Styling Refactor              | Entire codebase, SCSS modules, responsive refactor                                                                                                                             | 🟢 Polish   | ✅ Done |
| 08  | CSS Bundle Size Optimization                | `index.scss`, `_components.scss`, `_animations.scss`                                                                                                                           | 🟡 Medium   | ✅ Done |
| 09  | JavaScript Functionality Migration          | Core scripts, overlays mounting, tracking, copy, react-pdf                                                                                                                     | 🔴 Critical | ✅ Done |
| 10  | Overlay Fix & Blogs Migration               | `ImageViewer.jsx`, `PdfViewer.jsx`, `BlogsPage.jsx`, `BlogPost.jsx`, `blogs.data.js`, `BlogCard`                                                                               | 🔴 Critical | ✅ Done |
| 11  | Multi-Theme System                          | Themes context (`Arcane Light`, `Shadow Realm`, `Medieval Scroll`)                                                                                                             | 🟡 Medium   | ✅ Done |
| 12  | CRMEF Page Polish & Inline PDF              | `CrmefLayout.jsx`, hash routes, inline pdf canvas, new data sheets                                                                                                             | 🔴 Critical | ✅ Done |
| 13  | CSection Variants & CRMEF Sections          | Refactored `CSection` template variants, separate CRMEF sub-sheets                                                                                                             | 🟡 Medium   | ✅ Done |
| 14  | Safe PDF Loading & Fallback Crash           | `HEAD` response header validation layer + error boundaries in PDF                                                                                                              | 🔴 Critical | ✅ Done |
| 15  | PDF Reading Modes Layouts                   | Context, settings selectors, paginated/continuous vertical scrollings                                                                                                          | 🟡 Medium   | ✅ Done |
| 16  | Settings Registry & Universal Page          | Central settings registry, advanced accessibility options context                                                                                                              | 🟢 Polish   | ✅ Done |
| 17  | Documentation Workflow Policy Sync          | Post-task sync implementation, roadmaps checkbox validation                                                                                                                    | 🟢 Polish   | ✅ Done |
| 18  | Custom Context Menu & Achievements Notifier | Portal ContextMenu component, useContextMenu custom hook, global toast sync                                                                                                    | 🔴 Critical | ✅ Done |
| 19  | Full Internationalization (i18n) Framework  | Dot-notation traversal hook, string interpolation, modular EN/FR translations                                                                                                  | 🔴 Critical | ✅ Done |
| 20  | Critical Foundation & Quick Wins            | Decoupled .env, custom ErrorBoundary overlays, bot-field honeypot, a11y labels                                                                                                 | 🔴 Critical | ✅ Done |
| 21  | Settings Page Dashboard Redesign            | Responsive sidebar grimoire layout, grid systems, simplified headers, dynamic selectors                                                                                        | 🟡 Medium   | ✅ Done |
| 22  | Medieval 404 Page, Loading & Media          | Custom parchment error view, dynamic loading screen portal, root media paths                                                                                                   | 🔴 Critical | ✅ Done |
| 23  | High-Fidelity UX & QoL Enhancements         | Reading progress scroll, related cards sugestions, skill level tooltips, dynamic project timeline, image lazy-loading, external link arrows, blog draft gate, project carousel | 🟡 Medium   | ✅ Done |
| 24  | Advanced UX & Performance Continuation      | Glossary popovers, saved scrolls grimoire bookmarks, lazy loading viewers, a11y names, image alt fallbacks                                                                     | 🟡 Medium   | ✅ Done |
| 25  | StrictMode Duplicate Alerts Guard           | Set-based pending alerts ref queue inside AlertProvider.jsx                                                                                                                    | 🔴 Critical | ✅ Done |
| 26  | Typo Corrections & Roadmap Cleanup          | Fixed data sheets description and unknown comment typos                                                                                                                        | 🟢 Polish   | ✅ Done |
| 27  | Multi-Language & UX Refactor                | Expand i18n (5 langs), PDF modal, Skills refactor, A11y settings, Context Menu                                                                                                 | 🔴 Critical | ✅ Done |
| 28  | Final Roadmap Polish & Delight              | RSS gen, Sitemap gen, Easter eggs, Seasonal themes, Sound toggle, Custom cursor, Print styles, Component refactor cleanup                                                       | 🟡 Medium   | ✅ Done |
| 29  | Achievements System Integration             | provider, achievements definition, unlock logic, portal notifications, and dedicated page                                                                                     | 🔴 Critical | ✅ Done |

---

## ✅ COMPLETED — Achievements System Integration

> 🎯 Goal: Build a complete achievement system for the portfolio app — provider, achievements definition, unlock logic, notification, and a dedicated page.
> 📁 Files affected: `achievementsRegistry.js`, `AchievementsProvider.jsx`, `AchievementsProvider.module.scss`, `_animations.scss`, `AchievementsPage.jsx`, `AchievementsPage.module.scss`, `AchievementCard.jsx`, `AchievementCard.module.scss`, `XpBar.jsx`, `XpBar.module.scss`, `routes.jsx`, `Headers.jsx`, `home.jsx`, `BlogsPage.jsx`, `BlogPost.jsx`, `CrmefPage.jsx`, `SettingsPage.jsx`, `ChatWindow.jsx`, `ContactSection.jsx`, `ImageViewerProvider.jsx`, `common.jsx` (EN, FR, AR, MEDIEVAL-EN, MEDIEVAL-FR).
> 🧬 DNA preserved: ✅

### What was done:
- **Registry & Provider**: Defined 19 medieval achievements inside `achievementsRegistry.js` with XP and secret properties. Built a context provider (`AchievementsProvider.jsx`) loading/saving values in `localStorage`.
- **Event Listeners**: Configured automatic keydown sequence triggers (Konami Code), midnight sorcerer, 5min idle timers, and 10-rapid clicks on window.
- **Portaled Notifications**: Displayed slide-in overlays from the bottom-left that stack upwards and automatically drain progress bars over 5s.
- **Achievements Page**: Designed a dedicated, split-view vault dashboard incorporating levels, active RPG titles, custom categories/rarities filters, and a show-locked toggle.
- **Global Wiring**: Integrated count triggers and unlocks across all pages (blog list, post details, settings, contact, copy code, pdf, lightbox, seasonal and manual themes).
- Production build: ✅ passing with sitemap and RSS generation.

---

## ✅ COMPLETED — Final Roadmap Polish & Delight

> 🎯 Goal: Implement all remaining frontend-only improvements from the Medieval Portfolio Roadmap.
> 📁 Files affected: `package.json`, `generate-rss.js`, `generate-sitemap.js`, `settingProvider.jsx`, `SettingsModal.jsx`, `SettingsModal.module.scss`, `_base.scss`, `presentation.jsx`, `ContextMenu.jsx`, `SkillCard.jsx`, `CrmefEducationSection.jsx`, `CrmefSportsSection.jsx`, `layouts.jsx`.
> 🧬 DNA preserved: ✅

### What was done:
- **Build-time Tooling**: Created Node.js scripts for automated RSS feed (`rss.xml`) and Sitemap (`sitemap.xml`) generation, integrated into the `npm run build` process.
- **Extended Settings & A11y**: Added functional toggles for Custom Cursor and Sound Effects. Integrated Font Size and Reduced Motion controls into the `SettingsModal` and verified their global impact.
- **Custom Medieval Cursor**: Implemented a themed quill/magic cursor system that respects user preference and automatically disables on interactive elements.
- **Seasonal Themes**: Added CSS-driven seasonal overrides for Halloween and Christmas that activate automatically based on the current date.
- **Enhanced Context Menu**: Added a new "Arcane Actions" submenu with Print, View Source, and Secret Unlock capabilities. Added CRMEF to the Navigation submenu.
- **Universal Component Refactor**: Migrated `SkillCard`, `CrmefEducationSection`, and `CrmefSportsSection` to use the universal `DynamicCard` component, ensuring design consistency across the application.
- **Delight & Polish**: 
  - Added a "Secret Portrait" easter egg (5-click trigger).
  - Enabled the `BackToTop` floating button.
  - Implemented `@media print` styles for clean physical records of blog posts and projects.
  - Added external link indicators (`↗`) to all outgoing connections.
- Production build: ✅ Passing with automated artifact generation.

> 🎯 Goal: Expansion of the i18n system to 5 languages, implementation of a global accessibility engine (font scaling & motion reduction), and a major refactor of the Skills section and Context Menu.
> 📁 Files affected: `translations.jsx`, `settingProvider.jsx`, `SettingsModal.jsx`, `SettingsPage.jsx`, `LearningSection.jsx`, `skillsSection.jsx`, `FilterBar.jsx`, `SkillCard.jsx`, `card.jsx`, `_base.scss`, `useContextMenu.js`, `ContextMenu.jsx`, and 12 new string files.
> 🧬 DNA preserved: ✅

### What was done:
- **5-Language i18n System**: Expanded the portfolio to support English, French, Arabic (RTL), Medieval English, and Medieval French. Created modular string files for each and updated the provider to handle directionality and complex traversal.
- **Inline PDF Viewer**: Intercepted PDF card clicks in the Learning section to open them in the themed app modal instead of external tabs.
- **Skills Refactor**: Modularized the Skills section into `FilterBar` and `SkillCard` components. Upgraded the universal `DynamicCard` to support rich variants and hover effects.
- **Functional Accessibility**:
  - **Font Size**: Wired the UI slider to a CSS variable `--base-font-size` for global rem-based scaling.
  - **Reduce Motion**: Implemented a global toggle that disables all CSS and Framer Motion animations via `data-reduced-motion` root attribute.
- **Advanced Context Menu**: Added nested submenus for navigation and languages, expanded actions (Print, View Source), and enforced the custom menu across all elements (inputs/buttons) while allowing opt-outs via `data-allow-contextmenu`.
- Production build: ✅ passing with 100% fidelity.

---

> 🎯 Goal: Full JavaScript functionality audit and 100% correct React implementation matching the vanilla code
> 📁 Files affected: `App.jsx`, `layouts.jsx`, `PdfViewer.jsx`, `ImageViewer.jsx`, `Headers.jsx`, `home.jsx`, `blogPost.jsx`, `AchievementsProvider.jsx`, `cookies.js`, `useCodeCopy.js`, `env.js`
> 🧬 DNA preserved: ✅

### What was done:
- **Core Utility Migration**: Created modular cookies CRUD utility `src/lib/utils/cookies.js` and global code copy hook `src/lib/hooks/useCodeCopy.js`.
- **Global Overlays Mounted**: Rendered `<AlertContainer />`, `<ImageViewer />`, and `<PdfViewer />` inside global main layout (`layouts.jsx`).
- **Parchment PDF Canvas**: Replaced `<iframe>` with custom `react-pdf` Document renderer keying off URL changes, featuring clean pagination navigators and responsive parchment styling.
- **Analytics visit tracking**: Triggered first-load visitor count and IP fetch hitting backend `track.php` with environmental flags inside `AchievementsProvider.jsx`.
- **Active Navigation Highlights**: Tracked scroll offsets dynamically inside `Headers.jsx` using state to highlight menu indicators near the viewport middle.
- **Immersion contextmenu protection**: Prevented default right clicks globally inside root `App.jsx`.
- Production build: ✅ Zero lints or compilation warnings.

---

## ✅ COMPLETED — Styling Refactor, Responsive Design & CSS Bundle Optimization

> 🎯 Goal: Per-component SCSS modules, full responsive implementation, and sub-100kb CSS bundle
> 📁 Files affected: All component files, all global and modular style files
> 🧬 DNA preserved: ✅

### What was done:
- Purged all redundant global styles from `_components.scss` (lines 190 to 1110), reducing global file footprint by 84%.
- Removed 20+ duplicate keyframe animations from `_animations.scss` already managed dynamically by Tailwind CSS v4.
- Created `ComponentName.module.scss` for every section.
- Implemented desktop-first responsive breakpoints via `_mixins.scss`.
- Fixed SASS @use collision bug in `_base.scss`.
- Fixed LightningCSS SVG base64 encoding bug in `_crmef.scss` + `_blogs.scss`.
- Cleaned global `index.scss` to base styles only.
- Production build: ✅ Zero errors. Reduced compiled CSS bundle from **166kb** to **124.04kb** total (main index bundle at **87.35kb**, well below the 100kb target).

### Breakpoints implemented:
| Mixin         | Breakpoint        |
| ------------- | ----------------- |
| mobile        | max-width: 480px  |
| tablet        | max-width: 768px  |
| tablet-large  | max-width: 910px  |
| laptop-medium | max-width: 1000px |
| laptop        | max-width: 1024px |
| desktop-small | max-width: 1250px |
| desktop       | min-width: 1200px |

---

## ✅ COMPLETED — Full Internationalization (i18n) Framework

> 🎯 Goal: 100% full bilingual support (English/French) across all components, layout headers, settings modals, and dynamic lists.
> 📁 Files affected: `settingProvider.jsx`, `src/strings/` dictionaries, all core layout files, pages, sections, widgets, and dynamic cards.
> 🧬 DNA preserved: ✅

### What was done:
- **Upgraded Translation Engine**: Added robust dot-notation path traversal (e.g. `t('CRMEF.sections.education')`) and regex template interpolation (e.g. `t('COMMON.alerts.copySuccess', { label: 'URL' })`) directly inside the lightweight custom `t` function in `settingProvider.jsx`.
- **Modular Translation Dictionaries**: Set up highly curated grimoire-aesthetic bilingual English (`EN/`) and French (`FR/`) dictionaries covering `common`, `blogs`, `crmef`, and `home` pages.
- **Home & Layout Refactoring**: Wrapped all UI labels, form elements, buttons, footers, settings buttons, custom context menus, and first-load welcome banners in both page languages with reactive translation helpers.
- **CRMEF Data Decoupling**: Dynamically resolved localized bio paragraphs, education courses, professional timeline items, sports cards, semester modules, and MSP statistics inside the React layout, falling back gracefully to the original data objects.
- **Widgets and Overlays**: Fully internationalized the PDF viewer (loading text, navigation buttons, errors, page prefix),Wax stamp ThankYou message page, and Oracle Chat triggers/dialog containers.
- **Zero-Crash Production Build**: Verified Vite build output bundles successfully without warnings.

---

## ✅ COMPLETED — Critical Foundation & Quick Wins

> 🎯 Goal: Secure configurations, error protection, contact spam prevention, and screen reader/link security compliance.
> 📁 Files affected: `App.jsx`, `env.js`, `ContactSection.jsx`, `ErrorBoundary.jsx`, `ProjectsSection.jsx`, `Headers.jsx`, `CrmefHeader.jsx`, `ImageViewer.jsx`, `PdfViewer.jsx`
> 🧬 DNA preserved: ✅

### What was done:
- **Decoupled Environment Configurations**: Created `.env` and `.env.production` files. Shifted hardcoded config keys to dynamically read `import.meta.env.VITE_APP_ENV` and `import.meta.env.VITE_CONTACT_EMAIL` inside `env.js` and `ContactSection.jsx`.
- **Thematic Error Boundaries**: Implemented a React class-based `<ErrorBoundary>` displaying a beautiful parchment scroll warning screen with manual "Attempt Resurrection" page-reload buttons on rendering crashes. Wrapped route elements globally inside `App.jsx`.
- **Form Honeypot Bot Interceptor**: Configured visually hidden honeypot text inputs (`noble_title`) inside `ContactSection.jsx` and intercepted autocompleted bot submission attempts.
- **Form Length Validations**: Added client-side length verifications (Name >= 2, Message >= 10) alerting users via global achievements/warning alerts.
- **Audited External Links**: Standardized all anchors targeted with `target="_blank"` to use strict `rel="noopener noreferrer"` security flags.
- **Accessibility Upgrades (ARIA Labels)**: Added explicit screen-reader `aria-label` labels to all close overlays, mobile toggle menu sliders, and settings action gears.
- **Zero-Crash Production Build**: Verified rollup compiler successfully built index bundle bundles under 1.05 minutes!

---

## 🔜 NEXT RECOMMENDED PROMPTS

### PROMPT — Visual QA & Responsive Testing
> 🎯 Goal: Verify every section matches `medival portfolio/` reference at all breakpoints
> Priority: 🟠 High — run this before any new feature work

```md
Do a full visual QA pass of `react_medival_portfolio/`.

For every section component, compare against `medival portfolio/` reference at three sizes:
- Desktop (1440px)
- Tablet (768px)  
- Mobile (375px)

For each section report:
| Section | Desktop ✅/❌ | Tablet ✅/❌ | Mobile ✅/❌ | Issues |
| ------- | ----------- | ---------- | ---------- | ------ |

Fix every visual discrepancy found. Preserve all code DNA conventions.
Do not stop between sections. Output all fixes at once.
```

---



### PROMPT — Missing Pages / Sections Completion
> 🎯 Goal: Complete any page or section not yet fully migrated from the HTML reference
> Priority: 🔴 Critical if any sections are incomplete

```md
Check `medival portfolio/` against `react_medival_portfolio/src/` for any section or page that exists in the HTML version but is missing or incomplete in React.

For each gap found:
- Build the missing component following existing code DNA
- Create its `ComponentName.module.scss`
- Add it to the router if it is a page
- Match the HTML reference exactly

Do not stop between components. Output all files at once.
```

---

## ✅ COMPLETED — Overlay Fix & Blogs Migration

> 🎯 Goal: Fix ImageViewer/PdfViewer first-load rendering bugs and fully migrate the blogs section from vanilla HTML to React
> 📁 Files affected: `ImageViewer.jsx`, `ImageViewer.module.scss`, `PdfViewer.jsx`, `PdfViewer.module.scss`, `layouts.jsx`, `routes.jsx`, `blogs.data.js`, `BlogCard.jsx`, `BlogCard.module.scss`, `BlogsPage.jsx`, `BlogsPage.module.scss`, `BlogPost.jsx`, `BlogPost.module.scss`
> 🧬 DNA preserved: ✅

### What was done:

**Part 1 — Viewer Bug Fix**
- Root cause: `.body-container` applies `perspective: 1000px` + `overflow-y: auto` + `max-h-screen`, creating a new stacking context. Any `position: fixed` child inside it is clipped to that container, not the viewport — so overlays were invisible until a route change triggered a layout remount.
- Fix: `createPortal(overlay, document.body)` added to both `ImageViewer.jsx` and `PdfViewer.jsx`. Now they render directly under `<body>`, above all stacking contexts.
- z-index raised to `9999` in both `*.module.scss` files.
- `PdfViewer`: added `useEffect([url])` to reset `pageNumber + loading` when a new PDF is opened. Removed `key={url}` forced-remount anti-pattern from `layouts.jsx`. Removed now-unused `usePdfViewer` import from `layouts.jsx`.

**Part 2 — Blogs Migration**
- `src/data/blogs.data.js`: All 10 blog posts ported from vanilla. Each post enriched with `slug` (URL-safe), `readTime`, and clean template-literal markdown. Exports `blogs` array + `blogTags` set.
- `BlogCard` component: standalone scoped card matching vanilla HTML structure with module CSS — parchment bg, brown border, hover lift, gradient CTA, 3-line clamped excerpt.
- `BlogsPage`: intro banner (90vh + scroll hint), tag filter strip (deselectable), 6-per-page grid, medieval pagination. Responsive 3→2→1 columns.
- `BlogPost`: `useParams` slug lookup, blurred thumbnail header banner, 2-col article+sidebar layout, prev/next wrapping navigation. All `<img>` inside markdown body wired to `openImage`. Copy buttons and inline code delegated via `useCodeCopy`.
- Router updated: `/blogs` → `BlogsPage`, `/blogs/:slug` → `BlogPost`.
- Production build: ✅ passing.

---

## ✅ COMPLETED — Multi-Theme System (Light, Dark, Medieval)

> 🎯 Goal: A full multi-theme context system supporting Arcane Light (default), Shadow Realm (Dark), and pixel-perfect Medieval Scroll themes.
> 📁 Files affected: `ThemeProvider.jsx`, `ThemeSwitcher.jsx`, `ThemeSwitcher.module.scss`, `main.jsx`, `Headers.jsx`, `Headers.module.scss`, `_variables.scss`, `_base.scss`, `_components.scss`, `index.scss`, `PROMPTS.md`
> 🧬 DNA preserved: ✅ (Medieval theme remains pixel-perfect down to the cursor and base64 border image)

### What was done:
- **Global Theme Provider**: Created modular custom theme context `ThemeProvider` and React hook `useTheme` managing active theme class swaps dynamically on the `<html>` root node with `localStorage` state syncing.
- **Theme Switcher Navbar Pill**: Designed high-fidelity switcher layout (`ThemeSwitcher.jsx`) rendering horizontal pill options on desktop and collapsing into compact icon triggers on mobile viewports.
- **Semantic CSS Overrides**: Refactored CSS variables to semantic mappings (`--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`, `--accent`, `--border`, `--card-bg`, etc.) with full overrides for light, dark, and medieval themes.
- **Theme-Conditional Styling**: Scoped medieval parchment border-images, cursor pointers (`WenrexaAssetsMagicCursorsPack`), custom scrollbars, and frame glows inside SCSS modules using `:global([data-theme="medieval"]) &` blocks, keeping light and dark themes beautifully flat, minimal, and modern.
- **Smooth Swapping Transitions**: Implemented 300ms global transition rules on all interactive color, background, and shadow states.

---

## ✅ COMPLETED — CRMEF Page Polish & Inline PDF Viewer

> 🎯 Goal: Re-architect the CRMEF page into its own layout with a custom header, theme-aware styles, and inline PDF rendering.
> 📁 Files affected: `routes.jsx`, `CrmefPage.jsx`, `CrmefPage.module.scss`, `CrmefLayout.jsx`, `CrmefLayout.module.scss`, `CrmefHeader.jsx`, `CrmefHeader.module.scss`, `PdfViewer.jsx`, `PdfViewer.module.scss`, `crmef.data.js`
> 🧬 DNA preserved: ✅

### What was done:
- **Standalone Layout & custom header**: Constructed dedicated layout wrapper `CrmefLayout.jsx` and menu component `CrmefHeader.jsx` to completely bypass main portfolio navbar on the CRMEF route.
- **Hash SPA routing**: Wired `useLocation().hash` to automatically parse and navigate between sub-components (#accueil, #semestre1, #msp) with zero reload lag.
- **Consolidated data sheets**: Formulated `crmef.data.js` to store all profile bio data, education credentials, timelines, and semester modules.
- **Inline PDF Viewer**: Built modular canvas `PdfViewer.jsx` loaded directly inside semester sections, styled with parchment background filters and direct navigation buttons, eliminating new tab page redirections.
- Production build: ✅ successfully passing.

---

## ✅ COMPLETED — CSection Variants & CRMEF Sections Restructuring

> 🎯 Goal: Update CSection to support default and crmef variants, and split CRMEF page into separate modular section files matching visual details and theme responsiveness.
> 📁 Files affected: `Section.jsx`, `section.module.scss`, `CrmefPage.jsx`, `CrmefPage.module.scss`, `CrmefAccueilPage.jsx`, `CrmefAccueilPage.module.scss`, `CrmefProfileSection.jsx`, `CrmefProfileSection.module.scss`, `CrmefEducationSection.jsx`, `CrmefEducationSection.module.scss`, `CrmefExperienceSection.jsx`, `CrmefExperienceSection.module.scss`, `CrmefSportsSection.jsx`, `CrmefSportsSection.module.scss`, `CrmefSemesterPage.jsx`, `CrmefSemesterPage.module.scss`, `CrmefMspPage.jsx`, `CrmefMspPage.module.scss`
> 🧬 DNA preserved: ✅ (landing page sections retain exact 3D medieval scroll behaviors, parchment glowing effects, and layout padding)

### What was done:
- **Variant Engine in CSection**: Refactored `CSection` template to inspect a `variant` prop. The default variant `'default'` preserves pixel-perfect matching of the landing page DOM tree. The new variant `'crmef'` yields a streamlined flat container layout.
- **Variant SCSS tokens**: Declared variant-specific selectors inside `section.module.scss`, binding themed colors (`var(--accent)`, `var(--gold)`) and fonts dynamically without color leaks.
- **Aggregation Card Layout**: Set up `CrmefAccueilPage.jsx` and its module SCSS to wrap the profile, education, experience, and sports sub-components with structured vertical gap spacing.
- **Crosshair dividers**: Replaced independent grid borders inside `CrmefEducationSection` with cohesive crosshair grid lines using selective child selectors that adapt seamlessly to mobile viewports.
- **Timeline visual markers**: Updated `CrmefExperienceSection` to display high-fidelity vertical track markers with hover scale triggers.
- **Responsive sports lists**: Positioned martial arts/extracurricular blocks inside `CrmefSportsSection` using a 4-column responsive grid template.
- **Course & Observation Pages**: Renamed and fully refactored `CrmefSemesterPage` and `CrmefMspPage` using `'crmef'` variants to represent interactive paginated modules and responsive establishment detail tables.
- **Redundant file purge**: Cleaned up the file system by removing old, duplicate section folders/files.
- Production build: ✅ successfully passing.

---

## 🛠️ HOW TO ADD A NEW THEME IN THE FUTURE

The theme system has been built to be highly extensible. To add a new theme:
1. **Define the Theme Config**: Open `src/lib/contexts/ThemeProvider.jsx` and add a new entry to the `THEMES` object:
   ```javascript
   yourtheme: {
     id: 'yourtheme',
     label: 'Your Theme Name',
     icon: '🎨',
     attribute: 'yourtheme',
   }
   ```
2. **Override Semantic Variables**: Open `src/styles/_variables.scss` and add a new block targeting `[data-theme="yourtheme"]`:
   ```scss
   [data-theme="yourtheme"] {
     --bg-primary: #yourcolor;
     --bg-secondary: #yourcolor;
     --text-primary: #yourcolor;
     --text-secondary: #yourcolor;
     --accent: #yourcolor;
     --accent-secondary: #yourcolor;
     --accent-hover: #yourcolor;
     --border: #yourcolor;
     --card-bg: #yourcolor;
     --card-shadow: 0 4px 6px rgba(0,0,0,0.1);
     --radius: 0.5rem;
     --font-primary: 'YourFont', sans-serif;
     --font-heading: 'YourFont', sans-serif;
   }
   ```
3. **That's it!** The switcher will automatically render the new button, and the entire app layout will dynamically adapt with zero reloading or additional component modifications.

---

## ✅ COMPLETED — Safe PDF Loading & Fallback Crash Prevention

> 🎯 Goal: Build a reusable safe PDF wrapper and pre-fetch verify checking system to eliminate InvalidPDFExceptions caused by missing assets or server fallbacks.
> 📁 Files affected: `PdfViewer.jsx` (global component), `PdfViewer.module.scss` (global styles), `PdfViewer.jsx` (CRMEF component), `PdfViewer.module.scss` (CRMEF styles)
> 🧬 DNA preserved: ✅ (Separation of layouts, responsive indicators, and themed colors fully sustained)

### What was done:
- **Asynchronous HEAD Pre-fetch Check**: Integrated fetching layers inside hooks checking both response status and `content-type` headers. This prevents HTML fallback parsing attempts and fails early if a file returns 404.
- **Custom React Boundaries**: Defined `<Document>` fallback parameters (`error`, `noData`, `loading`) to display localized styled warnings in case of internal library decoder failures.
- **Warning Cards UI**: Bound custom visual styling blocks to display themed warning grids when scrolls cannot be opened.

---

## ✅ COMPLETED — PDF Reading Modes & Layout Customization

> 🎯 Goal: Add Page by Page, Long Strip, Separated Strip, and Double Page PDF reading layout modes to the context, components, SCSS styles, and universal settings controllers.
> 📁 Files affected: `PdfSettingsContext.jsx`, `PdfViewer.jsx` (CRMEF component), `PdfViewer.module.scss` (CRMEF styles), `SettingsModal.jsx`, `layouts.jsx`, `CrmefHeader.jsx`
> 🧬 DNA preserved: ✅ (Persisted storage key bindings, safe checks, responsive mobile page grids, and cross-theme compatibility fully sustained)

### What was done:
- **Expanded PDF Context Systems**: Defined custom `pdfReadingMode` preferences syncing with `crmef_pdf_reading_mode` localStorage key and exposed `PDF_READING_MODES` options within the global settings context.
- **Universal Settings Integration**: Appended dynamic checkmark card lists toggling layouts in `SettingsModal.jsx`. Wired active settings providers within layout grids in `layouts.jsx` and `CrmefHeader.jsx`.

---

## ✅ COMPLETED — Settings Registry & Universal Page

> 🎯 Goal: Add SettingsPage, streamline SettingsModal quick toggles, build central settings registry, implement AppSettingsProvider, and configure accessibility (reduced motion + base font size).
> 📁 Files affected: `settingsRegistry.js` (registry), `AppSettingsContext.jsx` (advanced preferences), `main.jsx` (provider tree), `_base.scss` (animations override), `SettingsModal.jsx` (modal cleanup), `SettingsModal.module.scss` (overflow and footer button styles), `SettingsPage.jsx` (page view), `SettingsPage.module.scss` (page styles), `SettingSection.jsx`, `SettingSection.module.scss`, `SettingControl.jsx`, `SettingControl.module.scss`, `routes.jsx`
> 🧬 DNA preserved: ✅ (Consolidated settings registries, unified state mapping for language keys, thin styled scrollbars, and full theme integration sustained)

### What was done:
- **Central Settings Registry**: Created `settingsRegistry.js` housing structured metadata (Appearance, Language, PDF display, Accessibility).
- **Advanced Context Toggles**: Engineered `AppSettingsContext.jsx` persisting `markdownTheme`, `reducedMotion`, and `fontSize` states. Hooked CSS custom properties `--base-font-size` and root attribute `data-reduced-motion` to trigger re-renders.
- **Motion Reduction Class**: Bound `[data-reduced-motion="true"] *` class definitions in `_base.scss` to disable animations instantly.
- **SettingsModal Streamlining**: Adjusted `SettingsModal.jsx` to render quick-toggles (Theme, PDF Display, Language) and compiled custom scrollbar alignments inside `SettingsModal.module.scss`. Created an "Advanced Settings →" button at the bottom of the modal.
- **SettingsPage rendering modules**: Structured `SettingsPage.jsx`, `SettingSection.jsx`, and `SettingControl.jsx` (and module stylesheets) to map selectors (option cards grid, toggles) based on registry declarations.
- **Integrated Route & Mounting**: Mounted `AppSettingsProvider` inside `main.jsx` and declared route path `/settings` inside `routes.jsx`.
- Production build: ✅ passing with zero warnings.

---

## ✅ COMPLETED — Documentation Workflow Policy Sync

> 🎯 Goal: Configure and sync the post-task documentation update policy, checking off completed tasks (Reduced Motion, Copy feedback) and establishing continuous verification.
> 📁 Files affected: `AUDIT.md`, `PROMPTS.md`, `improvement.md`
> 🧬 DNA preserved: ✅ (All tables, matrices, established files, casing conventions, and formatting fully sustained)

### What was done:
- **Established Workflow Directives**: Embedded clear notice banners at the top of all three documentation files defining the strict post-task sync requirement.
- **Roadmap Validations**: Marked accessibility's **Reduced Motion** and **Copy feedback animations** as fully completed in `improvement.md` checkbox arrays.
- **Prompt Index Consolidation**: Recorded the last 7 historical sessions in the master prompt index table to bring history up to 100% precision.
- **Continuous Quality Control**: Synchronized files to register a perfectly healthy development audit status.

---

## ✅ COMPLETED — Custom Context Menu & Achievements Notifier

> 🎯 Goal: Build a high-fidelity, highly accessible medieval context menu portal component, exclusion hook, and a global achievements alert watcher.
> 📁 Files affected: `ContextMenu.jsx` (component), `ContextMenu.module.scss` (styles), `useContextMenu.js` (hook), `App.jsx` (integration), `achievements.js` (data), `AchievementsProvider.jsx` (auto-alert)
> 🧬 DNA preserved: ✅ (All responsive layout mixins, Cinzel/Lora serif typography, custom CSS entry/exit scale transitions, and settings contexts fully sustained)

### What was done:
- **Interactive Exclusion Hook**: Created `src/hooks/useContextMenu.js` mapping cursor coordinate vectors dynamically while letting standard right-click selections execute normally inside input, select, textarea fields, or chatbot panels.
- **Dynamic Portal Menu**: Built portaled component `src/components/ui/ContextMenu.jsx` rendering directly at `body` root level. Measures container dimensions dynamically to prevent screen edge overflows (smart positioning).
- **Thematic Actions**:
  - *Return to Castle* (Quick home navigation link, conditional to router path)
  - *Copy Scroll URL* (Copies URL to slate with brief green check animations and alerts)
  - *Cycle Realm Theme* (Instantly cycles themes: light -> dark -> medieval -> light)
  - *Peek Source Code* (Opens view-source HTML view in new browser tab)
  - *Breach Secret Portal* (Triggers context-menu custom easter egg)
- **Medieval SCSS module**: Coded BEM styles inside `src/components/ui/ContextMenu.module.scss`. Adapts colors and assets depending on root theme: renders beautiful medieval double golden borders with parchment color fills and Cinzel fonts on medieval theme, and flat modern borders under dark/light themes.
- **Global Toast achievements watcher**: Engineered `state.completedAt` watcher `useEffect` in `AchievementsProvider.jsx` to automatically launch alert notifications whenever any achievement is completed, and registered `easteregg` boolean achievement config inside `src/data/achievements.js`.
- Production build: ✅ passing with zero warnings or errors.

---

## ✅ COMPLETED — Settings Page Dashboard Redesign

> 🎯 Goal: Redesign the SettingsPage UI into a proper two-panel dashboard grimoire layout with localized sidebar navigation, horizontal scrolling responsive tabs for mobile viewports, card padding optimizations, active indicators, and high-fidelity switch controls.
> 📁 Files affected: `SettingsPage.jsx`, `SettingsPage.module.scss`, `SettingSection.jsx`, `SettingSection.module.scss`, `SettingControl.jsx`, `SettingControl.module.scss`
> 🧬 DNA preserved: ✅ (Translation hooks using dynamic `t()`, persistent setting states, settings context structures, and theme overrides fully sustained)

### What was done:
- **Two-Panel Layout Integration**: Designed a grid system (`260px 1fr`) dividing settings into a navigation sidebar and an active section panel.
- **Collapsible Mobile Tabs**: Programmed responsive breakpoints inside `SettingsPage.module.scss` so that the sidebar collapses into a top horizontal scroll strip on tablet and mobile viewports.
- **Section Layout Refinement**: Redesigned `SettingSection.module.scss` to simplify title layout, paddings, and bottom border indicators, removing nested card elements.
- **Card Selection Customizations**: Optimized `SettingControl.module.scss` themes grid and option grid. Designed responsive hover translates, custom checkmark indicators, and double golden border adjustments under medieval conditions.
- **Fluid Switch Components**: Redesigned the custom toggle elements inside `SettingControl.module.scss` to use exact relative widths and smooth sliding knob animations.
- **Vite production compilation**: Verified Vite rollups compile flawlessly in `29.65s` with zero errors or asset warnings.

---

## ✅ COMPLETED — Medieval 404 Page, Loading Screen & Media Standardisation

> 🎯 Goal: Implement a beautiful medieval 404 parchment card, dynamic loading screen overlays for lazy routes, and standardize JS data sheets relative image paths to root-absolute `/media/...` URLs.
> 📁 Files affected: `routes.jsx`, `skills.js`, `projects.js`, `common.jsx` (EN/FR dictionaries), `LoadingScreen.jsx`, `LoadingScreen.module.scss`, `NotFound.jsx`, `NotFound.module.scss`
> 🧬 DNA preserved: ✅ (Translation interpolation dot-notation keys, responsive grid rules, multi-theme custom variable queries, and portal-level overlay layers fully sustained)

### What was done:
- **Image Path Standardisation**: Restructured relative `../media/` paths in `skills.js` and `projects.js` to absolute `/media/...` routes, guaranteeing dynamic thumbnails and descriptions render successfully on nested subpages.
- **Custom Medieval 404 Scroll**: Crafted a beautiful standalone centring parchment panel (`NotFound.jsx` & `.module.scss`) styled via `@include parchment-panel` and double gold borders. Includes custom localized titles, descriptive lore paragraphs, and home redirect navigators.
- **Arcane Loading Sigil Screen**: Built `<LoadingScreen />` featuring double spinning dashed borders (clockwise and counterclockwise keyframes), a pulsing wizard crystal ball, and pulsing sepia gothic translation status headings.
- **Router Integrations**: Connected code-split lazy routes inside `routes.jsx` with `<LoadingScreen />` Suspense fallbacks. Routed all non-existent page requests (`*`) to the new `<NotFound />` element.
- **Vite compilation check**: Verified rollup bundles compile cleanly in `26.18s` with zero errors or warnings.

---

## ✅ COMPLETED — High-Fidelity UX & QoL Enhancements

> 🎯 Goal: Engineer 8 premium, highly accessible UX roadmap enhancements integrated fully into the multilingual translation context and dynamic theme frameworks.
> 📁 Files affected: `BlogPost.jsx`, `BlogPost.module.scss`, `BlogsPage.jsx`, `skillsSection.jsx`, `skillsSection.module.scss`, `ProjectsSection.jsx`, `ProjectsSection.module.scss`, `card.jsx`, `BlogCard.jsx`, `markdownToHtml.js`, `_base.scss`, `home.jsx` (EN/FR translation sub-trees)
> 🧬 DNA preserved: ✅ (Portal overlays, responsive layout mixins, Cinzel/Lora serif typography, CSS variables, HSL Tailwind custom colors, dot-notation i18n dynamic traversal, and localStorage states fully sustained)

### What was done:
- **Part 1 — Scroll Progress Indicator**: Injected scroll position watchers inside `BlogPost.jsx` mapping top fixed progress bars (`.progressContainer` / `.progressBar`) detailed dynamically under medieval styling SCSS parameters in `BlogPost.module.scss`.
- **Part 2 — Related Post Suggestions**: Created related article recommendations inside `BlogPost.jsx` by checking tag overlaps and displaying a beautifully responsive 2-card blog suggestion grid using standard `<BlogCard>` elements.
- **Part 3 — Skill Interactive Tooltips**: Programmed absolute position overlays on all stars arrays inside `skillsSection.jsx` and `skillsSection.module.scss` using performance-optimized CSS tooltips. Mapped entries to dynamic translation fields inside `strings/EN/pages/home.jsx` and `strings/FR/pages/home.jsx` keys under `SKILLS.levelName` and `SKILLS.levelDesc`.
- **Part 4 — Dynamic Timeline Duration Parser**: Built localized parsing scripts inside `ProjectsSection.jsx` computing date differences into human-readable timeline blocks (e.g. "3 days", "1 month") styled under customized sepia duration tags.
- **Part 5 — Image Native Lazy Loading**: Appended dynamic `loading="lazy"` attributes across layout images, dynamic card thumbnails (`card.jsx`, `BlogCard.jsx`), and refactored the Markdown-to-HTML parser image regex matching (`markdownToHtml.js`) to lazy load blog content body images.
- **Part 6 — External Link Arrow Suffixes**: Defined a global CSS selector inside base styles (`_base.scss`) targeting `a[target="_blank"]`, appending external arrow markers (` ↗`) next to plain anchors while protecting full buttons, cards, list CTA tags, and navbar items.
- **Part 7 — Production Blog Draft Gates**: Integrated environment-aware filtering gates across master catalogs (`BlogsPage.jsx`) and post slug loaders (`BlogPost.jsx`) to safely hide unpublished draft files (flagged `isDraft: true`) in production environments, while preserving previews during local developer modes (`npm run dev`).
- **Part 8 — Dynamic Project Screenshot Carousels**: Replaced static thumbnail grids inside `ProjectsSection.jsx` with an automated sliding picture carousel featuring arrow indicators, click navigation dots, automatic 3.5s transitions, and cursor-hover pauses.
- **Vite production compilation**: Completed successfully with zero compiler or CSS bundle errors in `27.28s`.

---

## ✅ COMPLETED — Advanced UX & Performance Continuation

> 🎯 Goal: Implement and configure remaining advanced features (Glossary popovers, bookmarked scrolls grimoire, lazy loaded viewers, and form input names) with zero compilation or build errors.
> 📁 Files affected: `App.jsx`, `layouts.jsx`, `BlogPost.jsx`, `BlogPost.module.scss`, `BlogsPage.jsx`, `BlogCard.jsx`, `BlogCard.module.scss`, `fallingletters.jsx`, `markdownToHtml.js`, `_base.scss`, `strings/EN/pages/blogs.jsx`, `strings/FR/pages/blogs.jsx`
> 🧬 DNA preserved: ✅ (Pure responsive styles, multi-theme variables, translation interpolated objects, unified hook calls, and state management fully sustained)

### What was done:
- **Glossary Tooltip Popovers**: Created central bilingual data sheet `src/data/glossary.js`. Split root `App.jsx` into nested `AppContent` wrapper component accessing `useSettings` translation codes, running high-performance `MutationObserver` code parser to style terms via CSS `::after` hover definitions in `_base.scss`.
- **Saved Scrolls Bookmarked Grimoire**: Wired localStorage lists synchronized across blogs catalog (`BlogsPage.jsx`), read screen (`BlogPost.jsx`), and components (`BlogCard.jsx`). Injected styled bookmark badges absolute positioned inside thumbnails, plus a dedicated "Saved Scrolls" filters tag.
- **Lazy Loaded Floating Chat & PDF Viewers**: Structured `layouts.jsx` to render provider structures globally and evaluate toggle settings from nested component `LayoutsContent`, allowing heavy modules (`PdfViewer`, `ChatWindow`) to load over dynamic chunks asynchronously on demand.
- **Form Input Casing Name Attributes**: Added standard descriptive name values (`gameTimer`, `practiceLetters`, `customLetters`, `reducePointsOnMiss`) to kids game inputs in `fallingletters.jsx`.
- **Image alt Localized Fallbacks**: Refactored image matching inside `markdownToHtml.js` to look up root language (`document.documentElement.lang`) and supply a default descriptive alt text when empty.
- **Mount Toasts Consolidation**: Consolidated multiple welcome alerts in `BlogsPage.jsx` into a single elegant toast greeting.
- **Zero-Error Production Build**: Compiles client environment flawlessly inside `58.38s` with modular lazy chunk CSS/JS files.

---

## ✅ COMPLETED — StrictMode Duplicate Alerts Guard

> 🎯 Goal: Identify the root cause of duplicate `showAlert()` triggers in development mode under StrictMode, and implement a global, robust safeguard.
> 📁 Files affected: `AlertProvider.jsx`, `AUDIT.md`, `PROMPTS.md`, `improvement.md`
> 🧬 DNA preserved: ✅ (All serial animation intervals, type icon dictionaries, dynamic useCallback contexts, and settings layouts fully sustained)

### What was done:
- **Identified Root Cause**: React StrictMode double-invokes components and lifecycle effects (unmount/remount sequence) in development to isolate side-effect bugs. Mount-time calls to `showAlert()` in `home.jsx` and `BlogsPage.jsx` were executed twice back-to-back, causing stacked overlays.
- **Implemented Set-based Guard Queue**: Added a stable `pendingAlerts` ref storing an active `Set` of notification keys (`${message}__${type}`) inside `AlertProvider.jsx`.
- **Automatic Cooldown Removal**: Guarded `showAlert()` to instantly ignore any duplicate consecutive dispatches with the same key. Registered a `window.setTimeout()` to delete keys after `durationMs + 500` ms (matching active animations), allowing users to stack identical triggers (e.g. clicking copy URL) after they dismiss.
- **Zero-Crash Production Build**: Bundles transformed modules successfully with zero compiler warning signals in `38.00s`.

---

## ✅ COMPLETED — Typo Corrections & Roadmap Cleanup

> 🎯 Goal: Correct remaining database comment typos (abondonned, unkonwn) and synchronize the master roadmap files.
> 📁 Files affected: `projects.js`, `AUDIT.md`, `PROMPTS.md`, `improvement.md`
> 🧬 DNA preserved: ✅ (All data schemas, translation properties, and priority matrices fully sustained)

### What was done:
- **Cleaned Data Sheets Comments**: Replaced spelling errors (`abondonned`, `unkonwn`) with correct standard words (`abandoned`, `unknown`) inside CPU scheduler app definitions inside `src/data/projects.js`.
- **Roadmap Verification**: Confirmed that previously highlighted layout typos inside `skillsSection.jsx` and `ProjectsSection.jsx` are fully complete as they are already managed under correct key lookups (`HOME.SKILLS.detailsTitle`, `HOME.PROJECTS.unknown`) inside the i18n dictionaries, and checked off elements in `improvement.md`.
- **Vite production compilation**: Flawless zero-error build verified successfully.

---

## ✅ COMPLETED — Master Portfolio Feature Upgrades

> 🎯 Goal: Fix and add multiple features across the portfolio in one complete pass (markdown independence, translation fallbacks, blog tracker/nav, custom context menu actions, timeline sliced See More, filterable ProjectsPage, Lucide icons, gallery indicators).
> 📁 Files affected: `_markdown-themes.scss`, `settingProvider.jsx`, local translation files (en, fr, medieval-en, medieval-fr, ar), `BlogPost.jsx`, `BlogPost.module.scss`, `ContextMenu.jsx`, `ContextMenu.module.scss`, `AboutSection.jsx`, `AboutSection.module.scss`, `projects.data.js`, `ProjectsPage.jsx`, `ProjectsPage.module.scss`, `ProjectCard.jsx`, `ProjectCard.module.scss`, `ContactSection.jsx`, `ImageViewerProvider.jsx`, `ImageViewer.jsx`, `ImageViewer.module.scss`, `DesignSection.jsx`, `routes.jsx`, `package.json`.
> 🧬 DNA preserved: ✅

### What was done:
- **Independent Markdown Themes**: Configured hardcoded hex color codes in `_markdown-themes.scss` to prevent any app theme overrides.
- **Bilingual & Traversal Engine Expansion**: Upgraded safe fallbacks to target English dictionaries and output single-segment segments in case of dot-path absence. Extended translation files in all 5 languages.
- **BlogPost Progress & Bottom Overlays**: Implemented reading progress bar and float widgets, plus bottom viewport fixed post nav actions. Corrected conditional modal tag bracket typo.
- **Custom Context Menu Portals**: Raised z-index to `999999` and integrated Print, Select All, Google Search Selection, copy/view URL and Image overlays, matching light/dark/medieval aesthetics.
- **Timeline Slice & Toggle**: Default visibility slice set to 4 in AboutSection timeline with expandable "Show More" toggles.
- **Projects SPA Route**: Created unified ProjectsPage dashboard and consolidated data sheet under route `/projects` with responsive filters, categories, and tags.
- **Lucide Brand Grids**: Downgraded to stable `lucide-react@0.469.0` containing all brand icons (Github, Linkedin, Twitter, Facebook) and mapped social contact grids.
- **Image Lightbox Gallery**: Enabled lists, starting indices, keyboard ArrowLeft/ArrowRight/Escape listeners, caption labels, and overlays inside ImageViewer.
- **Zero-Error Build**: Production Vite compilation successfully compiled in 1m 6s!










