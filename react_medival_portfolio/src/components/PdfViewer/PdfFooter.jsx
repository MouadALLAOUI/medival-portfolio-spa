import { useSettings } from '../../lib/useSettings';
import styles from './PdfViewer.module.scss';

export default function PdfFooter({
  numPages,
  pageNumber,
  setPageNumber,
  pdfReadingMode,
}) {
  const { t } = useSettings();

  if (!numPages) return null;

  const isPaginated = pdfReadingMode === 'paginated';
  const isDouble = pdfReadingMode === 'doublePage';
  const isSplit = isPaginated || isDouble;

  const leftPage = isDouble ? (pageNumber % 2 === 0 ? pageNumber - 1 : pageNumber) : pageNumber;
  const rightPage = leftPage + 1;

  const handlePrev = () => {
    setPageNumber(p => isDouble ? Math.max(1, p - 2) : Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPageNumber(p => isDouble ? Math.min(numPages, p + 2) : Math.min(numPages, p + 1));
  };

  const prevDisabled = isDouble ? leftPage <= 1 : pageNumber <= 1;
  const nextDisabled = isDouble
    ? (rightPage >= numPages || leftPage >= numPages)
    : pageNumber >= numPages;

  let pageInfoStr = '';
  if (isPaginated) {
    pageInfoStr = `${pageNumber} / ${numPages}`;
  } else if (isDouble) {
    pageInfoStr = rightPage <= numPages
      ? `${leftPage}-${rightPage} / ${numPages}`
      : `${leftPage} / ${numPages}`;
  } else {
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
}
