import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import hobbies from '../../../data/hobbies';

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="section">
      <div className="section-content">
        <div className="parchment visible" id="hobbies-parch">
          <h2 className="section-title" data-i18n="hobbies.title">Beyond the Code</h2>
          <p className="section-intro" data-i18n="hobbies.intro">
            What I do beyond programming—habits that sharpen the mind and keep the wizard grounded.
          </p>
          <div className="hobbies-grid" id="hobbies-grid">
            {hobbies.map((hobby) => (
              <DynamicCard key={hobby.id} item={hobby} config={PRESETS.HOBBIES} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
