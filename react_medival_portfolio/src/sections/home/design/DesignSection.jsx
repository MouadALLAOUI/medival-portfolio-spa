import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import designs from '../../../data/designs';
import { useImageViewer } from '../../../lib/useImageViewer';
import { useSettings } from '../../../lib/useSettings';
import styles from './DesignSection.module.scss';
import CSection from '../../../templates/Section';

const DesignSection = () => {
  const { viewImage } = useImageViewer();
  const { t } = useSettings();

  const gallery = designs.map(item => ({
    src: item.src,
    alt: item.alt,
    isMobile: item.isMobile
  }));

  return (
    <CSection id="design" title={t('HOME.DESIGN.title')} subtitle={t('HOME.DESIGN.desc')} classname="design">
      <div className={styles['design-grid']} id="design-grid">
        {designs.map((design, index) => (
          <DynamicCard
            key={design.id}
            item={design}
            config={PRESETS.DESIGN}
            onClick={() => viewImage(design.src, design.alt, gallery, index)}
          />
        ))}
      </div>
    </CSection>
  );
};

export default DesignSection;

