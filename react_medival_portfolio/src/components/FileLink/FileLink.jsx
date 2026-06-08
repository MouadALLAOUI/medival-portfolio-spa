import { useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, Loader } from 'lucide-react';
import { getExt, classifyFile, FILE_TYPE_META, isDownloadExt } from '../../lib/fileType';
import { useAlerts } from '../../lib/useAlerts';
import PdfViewer from '../PdfViewer/PdfViewer';
import FileTooltip from './FileTooltip';
import styles from './FileLink.module.scss';

export default function FileLink({ filePath, label, meta = {}, className = '', pdfClass = '', t, tooltipKey = 'CRMEF_SEMESTERS.tooltip' }) {
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

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipPos({ top: rect.top + window.scrollY - 10, left: rect.left + window.scrollX + rect.width / 2 });
      setShowTooltip(true);
    }
  };

  const handleClick = useCallback(async (e, forceDownload = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (isChecking) return;
    setIsChecking(true);
    let exists = false;
    try {
      const res = await fetch(filePath, { method: 'HEAD' });
      if (!res.ok) { exists = false; } else {
        const ct = res.headers.get('content-type') || '';
        exists = !(ct.includes('text/html') && ext !== 'html' && ext !== 'htm');
      }
    } catch { exists = false; } finally { setIsChecking(false); }
    if (!exists) { showAlert(`📂 File not found: "${displayLabel}"`, 'error', 4500); return; }
    setShowTooltip(false);
    if (doDownload || forceDownload) {
      const a = document.createElement('a'); a.href = filePath; a.download = ''; a.rel = 'noopener noreferrer'; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } else { window.open(filePath, '_blank', 'noopener,noreferrer'); }
  }, [filePath, displayLabel, doDownload, showAlert, ext, isChecking]);

  const buttonInner = (
    <span className={styles.fileButtonInner}>
      <Icon size={16} className={`${styles.fileIcon} ${styles[colorClass]}`} />
      <span className={styles.fileButtonLabel}>{displayLabel}</span>
      {meta.pages && <span className={styles.fileMetaBadge}>{meta.pages} {t ? t('CRMEF_SEMESTERS.tooltip.pages')?.toLowerCase() || 'pages' : 'pages'}</span>}
      <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
    </span>
  );

  return (
    <div className={`${styles.fileCardContainer} ${className}`} ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}>
      <div className={styles.fileCard}>
        {isPdf ? (
          <div className={styles.pdfCardActions}>
            <PdfViewer file={filePath} label={buttonInner} className={`${styles.pdfViewerOverride} ${pdfClass}`} onOpen={() => setShowTooltip(false)} />
            <button type="button" onClick={(e) => handleClick(e, true)} disabled={isChecking} className={`${styles.pdfDownloadBtn} ${isChecking ? styles.disabled : ''}`} title={t ? t('COMMON.pdfViewer.download') || 'Download PDF' : 'Download PDF'}>
              {isChecking ? <Loader size={16} className={`${styles.fileActionIcon} ${styles.spin}`} /> : <Download size={16} className={styles.fileActionIcon} />}
            </button>
          </div>
        ) : (
          <button type="button" onClick={handleClick} disabled={isChecking} className={`${styles.fileDownloadBtn} ${isChecking ? styles.disabled : ''}`} title={displayLabel}>
            <Icon size={16} className={`${styles.fileIcon} ${styles[colorClass]}`} />
            <span className={styles.fileButtonLabel}>{displayLabel}</span>
            {meta.pages && <span className={styles.fileMetaBadge}>{meta.pages} {t ? t('CRMEF_SEMESTERS.tooltip.pages')?.toLowerCase() || 'pages' : 'pages'}</span>}
            <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
            {isChecking ? <Loader size={13} className={`${styles.fileActionIcon} ${styles.spin}`} /> : isImage ? <ExternalLink size={13} className={styles.fileActionIcon} /> : doDownload ? <Download size={13} className={styles.fileActionIcon} /> : <ExternalLink size={13} className={styles.fileActionIcon} />}
          </button>
        )}
      </div>
      {showTooltip && createPortal(
        <div className={styles.tooltipPortal} style={{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px` }}>
          <FileTooltip isImage={isImage} filePath={filePath} displayLabel={displayLabel} ext={ext} colorClass={colorClass} Icon={Icon} meta={meta} tooltipKey={tooltipKey} t={t} />
        </div>,
        document.body
      )}
    </div>
  );
}
