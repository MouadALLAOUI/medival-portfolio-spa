import CSection from '../../../templates/Section';
import { crmefEducation } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import DynamicCard from '../../../components/card';
import styles from './CrmefEducationSection.module.scss';

const CrmefEducationSection = () => {
  const { t } = useSettings();

  const getTranslatedEdu = (edu) => {
    return {
      period: t(edu.period),
      degree: t(edu.degree),
      title: t(edu.title),
      institution: t(edu.institution),
      location: t(edu.location),
      type: t(edu.type),
    };
  };

  return (
    <CSection variant="crmef" id="education" title={t('CRMEF.sections.education')} className={styles.section}>
      <div className={styles.timeline}>
        {crmefEducation.map(edu => {
          const tEdu = getTranslatedEdu(edu);
          const displayTitle = tEdu.degree || tEdu.title;
          
          return (
            <div key={edu.id} className={styles.timelineItem}>
              <span className={styles.eduPeriod}>{tEdu.period}</span>
              <h4 className={styles.eduTitle}>{displayTitle}</h4>
              <p className={styles.eduInstitution}>{tEdu.institution}</p>
              <p className={styles.eduLocation}>{tEdu.location}</p>
              {tEdu.type && <span className={styles.eduType}>{tEdu.type}</span>}
            </div>
          );
        })}
      </div>
    </CSection>
  );
};

export default CrmefEducationSection;
