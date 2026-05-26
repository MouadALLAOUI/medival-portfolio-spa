import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../lib/useSettings';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { setLanguage } = useSettings();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      // Cmd/Ctrl + Key shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault();
            navigate('/blogs');
            // We'll need a way to focus the search input once we're there
            break;
          case ',':
            e.preventDefault();
            // Trigger settings modal - we'll need a global event or context for this
            window.dispatchEvent(new CustomEvent('mp:open-settings'));
            break;
          case 'h':
            e.preventDefault();
            navigate('/home');
            break;
          case 'b':
            e.preventDefault();
            navigate('/blogs');
            break;
          default:
            break;
        }
      } else {
        // Single key shortcuts
        switch (e.key) {
          case 'Escape':
            window.dispatchEvent(new CustomEvent('mp:close-modals'));
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
};
