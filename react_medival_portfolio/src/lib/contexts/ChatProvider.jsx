import { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext(null);

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const markUnread = useCallback(() => {
    setHasUnread(true);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        isMinimized,
        hasUnread,
        openChat,
        closeChat,
        minimizeChat,
        markUnread,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
