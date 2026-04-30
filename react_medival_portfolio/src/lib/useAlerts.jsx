import { useContext } from "react";
import { AlertContext } from "./contexts/alert.context";

export function useAlerts() {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlerts must be used within AlertProvider");
    return ctx;
}

