import { Link } from 'react-router-dom';
import styles from './BlogCard.module.scss';

function formatDate(date) {
  if (!date) return 'Date unknown';
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const pad = (n) => String(n).padStart(2, '0');
  const suffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const { hh, mm, dd, MM, yyyy } = date;
  return `${pad(dd)}${suffix(dd)} Day of ${months[MM - 1]}, Year ${yyyy} at ${pad(hh)}:${pad(mm)}`;
}

const BlogCard = ({ blog }) => {
  const formattedDate = formatDate(blog.date);

  return (
    <article className={styles['blog-card']}>
      <div className={styles['article-images']}>
        <img
          src={blog.thumbnail || 'https://placehold.co/600x400/2a1b12/f5e6ca?text=Treasure+Scroll'}
          alt={blog.title}
          className={styles['card-img']}
        />
      </div>
      <div className={styles['article-desc']}>
        <h3 className={styles['title']}>
          {blog.logo} {blog.title}
        </h3>
        <p className={styles['date']}>
          Published on the {formattedDate}
        </p>
        <div className={styles['tags']}>
          {blog.tags.map((tag) => (
            <span key={tag} className={styles['tag']}>{tag}</span>
          ))}
        </div>
        <p className={styles['desc']}>{blog.desc}</p>
        <div className={styles['card-footer']}>
          <span className={styles['read-time']}>⏱ {blog.readTime}</span>
          <Link
            to={`/blogs/${blog.slug}`}
            className={styles['readmore']}
          >
            Read Scroll
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
