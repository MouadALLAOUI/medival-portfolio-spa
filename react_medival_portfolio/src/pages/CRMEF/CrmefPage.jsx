import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CrmefLayout from '../../layouts/CrmefLayout';
import CrmefAccueilPage from './sections/CrmefAccueilPage';
import CrmefSemesterPage from './sections/CrmefSemesterPage';
import CrmefMspPage from './sections/CrmefMspPage';
import { useAchievements } from '../../lib/useAchievements';
import styles from './CrmefPage.module.scss';

const PAGES = {
  home: <CrmefAccueilPage />,
  semester: <CrmefSemesterPage />,
  msp: <CrmefMspPage />,
};

const CrmefPage = () => {
  const { hash } = useLocation();
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('visited_crmef');
  }, [unlockAchievement]);

  const activePage =
    hash === '#semestre1' ? 'semester' :
    hash === '#msp' ? 'msp' :
    'home';

  return (
    <CrmefLayout>
      <div className={styles.pageContainer}>
        {PAGES[activePage]}
      </div>
    </CrmefLayout>
  );
};

export default CrmefPage;
