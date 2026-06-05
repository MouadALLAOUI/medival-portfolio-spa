import { useRef, useCallback } from 'react';
import styles from './AchievementCard.module.scss';
import { RARITY_CONFIG } from '../../../lib/achievements/achievementsRegistry';

const HOLO_RARITIES = new Set(['rare', 'epic', 'legendary']);

const AchievementCard = ({ achievement, unlockedData }) => {
  const isUnlocked = !!unlockedData;
  const rarity = RARITY_CONFIG[achievement.rarity];
  const isSecret = achievement.secret && !isUnlocked;
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    card.style.setProperty('--holo-angle', `${angle}deg`);
    card.style.setProperty('--holo-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--holo-y', `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--holo-angle', '0deg');
    card.style.setProperty('--holo-x', '50%');
    card.style.setProperty('--holo-y', '50%');
  }, []);

  const showHolo = HOLO_RARITIES.has(achievement.rarity) && isUnlocked;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isUnlocked ? styles.unlocked : styles.locked} ${isSecret ? styles.secret : ''} ${showHolo ? styles.holo : ''}`}
      style={{
        '--rarity-color': rarity.color,
        '--rarity-glow': rarity.glow,
      }}
      onMouseMove={showHolo ? handleMouseMove : undefined}
      onMouseLeave={showHolo ? handleMouseLeave : undefined}
    >
      {showHolo && <div className={styles.holoSheen} />}

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
