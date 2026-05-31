import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../lib/useAchievements';
import { useSettings } from '../../lib/useSettings';
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, RARITY_CONFIG } from '../../lib/achievements/achievementsRegistry';
import AchievementCard from './components/AchievementCard';
import XpBar from './components/XpBar';
import styles from './AchievementsPage.module.scss';

const AchievementsPage = () => {
  const navigate = useNavigate();
  const { t } = useSettings();
  const { unlocked, totalXp, unlockedCount, totalCount } = useAchievements();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeRarity, setActiveRarity] = useState('all');
  const [showLocked, setShowLocked] = useState(true);

  const filtered = Object.values(ACHIEVEMENTS).filter(a => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false;
    if (activeRarity !== 'all' && a.rarity !== activeRarity) return false;
    if (!showLocked && !unlocked[a.id]) return false;
    return true;
  });

  const unlockedFiltered = filtered.filter(a => unlocked[a.id]);
  const lockedFiltered = filtered.filter(a => !unlocked[a.id]);

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} type="button">
          {t('COMMON.settings.backBtn') || 'Back'}
        </button>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>🏆 {t('achievements.title') || 'Achievement Vault'}</h1>
          <p className={styles.subtitle}>
            {unlockedCount} / {totalCount} {t('achievements.unlocked') || 'Unlocked'} · {totalXp} {t('achievements.xpSuffix') || 'XP'}
          </p>
        </div>
      </div>

      <div className={styles.dashboard}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>

          {/* XP progress */}
          <XpBar totalXp={totalXp} unlockedCount={unlockedCount} totalCount={totalCount} />

          {/* Category filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>{t('achievements.category') || 'Category'}</span>
            <button
              className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => setActiveCategory('all')}
              type="button"
            >
              🎯 {t('achievements.allCategories') || 'All'}
            </button>
            {Object.entries(ACHIEVEMENT_CATEGORIES).map(([id, cat]) => (
              <button
                key={id}
                className={`${styles.filterBtn} ${activeCategory === id ? styles.active : ''}`}
                onClick={() => setActiveCategory(id)}
                type="button"
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Rarity filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>{t('achievements.rarity') || 'Rarity'}</span>
            <button
              className={`${styles.filterBtn} ${activeRarity === 'all' ? styles.active : ''}`}
              onClick={() => setActiveRarity('all')}
              type="button"
            >
              ◆ {t('achievements.allRarities') || 'All Rarities'}
            </button>
            {Object.entries(RARITY_CONFIG).map(([id, r]) => (
              <button
                key={id}
                className={`${styles.filterBtn} ${activeRarity === id ? styles.active : ''}`}
                style={{ '--rarity-color': r.color }}
                onClick={() => setActiveRarity(id)}
                type="button"
              >
                <span style={{ color: r.color }}>◆</span> {r.label}
              </button>
            ))}
          </div>

          {/* Show locked toggle */}
          <div className={styles.filterGroup}>
            <label className={styles.toggleRow}>
              <span className={styles.filterLabel}>{t('achievements.showLocked') || 'Show Locked'}</span>
              <button
                className={`${styles.toggle} ${showLocked ? styles.toggleOn : ''}`}
                onClick={() => setShowLocked(p => !p)}
                type="button"
                aria-label="Toggle locked achievements visibility"
              >
                <span className={styles.toggleThumb} />
              </button>
            </label>
          </div>

        </aside>

        {/* Main content */}
        <main className={styles.content}>

          {/* Unlocked */}
          {unlockedFiltered.length > 0 && (
            <div className={styles.group}>
              <h2 className={styles.groupTitle}>
                ✅ {t('achievements.unlocked') || 'Unlocked'} ({unlockedFiltered.length})
              </h2>
              <div className={styles.grid}>
                {unlockedFiltered.map(a => (
                  <AchievementCard
                    key={a.id}
                    achievement={a}
                    unlockedData={unlocked[a.id]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Locked */}
          {showLocked && lockedFiltered.length > 0 && (
            <div className={styles.group}>
              <h2 className={styles.groupTitle}>
                🔒 {t('achievements.locked') || 'Locked'} ({lockedFiltered.length})
              </h2>
              <div className={styles.grid}>
                {lockedFiltered.map(a => (
                  <AchievementCard
                    key={a.id}
                    achievement={a}
                    unlockedData={null}
                  />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🔍</span>
              <p>{t('achievements.empty') || 'No achievements match your filters'}</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AchievementsPage;
