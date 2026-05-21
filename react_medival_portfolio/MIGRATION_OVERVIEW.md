# MIGRATION_OVERVIEW

## 1. Project Overview

### What this portfolio is about
This project is a personal medieval-themed developer portfolio for **Mouad the Coder**. It presents profile narrative, chatbot/oracle interaction, skills, projects, learning materials, hobbies, design work, timeline, and contact channels.

### Tech stack comparison

#### Reference app (legacy)
- HTML (multi-page + sectioned SPA-like homepage)
- CSS split by global/nav/section concerns
- Vanilla JavaScript modules for rendering, events, state handling, settings, chatbot logic, image viewer, and section data hydration

#### Migration target (current)
- React 19
- Vite
- React Router
- Tailwind CSS v4 (theme tokens and utility-first usage)
- SCSS (layered styles: base/components/animations)
- Context providers for app-wide state (alerts, settings, achievements, image viewer, PDF viewer)

### Medieval theme system

#### Fonts
- `Cinzel`
- `IM Fell English SC`
- `MedievalSharp`
- `Lora` (body variable in React theme)

#### Color palette and custom properties found (React theme source)
Defined in `src/styles/index.scss`:

- `--font-cinzel`
- `--font-fell`
- `--font-medieval`
- `--font-body`
- `--font-size-header`
- `--font-size-title`
- `--color-parchment`
- `--color-parchment-dark`
- `--color-gold`
- `--color-gold-light`
- `--color-rust`
- `--color-rust-light`
- `--color-forest`
- `--color-forest-2`
- `--color-brown`
- `--color-dark-brown`
- `--color-dark-gray`
- `--color-torchlight`
- `--color-magic-blue`
- `--color-magic-purple`
- `--scroll-gw`
- `--scroll-gh`
- `--spacing-p-md1`
- `--shadow-parchment`
- `--shadow-gold-glow`
- `--animate-title-float`
- `--animate-glowing-border`
- `--animate-border-glow`
- `--animate-parchment-glow`
- `--animate-oracle-glow`
- `--animate-particle-rotate`
- `--animate-fadeinout-float`
- `--animate-frame-float`
- `--animate-wizard-glow`
- `--animate-unroll-scroll`
- `--animate-fade-in`
- `--animate-slide-up`
- `--animate-scale-in`
- `--animate-zoom-in`
- `--color-canvas`
- `--color-ambient-vignette`
- `--color-oracle-glass`
- `--color-oracle-sparkles`
- `--bg-pattern-medieval-odd`
- `--bg-pattern-medieval-even`
- `--border-image-parchment`
- `--bg-pattern-parchment-texture`
- `--cursor-friend`
- `--cursor-enemy`
- `--cursor-magic-blue`
- `--crystal-ball-wh`
- `--body-bg`
- `--body-bg-before`

#### Animation patterns
- Floating title/text animations
- Glowing border/parchment/oracle effects
- Particle rotation around crystal/oracle motif
- Unroll-scroll style animation for content blocks
- Entry animations for alerts/modals/viewers (`fade-in`, `slide-up`, `scale-in`, `zoom-in`)
- Section reveal patterns using class toggles (`.visible`) and transforms

---

## 2. Folder Structure

Below is the intended **`src/`** structure with current files and purpose:

```text
src/
├── App.jsx                          # Top-level provider composition + route shell + global overlays
├── main.jsx                         # React root bootstrap + BrowserRouter + global style import
├── components/
│   ├── AlertContainer.jsx           # Toast/alert renderer
│   ├── Headers.jsx                  # Main top navigation/header
│   ├── ImageViewer.jsx              # Global image lightbox/modal
│   ├── PdfViewer.jsx                # Global PDF modal/viewer
│   ├── SettingsModal.jsx            # Runtime settings modal UI
│   ├── card.jsx                     # Reusable dynamic card renderer (skills/projects/etc.)
│   ├── footer.jsx                   # Footer component
│   └── CHATBOT/
│       └── chatbot.jsx              # React chatbot UI + interaction layer
├── config/
│   └── presets.js                   # Card presets / section rendering configuration
├── data/
│   ├── achievements.js              # Achievements definitions
│   ├── designs.js                   # Design section content data
│   ├── hobbies.js                   # Hobbies section content data
│   ├── languages.js                 # Languages data
│   ├── learning.js                  # Learning materials data
│   ├── projects.js                  # Projects data + rich metadata
│   ├── skills.js                    # Skills data
│   └── timelines.js                 # About timeline data
├── lib/
│   ├── chatbot/
│   │   └── parser.js                # Chatbot pseudo-LLM matching/response logic
│   ├── contexts/
│   │   ├── achievements.context.js  # Achievements context contract
│   │   ├── AchievementsProvider.jsx # Achievements provider
│   │   ├── alert.context.js         # Alert context contract
│   │   ├── AlertProvider.jsx        # Alert state provider
│   │   ├── imageViewer.context.js   # Image viewer context contract
│   │   ├── ImageViewerProvider.jsx  # Image viewer provider
│   │   ├── pdfViewer.context.js     # PDF viewer context contract
│   │   ├── PdfViewerProvider.jsx    # PDF viewer provider
│   │   ├── settingProvider.jsx      # Settings provider implementation
│   │   └── settings.context.js      # Settings context contract
│   ├── utils/
│   │   └── achievementsStorage.js   # Persistence for achievements
│   ├── getColorForTag.js            # Project tag color utility
│   ├── markdownToHtml.js            # Markdown conversion helper (duplicate path exists)
│   ├── useAchievements.jsx          # Achievements hook
│   ├── useAlerts.jsx                # Alerts hook
│   ├── useImageViewer.jsx           # Image viewer hook
│   ├── usePdfViewer.jsx             # PDF viewer hook
│   ├── useSettings.jsx              # Settings hook
│   └── utils.jsx                    # Misc helpers
├── media/                           # Imported media for bundling usage in React code
├── pages/
│   └── home/
│       └── home.jsx                 # Aggregates homepage sections
├── routes/
│   └── routes.jsx                   # Route definitions + lazy loading + fallback
├── sections/
│   └── home/
│       ├── about/
│       │   └── AboutSection.jsx
│       ├── contact/
│       │   └── ContactSection.jsx
│       ├── design/
│       │   └── DesignSection.jsx
│       ├── hero/
│       │   └── heroSection.jsx
│       ├── hobbies/
│       │   └── HobbiesSection.jsx
│       ├── languages/
│       │   └── LanguagesSection.jsx
│       ├── learning/
│       │   └── LearningSection.jsx
│       ├── presentation/
│       │   └── presentation.jsx
│       ├── projects/
│       │   └── ProjectsSection.jsx
│       └── skills/
│           └── skillsSection.jsx
├── strings/
│   ├── translations.jsx             # Translator helper / resolver
│   ├── EN/
│   │   ├── en.jsx                   # English dictionary root
│   │   └── pages/home.jsx           # English home strings
│   └── FR/
│       ├── fr.jsx                   # French dictionary root
│       └── pages/home.jsx           # French home strings
├── styles/
│   ├── _animations.scss             # Keyframes and animation utilities
│   ├── _base.scss                   # Base/global element styling
│   ├── _components.scss             # Complex themed component styling
│   └── index.scss                   # Theme variables + imports + scrollbars
└── templates/
    ├── layouts.jsx                  # Page shell (header/footer/outlet)
    └── Section.jsx                  # Reusable section wrapper
```

---

## 3. Pages & Sections Checklist

### Main portfolio pages/routes
- [x] Home route (`/`, `/home`) — `src/pages/home/home.jsx` — reference: `medival portfolio/index.html`
- [ ] CMREF dedicated route/page — currently mapped to Home; no dedicated component — reference: `medival portfolio/CMREF/index.html`
- [ ] Blogs dedicated route/page — currently mapped to Home; no dedicated component — reference: `medival portfolio/blogs/index.html`
- [ ] Falling Letters dedicated route/page — currently mapped to Home; no dedicated component — reference: `medival portfolio/fallingletters/index.html`

### Home sections
- [x] Hero / Oracle Chat — `src/sections/home/hero/heroSection.jsx` (+ `src/components/CHATBOT/chatbot.jsx`) — reference: `medival portfolio/index.html` (`#hero`)
- [x] Presentation — `src/sections/home/presentation/presentation.jsx` — reference: `medival portfolio/index.html` (`#presentation`)
- [x] Languages — `src/sections/home/languages/LanguagesSection.jsx` — reference: `medival portfolio/index.html` (`#languages`)
- [ ] Skills parity complete — `src/sections/home/skills/skillsSection.jsx` — reference: `medival portfolio/index.html` (`#skills`)
- [x] Projects base implementation — `src/sections/home/projects/ProjectsSection.jsx` — reference: `medival portfolio/index.html` (`#projects`)
- [x] Learning — `src/sections/home/learning/LearningSection.jsx` — reference: `medival portfolio/index.html` (`#learning`)
- [x] Hobbies — `src/sections/home/hobbies/HobbiesSection.jsx` — reference: `medival portfolio/index.html` (`#hobbies`)
- [x] Design — `src/sections/home/design/DesignSection.jsx` — reference: `medival portfolio/index.html` (`#design`)
- [x] About base implementation — `src/sections/home/about/AboutSection.jsx` — reference: `medival portfolio/index.html` (`#about`)
- [ ] Contact parity complete — `src/sections/home/contact/ContactSection.jsx` — reference: `medival portfolio/index.html` (`#contact`)
- [ ] Settings modal parity complete — `src/components/SettingsModal.jsx` — reference: settings modal in `medival portfolio/index.html`

---

## 4. Styling Strategy

### Tailwind usage (simple utility classes)
Use Tailwind classes directly in JSX for:
- Layout shells (`flex`, `grid`, `min-h-screen`, spacing utilities)
- Typography sizing and color utility application
- Visibility/positioning utility patterns for common blocks
- Quick responsive adjustments

Examples include hero section utility classes and suspense fallback container utility styling.

### SCSS usage (complex theme logic)
Use SCSS for:
- Medieval skinning (parchment, border-image, patterned backgrounds)
- Pseudo-elements (`::before`, `::after`) and ornament effects
- Nested rules for components
- Custom cursors and texture backgrounds
- Keyframe-driven animation definitions
- Shared component styles that are too verbose for JSX utility-only expressions

### Shared tokens that should be centralized in `_variables.scss`
The following should be moved/maintained in a dedicated `src/styles/_variables.scss` and imported via `@use`:

#### Typography tokens
- `--font-cinzel`, `--font-fell`, `--font-medieval`, `--font-body`
- `--font-size-header`, `--font-size-title`

#### Color tokens
- `--color-parchment`, `--color-parchment-dark`
- `--color-gold`, `--color-gold-light`
- `--color-rust`, `--color-rust-light`
- `--color-forest`, `--color-forest-2`
- `--color-brown`, `--color-dark-brown`, `--color-dark-gray`
- `--color-torchlight`, `--color-magic-blue`, `--color-magic-purple`

#### Spacing/shadow/utility tokens
- `--scroll-gw`, `--scroll-gh`
- `--spacing-p-md1`
- `--shadow-parchment`, `--shadow-gold-glow`

#### Background/pattern tokens
- `--color-canvas`, `--color-ambient-vignette`
- `--bg-pattern-medieval-odd`, `--bg-pattern-medieval-even`
- `--bg-pattern-parchment-texture`
- `--border-image-parchment`

#### Cursor/theme state tokens
- `--cursor-friend`, `--cursor-enemy`, `--cursor-magic-blue`
- `--body-bg`, `--body-bg-before`
- `--crystal-ball-wh`

#### Animation token aliases
- All `--animate-*` entries listed in section 1

### SCSS architecture improvements recommended
- Replace deprecated `@import` with `@use` / `@forward`
- Split theme tokens, mixins, and keyframes into dedicated files:
  - `_variables.scss`
  - `_mixins.scss`
  - `_keyframes.scss`
  - `_themes.scss` (day/night overrides)

---

## 5. Component Conventions

### Naming conventions currently observed
- Mixed conventions are present:
  - `PascalCase` for many components (`ProjectsSection`, `AboutSection`, `AlertContainer`)
  - `camelCase` file names for several components (`heroSection.jsx`, `presentation.jsx`, `skillsSection.jsx`, `card.jsx`, `footer.jsx`)
- Recommendation: standardize component file names and component symbols to `PascalCase`.

### File structure pattern
- Current project mostly uses **single-file component modules** under functional domain folders.
- Section components are grouped by page/feature: `src/sections/home/<section>/...`.
- Shared components are in `src/components/`.
- State logic is abstracted into hooks and context provider modules in `src/lib/`.

### Prop-passing patterns
- Reusable card pattern:
  - `item`
  - `config` (preset-driven rendering)
  - optional `onClick`
- Section wrapper pattern:
  - `id`, `title`, `subtitle`, optional `classname`
- Viewer/context interaction:
  - imperative hooks (`openImage`, `openPdf`, `showAlert`, etc.)

### Code style patterns observed
- Predominantly **default exports** for components.
- Mix of function declaration and arrow function components.
- Hooks-based local state (`useState`, `useEffect`, `useRef`).
- Context-driven global state.
- Some commented-out legacy migration code remains in page components.

---

## 6. Known Issues & TODO

Ordered by priority.

### Critical
1. **Route parity missing for standalone reference apps**
   - `/CMREF`, `/blogs`, `/fallingletters` point to Home instead of dedicated pages.
   - TODO: create dedicated React pages or external route handoff preserving original feature behavior.

2. **Contact form production mismatch**
   - Uses placeholder submit endpoint and simulated success path.
   - TODO: wire real submit destination, restore `_next` flow, preserve user feedback handling.

### High
3. **Skills section feature regression**
   - Missing original category filter, pagination, and overview details area.
   - TODO: port full behavior from legacy `skills.js` logic and matching UX.

4. **Anchor/hash mismatch risk**
   - Skills section uses `id="Skills"` (capitalized), may break `#skills` navigation assumptions.
   - TODO: normalize ids and anchor link behavior.

5. **Settings modal parity incomplete**
   - Reference has explicit modal UX in base HTML; React integration/parity is incomplete.
   - TODO: ensure modal mount, close behavior, keyboard handling, and theme/language sync parity.

### Medium
6. **Build-time CSS warning due to invalid variable syntax pattern**
   - Fix malformed CSS (e.g., `var(--color-gold/50)` usage patterns).

7. **Sass deprecation warnings**
   - `@import` is deprecated; migrate to `@use/@forward`.

8. **Legacy commented-out code in `home.jsx`**
   - Tracking/copy/alerts logic remains commented.
   - TODO: either re-enable with modern hooks or remove dead comments.

### Low
9. **Component naming consistency**
   - Mixed casing for files and components.
   - TODO: normalize to PascalCase and align import style.

10. **Potential duplicated helper paths**
   - Markdown helper appears in multiple locations.
   - TODO: consolidate utility location and imports.

---

## 7. Asset Inventory

### Reference asset categories (legacy)

#### Core media
- Background/scene art (day/night city, menus)
- Profile images (`mouad-pic.*`)
- Download placeholders
- Favicon / manifest resources

#### Portfolio content media
- `media/projects/*` images
- `media/Skills/*` imagery for skills cards/details

#### Cursor packs
- `media/cursor/WenrexaAssetsMagicCursorsPack/...`
- `media/cursor/Android/...`

#### Fonts
- `styles/fonts/Cinzel/*`
- `styles/fonts/MedievalSharp-Regular.ttf`
- `styles/fonts/*.woff2` subsets and symbols

#### Misc
- Wax/seal and texture assets (`styles/wax-stamp.png`, parchment textures)

### React migration asset status

#### Present in React
- Most core images replicated under `public/assets/...`
- Projects and skills image sets replicated under `public/assets/projects/...` and `public/assets/Skills/...`
- Cursor packs replicated under `public/assets/cursor/...`
- Additional theme textures under `public/media/...`
- `src/media/mouad-pic.png` available for component import

#### Needs verification / potential gaps
- Font assets from legacy `styles/fonts/*` are not clearly mirrored 1:1 in React public/source trees.
- Legacy wax-stamp/background style assets may be reimplemented differently in SCSS; verify all direct image references resolve.
- Ensure all assets referenced from SCSS use final deployed paths (`/assets/...` or imported modules), not stale relative paths.

---

## Practical next-step sequence (recommended)
1. Fix critical routing and contact flow.
2. Restore skills parity and settings parity.
3. Normalize section IDs and hash navigation.
4. Clean and modernize style architecture (`@use`, `_variables.scss`).
5. Perform asset path/font parity audit and runtime smoke test.
6. Clean naming/commented legacy code and finalize consistency pass.

