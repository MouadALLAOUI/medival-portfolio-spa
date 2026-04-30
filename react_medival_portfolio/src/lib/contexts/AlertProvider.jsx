import { useCallback, useMemo, useRef, useState } from "react";
import { AlertContext } from "./alert.context";

const typeToIcon = {
    success: "🧿",
    warning: "⚠️",
    error: "💀",
    info: "📜",
    quest: "🗡️",
    arcane: "🔮",
    divine: "🌟",
    royal: "👑",
    cursed: "☠️",
    neutral: "🕯️",
    chaos: "🔥",
    greeting: "👋",
}

export default function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([]);
    const counterRef = useRef(1);

    const removeAlert = useCallback((id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const dismissAlert = useCallback(
        (id) => {
            setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isLeaving: true } : a)));
            window.setTimeout(() => removeAlert(id), 500);
        },
        [removeAlert]
    );

    const showAlert = useCallback(
        (message, type = "info", durationMs = 3000) => {
            const id = counterRef.current++;
            const icon = typeToIcon[type] || "✨";
            setAlerts((prev) => [{ id, message, type, icon, isLeaving: false }, ...prev]);
            window.setTimeout(() => dismissAlert(id), durationMs);
            return id;
        },
        [dismissAlert]
    );

    const value = useMemo(() => ({ alerts, showAlert, dismissAlert }), [alerts, showAlert, dismissAlert]);

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;

}