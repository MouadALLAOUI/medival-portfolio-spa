import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, BookMarked, Layers } from 'lucide-react';
import styles from './BlogsPage.module.scss';

export default function BlogFilterBar({ searchQuery, onSearchChange, activeTag, filterBookmarked, bookmarks, visibleTags, onTagClick, onBookmarkToggle, onShowAll, t }) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { el.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [visibleTags.length]);

  const SCROLL_ROW_LIMIT = 12;
  const showScrollRow = visibleTags.length > SCROLL_ROW_LIMIT;
  const scrollTags = showScrollRow ? visibleTags.slice(0, SCROLL_ROW_LIMIT) : visibleTags;
  const restTags = showScrollRow ? visibleTags.slice(SCROLL_ROW_LIMIT) : [];

  return (
    <section className={styles['filterSection']}>
      <div className={styles['searchBar']}>
        <Search className={styles['searchIcon']} size={20} />
        <input
          type="text"
          placeholder={t('BLOGS.list.searchPlaceholder') || "Search scrolls..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles['searchInput']}
        />
      </div>

      <div className={styles['primaryActions']}>
        <button
          className={`${styles['primaryBtn']} ${activeTag === null && !filterBookmarked ? styles['active'] : ''}`}
          onClick={onShowAll}
        >
          <Layers size={15} />
          {t('BLOGS.list.filterAll')}
        </button>
        <button
          className={`${styles['primaryBtn']} ${filterBookmarked ? styles['active'] : ''}`}
          onClick={onBookmarkToggle}
        >
          <BookMarked size={15} />
          {t('BLOGS.list.savedScrolls')}
          {bookmarks.length > 0 && <span className={styles['badge']}>{bookmarks.length}</span>}
        </button>
      </div>

      {showScrollRow && (
        <div className={styles['tagScrollWrap']}>
          <div
            ref={scrollRef}
            className={`${styles['tagScrollRow']} ${canScrollRight ? styles['hasMore'] : ''}`}
          >
            {scrollTags.map((tag) => (
              <button
                key={tag}
                className={`${styles['filterTag']} ${activeTag === tag ? styles['active'] : ''}`}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {!showScrollRow && (
        <div className={styles['tagInlineRow']}>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              className={`${styles['filterTag']} ${activeTag === tag ? styles['active'] : ''}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {restTags.length > 0 && (
        <div className={styles['filterToggle']}>
          <button
            className={styles['filterToggleBtn']}
            onClick={() => setExpanded(p => !p)}
            type="button"
          >
            {expanded ? (
              <>Show less <ChevronUp size={14} /></>
            ) : (
              <>+{restTags.length} more tags <ChevronDown size={14} /></>
            )}
          </button>
        </div>
      )}

      {expanded && restTags.length > 0 && (
        <div className={styles['tagExpandedGrid']}>
          {restTags.map((tag) => (
            <button
              key={tag}
              className={`${styles['filterTag']} ${activeTag === tag ? styles['active'] : ''}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
