import { useCallback, useMemo, useState } from "react";
import { ImageViewerContext } from "./imageViewer.context.js";

export default function ImageViewerProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, src: "", isMobile: false });

  const openImage = useCallback((src, isMobile = false) => {
    setState({ isOpen: true, src, isMobile });
  }, []);

  const closeImage = useCallback(() => {
    setState({ isOpen: false, src: "", isMobile: false });
  }, []);

  const value = useMemo(() => ({ ...state, openImage, closeImage }), [state, openImage, closeImage]);

  return <ImageViewerContext.Provider value={value}>{children}</ImageViewerContext.Provider>;
}

