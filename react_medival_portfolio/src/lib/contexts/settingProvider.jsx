import { useCallback, useEffect, useMemo, useState } from "react";
import { SettingsContext } from "./settings.context"
import { translations } from "../../strings/translations";

export default function SettingsProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem("mp_theme") || "night")
    const [language, setLanguage] = useState(() => localStorage.getItem("mp_lang") || "en");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Additional settings
    const [markdownTheme, setMarkdownTheme] = useState(() => localStorage.getItem("mp_markdown_theme") || "default");
    const [customCursor, setCustomCursor] = useState(() => localStorage.getItem("mp_custom_cursor") !== "false");
    const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("mp_sound_enabled") === "true");

    // Accessibility settings
    const [fontSize, setFontSize] = useState(() => localStorage.getItem("mp_font_size") || "medium");
    const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem("mp_reduced_motion") === "true");

    useEffect(() => {
        document.documentElement.dataset.theme = theme === "day" ? "day" : "night";
        localStorage.setItem("mp_theme", theme === "day" ? "day" : "night");
    }, [theme])

    useEffect(() => {
        const resolved = translations[language] ? language : "en";
        document.documentElement.lang = resolved;
        document.documentElement.dir = resolved === "ar" ? "rtl" : "ltr";
        localStorage.setItem("mp_lang", resolved);
    }, [language]);

    // Apply font size
    useEffect(() => {
        const sizes = { small: '14px', medium: '16px', large: '18px' };
        document.documentElement.style.setProperty('--base-font-size', sizes[fontSize] || '16px');
        localStorage.setItem("mp_font_size", fontSize);
    }, [fontSize]);

    // Apply reduced motion
    useEffect(() => {
        document.documentElement.setAttribute('data-reduced-motion', reducedMotion ? 'true' : 'false');
        localStorage.setItem("mp_reduced_motion", String(reducedMotion));
    }, [reducedMotion]);

    // Persist markdown theme
    useEffect(() => {
        localStorage.setItem("mp_markdown_theme", markdownTheme);
    }, [markdownTheme]);

    // Apply custom cursor
    useEffect(() => {
        document.documentElement.setAttribute('data-custom-cursor', customCursor ? 'true' : 'false');
        localStorage.setItem("mp_custom_cursor", String(customCursor));
    }, [customCursor]);

    // Persist sound enabled
    useEffect(() => {
        localStorage.setItem("mp_sound_enabled", String(soundEnabled));
    }, [soundEnabled]);

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
            fontSize,
            setFontSize,
            reducedMotion,
            setReducedMotion,
            markdownTheme,
            setMarkdownTheme,
            customCursor,
            setCustomCursor,
            soundEnabled,
            setSoundEnabled,
            isSettingsOpen,
            openSettings,
            closeSettings,
            t
        }),
        [theme, language, fontSize, reducedMotion, markdownTheme, customCursor, soundEnabled, isSettingsOpen, openSettings, closeSettings, t]
    );
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}