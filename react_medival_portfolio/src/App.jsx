import AlertProvider from './lib/contexts/AlertProvider'
import SettingsProvider from './lib/contexts/settingProvider'
import AchievementsProvider from './lib/contexts/AchievementsProvider'
import ImageViewerProvider from './lib/contexts/ImageViewerProvider'
import PdfViewerProvider from './lib/contexts/PdfViewerProvider'
import AppRoutes from './routes/routes'
import AlertContainer from './components/AlertContainer'
import ImageViewer from './components/ImageViewer'
import PdfViewer from './components/PdfViewer'

function App() {

  return (
    <SettingsProvider>
      <AlertProvider>
        <AchievementsProvider>
          <ImageViewerProvider>
            <PdfViewerProvider>

              <AppRoutes />
              <AlertContainer />
              <ImageViewer />
              <PdfViewer />

            </PdfViewerProvider>
          </ImageViewerProvider>
        </AchievementsProvider>
      </AlertProvider>
    </SettingsProvider>
  )
}

export default App