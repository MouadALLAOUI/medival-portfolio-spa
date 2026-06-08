import { useState, useEffect, useRef, useMemo } from 'react';
import blogsMetadata from '../../data/blogs';
import { blogs as blogsData } from '../../data/blogs.data';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import { useAchievements } from '../../lib/useAchievements';
import BlogCard from '../../components/BlogCard/BlogCard';
import BlogFilterBar from './BlogFilterBar';
import styles from './BlogsPage.module.scss';
import { isFirstVisit } from '../../lib/utils/visitTracker';

const blogs = blogsMetadata.map(meta => {
  const data = blogsData.find(d => d.id === meta.id);
  return { ...meta, slug: meta.id, blogcontent: { title: meta.title, content: data?.content || '' } };
});

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
    try { return JSON.parse(localStorage.getItem('mp_bookmarks') || '[]'); } catch { return []; }
  });
  const [filterBookmarked, setFilterBookmarked] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    unlockAchievement('visited_blogs');
    if (!isFirstVisit('blogs')) return;
    showAlert(t('BLOGS.list.welcomeAlertConsolidated'), 'royal', 5000);
  }, [showAlert, t, unlockAchievement]);

  useEffect(() => { setCurrentPage(1); }, [activeTag, filterBookmarked, searchQuery]);

  useEffect(() => {
    const bodyContainer = document.getElementById('body-container') || window;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = bodyContainer.scrollTop !== undefined ? bodyContainer.scrollTop : window.scrollY;
          setShowScroll(scrollTop < 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    bodyContainer.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => bodyContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFilters = () => filterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleToggleBookmark = (slug) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(slug);
      const updated = isBookmarked ? prev.filter((s) => s !== slug) : [...prev, slug];
      showAlert(isBookmarked ? t('BLOGS.post.bookmarkRemovedAlert') : t('BLOGS.post.bookmarkAddedAlert'), isBookmarked ? 'chaos' : 'royal', 2500);
      localStorage.setItem('mp_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isDev = import.meta.env.DEV;

  const filteredBlogs = useMemo(() => {
    const visibleBlogs = blogs.filter((b) => !b.isDraft || isDev);
    return visibleBlogs.filter((blog) => {
      const translatedTitle = t(`DATA.blogs.${blog.id}.title`) || blog.title;
      const translatedDesc = t(`DATA.blogs.${blog.id}.desc`) || blog.desc;
      const matchesSearch = translatedTitle.toLowerCase().includes(searchQuery.toLowerCase()) || translatedDesc.toLowerCase().includes(searchQuery.toLowerCase()) || blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = activeTag ? blog.tags.includes(activeTag) : true;
      const matchesBookmark = filterBookmarked ? bookmarks.includes(blog.slug) : true;
      return matchesSearch && matchesTag && matchesBookmark;
    });
  }, [searchQuery, activeTag, filterBookmarked, bookmarks, isDev, t]);

  const visibleTags = useMemo(() => {
    const visibleBlogs = blogs.filter((b) => !b.isDraft || isDev);
    return [...new Set(visibleBlogs.flatMap((b) => b.tags))];
  }, [isDev]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className={styles['blogs-page']}>
      <section className={styles['blogsHero']}>
        <div className={styles['blogsHeroInner']}>
          <h1 className={styles['scroll-title']}>{t('BLOGS.list.title')}</h1>
          <div className={styles['intro-container-desc']}>
            <h2>{t('BLOGS.list.welcomeTitle')}</h2>
            <p>{t('BLOGS.list.welcomeDesc')}</p>
          </div>
        </div>
      </section>

      <div className={`${styles['scrollIndicator']} ${!showScroll ? styles['hidden'] : ''}`} onClick={scrollToFilters} aria-label="Scroll to filter bar" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToFilters(); }}>
        <div className={styles['scrollMouse']}><div className={styles['scrollWheel']} /></div>
      </div>

      <div ref={filterRef}>
        <BlogFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTag={activeTag}
          filterBookmarked={filterBookmarked}
          bookmarks={bookmarks}
          visibleTags={visibleTags}
          onTagClick={(tag) => { setActiveTag(prev => prev === tag ? null : tag); setFilterBookmarked(false); }}
          onBookmarkToggle={() => { setFilterBookmarked(!filterBookmarked); setActiveTag(null); }}
          onShowAll={() => { setActiveTag(null); setFilterBookmarked(false); }}
          t={t}
        />
      </div>

      <section className={styles['blogs']}>
        <div className={styles['container-blogs']} id="blog-posts">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} isBookmarked={bookmarks.includes(blog.slug)} onToggleBookmark={handleToggleBookmark} />
            ))
          ) : (
            <p className={styles['no-results']}>{filterBookmarked ? t('BLOGS.list.noSavedScrolls') : t('BLOGS.list.noResults')}</p>
          )}
        </div>
      </section>

      {totalPages > 1 && (
        <section className={styles['pagination']}>
          <button className={styles['pageBtn']} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page">&lt;</button>
          {(() => {
            const pages = [];
            const addPage = (p) => pages.push({ type: 'page', value: p });
            const addDots = (key) => pages.push({ type: 'dots', key });

            addPage(1);

            if (totalPages <= 7) {
              for (let i = 2; i <= totalPages; i++) addPage(i);
            } else {
              if (currentPage > 3) addDots('start-dots');

              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);
              for (let i = start; i <= end; i++) addPage(i);

              if (currentPage < totalPages - 2) addDots('end-dots');

              addPage(totalPages);
            }

            return pages.map((item, i) =>
              item.type === 'dots'
                ? <span key={item.key} className={styles['pageDots']}>…</span>
                : <button key={item.value} className={`${styles['pageBtn']} ${item.value === currentPage ? styles['active'] : ''}`} onClick={() => setCurrentPage(item.value)} aria-label={`Page ${item.value}`}>{item.value}</button>
            );
          })()}
          <button className={styles['pageBtn']} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page">&gt;</button>
        </section>
      )}
    </div>
  );
}
