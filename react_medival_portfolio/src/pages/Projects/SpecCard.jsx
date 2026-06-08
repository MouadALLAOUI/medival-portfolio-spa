import { Github, ExternalLink, ShieldCheck, Hourglass, Box } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import styles from './ProjectDetailsPage.module.scss';

const statusIcons = {
  completed: <ShieldCheck className={styles.statusIcon} size={18} />,
  'in-progress': <Hourglass className={styles.statusIcon} size={18} />,
  archived: <Box className={styles.statusIcon} size={18} />,
};

export default function SpecCard({ project }) {
  const { t } = useSettings();

  const categoryLabels = {
    web: t('projects.categories.web') || 'Web Citadels',
    app: t('projects.categories.app') || 'Mobile & Desktop Relics',
    tool: t('projects.categories.tool') || 'Alchemical Tools',
  };

  return (
    <div className={styles.specCard}>
      <h3 className={styles.cardTitle}>📜 {t('projects.specSheet') || 'Quest Specification'}</h3>
      
      <div className={styles.specRows}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('projects.statusLabel') || 'Quest Status'}</span>
          <span className={`${styles.specValue} ${styles[project.status]}`}>
            {statusIcons[project.status] || '🔮'}
            <span>{t(`projects.status.${project.status}`) || project.status}</span>
          </span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('projects.categoryLabel') || 'Classification'}</span>
          <span className={styles.specValue}>{categoryLabels[project.category] || project.category}</span>
        </div>
      </div>

      <div className={styles.tagsPanel}>
        <span className={styles.panelTitle}>⚡ {t('projects.relics') || 'Enchanted Relics'}</span>
        <div className={styles.tagsContainer}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tagBadge}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.actionRow}>
        {project.codeUrl && (
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
            <Github size={18} />
            <span>{t('projects.viewCode') || 'Forge Code'}</span>
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.liveBtn}`}>
            <ExternalLink size={18} />
            <span>{t('projects.liveDemo') || 'Cast Live Demo'}</span>
          </a>
        )}
      </div>
    </div>
  );
}
