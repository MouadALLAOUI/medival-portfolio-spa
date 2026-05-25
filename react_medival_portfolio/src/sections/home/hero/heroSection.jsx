import CSection from '../../../templates/Section';
import { useChat } from '../../../lib/contexts/ChatProvider';
import styles from './heroSection.module.scss';

const HeroSection = () => {
  const { openChat } = useChat();

  return (
    <CSection id="hero" classname="hero-section">
      <h1 className={styles['hero-title']}>Mouad the Coder</h1>
      <div className={styles['crystal-ball']}></div>
      <p className={styles['hero-subtitle']}>Ask the Oracle anything about Mouad</p>

      <div className={styles['hero-actions']}>
        <button
          className={styles['chat-btn']}
          onClick={openChat}
          id="hero-chat-btn"
          type="button"
          aria-label="Open Oracle chat"
        >
          <span className={styles['chat-btn-glow']} aria-hidden="true" />
          <span className={styles['chat-btn-inner']}>
            <span className={styles['chat-btn-dot']} aria-hidden="true" />
            Ask the Oracle
          </span>
        </button>
      </div>
    </CSection>
  );
};

export default HeroSection;
