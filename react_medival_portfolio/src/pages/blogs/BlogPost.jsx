import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../../data/blogs.data';
import { markdownToHtml } from '../../lib/utils/markdownToHtml';
import { useAlerts } from '../../lib/useAlerts';
import { useCodeCopy } from '../../lib/hooks/useCodeCopy';
import { useImageViewer } from '../../lib/useImageViewer';
import styles from './BlogPost.module.scss';
import { isFirstVisit } from '../../lib/utils/visitTracker';

function formatDate(date) {
  if (!date) return '__-__-__';
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

export default function BlogPost() {
  const { slug } = useParams();
  const { showAlert } = useAlerts();
  const { copyCode } = useCodeCopy();
  const { openImage } = useImageViewer();
  const contentRef = useRef(null);

  const post = blogs.find((b) => b.slug === slug);
  const currentIndex = blogs.findIndex((b) => b.slug === slug);

  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : blogs[blogs.length - 1];
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : blogs[0];

  useEffect(() => {
    if (!isFirstVisit(`blog_${slug}`)) return;
    showAlert('Entering the Chamber of Arcane Writings', 'greeting', 2000);
  }, [slug, showAlert]);

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
      {post ? (
        <>
          {/* Back Nav Links */}
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <Link to="/blogs" className={styles['back-link']}>📚 Return to Library</Link>
            <Link to="/home" className={styles['back-link']}>🏰 Kingdom</Link>
          </div>

          {/* ── Post Header ── */}
          <header className={styles['postHeader']}>
            <h1 className={styles['postTitle']}>
              {post.logo} {post.title}
            </h1>
            <div className={styles['postMeta']}>
              <span>📜 Penned on the {formatDate(post.date)}</span>
              <span>⏱ {post.readTime}</span>
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
            />
          )}

          {/* ── Article Content ── */}
          <article className="markdown-content" ref={contentRef}>
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.blogcontent.content) }} />
          </article>

          {/* ── Prev / Next Navigation ── */}
          <nav className={styles['postNav']}>
            <Link
              to={`/blogs/${prevPost.slug}`}
              className={styles['postNavBtn']}
            >
              &lt; Previous Scroll
            </Link>
            <Link
              to={`/blogs/${nextPost.slug}`}
              className={styles['postNavBtn']}
            >
              Next Scroll &gt;
            </Link>
          </nav>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>The scroll you seek has vanished into the void.</p>
          <Link to="/blogs" style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--accent)', fontWeight: 'bold' }}>⬅️ Back to all scrolls</Link>
        </div>
      )}
    </div>
  );
}
