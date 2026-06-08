import styles from './BlogPost.module.scss';

export default function BlogProgressBar({ readingProgress }) {
  return (
    <div className={styles.progressBarWrapper}>
      <div
        className={styles.progressBar}
        style={{ width: `${readingProgress}%` }}
      >
        {readingProgress > 0 && (
          <span className={styles.candleFlame}>🔥</span>
        )}
      </div>
      {readingProgress > 10 && (
        <div className={styles.waxDrips} style={{ width: `${readingProgress}%` }}>
          <span className={styles.drip} style={{ left: '15%', animationDelay: '0s' }} />
          <span className={styles.drip} style={{ left: '35%', animationDelay: '0.8s' }} />
          <span className={styles.drip} style={{ left: '55%', animationDelay: '1.6s' }} />
          <span className={styles.drip} style={{ left: '75%', animationDelay: '0.4s' }} />
          <span className={styles.drip} style={{ left: '92%', animationDelay: '1.2s' }} />
        </div>
      )}
    </div>
  );
}
