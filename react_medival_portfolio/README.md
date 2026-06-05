# Medieval Portfolio

A medieval-themed personal portfolio built with React 19, Vite 8, and Tailwind CSS 4. Features include i18n (5 languages), an achievement system, chatbot, PDF viewer, blog with markdown content, and a PWA service worker.

## Tech Stack

- **React 19** with React Router DOM v7
- **Vite 8** (build tool & dev server)
- **Tailwind CSS 4** + SCSS Modules
- **Framer Motion** (animations)
- **Zustand** (state management)
- **react-pdf** (PDF rendering)
- **PrismJS** (syntax highlighting)

## Prerequisites

- Node.js 20+
- npm 9+

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd react_medival_portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Generate RSS/sitemap, then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
react_medival_portfolio/
├── public/                  # Static assets (images, fonts, manifest, service worker)
│   ├── content/             # Markdown content (blogs, projects, skills)
│   └── media/               # Images (skills, projects, cursors, etc.)
├── scripts/                 # Build-time generators (RSS, sitemap)
├── src/
│   ├── components/          # Reusable UI components
│   ├── config/              # Environment config, presets
│   ├── data/                # Data files (blogs, projects, skills, achievements)
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Layout wrappers (main, CRMEF)
│   ├── lib/                 # Contexts, utilities, chatbot parser
│   ├── pages/               # Route-level page components
│   ├── routes/              # Route definitions
│   ├── sections/            # Home page section components
│   ├── strings/             # i18n translations (EN, FR, AR, Medieval EN/FR)
│   ├── styles/              # Global SCSS (variables, mixins, animations)
│   └── templates/           # Layout template components
├── .env                     # Local environment variables (git-ignored)
├── .env.production          # Production environment variables
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind theme (medieval colors, animations)
├── netlify.toml             # Netlify deployment config
└── package.json
```

## Features

- **5 Languages**: English, French, Arabic (RTL), Medieval English, Medieval French
- **Achievement System**: XP tracking, unlockable achievements, localStorage persistence
- **Chatbot**: NLP-based chatbot with conversation history
- **Blog**: Markdown-rendered blog posts with tag filtering, search, TOC, and reading progress
- **PDF Viewer**: Inline PDF rendering with medieval parchment styling
- **CRMEF Section**: Standalone academic portfolio with hash-based routing
- **Mini-Game**: Falling Letters typing game
- **PWA**: Service worker with cache-first strategy, web app manifest
- **Theme System**: Light, Dark, and Medieval themes with auto-detection
- **Keyboard Shortcuts**: Global hotkeys with help overlay
- **Context Menu**: Custom medieval-themed right-click menu

## Environment Variables

See [`.env.example`](.env.example) for all available variables. Only `VITE_*` prefixed variables are exposed to the client.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions (Netlify/Vercel).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is for personal portfolio use.
