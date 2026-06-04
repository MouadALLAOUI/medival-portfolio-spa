/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = {
  light: {
    id: 'light',
    label: 'Arcane Light',
    icon: '☀️',
    attribute: null,
  },
  dark: {
    id: 'dark',
    label: 'Shadow Realm',
    icon: '🌙',
    attribute: 'dark',
  },
  medieval: {
    id: 'medieval',
    label: 'Medieval Scroll',
    icon: '⚔️',
    attribute: 'medieval',
  },
  github: {
    id: 'github',
    label: 'GitHub Classic',
    icon: '🐙',
    attribute: 'github',
  },
  custom: {
    id: 'custom',
    label: 'Custom Grimoire',
    icon: '🎨',
    attribute: 'custom',
  },
};

const ThemeContext = createContext(null);

// Note: to keep this module exporting only the component (helps Fast Refresh),
// attach helpers as properties on the default export below instead of
// named exports.

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;

    // Auto-detect system preference on first load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [customColors, setCustomColors] = useState(() => {
    return {
      bg: localStorage.getItem('custom-theme-bg') || '#0f172a',
      cardBg: localStorage.getItem('custom-theme-cardBg') || '#1e293b',
      text: localStorage.getItem('custom-theme-text') || '#f8fafc',
      accent: localStorage.getItem('custom-theme-accent') || '#3b82f6',
      border: localStorage.getItem('custom-theme-border') || '#334155',
    };
  });

  const updateCustomColor = (key, value) => {
    setCustomColors((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem(`custom-theme-${key}`, value);
      return updated;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    const attribute = THEMES[theme]?.attribute;

    // Reset previous theme classes/attributes
    Object.values(THEMES).forEach((t) => {
      if (t.attribute) {
        root.removeAttribute(`data-theme`);
      }
    });

    if (theme === 'custom') {
      root.setAttribute('data-theme', 'custom');
      root.style.setProperty('--bg-primary', customColors.bg);
      root.style.setProperty('--body-bg', customColors.bg);
      root.style.setProperty('--bg-tertiary', customColors.bg);
      root.style.setProperty('--bg-card', customColors.cardBg);
      root.style.setProperty('--card-bg', customColors.cardBg);
      root.style.setProperty('--bg-secondary', customColors.cardBg);
      root.style.setProperty('--text-primary', customColors.text);
      const textHex = customColors.text.startsWith('#') ? customColors.text : '#ffffff';
      root.style.setProperty('--text-secondary', textHex + 'cc');
      root.style.setProperty('--text-muted', textHex + '99');
      root.style.setProperty('--accent', customColors.accent);
      root.style.setProperty('--accent-hover', customColors.accent);
      root.style.setProperty('--border', customColors.border);
      root.style.setProperty('--border-strong', customColors.border);
    } else {
      // Clear custom styles
      root.style.removeProperty('--bg-primary');
      root.style.removeProperty('--body-bg');
      root.style.removeProperty('--bg-tertiary');
      root.style.removeProperty('--bg-card');
      root.style.removeProperty('--card-bg');
      root.style.removeProperty('--bg-secondary');
      root.style.removeProperty('--text-primary');
      root.style.removeProperty('--text-secondary');
      root.style.removeProperty('--text-muted');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-hover');
      root.style.removeProperty('--border');
      root.style.removeProperty('--border-strong');
      
      if (attribute) {
        root.setAttribute('data-theme', attribute);
      }
    }

    localStorage.setItem('portfolio-theme', theme);
  }, [theme, customColors]);

  // Day/Night Cycle auto-switch
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const isNight = hour >= 20 || hour < 6;
      const saved = localStorage.getItem('portfolio-theme');

      // Only auto-switch if user hasn't manually set a theme in this session
      // or if we want to be more proactive. For now, let's just check if no saved theme.
      if (!saved) {
        setTheme(isNight ? 'dark' : 'light');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000 * 30); // Check every 30 mins
    return () => clearInterval(interval);
  }, []);

  const switchTheme = (themeId) => {
    if (THEMES[themeId]) setTheme(themeId);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themes: THEMES,
        switchTheme,
        isMedieval: theme === 'medieval',
        isDark: theme === 'dark',
        isLight: theme === 'light',
        customColors,
        updateCustomColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// attach helpers so other modules can access them via the default export
ThemeProvider.useTheme = () => useContext(ThemeContext);
ThemeProvider.THEMES = THEMES;

// also export as a named export for direct destructuring imports
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
