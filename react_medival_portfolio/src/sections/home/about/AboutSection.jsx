import { useState } from 'react';
import timelines from '../../../data/timelines';
import { useSettings } from '../../../lib/useSettings';
import styles from './AboutSection.module.scss';
import CSection from '../../../templates/Section';

const AboutSection = () => {
  const { t } = useSettings();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <CSection id="about" title={t('HOME.ABOUT.title')} subtitle={t('HOME.ABOUT.subtitle')} classname="about">
      <div className={styles['timeline-wrapper']}>
        <div className={styles['timeline']}>
          {timelines.map((item) => {
            const isExpanded = expandedId === item.id;
            const itemTitle = t(`HOME.ABOUT.timelines.${item.id}.title`) || item.title;
            const itemDesc = t(`HOME.ABOUT.timelines.${item.id}.desc`) || item.desc;
            const itemDetails = t(`HOME.ABOUT.timelines.${item.id}.detailledDesc`) || item.detailledDesc;

            return (
              <div
                key={item.id}
                className={`${styles['timeline-item']} timeline-item-reveal`}
              >
                <div
                  className={`${styles['timeline-content']} ${isExpanded ? styles['expanded'] : ''}`}
                  onClick={() => toggleExpand(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(item.id); }}
                  aria-expanded={isExpanded}
                  aria-label={`Chronicle of ${item.year}: ${itemTitle}. Click to ${isExpanded ? 'collapse' : 'expand'} details.`}
                >
                  <div className={styles['timeline-year']}>{item.year}</div>
                  <h3 className={styles['timeline-title']}>
                    {itemTitle}
                    <span className={styles['expand-arrow']}>{isExpanded ? ' ▴' : ' ▾'}</span>
                  </h3>
                  <p className={styles['timeline-desc']}>{itemDesc}</p>

                  {isExpanded && (
                    <div className={styles['timeline-details-pane']}>
                      <div className={styles['pane-divider']} />
                      <p className={styles['pane-content']}>{itemDetails}</p>
                    </div>
                  )}

                  <span className={styles['expand-hint']}>
                    {isExpanded ? t('HOME.ABOUT.readLess') : t('HOME.ABOUT.readMore')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles['philosophy']}>
          <p>
            "{t('HOME.ABOUT.philosophy')}"
          </p>
        </div>
      </div>
    </CSection>
  );
};

export default AboutSection;
