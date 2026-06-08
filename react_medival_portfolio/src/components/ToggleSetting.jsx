import styles from './SettingsModal.module.scss';

export default function ToggleSetting({ label, isActive, activeLabel, inactiveLabel, onToggle }) {
  return (
    <div className={styles['a11y-item']}>
      <label className={styles['a11y-label']}>{label}</label>
      <button
        onClick={onToggle}
        className={`${styles['lang-btn']} ${isActive ? styles['active'] : ''}`}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        {isActive ? activeLabel : inactiveLabel}
      </button>
    </div>
  );
}
