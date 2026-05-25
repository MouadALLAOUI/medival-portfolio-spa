import { useImageViewer } from '../lib/useImageViewer';
import { useSettings } from '../lib/useSettings';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageViewer.module.scss';

export default function ImageViewer() {
  const { isOpen, src, isMobile, closeImage } = useImageViewer();
  const { t } = useSettings();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeImage();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeImage]);

  if (!isOpen || !src) return null;

  return createPortal(
    <div className={styles['image-viewer-overlay']} onClick={closeImage}>
      <button
        className={styles['close-btn']}
        onClick={closeImage}
        aria-label={t('COMMON.settings.closeBtn') || "Close image viewer"}
      >
        ×
      </button>
      <div className={styles['image-container']} onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt="Full size image"
          className={`${styles['viewer-image']} ${isMobile ? styles['portrait'] : ''}`}
        />
      </div>
    </div>,
    document.body
  );
}