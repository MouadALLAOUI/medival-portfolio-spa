import { useState, useEffect } from 'react';
import styles from './WaxSeal.module.scss';

const WaxSeal = ({
  isOpen,
  onClose,
  children,
  size = 80,
  color = '#8b0000',
}) => {
  const [isFracturing, setIsFracturing] = useState(false);
  const [fragments, setFragments] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setIsFracturing(false);
      setFragments([]);
    }
  }, [isOpen]);

  const generateFragments = () => {
    const count = 8;
    const newFragments = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = 20 + Math.random() * 30;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.4,
      };
    });
    setFragments(newFragments);
  };

  const handleFracture = () => {
    setIsFracturing(true);
    generateFragments();

    setTimeout(() => {
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.sealContainer}>
        <div
          className={`${styles.seal} ${isFracturing ? styles.fracturing : ''}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
          }}
        >
          <div className={styles.sealInner}>
            <div className={styles.sealEmblem}>⚜</div>
          </div>

          {isFracturing && fragments.map(f => (
            <div
              key={f.id}
              className={styles.fragment}
              style={{
                '--tx': `${f.x}px`,
                '--ty': `${f.y}px`,
                '--rot': `${f.rotation}deg`,
                '--scale': f.scale,
                backgroundColor: color,
              }}
            />
          ))}
        </div>

        <button
          className={styles.breakButton}
          onClick={handleFracture}
          disabled={isFracturing}
        >
          Break Seal
        </button>
      </div>

      {children}
    </div>
  );
};

export default WaxSeal;
