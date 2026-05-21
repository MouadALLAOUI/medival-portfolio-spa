import CSection from "../../../templates/Section";
import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import learning from '../../../data/learning';
import { usePdfViewer } from '../../../lib/usePdfViewer';
import { useAchievements } from '../../../lib/useAchievements';

function LearningSection() {
  const { openPdf } = usePdfViewer();
  const { trackEvent } = useAchievements();

  const handleCardClick = (item) => {
    if (item.href) {
      openPdf(item.href);
      trackEvent('mp:pdf-opened');
    }
  };

  return (
    <CSection id="learning" title="Learning & Knowledge" subtitle="Scrolls of wisdom and scholarly pursuits">
      <div className="learning-grid">
        {learning.map((item) => (
          <DynamicCard
            key={item.id}
            item={item}
            config={PRESETS.LEARNING}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </CSection>
  );
}

export default LearningSection;