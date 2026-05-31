import React, { useMemo } from 'react';
import SearchAndFilters from './SearchAndFilters';
import VideoPlaylist from './VideoPlaylist';
import styles from '../CrmefVideosPage.module.scss';

const Sidebar = ({
    videos,
    selectedVideoId,
    activeCategory,
    categories,
    sortOption,
    selectedLevel,
    selectedLanguage,
    selectedLanguageOptions,
    selectedSeries,
    seriesOptions,
    showFavoritesOnly,
    favorites,
    onToggleFavorite,
    watchLater,
    watchLaterVideos,
    onToggleWatchLater,
    featuredVideos,
    recentVideos,
    searchQuery,
    isSearching,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onLevelChange,
    onLanguageChange,
    onSeriesChange,
    onToggleFavoritesOnly,
    loadSavedProgress,
    onSelectVideo,
    progressSummary,
}) => {
    const sortedCategories = useMemo(() => [...categories].sort(), [categories]);

    return (
        <aside className={styles.sidebarCard}>
            <SearchAndFilters
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                categories={sortedCategories}
                sortOption={sortOption}
                selectedLevel={selectedLevel}
                selectedLanguage={selectedLanguage}
                selectedLanguageOptions={selectedLanguageOptions}
                selectedSeries={selectedSeries}
                seriesOptions={seriesOptions}
                showFavoritesOnly={showFavoritesOnly}
                onSearchChange={onSearchChange}
                onCategoryChange={onCategoryChange}
                onSortChange={onSortChange}
                onLevelChange={onLevelChange}
                onLanguageChange={onLanguageChange}
                onSeriesChange={onSeriesChange}
                onToggleFavoritesOnly={onToggleFavoritesOnly}
                isSearching={isSearching}
            />

            {progressSummary && (
                <div className={styles.sidebarSection}>
                    <div className={styles.sidebarHeader}>
                        <h3>Progress</h3>
                        <span>{videos.length} lessons</span>
                    </div>
                    <div className={styles.progressSummaryGrid}>
                        <div className={styles.progressStat}>
                            <strong>{progressSummary.completed}</strong>
                            <span>Completed</span>
                        </div>
                        <div className={styles.progressStat}>
                            <strong>{progressSummary.inProgress}</strong>
                            <span>In progress</span>
                        </div>
                        <div className={styles.progressStat}>
                            <strong>{progressSummary.notStarted}</strong>
                            <span>Not started</span>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.sidebarSection}>
                <div className={styles.sidebarHeader}>
                    <h3>Playlist</h3>
                    <span>{videos.length} videos</span>
                </div>
                <VideoPlaylist
                    videos={videos}
                    selectedVideoId={selectedVideoId}
                    onSelect={onSelectVideo}
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                    watchLater={watchLater}
                    onToggleWatchLater={onToggleWatchLater}
                    loadSavedProgress={loadSavedProgress}
                    isFiltering={isSearching}
                />
            </div>

            {featuredVideos?.length > 0 && (
                <div className={styles.sidebarSection}>
                    <div className={styles.sidebarHeader}>
                        <h3>Featured</h3>
                    </div>
                    <div className={styles.featuredGrid}>
                        {featuredVideos.map((video) => (
                            <div
                                key={video.id}
                                role="button"
                                tabIndex={0}
                                className={styles.featuredCard}
                                onClick={() => onSelectVideo(video)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        onSelectVideo(video);
                                    }
                                }}
                                aria-label={`Open featured lesson ${video.title}`}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img src={video.thumbnail} alt={video.title} className={styles.featuredThumb} />
                                    <button
                                        type="button"
                                        className={`${styles.thumbnailFavoriteBtn} ${favorites?.includes(video.id) ? styles.bookmarkedThumb : ''}`}
                                        aria-label={favorites?.includes(video.id) ? 'Remove bookmark' : 'Bookmark featured lesson'}
                                        onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(video.id); }}
                                    >
                                        ★
                                    </button>
                                </div>
                                <div>
                                    <strong>{video.title}</strong>
                                    <small>{video.category || video.series}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {watchLaterVideos?.length > 0 && (
                <div className={styles.sidebarSection}>
                    <div className={styles.sidebarHeader}>
                        <h3>Watch Later</h3>
                        <span>{watchLaterVideos.length} saved</span>
                    </div>
                    <div className={styles.watchLaterList}>
                        {watchLaterVideos.map((video) => (
                            <button key={video.id} type="button" className={styles.watchLaterCard} onClick={() => onSelectVideo(video)}>
                                <span>{video.title}</span>
                                <small>{video.series || video.category}</small>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {recentVideos?.length > 0 && (
                <div className={styles.sidebarSection}>
                    <div className={styles.sidebarHeader}>
                        <h3>Recently Watched</h3>
                    </div>
                    <div className={styles.recentGrid}>
                        {recentVideos.map((video) => (
                            <button key={video.id} type="button" className={styles.recentCard} onClick={() => onSelectVideo(video)}>
                                <span>{video.title}</span>
                                <small>{video.series || video.category}</small>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default React.memo(Sidebar);
