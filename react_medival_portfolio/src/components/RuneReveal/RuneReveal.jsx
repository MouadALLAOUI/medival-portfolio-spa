import { useState, useEffect, useRef } from 'react';
import styles from './RuneReveal.module.scss';

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛇ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

const RuneReveal = ({
  children,
  className = '',
  runeDuration = 800,
  trigger = 'hover',
  as: Component = 'span',
}) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [currentRunes, setCurrentRunes] = useState([]);
  const intervalRef = useRef(null);

  const generateRunes = (count) => {
    return Array.from({ length: count }, () =>
      RUNES[Math.floor(Math.random() * RUNES.length)]
    );
  };

  const startReveal = () => {
    if (isRevealing) return;

    setIsRevealing(true);
    setShowContent(false);

    const textLength = typeof children === 'string' ? children.length : 8;
    const runeCount = Math.min(textLength, 12);
    let step = 0;

    intervalRef.current = setInterval(() => {
      step++;
      setCurrentRunes(generateRunes(runeCount));

      if (step >= 8) {
        clearInterval(intervalRef.current);
        setShowContent(true);
        setTimeout(() => setIsRevealing(false), 100);
      }
    }, runeDuration / 8);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlers = trigger === 'hover'
    ? { onMouseEnter: startReveal }
    : { onClick: startReveal };

  return (
    <Component
      className={`${styles.runeReveal} ${isRevealing ? styles.revealing : ''} ${className}`}
      {...handlers}
    >
      <span className={`${styles.content} ${showContent ? styles.visible : ''}`}>
        {children}
      </span>
      {isRevealing && !showContent && (
        <span className={styles.runes}>
          {currentRunes.map((rune, i) => (
            <span
              key={i}
              className={styles.rune}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {rune}
            </span>
          ))}
        </span>
      )}
    </Component>
  );
};

export default RuneReveal;
