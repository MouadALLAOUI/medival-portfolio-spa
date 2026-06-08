import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { generatePseudoLLMAnswer, initializeSentenceChunks } from '../../lib/chatbot/parser';
import { useChat } from '../../lib/contexts/ChatProvider';
import { useSettings } from '../../lib/useSettings';
import { useAchievements } from '../../lib/useAchievements';
import ChatWelcome from './ChatWelcome';
import ContextIndicator from './ContextIndicator';
import styles from './ChatWindow.module.scss';

const ChatWindow = () => {
  const { isOpen, isMinimized, closeChat, minimizeChat } = useChat();
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [contextStatus, setContextStatus] = useState('Default Profile');
  const [paraCount, setParaCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [entityCount, setEntityCount] = useState(0);

  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);

  const sentenceChunks = useMemo(() => initializeSentenceChunks(), []);

  const DEFAULT_SUGGESTIONS = [
    t('COMMON.chatbot.suggestions.whoIsMouad') || 'Who is Mouad?',
    t('COMMON.chatbot.suggestions.listProjects') || 'List projects',
    t('COMMON.chatbot.suggestions.listCyberProjects') || 'List cybersecurity project?',
  ];

  useEffect(() => {
    if (messages.length > 0 && chatMessagesRef.current) {
      const container = chatMessagesRef.current;
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      const timer1 = setTimeout(() => container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' }), 150);
      const timer2 = setTimeout(() => container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' }), 400);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [messages]);

  useEffect(() => {
    let timer;
    if (isOpen && !isMinimized && inputRef.current) {
      timer = setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [isOpen, isMinimized]);

  const appendUserMessage = (text) => setMessages((prev) => [...prev, { role: 'user', text }]);
  const appendBotMessage = (text, type = '', contextId = '') => setMessages((prev) => [...prev, { role: 'bot', text, type, contextId }]);

  const sendQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    appendUserMessage(trimmed);
    setUserInput('');
    const result = generatePseudoLLMAnswer(trimmed, sentenceChunks, messages);
    appendBotMessage(result.text, '', result.contextId);
    setContextStatus(result.intent ? result.intent.toUpperCase() : 'Default Profile');
    setParaCount(Math.max(0, Math.round((result.matches || 0) / 2)));
    setSentenceCount(result.matches || 0);
    setEntityCount(result.confidence ? Math.round(result.confidence * 10) : 0);
    unlockAchievement('chatted_with_oracle');
  };

  const onAsk = () => sendQuestion(userInput);

  if (!isOpen) return null;

  return createPortal(
    <div className={`${styles['chat-window']} ${isMinimized ? styles['minimized'] : ''}`}>
      <div className={styles['header']}>
        <div className={styles['header-info']}>
          <span className={styles['avatar']}>🔮</span>
          <div className={styles['header-text']}>
            <span className={styles['header-name']}>{t('COMMON.chatbot.title')}</span>
            <span className={styles['header-status']}>{t('COMPONENTS.chatWindow.online')}</span>
          </div>
        </div>
        <div className={styles['header-actions']}>
          <button className={styles['minimize-btn']} onClick={minimizeChat} aria-label={isMinimized ? t('COMPONENTS.chatWindow.expandAria') : t('COMPONENTS.chatWindow.minimizeAria')}>
            {isMinimized ? '▲' : '▼'}
          </button>
          <button className={styles['close-btn']} onClick={closeChat} aria-label={t('COMMON.chatbot.closeAria')}>×</button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={chatMessagesRef} className={styles['chat-messages']} id="chat-messages">
            <ChatWelcome />
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`${styles['message']} ${message.role === 'user' ? styles['user-message'] : styles['bot-message']} ${message.type ? styles[`${message.type}-message`] : ''}`}>
                <div className={styles['message-content']}>{message.text}</div>
              </div>
            ))}
          </div>

          <div className={styles['suggestions']}>
            {DEFAULT_SUGGESTIONS.map((suggestion) => (
              <div key={suggestion} className={styles['suggestion']} role="button" tabIndex={0} onClick={() => sendQuestion(suggestion)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') sendQuestion(suggestion); }}>
                {suggestion}
              </div>
            ))}
          </div>

          <div className={styles['input-row']}>
            <textarea ref={inputRef} className={styles['input']} aria-label={t('COMMON.chatbot.placeholder')} placeholder={t('COMMON.chatbot.placeholder')} aria-multiline="false" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onAsk(); } }} />
            <button className={styles['send-btn']} onClick={onAsk}>{t('COMMON.chatbot.send')}</button>
          </div>

          <ContextIndicator contextStatus={contextStatus} paraCount={paraCount} sentenceCount={sentenceCount} entityCount={entityCount} />
        </>
      )}
    </div>,
    document.body
  );
};

export default ChatWindow;
