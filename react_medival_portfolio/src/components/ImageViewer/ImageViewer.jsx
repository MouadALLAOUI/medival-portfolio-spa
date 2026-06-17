import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { usePdfSettings } from '../../lib/contexts/PdfSettingsContext';
import styles from './ImageViewer.module.scss';

const ImageViewer = ({ file, label = 'Open Image', className, onOpen }) => {
  const pdfCtx = usePdfSettings();
  const location = useLocation();
  const pdfMode = pdfCtx?.pdfMode || 'modal';

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleTrigger = () => {
    if (onOpen) onOpen();
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    window.dispatchEvent(new CustomEvent('close-all-pdfs', { detail: { file } }));
    setIsOpen(true);
    setLoading(true);
  };

  const close = () => setIsOpen(false);

  const content = (
    <div className={styles.imageContent}>
      {loading && <div className={styles.loader}>Loading...</div>}
      <div className={styles.imageFrame}>
        <img
          src={file}
          alt={typeof label === 'string' ? label : ''}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          className={styles.image}
        />
      </div>
    </div>
  );

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <button className={`${styles.trigger} image-viewer-trigger`} onClick={handleTrigger} type="button">
        {typeof label === 'string' ? (
          <>
            <span className={styles.triggerIcon}>🖼️</span>
            <span className={styles.triggerLabel}>{label}</span>
          </>
        ) : label}
      </button>

      {pdfMode === 'inline' && isOpen && (
        <div className={styles.inlineContainer}>
          <div className={styles.inlineHeader}>
            <div className={styles.inlineTitle}>
              {typeof label === 'string' ? <span>{label}</span> : label}
            </div>
            <button className={styles.closeInline} onClick={close} type="button">×</button>
          </div>
          {content}
        </div>
      )}

      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>🖼️ {typeof label === 'string' ? label : 'Image'}</span>
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

export default ImageViewer;
