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
    completedIds,
    totalVideos,
    totalViews,
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
                    loadSavedProgress={loadSavedProgress}
                    isFiltering={isSearching}
                    completedIds={completedIds}
                />
            </div>

            <div className={styles.statsFooter}>
                <span>{totalVideos} lessons</span>
                <span>{totalViews} total views</span>
            </div>
        </aside>
    );
};

export default React.memo(Sidebar);
