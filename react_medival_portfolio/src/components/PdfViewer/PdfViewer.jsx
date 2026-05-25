import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePdfSettings } from '../../lib/contexts/PdfSettingsContext';
import { useSettings } from '../../lib/useSettings';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './PdfViewer.module.scss';

// Set up GlobalWorkerOptions
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ file, label = 'Open Scroll', className }) => {
  const pdfCtx = usePdfSettings();
  const { t } = useSettings();
  const pdfMode = pdfCtx?.pdfMode || 'modal';
  const pdfReadingMode = pdfCtx?.pdfReadingMode || 'paginated';

  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(true);
  const [checkingFile, setCheckingFile] = useState(false);

  const handleTrigger = () => {
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    setIsOpen(true);
    setPageNumber(1);
    setLoading(true);
  };

  const close = () => setIsOpen(false);

  // Network pre-fetch validation check when PDF is opened
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
        // If status is 404 or the content-type is HTML, it's missing or an SPA fallback
        if (res.status === 404 || !contentType.includes('application/pdf')) {
          setFileExists(false);
          setLoading(false);
        } else {
          setFileExists(true);
        }
      })
      .catch(() => {
        if (!active) return;
        setFileExists(false);
        setLoading(false);
      })
      .finally(() => {
        if (active) {
          setCheckingFile(false);
        }
      });

    return () => {
      active = false;
    };
  }, [file, isOpen]);

  // Page width based on reading mode
  const getPageWidth = () => {
    const maxWidth = Math.min(window.innerWidth - 80, 800);
    if (pdfReadingMode === 'doublePage') return Math.floor(maxWidth / 2) - 8;
    return maxWidth;
  };

  // Render pages based on reading mode
  const renderPages = () => {
    if (!numPages) return null;

    switch (pdfReadingMode) {
      // One page at a time
      case 'paginated':
        return (
          <div className={styles.paginatedView}>
            <Page
              pageNumber={pageNumber}
              width={getPageWidth()}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className={styles.pdfPage}
            />
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                {t('COMMON.pdfViewer.previous')}
              </button>
              <span className={styles.pageInfo}>{pageNumber} / {numPages}</span>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                {t('COMMON.pdfViewer.next')}
              </button>
            </div>
          </div>
        );

      // All pages vertical — continuous scroll, no gap
      case 'longStrip':
        return (
          <div className={styles.longStripView}>
            {Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i + 1}
                pageNumber={i + 1}
                width={getPageWidth()}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className={styles.pdfPage}
              />
            ))}
          </div>
        );

      // All pages vertical — clear gap and border between pages
      case 'separatedStrip':
        return (
          <div className={styles.separatedStripView}>
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i + 1} className={styles.separatedPage}>
                <div className={styles.pageNumber}>{t('COMMON.pdfViewer.pagePrefix')} {i + 1}</div>
                <Page
                  pageNumber={i + 1}
                  width={getPageWidth()}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className={styles.pdfPage}
                />
              </div>
            ))}
          </div>
        );

      // Two pages side by side
      case 'doublePage':
        return (
          <div className={styles.doublePageView}>
            {Array.from(
              { length: Math.ceil(numPages / 2) },
              (_, i) => {
                const left = i * 2 + 1;
                const right = i * 2 + 2;
                return (
                  <div key={left} className={styles.doublePageSpread}>
                    <Page
                      pageNumber={left}
                      width={getPageWidth()}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      className={styles.pdfPage}
                    />
                    {right <= numPages && (
                      <Page
                        pageNumber={right}
                        width={getPageWidth()}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className={styles.pdfPage}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Shared PDF document content
  const PdfContent = (
    <div className={styles.pdfContent} key={`${file}-${pdfReadingMode}`}>
      {loading && <div className={styles.loader}>{t('COMMON.pdfViewer.loading')}</div>}
      <div className={styles.pdfFrame}>
        {!checkingFile && !fileExists ? (
          <div className={styles.pdfErrorMsg}>
            {t('COMMON.pdfViewer.errorNotFound')}
          </div>
        ) : (
          <Document
              file={file}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setLoading(false);
              }}
              onLoadError={(err) => {
                console.error('PDF load error:', err);
                setFileExists(false);
                setLoading(false);
              }}
              loading=""
              externalLinkTarget="_self"
              error={
                <div className={styles.pdfErrorMsg}>
                  {t('COMMON.pdfViewer.errorCorrupted')}
                </div>
              }
              noData={
                <div className={styles.pdfErrorMsg}>
                  {t('COMMON.pdfViewer.errorNoData')}
                </div>
              }
            >
              {fileExists && renderPages()}
            </Document>
          )}
      </div>
    </div>
  );

  return (
    <div className={`${styles.pdfWrapper} ${className || ''}`}>
      {/* Trigger — always visible */}
      <button className={styles.trigger} onClick={handleTrigger} type="button">
        <span className={styles.triggerIcon}>📜</span>
        <span className={styles.triggerLabel}>{label}</span>
        {pdfMode === 'newWindow' && (
          <span className={styles.triggerHint}>↗️</span>
        )}
      </button>

      {/* Inline mode */}
      {pdfMode === 'inline' && isOpen && (
        <div className={styles.inlineContainer}>
          <div className={styles.inlineHeader}>
            <span>{label}</span>
            <button className={styles.closeInline} onClick={close} type="button">×</button>
          </div>
          {PdfContent}
        </div>
      )}

      {/* Modal mode */}
      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>📜 {label}</span>
              <button className={styles.closeModal} onClick={close} type="button">×</button>
            </div>
            {PdfContent}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PdfViewer;
