import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useSettings } from '../../lib/useSettings';
import { useSound } from '../../lib/hooks/useSound';
import styles from './CompassToTop.module.scss';

const CompassToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [needleRotation, setNeedleRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const { t } = useSettings();
  const { play } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

      // Needle rotates from 0 (top) to 180 (bottom) as you scroll down
      // Points "North" (up) = 0deg when at top, rotates to point down when scrolled
      setNeedleRotation(scrollPercent * 180);

      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    play('compass');
    setIsSpinning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsSpinning(false), 600);
  }, [play]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.3, rotate: 90 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={styles['compass-button']}
          aria-label={t('COMPONENTS.backToTop.ariaLabel')}
        >
          <svg
            className={`${styles['compass-svg']} ${isSpinning ? styles['spinning'] : ''}`}
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer ring */}
            <circle cx="60" cy="60" r="56" fill="none" stroke="var(--accent)" strokeWidth="2.5" className={styles['outer-ring']} />

            {/* Inner parchment fill */}
            <circle cx="60" cy="60" r="52" fill="var(--bg-primary)" opacity="0.9" />

            {/* Cardinal direction markers */}
            <text x="60" y="16" textAnchor="middle" className={styles['cardinal-text']} fill="var(--accent)">N</text>
            <text x="104" y="64" textAnchor="middle" className={styles['cardinal-text']} fill="var(--text-secondary)">E</text>
            <text x="60" y="112" textAnchor="middle" className={styles['cardinal-text']} fill="var(--text-secondary)">S</text>
            <text x="16" y="64" textAnchor="middle" className={styles['cardinal-text']} fill="var(--text-secondary)">W</text>

            {/* Tick marks */}
            {Array.from({ length: 36 }, (_, i) => {
              const angle = (i * 10) * Math.PI / 180;
              const isMajor = i % 9 === 0;
              const r1 = isMajor ? 42 : 46;
              const r2 = 50;
              return (
                <line
                  key={i}
                  x1={60 + r1 * Math.sin(angle)}
                  y1={60 - r1 * Math.cos(angle)}
                  x2={60 + r2 * Math.sin(angle)}
                  y2={60 - r2 * Math.cos(angle)}
                  stroke={isMajor ? 'var(--accent)' : 'var(--text-muted)'}
                  strokeWidth={isMajor ? 1.5 : 0.5}
                  opacity={isMajor ? 0.8 : 0.4}
                />
              );
            })}

            {/* Decorative inner circle */}
            <circle cx="60" cy="60" r="38" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />

            {/* Compass needle - rotates based on scroll */}
            <g
              transform={`rotate(${needleRotation}, 60, 60)`}
              className={styles['needle-group']}
            >
              {/* North (red) half */}
              <polygon points="60,18 55,60 65,60" fill="var(--accent)" opacity="0.9" />
              {/* South (white) half */}
              <polygon points="60,102 55,60 65,60" fill="var(--text-secondary)" opacity="0.5" />
              {/* Center dot */}
              <circle cx="60" cy="60" r="4" fill="var(--accent)" />
              <circle cx="60" cy="60" r="2" fill="var(--bg-primary)" />
            </g>

            {/* Decorative fleur-de-lis at top */}
            <path
              d="M 60 8 L 57 12 L 60 10 L 63 12 Z"
              fill="var(--accent)"
              opacity="0.6"
            />
          </svg>

          <span className={styles['scroll-label']}>
            {Math.round((needleRotation / 180) * 100)}%
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CompassToTop;
