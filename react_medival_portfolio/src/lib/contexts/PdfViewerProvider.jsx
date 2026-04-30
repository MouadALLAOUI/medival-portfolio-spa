import { useCallback, useMemo, useState } from "react";
import { PdfViewerContext } from "./pdfViewer.context.js";

export default function PdfViewerProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, url: "", title: "" });

  const openPdf = useCallback((url, title = "") => {
    setState({ isOpen: true, url, title });
    try {
      window.dispatchEvent(new CustomEvent("mp:pdf-opened", { detail: { url, title } }));
    } catch (e) {
      void e;
    }
  }, []);

  const closePdf = useCallback(() => {
    setState({ isOpen: false, url: "", title: "" });
  }, []);

  const value = useMemo(() => ({ ...state, openPdf, closePdf }), [state, openPdf, closePdf]);

  return <PdfViewerContext.Provider value={value}>{children}</PdfViewerContext.Provider>;
}
