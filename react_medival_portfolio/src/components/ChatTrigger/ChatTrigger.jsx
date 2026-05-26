import { createPortal } from 'react-dom';
import { useChat } from '../../lib/contexts/ChatProvider';
import { useSettings } from '../../lib/useSettings';
import styles from './ChatTrigger.module.scss';

const ChatTrigger = () => {
  const { isOpen, openChat, hasUnread } = useChat();
  const { t } = useSettings();

  if (isOpen) return null;

  return createPortal(
    <button
      className={styles['trigger']}
      onClick={openChat}
      aria-label={t('COMMON.chatbot.triggerAria')}
      id="chat-trigger-btn"
    >
      <span className={styles['icon']}>🔮</span>
      {hasUnread && <span className={styles['badge']} aria-label="Unread messages" />}
    </button>,
    document.body
  );
};

export default ChatTrigger;
