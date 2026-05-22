import { useSettings } from '../lib/useSettings';
import { useEffect, useRef } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center animate-fade-in">
      <div
        ref={modalRef}
        className="settings-modal parchment-container max-w-md w-full mx-4 rounded-lg shadow-2xl border-2 border-gold animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="modal-header flex justify-between items-center p-6 border-b-2 border-gold/30">
          <h2 id="settings-title" className="text-2xl font-medieval text-gold">
            ⚙️ Rune Settings
          </h2>
          <button
            onClick={onClose}
            className="close-btn text-2xl hover:text-red-600 transition-colors"
            aria-label="Close settings"
          >
            ×
          </button>
        </div>

        <div className="modal-body p-6 space-y-6">
          {/* Theme Selector */}
          <div className="setting-group">
            <label className="block text-lg font-medieval text-gray-800 mb-3">
              🌙 Theme
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setTheme('day')}
                className={`theme-btn flex-1 p-4 rounded-lg border-2 transition-all duration-300
                  ${theme === 'day'
                    ? 'border-gold bg-yellow-100 shadow-lg scale-105'
                    : 'border-gray-400 bg-gray-100 hover:border-gold-light'
                  }`}
              >
                <span className="text-2xl block mb-2">☀️</span>
                <span className="font-medium">Day</span>
              </button>
              <button
                onClick={() => setTheme('night')}
                className={`theme-btn flex-1 p-4 rounded-lg border-2 transition-all duration-300
                  ${theme === 'night'
                    ? 'border-gold bg-indigo-900 shadow-lg scale-105'
                    : 'border-gray-400 bg-gray-100 hover:border-gold-light'
                  }`}
              >
                <span className="text-2xl block mb-2">🌙</span>
                <span className="font-medium">Night</span>
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="setting-group">
            <label className="block text-lg font-medieval text-gray-800 mb-3">
              📜 Language
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setLanguage('en')}
                className={`language-btn flex-1 p-4 rounded-lg border-2 transition-all duration-300
                  ${language === 'en'
                    ? 'border-gold bg-blue-100 shadow-lg scale-105'
                    : 'border-gray-400 bg-gray-100 hover:border-gold-light'
                  }`}
              >
                <span className="text-2xl block mb-2">🇬🇧</span>
                <span className="font-medium">English</span>
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`language-btn flex-1 p-4 rounded-lg border-2 transition-all duration-300
                  ${language === 'fr'
                    ? 'border-gold bg-red-100 shadow-lg scale-105'
                    : 'border-gray-400 bg-gray-100 hover:border-gold-light'
                  }`}
              >
                <span className="text-2xl block mb-2">🇫🇷</span>
                <span className="font-medium">Français</span>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer p-6 border-t-2 border-gold/30 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gold hover:bg-gold-light text-white font-medieval rounded-lg transition-colors shadow-lg"
          >
            ✨ Apply Runes
          </button>
        </div>
      </div>
    </div>
  );
}