import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Headers';
import Footer from '../components/footer';
import SettingsModal from '../components/SettingsModal';
import AlertContainer from '../components/AlertContainer';
import ImageViewer from '../components/ImageViewer';
import ChatTrigger from '../components/ChatTrigger/ChatTrigger';
import ChatProvider, { useChat } from '../lib/contexts/ChatProvider';
import { useSettings } from '../lib/useSettings';
import { usePdfViewer } from '../lib/usePdfViewer';

// 🚀 Dynamic Lazy Loaders for Heavy Modules
const PdfViewer = lazy(() => import('../components/PdfViewer'));
const ChatWindow = lazy(() => import('../components/ChatWindow/ChatWindow'));

const LayoutsContent = () => {
  const { isSettingsOpen, closeSettings } = useSettings();
  const { isOpen: isPdfOpen } = usePdfViewer();
  const { isOpen: isChatOpen } = useChat();

  return (
    <div className="body-container" id="body-container">
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} showPdfMode={true} showPdfReadingMode={true} />
      <AlertContainer />
      <ImageViewer />

      {/* Conditionally dynamic loaded PDF screen */}
      <Suspense fallback={null}>
        {isPdfOpen && <PdfViewer />}
      </Suspense>

      {/* Floating chat — portal-rendered, only loaded when activated */}
      <Suspense fallback={null}>
        {isChatOpen && <ChatWindow />}
      </Suspense>
      <ChatTrigger />
    </div>
  );
};

const Layouts = () => {
  return (
    <ChatProvider>
      <LayoutsContent />
    </ChatProvider>
  );
};

export default Layouts;
