import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { init } from 'pptx-preview';
import { usePdfSettings } from '../../lib/contexts/PdfSettingsContext';
import styles from './PptxViewer.module.scss';

const PptxViewer = ({ file, label = 'Open Presentation', className, onOpen }) => {
  const pdfCtx = usePdfSettings();
  const location = useLocation();
  const pdfMode = pdfCtx?.pdfMode || 'modal';

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slideCount, setSlideCount] = useState(0);

  const previewerRef = useRef(null);
  const slideContainerRef = useRef(null);
  const fetchKeyRef = useRef(0);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    if (!isOpen) return;
    const key = ++fetchKeyRef.current;
    let cancelled = false;

    const load = async () => {
      setLoading(true); setError(null); setSlideCount(0);
      try {
        const resp = await fetch(file);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const ab = await resp.arrayBuffer();
        if (cancelled || key !== fetchKeyRef.current) return;

        const container = slideContainerRef.current;
        if (!container) return;

        const viewportWidth = container.clientWidth || 900;

        const previewer = init(container, {
          width: viewportWidth,
          mode: 'slide',
        });
        previewerRef.current = previewer;

        await previewer.preview(ab);
        if (cancelled) { try { previewer.destroy(); } catch { /* noop */ } return; }
        setSlideCount(previewer.slideCount || 0);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, [isOpen, file]);

  useEffect(() => {
    return () => {
      if (previewerRef.current) {
        try { previewerRef.current.destroy(); } catch { /* noop */ }
        previewerRef.current = null;
      }
    };
  }, []);

  const handleTrigger = () => {
    if (onOpen) onOpen();
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    window.dispatchEvent(new CustomEvent('close-all-pdfs', { detail: { file } }));
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    if (previewerRef.current) {
      try { previewerRef.current.destroy(); } catch { /* noop */ }
      previewerRef.current = null;
    }
  };

  const content = (
    <div className={styles.pptxContent}>
      {loading && <div className={styles.loader}>Loading presentation...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      {!loading && !error && (
        <>
          {slideCount > 0 && (
            <div className={styles.slideInfo}>{slideCount} slide{slideCount !== 1 ? 's' : ''}</div>
          )}
          <div className={styles.slideContainer} ref={slideContainerRef} />
        </>
      )}
    </div>
  );

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <button className={`${styles.trigger} pdf-viewer-trigger`} onClick={handleTrigger} type="button">
        {typeof label === 'string' ? (
          <>
            <span className={styles.triggerIcon}>📽️</span>
            <span className={styles.triggerLabel}>{label}</span>
          </>
        ) : label}
      </button>

      {pdfMode === 'inline' && isOpen && (
        <div className={styles.inlineContainer}>
          <div className={styles.inlineHeader}>
            <span className={styles.inlineTitle}>{label}</span>
            <button className={styles.closeInline} onClick={close} type="button">×</button>
          </div>
          {content}
        </div>
      )}

      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>📽️ {label}</span>
              <button className={styles.closeModal} onClick={close} type="button">×</button>
            </div>
            {content}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PptxViewer;
