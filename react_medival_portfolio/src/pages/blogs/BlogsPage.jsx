import { useState, useEffect, useRef, useMemo } from 'react';
import { Search } from 'lucide-react';
import { blogs, blogTags } from '../../data/blogs.data';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import { useAchievements } from '../../lib/useAchievements';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogsPage.module.scss';
import { isFirstVisit } from '../../lib/utils/visitTracker';

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const { showAlert } = useAlerts();
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScroll, setShowScroll] = useState(true);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mp_bookmarks') || '[]');
    } catch {
      return [];
    }
  });
  const [filterBookmarked, setFilterBookmarked] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    unlockAchievement('visited_blogs');
    if (!isFirstVisit('blogs')) return;
    showAlert(t('BLOGS.list.welcomeAlertConsolidated'), 'royal', 5000);
  }, [showAlert, t, unlockAchievement]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag, filterBookmarked, searchQuery]);

  // Handle scroll to hide scroll indicator
  useEffect(() => {
    const bodyContainer = document.getElementById('body-container') || window;
    const handleScroll = () => {
      const scrollTop = bodyContainer.scrollTop !== undefined ? bodyContainer.scrollTop : window.scrollY;
      setShowScroll(scrollTop < 100);
    };
    bodyContainer.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => bodyContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFilters = () => {
    filterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleToggleBookmark = (slug) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(slug);
      let updated;
      if (isBookmarked) {
        updated = prev.filter((s) => s !== slug);
        showAlert(t('BLOGS.post.bookmarkRemovedAlert'), 'chaos', 2500);
      } else {
        updated = [...prev, slug];
        showAlert(t('BLOGS.post.bookmarkAddedAlert'), 'royal', 2500);
      }
      localStorage.setItem('mp_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isDev = import.meta.env.DEV;
  
  const filteredBlogs = useMemo(() => {
    const visibleBlogs = blogs.filter((b) => !b.isDraft || isDev);
    
    return visibleBlogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           blog.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = activeTag ? blog.tags.includes(activeTag) : true;
      const matchesBookmark = filterBookmarked ? bookmarks.includes(blog.slug) : true;
      
      return matchesSearch && matchesTag && matchesBookmark;
    });
  }, [searchQuery, activeTag, filterBookmarked, bookmarks, isDev]);

  const visibleTags = useMemo(() => {
    const visibleBlogs = blogs.filter((b) => !b.isDraft || isDev);
    return [...new Set(visibleBlogs.flatMap((b) => b.tags))];
  }, [isDev]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setFilterBookmarked(false);
  };

  return (
    <div className={styles['blogs-page']}>

      {/* ── Intro Banner ── */}
      <section className={styles['blogsHero']}>
        <div className={styles['blogsHeroInner']}>
          <h1 className={styles['scroll-title']}>{t('BLOGS.list.title')}</h1>
          <div className={styles['intro-container-desc']}>
            <h2>{t('BLOGS.list.welcomeTitle')}</h2>
            <p>{t('BLOGS.list.welcomeDesc')}</p>
          </div>
        </div>
      </section>

      {/* ── Scroll Down Hint ── */}
      <div
        className={`${styles['scrollIndicator']} ${!showScroll ? styles['hidden'] : ''}`}
        onClick={scrollToFilters}
        aria-label="Scroll to filter bar"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToFilters(); }}
      >
        <div className={styles['scrollMouse']}>
          <div className={styles['scrollWheel']} />
        </div>
      </div>

      {/* ── Search & Tag Filter Bar ── */}
      <section ref={filterRef} className={styles['filterSection']}>
        <div className={styles['searchBar']}>
          <Search className={styles['searchIcon']} size={20} />
          <input
            type="text"
            placeholder={t('BLOGS.list.searchPlaceholder') || "Search scrolls..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles['searchInput']}
          />
        </div>
        
        <div className={styles['filterBar']}>
          <button
            className={`${styles['filterTag']} ${activeTag === null && !filterBookmarked ? styles['active'] : ''}`}
            onClick={() => {
              setActiveTag(null);
              setFilterBookmarked(false);
            }}
          >
            {t('BLOGS.list.filterAll')}
          </button>
          <button
            className={`${styles['filterTag']} ${filterBookmarked ? styles['active'] : ''}`}
            onClick={() => {
              setFilterBookmarked(!filterBookmarked);
              setActiveTag(null);
            }}
          >
            📖 {t('BLOGS.list.savedScrolls')} ({bookmarks.length})
          </button>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              className={`${styles['filterTag']} ${activeTag === tag ? styles['active'] : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className={styles['blogs']}>
        <div className={styles['container-blogs']} id="blog-posts">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isBookmarked={bookmarks.includes(blog.slug)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))
          ) : (
            <p className={styles['no-results']}>
              {filterBookmarked ? t('BLOGS.list.noSavedScrolls') : t('BLOGS.list.noResults')}
            </p>
          )}
        </div>
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <section className={styles['pagination']}>
          <button
            className={styles['pageBtn']}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles['pageBtn']} ${page === currentPage ? styles['active'] : ''}`}
              onClick={() => setCurrentPage(page)}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          ))}

          <button
            className={styles['pageBtn']}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </section>
      )}
    </div>
  );
}

