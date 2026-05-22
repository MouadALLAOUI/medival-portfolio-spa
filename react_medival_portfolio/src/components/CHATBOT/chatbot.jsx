import { useMemo, useState } from 'react';
import { generatePseudoLLMAnswer, initializeSentenceChunks } from '../../lib/chatbot/parser';

const DEFAULT_SUGGESTIONS = ['Who is Mouad?', 'List projects', 'List cybersecurity project?'];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [contextStatus, setContextStatus] = useState('Default Profile');
  const [paraCount, setParaCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [entityCount, setEntityCount] = useState(0);

  const sentenceChunks = useMemo(() => initializeSentenceChunks(), []);

  const appendUserMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
  };

  const appendBotMessage = (text, type = '') => {
    setMessages((prev) => [...prev, { role: 'bot', text, type }]);
  };

  const sendQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    appendUserMessage(trimmed);
    setUserInput('');

    const result = generatePseudoLLMAnswer(trimmed, sentenceChunks, []);
    appendBotMessage(result.text);

    setContextStatus(result.intent ? result.intent.toUpperCase() : 'Default Profile');
    setParaCount(Math.max(0, Math.round((result.matches || 0) / 2)));
    setSentenceCount(result.matches || 0);
    setEntityCount(result.confidence ? Math.round(result.confidence * 10) : 0);
  };

  const onAsk = () => sendQuestion(userInput);

  return (
    <div className="chatbot-container" id="chat-container">
      <div className="chatbot-header" id="chat-header">
        The Oracle&apos;s Crystal Ball
      </div>

      <div className="chat-messages" id="chat-messages">
        <div className="message bot-message">
          <div className="message-content">
            <div className="info-panel">
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--primary)" strokeWidth="2" />
                  <path d="M12 16V12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 8H12.01" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                How to use this chatbot:
              </h3>
              <ul>
                <li>
                  <strong>Ask questions:</strong>
                  {' '}About the context or general inquiries about Mouad the Coder
                </li>
                <li>
                  <strong>Follow-up questions:</strong>
                  {' '}The bot remembers the last 3 interactions (under construction)
                </li>
              </ul>
              <div className="instructions">
                <p>
                  <strong>is it worth asking:</strong>
                  {' '}yes of course it worth it i work my brain out to build it even there still some needed improvement I am working on but thank you for using our simple chatbot
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="message bot-message warning-message">
          <div className="message-content">
            Greetings, seeker! I am the Oracle. Ask me anything about Mouad the Coder and his mystical coding powers.
            <div className="mt-1">This chatbot is still under development and training. Thank you for your understanding.</div>
          </div>
        </div>

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'} ${message.type ? `${message.type}-message` : ''}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container" id="chat-input">
        <textarea
          type="text"
          className="chat-input"
          id="user-input"
          name="userQuestion"
          aria-label="Ask the Oracle"
          placeholder="Inquire about skills, projects, or experience..."
          aria-multiline="false"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onAsk();
            }
          }}
        ></textarea>

        <button id="askButton" className="ask-button" onClick={onAsk}>
          ASK
        </button>
      </div>

      <div className="suggestions" id="suggestions">
        {DEFAULT_SUGGESTIONS.map((suggestion) => (
          <div
            key={suggestion}
            className="suggestion"
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

      <div className="context-indicator" id="context-indicator">
        <div>
          Current Context: <strong id="contextStatus">{contextStatus}</strong>
        </div>
        <div className="context-stats">
          <div className="stat-box">
            Paragraphs <span className="stat-value" id="paraCount">{paraCount}</span>
          </div>
          <div className="stat-box">
            Sentences <span className="stat-value" id="sentenceCount">{sentenceCount}</span>
          </div>
          <div className="stat-box">
            Entities <span className="stat-value" id="entityCount">{entityCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;