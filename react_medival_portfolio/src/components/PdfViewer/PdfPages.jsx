import { Page } from 'react-pdf';
import { useSettings } from '../../lib/useSettings';
import styles from './PdfViewer.module.scss';

export default function PdfPages({
  numPages,
  pageNumber,
  pdfReadingMode,
  getPageWidth,
}) {
  const { t } = useSettings();

  if (!numPages) return null;

  const leftPage = pageNumber % 2 === 0 ? pageNumber - 1 : pageNumber;
  const rightPage = leftPage + 1;

  const pageLoaderEl = (
    <div className={styles.pageLoader}>
      <span className={styles.spinner}>🔮</span>
    </div>
  );

  const renderPage = (num) => (
    <Page
      pageNumber={num}
      width={getPageWidth()}
      renderTextLayer={true}
      renderAnnotationLayer={true}
      className={styles.pdfPage}
      loading={pageLoaderEl}
    />
  );

  switch (pdfReadingMode) {
    case 'paginated':
      return (
        <div className={styles.paginatedView}>
          {renderPage(pageNumber)}
        </div>
      );

    case 'longStrip':
      return (
        <div className={styles.longStripView}>
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i + 1} data-page-number={i + 1} className={styles.scrollPageWrapper}>
              {renderPage(i + 1)}
            </div>
          ))}
        </div>
      );

    case 'separatedStrip':
      return (
        <div className={styles.separatedStripView}>
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i + 1} data-page-number={i + 1} className={styles.separatedPage}>
              <div className={styles.pageNumber}>{t('COMMON.pdfViewer.pagePrefix')} {i + 1}</div>
              {renderPage(i + 1)}
            </div>
          ))}
        </div>
      );

    case 'doublePage':
      return (
        <div className={styles.doublePageView}>
          <div className={styles.doublePageSpread}>
            {renderPage(leftPage)}
            {rightPage <= numPages && renderPage(rightPage)}
          </div>
        </div>
      );

    default:
      return null;
  }
}
