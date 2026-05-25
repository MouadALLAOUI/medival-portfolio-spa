import { useContext } from "react";
import { ImageViewerContext } from "./contexts/imageViewer.context";

export function useImageViewer() {
    const ctx = useContext(ImageViewerContext);
    if (!ctx) throw new Error("useImageViewer must be used within ImageViewerProvider");
    return ctx;
}
