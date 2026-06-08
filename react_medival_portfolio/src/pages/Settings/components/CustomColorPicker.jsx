import { useTheme } from '../../../lib/contexts/ThemeProvider';
import { useSettings } from '../../../lib/useSettings';
import styles from './SettingControl.module.scss';

export default function CustomColorPicker() {
  const { customColors, updateCustomColor } = useTheme();
  const { t } = useSettings();

  const colorFields = [
    { key: 'bg', label: t('COMMON.settings.customTheme.bg') || 'Background' },
    { key: 'cardBg', label: t('COMMON.settings.customTheme.cardBg') || 'Cards & Panels' },
    { key: 'text', label: t('COMMON.settings.customTheme.text') || 'Text Color' },
    { key: 'accent', label: t('COMMON.settings.customTheme.accent') || 'Accent Color' },
    { key: 'border', label: t('COMMON.settings.customTheme.border') || 'Borders' },
  ];

  if (!customColors) return null;

  return (
    <div className={styles.customColorPickerContainer}>
      <h4 className={styles.customColorTitle}>{t('COMMON.settings.customTheme.title') || '🎨 Configure Your Grimoire'}</h4>
      <p className={styles.customColorSubtitle}>{t('COMMON.settings.customTheme.subtitle') || 'Select custom colors to forge your own unique theme.'}</p>
      <div className={styles.customColorGrid}>
        {colorFields.map(({ key, label }) => (
          <div key={key} className={styles.colorInputGroup}>
            <label className={styles.colorLabel}>{label}</label>
            <div className={styles.colorInputWrapper}>
              <input type="color" className={styles.colorInput} value={customColors[key]} onChange={(e) => updateCustomColor(key, e.target.value)} />
              <span className={styles.colorText}>{customColors[key]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
