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
    return localStorage.getItem('portfolio-theme') || 'light';
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
