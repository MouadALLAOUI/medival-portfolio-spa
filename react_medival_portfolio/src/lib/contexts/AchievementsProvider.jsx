import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AchievementsContext } from "./achievements.context.js";
import { achievements as definitions } from "../../data/achievements";
import { readAchievementsState, writeAchievementsState } from "../utils/achievementsStorage";

const initialState = {
    version: 1,
    updatedAt: Date.now(),
    stats: {
        visitedPaths: [],
        blogsRead: 0,
        pdfOpened: 0,
    },
    progress: {},
    completedAt: {},
};

function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}

function getAchievementProgress(def, state) {
    const saved = state.progress[def.id];
    if (def.type === "counter") {
        const current = typeof saved?.current === "number" ? saved.current : 0;
        return { current, target: def.target, percent: def.target ? clamp(current / def.target, 0, 1) : 0 };
    }
    if (def.type === "checklist") {
        const steps = Array.isArray(def.steps) ? def.steps : [];
        const checked = Array.isArray(saved?.checked) ? saved.checked : [];
        const doneCount = steps.reduce((acc, _, i) => acc + (checked[i] ? 1 : 0), 0);
        const percent = steps.length ? clamp(doneCount / steps.length, 0, 1) : 0;
        return { current: doneCount, target: steps.length, percent };
    }
    const done = Boolean(saved?.done);
    return { current: done ? 1 : 0, target: 1, percent: done ? 1 : 0 };
}

function isCompleted(def, state) {
    const p = getAchievementProgress(def, state);
    return p.percent >= 1;
}

export default function AchievementsProvider({ children }) {
    const [state, setState] = useState(initialState);
    const saveTimerRef = useRef(null);
    const stateRef = useRef(state);

    const updateState = useCallback((fn) => {
        setState((prev) => {
            const next = fn(prev);
            if (!next || typeof next !== "object") return prev;
            if (next === prev) return prev;

            const nextCompletedAt = { ...(next.completedAt || {}) };
            const prevCompletedAt = prev.completedAt || {};

            for (const def of definitions) {
                const wasCompleted = Boolean(prevCompletedAt[def.id]);
                const nowCompleted = isCompleted(def, next);
                if (!wasCompleted && nowCompleted) nextCompletedAt[def.id] = Date.now();
            }

            return { ...next, completedAt: nextCompletedAt };
        });
    }, []);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const loaded = await readAchievementsState();
            if (cancelled) return;
            if (loaded && typeof loaded === "object") {
                setState((prev) => {
                    const merged = { ...prev, ...loaded };
                    const visitedCount = Array.isArray(merged.stats?.visitedPaths) ? merged.stats.visitedPaths.length : 0;
                    const blogsRead = typeof merged.stats?.blogsRead === "number" ? merged.stats.blogsRead : 0;
                    const pdfOpened = typeof merged.stats?.pdfOpened === "number" ? merged.stats.pdfOpened : 0;
                    return {
                        ...merged,
                        progress: {
                            ...(merged.progress || {}),
                            explorer: { ...(merged.progress?.explorer || {}), current: visitedCount },
                            scribe: { ...(merged.progress?.scribe || {}), current: blogsRead },
                            librarian: { ...(merged.progress?.librarian || {}), current: pdfOpened },
                        },
                    };
                });
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => {
            writeAchievementsState({ ...state, updatedAt: Date.now() });
        }, 250);
        return () => {
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        };
    }, [state]);

    useEffect(() => {
        const onPdfOpened = () => {
            updateState((prev) => {
                const nextCount = (prev.stats.pdfOpened || 0) + 1;
                return {
                    ...prev,
                    stats: { ...prev.stats, pdfOpened: nextCount },
                    progress: { ...prev.progress, librarian: { ...(prev.progress.librarian || {}), current: nextCount } },
                };
            });
        };
        const onBlogOpened = () => {
            updateState((prev) => {
                const nextCount = (prev.stats.blogsRead || 0) + 1;
                return {
                    ...prev,
                    stats: { ...prev.stats, blogsRead: nextCount },
                    progress: { ...prev.progress, scribe: { ...(prev.progress.scribe || {}), current: nextCount } },
                };
            });
        };

        window.addEventListener("mp:pdf-opened", onPdfOpened);
        window.addEventListener("mp:blog-opened", onBlogOpened);
        return () => {
            window.removeEventListener("mp:pdf-opened", onPdfOpened);
            window.removeEventListener("mp:blog-opened", onBlogOpened);
        };
    }, [updateState]);

    const setCounter = useCallback((id, current) => {
        updateState((prev) => ({
            ...prev,
            progress: { ...prev.progress, [id]: { ...(prev.progress[id] || {}), current: Math.max(0, current) } },
        }));
    }, [updateState]);

    const setChecklistStep = useCallback((id, stepIndex, checked) => {
        updateState((prev) => {
            const prevChecked = Array.isArray(prev.progress[id]?.checked) ? prev.progress[id].checked : [];
            const nextChecked = prevChecked.slice();
            nextChecked[stepIndex] = Boolean(checked);
            return { ...prev, progress: { ...prev.progress, [id]: { ...(prev.progress[id] || {}), checked: nextChecked } } };
        });
    }, [updateState]);

    const setBoolean = useCallback((id, done) => {
        updateState((prev) => ({
            ...prev,
            progress: { ...prev.progress, [id]: { ...(prev.progress[id] || {}), done: Boolean(done) } },
        }));
    }, [updateState]);

    const resetAchievement = useCallback((id) => {
        updateState((prev) => {
            const nextProgress = { ...prev.progress };
            const nextCompletedAt = { ...prev.completedAt };
            delete nextProgress[id];
            delete nextCompletedAt[id];
            return { ...prev, progress: nextProgress, completedAt: nextCompletedAt };
        });
    }, [updateState]);

    const resetAll = useCallback(() => {
        updateState((prev) => ({ ...initialState, stats: prev.stats }));
    }, [updateState]);

    const trackVisit = useCallback((path) => {
        const normalized = String(path || "");
        if (!normalized) return;

        updateState((prev) => {
            const visited = Array.isArray(prev.stats.visitedPaths) ? prev.stats.visitedPaths : [];
            if (visited.includes(normalized)) return prev;
            const nextVisited = [...visited, normalized];
            const nextProgress = { ...prev.progress, explorer: { ...(prev.progress.explorer || {}), current: nextVisited.length } };
            if (normalized.includes("#presentation") || normalized === "/#presentation" || normalized === "/") {
                nextProgress.craftsman = { ...(prev.progress.craftsman || {}), done: true };
            }
            return { ...prev, stats: { ...prev.stats, visitedPaths: nextVisited }, progress: nextProgress };
        });
    }, [updateState]);

    const exportState = useCallback(() => JSON.stringify(stateRef.current, null, 2), []);

    const importState = useCallback((jsonText) => {
        const parsed = (() => {
            try {
                return JSON.parse(jsonText);
            } catch {
                return null;
            }
        })();

        if (!parsed || typeof parsed !== "object") return false;
        updateState((prev) => ({ ...prev, ...parsed }));
        return true;
    }, [updateState]);

    const value = useMemo(
        () => ({
            state,
            definitions,
            getAchievementProgress: (id) => {
                const def = definitions.find((d) => d.id === id);
                if (!def) return { current: 0, target: 0, percent: 0 };
                return getAchievementProgress(def, state);
            },
            isCompleted: (id) => {
                const def = definitions.find((d) => d.id === id);
                return def ? isCompleted(def, state) : false;
            },
            setCounter,
            setChecklistStep,
            setBoolean,
            resetAchievement,
            resetAll,
            trackVisit,
            exportState,
            importState,
        }),
        [state, setCounter, setChecklistStep, setBoolean, resetAchievement, resetAll, trackVisit, exportState, importState]
    );

    return <AchievementsContext.Provider value={value}>{children}</AchievementsContext.Provider>;
}
