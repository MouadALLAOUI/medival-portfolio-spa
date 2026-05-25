import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePdfViewer } from '../lib/usePdfViewer';
import { useSettings } from '../lib/useSettings';
import styles from './PdfViewer.module.scss';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Required worker config
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer() {
  const { isOpen, url, title, closePdf } = usePdfViewer();
  const { t } = useSettings();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(true);
  const [checkingFile, setCheckingFile] = useState(false);

  // Reset pagination and checking state whenever a new PDF url is loaded
  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    
    if (!url) return;

    let active = true;
    setCheckingFile(true);
    setFileExists(true);
    setLoading(true);

    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (!active) return;
        const contentType = res.headers.get('content-type') || '';
        // If status is 404 or the content-type is HTML (fallback), treat as missing
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
  }, [url]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePdf();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closePdf]);

  if (!isOpen || !url) return null;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  return createPortal(
    <div className={styles['pdf-viewer-overlay']} onClick={closePdf}>
      <div className={styles['pdf-container']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['pdf-header']}>
          <h3>{title}</h3>
          <button
            className={styles['close-btn']}
            onClick={closePdf}
            aria-label={t('COMMON.settings.closeBtn') || "Close PDF viewer"}
          >
            ×
          </button>
        </div>
        <div className={styles['pdf-frame']}>
          {loading && <div className={styles['pdf-loading']}>{t('COMMON.pdfViewer.loading')}</div>}

          {!checkingFile && !fileExists ? (
            <div className={styles['pdf-error-msg']}>
              {t('COMMON.pdfViewer.errorNotFound')}
            </div>
          ) : (
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => {
                console.error('PDF load error:', err);
                setFileExists(false);
                setLoading(false);
              }}
              loading=""
              error={
                <div className={styles['pdf-error-msg']}>
                  {t('COMMON.pdfViewer.errorCorrupted')}
                </div>
              }
              noData={
                <div className={styles['pdf-error-msg']}>
                  {t('COMMON.pdfViewer.errorNoData')}
                </div>
              }
            >
              {fileExists && (
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  width={Math.min(window.innerWidth * 0.9, 800)}
                />
              )}
            </Document>
          )}
        </div>

        {numPages && (
          <div className={styles['pdf-controls']}>
            <button
              onClick={() => setPageNumber(p => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className={styles['pdf-nav-btn']}
            >
              {t('COMMON.pdfViewer.previous')}
            </button>
            <span className={styles['pdf-page-indicator']}>{pageNumber} / {numPages}</span>
            <button
              onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className={styles['pdf-nav-btn']}
            >
              {t('COMMON.pdfViewer.next')}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}