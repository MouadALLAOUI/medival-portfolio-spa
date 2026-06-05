import { useCallback, useEffect, useMemo, useState } from "react";
import { SettingsContext } from "./settings.context"
import { translations } from "../../strings/translations";

const WEATHER_OPTIONS = ['none', 'snow', 'rain', 'leaves', 'fog', 'lightning'];

export default function SettingsProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem("mp_theme") || "night")
    const [language, setLanguage] = useState(() => localStorage.getItem("mp_lang") || "fr");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Additional settings
    const [markdownTheme, setMarkdownTheme] = useState(() => localStorage.getItem("mp_markdown_theme") || "default");
    const [customCursor, setCustomCursor] = useState(() => localStorage.getItem("mp_custom_cursor") !== "false");
    const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("mp_sound_enabled") === "true");
    const [medievalFont, setMedievalFont] = useState(() => localStorage.getItem("mp_medieval_font") || "MedievalSharp");
    const [weather, setWeather] = useState(() => localStorage.getItem("mp_weather") || "none");

    // Accessibility & Optimization settings
    const [fontSize, setFontSize] = useState(() => localStorage.getItem("mp_font_size") || "medium");
    const [animationLevel, setAnimationLevel] = useState(() => localStorage.getItem("mp_animation_level") || "normal");

    const reducedMotion = animationLevel === 'light';
    const setReducedMotion = useCallback((val) => {
        setAnimationLevel(val ? 'light' : 'normal');
    }, []);

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

    // Apply animation level and reduced motion
    useEffect(() => {
        document.documentElement.setAttribute('data-animation-level', animationLevel);
        document.documentElement.setAttribute('data-reduced-motion', reducedMotion ? 'true' : 'false');
        localStorage.setItem("mp_animation_level", animationLevel);
        localStorage.setItem("mp_reduced_motion", String(reducedMotion));
    }, [animationLevel, reducedMotion]);

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

    // Apply and persist medieval font
    useEffect(() => {
        const fontsMap = {
            MedievalSharp: "'MedievalSharp', cursive",
            Fell: "'IM Fell English SC', serif",
            Almendra: "'Almendra', serif",
            Uncial: "'Uncial Antiqua', cursive",
        };
        const fontVal = fontsMap[medievalFont] || fontsMap.MedievalSharp;
        document.documentElement.style.setProperty('--font-medieval', fontVal);
        localStorage.setItem("mp_medieval_font", medievalFont);
    }, [medievalFont]);

    // Persist weather
    useEffect(() => {
        localStorage.setItem("mp_weather", weather);
    }, [weather]);

    const t = useCallback(
        (key, params = null) => {
            const dict = translations[language] || translations.en;

            const getNested = (obj, path) => {
                const parts = path.split('.');
                return parts.reduce((acc, part) => {
                    if (!acc) return undefined;
                    if (acc[part] !== undefined) return acc[part];

                    // Case fallbacks
                    const upperPart = part.toUpperCase();
                    if (acc[upperPart] !== undefined) return acc[upperPart];

                    const lowerPart = part.toLowerCase();
                    if (acc[lowerPart] !== undefined) return acc[lowerPart];

                    return undefined;
                }, obj);
            };

            let val = getNested(dict, key);
            if (val === undefined && language !== 'en') {
                val = getNested(translations.en, key);
            }

            if (val === undefined) {
                // Return last key segment readable (never the full dot-path)
                const segments = key.split('.');
                return segments[segments.length - 1];
            }

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
            animationLevel,
            setAnimationLevel,
            markdownTheme,
            setMarkdownTheme,
            customCursor,
            setCustomCursor,
            soundEnabled,
            setSoundEnabled,
            medievalFont,
            setMedievalFont,
            weather,
            setWeather,
            isSettingsOpen,
            openSettings,
            closeSettings,
            t
        }),
        [theme, language, fontSize, reducedMotion, setReducedMotion, animationLevel, markdownTheme, customCursor, soundEnabled, medievalFont, weather, isSettingsOpen, openSettings, closeSettings, t]
    );
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}