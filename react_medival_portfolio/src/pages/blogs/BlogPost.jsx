import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../../data/blogs.data';
import { markdownToHtml } from '../../lib/utils/markdownToHtml';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import { useCodeCopy } from '../../lib/hooks/useCodeCopy';
import { useImageViewer } from '../../lib/useImageViewer';
import { formatDate } from '../../lib/utils/dateFormatter';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogPost.module.scss';
import { isFirstVisit } from '../../lib/utils/visitTracker';

export default function BlogPost() {
  const { slug } = useParams();
  const { showAlert } = useAlerts();
  const { t, language } = useSettings();
  const { copyCode } = useCodeCopy();
  const { openImage } = useImageViewer();
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mp_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // Filter drafts unless in local development environment
  const isDev = import.meta.env.DEV;
  const visibleBlogs = blogs.filter((b) => !b.isDraft || isDev);

  const post = visibleBlogs.find((b) => b.slug === slug);
  const currentIndex = visibleBlogs.findIndex((b) => b.slug === slug);

  const prevPost = currentIndex > 0 ? visibleBlogs[currentIndex - 1] : visibleBlogs[visibleBlogs.length - 1];
  const nextPost = currentIndex < visibleBlogs.length - 1 ? visibleBlogs[currentIndex + 1] : visibleBlogs[0];

  // Select top 2 related posts sharing matching tags
  const relatedPosts = visibleBlogs
    .filter((b) => b.slug !== slug)
    .map((b) => {
      const matches = b.tags.filter((tag) => post?.tags.includes(tag)).length;
      return { post: b, matches };
    })
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 2)
    .map((item) => item.post);

  const isBookmarked = bookmarks.includes(slug);

  const toggleBookmark = () => {
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((s) => s !== slug);
      showAlert(t('BLOGS.post.bookmarkRemovedAlert'), 'chaos', 2500);
    } else {
      updated = [...bookmarks, slug];
      showAlert(t('BLOGS.post.bookmarkAddedAlert'), 'royal', 2500);
    }
    setBookmarks(updated);
    localStorage.setItem('mp_bookmarks', JSON.stringify(updated));
  };

  useEffect(() => {
    if (!post) return;
    if (!isFirstVisit(`blog_${slug}`)) return;
    showAlert(t('BLOGS.post.enteringAlert'), 'greeting', 2000);
  }, [slug, showAlert, t, post]);

  // Delegate copy-btn and inline-code clicks within the rendered markdown
  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const copyBtn = target.closest('.copy-btn');
      if (copyBtn instanceof HTMLElement) {
        const targetId = copyBtn.getAttribute('data-target');
        if (!targetId) return;
        const codeEl = document.getElementById(targetId);
        if (!codeEl) return;
        copyCode(codeEl.textContent || '', 'spellbook');
        return;
      }

      if (target.classList.contains('inline-code')) {
        target.classList.add('copied');
        copyCode(target.textContent || '', 'inline scroll');
        window.setTimeout(() => target.classList.remove('copied'), 1200);
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [copyCode]);

  // Scroll Progress handler
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Wire images inside the rendered markdown to open in ImageViewer
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const imgs = container.querySelectorAll('img');
    imgs.forEach((img) => {
      img.style.cursor = 'pointer';
      img.title = 'Click to enlarge';
      const handler = () => openImage(img.src);
      img.addEventListener('click', handler);
      img._clickHandler = handler;
    });

    return () => {
      imgs.forEach((img) => {
        if (img._clickHandler) {
          img.removeEventListener('click', img._clickHandler);
          delete img._clickHandler;
        }
      });
    };
  }, [post, openImage]);

  return (
    <div className={styles['postPage']}>
      {/* Scroll Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
      </div>

      {post ? (
        <>
          {/* Back Nav Links & Bookmark Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <Link to="/blogs" className={styles['back-link']}>{t('BLOGS.post.backToLibrary')}</Link>
              <Link to="/home" className={styles['back-link']}>{t('BLOGS.post.backToHome')}</Link>
            </div>
            <button
              type="button"
              className={`${styles['bookmark-btn']} ${isBookmarked ? styles['bookmarked'] : ''}`}
              onClick={toggleBookmark}
              aria-label={isBookmarked ? t('BLOGS.post.bookmarkRemove') : t('BLOGS.post.bookmarkAdd')}
            >
              {isBookmarked ? '🔖 ' + t('BLOGS.post.bookmarkRemove').replace('🔥 ', '') : '🏷️ ' + t('BLOGS.post.bookmarkAdd').replace('✨ ', '')}
            </button>
          </div>

          {/* ── Post Header ── */}
          <header className={styles['postHeader']}>
            <h1 className={styles['postTitle']}>
              {post.logo} {post.title}
            </h1>
            <div className={styles['postMeta']}>
              <span>{t('BLOGS.post.pennedOn', { date: formatDate(post.date, t, language) })}</span>
              <span>⏱ {t('BLOGS.list.readTime', { time: post.readTime.replace(' min read', '') })}</span>
              {post.tags.map((tag) => (
                <span key={tag} className={styles['tag-pill']}>{tag}</span>
              ))}
            </div>
          </header>

          {/* ── Post Cover Image ── */}
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className={styles['postCover']}
              loading="lazy"
            />
          )}

          {/* ── Article Content ── */}
          <article className="markdown-content" ref={contentRef}>
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.blogcontent.content) }} />
          </article>

          {/* ── Related scrolls ── */}
          {relatedPosts.length > 0 && (
            <section className={styles['relatedSection']}>
              <h3 className={styles['relatedTitle']}>
                {t('BLOGS.post.relatedTitle') || '📖 You Might Also Like'}
              </h3>
              <div className={styles['relatedGrid']}>
                {relatedPosts.map((relatedBlog) => (
                  <BlogCard
                    key={relatedBlog.id}
                    blog={relatedBlog}
                    isBookmarked={bookmarks.includes(relatedBlog.slug)}
                    onToggleBookmark={(slugToToggle) => {
                      let updated;
                      if (bookmarks.includes(slugToToggle)) {
                        updated = bookmarks.filter((s) => s !== slugToToggle);
                        showAlert(t('BLOGS.post.bookmarkRemovedAlert'), 'chaos', 2500);
                      } else {
                        updated = [...bookmarks, slugToToggle];
                        showAlert(t('BLOGS.post.bookmarkAddedAlert'), 'royal', 2500);
                      }
                      setBookmarks(updated);
                      localStorage.setItem('mp_bookmarks', JSON.stringify(updated));
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Prev / Next Navigation ── */}
          <nav className={styles['postNav']}>
            <Link
              to={`/blogs/${prevPost.slug}`}
              className={styles['postNavBtn']}
            >
              &lt; {t('BLOGS.post.prev')}
            </Link>
            <Link
              to={`/blogs/${nextPost.slug}`}
              className={styles['postNavBtn']}
            >
              {t('BLOGS.post.next')} &gt;
            </Link>
          </nav>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t('BLOGS.post.notFound')}</p>
          <Link to="/blogs" style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--accent)', fontWeight: 'bold' }}>{t('BLOGS.post.backToAllScrolls')}</Link>
        </div>
      )}
    </div>
  );
}

