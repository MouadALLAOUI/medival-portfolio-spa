import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import learning from '../../../data/learning';
import { usePdfViewer } from '../../../lib/usePdfViewer';
import { useAchievements } from '../../../lib/useAchievements';
import { useSettings } from '../../../lib/useSettings';
import styles from './LearningSection.module.scss';
import CSection from '../../../templates/Section';

const LearningSection = () => {
  const { openPdf } = usePdfViewer();
  const { trackEvent } = useAchievements();
  const { t } = useSettings();

  const handleCardClick = (item, e) => {
    if (item.href) {
      if (e) e.preventDefault();
      openPdf(item.href, t(`DATA.learning.${item.id}.title`) || item.title);
      trackEvent('mp:pdf-opened');
    }
  };

  return (
    <CSection id="learning" title={t('HOME.LEARNING.title')} subtitle={t('HOME.LEARNING.intro')} classname="learning">
      <div className={styles['learning-grid']} id="learning-grid">
        {learning.map((item) => {
          const translatedItem = {
            ...item,
            title: t(`DATA.learning.${item.id}.title`) || item.title,
            meta: t(`DATA.learning.${item.id}.meta`) || item.meta,
            desc: t(`DATA.learning.${item.id}.desc`) || item.desc,
          };
          return (
            <DynamicCard
              key={item.id}
              item={translatedItem}
              config={PRESETS.LEARNING}
              onClick={(item, e) => handleCardClick(item, e)}
            />
          );
        })}
      </div>
    </CSection>
  );
};

export default LearningSection;
