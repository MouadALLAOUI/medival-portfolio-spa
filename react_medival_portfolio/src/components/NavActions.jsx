import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../lib/useAchievements';
import { useSettings } from '../lib/useSettings';
import styles from './Headers.module.scss';

export default function NavActions() {
  const navigate = useNavigate();
  const { openSettings, t } = useSettings();
  const { unlockedCount, totalCount } = useAchievements();

  return (
    <div className={styles['nav-actions']}>
      <button
        className={styles['achievementsBtn']}
        onClick={() => navigate('/achievements')}
        type="button"
        aria-label={t('achievements.navLabel') || 'Achievements'}
        title={t('achievements.navLabel') || 'Achievements'}
      >
        🏆
        {unlockedCount !== undefined && totalCount !== undefined && (
          <span className={styles['achievementsBadge']}>
            {unlockedCount}/{totalCount}
          </span>
        )}
      </button>
      <button
        className={styles['nav-gear-btn']}
        type="button"
        aria-label={t('COMMON.nav.settingsGear')}
        onClick={openSettings}
      >
        ⚙
      </button>
    </div>
  );
}
