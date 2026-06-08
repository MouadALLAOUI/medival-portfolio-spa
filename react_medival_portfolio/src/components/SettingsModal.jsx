import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/contexts/ThemeProvider';
import { useSettings } from '../lib/useSettings';
import { usePdfSettings, PDF_MODES } from '../lib/contexts/PdfSettingsContext';
import { useSound } from '../lib/hooks/useSound';
import SettingsSection from './SettingsSection';
import ToggleSetting from './ToggleSetting';
import styles from './SettingsModal.module.scss';

const WEATHER_TYPES = [
  { id: 'none', label: 'Clear Skies', icon: '☀️' },
  { id: 'snow', label: 'Winter Frost', icon: '❄️' },
  { id: 'rain', label: 'Tempest Rain', icon: '🌧️' },
  { id: 'leaves', label: 'Autumn Leaves', icon: '🍂' },
  { id: 'fog', label: 'Mystic Mist', icon: '🌫️' },
  { id: 'lightning', label: 'Thunderstorm', icon: '⚡' },
];

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
    weather, setWeather,
    t
  } = useSettings();
  const pdfCtx = usePdfSettings();
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { play: playSound } = useSound();

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) focusable[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goToSettings = () => { onClose(); navigate('/settings'); };

  return createPortal(
    <div className={styles.overlay || styles['settings-modal-overlay']} onClick={onClose}>
      <div ref={modalRef} className={styles.modal || styles['settings-modal']} role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={e => e.stopPropagation()}>
        <div className={styles.header || styles['modal-header']}>
          <h3 id="settings-title" className={styles.title}>{title || t('COMMON.settings.title')}</h3>
          <button className={styles.closeBtn || styles['close-btn']} onClick={onClose} aria-label={t('COMMON.settings.closeBtn')}>×</button>
        </div>

        <div className={styles.body || styles['modal-body']}>
          {showTheme && (
            <SettingsSection title={t('COMMON.settings.themeLabel')}>
              <div className={styles.themeGrid || styles['theme-grid']}>
                {Object.values(themes).map(themesItem => (
                  <button key={themesItem.id} className={`${styles.themeCard || styles['theme-card']} ${theme === themesItem.id ? (styles.active || styles['active']) : ''}`} onClick={() => { switchTheme(themesItem.id); playSound('button'); }} aria-label={t(`COMMON.settings.keys.theme.options.${themesItem.id}.description`)}>
                    <span className={styles.themeIcon || styles['theme-icon']}>{themesItem.icon}</span>
                    <span className={styles.themeName || styles['theme-name']}>{t(`COMMON.settings.keys.theme.options.${themesItem.id}.label`) || themesItem.label}</span>
                    {theme === themesItem.id && <span className={styles.check || styles['active-check']}>✓</span>}
                  </button>
                ))}
              </div>
            </SettingsSection>
          )}

          {showLanguage && (
            <SettingsSection title={t('COMMON.settings.keys.language.label')}>
              <div className={styles.optionButtons || styles['option-buttons']}>
                {[
                  { id: 'en', label: 'English', flag: '🇬🇧' },
                  { id: 'fr', label: 'Français', flag: '🇫🇷' },
                  { id: 'ar', label: 'العربية', flag: '🇲🇦' },
                ].map((lang) => (
                  <button key={lang.id} onClick={() => { setLanguage(lang.id); playSound('paper'); }} className={`${styles.langBtn || styles['lang-btn']} ${language === lang.id ? (styles.active || styles['active']) : ''}`}>
                    <span className={styles.langFlag || styles['lang-flag']}>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </SettingsSection>
          )}

          <SettingsSection title={t('COMMON.settings.sections.accessibility.title')}>
            <div className={styles['a11y-controls']}>
              <div className={styles['a11y-item']}>
                <label className={styles['a11y-label']}>{t('COMMON.settings.fontSizeLabel')}</label>
                <div className={styles['option-buttons']}>
                  {['small', 'medium', 'large'].map((size) => (
                    <button key={size} onClick={() => setFontSize(size)} className={`${styles['lang-btn']} ${fontSize === size ? styles['active'] : ''}`}>
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ToggleSetting label={t('COMMON.settings.motionLabel')} isActive={reducedMotion} activeLabel={t('COMMON.settings.motionActive')} inactiveLabel={t('COMMON.settings.motionNormal')} onToggle={() => { setReducedMotion(!reducedMotion); playSound('clink'); }} />
            </div>
          </SettingsSection>

          <SettingsSection title={t('COMMON.settings.sections.appearance.title')}>
            <div className={styles['a11y-controls']}>
              <ToggleSetting label={t('COMMON.settings.keys.customCursor.label') || 'Medieval Cursor'} isActive={customCursor} activeLabel={t('COMMON.settings.keys.customCursor.options.enabled.label') || 'Active'} inactiveLabel={t('COMMON.settings.keys.customCursor.options.disabled.label') || 'Disabled'} onToggle={() => { setCustomCursor(!customCursor); playSound('clink'); }} />
              <ToggleSetting label={t('COMMON.settings.keys.soundEnabled.label') || 'Arcane Sounds'} isActive={soundEnabled} activeLabel={t('COMMON.settings.keys.soundEnabled.options.enabled.label') || 'On'} inactiveLabel={t('COMMON.settings.keys.soundEnabled.options.disabled.label') || 'Muted'} onToggle={() => { setSoundEnabled(!soundEnabled); playSound('clink'); }} />
            </div>
          </SettingsSection>

          <SettingsSection title={t('COMMON.settings.keys.weather.label') || '⚡ Weather Effects'}>
            <div className={styles.themeGrid || styles['theme-grid']}>
              {WEATHER_TYPES.map((w) => (
                <button key={w.id} className={`${styles.themeCard || styles['theme-card']} ${weather === w.id ? (styles.active || styles['active']) : ''}`} onClick={() => setWeather(w.id)} aria-label={w.label}>
                  <span className={styles.themeIcon || styles['theme-icon']}>{w.icon}</span>
                  <span className={styles.themeName || styles['theme-name']}>{w.label}</span>
                  {weather === w.id && <span className={styles.check || styles['active-check']}>✓</span>}
                </button>
              ))}
            </div>
          </SettingsSection>

          {showPdfMode && pdfCtx && (
            <SettingsSection title={t('COMMON.settings.keys.pdfMode.label')}>
              <p className={styles.sectionDesc}>{t('COMMON.settings.keys.pdfMode.description')}</p>
              <div className={styles.pdfModeGrid}>
                {Object.values(PDF_MODES).map(mode => (
                  <button key={mode.id} className={`${styles.modeCard} ${pdfCtx.pdfMode === mode.id ? (styles.active || styles['active']) : ''}`} onClick={() => pdfCtx.setPdfMode(mode.id)}>
                    <span className={styles.modeIcon}>{mode.icon}</span>
                    <span className={styles.modeLabel}>{t(`COMMON.settings.keys.pdfMode.options.${mode.id}.label`) || mode.label}</span>
                    <span className={styles.modeDesc}>{t(`COMMON.settings.keys.pdfMode.options.${mode.id}.description`) || mode.description}</span>
                    {pdfCtx.pdfMode === mode.id && <span className={styles.check || styles['active-check']}>✓</span>}
                  </button>
                ))}
              </div>
            </SettingsSection>
          )}

          {extraSections.map(section => (
            <SettingsSection key={section.id} title={section.title}>{section.content}</SettingsSection>
          ))}
        </div>

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
