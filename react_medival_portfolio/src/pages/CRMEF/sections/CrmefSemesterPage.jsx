import { useState } from 'react';
import CSection from '../../../templates/Section';
import FileLink from '../../../components/FileLink/FileLink';
import { crmefSemesters } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefSemesterPage.module.scss';

const CrmefSemesterPage = ({ semesterId }) => {
  const { t } = useSettings();

  const semesters = semesterId
    ? crmefSemesters.filter(s => s.id === semesterId)
    : crmefSemesters;

  // React state variable named activeModuleIds initialized to the ID of the first module of each semester
  const [activeModuleIds, setActiveModuleIds] = useState(() =>
    Object.fromEntries(
      semesters.map(s => [s.id, s.modules[0]?.id || ''])
    )
  );

  const handleFilterSelect = (semId, moduleId) => {
    window.dispatchEvent(new CustomEvent('close-all-pdfs'));
    setActiveModuleIds(prev => ({
      ...prev,
      [semId]: moduleId
    }));
  };

  const renderFileCard = (fileItem, index, groupLabel) => {
    const isObject = typeof fileItem === 'object' && fileItem !== null;
    const filePath = isObject ? fileItem.path : fileItem;
    const localizedName = isObject && fileItem.name ? t(fileItem.name) : null;
    const fileLabel = localizedName || `${groupLabel} #${index + 1}`;

    const meta = {};
    if (isObject && fileItem.metric) meta.pages = fileItem.metric;
    if (isObject && fileItem.meta.date) meta.date = fileItem.meta.date;
    if (isObject && fileItem.meta.size) meta.size = fileItem.meta.size;
    if (isObject && fileItem.meta.author) meta.author = fileItem.meta.author;
    // if (isObject && fileItem.meta.wordCount) meta.wordCount = fileItem.meta.wordCount;

    return (
      <FileLink
        key={filePath}
        filePath={filePath}
        label={fileLabel}
        meta={meta}
        pdfClass={styles.pdfViewerOverride}
        t={t}
        tooltipKey="CRMEF_SEMESTERS.tooltip"
      />
    );
  };

  return (
    <>
      {semesters.map(semester => {
        const title = t(semester.title);
        const activeModuleId = activeModuleIds[semester.id] || semester.modules[0]?.id || '';
        const activeModule = semester.modules.find(m => m.id === activeModuleId);

        return (
          <CSection
            key={semester.id}
            id={semester.id}
            variant="crmef"
            title={title}
            className={styles.section}
          >
            {/* Top Tab Navigation Row: horizontally scrolling spacing pills */}
            <div className={styles.badgeTabWrapper}>
              <div className={`${styles.badgeTabRow} flex space-x-2 overflow-x-auto no-scrollbar`}>
                {semester.modules.map(m => {
                  const isActive = activeModuleId === m.id;
                  const moduleName = t(m.name);
                  const shortName = moduleName.length > 28 ? moduleName.slice(0, 26) + '...' : moduleName;

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleFilterSelect(semester.id, m.id)}
                      className={`${styles.badgeTabItem} ${isActive ? styles.badgeTabActive : ''}`}
                      title={moduleName}
                    >
                      {shortName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gorgeous full-width workspace component */}
            {activeModule && (() => {
              const name = t(activeModule.name);
              const professor = t(activeModule.professor);

              return (
                <div className={`${styles.workspaceContainer} w-full bg-card`}>
                  {/* Workspace Header */}
                  <div className={styles.workspaceHeader}>
                    <h3 className={styles.moduleName} title={name}>
                      {name}
                    </h3>

                    {professor && professor !== 'Unknown' && professor !== 'Inconnu' && professor !== 'غير معروف' && (
                      <p className={styles.moduleProfessor}>
                        👨‍🏫 {professor}
                      </p>
                    )}

                    {activeModule.desc && (() => {
                      const descText = t(activeModule.desc);
                      const learnedLabel = t('CRMEF_SEMESTERS.learned');
                      return descText ? (
                        <p className={styles.moduleDesc}>
                          <span className={styles.moduleDescLabel}>
                            💡 {learnedLabel}:
                          </span>
                          {descText}
                        </p>
                      ) : null;
                    })()}
                  </div>

                  {/* Workspace Files: dynamic elastic column blocks */}
                  <div className={styles.workspaceGroups}>
                    {/* Solo Work Section */}
                    {activeModule.files?.solo && activeModule.files.solo.length > 0 && (
                      <div className={styles.fileGroupSection}>
                        <h4 className={styles.fileGroupHeading}>
                          <span className={styles.fileGroupIcon}>👤</span> {t('CRMEF_SEMESTERS.files.solo') || 'Solo Work'}
                        </h4>
                        <div className={styles.fileGroupList}>
                          {activeModule.files.solo.map((fileItem, index) => (
                            <div key={index} className="w-full max-w-full overflow-hidden truncate block">
                              {renderFileCard(fileItem, index, t('CRMEF_SEMESTERS.files.solo') || 'Solo Work')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Group Projects Section */}
                    {activeModule.files?.group && activeModule.files.group.length > 0 && (
                      <div className={styles.fileGroupSection}>
                        <h4 className={styles.fileGroupHeading}>
                          <span className={styles.fileGroupIcon}>👥</span> {t('CRMEF_SEMESTERS.files.group') || 'Group Projects'}
                        </h4>
                        <div className={styles.fileGroupList}>
                          {activeModule.files.group.map((fileItem, index) => (
                            <div key={index} className="w-full max-w-full overflow-hidden truncate block">
                              {renderFileCard(fileItem, index, t('CRMEF_SEMESTERS.files.group') || 'Group Projects')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Resources Section */}
                    {activeModule.files?.official && activeModule.files.official.length > 0 && (
                      <div className={styles.fileGroupSection}>
                        <h4 className={styles.fileGroupHeading}>
                          <span className={styles.fileGroupIcon}>📜</span> {t('CRMEF_SEMESTERS.files.official') || 'Official Resources'}
                        </h4>
                        <div className={styles.fileGroupList}>
                          {activeModule.files.official.map((fileItem, index) => (
                            <div key={index} className="w-full max-w-full overflow-hidden truncate block">
                              {renderFileCard(fileItem, index, t('CRMEF_SEMESTERS.files.official') || 'Official Resources')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Empty fallback if active module literally has no files in any category */}
                  {(!activeModule.files?.solo?.length &&
                    !activeModule.files?.group?.length &&
                    !activeModule.files?.official?.length) && (
                      <div className={styles.emptyCardFiles}>
                        <p className={styles.noFiles}>
                          📭 {t('CRMEF_SEMESTERS.files.noFiles')}
                        </p>
                      </div>
                    )}
                </div>
              );
            })()}
          </CSection>
        );
      })}
    </>
  );
};

export default CrmefSemesterPage;
