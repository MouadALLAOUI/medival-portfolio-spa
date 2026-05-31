import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../lib/useSettings';
import { useAchievements } from '../../lib/useAchievements';
import { SETTINGS_SECTIONS } from '../../lib/settings/settingsRegistry';
import SettingSection from './components/SettingSection';
import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  // const navigate = useNavigate();
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();
  const [activeSection, setActiveSection] = useState(SETTINGS_SECTIONS[0].id);

  useEffect(() => {
    unlockAchievement('visited_settings');
  }, [unlockAchievement]);

  const current = SETTINGS_SECTIONS.find(s => s.id === activeSection);

  return (
    <div className={styles.page}>
      {/* Top header bar */}
      {/* <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} type="button">
          {t('COMMON.settings.backBtn')}
        </button>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>⚙️ {t('COMMON.settings.title')}</h1>
          <p className={styles.subtitle}>{t('COMMON.settings.subtitle')}</p>
        </div>
      </div> */}

      {/* Dashboard layout */}
      <div className={styles.dashboard}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            {SETTINGS_SECTIONS.map(section => {
              const translatedTitle = t(`COMMON.settings.sections.${section.id}.title`) || section.title;
              const translatedDesc = t(`COMMON.settings.sections.${section.id}.description`) || section.description;

              // Split off the first emoji symbol
              const titleWords = translatedTitle.split(' ');
              const emoji = titleWords[0];
              const label = titleWords.slice(1).join(' ');

              return (
                <button
                  key={section.id}
                  className={`${styles.sidebarItem} ${activeSection === section.id ? styles.sidebarActive : ''}`}
                  onClick={() => setActiveSection(section.id)}
                  type="button"
                >
                  <span className={styles.sidebarIcon}>{emoji}</span>
                  <div className={styles.sidebarText}>
                    <span className={styles.sidebarLabel}>{label}</span>
                    {translatedDesc && (
                      <span className={styles.sidebarDesc}>{translatedDesc}</span>
                    )}
                  </div>
                  {activeSection === section.id && (
                    <span className={styles.sidebarIndicator} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar footer — version info */}
          <div className={styles.sidebarFooter}>
            <span className={styles.versionLabel}>Portfolio v2.0</span>
          </div>
        </aside>

        {/* Content panel */}
        <main className={styles.content}>
          {current && (
            <SettingSection key={current.id} section={current} />
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
