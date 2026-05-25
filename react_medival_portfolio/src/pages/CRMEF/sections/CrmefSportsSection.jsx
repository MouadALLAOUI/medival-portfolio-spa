import CSection from '../../../templates/Section';
import { crmefSports } from '../../../data/crmef.data';
import styles from './CrmefSportsSection.module.scss';

const CrmefSportsSection = () => (
  <CSection variant="crmef" id="sports" title="Sport" className={styles.section}>
    <div className={styles.sportsGrid}>
      {crmefSports.map(sport => (
        <div key={sport.id} className={styles.sportCard}>
          <span className={styles.sportIcon}>{sport.icon}</span>
          <span className={styles.sportLabel}>{sport.label}</span>
        </div>
      ))}
    </div>
  </CSection>
);

export default CrmefSportsSection;
