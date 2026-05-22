import { useImageViewer } from '../lib/useImageViewer';
import { useEffect } from 'react';

export default function ImageViewer() {
  const { isOpen, src, closeImage } = useImageViewer();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeImage();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeImage]);

  if (!isOpen || !src) return null;

  return (
    <div className="image-viewer-overlay fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center animate-fade-in">
      <button
        className="close-btn absolute top-4 right-4 text-white text-4xl hover:text-gold-light transition-colors z-10"
        onClick={closeImage}
        aria-label="Close image viewer"
      >
        ×
      </button>
      <div className="image-container max-w-5xl max-h-[90vh] p-4 animate-rotate-in">
        <img
          src={src}
          alt="Full size image"
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border-2 border-gold"
        />
      </div>
    </div>
  );
}