import { useState } from 'react';
import CSection from '../../../templates/Section';
import { crmefCritique } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefCritiquePage.module.scss';

const CrmefCritiquePage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const { t } = useSettings();

  const toggleSection = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <CSection
      variant="crmef"
      id="critique"
      title={t('CRMEF.critique.title')}
      className={styles.section}
    >
      <p className={styles.sectionSubtitle}>
        {t('CRMEF.critique.subtitle')}
      </p>

      <div className={styles.critiqueGrid}>
        {crmefCritique.map((topic) => {
          const isExpanded = expandedId === topic.id;
          const translatedTitle = t(topic.title);
          return (
            <div
              key={topic.id}
              className={`${styles.topicCard} ${isExpanded ? styles.expanded : ''}`}
              style={{ '--topic-color': topic.color }}
            >
              <button
                type="button"
                className={styles.topicHeader}
                onClick={() => toggleSection(topic.id)}
                aria-expanded={isExpanded}
              >
                <span className={styles.topicIcon}>{topic.icon}</span>
                <span className={styles.topicTitle}>{translatedTitle}</span>
                <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
                  ▾
                </span>
              </button>

              {isExpanded && (
                <div className={styles.topicBody}>
                  {topic.sections.map((section, idx) => {
                    const translatedContent = t(section.content);
                    return (
                      <div key={idx} className={styles.sectionBlock}>
                        <h4
                          className={styles.sectionLabel}
                          style={{ color: section.color, borderColor: section.color }}
                        >
                          <span>{section.icon}</span> {section.subtitle}
                        </h4>
                        <p className={styles.sectionContent}>{translatedContent}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CSection>
  );
};

export default CrmefCritiquePage;
