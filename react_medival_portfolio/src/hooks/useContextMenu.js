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
  const [targetElement, setTargetElement] = useState(null);

  const closeMenu = useCallback(() => {
    setVisible(false);
    setTargetElement(null);
  }, []);

  const openMenu = useCallback((e) => {
    const target = e.target;

    // Check if the target or any of its parents have data-allow-contextmenu
    if (target instanceof HTMLElement && target.closest('[data-allow-contextmenu]')) {
      return;
    }

    // Default behavior for custom menu: prevent standard context menu
    e.preventDefault();
    setX(e.clientX);
    setY(e.clientY);
    setVisible(true);
    setTargetElement(target);
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', openMenu);
    return () => {
      document.removeEventListener('contextmenu', openMenu);
    };
  }, [openMenu]);

  return { x, y, visible, setVisible, closeMenu, targetElement };
}

