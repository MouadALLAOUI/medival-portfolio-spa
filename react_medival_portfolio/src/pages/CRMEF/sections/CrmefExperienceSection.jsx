import CSection from '../../../templates/Section';
import { crmefExperience } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefExperienceSection.module.scss';

const CrmefExperienceSection = () => {
  const { t } = useSettings();

  const getTranslatedExp = (exp) => {
    return {
      period: t(exp.period),
      title: t(exp.title),
      description: t(exp.description),
    };
  };

  return (
    <CSection variant="crmef" id="experience" title={t('CRMEF.sections.experience')} className={styles.section}>
      <div className={styles.timeline}>
        {crmefExperience.map(exp => {
          const tExp = getTranslatedExp(exp);
          return (
            <div key={exp.id} className={styles.timelineItem}>
              <span className={styles.expPeriod}>{tExp.period}</span>
              <h4 className={styles.expTitle}>{tExp.title}</h4>
              <p className={styles.expDesc}>{tExp.description}</p>
            </div>
          );
        })}
      </div>
    </CSection>
  );
};

export default CrmefExperienceSection;
