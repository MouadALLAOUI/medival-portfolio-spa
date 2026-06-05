# Contributing to Medieval Portfolio

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy env file: `cp .env.example .env`
4. Start dev server: `npm run dev`

## Code Conventions

### File & Folder Naming
- **Components**: PascalCase (`BlogCard.jsx`)
- **Contexts**: camelCase (`settingProvider.jsx`)
- **SCSS Partials**: kebab-case (`_variables.scss`)
- **Data Files**: dot notation (`blogs.data.js`)

### Code DNA
- Named arrow functions for modular sections
- Standard functions for page components and providers
- PascalCase for React components
- camelCase for hooks and contexts

### Styling
- Use SCSS Modules (`ComponentName.module.scss`) colocated with components
- Use Tailwind utility classes for layout and spacing
- Never use `@apply` for custom animations — write raw CSS keyframes instead
- Use CSS custom properties from `_variables.scss` for theme colors
- Base64 data URIs for inline SVGs in SCSS

### i18n
- All user-facing strings must go through the translation system
- Translation files are in `src/strings/{LANGUAGE}/`
- Use `useSettings()` hook to access `_t()` function
- If you add a new string, add it to all 5 languages

### Components
- Keep components focused on a single responsibility
- Extract reusable parts into `src/components/`
- Use existing components from `src/components/card.jsx` (DynamicCard) before creating new ones
- Lazy-load heavy components with `React.lazy()`

## Git Workflow

### Branch Naming
- `DEV{number}` — Development branches (sequential: DEV11, DEV12, ...)
- `DEV{number}_{description}` — Small focused changes (e.g., `DEV13_fix_login_bug`)

### Commit Messages
- Use present tense: "Add feature" not "Added feature"
- Keep first line under 72 characters
- Reference issue numbers when applicable

### Making Changes
1. Create a new branch from `main`
2. Make your changes following the conventions above
3. Run `npm run lint` to check for issues
4. Run `npm run build` to verify production build
5. Submit a pull request with a clear description

## Adding a New Page

1. Create the page component in `src/pages/YourPage/`
2. Add the route in `src/routes/routes.jsx`
3. Use `React.lazy()` for code splitting
4. Add i18n strings to all language files

## Adding a New Section (Home Page)

1. Create the section in `src/sections/home/your-section/`
2. Add it to `src/pages/home/home.jsx`
3. Update the navigation in `src/components/Headers.jsx`
4. Add translation strings

## Reporting Issues

- Use the GitHub issue tracker
- Include steps to reproduce
- Include browser/OS information
- Attach screenshots if applicable

## Code of Conduct

- Be respectful and constructive
- Focus on the code, not the person
- Help newcomers learn and grow
