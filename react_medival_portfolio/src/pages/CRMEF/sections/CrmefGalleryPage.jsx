import { useState } from 'react';
import CSection from '../../../templates/Section';
import { useSettings } from '../../../lib/useSettings';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import styles from './CrmefGalleryPage.module.scss';

const IMAGES = [
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-05-25 at 17.47.28.jpeg', defaultTitle: 'CRMEF Formation Moment', defaultDesc: 'A captured moment from the CRMEF teacher training program.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-05-25 at 17.47.26 (1).jpeg', defaultTitle: 'Pedagogical Session', defaultDesc: 'Session documenting the pedagogical approach at CRMEF.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-05-23 at 21.33.49.jpeg', defaultTitle: 'Training Workshop', defaultDesc: 'Workshop activity during the teacher training program.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-04-15 at 11.18.56.jpeg', defaultTitle: 'Classroom Activity', defaultDesc: 'Classroom activity at Annahda Middle School.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-03-11 at 20.29.34.jpeg', defaultTitle: 'Group Collaboration', defaultDesc: 'Collaborative work during the CRMEF formation.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-03-10 at 00.16.34.jpeg', defaultTitle: 'Formation Materials', defaultDesc: 'Materials and resources used during the training.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-03-09 at 16.43.17.jpeg', defaultTitle: 'Teaching Practice', defaultDesc: 'Practice teaching session at the regional center.' },
  { src: '/media/CRMEF/GAL/WhatsApp Image 2026-03-04 at 11.36.00.jpeg', defaultTitle: 'Academic Meeting', defaultDesc: 'Meeting or seminar at the CRMEF center.' },
  { src: '/media/CRMEF/GAL/IMG_20260427_114855.jpg', defaultTitle: 'Formation Day', defaultDesc: 'A day in the life of the CRMEF teacher training program.' },
  { src: '/media/CRMEF/GAL/IMG_20260415_110143.jpg.jpeg', defaultTitle: 'Student Interaction', defaultDesc: 'Interacting with students during practice sessions.' },
  { src: '/media/CRMEF/GAL/IMG-20260309-WA0116.jpg.jpeg', defaultTitle: 'Group Photo', defaultDesc: 'Group photo from the CRMEF formation.' },
  { src: '/media/CRMEF/GAL/IMG-20260309-WA0109.jpg.jpeg', defaultTitle: 'Seminar Moment', defaultDesc: 'Moment captured during a pedagogical seminar.' },
  { src: '/media/CRMEF/GAL/IMG-20260309-WA0107.jpg.jpeg', defaultTitle: 'Training Activity', defaultDesc: 'Activity from the CRMEF teacher training program.' },
];

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
    setLightboxIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    setZoomScale(1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
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
      title={t('CRMEF.gallery.title') || 'Gallery of the Formation'}
      className={styles.section}
    >
      <div className={styles.galleryIntro}>
        <p className={styles.introText}>
          {t('CRMEF.gallery.subtitle') || 'A collection of visual moments, schematics, and materials chronicling my teacher training path at CRMEF and Middle School Annahda.'}
        </p>
      </div>

      <div className={styles.grid}>
        {IMAGES.map((img, index) => {
          const title = img.defaultTitle;
          const desc = img.defaultDesc;

          return (
            <motion.div
              key={img.src}
              className={styles.galleryCard}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.imageWrapper}>
                <img src={img.src} alt={title} loading="lazy" />
                <div className={styles.overlay}>
                  <span className={styles.viewLabel}>{t('CRMEF.gallery.viewImage') || 'View Image 🔍'}</span>
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
          const currentImg = IMAGES[lightboxIndex];
          const title = currentImg.defaultTitle;
          const desc = currentImg.defaultDesc;

          return (
            <motion.div
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
                    src={currentImg.src}
                    alt={title}
                    style={{ scale: zoomScale }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>

                {/* Bottom Caption Bar */}
                <div className={styles.captionBar}>
                  <h3 className={styles.captionTitle}>{title}</h3>
                  <p className={styles.captionDesc}>{desc}</p>
                  <span className={styles.pageIndicator}>{lightboxIndex + 1} / {IMAGES.length}</span>
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
