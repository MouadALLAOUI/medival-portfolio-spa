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
        (key, params = null) => {
            const dict = translations[language] || translations.en;
            
            const getNested = (obj, path) => {
                return path.split('.').reduce((acc, part) => {
                    return acc && acc[part] !== undefined ? acc[part] : undefined;
                }, obj);
            };

            let val = getNested(dict, key);
            if (val === undefined) {
                val = getNested(translations.en, key);
            }

            if (val === undefined) return key;

            if (params && typeof params === 'object') {
                let interpolated = String(val);
                Object.entries(params).forEach(([k, v]) => {
                    interpolated = interpolated.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(v));
                });
                return interpolated;
            }

            return val;
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