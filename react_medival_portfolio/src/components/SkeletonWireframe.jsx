import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import styles from './SkeletonWireframe.module.scss';

const SkeletonWireframe = ({ variant = 'card', count = 1 }) => {
  const renderSkeleton = (index) => {
    switch (variant) {
      case 'card':
        return (
          <div key={index} className={styles['skeleton-card']}>
            <svg className={styles['sketch-svg']} viewBox="0 0 300 200" preserveAspectRatio="none">
              {/* Hand-drawn card outline */}
              <path
                d="M 8 6 Q 10 4, 14 5 L 280 8 Q 295 9, 296 14 L 294 180 Q 293 192, 280 194 L 16 192 Q 6 191, 5 180 L 7 12 Q 8 8, 8 6 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                className={styles['sketch-line']}
              />
              {/* Title placeholder */}
              <path
                d="M 24 28 Q 26 25, 30 26 L 140 28 Q 148 29, 146 32 L 28 34 Q 22 33, 24 28 Z"
                fill="var(--accent)"
                opacity="0.15"
                className={styles['sketch-fill']}
              />
              {/* Description lines */}
              <path
                d="M 24 52 Q 26 50, 28 51 L 260 54 Q 268 55, 266 58 L 30 56 Q 22 55, 24 52 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.4"
                className={styles['sketch-line']}
              />
              <path
                d="M 24 72 Q 26 70, 28 71 L 200 74 Q 208 75, 206 78 L 30 76 Q 22 75, 24 72 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.3"
                className={styles['sketch-line']}
              />
              {/* Tag placeholders */}
              <circle cx="40" cy="100" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" className={styles['sketch-line']} />
              <circle cx="72" cy="100" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.25" className={styles['sketch-line']} />
              <circle cx="104" cy="100" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.2" className={styles['sketch-line']} />
              {/* Image placeholder */}
              <path
                d="M 24 120 Q 26 118, 28 119 L 272 122 Q 280 123, 278 126 L 30 124 Q 22 123, 24 120 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.2"
                className={styles['sketch-line']}
              />
              <path
                d="M 140 145 L 160 130 L 175 140 L 200 125 L 220 142 L 240 135 L 256 148"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.15"
                className={styles['sketch-line']}
              />
            </svg>
            <div className={styles['shimmer-overlay']} />
          </div>
        );

      case 'blog':
        return (
          <div key={index} className={`${styles['skeleton-card']} ${styles['blog']}`}>
            <svg className={styles['sketch-svg']} viewBox="0 0 300 180" preserveAspectRatio="none">
              {/* Scroll-like outline */}
              <path
                d="M 12 10 Q 14 6, 20 8 L 280 10 Q 294 12, 292 18 L 290 150 Q 288 168, 272 166 L 28 164 Q 12 162, 14 148 L 16 20 Q 16 14, 12 10 Z"
                fill="none"
                stroke="var(--accent-secondary)"
                strokeWidth="1.5"
                className={styles['sketch-line']}
              />
              {/* Title scroll */}
              <path
                d="M 30 30 Q 32 28, 34 29 L 200 31 Q 210 32, 208 35 L 34 33 Q 28 32, 30 30 Z"
                fill="var(--accent-secondary)"
                opacity="0.12"
                className={styles['sketch-fill']}
              />
              {/* Decorative quill line */}
              <path
                d="M 30 55 Q 80 52, 150 56 Q 220 60, 270 54"
                fill="none"
                stroke="var(--accent-secondary)"
                strokeWidth="1"
                opacity="0.3"
                className={styles['sketch-line']}
              />
              {/* Text lines */}
              <path d="M 30 75 L 260 78" fill="none" stroke="var(--accent-secondary)" strokeWidth="0.8" opacity="0.2" className={styles['sketch-line']} />
              <path d="M 30 95 L 220 97" fill="none" stroke="var(--accent-secondary)" strokeWidth="0.8" opacity="0.15" className={styles['sketch-line']} />
              <path d="M 30 115 L 180 117" fill="none" stroke="var(--accent-secondary)" strokeWidth="0.8" opacity="0.1" className={styles['sketch-line']} />
              {/* Wax seal placeholder */}
              <circle cx="260" cy="140" r="16" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.2" opacity="0.25" className={styles['sketch-line']} />
            </svg>
            <div className={`${styles['shimmer-overlay']} ${styles['blog-shimmer']}`} />
          </div>
        );

      case 'skill':
        return (
          <div key={index} className={`${styles['skeleton-card']} ${styles['skill']}`}>
            <svg className={styles['sketch-svg']} viewBox="0 0 200 200" preserveAspectRatio="none">
              {/* Shield outline */}
              <path
                d="M 100 8 Q 170 15, 185 40 L 180 120 Q 175 160, 100 190 Q 25 160, 20 120 L 15 40 Q 30 15, 100 8 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                className={styles['sketch-line']}
              />
              {/* Star placeholders */}
              <path d="M 80 60 L 85 50 L 90 60 L 100 55 L 95 65 L 105 70 L 92 72 L 88 82 L 84 72 L 72 70 L 80 60 Z" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" className={styles['sketch-line']} />
              <path d="M 100 60 L 105 50 L 110 60 L 120 55 L 115 65 L 125 70 L 112 72 L 108 82 L 104 72 L 92 70 L 100 60 Z" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.25" className={styles['sketch-line']} />
              {/* Skill name */}
              <path
                d="M 50 100 Q 52 97, 55 98 L 150 102 Q 158 103, 156 106 L 56 104 Q 48 103, 50 100 Z"
                fill="var(--accent)"
                opacity="0.1"
                className={styles['sketch-fill']}
              />
            </svg>
            <div className={styles['shimmer-overlay']} />
          </div>
        );

      default:
        return (
          <div key={index} className={styles['skeleton-card']}>
            <svg className={styles['sketch-svg']} viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M 8 8 Q 10 4, 14 6 L 280 10 Q 295 12, 292 16 L 290 80 Q 288 94, 275 92 L 20 90 Q 8 88, 10 80 L 12 18 Q 12 12, 8 8 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                className={styles['sketch-line']}
              />
              <path d="M 24 30 L 200 33" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" className={styles['sketch-line']} />
              <path d="M 24 50 L 160 52" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.2" className={styles['sketch-line']} />
            </svg>
            <div className={styles['shimmer-overlay']} />
          </div>
        );
    }
  };

  return (
    <motion.div
      className={styles['skeleton-container']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: count }, (_, i) => renderSkeleton(i))}
    </motion.div>
  );
};

export default SkeletonWireframe;
