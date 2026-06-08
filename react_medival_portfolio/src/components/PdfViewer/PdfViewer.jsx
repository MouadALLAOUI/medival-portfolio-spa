import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Document, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import { usePdfSettings } from '../../lib/contexts/PdfSettingsContext';
import { useSettings } from '../../lib/useSettings';
import PdfToolbar from './PdfToolbar';
import PdfFooter from './PdfFooter';
import PdfPages from './PdfPages';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './PdfViewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ file, label = 'Open Scroll', className, onOpen }) => {
  const pdfCtx = usePdfSettings();
  const { t } = useSettings();
  const location = useLocation();

  const pdfMode = pdfCtx?.pdfMode || 'modal';
  const pdfReadingMode = pdfCtx?.pdfReadingMode || 'paginated';

  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [_loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(true);
  const [checkingFile, setCheckingFile] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [widthMode, setWidthMode] = useState('fitWidth');
  const pdfContentRef = useRef(null);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const handleCloseAll = (e) => {
      if (!e.detail || e.detail.file !== file) setIsOpen(false);
    };
    window.addEventListener('close-all-pdfs', handleCloseAll);
    return () => window.removeEventListener('close-all-pdfs', handleCloseAll);
  }, [file]);

  const handleTrigger = () => {
    if (onOpen) onOpen();
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    window.dispatchEvent(new CustomEvent('close-all-pdfs', { detail: { file } }));
    setIsOpen(true);
    setPageNumber(1);
    setLoading(true);
    setScale(1.0);
    setWidthMode('fitWidth');
  };

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen || !file) return;
    let active = true;
    setCheckingFile(true);
    setFileExists(true);
    setLoading(true);

    fetch(file, { method: 'HEAD' })
      .then((res) => {
        if (!active) return;
        const contentType = res.headers.get('content-type') || '';
        if (res.status === 404 || !contentType.includes('application/pdf')) {
          setFileExists(false);
          setLoading(false);
        } else {
          setFileExists(true);
        }
      })
      .catch(() => { if (active) { setFileExists(false); setLoading(false); } })
      .finally(() => { if (active) setCheckingFile(false); });

    return () => { active = false; };
  }, [file, isOpen]);

  useEffect(() => {
    if (!isOpen || !numPages || !pdfContentRef.current) return;
    if (pdfReadingMode === 'paginated' || pdfReadingMode === 'doublePage') return;

    const container = pdfContentRef.current;
    const handleScroll = () => {
      const pageElements = container.querySelectorAll('[data-page-number]');
      if (!pageElements.length) return;
      const containerRect = container.getBoundingClientRect();
      const containerMid = containerRect.top + containerRect.height / 2;
      let closestPageNum = 1;
      let minDistance = Infinity;
      pageElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + rect.height / 2;
        const distance = Math.abs(elMid - containerMid);
        if (distance < minDistance) {
          minDistance = distance;
          closestPageNum = parseInt(el.getAttribute('data-page-number'), 10);
        }
      });
      if (closestPageNum) setPageNumber(closestPageNum);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 600);
    return () => { container.removeEventListener('scroll', handleScroll); clearTimeout(timer); };
  }, [isOpen, pdfReadingMode, numPages, file]);

  const getPageWidth = () => {
    const baseWidth = widthMode === 'fitWidth' ? Math.min(window.innerWidth - 80, 800) : 600;
    const actualWidth = baseWidth * scale;
    return pdfReadingMode === 'doublePage' ? Math.floor(actualWidth / 2) - 8 : actualWidth;
  };

  const PdfContent = (
    <div className={styles.pdfContent} ref={pdfContentRef} key={`${file}-${pdfReadingMode}`}>
      {checkingFile && <div className={styles.loader}>{t('COMMON.pdfViewer.loading')}</div>}
      <div className={styles.pdfFrame}>
        {!checkingFile && !fileExists ? (
          <div className={styles.pdfErrorMsg}>{t('COMMON.pdfViewer.errorNotFound')}</div>
        ) : (
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => { setNumPages(numPages); setLoading(false); }}
            onLoadError={(err) => { console.error('PDF load error:', err); setFileExists(false); setLoading(false); }}
            loading={<div className={styles.loader}>{t('COMMON.pdfViewer.loading')}</div>}
            externalLinkTarget="_self"
            error={<div className={styles.pdfErrorMsg}>{t('COMMON.pdfViewer.errorCorrupted')}</div>}
            noData={<div className={styles.pdfErrorMsg}>{t('COMMON.pdfViewer.errorNoData')}</div>}
          >
            {fileExists && (
              <PdfPages
                numPages={numPages}
                pageNumber={pageNumber}
                pdfReadingMode={pdfReadingMode}
                getPageWidth={getPageWidth}
              />
            )}
          </Document>
        )}
      </div>
    </div>
  );

  const toolbarProps = {
    numPages, scale, setScale, widthMode, setWidthMode,
    pdfReadingMode, setPdfReadingMode: pdfCtx?.setPdfReadingMode,
    setPageNumber, pdfCtx,
  };

  const footerProps = { numPages, pageNumber, setPageNumber, pdfReadingMode };

  return (
    <div className={`${styles.pdfWrapper} ${className || ''}`}>
      <button className={`${styles.trigger} pdf-viewer-trigger`} onClick={handleTrigger} type="button">
        {typeof label === 'string' ? (
          <>
            <span className={styles.triggerIcon}>📜</span>
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
          <PdfToolbar {...toolbarProps} />
          {PdfContent}
          <PdfFooter {...footerProps} />
        </div>
      )}

      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>📜 {typeof label === 'string' ? label : t('CRMEF_SEMESTERS.tooltip.pages') || 'Scroll'}</span>
              <button className={styles.closeModal} onClick={close} type="button">×</button>
            </div>
            <PdfToolbar {...toolbarProps} />
            {PdfContent}
            <PdfFooter {...footerProps} />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PdfViewer;
