import { useState } from 'react';
import CSection from '../../../templates/Section';
import FileLink from '../../../components/FileLink/FileLink';
import { crmefSemesters } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import FileGroupSection from './FileGroupSection';
import styles from './CrmefSemesterPage.module.scss';

const ModuleWorkspace = ({ activeModule, semester, t }) => {
  const name = t(activeModule.name);
  const professor = t(activeModule.professor);

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

  const hasFiles = activeModule.files?.solo?.length || activeModule.files?.group?.length || activeModule.files?.official?.length;

  return (
    <div className={`${styles.workspaceContainer} w-full bg-card`}>
      <div className={styles.workspaceHeader}>
        <h3 className={styles.moduleName} title={name}>{name}</h3>
        {professor && professor !== 'Unknown' && professor !== 'Inconnu' && professor !== 'غير معروف' && (
          <p className={styles.moduleProfessor}>👨‍🏫 {professor}</p>
        )}
        {activeModule.desc && (() => {
          const descText = t(activeModule.desc);
          const learnedLabel = t('CRMEF_SEMESTERS.learned');
          return descText ? (
            <p className={styles.moduleDesc}>
              <span className={styles.moduleDescLabel}>💡 {learnedLabel}:</span>
              {descText}
            </p>
          ) : null;
        })()}
      </div>

      <div className={styles.workspaceGroups}>
        <FileGroupSection icon="👤" label={t('CRMEF_SEMESTERS.files.solo') || 'Solo Work'} files={activeModule.files?.solo} renderFileCard={renderFileCard} />
        <FileGroupSection icon="👥" label={t('CRMEF_SEMESTERS.files.group') || 'Group Projects'} files={activeModule.files?.group} renderFileCard={renderFileCard} />
        <FileGroupSection icon="📜" label={t('CRMEF_SEMESTERS.files.official') || 'Official Resources'} files={activeModule.files?.official} renderFileCard={renderFileCard} />
      </div>

      {(activeModule.learned || activeModule.lacks) && (
        <div className={styles.moduleReflections}>
          {activeModule.learned && (
            <div className={styles.moduleLearned}>
              <span className={styles.moduleLearnedLabel}>✅ {t('CRMEF_SEMESTERS.learned')}:</span>
              {t(`DATA.semestersLearned.${semester.id}.${activeModule.id}.learned`) || activeModule.learned}
            </div>
          )}
          {activeModule.lacks && (
            <div className={styles.moduleLacks}>
              <span className={styles.moduleLacksLabel}>❌ {t('CRMEF_SEMESTERS.lacks')}:</span>
              {t(`DATA.semestersLearned.${semester.id}.${activeModule.id}.lacks`) || activeModule.lacks}
            </div>
          )}
        </div>
      )}

      {!hasFiles && (
        <div className={styles.emptyCardFiles}>
          <p className={styles.noFiles}>📭 {t('CRMEF_SEMESTERS.files.noFiles')}</p>
        </div>
      )}
    </div>
  );
};

const CrmefSemesterPage = ({ semesterId }) => {
  const { t } = useSettings();

  const semesters = semesterId
    ? crmefSemesters.filter(s => s.id === semesterId)
    : crmefSemesters;

  const [activeModuleIds, setActiveModuleIds] = useState(() =>
    Object.fromEntries(
      semesters.map(s => [s.id, s.modules[0]?.id || ''])
    )
  );

  const handleFilterSelect = (semId, moduleId) => {
    window.dispatchEvent(new CustomEvent('close-all-pdfs'));
    setActiveModuleIds(prev => ({ ...prev, [semId]: moduleId }));
  };

  return (
    <>
      {semesters.map(semester => {
        const activeModuleId = activeModuleIds[semester.id] || semester.modules[0]?.id || '';
        const activeModule = semester.modules.find(m => m.id === activeModuleId);

        return (
          <CSection key={semester.id} id={semester.id} variant="crmef" title={t(semester.title)} className={styles.section}>
            <div className={styles.badgeTabWrapper}>
              <div className={`${styles.badgeTabRow} flex space-x-2 overflow-x-auto no-scrollbar`}>
                {semester.modules.map(m => {
                  const isActive = activeModuleId === m.id;
                  const moduleName = t(m.name);
                  const shortName = moduleName.length > 28 ? moduleName.slice(0, 26) + '...' : moduleName;

                  return (
                    <button key={m.id} type="button" onClick={() => handleFilterSelect(semester.id, m.id)} className={`${styles.badgeTabItem} ${isActive ? styles.badgeTabActive : ''}`} title={moduleName}>
                      {shortName}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeModule && <ModuleWorkspace activeModule={activeModule} semester={semester} t={t} />}
          </CSection>
        );
      })}
    </>
  );
};

export default CrmefSemesterPage;
