import styles from './SettingsModal.module.scss';

export default function SettingsSection({ title, children }) {
  return (
    <div className={styles.section || styles['setting-group']}>
      <h4 className={styles.sectionTitle || styles['group-label']}>{title}</h4>
      {children}
    </div>
  );
}
