import CSection from '../../../templates/Section';
import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import styles from './LanguagesSection.module.scss';

const localLanguages = [
  { id: 1, icon: '🗣️', name: 'Arabic', levelLabel: 'Native / Bilingual', level: 5 },
  { id: 2, icon: '📚', name: 'French', levelLabel: 'Professional Working', level: 3 },
  { id: 3, icon: '🧭', name: 'English', levelLabel: 'Professional Working', level: 4 },
];

const LanguagesSection = () => {
  return (
    <CSection id="languages" title="Tongues of the Realm" className="section" classname="section">
      <div className="section-content">
        <div className="parchment visible" id="languages-parch">
          <h2 className="section-title">Tongues of the Realm</h2>
          <p className="section-intro">Languages I speak + proficiency:</p>
          <div className={styles['languages-grid']} id="languages-grid">
            {localLanguages.map((lang) => (
              <DynamicCard key={lang.id} item={lang} config={PRESETS.LANGUAGE} />
            ))}
          </div>
        </div>
      </div>
    </CSection>
  );
};

export default LanguagesSection;
