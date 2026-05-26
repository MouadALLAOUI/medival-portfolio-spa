import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, QrCode, Clock, Calendar, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, User, BookOpen, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Or any other theme
// Import common languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

import { blogs } from '../../data/blogs.data';
import { markdownToHtml } from '../../lib/utils/markdownToHtml';
import { useAppSettings } from '../../lib/contexts/AppSettingsContext';
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

export default function BlogPost() {
  const { slug } = useParams();
  const { showAlert } = useAlerts();
  const { markdownTheme } = useAppSettings() || { markdownTheme: 'default' };
  const mdThemeClass = getMarkdownThemeClass(markdownTheme);
  const { t, language } = useSettings();
  const { openImage } = useImageViewer();
  const { unlockAchievement, incrementCounter } = useAchievements();
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  const [showQR, setShowQR] = useState(false);

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
    unlockAchievement('read_blog_post');
    incrementCounter('blogs_read');
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

  // Table of Contents Scroll-Spy Event Listener
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120; // 120px offset for top headers and spacing
      let currentActive = headings[0]?.id || '';

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActive = headings[i].id;
          } else {
            break;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Call immediately on load/change

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [headings]);



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

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Extract static stats for sidebar grimoire details
  const wordCount = post?.blogcontent?.content
    ? post.blogcontent.content.split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className={styles['postPage']}>
      {/* Scroll Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
      </div>

      {post ? (
        <>
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
                      src="/assets/mouad-pic-CgPENtaP.png" 
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
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                        className={`${styles['tocLink']} ${styles[heading.level]} ${
                          activeId === heading.id ? styles['active'] : ''
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
            )}
          </AnimatePresence>
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
