import { useState, useEffect, useCallback } from 'react';
import styles from './PixelDragon.module.scss';

const PixelDragon = ({ onComplete }) => {
  const [phase, setPhase] = useState('entering'); // entering, flying, breathing, exiting
  const [position, setPosition] = useState({ x: -200, y: 50 });

  const animate = useCallback(() => {
    const duration = 4000;
    const startTime = Date.now();

    const animateFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.3) {
        // Entering phase
        const entryProgress = progress / 0.3;
        setPosition({
          x: -200 + (entryProgress * (window.innerWidth + 400)),
          y: 50 + Math.sin(entryProgress * Math.PI * 2) * 30
        });
        setPhase('entering');
      } else if (progress < 0.6) {
        // Flying and breathing fire
        const flyProgress = (progress - 0.3) / 0.3;
        setPosition({
          x: flyProgress * (window.innerWidth + 400),
          y: 50 + Math.sin(flyProgress * Math.PI * 4) * 50
        });
        setPhase('breathing');
      } else {
        // Exiting
        const exitProgress = (progress - 0.6) / 0.4;
        setPosition({
          x: exitProgress * (window.innerWidth + 400),
          y: 50 - exitProgress * 200
        });
        setPhase('exiting');
      }

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(animateFrame);
  }, [onComplete]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <div className={styles.dragonContainer} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      {/* Pixel Dragon SVG */}
      <svg className={styles.dragon} viewBox="0 0 64 48" width="128" height="96">
        {/* Dragon body */}
        <rect x="20" y="20" width="24" height="16" fill="#2d5a27" />
        <rect x="16" y="24" width="4" height="8" fill="#2d5a27" />
        <rect x="44" y="24" width="4" height="8" fill="#2d5a27" />
        
        {/* Dragon head */}
        <rect x="44" y="16" width="16" height="12" fill="#2d5a27" />
        <rect x="56" y="20" width="4" height="4" fill="#ff0000" />
        <rect x="52" y="16" width="4" height="4" fill="#2d5a27" />
        
        {/* Wings */}
        <rect x="24" y="8" width="16" height="12" fill="#1a3d15" opacity="0.8" />
        <rect x="28" y="4" width="8" height="4" fill="#1a3d15" opacity="0.6" />
        
        {/* Tail */}
        <rect x="4" y="28" width="16" height="4" fill="#2d5a27" />
        <rect x="0" y="30" width="4" height="4" fill="#2d5a27" />
        
        {/* Legs */}
        <rect x="24" y="36" width="4" height="8" fill="#2d5a27" />
        <rect x="36" y="36" width="4" height="8" fill="#2d5a27" />
      </svg>

      {/* Fire breath effect */}
      {phase === 'breathing' && (
        <div className={styles.fireBreath}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={styles.fireParticle}
              style={{
                '--delay': `${i * 0.05}s`,
                '--offset': `${Math.random() * 20 - 10}px`,
                '--size': `${8 + Math.random() * 12}px`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PixelDragon;
