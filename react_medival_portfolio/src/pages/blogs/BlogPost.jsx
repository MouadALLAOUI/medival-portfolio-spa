/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Clock, Calendar, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

import blogsMetadata from '../../data/blogs';
import { blogs as blogsData } from '../../data/blogs.data';
import { markdownToHtml } from '../../lib/utils/markdownToHtml';
import { useTheme } from '../../lib/contexts/ThemeProvider';
import { getMarkdownThemeClass } from '../../lib/markdown/markdownThemes';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import { useAchievements } from '../../lib/useAchievements';
import { useImageViewer } from '../../lib/useImageViewer';
import { formatDate } from '../../lib/utils/dateFormatter';
import { calculateReadingTime } from '../../lib/utils/readingTime';
import { isFirstVisit } from '../../lib/utils/visitTracker';
import { useReadingProgress } from '../../hooks/useReadingProgress';
import BlogCard from '../../components/BlogCard/BlogCard';
import BlogProgressBar from './BlogProgressBar';
import BlogCoverBanner from './BlogCoverBanner';
import BlogSidebar from './BlogSidebar';
import styles from './BlogPost.module.scss';

const blogs = blogsMetadata.map(meta => {
  const data = blogsData.find(d => d.id === meta.id);
  return {
    ...meta,
    slug: meta.id,
    blogcontent: {
      title: meta.title,
      content: data?.content || ''
    }
  };
});

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const sessionTrackedBlogs = new Set();

export default function BlogPost() {
  const { slug } = useParams();
  const { showAlert } = useAlerts();
  const { theme } = useTheme();
  const mdThemeClass = getMarkdownThemeClass(theme);
  const { t, language } = useSettings();
  const { openImage } = useImageViewer();
  const { unlockAchievement, incrementCounter } = useAchievements();
  const isTransitioningRef = useRef(false);
  const [fontScale, setFontScale] = useState(1);
  const [headings, setHeadings] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mp_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const isDev = import.meta.env.DEV;
  const visibleBlogs = blogs.filter((b) => !b.isDraft || isDev);
  const post = visibleBlogs.find((b) => b.slug === slug);
  const currentIndex = visibleBlogs.findIndex((b) => b.slug === slug);
  const prevPost = currentIndex > 0 ? visibleBlogs[currentIndex - 1] : visibleBlogs[visibleBlogs.length - 1];
  const nextPost = currentIndex < visibleBlogs.length - 1 ? visibleBlogs[currentIndex + 1] : visibleBlogs[0];
  const readTime = calculateReadingTime(post?.blogcontent?.content);
  const totalWords = post?.blogcontent?.content?.split(/\s+/).filter(Boolean).length || 0;

  const {
    contentRef,
    scrollProgress,
    readingProgress,
    timeLeft,
    activeId,
    resetProgress,
  } = useReadingProgress({ slug, post, totalWords, headings, isTransitioningRef });

  const wordCount = post?.blogcontent?.content
    ? post.blogcontent.content.split(/\s+/).filter(Boolean).length
    : 0;

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

  const handleShare = (platform) => {
    const shareUrl = window.location.href;
    const shareTitle = post?.title || 'Check out this scroll!';
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        navigator.clipboard.writeText(shareUrl).then(() => {
          showAlert(t('COMMON.alerts.copySuccess', { label: t('COMMON.contextMenu.urlLabel') }), 'success', 2000);
        });
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Reset scroll on slug change
  useLayoutEffect(() => {
    isTransitioningRef.current = true;
    const scrollContainer = document.getElementById('body-container');

    const doReset = () => {
      resetProgress();
      window.setTimeout(() => {
        setActiveId('');
        isTransitioningRef.current = false;
      }, 0);
    };

    if (!scrollContainer || scrollContainer.scrollTop === 0) {
      doReset();
      return;
    }

    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    const onScrollStep = () => {
      if (scrollContainer.scrollTop <= 2) {
        scrollContainer.removeEventListener('scroll', onScrollStep);
        window.clearTimeout(fallbackId);
        doReset();
      }
    };
    scrollContainer.addEventListener('scroll', onScrollStep, { passive: true });
    let fallbackId = window.setTimeout(() => {
      scrollContainer.removeEventListener('scroll', onScrollStep);
      doReset();
    }, 1500);

    return () => {
      scrollContainer.removeEventListener('scroll', onScrollStep);
      window.clearTimeout(fallbackId);
    };
  }, [slug, resetProgress]);

  useEffect(() => {
    if (!post) return;
    if (!sessionTrackedBlogs.has(slug)) {
      sessionTrackedBlogs.add(slug);
      unlockAchievement('read_blog_post');
      incrementCounter('blogs_read');
    }
    if (!isFirstVisit(`blog_${slug}`)) return;
    showAlert(t('BLOGS.post.enteringAlert'), 'greeting', 2000);
  }, [slug, showAlert, t, post, unlockAchievement, incrementCounter]);

  useEffect(() => {
    if (post) Prism.highlightAll();
  }, [post, slug]);

  useEffect(() => {
    if (!post || !contentRef.current) return;
    const timer = setTimeout(() => {
      const headingEls = contentRef.current.querySelectorAll('h2, h3');
      const parsed = Array.from(headingEls).map((el, i) => {
        const text = el.textContent || '';
        const id = el.id || `${slugify(text)}-${i}`;
        el.id = id;
        return { id, text, level: el.tagName.toLowerCase() };
      });
      setHeadings(parsed);
    }, 150);
    return () => clearTimeout(timer);
  }, [post, slug]);

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

  const relatedPosts = visibleBlogs
    .filter((b) => b.slug !== slug)
    .map((b) => {
      const matches = b.tags.filter((tag) => post?.tags.includes(tag)).length;
      return { post: b, matches };
    })
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 2)
    .map((item) => item.post);

  return (
    <div className={styles['postPage']}>
      <BlogProgressBar readingProgress={readingProgress} />

      <div className={styles.readingStats}>
        <span className={styles.statItem}>
          📖 {Math.round(readingProgress)}%
        </span>
        <span className={styles.statItem}>
          ⏱️ {timeLeft} {t('blogs.post.timeLeft')}
        </span>
      </div>

      {post ? (
        <div>
          <div className={styles['topActions']}>
            <div className={styles['navLinks']}>
              <Link to="/blogs" className={styles['back-link']}>
                <ArrowLeft size={14} />
                {t('BLOGS.post.backToLibrary')}
              </Link>
              <Link to="/home" className={styles['back-link']}>
                {t('BLOGS.post.backToHome')}
              </Link>
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

          <BlogCoverBanner post={post} readTime={readTime} />

          <div className={styles['postLayout']}>
            <main className={styles['mainContent']}>
              <div className={styles['readingToolbar']}>
                <div className={styles['toolbarLeft']}>
                  <span className={styles['toolbarText']}>📜 Scribe Size:</span>
                  <div className={styles['fontAdjusters']}>
                    <button
                      onClick={() => setFontScale(Math.max(0.85, fontScale - 0.05))}
                      disabled={fontScale <= 0.85}
                      className={styles['toolbarBtn']}
                      title="Decrease text size"
                      type="button"
                    >
                      A-
                    </button>
                    <span className={styles['fontScaleText']}>{Math.round(fontScale * 100)}%</span>
                    <button
                      onClick={() => setFontScale(Math.min(1.3, fontScale + 0.05))}
                      disabled={fontScale >= 1.3}
                      className={styles['toolbarBtn']}
                      title="Increase text size"
                      type="button"
                    >
                      A+
                    </button>
                  </div>
                </div>
                <div className={styles['toolbarRight']}>
                  <button
                    type="button"
                    className={`${styles['toolbarBookmark']} ${isBookmarked ? styles['bookmarked'] : ''}`}
                    onClick={toggleBookmark}
                    aria-label={isBookmarked ? t('BLOGS.post.bookmarkRemove') : t('BLOGS.post.bookmarkAdd')}
                  >
                    {isBookmarked ? '🔖 Bookmarked' : '🏷️ Bookmark Scroll'}
                  </button>
                </div>
              </div>

              <article
                className={`markdown-content ${mdThemeClass}`}
                ref={contentRef}
                style={{ fontSize: `${fontScale}rem` }}
              >
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.blogcontent.content) }} />
              </article>

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

              <nav className={styles['postNav']}>
                <Link to={`/blogs/${prevPost.slug}`} className={styles['postNavBtn']}>
                  <ArrowLeft size={16} />
                  {t('BLOGS.post.prev')}
                </Link>
                <Link to={`/blogs/${nextPost.slug}`} className={styles['postNavBtn']}>
                  {t('BLOGS.post.next')}
                  <ArrowRight size={16} />
                </Link>
              </nav>
            </main>

            <BlogSidebar
              post={post}
              headings={headings}
              activeId={activeId}
              scrollProgress={scrollProgress}
              readTime={readTime}
              wordCount={wordCount}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              showAlert={showAlert}
              visibleBlogs={visibleBlogs}
              handleShare={handleShare}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t('BLOGS.post.notFound')}</p>
          <Link to="/blogs" style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--accent)', fontWeight: 'bold' }}>{t('BLOGS.post.backToAllScrolls')}</Link>
        </div>
      )}

      <div className={styles.fixedPostNav}>
        {prevPost && (
          <Link to={`/blogs/${prevPost.slug}`} className={styles.fixedPostNavBtn}>
            ← {t('blogs.post.prevPost')}
            <span className={styles.fixedNavPostTitle}>{prevPost.title}</span>
          </Link>
        )}
        {nextPost && (
          <Link to={`/blogs/${nextPost.slug}`} className={`${styles.fixedPostNavBtn} ${styles.fixedPostNavBtnNext}`}>
            {t('blogs.post.nextPost')} →
            <span className={styles.fixedNavPostTitle}>{nextPost.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
