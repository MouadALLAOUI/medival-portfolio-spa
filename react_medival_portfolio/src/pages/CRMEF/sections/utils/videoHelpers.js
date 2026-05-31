export const normalizeDifficulty = (difficulty) => {
    if (!difficulty) return 'Unknown';
    const label = difficulty.toString().trim().toLowerCase();
    switch (label) {
        case 'beginner':
        case 'débutant':
            return 'Beginner';
        case 'intermediate':
        case 'intermédiaire':
            return 'Intermediate';
        case 'advanced':
        case 'avancé':
            return 'Advanced';
        case 'formateur':
            return 'Formateur';
        default:
            return difficulty;
    }
};

export const parseViews = (views = 0) => {
    const value = String(views || '').trim().toUpperCase();
    if (value.endsWith('K')) return parseFloat(value.slice(0, -1)) * 1000;
    if (value.endsWith('M')) return parseFloat(value.slice(0, -1)) * 1000000;
    return Number(value.replace(/[, ]/g, '')) || 0;
};

export const formatViews = (views = 0) => {
    const count = Number(views) || 0;
    if (count < 1000) return `${count}`;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
};

export const formatDate = (rawDate) => {
    if (!rawDate) return 'Unknown date';
    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) return rawDate;
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const getYouTubeId = (url = '') => {
    const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? match[1] : null;
};

export const isYouTubeUrl = (url = '') => Boolean(getYouTubeId(url));

export const getProgressStorageKey = (videoId) => `crmef_video_progress_${videoId}`;

export const parseDuration = (duration) => {
    if (duration == null || duration === '') return '00:00';

    if (typeof duration === 'string') {
        const normalized = duration.trim();
        if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(normalized)) {
            const parts = normalized.split(':').map((part) => Number(part));
            if (parts.length === 2) {
                const [minutes, seconds] = parts;
                return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
            if (parts.length === 3) {
                const [hours, minutes, seconds] = parts;
                const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                const totalMinutes = Math.floor(totalSeconds / 60);
                const remainingSeconds = totalSeconds % 60;
                return `${String(totalMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            }
        }
    }

    const secondsValue = Number(duration);
    if (Number.isNaN(secondsValue)) return '00:00';

    const totalSeconds = Math.max(0, Math.floor(secondsValue));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatDurationHuman = (secondsOrMinutes) => {
    if (secondsOrMinutes == null) return 'Unknown';
    // assume input is seconds if > 1800 else minutes
    const value = Number(secondsOrMinutes) || 0;
    let totalSeconds = value;
    if (value < 1000 && value > 180) { // likely seconds over 3 minutes
        totalSeconds = value;
    } else if (value <= 180) {
        // treat as minutes
        totalSeconds = value * 60;
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

export const formatRelativeDate = (rawDate) => {
    if (!rawDate) return 'Unknown';
    const then = new Date(rawDate).getTime();
    if (Number.isNaN(then)) return rawDate;
    const now = Date.now();
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 2629800) return `${Math.floor(diff / 604800)}w ago`;
    return formatDate(rawDate);
};
