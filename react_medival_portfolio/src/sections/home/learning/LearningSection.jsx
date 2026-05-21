import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import learning from '../../../data/learning';
import { usePdfViewer } from '../../../lib/usePdfViewer';
import { useAchievements } from '../../../lib/useAchievements';

const LearningSection = () => {
  const { openPdf } = usePdfViewer();
  const { trackEvent } = useAchievements();

  const handleCardClick = (item) => {
    if (item.href) {
      openPdf(item.href);
      trackEvent('mp:pdf-opened');
    }
  };

  return (
    <section id="learning" className="section">
      <div className="section-content">
        <div className="parchment visible" id="learning-parch">
          <div>
            <h2 className="section-title">Learning Grimoire</h2>
            <p className="section-intro">Learning materials I’ve crafted (PDFs, slides, and study scrolls):</p>
          </div>
          <div className="learning-grid" id="learning-grid">
            {learning.map((item) => (
              <DynamicCard key={item.id} item={item} config={PRESETS.LEARNING} onClick={() => handleCardClick(item)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
