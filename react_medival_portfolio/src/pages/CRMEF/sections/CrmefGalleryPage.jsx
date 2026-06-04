import { useState } from 'react';
import CSection from '../../../templates/Section';
import { useSettings } from '../../../lib/useSettings';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import styles from './CrmefGalleryPage.module.scss';

const IMAGES = [
  {
    src: '/media/CRMEF/S2/imgs/WhatsApp Image 2026-04-17 at 14.45.25.jpeg',
    titleKey: 'CRMEF.gallery.teachingSession.title',
    descKey: 'CRMEF.gallery.teachingSession.desc',
    defaultTitle: 'Teaching Practice at Annahda Middle School',
    defaultDesc: 'Conducting computer science sessions with middle school students during the formation.',
  },
  {
    src: '/media/CRMEF/S1/imgs/unnamed.png',
    titleKey: 'CRMEF.gallery.groupWork.title',
    descKey: 'CRMEF.gallery.groupWork.desc',
    defaultTitle: 'Group Work & Collaborative Seminars',
    defaultDesc: 'Working together with peers at the Regional Center (CRMEF) on pedagogical materials.',
  },
  {
    src: '/media/CRMEF/S1/imgs/NotebookLM Mind Map.png',
    titleKey: 'CRMEF.gallery.mindMap1.title',
    descKey: 'CRMEF.gallery.mindMap1.desc',
    defaultTitle: 'NotebookLM Pedagogical Mind Map',
    defaultDesc: 'A mind map generated to structure the teaching framework of classroom management.',
  },
  {
    src: '/media/CRMEF/S1/imgs/NotebookLM Mind Map (2).png',
    titleKey: 'CRMEF.gallery.mindMap2.title',
    descKey: 'CRMEF.gallery.mindMap2.desc',
    defaultTitle: 'Instructional Design Blueprint',
    defaultDesc: 'Mind map showing the breakdown of professional learning domains and student assessment cycles.',
  },
  {
    src: '/media/CRMEF/S1/imgs/Gemini_Generated_Image_pkz39rpkz39rpkz3.png',
    titleKey: 'CRMEF.gallery.classroomVisual.title',
    descKey: 'CRMEF.gallery.classroomVisual.desc',
    defaultTitle: 'Visualizing Classrooms',
    defaultDesc: 'A model representation of the computer science lab environment at Annahda.',
  }
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
          const title = t(img.titleKey) !== img.titleKey ? t(img.titleKey) : img.defaultTitle;
          const desc = t(img.descKey) !== img.descKey ? t(img.descKey) : img.defaultDesc;

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
          const title = t(currentImg.titleKey) !== currentImg.titleKey ? t(currentImg.titleKey) : currentImg.defaultTitle;
          const desc = t(currentImg.descKey) !== currentImg.descKey ? t(currentImg.descKey) : currentImg.defaultDesc;

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
