import { useEffect, useState } from 'react';

export default function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Section tracking
  useEffect(() => {
    const bodyContainer = document.getElementById('body-container');
    if (!bodyContainer) return;

    const handleScroll = () => {
      let current = '';
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    bodyContainer.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => bodyContainer.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  // Sticky nav state
  useEffect(() => {
    const bodyContainer = document.getElementById('body-container');
    if (!bodyContainer) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = bodyContainer.scrollTop;
          setIsScrolled((prev) => {
            if (!prev && currentScroll >= 65) return true;
            if (prev && currentScroll < 35) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    bodyContainer.addEventListener('scroll', onScroll);
    onScroll();
    return () => bodyContainer.removeEventListener('scroll', onScroll);
  }, []);

  // Hash scroll
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return { activeSection, isScrolled };
}
