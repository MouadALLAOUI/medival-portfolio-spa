import { useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, Loader } from 'lucide-react';
import { getExt, classifyFile, FILE_TYPE_META, isDownloadExt } from '../../lib/fileType';
import { useAlerts } from '../../lib/useAlerts';
import PdfViewer from '../PdfViewer/PdfViewer';
import styles from './FileLink.module.scss';

/**
 * Universal file card with icon, extension badge, hover tooltip, and
 * a HEAD-request existence check before opening or downloading.
 *
 * Props:
 *   filePath   {string}   – URL / absolute path to the file
 *   label      {string}   – Display label (falls back to ext)
 *   meta       {object}   – Optional { pages, date, size, author, … }
 *   className  {string}   – Extra CSS class on the root wrapper
 *   pdfClass   {string}   – Extra class forwarded to PdfViewer wrapper
 *   t          {function} – Translation function (optional)
 *   tooltipKey {string}   – i18n prefix for tooltip row labels
 */
export default function FileLink({
  filePath,
  label,
  meta = {},
  className = '',
  pdfClass = '',
  t,
  tooltipKey = 'CRMEF_SEMESTERS.tooltip',
}) {
  const { showAlert } = useAlerts();
  const [isChecking, setIsChecking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  const ext = getExt(filePath);
  const fileType = classifyFile(ext);
  const { Icon, colorClass } = FILE_TYPE_META[fileType] || FILE_TYPE_META.generic;
  const isPdf = fileType === 'pdf';
  const isImage = fileType === 'image';
  const doDownload = isDownloadExt(ext);
  const displayLabel = label || `.${ext.toUpperCase()}`;

  const resolveLabel = (key) => (t ? t(key) : key);

  // ── Tooltip positioning ───────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + window.scrollY - 10,
        left: rect.left + window.scrollX + rect.width / 2,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // ── File-existence guard ──────────────────────────────────────────────────
  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    if (isChecking) return;

    setIsChecking(true);
    let exists = false;

    try {
      const res = await fetch(filePath, { method: 'HEAD' });

      if (!res.ok) {
        exists = false;
      } else {
        const contentType = res.headers.get('content-type') || '';
        const isHtmlResponse = contentType.includes('text/html');
        const isHtmlExpected = ext === 'html' || ext === 'htm';

        if (isHtmlResponse && !isHtmlExpected) {
          exists = false;
        } else {
          exists = true;
        }
      }
    } catch {
      exists = false;
    } finally {
      setIsChecking(false);
    }

    if (!exists) {
      showAlert(`📂 File not found: "${displayLabel}"`, 'error', 4500);
      return;
    }

    // File exists — open or download
    if (doDownload) {
      const a = document.createElement('a');
      a.href = filePath;
      a.download = '';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(filePath, '_blank', 'noopener,noreferrer');
    }
  }, [filePath, displayLabel, doDownload, showAlert, ext, isChecking]);

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const renderTooltip = () => (
    <div className={styles.tooltip}>
      {isImage ? (
        <div className={styles.tooltipImagePreview}>
          <img src={filePath} alt={displayLabel} loading="lazy" />
          <div className={styles.tooltipImageCaption}>
            <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
            <span className={styles.tooltipLabelText}>{displayLabel}</span>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.tooltipHeader}>
            <Icon size={13} className={`${styles.fileIcon} ${styles[colorClass]}`} />
            <span>{displayLabel}</span>
          </div>
          <div className={styles.tooltipBody}>
            <div className={styles.tooltipRow}>
              <span>📎 Type:</span>
              <strong>.{ext.toUpperCase()}</strong>
            </div>
            {meta.pages && (
              <div className={styles.tooltipRow}>
                <span>📄 {resolveLabel(`${tooltipKey}.pages`)}:</span>
                <strong>{meta.pages}</strong>
              </div>
            )}
            {meta.date && (
              <div className={styles.tooltipRow}>
                <span>📅 {resolveLabel(`${tooltipKey}.date`)}:</span>
                <strong>{meta.date}</strong>
              </div>
            )}
            {meta.size && (
              <div className={styles.tooltipRow}>
                <span>💾 Size:</span>
                <strong>{meta.size}</strong>
              </div>
            )}
            {meta.author && (
              <div className={styles.tooltipRow}>
                <span>✍️ Author:</span>
                <strong>{meta.author}</strong>
              </div>
            )}
            {meta.wordCount && (
              <div className={styles.tooltipRow}>
                <span>📝 {resolveLabel(`${tooltipKey}.wordCount`)}:</span>
                <strong>{meta.wordCount}</strong>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  // ── Inner button label (used by PdfViewer too) ────────────────────────────
  const buttonInner = (
    <span className={styles.fileButtonInner}>
      <Icon size={16} className={`${styles.fileIcon} ${styles[colorClass]}`} />
      <span className={styles.fileButtonLabel}>{displayLabel}</span>
      {meta.pages && (
        <span className={styles.fileMetaBadge}>
          {meta.pages} {t ? t('CRMEF_SEMESTERS.tooltip.pages')?.toLowerCase() || 'pages' : 'pages'}
        </span>
      )}
      <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
    </span>
  );

  return (
    <div className={`${styles.fileCardContainer} ${className}`} ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.fileCard}>
        {isPdf ? (
          /* PDFs: PdfViewer has its own existence handling */
          <PdfViewer
            file={filePath}
            label={buttonInner}
            className={`${styles.pdfViewerOverride} ${pdfClass}`}
          />
        ) : (
          /* All other types: checked button */
          <button
            type="button"
            onClick={handleClick}
            disabled={isChecking}
            className={`${styles.fileDownloadBtn} ${isChecking ? styles.disabled : ''}`}
            title={displayLabel}
          >
            <Icon size={16} className={`${styles.fileIcon} ${styles[colorClass]}`} />
            <span className={styles.fileButtonLabel}>{displayLabel}</span>
            {meta.pages && (
              <span className={styles.fileMetaBadge}>
                {meta.pages} {t ? t('CRMEF_SEMESTERS.tooltip.pages')?.toLowerCase() || 'pages' : 'pages'}
              </span>
            )}
            <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
            {isChecking ? (
              <Loader size={13} className={`${styles.fileActionIcon} ${styles.spin}`} />
            ) : isImage ? (
              <ExternalLink size={13} className={styles.fileActionIcon} />
            ) : doDownload ? (
              <Download size={13} className={styles.fileActionIcon} />
            ) : (
              <ExternalLink size={13} className={styles.fileActionIcon} />
            )}
          </button>
        )}
      </div>

      {showTooltip && createPortal(
        <div className={styles.tooltipPortal} style={{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px` }}>
          {renderTooltip()}
        </div>,
        document.body
      )}
    </div>
  );
}
