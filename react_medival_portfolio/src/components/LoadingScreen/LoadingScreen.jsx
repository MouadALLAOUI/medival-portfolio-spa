import { useSettings } from '../../lib/useSettings';
import SkeletonWireframe from '../SkeletonWireframe';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = ({ showSkeletons = false }) => {
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

      {/* Hand-sketched wireframe skeletons */}
      {showSkeletons && (
        <div className={styles.skeletonRow}>
          <SkeletonWireframe variant="card" count={3} />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
