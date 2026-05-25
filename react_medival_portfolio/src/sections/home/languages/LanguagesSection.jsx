import CSection from '../../../templates/Section';
import DynamicCard from '../../../components/card';
import { PRESETS } from '../../../config/presets';
import { useSettings } from '../../../lib/useSettings';
import styles from './LanguagesSection.module.scss';

const LanguagesSection = () => {
  const { t } = useSettings();

  const localLanguages = [
    { id: 1, icon: '🗣️', name: t('HOME.LANGUAGES.arabic'), levelLabel: t('HOME.LANGUAGES.native'), level: 5 },
    { id: 2, icon: '📚', name: t('HOME.LANGUAGES.french'), levelLabel: t('HOME.LANGUAGES.working'), level: 3 },
    { id: 3, icon: '🧭', name: t('HOME.LANGUAGES.english'), levelLabel: t('HOME.LANGUAGES.working'), level: 4 },
  ];

  return (
    <CSection id="languages" title={t('HOME.LANGUAGES.title')} subtitle={t('HOME.LANGUAGES.intro')} classname="languages">
      <div className={styles['languages-grid']} id="languages-grid">
        {localLanguages.map((lang) => (
          <DynamicCard key={lang.id} item={lang} config={PRESETS.LANGUAGE} />
        ))}
      </div>
    </CSection>
  );
};

export default LanguagesSection;
