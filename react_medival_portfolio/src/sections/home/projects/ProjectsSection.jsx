import { useState } from 'react';
import CSection from "../../../templates/Section";
import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import projects from '../../../data/projects';
import { useSettings } from '../../../lib/useSettings';
import { useImageViewer } from '../../../lib/useImageViewer';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import getColorForTag from '../../../lib/getColorForTag';

function ProjectsSection() {
  const { t } = useSettings();
  const { openImage } = useImageViewer();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(selectedProject?.id === project.id ? null : project);
  };

  const handleImageClick = (img) => {
    openImage(img.src, img.alt);
  };

  return (
    <CSection id="projects" title={t('home.projects.title')} subtitle={t('home.projects.subtitle')}>
      <div className="projects-grid">
        {projects.map((project) => (
          <DynamicCard
            key={project.id}
            item={{
              ...project,
              thumbnail: project.overview?.thumbnail
            }}
            config={PRESETS.PROJECT}
            onClick={() => handleCardClick(project)}
          />
        ))}
      </div>

      {/* Project Detail Panel */}
      {selectedProject && (
        <div className="project-detail-panel" onClick={() => setSelectedProject(null)}>
          <div className="detail-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            <div className="detail-header">
              <img
                src={selectedProject.overview.thumbnail}
                alt={selectedProject.title}
                className="detail-thumbnail"
              />
              <h3 className="detail-title">{selectedProject.title}</h3>
              <div className="detail-tags">
                {selectedProject.tags.map(tag => (
                  <span
                    key={tag}
                    className="tech-item"
                    style={{ borderColor: getColorForTag(tag), color: getColorForTag(tag) }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-body">
              <p className="detail-intro" dangerouslySetInnerHTML={{ __html: selectedProject.overview.intro }} />

              {selectedProject.overview.desc && (
                <div
                  className="detail-description prose"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(selectedProject.overview.desc) }}
                />
              )}

              {selectedProject.overview.features && (
                <div className="detail-features">
                  <h4>{t('home.projects.features')}</h4>
                  <ul>
                    {selectedProject.overview.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.overview.imgs && (
                <div className="detail-gallery">
                  <h4>{t('home.projects.gallery')}</h4>
                  <div className="gallery-grid">
                    {selectedProject.overview.imgs.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.src}
                        alt={img.alt}
                        className={`gallery-img ${img.isBlur ? 'blured' : ''}`}
                        onClick={() => handleImageClick(img)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-meta">
                {selectedProject.overview.startdate && (
                  <p><strong>{t('home.projects.started')}:</strong> {selectedProject.overview.startdate}</p>
                )}
                {selectedProject.overview.enddate && (
                  <p><strong>{t('home.projects.completed')}:</strong> {selectedProject.overview.enddate}</p>
                )}
                {selectedProject.overview.status && (
                  <p><strong>{t('home.projects.status')}:</strong> {selectedProject.overview.status}</p>
                )}
              </div>

              {selectedProject.overview.link && (
                <div className="detail-links">
                  {Array.isArray(selectedProject.overview.link)
                    ? selectedProject.overview.link.map((link, idx) => (
                      !link.isDisabled && (
                        <a
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="detail-link-btn"
                        >
                          <span className="link-icon">{link.icon}</span>
                          <span>{link.label}</span>
                        </a>
                      )
                    ))
                    : !selectedProject.overview.link.isDisabled && (
                      <a
                        href={selectedProject.overview.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link-btn"
                      >
                        <span className="link-icon">{selectedProject.overview.link.icon}</span>
                        <span>{selectedProject.overview.link.label || t('common.view')}</span>
                      </a>
                    )
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CSection>
  );
}

export default ProjectsSection;