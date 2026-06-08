import { createPortal } from 'react-dom';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import { useTheme } from '../../../lib/contexts/ThemeProvider';
import { getMarkdownThemeClass } from '../../../lib/markdown/markdownThemes';
import { useImageViewer } from '../../../lib/useImageViewer';
import { useSettings } from '../../../lib/useSettings';
import styles from './skillsSection.module.scss';

export default function SkillDetailModal({ skill, onClose }) {
  const { openImage } = useImageViewer();
  const { t } = useSettings();
  const { theme } = useTheme();
  const mdThemeClass = getMarkdownThemeClass(theme);

  if (!skill) return null;

  return createPortal(
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-grimoire']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['modal-close-btn']} onClick={onClose} aria-label="Close Codex">×</button>
        <div className={styles['modal-content']}>
          <div className={styles['modal-header']}>
            <div className={styles['modal-icon-title']}>
              <span className={styles['modal-icon']}>{skill.icon}</span>
              <h2 className={styles['modal-title']}>{skill.name}</h2>
            </div>
            <div className={styles['modal-proficiency']} title={t('HOME.SKILLS.level', { level: skill.level })}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className={`${styles['star']} ${idx < skill.level ? '' : styles['empty']}`}>★</span>
              ))}
              <div className={styles['modal-tooltip']}>
                <span className={styles['modal-tooltip-title']}>
                  {t(`HOME.SKILLS.levelName.${skill.level}`) || `Level ${skill.level}`}
                </span>
                <p className={styles['modal-tooltip-desc']}>{t(`HOME.SKILLS.levelDesc.${skill.level}`)}</p>
              </div>
            </div>
          </div>

          <div className={styles['modal-body']}>
            {skill.overview?.thumbnail && (
              <div className={styles['modal-thumbnail']}>
                <img src={skill.overview.thumbnail} alt={`${skill.name} thumbnail`} loading="lazy" />
              </div>
            )}
            {skill.overview?.intro && (
              <p className={styles['modal-intro']} dangerouslySetInnerHTML={{ __html: skill.overview.intro }} />
            )}
            {skill.overview?.desc && (
              <div className={styles['modal-details']}>
                <h3>{t('HOME.SKILLS.detailsTitle')}</h3>
                <div className={`markdown-content ${mdThemeClass}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(skill.overview.desc) }} />
              </div>
            )}
            {skill.overview?.features?.length > 0 && (
              <div className={styles['modal-features']}>
                <h3>{t('HOME.SKILLS.features') || 'Features'}</h3>
                <ul>{skill.overview.features.map((feature, idx) => <li key={idx} data-key={idx}>{feature}</li>)}</ul>
              </div>
            )}
            {skill.overview?.imgs?.length > 0 && (
              <div className={styles['modal-gallery']}>
                <h3>{t('HOME.SKILLS.gallery') || 'Gallery'}</h3>
                <div className={styles['imgs-gal']}>
                  {skill.overview.imgs.map((img, idx) => (
                    <div key={idx} className={`${styles['gal-item']} ${img.isBlured ? styles['blured'] : ''}`} data-key={`item-${idx}`} onClick={() => openImage(img.src, img.alt || skill.name)}>
                      <img src={img.src} alt={img.alt || skill.name} loading="lazy" className={img.isMobile ? styles['mobile-img'] : ''} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {skill.overview?.storyBehindIt && (
              <div className={styles['modal-story']}>
                <h3>{t('HOME.SKILLS.storyBehindIt') || 'Track Story Behind It'}</h3>
                <div className={`markdown-content ${mdThemeClass}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(skill.overview.storyBehindIt) }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
