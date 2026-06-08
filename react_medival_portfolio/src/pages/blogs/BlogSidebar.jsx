import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, FileText, Share2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { AnimatePresence, motion } from 'framer-motion';
import { getAssetById } from '../../data/mediaManager';
import { useSettings } from '../../lib/useSettings';
import { formatDate } from '../../lib/utils/dateFormatter';
import { TwitterIcon, LinkedinIcon, FacebookIcon } from '../../components/ui/SocialIcons';
import styles from './BlogPost.module.scss';

export default function BlogSidebar({
  post,
  headings,
  activeId,
  scrollProgress,
  readTime,
  wordCount,
  bookmarks,
  setBookmarks,
  showAlert,
  visibleBlogs,
  handleShare,
}) {
  const { t, language } = useSettings();
  const [showQR, setShowQR] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
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
                    const yOffset = -90;
                    const scrollContainer = document.getElementById('body-container') || window;
                    const scrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
                    const y = el.getBoundingClientRect().top + scrollTop + yOffset;
                    scrollContainer.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={`${styles['tocLink']} ${styles[heading.level]} ${activeId === heading.id ? styles['active'] : ''}`}
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

      {/* QR Modal */}
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
    </aside>
  );
}
