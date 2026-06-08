import { useSettings } from '../../lib/useSettings';
import styles from './PdfViewer.module.scss';

export default function PdfToolbar({
  numPages,
  scale,
  setScale,
  widthMode,
  setWidthMode,
  pdfReadingMode,
  setPdfReadingMode,
  setPageNumber,
  pdfCtx,
}) {
  const { t } = useSettings();

  if (!numPages) return null;

  return (
    <div className={styles.pdfToolbar}>
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

      {pdfCtx && (
        <div className={styles.toolbarGroup}>
          <select
            value={pdfReadingMode}
            onChange={(e) => {
              pdfCtx.setPdfReadingMode(e.target.value);
              setPageNumber(1);
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
}
