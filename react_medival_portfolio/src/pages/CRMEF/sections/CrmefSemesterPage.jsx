import CSection from '../../../templates/Section';
import PdfViewer from '../../../components/PdfViewer/PdfViewer';
import { crmefSemesters } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefSemesterPage.module.scss';

const CrmefSemesterPage = () => {
  const { t } = useSettings();

  const getTranslatedSemester = (semester) => {
    const titleKey = `CRMEF.semester.title`;
    const resolvedTitle = t(titleKey);
    return {
      ...semester,
      title: resolvedTitle !== titleKey ? resolvedTitle : semester.title,
    };
  };

  const getTranslatedModuleName = (module) => {
    const key = `CRMEF.semester.modules.${module.id}`;
    const resolved = t(key);
    return resolved !== key ? resolved : module.name;
  };

  return (
    <>
      {crmefSemesters.map(semester => {
        const tSemester = getTranslatedSemester(semester);
        return (
          <CSection
            key={tSemester.id}
            variant="crmef"
            id={tSemester.id}
            title={tSemester.title}
            className={styles.section}
          >
            <div className={styles.modulesList}>
              {tSemester.modules.map(module => {
                const tName = getTranslatedModuleName(module);
                return (
                  <div key={module.id} className={styles.moduleItem}>
                    <h3 className={styles.moduleName}>{tName}</h3>
                    <PdfViewer file={module.pdfFile} label={tName} />
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
