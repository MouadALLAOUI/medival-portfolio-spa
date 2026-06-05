import { useRef, useEffect, useState } from 'react';
import styles from './InkReveal.module.scss';

const InkReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  variant = 'ink', // ink, quill, scroll
  as: Component = 'span',
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <Component
      ref={ref}
      className={`${styles.inkReveal} ${styles[variant]} ${isVisible ? styles.visible : ''} ${className}`}
      style={{ '--duration': `${duration}ms` }}
    >
      <span className={styles.text}>{children}</span>
      <span className={styles.inkOverlay} />
    </Component>
  );
};

export default InkReveal;
