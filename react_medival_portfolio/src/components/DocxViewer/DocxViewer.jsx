import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { renderAsync } from 'docx-preview';
import { useLocation } from 'react-router-dom';
import { usePdfSettings } from '../../lib/contexts/PdfSettingsContext';
import { useSettings } from '../../lib/useSettings';
import styles from './DocxViewer.module.scss';

const DocxViewer = ({ file, label = 'Open Document', className, onOpen }) => {
  const pdfCtx = usePdfSettings();
  const { t } = useSettings();
  const location = useLocation();

  const pdfMode = pdfCtx?.pdfMode || 'modal';

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const docxRef = useRef(null);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    if (!isOpen || !file || !containerRef.current) return;
    let active = true;

    const loadDocx = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error('File not found');
        const blob = await res.blob();
        if (!active) return;
        containerRef.current.innerHTML = '';
        await renderAsync(blob, containerRef.current, null, {
          className: 'docx-viewer',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          breakPages: true,
          renderHeadersFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
        });
        if (active) setLoading(false);
      } catch (err) {
        if (active) { setError(err.message); setLoading(false); }
      }
    };

    loadDocx();
    return () => { active = false; };
  }, [file, isOpen]);

  const handleTrigger = () => {
    if (onOpen) onOpen();
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    window.dispatchEvent(new CustomEvent('close-all-pdfs', { detail: { file } }));
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const DocxContent = (
    <div className={styles.docxContent}>
      {loading && <div className={styles.loader}>{t('COMMON.pdfViewer.loading')}</div>}
      {error && <div className={styles.docxErrorMsg}>{error}</div>}
      <div className={styles.docxFrame} ref={docxRef}>
        <div ref={containerRef} />
      </div>
    </div>
  );

  return (
    <div className={`${styles.docxWrapper} ${className || ''}`}>
      <button className={`${styles.trigger} docx-viewer-trigger`} onClick={handleTrigger} type="button">
        {typeof label === 'string' ? (
          <>
            <span className={styles.triggerIcon}>📄</span>
            <span className={styles.triggerLabel}>{label}</span>
          </>
        ) : label}
        {pdfMode === 'newWindow' && <span className={styles.triggerHint}>↗️</span>}
      </button>

      {pdfMode === 'inline' && isOpen && (
        <div className={styles.inlineContainer}>
          <div className={styles.inlineHeader}>
            <div className={styles.inlineTitle}>
              {typeof label === 'string' ? <span>{label}</span> : label}
            </div>
            <button className={styles.closeInline} onClick={close} type="button">×</button>
          </div>
          {DocxContent}
        </div>
      )}

      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>📄 {typeof label === 'string' ? label : t('CRMEF_SEMESTERS.tooltip.pages') || 'Document'}</span>
              <button className={styles.closeModal} onClick={close} type="button">×</button>
            </div>
            {DocxContent}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DocxViewer;
