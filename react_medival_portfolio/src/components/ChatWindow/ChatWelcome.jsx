import { useSettings } from '../../lib/useSettings';
import styles from './ChatWindow.module.scss';

export default function ChatWelcome() {
  const { t } = useSettings();

  return (
    <>
      <div className={`${styles['message']} ${styles['bot-message']}`}>
        <div className={styles['message-content']}>
          <div className={styles['info-panel']}>
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {t('COMMON.chatbot.howToUseTitle') || 'How to use this chatbot:'}
            </h3>
            <ul>
              <li><strong>{t('COMMON.chatbot.howToUseAsk') || 'Ask questions:'}</strong> {t('COMMON.chatbot.howToUseAskDesc') || 'About the context or general inquiries about Mouad the Coder'}</li>
              <li><strong>{t('COMMON.chatbot.howToUseFollowUp') || 'Follow-up questions:'}</strong> {t('COMMON.chatbot.howToUseFollowUpDesc') || 'The bot remembers the last 3 interactions (under construction)'}</li>
            </ul>
            <div className={styles['instructions']}>
              <p>
                <strong>{t('COMMON.chatbot.worthAsking') || 'Is it worth asking:'}</strong> {t('COMMON.chatbot.worthAskingDesc') || 'Yes! I work my brain out to build it — even if there are still some improvements needed. Thank you for using our simple chatbot.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['message']} ${styles['bot-message']} ${styles['warning-message']}`}>
        <div className={styles['message-content']}>
          {t('COMMON.chatbot.greeting') || 'Greetings, seeker! I am the Oracle. Ask me anything about Mouad the Coder and his mystical coding powers.'}
          <div style={{ marginTop: '0.25rem' }}>{t('COMMON.chatbot.underDevNotice') || 'This chatbot is still under development and training. Thank you for your understanding.'}</div>
        </div>
      </div>
    </>
  );
}
