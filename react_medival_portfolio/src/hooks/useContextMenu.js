import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook to listen for the contextmenu event on the document,
 * excluding interactive elements like links, buttons, inputs, selects,
 * iframes, and the chatbot container, and exposing menu coordinates and visibility.
 */
export default function useContextMenu() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [visible, setVisible] = useState(false);

  const closeMenu = useCallback(() => {
    setVisible(false);
  }, []);

  const openMenu = useCallback((e) => {
    const target = e.target;
    if (target instanceof HTMLElement) {
      // Intelligently check if we right-clicked on an interactive element
      if (
        target.closest('[data-context-menu-ignore]') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('iframe') ||
        target.closest('[role="button"]') ||
        target.closest('.chat-window') || // chatbot container check
        target.closest('[role="menu"]') // do not trigger context menu on custom menu itself
      ) {
        // Allow default browser context menu for these interactive components
        return;
      }
    }

    e.preventDefault();
    setX(e.clientX);
    setY(e.clientY);
    setVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', openMenu);
    return () => {
      document.removeEventListener('contextmenu', openMenu);
    };
  }, [openMenu]);

  return { x, y, visible, setVisible, closeMenu };
}
