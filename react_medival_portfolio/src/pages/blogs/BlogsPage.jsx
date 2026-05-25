import { useState, useEffect, useRef } from 'react';
import { blogs, blogTags } from '../../data/blogs.data';
import { useAlerts } from '../../lib/useAlerts';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogsPage.module.scss';
import { isFirstVisit } from '../../lib/utils/visitTracker';

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const { showAlert } = useAlerts();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(null);
  const [showScroll, setShowScroll] = useState(true);
  const filterRef = useRef(null);

  useEffect(() => {
    if (!isFirstVisit('blogs')) return;
    showAlert('Welcome to my Treasures, hope you find whatever you desire', 'royal', 3000);
    showAlert('These blogs are still under development — thank you for your understanding', 'chaos', 4500);
  }, [showAlert]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

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

  const filteredBlogs = activeTag
    ? blogs.filter((b) => b.tags.includes(activeTag))
    : blogs;

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className={styles['blogs-page']}>

      {/* ── Intro Banner ── */}
      <section className={styles['blogsHero']}>
        <div className={styles['blogsHeroInner']}>
          <h1 className={styles['scroll-title']}>📜 The Scribe's Chronicles</h1>
          <div className={styles['intro-container-desc']}>
            <h2>Welcome, Traveler!</h2>
            <p>
              Herein lies my collection of arcane knowledge, coding adventures, and technical
              grimoires. These scrolls contain the wisdom I've gathered throughout my journey in
              the mystical realms of programming. May they guide you on your own quest for knowledge.
            </p>
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

      {/* ── Tag Filter Bar ── */}
      <section ref={filterRef} className={styles['filterBar']}>
        <button
          className={`${styles['filterTag']} ${activeTag === null ? styles['active'] : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All Scrolls
        </button>
        {blogTags.map((tag) => (
          <button
            key={tag}
            className={`${styles['filterTag']} ${activeTag === tag ? styles['active'] : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </section>

      {/* ── Blog Grid ── */}
      <section className={styles['blogs']}>
        <div className={styles['container-blogs']} id="blog-posts">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <p className={styles['no-results']}>No scrolls found for this tag.</p>
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
