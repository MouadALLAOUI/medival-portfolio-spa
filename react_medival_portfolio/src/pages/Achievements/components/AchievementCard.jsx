import styles from './AchievementCard.module.scss';
import { RARITY_CONFIG } from '../../../lib/achievements/achievementsRegistry';

const AchievementCard = ({ achievement, unlockedData }) => {
  const isUnlocked = !!unlockedData;
  const rarity = RARITY_CONFIG[achievement.rarity];
  const isSecret = achievement.secret && !isUnlocked;

  return (
    <div
      className={`${styles.card} ${isUnlocked ? styles.unlocked : styles.locked} ${isSecret ? styles.secret : ''}`}
      style={{
        '--rarity-color': rarity.color,
        '--rarity-glow': rarity.glow,
      }}
    >
      <div className={styles.iconWrap}>
        <span className={styles.icon}>
          {isSecret ? '❓' : achievement.icon}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={styles.rarityBadge} style={{ color: rarity.color }}>
            ◆ {rarity.label}
          </span>
          <span className={styles.xp}>+{achievement.xp} XP</span>
        </div>

        <h3 className={styles.cardTitle}>
          {isSecret ? '???' : achievement.title}
        </h3>
        <p className={styles.cardDesc}>
          {isSecret ? 'Keep exploring to unlock this secret achievement' : achievement.description}
        </p>

        {isUnlocked && unlockedData.unlockedAt && (
          <span className={styles.unlockedDate}>
            🕐 {new Date(unlockedData.unlockedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {isUnlocked && <div className={styles.glowRing} />}
    </div>
  );
};

export default AchievementCard;
