import AlertProvider from './lib/contexts/AlertProvider'
import SettingsProvider from './lib/contexts/settingProvider'
import AchievementsProvider from './lib/contexts/AchievementsProvider'
import ImageViewerProvider from './lib/contexts/imageViewerProvider'
import PdfViewerProvider from './lib/contexts/pdfViewerProvider'
import AppRoutes from './routes/routes'

function App() {

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
