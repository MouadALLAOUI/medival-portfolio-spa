import CrmefProfileSection from './CrmefProfileSection';
import CrmefEducationSection from './CrmefEducationSection';
import CrmefExperienceSection from './CrmefExperienceSection';
import CrmefSportsSection from './CrmefSportsSection';
import styles from './CrmefAccueilPage.module.scss';

const CrmefAccueilPage = () => {
  return (
    <div className={styles.accueilContainer}>
      <CrmefProfileSection />
      <CrmefEducationSection />
      <CrmefExperienceSection />
      <CrmefSportsSection />
    </div>
  );
};

export default CrmefAccueilPage;
