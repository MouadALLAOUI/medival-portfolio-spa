import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';

const localLanguages = [
  { id: 1, icon: '🗣️', name: 'Arabic', levelLabel: 'Native / Bilingual', level: 5 },
  { id: 2, icon: '📚', name: 'French', levelLabel: 'Professional Working', level: 3 },
  { id: 3, icon: '🧭', name: 'English', levelLabel: 'Professional Working', level: 4 },
];

const LanguagesSection = () => {
  return (
    <section id="languages" className="section">
      <div className="section-content">
        <div className="parchment visible" id="languages-parch">
          <h2 className="section-title">Tongues of the Realm</h2>
          <p className="section-intro">Languages I speak + proficiency:</p>
          <div className="languages-grid" id="languages-grid">
            {localLanguages.map((lang) => (
              <DynamicCard key={lang.id} item={lang} config={PRESETS.LANGUAGE} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
