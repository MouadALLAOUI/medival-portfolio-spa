import CSection from '../../../templates/Section';
import { crmefExperience } from '../../../data/crmef.data';
import styles from './CrmefExperienceSection.module.scss';

const CrmefExperienceSection = () => (
  <CSection variant="crmef" id="experience" title="Expérience Professionnelle" className={styles.section}>
    <div className={styles.timeline}>
      {crmefExperience.map(exp => (
        <div key={exp.id} className={styles.timelineItem}>
          <span className={styles.expPeriod}>{exp.period}</span>
          <h4 className={styles.expTitle}>{exp.title}</h4>
          <p className={styles.expDesc}>{exp.description}</p>
        </div>
      ))}
    </div>
  </CSection>
);

export default CrmefExperienceSection;
