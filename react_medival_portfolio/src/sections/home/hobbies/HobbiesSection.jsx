import CSection from "../../../templates/Section";
import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import hobbies from '../../../data/hobbies';

function HobbiesSection() {
  return (
    <CSection id="hobbies" title="Hobbies & Interests" subtitle="Pastimes that fuel the creative spirit">
      <div className="hobbies-grid">
        {hobbies.map((hobby) => (
          <DynamicCard
            key={hobby.id}
            item={hobby}
            config={PRESETS.HOBBIES}
          />
        ))}
      </div>
    </CSection>
  );
}

export default HobbiesSection;