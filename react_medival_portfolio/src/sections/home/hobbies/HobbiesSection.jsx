import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import hobbies from '../../../data/hobbies';
import { useSettings } from '../../../lib/useSettings';
import styles from './HobbiesSection.module.scss';
import CSection from '../../../templates/Section';

const HobbiesSection = () => {
  const { t } = useSettings();

  return (
    <CSection id="hobbies" title={t('HOME.HOBBIES.title')} subtitle={t('HOME.HOBBIES.desc')} classname="hobbies">
      <div className={styles['hobbies-grid']} id="hobbies-grid">
        {hobbies.map((hobby) => (
          <DynamicCard key={hobby.id} item={hobby} config={PRESETS.HOBBIES} />
        ))}
      </div>
    </CSection>
  );
};

export default HobbiesSection;
