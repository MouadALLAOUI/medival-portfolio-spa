import { useState, useEffect } from 'react';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import { useTheme } from '../../../lib/contexts/ThemeProvider';
import { getMarkdownThemeClass } from '../../../lib/markdown/markdownThemes';
import getColorForTag from '../../../lib/getColorForTag';
import { useImageViewer } from '../../../lib/useImageViewer';
import { useSettings } from '../../../lib/useSettings';
import LinkPreview from '../../../components/ui/LinkPreview';
import styles from './ProjectsSection.module.scss';

const getProjectDuration = (startDateStr, endDateStr, lang) => {
  if (!startDateStr) return '';
  const isFr = lang === 'fr';
  if (!endDateStr || endDateStr.toLowerCase() === 'ongoing') return isFr ? 'En cours' : 'Ongoing';
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays === 1) return isFr ? '1 jour' : '1 day';
  if (diffDays < 30) return isFr ? `${diffDays} jours` : `${diffDays} days`;
  const diffMonths = Math.round(diffDays / 30.44);
  if (diffMonths === 1) return isFr ? '1 mois' : '1 month';
  return isFr ? `${diffMonths} mois` : `${diffMonths} months`;
};

const ProjectOverview = ({ project }) => {
  const { openImage } = useImageViewer();
  const { t, language } = useSettings();
  const { theme } = useTheme();
  const mdThemeClass = getMarkdownThemeClass(theme);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project?.overview?.imgs || project.overview.imgs.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % project.overview.imgs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [project]);

  if (!project) return null;

  return (
    <div className={`${styles['projects-overview']} ${styles['active']} item-${project.id}`}>
      <h1 className={styles['title']}>{t(`DATA.projects.${project.id}.title`) || project.title}</h1>

      <div className={styles['thumbnail']}>
        <img src={project.overview.thumbnail || 'https://placehold.co/4000x2000'} alt={project.title} loading="lazy" />
      </div>

      <div className={styles['tech-stack']}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles['tech-item']} style={{ backgroundColor: getColorForTag(tag).bg, color: getColorForTag(tag).color, borderColor: getColorForTag(tag).border }}>
            {tag}
          </span>
        ))}
      </div>

      {project.overview.intro && (
        <>
          <h3>{t('HOME.PROJECTS.intro')}</h3>
          <p dangerouslySetInnerHTML={{ __html: project.overview.intro }} />
        </>
      )}

      {project.overview.desc && (
        <>
          <h3>{t('HOME.SKILLS.detailsTitle')}</h3>
          <div className={`markdown-content ${mdThemeClass}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(project.overview.desc) }} />
        </>
      )}

      {project.overview.features?.length > 0 && (
        <>
          <h3>{t('HOME.PROJECTS.features')}</h3>
          <ul>{project.overview.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </>
      )}

      {project.overview.imgs?.length > 0 && (
        <div className={styles['carousel-section']}>
          <h3>{t('HOME.PROJECTS.gallery')}</h3>
          <div className={styles['carousel-wrapper']}>
            <div className={styles['carousel-viewport']}>
              {project.overview.imgs.map((img, index) => (
                <div key={img.src} className={`${styles['carousel-slide']} ${index === activeImgIndex ? styles['active'] : ''} ${img.isBlur ? styles['blured'] : ''}`} onClick={() => openImage(img.src, img.alt || project.title)}>
                  <img src={img.src} alt={img.alt || project.title} loading="lazy" />
                  {img.alt && <span className={styles['carousel-caption']}>{img.alt}</span>}
                </div>
              ))}
              {project.overview.imgs.length > 1 && (
                <>
                  <button type="button" className={`${styles['carousel-arrow']} ${styles['prev']}`} onClick={(e) => { e.stopPropagation(); setActiveImgIndex(prev => (prev - 1 + project.overview.imgs.length) % project.overview.imgs.length); }} aria-label="Previous slide">‹</button>
                  <button type="button" className={`${styles['carousel-arrow']} ${styles['next']}`} onClick={(e) => { e.stopPropagation(); setActiveImgIndex(prev => (prev + 1) % project.overview.imgs.length); }} aria-label="Next slide">›</button>
                </>
              )}
            </div>
            {project.overview.imgs.length > 1 && (
              <div className={styles['carousel-dots']}>
                {project.overview.imgs.map((img, index) => (
                  <button key={`dot-${img.src}`} type="button" className={`${styles['carousel-dot']} ${index === activeImgIndex ? styles['active'] : ''}`} onClick={(e) => { e.stopPropagation(); setActiveImgIndex(index); }} aria-label={`Go to slide ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {project.overview.link?.length > 0 && (
        <>
          <h3>{t('HOME.PROJECTS.links')}</h3>
          <div className={styles['overview-links']}>
            {project.overview.link.map((link, index) => {
              const stableKey = link.label || link.href || index;
              return link.isDisabled ? (
                <span key={stableKey} className={`${styles['overview-link']} ${styles['disabled']}`}><span>{link.icon}</span>{link.label}</span>
              ) : (
                <LinkPreview key={stableKey} href={link.href || '#'} icon={link.icon} label={link.label}>
                  <a href={link.href || '#'} target="_blank" rel="noopener noreferrer" className={styles['overview-link']}><span>{link.icon}</span>{link.label}</a>
                </LinkPreview>
              );
            })}
          </div>
        </>
      )}

      <div className={styles['timestamp-date']}>
        <p>
          {project.overview.startdate || t('HOME.PROJECTS.unknown')} |{' '}
          {project.overview.enddate || project.overview.status || t('HOME.PROJECTS.unknown')}
          {project.overview.startdate && (
            <span className={styles['duration-tag']}>⏱️ {getProjectDuration(project.overview.startdate, project.overview.enddate, language)}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProjectOverview;
