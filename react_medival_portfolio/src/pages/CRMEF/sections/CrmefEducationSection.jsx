import CSection from '../../../templates/Section';
import { crmefEducation } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefEducationSection.module.scss';

const CrmefEducationSection = () => {
  const { t } = useSettings();

  const getTranslatedEdu = (edu) => {
    const degreeKey = `CRMEF.education.items.${edu.id}.degree`;
    const titleKey = `CRMEF.education.items.${edu.id}.title`;
    const instKey = `CRMEF.education.items.${edu.id}.institution`;
    const locKey = `CRMEF.education.items.${edu.id}.location`;
    const typeKey = `CRMEF.education.items.${edu.id}.type`;

    const deg = t(degreeKey);
    const tit = t(titleKey);
    const ins = t(instKey);
    const loc = t(locKey);
    const typ = t(typeKey);

    return {
      degree: deg !== degreeKey ? deg : edu.degree,
      title: tit !== titleKey ? tit : edu.title,
      institution: ins !== instKey ? ins : edu.institution,
      location: loc !== locKey ? loc : edu.location,
      type: typ !== typeKey ? typ : edu.type,
    };
  };

  return (
    <CSection variant="crmef" id="education" title={t('CRMEF.sections.education')} className={styles.section}>
      <div className={styles.educationGrid}>
        {crmefEducation.map(edu => {
          const tEdu = getTranslatedEdu(edu);
          return (
            <div key={edu.id} className={styles.eduCard}>
              <h3 className={styles.eduTitle}>{tEdu.degree || tEdu.title}</h3>
              <p className={styles.eduInstitution}>{tEdu.institution}</p>
              <p className={styles.eduLocation}>{tEdu.location}</p>
              {tEdu.type && <div className={styles.eduType}>{tEdu.type}</div>}
            </div>
          );
        })}
      </div>
    </CSection>
  );
};

export default CrmefEducationSection;
