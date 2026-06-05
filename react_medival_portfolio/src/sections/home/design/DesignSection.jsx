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
    alt: t(`DATA.designs.${item.id}.alt`) || item.alt,
    isMobile: item.isMobile
  }));

  return (
    <CSection id="design" title={t('HOME.DESIGN.title')} subtitle={t('HOME.DESIGN.desc')} classname="design">
      <div className={styles['design-grid']} id="design-grid">
        {designs.map((design, index) => {
          const translatedDesign = {
            ...design,
            alt: t(`DATA.designs.${design.id}.alt`) || design.alt,
            caption: t(`DATA.designs.${design.id}.caption`) || design.caption,
          };
          return (
            <DynamicCard
              key={design.id}
              item={translatedDesign}
              config={PRESETS.DESIGN}
              onClick={() => viewImage(design.src, translatedDesign.alt, gallery, index)}
            />
          );
        })}
      </div>
    </CSection>
  );
};

export default DesignSection;

