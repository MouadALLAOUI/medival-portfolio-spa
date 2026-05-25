import { Link } from 'react-router-dom';
import { useSettings } from '../../lib/useSettings';
import { formatDate } from '../../lib/utils/dateFormatter';
import styles from './BlogCard.module.scss';

const BlogCard = ({ blog, isBookmarked, onToggleBookmark }) => {
  const { t, language } = useSettings();
  const formattedDate = formatDate(blog.date, t, language);

  return (
    <article className={styles['blog-card']}>
      <div className={styles['article-images']}>
        <img
          src={blog.thumbnail || 'https://placehold.co/600x400/2a1b12/f5e6ca?text=Treasure+Scroll'}
          alt={blog.title}
          className={styles['card-img']}
          loading="lazy"
        />
        <button
          type="button"
          className={`${styles['bookmark-badge']} ${isBookmarked ? styles['bookmarked'] : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark(blog.slug);
          }}
          aria-label={isBookmarked ? t('BLOGS.post.bookmarkRemove') : t('BLOGS.post.bookmarkAdd')}
        >
          {isBookmarked ? '🔖' : '🏷️'}
        </button>
      </div>
      <div className={styles['article-desc']}>
        <h3 className={styles['title']}>
          {blog.logo} {blog.title}
        </h3>
        <p className={styles['date']}>
          {t('BLOGS.post.publishedOn', { date: formattedDate })}
        </p>
        <div className={styles['tags']}>
          {blog.tags.map((tag) => (
            <span key={tag} className={styles['tag']}>{tag}</span>
          ))}
        </div>
        <p className={styles['desc']}>{blog.desc}</p>
        <div className={styles['card-footer']}>
          <span className={styles['read-time']}>⏱ {t('BLOGS.list.readTime', { time: blog.readTime.replace(' min read', '') })}</span>
          <Link
            to={`/blogs/${blog.slug}`}
            className={styles['readmore']}
          >
            {t('BLOGS.list.readCTA')}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

