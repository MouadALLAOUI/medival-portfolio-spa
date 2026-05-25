import CSection from '../../../templates/Section';
import { crmefExperience } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefExperienceSection.module.scss';

const CrmefExperienceSection = () => {
  const { t } = useSettings();

  const getTranslatedExp = (exp) => {
    const periodKey = `CRMEF.experience.items.${exp.id}.period`;
    const titleKey = `CRMEF.experience.items.${exp.id}.title`;
    const descKey = `CRMEF.experience.items.${exp.id}.description`;

    const per = t(periodKey);
    const tit = t(titleKey);
    const des = t(descKey);

    return {
      period: per !== periodKey ? per : exp.period,
      title: tit !== titleKey ? tit : exp.title,
      description: des !== descKey ? des : exp.description,
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
