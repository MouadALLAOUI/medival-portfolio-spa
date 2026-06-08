import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    translateY = [50, 0],
    opacity = [0, 1],
    duration = 800,
    delay = 0,
    easing = 'easeOutCubic',
    staggerChildren = 0,
    childSelector = null,
  } = options;

  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            if (childSelector) {
              const children = node.querySelectorAll(childSelector);
              animate(children, {
                opacity,
                translateY,
                duration,
                delay: stagger(staggerChildren, { start: delay }),
                easing,
              });
            } else {
              animate(node, {
                opacity,
                translateY,
                duration,
                delay,
                easing,
              });
            }

            observer.unobserve(node);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, translateY, opacity, duration, delay, easing, staggerChildren, childSelector]);

  return ref;
};

export default useScrollReveal;
