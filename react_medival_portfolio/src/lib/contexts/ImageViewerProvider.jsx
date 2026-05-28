import { useCallback, useMemo, useState } from "react";
import { ImageViewerContext } from "./imageViewer.context.js";
import { useAchievements } from "../useAchievements.jsx";

export default function ImageViewerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const achievements = useAchievements();

  const viewImage = useCallback((src, alt = '', gallery = null, startIndex = 0, isMobile = false) => {
    if (gallery && Array.isArray(gallery) && gallery.length > 0) {
      setImages(gallery);
      setCurrentIndex(startIndex);
    } else {
      setImages([{ src, alt, isMobile }]);
      setCurrentIndex(0);
    }
    setIsOpen(true);
    if (achievements && achievements.unlockAchievement) {
      achievements.unlockAchievement('viewed_image');
    }
  }, [achievements]);

  const openImage = useCallback((src, isMobileOrAlt = false) => {
    let alt = "";
    let isMobile = false;
    if (typeof isMobileOrAlt === 'string') {
      alt = isMobileOrAlt;
    } else if (typeof isMobileOrAlt === 'boolean') {
      isMobile = isMobileOrAlt;
    }
    viewImage(src, alt, null, 0, isMobile);
  }, [viewImage]);

  const closeImage = useCallback(() => {
    setIsOpen(false);
    setImages([]);
    setCurrentIndex(0);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, images.length - 1));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  }, []);

  const current = images[currentIndex];
  const src = current?.src || "";
  const isMobile = current?.isMobile || false;
  const alt = current?.alt || "";

  const value = useMemo(() => ({
    isOpen,
    images,
    currentIndex,
    src,
    isMobile,
    alt,
    viewImage,
    openImage,
    closeImage,
    goNext,
    goPrev
  }), [isOpen, images, currentIndex, src, isMobile, alt, viewImage, openImage, closeImage, goNext, goPrev]);

  return <ImageViewerContext.Provider value={value}>{children}</ImageViewerContext.Provider>;
}


