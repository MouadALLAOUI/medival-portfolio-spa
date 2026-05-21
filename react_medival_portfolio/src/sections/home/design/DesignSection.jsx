import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import designs from '../../../data/designs';
import { useImageViewer } from '../../../lib/useImageViewer';

const DesignSection = () => {
  const { openImage } = useImageViewer();

  return (
    <section id="design" className="section">
      <div className="section-content">
        <div className="parchment visible" id="design-parch">
          <h2 className="section-title" data-i18n="design.title">The Design Forge</h2>
          <p className="section-intro" data-i18n="design.intro">
            Figma and Canva artifacts—UI drafts, prototypes, and visual scrolls forged for real quests.
          </p>
          <div className="design-grid" id="design-grid">
            {designs.map((design) => (
              <DynamicCard key={design.id} item={design} config={PRESETS.DESIGN} onClick={() => openImage(design.src, design.alt)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
