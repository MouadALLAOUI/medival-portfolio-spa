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
  title,
}) => {
  const { theme, themes, switchTheme } = useTheme();
  const {
    language, setLanguage,
    fontSize, setFontSize,
    reducedMotion, setReducedMotion,
    customCursor, setCustomCursor,
    soundEnabled, setSoundEnabled,
    t
  } = useSettings();
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

  const displayTitle = title || t('COMMON.settings.title');

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
          <h3 id="settings-title" className={styles.title}>{displayTitle}</h3>
          <button
            className={styles.closeBtn || styles['close-btn']}
            onClick={onClose}
            aria-label={t('COMMON.settings.closeBtn')}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.body || styles['modal-body']}>
          {/* Theme Selector */}
          {showTheme && (
            <div className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>{t('COMMON.settings.themeLabel')}</h4>
              <div className={styles.themeGrid || styles['theme-grid']}>
                {Object.values(themes).map(themesItem => (
                  <button
                    key={themesItem.id}
                    className={`${styles.themeCard || styles['theme-card']} ${theme === themesItem.id ? (styles.active || styles['active']) : ''}`}
                    onClick={() => switchTheme(themesItem.id)}
                    aria-label={t(`COMMON.settings.keys.theme.options.${themesItem.id}.description`)}
                  >
                    <span className={styles.themeIcon || styles['theme-icon']}>{themesItem.icon}</span>
                    <span className={styles.themeName || styles['theme-name']}>
                      {t(`COMMON.settings.keys.theme.options.${themesItem.id}.label`) || themesItem.label}
                    </span>
                    {theme === themesItem.id && <span className={styles.check || styles['active-check']}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Language Selector */}
          {showLanguage && (
            <div className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>{t('COMMON.settings.keys.language.label')}</h4>
              <div className={styles.optionButtons || styles['option-buttons']}>
                {[
                  { id: 'en', label: 'English', flag: '🇬🇧' },
                  { id: 'fr', label: 'Français', flag: '🇫🇷' },
                  { id: 'ar', label: 'العربية', flag: '🇲🇦' },
                  // { id: 'medieval-en', label: t('COMMON.settings.keys.language.options.medieval-en.label'), flag: '📜' },
                  // { id: 'medieval-fr', label: t('COMMON.settings.keys.language.options.medieval-fr.label'), flag: '🏰' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`${styles.langBtn || styles['lang-btn']} ${language === lang.id ? (styles.active || styles['active']) : ''}`}
                  >
                    <span className={styles.langFlag || styles['lang-flag']}>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Accessibility Settings */}
          <div className={styles.section || styles['setting-group']}>
            <h4 className={styles.sectionTitle || styles['group-label']}>{t('COMMON.settings.sections.accessibility.title')}</h4>

            <div className={styles['a11y-controls']}>
              <div className={styles['a11y-item']}>
                <label className={styles['a11y-label']}>{t('COMMON.settings.fontSizeLabel')}</label>
                <div className={styles['option-buttons']}>
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`${styles['lang-btn']} ${fontSize === size ? styles['active'] : ''}`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles['a11y-item']}>
                <label className={styles['a11y-label']}>{t('COMMON.settings.motionLabel')}</label>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`${styles['lang-btn']} ${reducedMotion ? styles['active'] : ''}`}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {reducedMotion ? t('COMMON.settings.motionActive') : t('COMMON.settings.motionNormal')}
                </button>
              </div>
            </div>
          </div>

          {/* Delight & Polish */}
          <div className={styles.section || styles['setting-group']}>
            <h4 className={styles.sectionTitle || styles['group-label']}>{t('COMMON.settings.sections.appearance.title')}</h4>
            <div className={styles['a11y-controls']}>
              <div className={styles['a11y-item']}>
                <label className={styles['a11y-label']}>{t('COMMON.settings.keys.customCursor.label') || 'Medieval Cursor'}</label>
                <button
                  onClick={() => setCustomCursor(!customCursor)}
                  className={`${styles['lang-btn']} ${customCursor ? styles['active'] : ''}`}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {customCursor ? t('COMMON.settings.keys.customCursor.options.enabled.label') || 'Active' : t('COMMON.settings.keys.customCursor.options.disabled.label') || 'Disabled'}
                </button>
              </div>

              <div className={styles['a11y-item']}>
                <label className={styles['a11y-label']}>{t('COMMON.settings.keys.soundEnabled.label') || 'Arcane Sounds'}</label>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`${styles['lang-btn']} ${soundEnabled ? styles['active'] : ''}`}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {soundEnabled ? t('COMMON.settings.keys.soundEnabled.options.enabled.label') || 'On' : t('COMMON.settings.keys.soundEnabled.options.disabled.label') || 'Muted'}
                </button>
              </div>
            </div>
          </div>

          {/* PDF mode section — shown when showPdfMode={true} AND context exists */}
          {showPdfMode && pdfCtx && (
            <div className={styles.section || styles['setting-group']}>
              <h4 className={styles.sectionTitle || styles['group-label']}>{t('COMMON.settings.keys.pdfMode.label')}</h4>
              <p className={styles.sectionDesc}>{t('COMMON.settings.keys.pdfMode.description')}</p>
              <div className={styles.pdfModeGrid}>
                {Object.values(PDF_MODES).map(mode => (
                  <button
                    key={mode.id}
                    className={`${styles.modeCard} ${pdfCtx.pdfMode === mode.id ? (styles.active || styles['active']) : ''}`}
                    onClick={() => pdfCtx.setPdfMode(mode.id)}
                  >
                    <span className={styles.modeIcon}>{mode.icon}</span>
                    <span className={styles.modeLabel}>
                      {t(`COMMON.settings.keys.pdfMode.options.${mode.id}.label`) || mode.label}
                    </span>
                    <span className={styles.modeDesc}>
                      {t(`COMMON.settings.keys.pdfMode.options.${mode.id}.description`) || mode.description}
                    </span>
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
            {t('COMMON.settings.advancedBtn')}
            <span className={styles.advancedArrow}>→</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};


export default SettingsModal;