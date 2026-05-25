import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../lib/useSettings';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useSettings();

  return (
    <div className={styles.container}>
      <div className={styles.parchmentPanel}>
        {/* Decorative Sigil/Crest */}
        <div className={styles.crest}>
          <span className={styles.crestIcon}>🛡️</span>
        </div>

        {/* Localized Heading Block */}
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>
            {t('COMMON.notFound.title') || '🛡️ 404 - Scroll Lost in the Void'}
          </h1>
          <p className={styles.subtitle}>
            {t('COMMON.notFound.subtitle') || 'The parchment you seek has vanished from the kingdom\'s library.'}
          </p>
        </div>

        {/* Separator Line */}
        <div className={styles.divider} />

        {/* Detailed Lore Description */}
        <p className={styles.description}>
          {t('COMMON.notFound.description') || 
            'Perhaps the address was misspelled, or the page has been incinerated by dragon fire. Verify your coordinates and try again, traveler.'}
        </p>

        {/* Return Button */}
        <button 
          className={styles.returnBtn} 
          onClick={() => navigate('/home')}
          type="button"
        >
          {t('COMMON.notFound.backBtn') || '⬅️ Return to Castle'}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
