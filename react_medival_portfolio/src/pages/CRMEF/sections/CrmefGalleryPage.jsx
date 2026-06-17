import { useState } from 'react';
import CSection from '../../../templates/Section';
import { useSettings } from '../../../lib/useSettings';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';
import styles from './CrmefGalleryPage.module.scss';
import { crmefGallery } from '../../../data/crmef.data';

const CrmefGalleryPage = () => {
  const { t } = useSettings();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? crmefGallery.length - 1 : prev - 1));
    setZoomScale(1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === crmefGallery.length - 1 ? 0 : prev + 1));
    setZoomScale(1);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.25, 1));
  };

  return (
    <CSection
      variant="crmef"
      id="gallery"
      title={t('CRMEF.gallery.title')}
      className={styles.section}
    >
      <div className={styles.galleryIntro}>
        <p className={styles.introText}>
          {t('CRMEF.gallery.subtitle')}
        </p>
      </div>

      <ImageCarousel images={crmefGallery} interval={5000} />

      <div className={styles.grid}>
        {crmefGallery.map((img, index) => {
          const title = img.label || 'CRMEF Image';
          const desc = img.description || 'A captured moment from the CRMEF teacher training program.';

          return (
            <motion.div
              key={img.id}
              className={styles.galleryCard}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.imageWrapper}>
                <img src={img.path} alt={title} loading="lazy" />
                <div className={styles.overlay}>
                  <span className={styles.viewLabel}>{t('CRMEF.gallery.viewImage')}</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h4 className={styles.cardTitle}>{title}</h4>
                <p className={styles.cardDesc}>{desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const currentImg = crmefGallery[lightboxIndex];
          const title = currentImg.label || 'CRMEF Image';
          const desc = currentImg.description || 'A captured moment from the CRMEF teacher training program.';

          return (
            <motion.div
              key="lightbox"
              className={styles.lightboxOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <div className={styles.lightboxContainer} onClick={(e) => e.stopPropagation()}>
                {/* Close btn */}
                <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close Lightbox">
                  <X size={24} />
                </button>

                {/* Left/Right nav btns */}
                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev} aria-label="Previous Image">
                  <ChevronLeft size={32} />
                </button>
                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext} aria-label="Next Image">
                  <ChevronRight size={32} />
                </button>

                {/* Top Control Bar */}
                <div className={styles.controlBar}>
                  <button className={styles.controlBtn} onClick={handleZoomIn} disabled={zoomScale >= 3} title="Zoom In">
                    <ZoomIn size={20} />
                  </button>
                  <span className={styles.zoomIndicator}>{Math.round(zoomScale * 100)}%</span>
                  <button className={styles.controlBtn} onClick={handleZoomOut} disabled={zoomScale <= 1} title="Zoom Out">
                    <ZoomOut size={20} />
                  </button>
                </div>

                {/* Image Stage */}
                <div className={styles.stage}>
                  <motion.img
                    key={lightboxIndex}
                    src={currentImg.path}
                    alt={title}
                    style={{ scale: zoomScale }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>

                {/* Bottom Caption Bar */}
                <div className={styles.captionBar}>
                  <h3 className={styles.captionTitle}>{title}</h3>
                  <p className={styles.captionDesc}>{desc}</p>
                  <span className={styles.pageIndicator}>{lightboxIndex + 1} / {crmefGallery.length}</span>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </CSection>
  );
};

export default CrmefGalleryPage;
