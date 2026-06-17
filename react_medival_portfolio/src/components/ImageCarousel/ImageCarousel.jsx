import { useState, useCallback, useEffect, useRef } from 'react';
import { useImageViewer } from '../../lib/useImageViewer';
import styles from './ImageCarousel.module.scss';

export default function ImageCarousel({ images, className = '', interval = 4000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { openImage } = useImageViewer();
  const timerRef = useRef(null);

  const gallery = images.map(img => ({
    src: img.path || img.src,
    alt: img.label || img.alt || '',
  }));

  const goTo = useCallback((nextIndex) => {
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex((nextIndex + gallery.length) % gallery.length);
  }, [activeIndex, gallery.length]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [goTo, activeIndex]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [goTo, activeIndex]);

  const openViewer = useCallback((e) => {
    e.stopPropagation();
    const item = gallery[activeIndex];
    if (!item) return;
    openImage(item.src, item.alt);
  }, [gallery, activeIndex, openImage]);

  useEffect(() => {
    if (gallery.length <= 1) return;
    timerRef.current = setInterval(goNext, interval);
    return () => clearInterval(timerRef.current);
  }, [goNext, interval, gallery.length]);

  if (!images || images.length === 0) return null;

  const current = gallery[activeIndex];

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles.viewport}>
        <div className={styles.slide} onClick={openViewer} data-direction={direction}>
          <img key={current.src} src={current.src} alt={current.alt} loading="lazy" />
          {current.alt && <span className={styles.caption}>{current.alt}</span>}
        </div>
        <button type="button" className={styles.expandHint} onClick={openViewer} aria-label="View full image">⛶</button>

        {gallery.length > 1 && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={goPrev} aria-label="Previous image">‹</button>
            <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={goNext} aria-label="Next image">›</button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className={styles.dots}>
          {gallery.map((img, index) => (
            <button
              key={img.src}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
