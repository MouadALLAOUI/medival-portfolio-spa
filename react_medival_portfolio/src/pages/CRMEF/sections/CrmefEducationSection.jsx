import CSection from '../../../templates/Section';
import { crmefEducation } from '../../../data/crmef.data';
import styles from './CrmefEducationSection.module.scss';

const CrmefEducationSection = () => (
  <CSection variant="crmef" id="education" title="Éducation" className={styles.section}>
    <div className={styles.educationGrid}>
      {crmefEducation.map(edu => (
        <div key={edu.id} className={styles.eduCard}>
          <h3 className={styles.eduTitle}>{edu.degree || edu.title}</h3>
          <p className={styles.eduInstitution}>{edu.institution}</p>
          <p className={styles.eduLocation}>{edu.location}</p>
          {edu.type && <div className={styles.eduType}>{edu.type}</div>}
        </div>
      ))}
    </div>
  </CSection>
);

export default CrmefEducationSection;
