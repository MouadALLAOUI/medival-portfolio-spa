import { useTheme } from '../../../lib/contexts/ThemeProvider';
import { usePdfSettings } from '../../../lib/contexts/PdfSettingsContext';
import { useAppSettings } from '../../../lib/contexts/AppSettingsContext';
import { useSettings } from '../../../lib/useSettings';
import styles from './SettingControl.module.scss';

// Maps contextKey → [currentValue, setter] from the correct context
const useSettingValue = (contextKey) => {
  const theme = useTheme();
  const pdf = usePdfSettings() || {};
  const app = useAppSettings() || {};
  const settings = useSettings();

  const map = {
    theme:          [theme.theme,           theme.switchTheme],
    pdfMode:        [pdf.pdfMode,           pdf.setPdfMode],
    pdfReadingMode: [pdf.pdfReadingMode,    pdf.setPdfReadingMode],
    language:       [settings.language,     settings.setLanguage],
    markdownTheme:  [app.markdownTheme,     app.setMarkdownTheme],
    reducedMotion:  [app.reducedMotion,     app.setReducedMotion],
    fontSize:       [app.fontSize,          app.setFontSize],
    // add new settings here when adding to a context
  };

  return map[contextKey] || [null, () => {}];
};

const SettingControl = ({ setting }) => {
  const [value, setValue] = useSettingValue(setting.contextKey);

  // ── Theme select ─────────────────────────────────────────────
  if (setting.type === 'theme-select') {
    const { themes } = useTheme();
    return (
      <div className={styles.control}>
        <div className={styles.controlHeader}>
          <span className={styles.controlLabel}>{setting.label}</span>
          <span className={styles.controlDesc}>{setting.description}</span>
        </div>
        <div className={styles.themeGrid}>
          {Object.values(themes).map(t => (
            <button
              key={t.id}
              className={`${styles.themeCard} ${value === t.id ? styles.active : ''}`}
              onClick={() => setValue(t.id)}
              type="button"
            >
              <span className={styles.optionIcon}>{t.icon}</span>
              <span className={styles.optionLabel}>{t.label}</span>
              {value === t.id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Option select (grid of cards) ────────────────────────────
  if (setting.type === 'option-select') {
    return (
      <div className={styles.control}>
        <div className={styles.controlHeader}>
          <span className={styles.controlLabel}>{setting.label}</span>
          <span className={styles.controlDesc}>{setting.description}</span>
        </div>
        <div className={styles.optionsGrid}>
          {setting.options.map(opt => (
            <button
              key={opt.id}
              className={`${styles.optionCard} ${value === opt.id ? styles.active : ''}`}
              onClick={() => setValue(opt.id)}
              type="button"
            >
              <span className={styles.optionIcon}>{opt.icon}</span>
              <span className={styles.optionLabel}>{opt.label}</span>
              {opt.description && (
                <span className={styles.optionDesc}>{opt.description}</span>
              )}
              {value === opt.id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Toggle ───────────────────────────────────────────────────
  if (setting.type === 'toggle') {
    return (
      <div className={styles.control}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.controlLabel}>{setting.label}</span>
            <span className={styles.controlDesc}>{setting.description}</span>
          </div>
          <button
            className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
            onClick={() => setValue(prev => !prev)}
            aria-checked={value}
            role="switch"
            type="button"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SettingControl;
