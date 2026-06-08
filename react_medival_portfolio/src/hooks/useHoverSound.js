import { useCallback } from 'react';
import { useSound } from '../lib/hooks/useSound';

export const useHoverSound = () => {
  const { play } = useSound();

  const onHover = useCallback(() => {
    play('hover', 100);
  }, [play]);

  return { onMouseEnter: onHover };
};
