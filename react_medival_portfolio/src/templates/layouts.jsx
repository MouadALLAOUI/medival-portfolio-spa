import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Headers';
import Footer from '../components/footer';
import SettingsModal from '../components/SettingsModal';
import AlertContainer from '../components/AlertContainer';
import ImageViewer from '../components/ImageViewer';
import PdfViewer from '../components/PdfViewer';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ChatTrigger from '../components/ChatTrigger/ChatTrigger';
import ChatProvider from '../lib/contexts/ChatProvider';
import { useSettings } from '../lib/useSettings';

const Layouts = () => {
  const { isSettingsOpen, closeSettings } = useSettings();

  return (
    <ChatProvider>
      <div className="body-container" id="body-container">
        <HeaderComponent />
        <main>
          <Outlet />
        </main>
        <Footer />
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} showPdfMode={true} showPdfReadingMode={true} />
        <AlertContainer />
        <ImageViewer />
        <PdfViewer />
        {/* Floating chat — portal-rendered, always available on every page */}
        <ChatWindow />
        <ChatTrigger />
      </div>
    </ChatProvider>
  );
};


export default Layouts;
