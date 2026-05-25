import { useCallback, useMemo, useState } from "react";
import { PdfViewerContext } from "./pdfViewer.context.js";
import { usePdfSettings } from "./PdfSettingsContext";

export default function PdfViewerProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, url: "", title: "" });
  const pdfSettings = usePdfSettings();

  const openPdf = useCallback((url, title = "") => {
    if (pdfSettings?.pdfMode === 'new_tab') {
      window.open(url, '_blank', 'noopener,noreferrer');
      try {
        window.dispatchEvent(new CustomEvent("mp:pdf-opened", { detail: { url, title } }));
      } catch (e) {
        void e;
      }
      return;
    }

    setState({ isOpen: true, url, title });
    try {
      window.dispatchEvent(new CustomEvent("mp:pdf-opened", { detail: { url, title } }));
    } catch (e) {
      void e;
    }
  }, [pdfSettings]);

  const closePdf = useCallback(() => {
    setState({ isOpen: false, url: "", title: "" });
  }, []);

  const value = useMemo(() => ({ ...state, openPdf, closePdf }), [state, openPdf, closePdf]);

  return <PdfViewerContext.Provider value={value}>{children}</PdfViewerContext.Provider>;
}
