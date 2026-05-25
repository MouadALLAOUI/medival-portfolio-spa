import CSection from '../../../templates/Section';
import PdfViewer from '../../../components/PdfViewer/PdfViewer';
import { crmefSemesters } from '../../../data/crmef.data';
import styles from './CrmefSemesterPage.module.scss';

const CrmefSemesterPage = () => (
  <>
    {crmefSemesters.map(semester => (
      <CSection
        key={semester.id}
        variant="crmef"
        id={semester.id}
        title={semester.title}
        className={styles.section}
      >
        <div className={styles.modulesList}>
          {semester.modules.map(module => (
            <div key={module.id} className={styles.moduleItem}>
              <h3 className={styles.moduleName}>{module.name}</h3>
              <PdfViewer file={module.pdfFile} label={module.name} />
            </div>
          ))}
        </div>
      </CSection>
    ))}
  </>
);

export default CrmefSemesterPage;
