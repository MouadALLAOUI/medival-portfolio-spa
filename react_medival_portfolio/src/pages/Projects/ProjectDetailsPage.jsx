import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import { useTheme } from '../../lib/contexts/ThemeProvider';
import projectsMetadata from '../../data/projects';
import { projects as projectsData } from '../../data/projects.data';
import { useImageViewer } from '../../lib/useImageViewer';
import SpecCard from './SpecCard';
import ProjectNavigator from './ProjectNavigator';
import styles from './ProjectDetailsPage.module.scss';

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
  const { t } = useSettings();
  const { theme } = useTheme();
  const { openImage } = useImageViewer();

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundCard}>
          <h2>📜 {t('projects.notFoundTitle') || 'Quest Registry Missing'}</h2>
          <p>{t('projects.notFoundText') || 'This chronicle has not been penned yet or was lost in the archives.'}</p>
          <Link to="/projects" className={styles.backBtn}><ArrowLeft size={16} /><span>{t('projects.backToProjects') || 'Return to Quests'}</span></Link>
        </div>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  const categoryLabels = {
    web: t('projects.categories.web') || 'Web Citadels',
    app: t('projects.categories.app') || 'Mobile & Desktop Relics',
    tool: t('projects.categories.tool') || 'Alchemical Tools',
  };

  return (
    <div className={styles.pageContainer} data-theme-context={theme}>
      <div className={styles.topNav}>
        <Link to="/projects" className={styles.backLink}><ArrowLeft size={16} /><span>{t('projects.backToProjects') || 'Back to Quests'}</span></Link>
      </div>

      <div className={styles.layoutGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            {project.image ? (
              <div className={styles.imageWrapper} onClick={() => openImage(project.image, project.title)}>
                <img src={project.image} alt={t(`DATA.projects.${project.id}.title`) || project.title} className={styles.image} />
                <div className={styles.imageOverlay}><span>🔍 {t('projects.clickToEnlarge') || 'Inspect Relic'}</span></div>
              </div>
            ) : (
              <div className={styles.imagePlaceholder}><span>🔮</span></div>
            )}
            {project.featured && (
              <div className={styles.featuredBadge}><Trophy size={14} /><span>{t('projects.featuredQuest') || 'Featured Quest'}</span></div>
            )}
          </div>

          <div className={styles.headerBlock}>
            <div className={styles.categoryBadge}>{categoryLabels[project.category] || project.category}</div>
            <h1 className={styles.title}>{t(`DATA.projects.${project.id}.title`) || project.title}</h1>
            <div className={styles.yearRow}><Calendar size={16} /><span>{t('projects.questYear') || 'Penciled in'} {project.year}</span></div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <SpecCard project={project} />
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

      <ProjectNavigator prevProject={prevProject} nextProject={nextProject} />
    </div>
  );
}
