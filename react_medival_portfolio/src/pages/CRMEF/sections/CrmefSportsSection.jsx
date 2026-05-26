import CSection from '../../../templates/Section';
import { crmefSports } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import DynamicCard from '../../../components/card';
import styles from './CrmefSportsSection.module.scss';

const CrmefSportsSection = () => {
  const { t } = useSettings();

  const getTranslatedSport = (sport) => {
    const labelKey = `CRMEF.sports.items.${sport.id}`;
    const lbl = t(labelKey);
    return {
      ...sport,
      label: lbl !== labelKey ? lbl : sport.label,
    };
  };

  return (
    <CSection variant="crmef" id="sports" title={t('CRMEF.sections.sports')} className={styles.section}>
      <div className={styles.sportsGrid}>
        {crmefSports.map(sport => {
          const tSport = getTranslatedSport(sport);
          return (
            <DynamicCard
              key={tSport.id}
              item={tSport}
              config={{
                baseClass: styles.sportCard,
                titleKey: 'label',
                variant: 'parchment'
              }}
            >
              <span className={styles.sportIcon}>{tSport.icon}</span>
              <span className={styles.sportLabel}>{tSport.label}</span>
            </DynamicCard>
          );
        })}
      </div>
    </CSection>
  );
};

export default CrmefSportsSection;
