import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import { calculateReadingTime } from '../../lib/utils/readingTime';
import styles from './BlogCard.module.scss';
import DynamicCard from '../card';

const GRADIENTS = [
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // crystal blue
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // twilight purple
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // ruby rose
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // emerald teal
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // gold sun
  'linear-gradient(135deg, #f0c27b 0%, #4b1248 100%)', // royal sunset
];

const getCoverGradient = (id) => GRADIENTS[(id || 0) % GRADIENTS.length];

export default function BlogCard({ blog, isBookmarked, onToggleBookmark }) {
  const { t } = useSettings();
  const readTime = calculateReadingTime(blog.blogcontent?.content);

  const cardConfig = {
    baseClass: "blog-card",
    titleKey: "title",
    descKey: "desc",
    showTags: false, // tags managed manually for custom layout
    variant: 'parchment',
    hoverEffect: 'lift'
  };

  const formattedDate = blog.date
    ? `${String(blog.date.dd).padStart(2, '0')}/${String(blog.date.MM).padStart(2, '0')}/${blog.date.yyyy}`
    : '';

  return (
    <div className={styles['blog-card-wrapper']}>
      <DynamicCard item={blog} config={cardConfig}>
        {/* Cover art block */}
        <div className={styles['blog-cover']} style={{ '--cover-gradient': getCoverGradient(blog.id) }}>
          <div className={styles['cover-overlay']} />
          <div className={styles['series-badge-wrap']}>
            {blog.series && (
              <span className={styles['series-badge']}>
                📜 {blog.series}
              </span>
            )}
          </div>
          <div className={styles['logo-circle']}>
            <span className={styles['logo-emoji']}>{blog.logo}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className={styles['blog-card-body']}>
          {/* Metadata Row */}
          <div className={styles['blog-meta']}>
            <span className={styles['blog-date']}>
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className={styles['read-time']}>
              <Clock size={12} />
              {t('BLOGS.list.readTime', { time: readTime })}
            </span>
          </div>

          <h3 className={styles['blog-title']}>{blog.title}</h3>
          <p className={styles['blog-desc']}>{blog.desc}</p>

          {/* Runic Tags */}
          <div className={styles['blog-tags']}>
            {blog.tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles['blog-tag']}>#{tag}</span>
            ))}
          </div>

          {/* Footer Actions */}
          <div className={styles['blog-footer']}>
            <button
              className={`${styles['bookmark-btn']} ${isBookmarked ? styles['active'] : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleBookmark(blog.slug);
              }}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              type="button"
            >
              {isBookmarked ? <BookmarkCheck size={20} className={styles['bookmark-icon']} /> : <Bookmark size={20} className={styles['bookmark-icon']} />}
            </button>
            <Link to={`/blogs/${blog.slug}`} className={styles['read-btn']}>
              <span>{t('BLOGS.list.readCTA') || 'Read Chronicle'}</span>
              <ArrowRight size={16} className={styles['arrow-icon']} />
            </Link>
          </div>
        </div>
      </DynamicCard>
    </div>
  );
}
