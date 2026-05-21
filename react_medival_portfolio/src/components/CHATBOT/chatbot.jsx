/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useAlerts } from '../../lib/useAlerts';
import {
  generatePseudoLLMAnswer,
  initializeSentenceChunks
} from '../../lib/chatbot/parser';

const SUGGESTIONS = [
  "Who is Mouad?",
  "What are your skills?",
  "Tell me about your projects",
  "What is your background?",
  "What technologies do you use?"
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '🔮 Greetings, traveler! I am the Oracle of this realm. Ask me anything about Mouad, his journey, skills, or creations.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [contextInfo, setContextInfo] = useState({ intent: 'READY', matches: 0 });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { showAlert } = useAlerts();

  // Initialize sentence chunks once
  const [sentenceChunks] = useState(() => initializeSentenceChunks());
  const [conversationHistory, setConversationHistory] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const userMessage = {
      role: 'user',
      content: trimmedInput,
      timestamp: userTimestamp
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, { role: 'user', content: trimmedInput }]);
    setInputValue('');
    setIsThinking(true);

    // Simulate oracle thinking delay
    setTimeout(() => {
      const result = generatePseudoLLMAnswer(trimmedInput, sentenceChunks, conversationHistory);

      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMessage = {
        role: 'bot',
        content: result.text,
        timestamp: botTimestamp,
        intent: result.intent,
        confidence: result.confidence,
        matches: result.matches
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: result.text }]);
      setContextInfo({ intent: result.intent.toUpperCase(), matches: result.matches });
      setIsThinking(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showAlert('Copied to clipboard!', 'success');
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-title">
          <span className="oracle-icon">🔮</span>
          <span>Oracle Chat</span>
        </div>
        <div className="context-indicator">
          <span className="context-label">Context:</span>
          <span className="context-status">{contextInfo.intent}</span>
          <span className="context-separator">|</span>
          <span className="context-matches">Matches: {contextInfo.matches}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages" id="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role}-message ${msg.intent ? `${msg.intent}-message` : ''}`}
          >
            <div className="message-content">
              {msg.role === 'bot' && msg.intent ? (
                <>
                  <div className="answer-highlight">{msg.content}</div>
                  <div className="source">
                    Intent: {msg.intent} | Confidence: {Math.round(Math.min(100, msg.confidence * 100))}%
                  </div>
                </>
              ) : (
                <div>{msg.content}</div>
              )}
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="message bot-message system-message">
            <div className="message-content">
              <div>🔮 The Oracle consults the mystical knowledge...</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="suggestions" id="suggestions">
        {SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            className="suggestion"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <textarea
          ref={inputRef}
          id="user-input"
          className="chat-input"
          placeholder="Ask the Oracle..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <button
          id="askButton"
          className="ask-button"
          onClick={handleSendMessage}
          disabled={isThinking || !inputValue.trim()}
        >
          <span>Send</span>
          <span className="send-icon">➤</span>
        </button>
      </div>
    </div>
  );
}