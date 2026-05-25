import { useChat } from '../../lib/contexts/ChatProvider';
import styles from './ChatTrigger.module.scss';

const ChatTrigger = () => {
  const { isOpen, openChat, hasUnread } = useChat();

  if (isOpen) return null;

  return (
    <button
      className={styles['trigger']}
      onClick={openChat}
      aria-label="Open chat with the Oracle"
      id="chat-trigger-btn"
    >
      <span className={styles['icon']}>🔮</span>
      {hasUnread && <span className={styles['badge']} aria-label="Unread messages" />}
    </button>
  );
};

export default ChatTrigger;
