import React from 'react';
import styles from '../CrmefVideosPage.module.scss';

const SearchAndFilters = ({
    searchQuery,
    activeCategory,
    categories,
    sortOption,
    selectedLevel,
    selectedLanguage,
    selectedLanguageOptions,
    selectedSeries,
    seriesOptions,
    showFavoritesOnly,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onLevelChange,
    onLanguageChange,
    onSeriesChange,
    onToggleFavoritesOnly,
    isSearching,
}) => {
    return (
        <div className={styles.searchPanel}>
            <div className={styles.searchInputGroup}>
                <input
                    type="search"
                    placeholder="Search CRMEF videos"
                    value={searchQuery}
                    onChange={(event) => onSearchChange(event.target.value)}
                    className={styles.searchInput}
                />
                <span className={styles.searchHint}>{isSearching ? 'Filtering...' : 'Filter by title, topic or speaker'}</span>
            </div>

            <div className={styles.filterGroup}>
                <div className={styles.filterBlock}>
                    <span className={styles.filterLabel}>Category</span>
                    <div className={styles.filterOptions}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`${styles.filterButton} ${activeCategory === category ? styles.filterButtonActive : ''}`}
                                onClick={() => onCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterBlock}>
                    <span className={styles.filterLabel}>Sort</span>
                    <select value={sortOption} onChange={(event) => onSortChange(event.target.value)} className={styles.filterSelect}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="mostViewed">Most Viewed</option>
                        <option value="duration">Longest</option>
                    </select>
                </div>

                <div className={styles.filterBlock}>
                    <span className={styles.filterLabel}>Series</span>
                    <select value={selectedSeries} onChange={(event) => onSeriesChange(event.target.value)} className={styles.filterSelect}>
                        <option value="All">All series</option>
                        {seriesOptions.filter((series) => series !== 'All').map((series) => (
                            <option key={series} value={series}>{series}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterBlock}>
                    <span className={styles.filterLabel}>Level</span>
                    <select value={selectedLevel} onChange={(event) => onLevelChange(event.target.value)} className={styles.filterSelect}>
                        <option value="All">All levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Formateur">Formateur</option>
                    </select>
                </div>

                <div className={styles.filterBlock}>
                    <span className={styles.filterLabel}>Language</span>
                    <select value={selectedLanguage} onChange={(event) => onLanguageChange(event.target.value)} className={styles.filterSelect}>
                        <option value="All">All languages</option>
                        {Array.isArray(selectedLanguageOptions) && selectedLanguageOptions
                            .filter((language) => language && language !== 'All')
                            .sort()
                            .map((language) => (
                                <option key={language} value={language}>{language}</option>
                            ))}
                    </select>
                </div>
            </div>

            <div className={styles.filterToggleRow}>
                <button type="button" className={`${styles.filterButton} ${showFavoritesOnly ? styles.filterButtonActive : ''}`} onClick={onToggleFavoritesOnly}>
                    {showFavoritesOnly ? 'Bookmarks only' : 'Show bookmarks'}
                </button>
            </div>

            <div className={styles.metaRow}>
                <span>{categories.length} categories</span>
                <span>{activeCategory === 'All' ? 'Showing all categories' : `Filtered by ${activeCategory}`}</span>
            </div>
        </div>
    );
};

export default React.memo(SearchAndFilters);
