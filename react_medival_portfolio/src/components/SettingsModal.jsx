import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/contexts/ThemeProvider';
import { useSettings } from '../lib/useSettings';
import { usePdfSettings, PDF_MODES } from '../lib/contexts/PdfSettingsContext';
import styles from './SettingsModal.module.scss';

/**
 * Universal SettingsModal
 *
 * Props:
 * @param {boolean} isOpen - controls visibility
 * @param {function} onClose - close handler
 * @param {boolean} showTheme - show theme switcher section (default: true)
 * @param {boolean} showLanguage - show language switcher section (default: true)
 * @param {boolean} showPdfMode - show PDF display mode section (default: false)
 * @param {Array} extraSections - array of custom sections to append
 *   each item: { id, title, content: ReactNode }
 * @param {string} title - modal title (default: '⚙️ Settings')
 */
const SettingsModal = ({
  isOpen,
  onClose,
  showTheme = true,
  showLanguage = true,
  showPdfMode = false,
  extraSections = [],
  title = '⚙️ Settings',
}) => {
  const { theme, themes, switchTheme } = useTheme();
  const { language, setLanguage } = useSettings();
  const pdfCtx = usePdfSettings(); // may be null if PdfSettingsProvider not in tree
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) focusableElements[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goToSettings = () => {
    onClose();
    navigate('/settings');
  };

  return createPortal(
    <div className={styles.overlay || styles['settings-modal-overlay']} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal || styles['settings-modal']}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header || styles['modal-header']}>
          <h3 id="settings-title" className={styles.title}>{title}</h3>
          <button
            className={styles.closeBtn || styles['close-btn']}
            onClick={onClose}
            aria-label="Close settings"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.body || styles['modal-body']}>
          {/* Theme Selector */}
          {showTheme && (
            <div className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>🎨 Theme</h4>
              <div className={styles.themeGrid || styles['theme-grid']}>
                {Object.values(themes).map(t => (
                  <button
                    key={t.id}
                    className={`${styles.themeCard || styles['theme-card']} ${theme === t.id ? (styles.active || styles['active']) : ''}`}
                    onClick={() => switchTheme(t.id)}
                    aria-label={`Switch to ${t.label} theme`}
                  >
                    <span className={styles.themeIcon || styles['theme-icon']}>{t.icon}</span>
                    <span className={styles.themeName || styles['theme-name']}>{t.label}</span>
                    {theme === t.id && <span className={styles.check || styles['active-check']}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Language Selector */}
          {showLanguage && (
            <div className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>📜 Language</h4>
              <div className={styles.optionButtons || styles['option-buttons']}>
                <button
                  onClick={() => setLanguage('en')}
                  className={`${styles.langBtn || styles['lang-btn']} ${language === 'en' ? (styles.active || styles['active']) : ''}`}
                >
                  <span className={styles.langFlag || styles['lang-flag']}>🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`${styles.langBtn || styles['lang-btn']} ${language === 'fr' ? (styles.active || styles['active']) : ''}`}
                >
                  <span className={styles.langFlag || styles['lang-flag']}>🇫🇷</span>
                  <span>Français</span>
                </button>
              </div>
            </div>
          )}

          {/* PDF mode section — shown when showPdfMode={true} AND context exists */}
          {showPdfMode && pdfCtx && (
            <div className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>PDF Display</h4>
              <p className={styles.sectionDesc}>Choose how PDF documents open</p>
              <div className={styles.pdfModeGrid}>
                {Object.values(PDF_MODES).map(mode => (
                  <button
                    key={mode.id}
                    className={`${styles.modeCard} ${pdfCtx.pdfMode === mode.id ? (styles.active || styles['active']) : ''}`}
                    onClick={() => pdfCtx.setPdfMode(mode.id)}
                  >
                    <span className={styles.modeIcon}>{mode.icon}</span>
                    <span className={styles.modeLabel}>{mode.label}</span>
                    <span className={styles.modeDesc}>{mode.description}</span>
                    {pdfCtx.pdfMode === mode.id && <span className={styles.check || styles['active-check']}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra custom sections — for future use */}
          {extraSections.map(section => (
            <div key={section.id} className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>{section.title}</h4>
              {section.content}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.advancedBtn} onClick={goToSettings}>
            ⚙️ Advanced Settings
            <span className={styles.advancedArrow}>→</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;