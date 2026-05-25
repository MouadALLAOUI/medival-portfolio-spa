import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import designs from '../../../data/designs';
import { useImageViewer } from '../../../lib/useImageViewer';
import { useSettings } from '../../../lib/useSettings';
import styles from './DesignSection.module.scss';
import CSection from '../../../templates/Section';

const DesignSection = () => {
  const { openImage } = useImageViewer();
  const { t } = useSettings();

  return (
    <CSection id="design" title={t('HOME.DESIGN.title')} subtitle={t('HOME.DESIGN.desc')} classname="design">
      <div className={styles['design-grid']} id="design-grid">
        {designs.map((design) => (
          <DynamicCard key={design.id} item={design} config={PRESETS.DESIGN} onClick={() => openImage(design.src, design.alt)} />
        ))}
      </div>
    </CSection>
  );
};

export default DesignSection;
