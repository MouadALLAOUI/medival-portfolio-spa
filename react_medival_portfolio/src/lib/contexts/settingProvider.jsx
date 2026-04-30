import { useCallback, useEffect, useMemo, useState } from "react";
import { SettingsContext } from "./settings.context"
import { translations } from "../../strings/translations";

export default function SettingsProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem("mp_theme") || "night")
    const [language, setLanguage] = useState(() => localStorage.getItem("mp_lang") || "en");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = theme === "day" ? "day" : "night";
        localStorage.setItem("mp_theme", theme === "day" ? "day" : "night");
    }, [theme])

    useEffect(() => {
        const resolved = language === "fr" ? "fr" : "en";
        document.documentElement.lang = resolved;
        localStorage.setItem("mp_lang", resolved);
    }, [language]);

    const t = useCallback(
        (key) => {
            const dict = translations[language] || translations.en;
            return dict[key] || translations.en[key] || key;
        },
        [language]
    );

    const openSettings = useCallback(() => setIsSettingsOpen(true), []);
    const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            language,
            setLanguage,
            isSettingsOpen,
            openSettings,
            closeSettings,
            t
        }),
        [theme, language, isSettingsOpen, openSettings, closeSettings, t]
    );
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}