import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { usePdfSettings } from '../../lib/contexts/PdfSettingsContext';
import styles from './XlsxViewer.module.scss';

const XlsxViewer = ({ file, label = 'Open Spreadsheet', className, onOpen }) => {
  const pdfCtx = usePdfSettings();
  const location = useLocation();
  const pdfMode = pdfCtx?.pdfMode || 'modal';

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tablesHtml, setTablesHtml] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => { setIsOpen(false); }, [location]);

  const fetchAndRender = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const resp = await fetch(file);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const ab = await resp.arrayBuffer();
      const wb = XLSX.read(ab, { type: 'array' });
      setSheetNames(wb.SheetNames);
      const sheets = wb.SheetNames.map(name => {
        const ws = wb.Sheets[name];
        return XLSX.utils.sheet_to_html(ws, { editable: false });
      });
      setTablesHtml(sheets);
      setActiveSheet(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleTrigger = () => {
    if (onOpen) onOpen();
    if (pdfMode === 'newWindow') {
      window.open(file, '_blank', 'noopener,noreferrer');
      return;
    }
    window.dispatchEvent(new CustomEvent('close-all-pdfs', { detail: { file } }));
    setIsOpen(true);
    setTablesHtml([]);
    setSheetNames([]);
    setActiveSheet(0);
    fetchAndRender();
  };

  const close = () => setIsOpen(false);

  const content = (
    <div className={styles.xlsxContent} ref={containerRef}>
      {loading && <div className={styles.loader}>Loading spreadsheet...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      {!loading && !error && tablesHtml.length > 0 && (
        <div className={styles.xlsxInner}>
          {sheetNames.length > 1 && (
            <div className={styles.tabs}>
              {sheetNames.map((name, i) => (
                <button
                  key={name}
                  className={`${styles.tab} ${i === activeSheet ? styles.activeTab : ''}`}
                  onClick={() => setActiveSheet(i)}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          <div className={styles.tableWrap}>
            <div
              className={styles.table}
              dangerouslySetInnerHTML={{ __html: tablesHtml[activeSheet] || '' }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <button className={`${styles.trigger} pdf-viewer-trigger`} onClick={handleTrigger} type="button">
        {typeof label === 'string' ? (
          <>
            <span className={styles.triggerIcon}>📊</span>
            <span className={styles.triggerLabel}>{label}</span>
          </>
        ) : label}
      </button>

      {pdfMode === 'inline' && isOpen && (
        <div className={styles.inlineContainer}>
          <div className={styles.inlineHeader}>
            <span className={styles.inlineTitle}>{label}</span>
            <button className={styles.closeInline} onClick={close} type="button">×</button>
          </div>
          {content}
        </div>
      )}

      {pdfMode === 'modal' && isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>📊 {label}</span>
              <button className={styles.closeModal} onClick={close} type="button">×</button>
            </div>
            {content}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default XlsxViewer;
