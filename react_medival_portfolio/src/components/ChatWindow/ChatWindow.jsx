import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { generatePseudoLLMAnswer, initializeSentenceChunks } from '../../lib/chatbot/parser';
import { useChat } from '../../lib/contexts/ChatProvider';
import { useSettings } from '../../lib/useSettings';
import styles from './ChatWindow.module.scss';

const ChatWindow = () => {
  const { isOpen, isMinimized, closeChat, minimizeChat } = useChat();
  const { t } = useSettings();

  // ── All original chatbot logic ──────────────────────────────────────
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

  // Auto-scroll to bottom on every new message
  useEffect(() => {
    if (messages.length > 0 && chatMessagesRef.current) {
      const container = chatMessagesRef.current;

      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

      const timer1 = setTimeout(() => {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }, 150);

      const timer2 = setTimeout(() => {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }, 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [messages]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const appendUserMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
  };

  const appendBotMessage = (text, type = '', contextId = '') => {
    setMessages((prev) => [...prev, { role: 'bot', text, type, contextId }]);
  };

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
  };

  const onAsk = () => sendQuestion(userInput);
  // ────────────────────────────────────────────────────────────────────

  if (!isOpen) return null;

  return createPortal(
    <div className={`${styles['chat-window']} ${isMinimized ? styles['minimized'] : ''}`}>

      {/* ── Header ── */}
      <div className={styles['header']}>
        <div className={styles['header-info']}>
          <span className={styles['avatar']}>🔮</span>
          <div className={styles['header-text']}>
            <span className={styles['header-name']}>{t('COMMON.chatbot.title')}</span>
            <span className={styles['header-status']}>● Online</span>
          </div>
        </div>
        <div className={styles['header-actions']}>
          <button
            className={styles['minimize-btn']}
            onClick={minimizeChat}
            aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button
            className={styles['close-btn']}
            onClick={closeChat}
            aria-label={t('COMMON.chatbot.closeAria')}
          >
            ×
          </button>
        </div>
      </div>

      {/* ── Body (hidden when minimized) ── */}
      {!isMinimized && (
        <>
          {/* Messages */}
          <div ref={chatMessagesRef} className={styles['chat-messages']} id="chat-messages">

            {/* Welcome info panel */}
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

            {/* Greeting */}
            <div className={`${styles['message']} ${styles['bot-message']} ${styles['warning-message']}`}>
              <div className={styles['message-content']}>
                {t('COMMON.chatbot.greeting') || 'Greetings, seeker! I am the Oracle. Ask me anything about Mouad the Coder and his mystical coding powers.'}
                <div style={{ marginTop: '0.25rem' }}>{t('COMMON.chatbot.underDevNotice') || 'This chatbot is still under development and training. Thank you for your understanding.'}</div>
              </div>
            </div>

            {/* Dynamic messages */}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`${styles['message']} ${message.role === 'user' ? styles['user-message'] : styles['bot-message']} ${message.type ? styles[`${message.type}-message`] : ''}`}
              >
                <div className={styles['message-content']}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className={styles['suggestions']}>
            {DEFAULT_SUGGESTIONS.map((suggestion) => (
              <div
                key={suggestion}
                className={styles['suggestion']}
                role="button"
                tabIndex={0}
                onClick={() => sendQuestion(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') sendQuestion(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className={styles['input-row']}>
            <textarea
              ref={inputRef}
              className={styles['input']}
              aria-label={t('COMMON.chatbot.placeholder')}
              placeholder={t('COMMON.chatbot.placeholder')}
              aria-multiline="false"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onAsk();
                }
              }}
            />
            <button className={styles['send-btn']} onClick={onAsk}>
              {t('COMMON.chatbot.send')}
            </button>
          </div>

          {/* Context indicator */}
          <div className={styles['context-indicator']}>
            <div>
              {t('COMMON.chatbot.context') || 'Context:'} <strong>{contextStatus}</strong>
            </div>
            <div className={styles['context-stats']}>
              <div className={styles['stat-box']}>
                {t('COMMON.chatbot.statParagraphs') || 'Paragraphs'} <span className={styles['stat-value']}>{paraCount}</span>
              </div>
              <div className={styles['stat-box']}>
                {t('COMMON.chatbot.statSentences') || 'Sentences'} <span className={styles['stat-value']}>{sentenceCount}</span>
              </div>
              <div className={styles['stat-box']}>
                {t('COMMON.chatbot.statEntities') || 'Entities'} <span className={styles['stat-value']}>{entityCount}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default ChatWindow;
