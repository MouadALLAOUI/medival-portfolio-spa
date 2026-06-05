import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import styles from './LinkPreview.module.scss';

const LinkPreview = ({ href, icon, label, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Position the preview to the left of the link, or right if no space
    const previewWidth = 280;

    let x = rect.left - previewWidth - 12;
    if (x < 8) {
      x = rect.right + 12;
    }

    let y = rect.top + rect.height / 2 - 80;
    if (y < 8) y = 8;
    if (y + 160 > window.innerHeight) y = window.innerHeight - 168;

    setPreviewPos({ x, y });

    timeoutRef.current = setTimeout(() => setIsHovered(true), 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  // Extract domain from URL for metadata
  const getDomain = () => {
    try {
      const url = new URL(href);
      return url.hostname.replace('www.', '');
    } catch {
      return 'unknown';
    }
  };

  return (
    <span
      className={styles['preview-trigger']}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children || (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['preview-link']}
        >
          <span className={styles['link-icon']}>{icon}</span>
          {label}
        </a>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles['preview-portal']}
            style={{ left: previewPos.x, top: previewPos.y }}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setIsHovered(true);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles['preview-scroll']}>
              {/* Scroll top ornament */}
              <div className={styles['scroll-ornament']}>
                <svg viewBox="0 0 200 16" className={styles['scroll-top']}>
                  <path
                    d="M 0 8 Q 10 2, 30 4 L 80 4 Q 90 4, 100 8 Q 110 4, 120 4 L 170 4 Q 190 2, 200 8"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className={styles['preview-content']}>
                {/* Thumbnail placeholder - hand-drawn parchment */}
                <div className={styles['preview-thumbnail']}>
                  <svg viewBox="0 0 240 120" className={styles['thumbnail-sketch']}>
                    <rect x="2" y="2" width="236" height="116" rx="4" fill="var(--bg-secondary)" opacity="0.5" />
                    <path
                      d="M 10 10 Q 12 8, 14 10 L 226 12 Q 234 14, 232 16 L 228 106 Q 226 114, 218 112 L 18 110 Q 10 108, 12 100 L 14 18 Q 14 12, 10 10 Z"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    {/* Mini preview elements */}
                    <rect x="20" y="20" width="80" height="8" rx="4" fill="var(--accent)" opacity="0.15" />
                    <rect x="20" y="36" width="200" height="4" rx="2" fill="var(--accent)" opacity="0.08" />
                    <rect x="20" y="46" width="160" height="4" rx="2" fill="var(--accent)" opacity="0.06" />
                    <rect x="20" y="56" width="180" height="4" rx="2" fill="var(--accent)" opacity="0.05" />
                    {/* Card shapes */}
                    <rect x="20" y="72" width="50" height="36" rx="3" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
                    <rect x="78" y="72" width="50" height="36" rx="3" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
                    <rect x="136" y="72" width="50" height="36" rx="3" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
                    <rect x="194" y="72" width="26" height="36" rx="3" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.15" />
                  </svg>
                </div>

                {/* Metadata */}
                <div className={styles['preview-meta']}>
                  <span className={styles['preview-domain']}>
                    <svg viewBox="0 0 16 16" width="12" height="12" className={styles['domain-icon']}>
                      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 2 8 L 14 8 M 8 2 Q 12 5, 12 8 Q 12 11, 8 14 M 8 2 Q 4 5, 4 8 Q 4 11, 8 14" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    {getDomain()}
                  </span>
                  <span className={styles['preview-label']}>{label}</span>
                  <span className={styles['preview-hint']}>
                    Click to open scroll
                    <svg viewBox="0 0 16 16" width="10" height="10" className={styles['arrow-icon']}>
                      <path d="M 4 12 L 12 4 M 12 4 L 12 10 M 12 4 L 6 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Scroll bottom ornament */}
              <div className={`${styles['scroll-ornament']} ${styles['bottom']}`}>
                <svg viewBox="0 0 200 16" className={styles['scroll-bottom']}>
                  <path
                    d="M 0 8 Q 10 14, 30 12 L 80 12 Q 90 12, 100 8 Q 110 12, 120 12 L 170 12 Q 190 14, 200 8"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default LinkPreview;
