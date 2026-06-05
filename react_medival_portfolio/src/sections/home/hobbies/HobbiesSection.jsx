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
        {hobbies.map((hobby) => {
          const translatedHobby = {
            ...hobby,
            title: t(`DATA.hobbies.${hobby.id}.title`) || hobby.title,
            desc: t(`DATA.hobbies.${hobby.id}.desc`) || hobby.desc,
          };
          return (
            <DynamicCard key={hobby.id} item={translatedHobby} config={PRESETS.HOBBIES} />
          );
        })}
      </div>
    </CSection>
  );
};

export default HobbiesSection;
