import { useEffect, useState } from 'react'
import AlertProvider from './lib/contexts/AlertProvider'
import SettingsProvider from './lib/contexts/settingProvider'
import AchievementsProvider from './lib/contexts/AchievementsProvider'
import ImageViewerProvider from './lib/contexts/ImageViewerProvider'
import PdfViewerProvider from './lib/contexts/PdfViewerProvider'
import AnimationProvider from './components/AnimationProvider'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { getActiveSeasonalTheme } from './lib/utils/seasonalThemes'
import ContextMenu from './components/ui/ContextMenu'
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp/KeyboardShortcutsHelp'
import AppRoutes from './routes/routes'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { useSettings } from './lib/useSettings'
import { useAlerts } from './lib/useAlerts'
import glossary from './data/glossary'
import PixelDragon from './components/PixelDragon/PixelDragon'
import WeatherOverlay from './components/WeatherOverlay/WeatherOverlay'

function AppContent() {
  const { language, _t, weather } = useSettings();
  const { showAlert } = useAlerts();
  const [showDragon, setShowDragon] = useState(false);
  useKeyboardShortcuts();

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          showAlert('🐉 A pixel dragon has been summoned! Watch the skies!', 'royal', 5000);
          setShowDragon(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAlert]);

  // // Last Visited Greeting
  // useEffect(() => {
  //   const lastVisited = localStorage.getItem("mp_last_visited");
  //   const now = Date.now();

  //   if (lastVisited) {
  //     const timestamp = parseInt(lastVisited, 10);
  //     if (!isNaN(timestamp)) {
  //       const localeMap = { en: 'en-US', fr: 'fr-FR', ar: 'ar-MA', 'medieval-en': 'en-GB', 'medieval-fr': 'fr-FR' };
  //       const locale = localeMap[language] || 'en-US';
  //       const formattedDate = new Date(timestamp).toLocaleString(locale, {
  //         dateStyle: 'medium',
  //         timeStyle: 'short',
  //       });

  //       showAlert(t('COMMON.visitor.welcomeBack', { date: formattedDate }), 'greeting', 5000);
  //     }
  //   }

  //   localStorage.setItem("mp_last_visited", String(now));
  // }, [language, showAlert, t]);

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
      <KeyboardShortcutsHelp />
      <WeatherOverlay weather={weather} />
      {showDragon && <PixelDragon onComplete={() => setShowDragon(false)} />}
    </>
  );
}

function App() {
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
      <AnimationProvider>
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
      </AnimationProvider>
    </SettingsProvider>
  )
}

export default App

