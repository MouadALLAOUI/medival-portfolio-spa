import { Github, ExternalLink, Trophy, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../lib/useSettings';
import styles from './ProjectCard.module.scss';

export default function ProjectCard({ project, featured = false }) {
  const { t } = useSettings();

  const statusEmojis = {
    completed: '✅',
    'in-progress': '⚡',
    archived: '📦',
  };

  const statusLabel = t(`projects.status.${project.status}`) || project.status;

  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {project.image && (
        <div className={styles.imageWrapper}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
            loading="lazy"
          />
          {featured && (
            <div className={styles.featuredBadge}>
              <Trophy size={12} />
              <span>Featured Quest</span>
            </div>
          )}
          <span className={`${styles.statusBadge} ${styles[project.status]}`}>
            {statusEmojis[project.status] || '🔮'} {statusLabel}
          </span>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.year}>{project.year}</span>
          <h3 className={styles.title}>{project.title}</h3>
        </div>

        <p className={styles.description}>
          {featured ? project.longDescription : project.description}
        </p>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <Link
            to={`/projects/${project.id}`}
            className={styles.actionBtn}
            title={t('projects.readMore') || 'Read About'}
          >
            <BookOpen size={16} />
            <span>{t('projects.readMore') || 'Read About'}</span>
          </Link>
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
              title={t('projects.viewCode')}
            >
              <Github size={16} />
              <span>{t('projects.viewCode') || 'Code'}</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.liveBtn}`}
              title={t('projects.liveDemo')}
            >
              <ExternalLink size={16} />
              <span>{t('projects.liveDemo') || 'Live Demo'}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
