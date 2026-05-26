import { useEffect } from 'react'
import AlertProvider from './lib/contexts/AlertProvider'
import SettingsProvider from './lib/contexts/settingProvider'
import AchievementsProvider from './lib/contexts/AchievementsProvider'
import ImageViewerProvider from './lib/contexts/ImageViewerProvider'
import PdfViewerProvider from './lib/contexts/PdfViewerProvider'
import { useLocation } from 'react-router-dom'
// import { AnimatePresence } from 'framer-motion'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { getActiveSeasonalTheme } from './lib/utils/seasonalThemes'
import ContextMenu from './components/ui/ContextMenu'
import AppRoutes from './routes/routes'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { useSettings } from './lib/useSettings'
import { useAlerts } from './lib/useAlerts'
import glossary from './data/glossary'

function AppContent() {
  const { language } = useSettings();
  const { showAlert } = useAlerts();
  useKeyboardShortcuts();

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          showAlert('🧙‍♂️ Secret Scroll Unlocked: Thou art a true master of the arcane!', 'royal', 5000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAlert]);

  useEffect(() => {
    const dict = glossary[language] || glossary.en;

    const parseGlossary = () => {
      const codeElements = document.querySelectorAll('code');
      codeElements.forEach((el) => {
        const text = el.textContent?.trim();
        if (!text) return;

        // Check if this code tag matches one of our glossary terms (case-insensitive)
        const matchedKey = Object.keys(dict).find(
          (key) => key.toLowerCase() === text.toLowerCase()
        );

        if (matchedKey) {
          el.classList.add('glossary-term');
          el.setAttribute('data-definition', dict[matchedKey]);
        }
      });
    };

    // Run initial scan
    parseGlossary();

    // Observe future dynamic DOM additions (e.g. lazy loaded pages, expanded details)
    const observer = new MutationObserver((mutations) => {
      let hasNewElements = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewElements = true;
          break;
        }
      }
      if (hasNewElements) {
        parseGlossary();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  return (
    <>
      <AppRoutes />
      <ContextMenu />
    </>
  );
}

function App() {
  const location = useLocation();

  const seasonalTheme = getActiveSeasonalTheme();

  useEffect(() => {
    if (seasonalTheme) {
      document.documentElement.setAttribute('data-seasonal', seasonalTheme);
    } else {
      document.documentElement.removeAttribute('data-seasonal');
    }
  }, [seasonalTheme]);

  return (
    <SettingsProvider>
      <AlertProvider>
        <AchievementsProvider>
          <ImageViewerProvider>
            <PdfViewerProvider>
              <ErrorBoundary>
                <AppContent />
              </ErrorBoundary>
            </PdfViewerProvider>
          </ImageViewerProvider>
        </AchievementsProvider>
      </AlertProvider>
    </SettingsProvider>
  )
}

export default App

