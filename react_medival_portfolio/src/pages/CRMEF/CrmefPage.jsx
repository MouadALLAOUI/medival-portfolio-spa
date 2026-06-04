import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CrmefLayout from '../../layouts/CrmefLayout';
import CrmefAccueilPage from './sections/CrmefAccueilPage';
import CrmefSemesterPage from './sections/CrmefSemesterPage';
import CrmefMspPage from './sections/CrmefMspPage';
import CrmefVideosPage from './sections/CrmefVideosPage';
import CrmefGalleryPage from './sections/CrmefGalleryPage';
import { useAchievements } from '../../lib/useAchievements';
import styles from './CrmefPage.module.scss';

const CrmefPage = () => {
  const { hash } = useLocation();
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('visited_crmef');
  }, [unlockAchievement]);

  const renderPage = () => {
    if (hash === '#semestre1') return <CrmefSemesterPage semesterId="semester-1" />;
    if (hash === '#semestre2') return <CrmefSemesterPage semesterId="semester-2" />;
    if (hash === '#msp')       return <CrmefMspPage />;
    if (hash === '#videos')    return <CrmefVideosPage />;
    if (hash === '#gallery')   return <CrmefGalleryPage />;
    return <CrmefAccueilPage />;
  };

  return (
    <CrmefLayout>
      <div className={styles.pageContainer}>
        {renderPage()}
      </div>
    </CrmefLayout>
  );
};

export default CrmefPage;
