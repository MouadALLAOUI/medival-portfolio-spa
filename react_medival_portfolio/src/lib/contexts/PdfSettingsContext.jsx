import { createContext, useContext, useState, useMemo, useEffect } from 'react';

export const PDF_MODES = {
  inline: {
    id: 'inline',
    label: 'Inline',
    icon: '📄',
    description: 'PDF expands inside the page below the trigger',
  },
  modal: {
    id: 'modal',
    label: 'Modal',
    icon: '🪟',
    description: 'PDF opens in a centered floating window',
  },
  newWindow: {
    id: 'newWindow',
    label: 'New Window',
    icon: '↗️',
    description: 'PDF opens in a new browser tab',
  },
};

export const PDF_READING_MODES = {
  // One page at a time — prev/next buttons
  paginated: {
    id: 'paginated',
    label: 'Page by Page',
    icon: '📖',
    description: 'Navigate one page at a time',
  },

  // All pages stacked vertically — scroll through
  longStrip: {
    id: 'longStrip',
    label: 'Long Strip',
    icon: '📜',
    description: 'All pages in a continuous vertical scroll',
  },

  // All pages stacked but with a visible gap/border between each page
  separatedStrip: {
    id: 'separatedStrip',
    label: 'Separated Strip',
    icon: '🗂️',
    description: 'Continuous scroll with clear separation between pages',
  },

  // Two pages side by side (like an open book) — desktop only
  doublePage: {
    id: 'doublePage',
    label: 'Double Page',
    icon: '📚',
    description: 'Two pages side by side like an open book',
  },
};

const PdfSettingsContext = createContext(null);

export const PdfSettingsProvider = ({ children }) => {
  const [pdfMode, setPdfMode] = useState(() => {
    try {
      return localStorage.getItem('crmef_pdf_mode') || 'modal';
    } catch {
      return 'modal';
    }
  });

  const [pdfReadingMode, setPdfReadingMode] = useState(() => {
    try {
      return localStorage.getItem('crmef_pdf_reading_mode') || 'longStrip';
    } catch {
      return 'longStrip';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('crmef_pdf_mode', pdfMode);
    } catch (e) {
      void e;
    }
  }, [pdfMode]);

  useEffect(() => {
    try {
      localStorage.setItem('crmef_pdf_reading_mode', pdfReadingMode);
    } catch (e) {
      void e;
    }
  }, [pdfReadingMode]);

  const value = useMemo(() => ({
    pdfMode,
    setPdfMode,
    PDF_MODES,
    pdfReadingMode,
    setPdfReadingMode,
    PDF_READING_MODES,
  }), [pdfMode, pdfReadingMode]);

  return (
    <PdfSettingsContext.Provider value={value}>
      {children}
    </PdfSettingsContext.Provider>
  );
};

export const usePdfSettings = () => {
  const ctx = useContext(PdfSettingsContext);
  return ctx; // returns null if no provider — caller handles it
};
