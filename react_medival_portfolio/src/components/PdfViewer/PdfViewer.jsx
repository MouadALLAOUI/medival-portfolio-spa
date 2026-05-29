import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const pdfMode = pdfCtx?.pdfMode || 'modal';
  const pdfReadingMode = pdfCtx?.pdfReadingMode || 'paginated';

  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [_loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(true);
  const [checkingFile, setCheckingFile] = useState(false);

  // PDF controls state
  const [scale, setScale] = useState(1.0);
  const [widthMode, setWidthMode] = useState('fitWidth'); // 'fitWidth' or 'fitPage'

  // Scroll container reference to observe visible page scroll
  const pdfContentRef = useRef(null);

  // Close all PDFs when route changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Listen to close-all-pdfs event (triggered when another PDF is opened or tab is changed)
  useEffect(() => {
    const handleCloseAll = (e) => {
      if (!e.detail || e.detail.file !== file) {
        setIsOpen(false);
      }
    };
    window.addEventListener('close-all-pdfs', handleCloseAll);
    return () => window.removeEventListener('close-all-pdfs', handleCloseAll);
  }, [file]);

  const handleTrigger = () => {
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    // Close other open PDFs
    window.dispatchEvent(new CustomEvent('close-all-pdfs', { detail: { file } }));

    setIsOpen(true);
    setPageNumber(1);
    setLoading(true);
    setScale(1.0);
    setWidthMode('fitWidth');
  };

  const close = () => setIsOpen(false);

  // Network pre-fetch validation check when PDF is opened
  useEffect(() => {
    if (!isOpen || !file) return;

    let active = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCheckingFile(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setFileExists(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Dynamic scroll page tracker for continuous scroll modes (longStrip, separatedStrip)
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

      if (closestPageNum) {
        setPageNumber(closestPageNum);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run an initial check after a brief timeout once pages are likely rendered
    const timer = setTimeout(handleScroll, 600);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isOpen, pdfReadingMode, numPages, file]);

  // Page width based on reading mode, zoom scale, and fit settings
  const getPageWidth = () => {
    const baseWidth = widthMode === 'fitWidth'
      ? Math.min(window.innerWidth - 80, 800)
      : 600;
    const actualWidth = baseWidth * scale;

    if (pdfReadingMode === 'doublePage') {
      return Math.floor(actualWidth / 2) - 8;
    }
    return actualWidth;
  };



  // Render pages based on reading mode
  const renderPages = () => {
    if (!numPages) return null;

    // Normalizing page calculations for double-page spreads
    const leftPage = pageNumber % 2 === 0 ? pageNumber - 1 : pageNumber;
    const rightPage = leftPage + 1;

    const pageLoaderEl = (
      <div className={styles.pageLoader}>
        <span className={styles.spinner}>🔮</span>
      </div>
    );

    switch (pdfReadingMode) {
      // One page at a time
      case 'paginated':
        return (
          <div className={styles.paginatedView} >
            <Page
              pageNumber={pageNumber}
              width={getPageWidth()}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className={styles.pdfPage}
              loading={pageLoaderEl}
            />
          </div>
        );

      // All pages vertical — continuous scroll, no gap
      case 'longStrip':
        return (
          <div className={styles.longStripView}>
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={i + 1}
                data-page-number={i + 1}
                className={styles.scrollPageWrapper}
              >
                <Page
                  pageNumber={i + 1}
                  width={getPageWidth()}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className={styles.pdfPage}
                  loading={pageLoaderEl}
                />
              </div>
            ))}
          </div>
        );

      // All pages vertical — clear gap and border between pages
      case 'separatedStrip':
        return (
          <div className={styles.separatedStripView}>
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={i + 1}
                data-page-number={i + 1}
                className={styles.separatedPage}
              >
                <div className={styles.pageNumber}>{t('COMMON.pdfViewer.pagePrefix')} {i + 1}</div>
                <Page
                  pageNumber={i + 1}
                  width={getPageWidth()}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className={styles.pdfPage}
                  loading={pageLoaderEl}
                />
              </div>
            ))}
          </div>
        );

      // Two pages side by side (paginated spread)
      case 'doublePage':
        return (
          <div className={styles.doublePageView}>
            <div className={styles.doublePageSpread}>
              <Page
                pageNumber={leftPage}
                width={getPageWidth()}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className={styles.pdfPage}
                loading={pageLoaderEl}
              />
              {rightPage <= numPages && (
                <Page
                  pageNumber={rightPage}
                  width={getPageWidth()}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className={styles.pdfPage}
                  loading={pageLoaderEl}
                />
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // PDF Controls Toolbar at the top
  const renderToolbar = () => {
    if (!numPages) return null;

    return (
      <div className={styles.pdfToolbar}>
        {/* Zoom scale Controls */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolbarBtn}
            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
            disabled={scale <= 0.5}
            title={t('COMMON.pdfViewer.zoomOut') || 'Zoom Out'}
          >
            ➖
          </button>
          <span className={styles.toolbarInfo}>
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            className={styles.toolbarBtn}
            onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
            disabled={scale >= 2.0}
            title={t('COMMON.pdfViewer.zoomIn') || 'Zoom In'}
          >
            ➕
          </button>
        </div>

        {/* Layout Width Fit Selector */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${widthMode === 'fitWidth' ? styles.active : ''}`}
            onClick={() => setWidthMode('fitWidth')}
            title={t('COMMON.pdfViewer.fitWidth') || 'Fit Container Width'}
          >
            ↔️ {t('COMMON.pdfViewer.fitWidthLabel') || 'Fit'}
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${widthMode === 'fitPage' ? styles.active : ''}`}
            onClick={() => setWidthMode('fitPage')}
            title={t('COMMON.pdfViewer.fitPage') || 'Original Page Size'}
          >
            📄 {t('COMMON.pdfViewer.fitPageLabel') || 'Original'}
          </button>
        </div>

        {/* Reading Mode Dynamic Toggle */}
        {pdfCtx && (
          <div className={styles.toolbarGroup}>
            <select
              value={pdfReadingMode}
              onChange={(e) => {
                pdfCtx.setPdfReadingMode(e.target.value);
                setPageNumber(1); // Reset page number to avoid indexing issues
              }}
              className={styles.toolbarSelect}
            >
              {Object.values(pdfCtx.PDF_READING_MODES).map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.icon} {mode.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  // Pinned Footer at the bottom of the PDF Viewer container
  const renderFixedFooter = () => {
    if (!numPages) return null;

    const isPaginated = pdfReadingMode === 'paginated';
    const isDouble = pdfReadingMode === 'doublePage';
    const isSplit = isPaginated || isDouble;

    const leftPage = isDouble ? (pageNumber % 2 === 0 ? pageNumber - 1 : pageNumber) : pageNumber;
    const rightPage = leftPage + 1;

    const handlePrev = () => {
      if (isDouble) {
        setPageNumber(p => Math.max(1, p - 2));
      } else {
        setPageNumber(p => Math.max(1, p - 1));
      }
    };

    const handleNext = () => {
      if (isDouble) {
        setPageNumber(p => Math.min(numPages, p + 2));
      } else {
        setPageNumber(p => Math.min(numPages, p + 1));
      }
    };

    const prevDisabled = isDouble ? leftPage <= 1 : pageNumber <= 1;
    const nextDisabled = isDouble
      ? (rightPage >= numPages || leftPage >= numPages)
      : pageNumber >= numPages;

    let pageInfoStr = '';
    if (isPaginated) {
      pageInfoStr = `${pageNumber} / ${numPages}`;
    } else if (isDouble) {
      if (rightPage <= numPages) {
        pageInfoStr = `${leftPage}-${rightPage} / ${numPages}`;
      } else {
        pageInfoStr = `${leftPage} / ${numPages}`;
      }
    } else {
      // Scroll reading modes (longStrip, separatedStrip)
      pageInfoStr = `${pageNumber} / ${numPages}`;
    }

    return (
      <div className={styles.fixedFooter}>
        {isSplit && (
          <button
            type="button"
            className={styles.footerBtn}
            onClick={handlePrev}
            disabled={prevDisabled}
          >
            {t('COMMON.pdfViewer.previous') || '◀ Précédent'}
          </button>
        )}

        <span className={styles.footerPageInfo}>
          {pageInfoStr}
        </span>

        {isSplit && (
          <button
            type="button"
            className={styles.footerBtn}
            onClick={handleNext}
            disabled={nextDisabled}
          >
            {t('COMMON.pdfViewer.next') || 'Suivant ▶'}
          </button>
        )}
      </div>
    );
  };

  // Shared PDF document content
  const PdfContent = (
    <div className={styles.pdfContent} ref={pdfContentRef} key={`${file}-${pdfReadingMode}`}>
      {checkingFile && <div className={styles.loader}>{t('COMMON.pdfViewer.loading')}</div>}
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
            loading={<div className={styles.loader}>{t('COMMON.pdfViewer.loading')}</div>}
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
      <button className={`${styles.trigger} pdf-viewer-trigger`} onClick={handleTrigger} type="button">
        {typeof label === 'string' ? (
          <>
            <span className={styles.triggerIcon}>📜</span>
            <span className={styles.triggerLabel}>{label}</span>
          </>
        ) : (
          label
        )}
        {pdfMode === 'newWindow' && (
          <span className={styles.triggerHint}>↗️</span>
        )}
      </button>

      {/* Inline mode */}
      {pdfMode === 'inline' && isOpen && (
        <div className={styles.inlineContainer}>
          <div className={styles.inlineHeader}>
            <div className={styles.inlineTitle}>
              {typeof label === 'string' ? <span>{label}</span> : label}
            </div>
            <button className={styles.closeInline} onClick={close} type="button">×</button>
          </div>
          {renderToolbar()}
          {PdfContent}
          {renderFixedFooter()}
        </div>
      )}

      {/* Modal mode */}
      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>📜 {typeof label === 'string' ? label : t('CRMEF_SEMESTERS.tooltip.pages') || 'Scroll'}</span>
              <button className={styles.closeModal} onClick={close} type="button">×</button>
            </div>
            {renderToolbar()}
            {PdfContent}
            {renderFixedFooter()}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PdfViewer;
