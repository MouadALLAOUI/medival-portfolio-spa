import { useState, useEffect, useMemo, useCallback } from 'react';
import projects from '../../../data/projects';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import getColorForTag from '../../../lib/getColorForTag';
import { useImageViewer } from '../../../lib/useImageViewer';
import { useSettings } from '../../../lib/useSettings';
import styles from './ProjectsSection.module.scss';
import CSection from '../../../templates/Section';

const getProjectDuration = (startDateStr, endDateStr, lang) => {
  if (!startDateStr) return '';
  const isFr = lang === 'fr';
  if (!endDateStr || endDateStr.toLowerCase() === 'ongoing') {
    return isFr ? 'En cours' : 'Ongoing';
  }

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return '';
  }

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays === 1) {
    return isFr ? '1 jour' : '1 day';
  }

  if (diffDays < 30) {
    return isFr ? `${diffDays} jours` : `${diffDays} days`;
  }

  const diffMonths = Math.round(diffDays / 30.44);
  if (diffMonths === 1) {
    return isFr ? '1 mois' : '1 month';
  }
  return isFr ? `${diffMonths} mois` : `${diffMonths} months`;
};

const ProjectsSection = () => {
  const { openImage } = useImageViewer();
  const { t, language } = useSettings();
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) || null,
    [activeProjectId]
  );

  const toggleProject = useCallback((project) => {
    setActiveProjectId((prev) => (prev === project.id ? null : project.id));
  }, []);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [activeProjectId]);

  useEffect(() => {
    if (!activeProject || !activeProject.overview.imgs || activeProject.overview.imgs.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % activeProject.overview.imgs.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeProject, activeProjectId]);

  return (
    <CSection id="projects" title={t('HOME.PROJECTS.title')} subtitle={<>{t('HOME.PROJECTS.subtitle')}<code>{t('HOME.PROJECTS.introNote')}</code></>} classname="projects">
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
                  <a href={project.link.link} target="_blank" rel="noopener noreferrer" className={styles['project-link']} onClick={(e) => e.stopPropagation()}>
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
                <img src={activeProject.overview.thumbnail || 'https://placehold.co/4000x2000'} alt={activeProject.title} loading="lazy" />
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
                  <h3>{t('HOME.PROJECTS.intro')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: activeProject.overview.intro }} />
                </>
              )}

              {activeProject.overview.desc && (
                <>
                  <h3>{t('HOME.SKILLS.detailsTitle')}</h3>
                  <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(activeProject.overview.desc) }} />
                </>
              )}

              {activeProject.overview.features?.length > 0 && (
                <>
                  <h3>{t('HOME.PROJECTS.features')}</h3>
                  <ul>
                    {activeProject.overview.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeProject.overview.imgs?.length > 0 && (
                <div className={styles['carousel-section']}>
                  <h3>{t('HOME.PROJECTS.gallery')}</h3>
                  <div className={styles['carousel-wrapper']}>
                    <div className={styles['carousel-viewport']}>
                      {activeProject.overview.imgs.map((img, index) => (
                        <div
                          key={`${img.src}-${index}`}
                          className={`${styles['carousel-slide']} ${index === activeImgIndex ? styles['active'] : ''} ${img.isBlur ? styles['blured'] : ''}`}
                          onClick={() => openImage(img.src, img.alt || activeProject.title)}
                        >
                          <img src={img.src} alt={img.alt || activeProject.title} loading="lazy" />
                          {img.alt && <span className={styles['carousel-caption']}>{img.alt}</span>}
                        </div>
                      ))}

                      {activeProject.overview.imgs.length > 1 && (
                        <>
                          <button
                            type="button"
                            className={`${styles['carousel-arrow']} ${styles['prev']}`}
                            onClick={(e) => { e.stopPropagation(); setActiveImgIndex(prev => (prev - 1 + activeProject.overview.imgs.length) % activeProject.overview.imgs.length); }}
                            aria-label="Previous slide"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            className={`${styles['carousel-arrow']} ${styles['next']}`}
                            onClick={(e) => { e.stopPropagation(); setActiveImgIndex(prev => (prev + 1) % activeProject.overview.imgs.length); }}
                            aria-label="Next slide"
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {activeProject.overview.imgs.length > 1 && (
                      <div className={styles['carousel-dots']}>
                        {activeProject.overview.imgs.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`${styles['carousel-dot']} ${index === activeImgIndex ? styles['active'] : ''}`}
                            onClick={(e) => { e.stopPropagation(); setActiveImgIndex(index); }}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeProject.overview.link?.length > 0 && (
                <>
                  <h3>{t('HOME.PROJECTS.links')}</h3>
                  <div className={styles['overview-links']}>
                    {activeProject.overview.link.map((link, index) =>
                      link.isDisabled ? (
                        <span key={index} className={`${styles['overview-link']} ${styles['disabled']}`}>
                          <span>{link.icon}</span>
                          {link.label}
                        </span>
                      ) : (
                        <a key={index} href={link.href || '#'} target="_blank" rel="noopener noreferrer" className={styles['overview-link']}>
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
                  {activeProject.overview.startdate || t('HOME.PROJECTS.unknown')} |{' '}
                  {activeProject.overview.enddate || activeProject.overview.status || t('HOME.PROJECTS.unknown')}
                  {activeProject.overview.startdate && (
                    <span className={styles['duration-tag']}>
                      ⏱️ {getProjectDuration(activeProject.overview.startdate, activeProject.overview.enddate, language)}
                    </span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </CSection>
  );
};

export default ProjectsSection;
