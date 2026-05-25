import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AchievementsContext } from "./achievements.context.js";
import { achievements as definitions } from "../../data/achievements";
import { readAchievementsState, writeAchievementsState } from "../utils/achievementsStorage";
import GET_ENV from "../../config/env";
import setCookie, { getCookie } from "../utils/cookies";
import { useAlerts } from "../useAlerts";

const env = GET_ENV();

async function triggerTrackMe(ip, agent, page, referrer) {
  if (!env.API_URL) return;
  try {
    const response = await fetch(`${env.API_URL}/track.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${env.API_KEY}`,
      },
      body: JSON.stringify({ ip, agent, page, referrer, time: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log("✅ Tracking Response:", data);
  } catch (error) {
    console.error("❌ Tracking Error:", error);
  }
}


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
    const { showAlert } = useAlerts();
    const [state, setState] = useState(initialState);
    const saveTimerRef = useRef(null);
    const stateRef = useRef(state);

    useEffect(() => {
        const dailyVisited = getCookie("dailyVisitHome");
        const userAgent = navigator.userAgent;
        const referrer = document.referrer || "Direct visit";
        
        if (!dailyVisited) {
            const today = new Date().toISOString().split("T")[0];
            setCookie("dailyVisitHome", today, { expiresAtMidnight: true });
            showAlert("Welcome to my palace, hope you find whatever you desire", "royal", 3000);
            showAlert("this portfolio is still under development thank you for your understanding", "chaos", 4000);
            showAlert("current section under development is projects", "info", 4000);
            
            let ip = "0.0.0.0";
            fetch("https://api.ipify.org?format=json")
                .then(res => res.json())
                .then(data => {
                    ip = data.ip || "0.0.0.0";
                    triggerTrackMe(ip, userAgent, "home", referrer);
                })
                .catch(() => {
                    triggerTrackMe(ip, userAgent, "home", referrer);
                });
        } else {
            showAlert("Welcome back", "greeting", 2000);
        }
    }, [showAlert]);


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

    const prevCompletedAtRef = useRef({});

    useEffect(() => {
        const prevCompleted = prevCompletedAtRef.current;
        const currentCompleted = state.completedAt || {};

        for (const def of definitions) {
            if (currentCompleted[def.id] && !prevCompleted[def.id]) {
                showAlert(`🏆 Achievement Unlocked: ${def.title} — ${def.desc}`, "success", 4000);
            }
        }
        prevCompletedAtRef.current = currentCompleted;
    }, [state.completedAt, showAlert]);

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
