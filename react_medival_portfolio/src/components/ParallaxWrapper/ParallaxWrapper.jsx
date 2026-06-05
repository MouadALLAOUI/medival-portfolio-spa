import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './ParallaxWrapper.module.scss';

const ParallaxWrapper = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  style = {},
}) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;

    const distance = elementCenter - viewportCenter;
    const maxOffset = 100;

    let newOffset = (distance * speed) / 100;
    newOffset = Math.max(-maxOffset, Math.min(maxOffset, newOffset));

    if (direction === 'down') {
      newOffset = -newOffset;
    }

    setOffset(newOffset);
  }, [speed, direction]);

  useEffect(() => {
    const scrollContainer = document.getElementById('body-container') || window;

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={ref}
      className={`${styles.parallaxWrapper} ${className}`}
      style={{
        ...style,
        '--parallax-offset': `${offset}px`,
      }}
    >
      <div className={styles.parallaxContent}>
        {children}
      </div>
      <div
        className={styles.parallaxBg}
        style={{
          transform: `translateY(${offset * 0.3}px)`,
        }}
      />
    </div>
  );
};

export default ParallaxWrapper;
