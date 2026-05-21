import { useState } from 'react';
import projects from '../../../data/projects';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import getColorForTag from '../../../lib/getColorForTag';
import { useImageViewer } from '../../../lib/useImageViewer';

const ProjectsSection = () => {
  const { openImage } = useImageViewer();
  const [activeProjectId, setActiveProjectId] = useState(null);

  const activeProject = projects.find((project) => project.id === activeProjectId) || null;

  const toggleProject = (project) => {
    setActiveProjectId((prev) => (prev === project.id ? null : project.id));
  };

  return (
    <section id="projects" className="section">
      <div className="parchment visible" id="projects-parch">
        <div>
          <h2 className="section-title">Tech Quests</h2>
          <p className="section-intro">
            Journeys undertaken and artifacts forged through mystical coding rituals:
            <code>click card bellow for more details</code>
          </p>
        </div>

        <div className="projects-template">
          <div className={`projects-container ${activeProject ? 'active' : ''}`}>
            <div className="project-cards-container">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                  id={`project-${project.id}`}
                  onClick={() => toggleProject(project)}
                  style={{ '--bg-img': `url(${project.overview?.thumbnail ? project.overview.thumbnail : '/assets/download.png'})` }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description" dangerouslySetInnerHTML={{ __html: project.desc }} />
                  <div className="tech-stack">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tech-item"
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
                    <a href={project.link.link} target="_blank" rel="noreferrer" className="project-link" onClick={(e) => e.stopPropagation()}>
                      <span className="project-link-icon">{project.link.icon}</span>
                      {project.link.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`projects-overview ${activeProject ? `active item-${activeProject.id}` : ''}`}>
            {activeProject && (
              <>
                <h1 className="title">{activeProject.title}</h1>

                <div className="thumbnail">
                  <img src={activeProject.overview.thumbnail || 'https://placehold.co/4000x2000'} alt={activeProject.title} />
                </div>

                <div className="tech-stack">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-item"
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
                    <div className="imgs-gal">
                      {activeProject.overview.imgs.map((img, index) => (
                        <div
                          key={`${img.src}-${index}`}
                          className={`gal-item ${img.isBlur ? 'blured' : ''}`}
                          data-key={`item-${index}`}
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
                    <div className="overview-links">
                      {activeProject.overview.link.map((link, index) =>
                        link.isDisabled ? (
                          <span key={index} className="overview-link disabled">
                            <span>{link.icon}</span>
                            {link.label}
                          </span>
                        ) : (
                          <a key={index} href={link.href || '#'} target="_blank" rel="noreferrer" className="overview-link">
                            <span>{link.icon}</span>
                            {link.label}
                          </a>
                        ),
                      )}
                    </div>
                  </>
                )}

                <div className="timestamp-date">
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
    </section>
  );
};

export default ProjectsSection;
