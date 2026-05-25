import AlertProvider from './lib/contexts/AlertProvider'
import SettingsProvider from './lib/contexts/settingProvider'
import AchievementsProvider from './lib/contexts/AchievementsProvider'
import ImageViewerProvider from './lib/contexts/ImageViewerProvider'
import PdfViewerProvider from './lib/contexts/PdfViewerProvider'
import AppRoutes from './routes/routes'

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <SettingsProvider>
      <AlertProvider>
        <AchievementsProvider>
          <ImageViewerProvider>
            <PdfViewerProvider>

              <AppRoutes />

            </PdfViewerProvider>
          </ImageViewerProvider>
        </AchievementsProvider>
      </AlertProvider>
    </SettingsProvider>
  )
}


export default App
