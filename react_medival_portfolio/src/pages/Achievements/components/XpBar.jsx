import styles from './XpBar.module.scss';

const XP_PER_LEVEL = 100;

const XpBar = ({ totalXp, unlockedCount, totalCount }) => {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const progress = (xpInLevel / XP_PER_LEVEL) * 100;

  const TITLES = [
    'Wanderer', 'Apprentice', 'Scribe', 'Mage', 'Sorcerer',
    'Archmage', 'Wizard', 'Grand Wizard', 'Arcane Master', 'Legend',
  ];
  const title = TITLES[Math.min(level - 1, TITLES.length - 1)];

  return (
    <div className={styles.xpBar}>
      <div className={styles.xpHeader}>
        <span className={styles.level}>Lv. {level}</span>
        <span className={styles.levelTitle}>{title}</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.xpFooter}>
        <span>{xpInLevel} / {XP_PER_LEVEL} XP</span>
        <span>{unlockedCount} / {totalCount} unlocked</span>
      </div>
    </div>
  );
};

export default XpBar;
