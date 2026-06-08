import { useState, useEffect, useRef } from 'react';

const useDelayedUnmount = (shouldShow, duration = 300) => {
  const [isMounted, setIsMounted] = useState(shouldShow);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (shouldShow) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsMounted(true);
      setIsExiting(false);
    } else if (isMounted) {
      setIsExiting(true);
      timerRef.current = setTimeout(() => {
        setIsMounted(false);
        setIsExiting(false);
        timerRef.current = null;
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldShow, duration, isMounted]);

  return { isMounted, isExiting };
};

export default useDelayedUnmount;
