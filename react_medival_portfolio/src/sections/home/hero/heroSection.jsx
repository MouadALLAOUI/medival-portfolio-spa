import CSection from '../../../templates/Section';
import { useChat } from '../../../lib/contexts/ChatProvider';
import { useSettings } from '../../../lib/useSettings';
import ParticleCanvas from '../../../components/ParticleCanvas/ParticleCanvas';
import styles from './heroSection.module.scss';

const HeroSection = () => {
  const { openChat } = useChat();
  const { t } = useSettings();

  return (
    <CSection id="hero" classname="hero-section">
      <ParticleCanvas />
      <h1 className={styles['hero-title']}>{t('HOME.HERO.title')}</h1>
      <div className={styles['crystal-ball']}></div>
      <p className={styles['hero-subtitle']}>{t('HOME.HERO.subtitle')}</p>

      <div className={styles['hero-actions']}>
        <button
          className={styles['chat-btn']}
          onClick={openChat}
          id="hero-chat-btn"
          type="button"
          aria-label={t('HOME.HERO.ariaLabel')}
        >
          <span className={styles['chat-btn-glow']} aria-hidden="true" />
          <span className={styles['chat-btn-inner']}>
            <span className={styles['chat-btn-dot']} aria-hidden="true" />
            {t('HOME.HERO.buttonText')}
          </span>
        </button>
      </div>
    </CSection>
  );
};

export default HeroSection;
