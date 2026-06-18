/* eslint-disable react-hooks/purity */
import React, { useMemo, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { parseDuration, formatViews, formatRelativeDate } from '../utils/videoHelpers';
import styles from '../CrmefVideosPage.module.scss';
import { loadSingleAsset } from '../../../../lib/utils/assetUtils';

const ITEM_HEIGHT = 90;
const OVERSCAN = 5;

const VirtualizedPlaylist = ({ videos, selectedVideoId, onSelect, favorites, onToggleFavorite, watchLater, onToggleWatchLater, loadSavedProgress, completedIds }) => {
    const containerRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);
    const visibleCount = 6;
    const totalHeight = videos.length * ITEM_HEIGHT;

    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(videos.length, startIndex + visibleCount + OVERSCAN * 2);
    const offsetTop = startIndex * ITEM_HEIGHT;

    const visibleItems = videos.slice(startIndex, endIndex);

    return (
        <div
            ref={containerRef}
            className={styles.playlistScroller}
            onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
            style={{ minHeight: '360px' }}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${offsetTop}px)`, position: 'absolute', width: '100%' }}>
                    {visibleItems.map((video) => (
                        <PlaylistItem
                            key={video.id}
                            video={video}
                            selected={video.id === selectedVideoId}
                            onSelect={onSelect}
                            favorites={favorites}
                            onToggleFavorite={onToggleFavorite}
                            watchLater={watchLater}
                            onToggleWatchLater={onToggleWatchLater}
                            loadSavedProgress={loadSavedProgress}
                            completedIds={completedIds}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PlaylistItem = React.memo(({ video, selected, onSelect, favorites, onToggleFavorite, watchLater, onToggleWatchLater, loadSavedProgress, completedIds }) => {
    const isBookmarked = Array.isArray(favorites) && favorites.includes(video.id);
    const isWatchLater = Array.isArray(watchLater) && watchLater.includes(video.id);
    const progress = loadSavedProgress ? loadSavedProgress(video.id) : null;
    const percent = progress && progress.duration ? Math.min(100, Math.round((progress.currentTime / progress.duration) * 100)) : 0;
    const isNew = (() => {
        if (!video.date) return false;
        const diff = (Date.now() - new Date(video.date).getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 14;
    })();
    const isPopular = (() => {
        const v = Number(video.views) || 0;
        return v >= 10000;
    })();

    const previewText = video.description
        ? `${video.description.slice(0, 120)}${video.description.length > 120 ? '…' : ''}`
        : 'No preview available.';
    const previewTopics = Array.isArray(video.topics) ? video.topics.slice(0, 3).join(', ') : '';

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(video);
        }
    };

    return (
        <article
            role="button"
            tabIndex={0}
            className={`${styles.playlistItem} ${selected ? styles.playlistItemActive : ''}`}
            onClick={() => onSelect(video)}
            onKeyDown={handleKeyDown}
            aria-label={`Select lesson ${video.title}`}
        >
            <div className={styles.thumbnailWrapper}>
                <img
                    src={video.thumbnail || video.poster || loadSingleAsset("blogs-html-css-cover", "image").path}
                    alt={video.title}
                    className={styles.thumbnailImg}
                    loading="lazy"
                />
                <span className={styles.durationTag}>{parseDuration(video.duration)}</span>

                <button
                    type="button"
                    className={`${styles.thumbnailFavoriteBtn} ${isBookmarked ? styles.bookmarkedThumb : ''}`}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(video.id); }}
                >
                    ★
                </button>

                <button
                    type="button"
                    className={`${styles.thumbnailFavoriteBtn} ${isWatchLater ? styles.bookmarkedThumb : ''}`}
                    style={{ left: 40 }}
                    aria-label={isWatchLater ? 'Remove from watch later' : 'Add to watch later'}
                    onClick={(e) => { e.stopPropagation(); onToggleWatchLater?.(video.id); }}
                >
                    ⏱
                </button>

                {selected && (
                    <div className={styles.playingOverlay}>
                        <Play size={20} />
                    </div>
                )}

                <div className={styles.thumbnailProgress}>
                    <div className={styles.thumbnailProgressFill} style={{ width: `${percent}%` }} />
                </div>

                <div className={styles.statusBadges}>
                    {video.featured && <span className={styles.statusBadge}>Featured</span>}
                    {isNew && <span className={styles.statusBadge}>New</span>}
                    {isPopular && <span className={styles.statusBadge}>Popular</span>}
                </div>
            </div>
            <div className={styles.previewCard} aria-hidden="true">
                <strong className={styles.previewTitle}>Quick preview</strong>
                <p className={styles.previewText}>{previewText}</p>
                <div className={styles.previewMeta}>
                    <span>{video.level || 'Level unknown'}</span>
                    <span>{parseDuration(video.duration)}</span>
                </div>
                {previewTopics ? <div className={styles.previewTags}>{previewTopics}</div> : null}
            </div>
            <div className={styles.playlistInfo}>
                <div className={styles.playlistTitleRow}>
                    <span className={styles.playlistItemTitle}>{video.title}</span>
                    {completedIds?.has(video.id) && <span className={styles.completedDot}>✓</span>}
                </div>
                <span className={styles.playlistItemAuthor}>{video.category} • {video.level}</span>
                <div className={styles.playlistItemStats}>
                    <span>{formatViews(video.views)}</span>
                    <span>•</span>
                    <span>{formatRelativeDate(video.date)}</span>
                </div>
            </div>
        </article>
    );
});

const VideoPlaylist = ({ videos, selectedVideoId, onSelect, isFiltering, favorites, onToggleFavorite, watchLater, onToggleWatchLater, loadSavedProgress, completedIds }) => {
    const sortedVideos = useMemo(() => videos, [videos]);

    if (isFiltering && videos.length === 0) {
        return <div className={styles.playlistEmpty}>No matching videos found.</div>;
    }

    if (videos.length > 100) {
        return <VirtualizedPlaylist videos={sortedVideos} selectedVideoId={selectedVideoId} onSelect={onSelect} favorites={favorites} onToggleFavorite={onToggleFavorite} watchLater={watchLater} onToggleWatchLater={onToggleWatchLater} loadSavedProgress={loadSavedProgress} completedIds={completedIds} />;
    }

    return (
        <div className={styles.playlistGrid}>
            {sortedVideos.map((video) => (
                <PlaylistItem
                    key={video.id}
                    video={video}
                    selected={video.id === selectedVideoId}
                    onSelect={onSelect}
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                    watchLater={watchLater}
                    onToggleWatchLater={onToggleWatchLater}
                    loadSavedProgress={loadSavedProgress}
                    completedIds={completedIds}
                />
            ))}
        </div>
    );
};

export default React.memo(VideoPlaylist);
