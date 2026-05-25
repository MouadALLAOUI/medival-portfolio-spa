import { useTheme } from '../../lib/contexts/ThemeProvider';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const { theme, themes, switchTheme } = useTheme();

  return (
    <div className={styles.switcher} id="theme-switcher">
      {Object.values(themes).map((t) => (
        <button
          key={t.id}
          className={`${styles.themeBtn} ${theme === t.id ? styles.active : ''}`}
          onClick={() => switchTheme(t.id)}
          title={t.label}
          aria-label={`Switch to ${t.label} theme`}
        >
          <span className={styles.icon}>{t.icon}</span>
          <span className={styles.label}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
