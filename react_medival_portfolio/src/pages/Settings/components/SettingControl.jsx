import { useTheme } from '../../../lib/contexts/ThemeProvider';
import { usePdfSettings } from '../../../lib/contexts/PdfSettingsContext';
import { useSettings } from '../../../lib/useSettings';
import { MARKDOWN_THEMES } from '../../../lib/markdown/markdownThemes';
import CustomColorPicker from './CustomColorPicker';
import styles from './SettingControl.module.scss';

const useSettingValue = (contextKey) => {
  const theme = useTheme();
  const pdf = usePdfSettings() || {};
  const settings = useSettings();

  const map = {
    theme: [theme.theme, theme.switchTheme],
    pdfMode: [pdf.pdfMode, pdf.setPdfMode],
    pdfReadingMode: [pdf.pdfReadingMode, pdf.setPdfReadingMode],
    language: [settings.language, settings.setLanguage],
    markdownTheme: [settings.markdownTheme, settings.setMarkdownTheme],
    reducedMotion: [settings.reducedMotion, settings.setReducedMotion],
    fontSize: [settings.fontSize, settings.setFontSize],
    customCursor: [settings.customCursor, settings.setCustomCursor],
    soundEnabled: [settings.soundEnabled, settings.setSoundEnabled],
    medievalFont: [settings.medievalFont, settings.setMedievalFont],
  };

  return map[contextKey] || [null, () => {}];
};

const SettingControl = ({ setting }) => {
  const [value, setValue] = useSettingValue(setting.contextKey);
  const { t } = useSettings();
  const settings = useSettings();
  const { themes } = useTheme();

  const label = t(`COMMON.settings.keys.${setting.id}.label`) || setting.label;
  const description = t(`COMMON.settings.keys.${setting.id}.description`) || setting.description;

  if (setting.type === 'markdown-theme-select') {
    return (
      <div className={styles.control}>
        <div className={styles.controlHeader}>
          <span className={styles.controlLabel}>{label}</span>
          <span className={styles.controlDesc}>{description}</span>
        </div>
        <div className={styles.mdThemeGrid}>
          {Object.values(MARKDOWN_THEMES).map(theme => {
            const isMedievalLang = settings.language && settings.language.startsWith('medieval');
            const displayLabel = isMedievalLang ? (theme.labelMedieval || theme.label) : (t(`COMMON.settings.keys.markdownTheme.options.${theme.id}.label`) || theme.label);
            return (
              <button key={theme.id} className={`${styles.mdThemeCard} ${value === theme.id ? styles.active : ''}`} onClick={() => setValue(theme.id)} type="button">
                <div className={styles.mdPreview} style={{ background: theme.preview.bg || 'var(--bg-card)', color: theme.preview.text || 'var(--text-primary)' }}>
                  <span style={{ color: theme.preview.accent || 'var(--accent)', fontSize: '0.6rem', fontWeight: 700 }}># Heading</span>
                  <span style={{ fontSize: '0.55rem', opacity: 0.8, color: theme.preview.text || 'var(--text-secondary)' }}>Lorem ipsum dolor sit...</span>
                  <span style={{ color: theme.preview.accent || 'var(--accent)', fontSize: '0.55rem' }}>[link](#) `code`</span>
                </div>
                <span className={styles.mdThemeIcon}>{theme.icon}</span>
                <span className={styles.mdThemeLabel}>{displayLabel}</span>
                <span className={styles.mdThemeDesc}>{theme.description}</span>
                {value === theme.id && <span className={styles.check}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (setting.type === 'theme-select') {
    return (
      <div className={styles.control}>
        <div className={styles.controlHeader}>
          <span className={styles.controlLabel}>{label}</span>
          <span className={styles.controlDesc}>{description}</span>
        </div>
        <div className={styles.themeGrid}>
          {Object.values(themes).map(themesItem => (
            <button key={themesItem.id} className={`${styles.themeCard} ${value === themesItem.id ? styles.active : ''}`} onClick={() => setValue(themesItem.id)} type="button">
              <span className={styles.optionIcon}>{themesItem.icon}</span>
              <span className={styles.optionLabel}>{t(`COMMON.settings.keys.theme.options.${themesItem.id}.label`) || themesItem.label}</span>
              {value === themesItem.id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
        {value === 'custom' && <CustomColorPicker />}
      </div>
    );
  }

  if (setting.type === 'option-select') {
    return (
      <div className={styles.control}>
        <div className={styles.controlHeader}>
          <span className={styles.controlLabel}>{label}</span>
          <span className={styles.controlDesc}>{description}</span>
        </div>
        <div className={styles.optionsGrid}>
          {setting.options.map(opt => (
            <button key={opt.id} className={`${styles.optionCard} ${value === opt.id ? styles.active : ''}`} onClick={() => setValue(opt.id)} type="button">
              <span className={styles.optionIcon}>{opt.icon}</span>
              <span className={styles.optionLabel} style={{ fontFamily: setting.id === 'medievalFont' ? (opt.id === 'Fell' ? "'IM Fell English SC', serif" : opt.id === 'Almendra' ? "'Almendra', serif" : opt.id === 'Uncial' ? "'Uncial Antiqua', cursive" : "'MedievalSharp', cursive") : undefined }}>
                {t(`COMMON.settings.keys.${setting.id}.options.${opt.id}.label`) || opt.label}
              </span>
              {(t(`COMMON.settings.keys.${setting.id}.options.${opt.id}.description`) || opt.description) && (
                <span className={styles.optionDesc}>{t(`COMMON.settings.keys.${setting.id}.options.${opt.id}.description`) || opt.description}</span>
              )}
              {value === opt.id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (setting.type === 'toggle') {
    return (
      <div className={styles.control}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.controlLabel}>{label}</span>
            <span className={styles.controlDesc}>{description}</span>
          </div>
          <button className={`${styles.toggle} ${value ? styles.toggleOn : ''}`} onClick={() => setValue(prev => !prev)} aria-checked={value} role="switch" type="button">
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SettingControl;
