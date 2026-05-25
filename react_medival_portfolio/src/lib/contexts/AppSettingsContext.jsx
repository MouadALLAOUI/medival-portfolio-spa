import { createContext, useContext, useState, useEffect } from 'react';

const AppSettingsContext = createContext(null);
export const useAppSettings = () => useContext(AppSettingsContext);

const DEFAULTS = {
  markdownTheme: 'default',
  reducedMotion: false,
  fontSize: 'medium',
};

export const AppSettingsProvider = ({ children }) => {
  const load = (key) => {
    try {
      return localStorage.getItem(`portfolio_${key}`) || DEFAULTS[key];
    } catch {
      return DEFAULTS[key];
    }
  };

  const [markdownTheme, setMarkdownTheme] = useState(() => load('markdownTheme'));
  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      return localStorage.getItem('portfolio_reducedMotion') === 'true';
    } catch {
      return DEFAULTS.reducedMotion;
    }
  });
  const [fontSize, setFontSize] = useState(() => load('fontSize'));

  // Persist all settings
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_markdownTheme', markdownTheme);
    } catch (e) {
      void e;
    }
  }, [markdownTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_reducedMotion', String(reducedMotion));
    } catch (e) {
      void e;
    }
  }, [reducedMotion]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_fontSize', fontSize);
    } catch (e) {
      void e;
    }
  }, [fontSize]);

  // Apply reducedMotion to root
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-reduced-motion',
      reducedMotion ? 'true' : 'false'
    );
  }, [reducedMotion]);

  // Apply fontSize to root
  useEffect(() => {
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.setProperty('--base-font-size', sizes[fontSize] || '16px');
  }, [fontSize]);

  return (
    <AppSettingsContext.Provider value={{
      markdownTheme, setMarkdownTheme,
      reducedMotion, setReducedMotion,
      fontSize, setFontSize,
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsProvider;
