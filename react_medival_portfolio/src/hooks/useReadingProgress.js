import { useState, useRef, useEffect, useCallback } from 'react';
import { calculateReadingTime } from '../lib/utils/readingTime';

const BLOG_PROGRESS_KEY = 'mp_blog_progress';

const getBlogProgress = (slug) => {
  try {
    const map = JSON.parse(localStorage.getItem(BLOG_PROGRESS_KEY) || '{}');
    return typeof map[slug] === 'number' ? map[slug] : 0;
  } catch {
    return 0;
  }
};

const saveBlogProgress = (slug, progress) => {
  try {
    const map = JSON.parse(localStorage.getItem(BLOG_PROGRESS_KEY) || '{}');
    map[slug] = Math.round(progress);
    localStorage.setItem(BLOG_PROGRESS_KEY, JSON.stringify(map));
  } catch {
    // ignore write errors
  }
};

export function useReadingProgress({ slug, post, totalWords, headings, isTransitioningRef }) {
  const contentRef = useRef(null);
  const maxReadingProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeId, setActiveId] = useState('');

  const resetProgress = useCallback(() => {
    const saved = getBlogProgress(slug);
    maxReadingProgressRef.current = saved;
    window.setTimeout(() => {
      setScrollProgress(saved);
      setReadingProgress(saved);
      const wordsReadSoFar = Math.floor((saved / 100) * totalWords);
      setWordsRead(wordsReadSoFar);
      setTimeLeft(calculateReadingTime(post?.blogcontent?.content) || 0);
      setActiveId('');
    }, 0);
  }, [slug, post, totalWords]);

  useEffect(() => {
    if (!post) return;

    const scrollContainer = document.getElementById('body-container') || window;
    let ticking = false;

    const onScroll = () => {
      if (isTransitioningRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const content = contentRef.current;
          const scrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;

          let progress = 0;
          if (content) {
            const contentTop = content.getBoundingClientRect().top + scrollTop;
            const contentHeight = content.offsetHeight;
            const scrolled = scrollTop - contentTop;
            const viewportHeight = scrollContainer === window ? window.innerHeight : scrollContainer.clientHeight;
            const maxScrollable = contentHeight - viewportHeight;

            if (maxScrollable > 0) {
              progress = Math.min(100, Math.max(0, (scrolled / maxScrollable) * 100));
            } else {
              progress = scrolled > 0 ? 100 : 0;
            }

            const nextProgress = Math.max(maxReadingProgressRef.current, progress);
            if (nextProgress > maxReadingProgressRef.current) {
              maxReadingProgressRef.current = nextProgress;
              saveBlogProgress(slug, nextProgress);
            }

            setReadingProgress(nextProgress);
            setScrollProgress(nextProgress);

            const wordsReadSoFar = Math.floor((nextProgress / 100) * totalWords);
            setWordsRead(wordsReadSoFar);

            const wordsRemaining = totalWords - wordsReadSoFar;
            setTimeLeft(Math.ceil(wordsRemaining / 200));
          }

          if (headings.length > 0) {
            const scrollPosition = scrollTop + 120;
            let currentActive = headings[0]?.id || '';

            for (let i = 0; i < headings.length; i++) {
              const el = document.getElementById(headings[i].id);
              if (el) {
                const top = el.getBoundingClientRect().top + scrollTop;
                if (scrollPosition >= top) {
                  currentActive = headings[i].id;
                } else {
                  break;
                }
              }
            }
            setActiveId(currentActive);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, [post, headings, totalWords, slug, isTransitioningRef]);

  return {
    contentRef,
    scrollProgress,
    readingProgress,
    wordsRead,
    timeLeft,
    activeId,
    resetProgress,
  };
}
