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

  useEffect(() => {
    const root = document.documentElement;
    const attribute = THEMES[theme]?.attribute;

    // Reset previous theme classes/attributes
    Object.values(THEMES).forEach((t) => {
      if (t.attribute) {
        root.removeAttribute(`data-theme`);
      }
    });

    if (attribute) {
      root.setAttribute('data-theme', attribute);
    }

    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

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
