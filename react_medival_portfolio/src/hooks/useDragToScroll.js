import { useEffect, useRef, useCallback, useLayoutEffect } from 'react';

export const useDragToScroll = (ref, { direction = 'horizontal', speed = 2 } = {}) => {
  const isDown = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef({ x: 0, y: 0 });
  const elRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    const el = elRef.current;
    if (!el) return;
    isDown.current = true;
    el.classList.add('active-drag');
    startPos.current = { x: e.pageX, y: e.pageY };
    scrollPos.current = { x: el.scrollLeft, y: el.scrollTop };
  }, []);

  const handleMouseUp = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    isDown.current = false;
    el.classList.remove('active-drag');
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDown.current) return;
    const el = elRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.pageX - startPos.current.x;
    const dy = e.pageY - startPos.current.y;

    if (direction === 'horizontal' || direction === 'both') {
      el.scrollLeft = scrollPos.current.x - dx * speed;
    }
    if (direction === 'vertical' || direction === 'both') {
      el.scrollTop = scrollPos.current.y - dy * speed;
    }
  }, [direction, speed]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    elRef.current = el;
    isDown.current = false;

    el.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      el.classList.remove('active-drag');
    };
  }, [ref, handleMouseDown, handleMouseUp, handleMouseMove]);
};
