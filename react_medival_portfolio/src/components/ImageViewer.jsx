import { useImageViewer } from '../lib/useImageViewer';
import { useSettings } from '../lib/useSettings';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageViewer.module.scss';

export default function ImageViewer() {
  const { isOpen, images, currentIndex, closeImage, goNext, goPrev } = useImageViewer();
  const { t } = useSettings();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeImage();
      } else if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeImage, goNext, goPrev]);

  if (!isOpen || !images || images.length === 0) return null;

  const current = images[currentIndex];
  if (!current) return null;

  return createPortal(
    <div className={styles['image-viewer-overlay']} onClick={closeImage}>
      <button
        className={styles['close-btn']}
        onClick={closeImage}
        aria-label={t('COMPONENTS.imageViewer.closeAria')}
      >
        ×
      </button>

      {images.length > 1 && currentIndex > 0 && (
        <button
          className={`${styles['nav-btn']} ${styles['prev-btn']}`}
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label={t('COMPONENTS.imageViewer.prevAria')}
        >
          ‹
        </button>
      )}

      <div className={styles['image-container']} onClick={(e) => e.stopPropagation()}>
        <img
          src={current.src}
          alt={current.alt || t('COMPONENTS.imageViewer.fullSizeAlt')}
          className={`${styles['viewer-image']} ${current.isMobile ? styles['portrait'] : ''}`}
        />
        {current.alt && (
          <div className={styles['caption']}>
            {current.alt}
          </div>
        )}
      </div>

      {images.length > 1 && currentIndex < images.length - 1 && (
        <button
          className={`${styles['nav-btn']} ${styles['next-btn']}`}
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label={t('COMPONENTS.imageViewer.nextAria')}
        >
          ›
        </button>
      )}

      {images.length > 1 && (
        <div className={styles['counter']}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}