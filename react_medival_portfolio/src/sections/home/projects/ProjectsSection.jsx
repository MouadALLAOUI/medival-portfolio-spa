import { useState } from 'react';
import projects from '../../../data/projects';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import getColorForTag from '../../../lib/getColorForTag';
import { useImageViewer } from '../../../lib/useImageViewer';
import styles from './ProjectsSection.module.scss';
import CSection from '../../../templates/Section';

const ProjectsSection = () => {
  const { openImage } = useImageViewer();
  const [activeProjectId, setActiveProjectId] = useState(null);

  const activeProject = projects.find((project) => project.id === activeProjectId) || null;

  const toggleProject = (project) => {
    setActiveProjectId((prev) => (prev === project.id ? null : project.id));
  };

  return (
    <CSection id="projects" title="Tech Quests" className="section" classname="section">
      <div className="parchment visible" id="projects-parch">
        <div>
          <h2 className="section-title">Tech Quests</h2>
          <p className="section-intro">
            Journeys undertaken and artifacts forged through mystical coding rituals:
            <code>click card bellow for more details</code>
          </p>
        </div>

        <div className={styles['projects-template']}>
          <div className={`${styles['projects-container']} ${activeProject ? styles['active'] : ''}`}>
            <div className={styles['project-cards-container']}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={styles['project-card']}
                  id={`project-${project.id}`}
                  onClick={() => toggleProject(project)}
                  style={{ '--bg-img': `url(${project.overview?.thumbnail ? project.overview.thumbnail : '/assets/download.png'})` }}
                >
                  <h3 className={styles['project-title']}>{project.title}</h3>
                  <p className={styles['project-description']} dangerouslySetInnerHTML={{ __html: project.desc }} />
                  <div className={styles['tech-stack']}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={styles['tech-item']}
                        style={{
                          backgroundColor: getColorForTag(tag).bg,
                          color: getColorForTag(tag).color,
                          borderColor: getColorForTag(tag).border,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && !Array.isArray(project.link) && (
                    <a href={project.link.link} target="_blank" rel="noreferrer" className={styles['project-link']} onClick={(e) => e.stopPropagation()}>
                      <span className={styles['project-link-icon']}>{project.link.icon}</span>
                      {project.link.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles['projects-overview']} ${activeProject ? `${styles['active']} item-${activeProject.id}` : ''}`}>
            {activeProject && (
              <>
                <h1 className={styles['title']}>{activeProject.title}</h1>

                <div className={styles['thumbnail']}>
                  <img src={activeProject.overview.thumbnail || 'https://placehold.co/4000x2000'} alt={activeProject.title} />
                </div>

                <div className={styles['tech-stack']}>
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles['tech-item']}
                      style={{
                        backgroundColor: getColorForTag(tag).bg,
                        color: getColorForTag(tag).color,
                        borderColor: getColorForTag(tag).border,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {activeProject.overview.intro && (
                  <>
                    <h3>Intro</h3>
                    <p dangerouslySetInnerHTML={{ __html: activeProject.overview.intro }} />
                  </>
                )}

                {activeProject.overview.desc && (
                  <>
                    <h3>Detailed description</h3>
                    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(activeProject.overview.desc) }} />
                  </>
                )}

                {activeProject.overview.features?.length > 0 && (
                  <>
                    <h3>Features</h3>
                    <ul>
                      {activeProject.overview.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activeProject.overview.imgs?.length > 0 && (
                  <>
                    <h3>Gallery</h3>
                    <div className={styles['imgs-gal']}>
                      {activeProject.overview.imgs.map((img, index) => (
                        <div
                          key={`${img.src}-${index}`}
                          className={`${styles['gal-item']} ${img.isBlur ? styles['blured'] : ''}`}
                          onClick={() => openImage(img.src, img.alt || activeProject.title)}
                        >
                          <img src={img.src} alt={img.alt || activeProject.title} />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeProject.overview.link?.length > 0 && (
                  <>
                    <h3>links</h3>
                    <div className={styles['overview-links']}>
                      {activeProject.overview.link.map((link, index) =>
                        link.isDisabled ? (
                          <span key={index} className={`${styles['overview-link']} ${styles['disabled']}`}>
                            <span>{link.icon}</span>
                            {link.label}
                          </span>
                        ) : (
                          <a key={index} href={link.href || '#'} target="_blank" rel="noreferrer" className={styles['overview-link']}>
                            <span>{link.icon}</span>
                            {link.label}
                          </a>
                        ),
                      )}
                    </div>
                  </>
                )}

                <div className={styles['timestamp-date']}>
                  <p>
                    {activeProject.overview.startdate || 'unkonwn'} |{' '}
                    {activeProject.overview.enddate || activeProject.overview.status || 'unkonwn'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </CSection>
  );
};

export default ProjectsSection;
