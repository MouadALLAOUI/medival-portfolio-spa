import React, { useState } from 'react';
import { Filter } from 'lucide-react';
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
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className={styles.searchPanel}>
            <input
                type="search"
                placeholder="Search CRMEF videos"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className={styles.searchInput}
            />

            <div className={styles.filterToggle}>
                <button
                    type="button"
                    className={`${styles.filterToggleBtn} ${showFilters ? styles.filterToggleBtnActive : ''}`}
                    onClick={() => setShowFilters((v) => !v)}
                >
                    <Filter size={14} /> Filters
                </button>
                <button
                    type="button"
                    className={`${styles.filterToggleBtn} ${showFavoritesOnly ? styles.filterToggleBtnActive : ''}`}
                    onClick={onToggleFavoritesOnly}
                >
                    {showFavoritesOnly ? '★ Bookmarks' : '☆ Bookmarks'}
                </button>
                {isSearching && <span className={styles.searchHint}>Filtering...</span>}
            </div>

            {showFilters && (
                <div className={styles.compactFilterRow}>
                    <select value={sortOption} onChange={(event) => onSortChange(event.target.value)} className={styles.compactSelect}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="mostViewed">Most viewed</option>
                        <option value="duration">Longest</option>
                    </select>
                    <select value={selectedSeries} onChange={(event) => onSeriesChange(event.target.value)} className={styles.compactSelect}>
                        <option value="All">Series</option>
                        {seriesOptions.filter((s) => s !== 'All').map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <select value={selectedLevel} onChange={(event) => onLevelChange(event.target.value)} className={styles.compactSelect}>
                        <option value="All">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Formateur">Formateur</option>
                    </select>
                    <select value={selectedLanguage} onChange={(event) => onLanguageChange(event.target.value)} className={styles.compactSelect}>
                        <option value="All">Language</option>
                        {Array.isArray(selectedLanguageOptions) && selectedLanguageOptions
                            .filter((l) => l && l !== 'All')
                            .sort()
                            .map((l) => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                    </select>
                </div>
            )}

            {showFilters && categories.length > 1 && (
                <div className={styles.compactFilterRow}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`${styles.filterToggleBtn} ${activeCategory === category ? styles.filterToggleBtnActive : ''}`}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default React.memo(SearchAndFilters);
