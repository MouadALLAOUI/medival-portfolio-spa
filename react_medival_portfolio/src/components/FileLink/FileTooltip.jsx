import styles from './FileLink.module.scss';

export default function FileTooltip({ isImage, filePath, displayLabel, ext, colorClass, Icon, meta, tooltipKey, t }) {
  const resolveLabel = (key) => (t ? t(key) : key);

  return (
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
            <div className={styles.tooltipRow}><span>📎 Type:</span><strong>.{ext.toUpperCase()}</strong></div>
            {meta.pages && <div className={styles.tooltipRow}><span>📄 {resolveLabel(`${tooltipKey}.pages`)}:</span><strong>{meta.pages}</strong></div>}
            {meta.date && <div className={styles.tooltipRow}><span>📅 {resolveLabel(`${tooltipKey}.date`)}:</span><strong>{meta.date}</strong></div>}
            {meta.size && <div className={styles.tooltipRow}><span>💾 Size:</span><strong>{meta.size}</strong></div>}
            {meta.author && <div className={styles.tooltipRow}><span>✍️ Author:</span><strong>{meta.author}</strong></div>}
            {meta.wordCount && <div className={styles.tooltipRow}><span>📝 {resolveLabel(`${tooltipKey}.wordCount`)}:</span><strong>{meta.wordCount}</strong></div>}
          </div>
        </>
      )}
    </div>
  );
}
