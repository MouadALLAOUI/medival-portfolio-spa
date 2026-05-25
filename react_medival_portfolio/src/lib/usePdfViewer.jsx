import { useContext } from "react";
import { PdfViewerContext } from "./contexts/pdfViewer.context";

export function usePdfViewer() {
    const ctx = useContext(PdfViewerContext);
    if (!ctx) throw new Error("usePdfViewer must be used within PdfViewerProvider");
    return ctx;
}
