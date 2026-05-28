/**
 * Markdown Themes Registry
 *
 * To add a new theme:
 * 1. Add one entry here
 * 2. Add .markdown-content.md-[id] block in _markdown-themes.scss
 * Done — appears in settings automatically
 */

export const MARKDOWN_THEMES = {
  default: {
    id: 'default',
    label: 'Default',
    labelMedieval: 'The Ancient Script',
    icon: '📄',
    description: 'Matches the current app theme',
    cssClass: '',           // no extra class — inherits app theme via _markdown.scss
    preview: {
      bg: null,             // transparent — uses app bg
      text: null,
      accent: null,
    },
  },
  medieval: {
    id: 'medieval',
    label: 'Medieval Scroll',
    labelMedieval: 'Ye Olde Parchment',
    icon: '📜',
    description: 'Parchment, gold ink, and ancient typography',
    cssClass: 'md-medieval',
    preview: {
      bg: '#f4e4bc',
      text: '#2c1810',
      accent: '#8b5e00',
    },
  },
  github: {
    id: 'github',
    label: 'GitHub',
    labelMedieval: 'The Developer\'s Tome',
    icon: '🐙',
    description: 'Clean GitHub-style markdown',
    cssClass: 'md-github',
    preview: {
      bg: '#ffffff',
      text: '#1f2328',
      accent: '#0969da',
    },
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal',
    labelMedieval: 'The Arcane Console',
    icon: '💻',
    description: 'Dark hacker-style with green on black',
    cssClass: 'md-terminal',
    preview: {
      bg: '#0d1117',
      text: '#39d353',
      accent: '#58e06f',
    },
  },
  newspaper: {
    id: 'newspaper',
    label: 'Newspaper',
    labelMedieval: 'The Herald\'s Gazette',
    icon: '📰',
    description: 'Editorial serif with drop caps',
    cssClass: 'md-newspaper',
    preview: {
      bg: '#faf8f0',
      text: '#1a1a1a',
      accent: '#8b0000',
    },
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal',
    labelMedieval: 'The Bare Scroll',
    icon: '✦',
    description: 'Ultra-clean, maximum readability',
    cssClass: 'md-minimal',
    preview: {
      bg: 'transparent',
      text: '#374151',
      accent: '#2563eb',
    },
  },
  ocean: {
    id: 'ocean',
    label: 'Ocean',
    labelMedieval: 'The Deep Waters',
    icon: '🌊',
    description: 'Cool blues, calm dark reading',
    cssClass: 'md-ocean',
    preview: {
      bg: '#0f1923',
      text: '#cdd9e5',
      accent: '#58a6ff',
    },
  },
};

export const getMarkdownThemeClass = (themeId) => {
  if (themeId === 'medieval') return 'md-medieval';
  if (themeId === 'github') return 'md-github';
  return ''; // 'light' and 'dark' themes naturally inherit app variables
};
