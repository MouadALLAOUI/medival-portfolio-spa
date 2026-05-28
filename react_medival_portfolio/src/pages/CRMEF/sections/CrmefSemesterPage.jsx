import { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  File,
  Download,
  ExternalLink,
} from 'lucide-react';
import CSection from '../../../templates/Section';
import PdfViewer from '../../../components/PdfViewer/PdfViewer';
import { crmefSemesters } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefSemesterPage.module.scss';

// Determine the extension from a file path
const getExt = (path) => {
  const match = (path || '').match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match ? match[1].toLowerCase() : '';
};

// Classify file type
const classifyFile = (ext) => {
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'doc';
  if (['xls', 'xlsx', 'ods', 'csv'].includes(ext)) return 'spreadsheet';
  if (['ppt', 'pptx', 'odp'].includes(ext)) return 'presentation';
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) return 'image';
  if (['mp4', 'webm', 'mov', 'avi'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) return 'audio';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'archive';
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'c', 'cpp', 'html', 'css', 'json'].includes(ext)) return 'code';
  return 'generic';
};

// Map file type to lucide icon + color class
const FILE_TYPE_META = {
  pdf:          { Icon: FileText,         colorClass: 'fileIconPdf' },
  doc:          { Icon: FileText,         colorClass: 'fileIconDoc' },
  spreadsheet:  { Icon: FileSpreadsheet,  colorClass: 'fileIconSpreadsheet' },
  presentation: { Icon: Presentation,     colorClass: 'fileIconPresentation' },
  image:        { Icon: FileImage,        colorClass: 'fileIconImage' },
  video:        { Icon: FileVideo,        colorClass: 'fileIconVideo' },
  audio:        { Icon: FileAudio,        colorClass: 'fileIconAudio' },
  archive:      { Icon: FileArchive,      colorClass: 'fileIconArchive' },
  code:         { Icon: FileCode,         colorClass: 'fileIconCode' },
  generic:      { Icon: File,             colorClass: 'fileIconGeneric' },
};

const CrmefSemesterPage = () => {
  const { t } = useSettings();
  const [collapsedModules, setCollapsedModules] = useState({});

  const toggleCollapse = (moduleId) => {
    setCollapsedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const renderFileCard = (fileItem, index, groupLabel) => {
    const isObject = typeof fileItem === 'object' && fileItem !== null;
    const filePath = isObject ? fileItem.path : fileItem;

    const localizedName = isObject && fileItem.name ? t(fileItem.name) : null;
    const fileLabel = localizedName || `${groupLabel} #${index + 1}`;

    const ext = getExt(filePath);
    const fileType = classifyFile(ext);
    const { Icon, colorClass } = FILE_TYPE_META[fileType] || FILE_TYPE_META.generic;
    const isPdf = fileType === 'pdf';

    const hasMetadata = isObject && (fileItem.pages || fileItem.date);

    return (
      <div key={index} className={styles.fileCardContainer}>
        {isPdf ? (
          <div className={styles.fileCard}>
            <PdfViewer
              file={filePath}
              label={
                <span className={styles.fileButtonInner}>
                  <Icon size={16} className={`${styles.fileIcon} ${styles[colorClass]}`} />
                  <span className={styles.fileButtonLabel}>{fileLabel}</span>
                  <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
                </span>
              }
              className={styles.pdfViewerOverride}
            />
          </div>
        ) : (
          <div className={styles.fileCard}>
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              download={fileType === 'generic' || ['doc','docx','xls','xlsx','ppt','pptx','zip','rar'].includes(ext)}
              className={styles.fileDownloadBtn}
            >
              <Icon size={16} className={`${styles.fileIcon} ${styles[colorClass]}`} />
              <span className={styles.fileButtonLabel}>{fileLabel}</span>
              <span className={`${styles.fileExtBadge} ${styles[colorClass]}`}>.{ext.toUpperCase()}</span>
              {['doc','docx','xls','xlsx','ppt','pptx','odt','odp','ods','zip','rar'].includes(ext)
                ? <Download size={13} className={styles.fileActionIcon} />
                : <ExternalLink size={13} className={styles.fileActionIcon} />
              }
            </a>
          </div>
        )}

        {hasMetadata && (
          <div className={styles.tooltip}>
            <div className={styles.tooltipHeader}>
              <Icon size={13} className={`${styles.fileIcon} ${styles[colorClass]}`} />
              {fileLabel}
            </div>
            <div className={styles.tooltipBody}>
              {fileItem.pages && (
                <div className={styles.tooltipRow}>
                  <span>📄 {t('CRMEF_SEMESTERS.tooltip.pages')}:</span>
                  <strong>{fileItem.pages}</strong>
                </div>
              )}
              {fileItem.date && (
                <div className={styles.tooltipRow}>
                  <span>📅 {t('CRMEF_SEMESTERS.tooltip.date')}:</span>
                  <strong>{fileItem.date}</strong>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {crmefSemesters.map(semester => {
        const title = t(semester.title);
        return (
          <CSection
            key={semester.id}
            variant="crmef"
            id={semester.id}
            title={title}
            className={styles.section}
          >
            <div className={styles.modulesList}>
              {semester.modules.map(module => {
                const name = t(module.name);
                const professor = t(module.professor);
                const isCollapsed = !!collapsedModules[module.id];

                return (
                  <div
                    key={module.id}
                    className={`${styles.moduleItem} ${isCollapsed ? styles.moduleCollapsed : ''}`}
                  >
                    <div
                      className={styles.moduleHeader}
                      onClick={() => toggleCollapse(module.id)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={!isCollapsed}
                      onKeyDown={e => e.key === 'Enter' && toggleCollapse(module.id)}
                    >
                      <div className={styles.headerTitleArea}>
                        <h3 className={styles.moduleName}>{name}</h3>
                        {professor && professor !== 'Unknown' && professor !== 'Inconnu' && professor !== 'غير معروف' && (
                          <p className={styles.moduleProfessor}>
                            👨‍🏫 {professor}
                          </p>
                        )}
                      </div>
                      <span className={`${styles.collapseChevron} ${isCollapsed ? styles.chevronCollapsed : ''}`}>
                        ▼
                      </span>
                    </div>

                    {!isCollapsed && (
                      <div className={styles.groupsGrid}>
                        {['solo', 'group', 'official'].map(groupKey => {
                          const filesArray = module.files[groupKey] || [];
                          const groupLabel = t(`CRMEF_SEMESTERS.files.${groupKey}`);

                          return (
                            <div key={groupKey} className={styles.fileGroup}>
                              <h4 className={styles.groupTitle}>{groupLabel}</h4>
                              <div className={styles.groupFilesList}>
                                {filesArray.length === 0 ? (
                                  <p className={styles.noFiles}>
                                    📭 {t('CRMEF_SEMESTERS.files.noFiles')}
                                  </p>
                                ) : (
                                  filesArray.map((fileItem, index) =>
                                    renderFileCard(fileItem, index, groupLabel)
                                  )
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CSection>
        );
      })}
    </>
  );
};

export default CrmefSemesterPage;
