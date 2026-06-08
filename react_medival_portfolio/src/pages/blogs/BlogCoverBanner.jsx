import { Clock, Calendar } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import { formatDate } from '../../lib/utils/dateFormatter';
import styles from './BlogPost.module.scss';

const GRADIENTS = [
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #f0c27b 0%, #4b1248 100%)',
];

const getCoverGradient = (id) => GRADIENTS[(id || 0) % GRADIENTS.length];

export default function BlogCoverBanner({ post, readTime }) {
  const { t, language } = useSettings();

  return (
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
  );
}
