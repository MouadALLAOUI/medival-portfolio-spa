import { getAssetById } from '../../../data/mediaManager';
import { useState, useEffect, useMemo, useCallback } from 'react';
import projectsMetadata from '../../../data/projects';
import { projects as projectsData } from '../../../data/projects.data';
import getColorForTag from '../../../lib/getColorForTag';
import { useSettings } from '../../../lib/useSettings';
import { useAchievements } from '../../../lib/useAchievements';
import styles from './ProjectsSection.module.scss';
import CSection from '../../../templates/Section';
import FilterBar from '../../../components/sections/skills/FilterBar';
import ProjectOverview from './ProjectOverview';

const projects = projectsMetadata.map(meta => {
  const data = projectsData.find(d => d.id === meta.id);
  return { ...meta, overview: data?.overview || {} };
});

const ProjectsSection = () => {
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => { unlockAchievement('visited_projects'); }, [unlockAchievement]);

  const allTags = useMemo(() => {
    const tags = new Set(['All']);
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).map(tag => ({ key: tag, label: tag }));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter(p => p.tags.includes(activeTag));
  }, [activeTag]);

  const activeProject = useMemo(() => projects.find((project) => project.id === activeProjectId) || null, [activeProjectId]);

  const toggleProject = useCallback((project) => {
    setActiveProjectId((prev) => (prev === project.id ? null : project.id));
  }, []);

  return (
    <CSection id="projects" title={t('HOME.PROJECTS.title')} subtitle={<>{t('HOME.PROJECTS.subtitle')}<code>{t('HOME.PROJECTS.introNote')}</code></>} classname="projects">
      <div className={styles['projects-template']}>
        <div className={styles['filter-wrapper']}>
          <FilterBar filters={allTags} activeFilter={activeTag} onFilterChange={setActiveTag} />
        </div>

        <div className={styles['projects-content-wrapper']}>
          <div className={`${styles['projects-container']} ${activeProject ? styles['active'] : ''}`}>
            <div className={styles['project-cards-container']}>
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`${styles['project-card']} ${activeProjectId === project.id ? styles['active-card'] : ''} ${project.isBlur ? styles['blured'] : ''}`}
                  onClick={() => toggleProject(project)}
                  style={{ '--bg-img': `url(${project.overview.thumbnail || getAssetById('download').path})` }}
                >
                  <div className={styles['card-content']}>
                    <h3 className={styles['project-title']}>{t(`DATA.projects.${project.id}.title`) || project.title}</h3>
                    {(project.status || project.overview?.status) && (
                      <span className={`${styles['status-badge']} ${styles[(project.status || project.overview?.status).toLowerCase().replace(' ', '-')]}`}>
                        {project.status || project.overview?.status}
                      </span>
                    )}
                    <p className={styles['project-description']}>{t(`DATA.projects.${project.id}.desc`) || project.desc}</p>
                    <div className={styles['tech-stack']}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles['tech-item']} style={{ backgroundColor: getColorForTag(tag).bg, color: getColorForTag(tag).color, borderColor: getColorForTag(tag).border }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ProjectOverview project={activeProject} />
        </div>
      </div>
    </CSection>
  );
};

export default ProjectsSection;
