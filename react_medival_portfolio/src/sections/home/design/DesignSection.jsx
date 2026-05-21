import CSection from "../../../templates/Section";
import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import designs from '../../../data/designs';
import { useImageViewer } from '../../../lib/useImageViewer';

function DesignSection() {
  const { openImage } = useImageViewer();

  const handleCardClick = (design) => {
    openImage(design.src, design.alt);
  };

  return (
    <CSection id="design" title="Design Forge" subtitle="Visual creations from the artisan's workshop">
      <div className="designs-grid">
        {designs.map((design) => (
          <DynamicCard
            key={design.id}
            item={design}
            config={PRESETS.DESIGN}
            onClick={() => handleCardClick(design)}
          />
        ))}
      </div>
    </CSection>
  );
}

export default DesignSection;