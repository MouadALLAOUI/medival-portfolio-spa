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

  const handleCardClick = (item) => {
    if (item.href) {
      openPdf(item.href);
      trackEvent('mp:pdf-opened');
    }
  };

  return (
    <CSection id="learning" title={t('HOME.LEARNING.title')} subtitle={t('HOME.LEARNING.intro')} classname="learning">
      <div className={styles['learning-grid']} id="learning-grid">
        {learning.map((item) => (
          <DynamicCard key={item.id} item={item} config={PRESETS.LEARNING} onClick={() => handleCardClick(item)} />
        ))}
      </div>
    </CSection>
  );
};

export default LearningSection;
