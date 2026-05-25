import { useSettings } from '../../../lib/useSettings';
import SettingControl from './SettingControl';
import styles from './SettingSection.module.scss';

const SettingSection = ({ section }) => {
  const { t } = useSettings();

  return (
    <div className={styles.section} id={section.id}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {t(`COMMON.settings.sections.${section.id}.title`) || section.title}
        </h2>
        {section.description && (
          <p className={styles.sectionDesc}>
            {t(`COMMON.settings.sections.${section.id}.description`) || section.description}
          </p>
        )}
      </div>
      <div className={styles.settingsList}>
        {section.settings.map(setting => (
          <SettingControl key={setting.id} setting={setting} />
        ))}
      </div>
    </div>
  );
};

export default SettingSection;

