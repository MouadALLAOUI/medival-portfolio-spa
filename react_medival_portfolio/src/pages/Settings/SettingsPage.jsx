import { useNavigate } from 'react-router-dom';
import { SETTINGS_SECTIONS } from '../../lib/settings/settingsRegistry';
import SettingSection from './components/SettingSection';
import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} type="button">
          ← Back
        </button>
        <h1 className={styles.title}>⚙️ Settings</h1>
        <p className={styles.subtitle}>Customize your portfolio experience</p>
      </div>

      <div className={styles.sectionsGrid}>
        {SETTINGS_SECTIONS.map(section => (
          <SettingSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
