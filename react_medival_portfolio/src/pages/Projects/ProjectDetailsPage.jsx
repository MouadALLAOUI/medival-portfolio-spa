import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github, ExternalLink, Trophy, Calendar, Sparkles, Code, Layout, ShieldCheck, Box, Hourglass } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import { useTheme } from '../../lib/contexts/ThemeProvider';
import projectsMetadata from '../../data/projects';
import { projects as projectsData } from '../../data/projects.data';
import { useAlerts } from '../../lib/useAlerts';
import { useImageViewer } from '../../lib/useImageViewer';
import styles from './ProjectDetailsPage.module.scss';

// Merge metadata with overview data
const projects = projectsMetadata.map(meta => {
  const data = projectsData.find(d => d.id === meta.id);
  return {
    ...meta,
    description: meta.desc,
    overview: data?.overview || {},
    image: data?.overview?.thumbnail || '',
    status: data?.overview?.status || 'unknown',
    category: meta.tags?.[0]?.toLowerCase() || 'web',
    featured: false,
    year: new Date().getFullYear(),
    codeUrl: meta.link?.link || '',
    liveUrl: '',
    longDescription: data?.overview?.intro || meta.desc
  };
});

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useSettings();
  const { theme } = useTheme();
  const { showAlert } = useAlerts();
  const { openImage } = useImageViewer();

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundCard}>
          <h2>📜 {t('projects.notFoundTitle') || 'Quest Registry Missing'}</h2>
          <p>{t('projects.notFoundText') || 'This chronicle has not been penned yet or was lost in the archives.'}</p>
          <Link to="/projects" className={styles.backBtn}>
            <ArrowLeft size={16} />
            <span>{t('projects.backToProjects') || 'Return to Quests'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  const statusEmojis = {
    completed: '✅',
    'in-progress': '⚡',
    archived: '📦',
  };

  const statusIcons = {
    completed: <ShieldCheck className={styles.statusIcon} size={18} />,
    'in-progress': <Hourglass className={styles.statusIcon} size={18} />,
    archived: <Box className={styles.statusIcon} size={18} />,
  };

  const categoryLabels = {
    web: t('projects.categories.web') || 'Web Citadels',
    app: t('projects.categories.app') || 'Mobile & Desktop Relics',
    tool: t('projects.categories.tool') || 'Alchemical Tools',
  };

  const handleImageClick = () => {
    if (project.image) {
      openImage(project.image, project.title);
    }
  };

  return (
    <div className={styles.pageContainer} data-theme-context={theme}>
      {/* Back button */}
      <div className={styles.topNav}>
        <Link to="/projects" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>{t('projects.backToProjects') || 'Back to Quests'}</span>
        </Link>
      </div>

      <div className={styles.layoutGrid}>
        {/* Left Column: Visual Cover & Main Info */}
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            {project.image ? (
              <div className={styles.imageWrapper} onClick={handleImageClick}>
                  <img
                    src={project.image}
                    alt={t(`DATA.projects.${project.id}.title`) || project.title}
                    className={styles.image}
                  />
                <div className={styles.imageOverlay}>
                  <span>🔍 {t('projects.clickToEnlarge') || 'Inspect Relic'}</span>
                </div>
              </div>
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>🔮</span>
              </div>
            )}
            
            {project.featured && (
              <div className={styles.featuredBadge}>
                <Trophy size={14} />
                <span>{t('projects.featuredQuest') || 'Featured Quest'}</span>
              </div>
            )}
          </div>

          <div className={styles.headerBlock}>
            <div className={styles.categoryBadge}>
              {categoryLabels[project.category] || project.category}
            </div>
            <h1 className={styles.title}>{t(`DATA.projects.${project.id}.title`) || project.title}</h1>
            <div className={styles.yearRow}>
              <Calendar size={16} />
              <span>{t('projects.questYear') || 'Penciled in'} {project.year}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spec Sheet & Quest Overview */}
        <div className={styles.rightColumn}>
          {/* Metadata Grimoire Card */}
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

            {/* Relics Panel (Tags) */}
            <div className={styles.tagsPanel}>
              <span className={styles.panelTitle}>⚡ {t('projects.relics') || 'Enchanted Relics'}</span>
              <div className={styles.tagsContainer}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tagBadge}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className={styles.actionRow}>
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <Github size={18} />
                  <span>{t('projects.viewCode') || 'Forge Code'}</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionBtn} ${styles.liveBtn}`}
                >
                  <ExternalLink size={18} />
                  <span>{t('projects.liveDemo') || 'Cast Live Demo'}</span>
                </a>
              )}
            </div>
          </div>

          {/* Grimoire Details / Parchment Section */}
          <div className={styles.overviewCard}>
            <h3 className={styles.cardTitle}>🛡️ {t('projects.questOverview') || 'Quest Overview'}</h3>
            <div className={styles.descriptionText}>
              <p className={styles.intro}>{t(`DATA.projects.${project.id}.desc`) || project.description}</p>
              {project.longDescription && (
                <>
                  <div className={styles.divider} />
                  <h4 className={styles.subTitle}>📖 {t('projects.detailedChronicle') || 'Detailed Chronicle'}</h4>
                  <p className={styles.detailed}>{project.longDescription}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom quest navigator */}
      <footer className={styles.bottomNav}>
        <div className={styles.bottomNavContainer}>
          <Link
            to={`/projects/${prevProject.id}`}
            className={styles.navBtn}
            title={prevProject.title}
          >
            <ArrowLeft size={16} />
            <div className={styles.navBtnText}>
              <span className={styles.navLabel}>{t('projects.prevQuest') || 'Previous Quest'}</span>
              <span className={styles.navTitle}>{prevProject.title}</span>
            </div>
          </Link>

          <Link to="/projects" className={styles.centerLink}>
            <span>🏰 {t('projects.allQuests') || 'All Quests'}</span>
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className={`${styles.navBtn} ${styles.navBtnRight}`}
            title={nextProject.title}
          >
            <div className={styles.navBtnText}>
              <span className={styles.navLabel}>{t('projects.nextQuest') || 'Next Quest'}</span>
              <span className={styles.navTitle}>{nextProject.title}</span>
            </div>
            <ArrowRight size={16} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
