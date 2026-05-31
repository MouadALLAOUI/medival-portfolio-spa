import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getProgressStorageKey } from '../utils/videoHelpers';

const FAVORITES_KEY = 'crmef_academy_favorites';
const RECENTLY_WATCHED_KEY = 'crmef_academy_recently_watched';
const WATCH_LATER_KEY = 'crmef_academy_watch_later';

const safeParse = (value) => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

export default function useVideoProgress() {
    const [favorites, setFavorites] = useState([]);
    const [recentlyWatched, setRecentlyWatched] = useState([]);
    const [watchLater, setWatchLater] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const lastSavedAt = useRef(0);

    useEffect(() => {
        const storedFavorites = safeParse(localStorage.getItem(FAVORITES_KEY)) || [];
        const storedRecent = safeParse(localStorage.getItem(RECENTLY_WATCHED_KEY)) || [];
        const storedWatchLater = safeParse(localStorage.getItem(WATCH_LATER_KEY)) || [];

        setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
        setRecentlyWatched(Array.isArray(storedRecent) ? storedRecent : []);
        setWatchLater(Array.isArray(storedWatchLater) ? storedWatchLater : []);
    }, []);

    const saveProgress = useCallback((videoId, currentTime, duration, viewed = false) => {
        if (!videoId) return;
        const now = Date.now();
        if (now - lastSavedAt.current < 2000) return;
        lastSavedAt.current = now;

        const progress = {
            currentTime: Number(currentTime || 0),
            duration: Number(duration || 0),
            viewed: Boolean(viewed),
            updatedAt: now,
        };

        localStorage.setItem(getProgressStorageKey(videoId), JSON.stringify(progress));
        setRefreshKey((key) => key + 1);
    }, []);

    const markCompleted = useCallback((videoId, currentTime, duration) => {
        saveProgress(videoId, currentTime, duration, true);
    }, [saveProgress]);

    const toggleFavorite = useCallback((videoId) => {
        if (!videoId) return;
        setFavorites((previous) => {
            const updated = previous.includes(videoId)
                ? previous.filter((id) => id !== videoId)
                : [...previous, videoId];

            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const toggleWatchLater = useCallback((videoId) => {
        if (!videoId) return;
        setWatchLater((previous) => {
            const updated = previous.includes(videoId)
                ? previous.filter((id) => id !== videoId)
                : [...previous, videoId];

            localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const trackRecentlyWatched = useCallback((video) => {
        if (!video?.id) return;
        setRecentlyWatched((previous) => {
            const next = [video.id, ...previous.filter((id) => id !== video.id)].slice(0, 10);
            const isSame = previous.length === next.length && previous.every((id, index) => id === next[index]);
            if (isSame) return previous;
            localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const savedProgressMap = useMemo(() => ({ refreshKey }), [refreshKey]);

    const loadSavedProgress = useCallback((videoId) => {
        if (!videoId) return null;
        const raw = localStorage.getItem(getProgressStorageKey(videoId));
        try {
            return JSON.parse(raw) || null;
        } catch {
            return null;
        }
    }, []);

    return {
        favorites,
        recentlyWatched,
        watchLater,
        savedProgressMap,
        loadSavedProgress,
        saveProgress,
        markCompleted,
        toggleFavorite,
        toggleWatchLater,
        trackRecentlyWatched,
    };
}
