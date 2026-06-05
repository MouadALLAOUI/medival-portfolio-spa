import { lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderComponent from '../components/Headers';
import Footer from '../components/footer';
import SettingsModal from '../components/SettingsModal';
import AlertContainer from '../components/AlertContainer';
import ImageViewer from '../components/ImageViewer';
import ChatTrigger from '../components/ChatTrigger/ChatTrigger';
import CompassToTop from '../components/ui/CompassToTop';
import ChatProvider, { useChat } from '../lib/contexts/ChatProvider';
import { useSettings } from '../lib/useSettings';
import { usePdfViewer } from '../lib/usePdfViewer';
import { useCodeCopy } from '../lib/hooks/useCodeCopy';
import { useAchievements } from '../lib/useAchievements';

// 🚀 Dynamic Lazy Loaders for Heavy Modules
const PdfViewer = lazy(() => import('../components/PdfViewer'));
const ChatWindow = lazy(() => import('../components/ChatWindow/ChatWindow'));

const LayoutsContent = () => {
  const { isSettingsOpen, closeSettings } = useSettings();
  const { isOpen: isPdfOpen } = usePdfViewer();
  const { isOpen: isChatOpen } = useChat();
  const { copyCode } = useCodeCopy();
  const { unlockAchievement } = useAchievements();
  const location = useLocation();

  useLayoutEffect(() => {
    // Blog posts manage their own scroll reset with a smooth animation — skip here
    if (location.pathname.startsWith('/blogs/')) return;
    const bodyContainer = document.getElementById('body-container');
    if (bodyContainer) {
      bodyContainer.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  // Centralized Global Code Copy Click Delegation (covers all sub-views, markdown, and pages)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      // 1. Multiline code block button copy
      const copyBtn = target.closest(".copy-btn");
      if (copyBtn instanceof HTMLElement) {
        const targetId = copyBtn.getAttribute("data-target");
        if (!targetId) return;
        const codeElement = document.getElementById(targetId);
        if (!codeElement) return;
        const text = codeElement.textContent || "";
        copyCode(text, "spellbook");
        unlockAchievement("copied_code");
        return;
      }

      // 2. Inline code block text click copy (any <code> tag that is not within a <pre> block)
      const isInlineCode = target.classList.contains("inline-code") ||
        (target.tagName === "CODE" && !target.closest("pre"));
      if (isInlineCode) {
        const text = target.textContent || "";
        target.classList.add("copied");
        copyCode(text, "inline scroll");
        unlockAchievement("copied_code");
        window.setTimeout(() => target.classList.remove("copied"), 1200);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [copyCode, unlockAchievement]);

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
      <CompassToTop />
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
