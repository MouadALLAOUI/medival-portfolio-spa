import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import styles from './ProjectDetailsPage.module.scss';

export default function ProjectNavigator({ prevProject, nextProject }) {
  const { t } = useSettings();

  return (
    <footer className={styles.bottomNav}>
      <div className={styles.bottomNavContainer}>
        <Link to={`/projects/${prevProject.id}`} className={styles.navBtn} title={prevProject.title}>
          <ArrowLeft size={16} />
          <div className={styles.navBtnText}>
            <span className={styles.navLabel}>{t('projects.prevQuest') || 'Previous Quest'}</span>
            <span className={styles.navTitle}>{prevProject.title}</span>
          </div>
        </Link>

        <Link to="/projects" className={styles.centerLink}>
          <span>🏰 {t('projects.allQuests') || 'All Quests'}</span>
        </Link>

        <Link to={`/projects/${nextProject.id}`} className={`${styles.navBtn} ${styles.navBtnRight}`} title={nextProject.title}>
          <div className={styles.navBtnText}>
            <span className={styles.navLabel}>{t('projects.nextQuest') || 'Next Quest'}</span>
            <span className={styles.navTitle}>{nextProject.title}</span>
          </div>
          <ArrowRight size={16} />
        </Link>
      </div>
    </footer>
  );
}
