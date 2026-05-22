import { useEffect } from 'react';
import { usePdfViewer } from '../lib/usePdfViewer';

export default function PdfViewer() {
  const { isOpen, url, title, closePdf } = usePdfViewer();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePdf();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closePdf]);

  if (!isOpen || !url) return null;

  return (
    <div className="pdf-viewer-overlay fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center animate-fade-in">
      <div className="pdf-container w-full h-full max-w-6xl max-h-[95vh] bg-white rounded-lg shadow-2xl m-4 flex flex-col overflow-hidden">
        <div className="pdf-header flex justify-between items-center p-4 bg-gray-800 text-white">
          <h3 className="text-lg font-medieval truncate">{title}</h3>
          <button
            className="close-btn text-2xl hover:text-gold-light transition-colors"
            onClick={closePdf}
            aria-label="Close PDF viewer"
          >
            ×
          </button>
        </div>
        <iframe
          src={url}
          title={title}
          className="flex-1 w-full h-full border-0"
          style={{ minHeight: '600px' }}
        />
      </div>
    </div>
  );
}