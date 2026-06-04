/* eslint-disable no-unused-vars */
import { getAssetById } from '../../data/mediaManager';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, QrCode, Clock, Calendar, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, User, BookOpen, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  motion,
  AnimatePresence
} from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Or any other theme
// Import common languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

import blogsMetadata from '../../data/blogs';
import { blogs as blogsData } from '../../data/blogs.data';

// Merge metadata with content data
const blogs = blogsMetadata.map(meta => {
  const data = blogsData.find(d => d.id === meta.id);
  // console.log({ data });
  return {
    ...meta,
    slug: meta.id,
    blogcontent: {
      title: meta.title,
      content: data?.content || ''
    }
  };
});
import { markdownToHtml } from '../../lib/utils/markdownToHtml';
import { useTheme } from '../../lib/contexts/ThemeProvider';
import { getMarkdownThemeClass } from '../../lib/markdown/markdownThemes';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import { useAchievements } from '../../lib/useAchievements';
import { useImageViewer } from '../../lib/useImageViewer';
import { formatDate } from '../../lib/utils/dateFormatter';
import { calculateReadingTime } from '../../lib/utils/readingTime';
import BlogCard from '../../components/BlogCard/BlogCard';
import styles from './BlogPost.module.scss';
import { isFirstVisit } from '../../lib/utils/visitTracker';

// Custom high-fidelity inline SVGs replacing missing brand icon exports in newer lucide versions
const TwitterIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GRADIENTS = [
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // crystal blue
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // twilight purple
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // ruby rose
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // emerald teal
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // gold sun
  'linear-gradient(135deg, #f0c27b 0%, #4b1248 100%)', // royal sunset
];

const getCoverGradient = (id) => GRADIENTS[(id || 0) % GRADIENTS.length];

// Slugify helper for generating unique, readable element IDs for TOC
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const sessionTrackedBlogs = new Set();

// ── localStorage helpers for per-blog reading progress ──────────────────────
const BLOG_PROGRESS_KEY = 'mp_blog_progress';

const getBlogProgress = (slug) => {
  try {
    const map = JSON.parse(localStorage.getItem(BLOG_PROGRESS_KEY) || '{}');
    return typeof map[slug] === 'number' ? map[slug] : 0;
  } catch {
    return 0;
  }
};

const saveBlogProgress = (slug, progress) => {
  try {
    const map = JSON.parse(localStorage.getItem(BLOG_PROGRESS_KEY) || '{}');
    map[slug] = Math.round(progress);
    localStorage.setItem(BLOG_PROGRESS_KEY, JSON.stringify(map));
  } catch {
    // ignore write errors (private browsing, storage full, etc.)
  }
};
// ────────────────────────────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams();
  const { showAlert } = useAlerts();
  const { theme } = useTheme();
  const mdThemeClass = getMarkdownThemeClass(theme);
  const { t, language } = useSettings();
  const { openImage } = useImageViewer();
  const { unlockAchievement, incrementCounter } = useAchievements();
  const contentRef = useRef(null);
  const maxReadingProgressRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [_wordsRead, setWordsRead] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [fontScale, setFontScale] = useState(1);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
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

  const readTime = calculateReadingTime(post?.blogcontent?.content);

  // Calculate total words from markdown content
  const totalWords = post?.blogcontent?.content?.split(/\s+/).filter(Boolean).length || 0;

  const [showQR, setShowQR] = useState(false);

  // Reset all reading/scroll progress states when the blog post changes.
  // Keeps isTransitioningRef=true until the smooth scroll actually reaches the top,
  // preventing scroll events mid-animation from inflating the progress bar.
  useLayoutEffect(() => {
    isTransitioningRef.current = true;
    const scrollContainer = document.getElementById('body-container');

    const doReset = () => {
      // Restore the highest progress this user has ever reached for this slug
      const saved = getBlogProgress(slug);
      maxReadingProgressRef.current = saved;
      window.setTimeout(() => {
        setScrollProgress(saved);
        setReadingProgress(saved);
        const wordsReadSoFar = Math.floor((saved / 100) * totalWords);
        setWordsRead(wordsReadSoFar);
        setTimeLeft(calculateReadingTime(post?.blogcontent?.content) || 0);
        setActiveId('');
        setShowQR(false);
        isTransitioningRef.current = false;
      }, 0);
    };

    if (!scrollContainer || scrollContainer.scrollTop === 0) {
      // Already at top — nothing to animate, reset immediately
      doReset();
      return;
    }

    // Smooth scroll to top (preserves the animation the user sees)
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });

    // Release lock once scrollTop actually reaches 0
    const onScrollStep = () => {
      if (scrollContainer.scrollTop <= 2) {
        scrollContainer.removeEventListener('scroll', onScrollStep);
        window.clearTimeout(fallbackId);
        doReset();
      }
    };
    scrollContainer.addEventListener('scroll', onScrollStep, { passive: true });

    // Safety fallback: release after 1.5s if scroll events stop before reaching 0
    let fallbackId = window.setTimeout(() => {
      scrollContainer.removeEventListener('scroll', onScrollStep);
      doReset();
    }, 1500);

    return () => {
      scrollContainer.removeEventListener('scroll', onScrollStep);
      window.clearTimeout(fallbackId);
    };
  }, [slug, post, totalWords]);

  const shareUrl = window.location.href;
  const shareTitle = post?.title || 'Check out this scroll!';

  const handleShare = (platform) => {
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

    if (!sessionTrackedBlogs.has(slug)) {
      sessionTrackedBlogs.add(slug);
      unlockAchievement('read_blog_post');
      incrementCounter('blogs_read');
    }

    if (!isFirstVisit(`blog_${slug}`)) return;
    showAlert(t('BLOGS.post.enteringAlert'), 'greeting', 2000);
  }, [slug, showAlert, t, post, unlockAchievement, incrementCounter]);

  // Trigger PrismJS highlighting
  useEffect(() => {
    if (post) {
      Prism.highlightAll();
    }
  }, [post, slug]);

  // Parse HTML headings (h2, h3) inside the rendered post for Scroll-Spy and TOC
  useEffect(() => {
    if (!post || !contentRef.current) return;

    const timer = setTimeout(() => {
      const headingEls = contentRef.current.querySelectorAll('h2, h3');
      const parsed = Array.from(headingEls).map((el, i) => {
        const text = el.textContent || '';
        const id = el.id || `${slugify(text)}-${i}`;
        el.id = id; // Ensure the element has the ID set for direct anchor navigations
        return {
          id,
          text,
          level: el.tagName.toLowerCase(), // 'h2' or 'h3'
        };
      });
      setHeadings(parsed);
    }, 150);

    return () => clearTimeout(timer);
  }, [post, slug]);

  // Combined and RequestAnimationFrame (RAF) Throttled Scroll Listener
  useEffect(() => {
    if (!post) return;

    const scrollContainer = document.getElementById('body-container') || window;
    let ticking = false;

    const onScroll = () => {
      if (isTransitioningRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const content = contentRef.current;
          const scrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;

          // 1. Calculate reading progress & word metrics
          let progress = 0;
          if (content) {
            const contentTop = content.getBoundingClientRect().top + scrollTop;
            const contentHeight = content.offsetHeight;
            const scrolled = scrollTop - contentTop;

            const viewportHeight = scrollContainer === window ? window.innerHeight : scrollContainer.clientHeight;
            const maxScrollable = contentHeight - viewportHeight;

            if (maxScrollable > 0) {
              progress = Math.min(100, Math.max(0, (scrolled / maxScrollable) * 100));
            } else {
              progress = scrolled > 0 ? 100 : 0;
            }

            // Calculate high-water mark progress using Ref to prevent state updates during render
            const nextProgress = Math.max(maxReadingProgressRef.current, progress);
            if (nextProgress > maxReadingProgressRef.current) {
              maxReadingProgressRef.current = nextProgress;
              saveBlogProgress(slug, nextProgress);
            }

            setReadingProgress(nextProgress);
            setScrollProgress(nextProgress);

            const wordsReadSoFar = Math.floor((nextProgress / 100) * totalWords);
            setWordsRead(wordsReadSoFar);

            const wordsRemaining = totalWords - wordsReadSoFar;
            setTimeLeft(Math.ceil(wordsRemaining / 200));
          }

          // 2. Calculate Table of Contents Active Heading (Scroll-Spy)
          if (headings.length > 0) {
            const scrollPosition = scrollTop + 120;
            let currentActive = headings[0]?.id || '';

            for (let i = 0; i < headings.length; i++) {
              const el = document.getElementById(headings[i].id);
              if (el) {
                const top = el.getBoundingClientRect().top + scrollTop;
                if (scrollPosition >= top) {
                  currentActive = headings[i].id;
                } else {
                  break;
                }
              }
            }
            setActiveId(currentActive);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Fire once initially

    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, [post, headings, totalWords, slug]);

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

  // Extract static stats for sidebar grimoire details
  const wordCount = post?.blogcontent?.content
    ? post.blogcontent.content.split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className={styles['postPage']}>
      {/* Fixed progress bar at top of viewport - Candle Wick style */}
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBar}
          style={{ width: `${readingProgress}%` }}
        >
          {readingProgress > 0 && (
            <span className={styles.candleFlame}>🔥</span>
          )}
        </div>
        {/* Wax drips */}
        {readingProgress > 10 && (
          <div className={styles.waxDrips} style={{ width: `${readingProgress}%` }}>
            <span className={styles.drip} style={{ left: '15%', animationDelay: '0s' }} />
            <span className={styles.drip} style={{ left: '35%', animationDelay: '0.8s' }} />
            <span className={styles.drip} style={{ left: '55%', animationDelay: '1.6s' }} />
            <span className={styles.drip} style={{ left: '75%', animationDelay: '0.4s' }} />
            <span className={styles.drip} style={{ left: '92%', animationDelay: '1.2s' }} />
          </div>
        )}
      </div>

      {/* Fixed reading stats bottom-right */}
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
          {/* Back Nav Links & Bookmark Button */}
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

          {/* ── Visual Cover Banner ── */}
          <div
            className={styles['postCoverBanner']}
            style={{
              '--cover-gradient': getCoverGradient(post.id),
              backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined
            }}
          >
            <div className={styles['coverOverlay']} />
            <div className={styles['coverContent']}>
              {post.series && (
                <span className={styles['coverSeries']}>
                  📜 {post.series}
                </span>
              )}
              <h1 className={styles['coverTitle']}>
                <span className={styles['coverLogo']}>{post.logo}</span>
                {post.title}
              </h1>
              <div className={styles['coverMeta']}>
                <span>
                  <Calendar size={14} />
                  {t('BLOGS.post.pennedOn', { date: formatDate(post.date, t, language) })}
                </span>
                <span>
                  <Clock size={14} />
                  {t('BLOGS.list.readTime', { time: readTime })}
                </span>
              </div>
            </div>
          </div>

          {/* ── Two Column Layout ── */}
          <div className={styles['postLayout']}>

            {/* ── Left Column: Article Content ── */}
            <main className={styles['mainContent']}>

              {/* ── Reading Accessibility Toolbar ── */}
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

              {/* ── Article Text Content ── */}
              <article
                className={`markdown-content ${mdThemeClass}`}
                ref={contentRef}
                style={{ fontSize: `${fontScale}rem` }}
              >
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
                  <ArrowLeft size={16} />
                  {t('BLOGS.post.prev')}
                </Link>
                <Link
                  to={`/blogs/${nextPost.slug}`}
                  className={styles['postNavBtn']}
                >
                  {t('BLOGS.post.next')}
                  <ArrowRight size={16} />
                </Link>
              </nav>
            </main>

            {/* ── Right Column: Sidebar ── */}
            <aside className={styles['sidebar']}>

              {/* Scribe (Author) Widget */}
              <div className={styles['widget']}>
                <h4 className={styles['widgetTitle']}>
                  <User size={16} />
                  {t('BLOGS.post.aboutScribe') || 'About the Scribe'}
                </h4>
                <div className={styles['scribeInfo']}>
                  <div className={styles['scribeAvatarFrame']}>
                    <img
                      src={getAssetById('mouad-pic-png').path}
                      alt="Mouad the Coder"
                      className={styles['scribeAvatar']}
                      onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=Mouad'; }}
                    />
                  </div>
                  <h5 className={styles['scribeName']}>Mouad ALLAOUI</h5>
                  <p className={styles['scribeTitle']}>Full-Stack Developer & Cybersecurity Scholar</p>
                  <p className={styles['scribeBio']}>
                    Exploring the realms of front-end mechanics, secure infrastructure scripts, and gamified web application architectures.
                  </p>
                </div>
              </div>

              {/* Interactive Scroll-Spy Table of Contents (TOC) */}
              {headings.length > 0 && (
                <div className={styles['widget']}>
                  <h4 className={styles['widgetTitle']}>
                    <BookOpen size={16} />
                    {t('BLOGS.post.tableOfContents') || 'Scroll Map'}
                  </h4>
                  <nav className={styles['tocList']}>
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => {
                          const el = document.getElementById(heading.id);
                          if (el) {
                            const yOffset = -90; // spacing for sticky header bar
                            const scrollContainer = document.getElementById('body-container') || window;
                            const scrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
                            const y = el.getBoundingClientRect().top + scrollTop + yOffset;
                            scrollContainer.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                        className={`${styles['tocLink']} ${styles[heading.level]} ${activeId === heading.id ? styles['active'] : ''
                          }`}
                        type="button"
                      >
                        {heading.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Chronicle Stats & Circular Progress Widget */}
              <div className={styles['widget']}>
                <h4 className={styles['widgetTitle']}>
                  <FileText size={16} />
                  {t('BLOGS.post.scrollStats') || 'Chronicle Details'}
                </h4>
                <div className={styles['statsWidgetContent']}>
                  <div className={styles['progressCircleWrapper']}>
                    <svg className={styles['progressCircle']} viewBox="0 0 36 36">
                      <path
                        className={styles['progressCircleBg']}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={styles['progressCircleVal']}
                        strokeDasharray={`${scrollProgress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className={styles['progressCircleText']}>
                      <span className={styles['progressPercent']}>{Math.round(scrollProgress)}%</span>
                      <span className={styles['progressLabel']}>read</span>
                    </div>
                  </div>

                  <ul className={styles['statsList']}>
                    <li>
                      <span className={styles['statLabel']}>Penned:</span>
                      <span className={styles['statVal']}>{formatDate(post.date, t, language)}</span>
                    </li>
                    <li>
                      <span className={styles['statLabel']}>Reading:</span>
                      <span className={styles['statVal']}>{readTime}</span>
                    </li>
                    <li>
                      <span className={styles['statLabel']}>Length:</span>
                      <span className={styles['statVal']}>{wordCount} words</span>
                    </li>
                    <li>
                      <span className={styles['statLabel']}>Category:</span>
                      <span className={styles['statVal']}>{post.tags[0] || 'Lore'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Share Widget */}
              <div className={styles['widget']}>
                <h4 className={styles['widgetTitle']}>
                  <Share2 size={16} />
                  {t('BLOGS.post.shareScroll') || 'Share Chronicle'}
                </h4>
                <div className={styles['shareGrid']}>
                  <button onClick={() => handleShare('twitter')} aria-label="Share on Twitter" className={styles['shareBtn']}><TwitterIcon size={16} /> Twitter</button>
                  <button onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn" className={styles['shareBtn']}><LinkedinIcon size={16} /> LinkedIn</button>
                  <button onClick={() => handleShare('facebook')} aria-label="Share on Facebook" className={styles['shareBtn']}><FacebookIcon size={16} /> Facebook</button>
                  <button onClick={() => setShowQR(!showQR)} aria-label="Show QR Code" className={styles['shareBtn']}><QrCode size={16} /> QR Code</button>
                  <button onClick={() => handleShare('copy')} aria-label="Copy Link" className={styles['shareBtn']}><Share2 size={16} /> Copy URL</button>
                </div>
              </div>

              {/* Quick Navigation / Other posts */}
              <div className={styles['widget']}>
                <h4 className={styles['widgetTitle']}>
                  <BookOpen size={16} />
                  {t('BLOGS.post.quickLibrary') || 'Grimoire Library'}
                </h4>
                <div className={styles['quickLibrary']}>
                  {visibleBlogs.slice(0, 3).map((b) => (
                    <Link key={b.id} to={`/blogs/${b.slug}`} className={styles['libraryLink']}>
                      <span className={styles['libraryLogo']}>{b.logo}</span>
                      <span className={styles['libraryTitle']}>{b.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={styles['qrModal']}
                onClick={() => setShowQR(false)}
              >
                <div className={styles['qrContainer']} onClick={e => e.stopPropagation()}>
                  <h3>{t('BLOGS.post.qrTitle') || 'Scan Scroll'}</h3>
                  <div className={styles['qrWrapper']}>
                    <QRCodeSVG value={shareUrl} size={200} bgColor="transparent" fgColor="currentColor" />
                  </div>
                  <button onClick={() => setShowQR(false)}>{t('COMMON.settings.closeBtn')}</button>
                </div>
              </motion.div>
              // </motion.div>
            )}
          </AnimatePresence>


        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t('BLOGS.post.notFound')}</p>
          <Link to="/blogs" style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--accent)', fontWeight: 'bold' }}>{t('BLOGS.post.backToAllScrolls')}</Link>
        </div>
      )}
      {/* Fixed prev/next blog buttons */}
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
