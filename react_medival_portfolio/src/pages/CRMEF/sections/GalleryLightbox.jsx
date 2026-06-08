import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './CrmefGalleryPage.module.scss';

export default function GalleryLightbox({ currentImg, title, desc, index, total, zoomScale, onClose, onPrev, onNext, onZoomIn, onZoomOut }) {
  return (
    <motion.div className={styles.lightboxOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className={styles.lightboxContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close Lightbox"><X size={24} /></button>
        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={onPrev} aria-label="Previous Image"><ChevronLeft size={32} /></button>
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={onNext} aria-label="Next Image"><ChevronRight size={32} /></button>

        <div className={styles.controlBar}>
          <button className={styles.controlBtn} onClick={onZoomIn} disabled={zoomScale >= 3} title="Zoom In"><ZoomIn size={20} /></button>
          <span className={styles.zoomIndicator}>{Math.round(zoomScale * 100)}%</span>
          <button className={styles.controlBtn} onClick={onZoomOut} disabled={zoomScale <= 1} title="Zoom Out"><ZoomOut size={20} /></button>
        </div>

        <div className={styles.stage}>
          <motion.img key={index} src={currentImg.src} alt={title} style={{ scale: zoomScale }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
        </div>

        <div className={styles.captionBar}>
          <h3 className={styles.captionTitle}>{title}</h3>
          <p className={styles.captionDesc}>{desc}</p>
          <span className={styles.pageIndicator}>{index + 1} / {total}</span>
        </div>
      </div>
    </motion.div>
  );
}
