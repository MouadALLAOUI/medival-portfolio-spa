import { useSettings } from '../../lib/useSettings';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  const { t } = useSettings();

  return (
    <div className={styles.container}>
      <div className={styles.loaderContent}>
        {/* Arcane Sigil Wheel */}
        <div className={styles.sigilContainer}>
          <div className={styles.sigilOuter} />
          <div className={styles.sigilInner} />
          <div className={styles.sigilCore}>🔮</div>
        </div>
        
        {/* Localized Status Text */}
        <h2 className={styles.statusText}>
          {t('COMMON.pdfViewer.loading') || '🔮 Unrolling scroll of wisdom...'}
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
