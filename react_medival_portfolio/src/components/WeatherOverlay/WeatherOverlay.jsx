import { useState, useEffect, useCallback } from 'react';
import styles from './WeatherOverlay.module.scss';

const WEATHER_TYPES = {
  none: { id: 'none', label: 'Clear Skies', icon: '☀️' },
  snow: { id: 'snow', label: 'Winter Frost', icon: '❄️' },
  rain: { id: 'rain', label: 'Tempest Rain', icon: '🌧️' },
  leaves: { id: 'leaves', label: 'Autumn Leaves', icon: '🍂' },
  fog: { id: 'fog', label: 'Mystic Mist', icon: '🌫️' },
  lightning: { id: 'lightning', label: 'Thunderstorm', icon: '⚡' },
};

const WeatherOverlay = ({ weather = 'none' }) => {
  const [particles, setParticles] = useState([]);

  const generateParticles = useCallback(() => {
    if (weather === 'none') return [];

    const count = weather === 'lightning' ? 20 : weather === 'fog' ? 8 : 50;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      size: weather === 'snow' ? 4 + Math.random() * 8 : undefined,
    }));
  }, [weather]);

  useEffect(() => {
    setParticles(generateParticles());
  }, [generateParticles]);

  if (weather === 'none') return null;

  return (
    <div className={`${styles.weatherOverlay} ${styles[weather]}`}>
      {weather === 'snow' && particles.map(p => (
        <div
          key={p.id}
          className={styles.snowflake}
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}

      {weather === 'rain' && particles.map(p => (
        <div
          key={p.id}
          className={styles.raindrop}
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration * 0.5}s`,
          }}
        />
      ))}

      {weather === 'leaves' && particles.map(p => (
        <div
          key={p.id}
          className={styles.leaf}
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration * 2}s`,
          }}
        />
      ))}

      {weather === 'fog' && particles.map(p => (
        <div
          key={p.id}
          className={styles.fogLayer}
          style={{
            left: `${p.x - 20}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration * 4}s`,
          }}
        />
      ))}

      {weather === 'lightning' && (
        <>
          {particles.map(p => (
            <div
              key={p.id}
              className={styles.lightning}
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          <div className={styles.thunderFlash} />
        </>
      )}
    </div>
  );
};

export { WEATHER_TYPES };
export default WeatherOverlay;
