import { MARKDOWN_THEMES } from '../markdown/markdownThemes';

/**
 * Settings Registry
 * 
 * To add a new setting in the future:
 * 1. Add its context/state to the relevant provider
 * 2. Add one entry here in the correct section
 * 3. Done — it appears on SettingsPage automatically!
 */

export const SETTINGS_SECTIONS = [
  {
    id: 'appearance',
    title: '🎨 Appearance',
    description: 'Visual theme and display preferences',
    settings: [
      {
        id: 'theme',
        label: 'Theme',
        description: 'Choose the overall visual style of the portfolio',
        type: 'theme-select',   // rendered as theme cards grid
        contextKey: 'theme',   // matches ThemeProvider value key
      },
      {
        id: 'customCursor',
        label: 'Medieval Cursor',
        description: 'Use a themed quill cursor in the medieval theme',
        type: 'toggle',
        contextKey: 'customCursor',
      },
      {
        id: 'soundEnabled',
        label: 'Arcane Sounds',
        description: 'Enable subtle sound effects during interactions',
        type: 'toggle',
        contextKey: 'soundEnabled',
      },
    ],
  },

  {
    id: 'language',
    title: '🌐 Language',
    description: 'Interface language preferences',
    settings: [
      {
        id: 'language',
        label: 'Interface Language',
        description: 'Language used across the portfolio UI',
        type: 'option-select',
        contextKey: 'language',
        options: [
          { id: 'en', label: 'English', icon: '🇬🇧', description: '' },
          { id: 'fr', label: 'Français', icon: '🇫🇷', description: '' },
          { id: 'ar', label: 'العربية', icon: '🇲🇦', description: '' },
          { id: 'medieval-en', label: 'Medieval English', icon: '📜', description: '' },
          { id: 'medieval-fr', label: 'Français Médiéval', icon: '🏰', description: '' },
        ],
      },
    ],
  },

  {
    id: 'pdf',
    title: '📄 PDF Viewer',
    description: 'How PDF documents are opened and displayed',
    settings: [
      {
        id: 'pdfMode',
        label: 'Opening Mode',
        description: 'Where PDF documents open when triggered',
        type: 'option-select',
        contextKey: 'pdfMode',
        options: [
          { id: 'inline', label: 'Inline', icon: '📄', description: 'Expands inside the page' },
          { id: 'modal', label: 'Modal', icon: '🪟', description: 'Opens in a floating window' },
          { id: 'newWindow', label: 'New Window', icon: '↗️', description: 'Opens in a new browser tab' },
        ],
      },
      {
        id: 'pdfReadingMode',
        label: 'Reading Mode',
        description: 'How pages are laid out inside the PDF viewer',
        type: 'option-select',
        contextKey: 'pdfReadingMode',
        options: [
          { id: 'paginated', label: 'Page by Page', icon: '📖', description: 'Navigate one page at a time' },
          { id: 'longStrip', label: 'Long Strip', icon: '📜', description: 'Continuous vertical scroll' },
          { id: 'separatedStrip', label: 'Separated Strip', icon: '🗂️', description: 'Scroll with page separators' },
          { id: 'doublePage', label: 'Double Page', icon: '📚', description: 'Two pages side by side' },
        ],
      },
    ],
  },

  {
    id: 'accessibility',
    title: '♿ Accessibility',
    description: 'Comfort and accessibility preferences',
    settings: [
      {
        id: 'animationLevel',
        label: 'Optimisation / Animations',
        description: 'Adjust animations to optimize website performance',
        type: 'option-select',
        contextKey: 'animationLevel',
        options: [
          { id: 'light', label: 'Light', icon: '⚡', description: 'Minimum animations, best performance' },
          { id: 'normal', label: 'Normal', icon: '⚖️', description: 'Smooth transitions, balanced' },
          { id: 'heavy', label: 'Heavy', icon: '🎨', description: 'Full animations and effects' },
          { id: 'ultra', label: 'Ultra', icon: '🚀', description: 'Maximum smooth animations' },
        ],
      },
      {
        id: 'fontSize',
        label: 'Font Size',
        description: 'Base reading size',
        type: 'option-select',
        contextKey: 'fontSize',
        options: [
          { id: 'small', label: 'Small', icon: 'A', description: '14px base' },
          { id: 'medium', label: 'Medium', icon: 'A', description: '16px base (default)' },
          { id: 'large', label: 'Large', icon: 'A', description: '18px base' },
        ],
      },
      {
        id: 'soundEnabled',
        label: 'Sound Effects',
        description: 'Enable audio feedback and sound effects',
        type: 'toggle',
        contextKey: 'soundEnabled',
        defaultValue: false,
      },
    ],
  },
];
