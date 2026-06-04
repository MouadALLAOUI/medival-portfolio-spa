import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import projectsMetadata from '../../data/projects';
import { projects as projectsData, PROJECT_CATEGORIES } from '../../data/projects.data';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ProjectsPage.module.scss';

// Merge metadata with overview data
const projects = projectsMetadata.map(meta => {
  const data = projectsData.find(d => d.id === meta.id);
  return {
    ...meta,
    description: meta.desc,
    overview: data?.overview || {},
    image: data?.overview?.thumbnail || '',
    status: data?.overview?.status || 'unknown',
    category: meta.tags?.[0]?.toLowerCase() || 'web',
    featured: false,
    year: new Date().getFullYear(),
    codeUrl: meta.link?.link || '',
    liveUrl: '',
    longDescription: data?.overview?.intro || meta.desc
  };
});

export default function ProjectsPage() {
  const { t } = useSettings();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('all');

  // All unique tags
  const allTags = useMemo(() => {
    const tags = new Set(projects.flatMap(p => p.tags));
    return ['all', ...tags];
  }, []);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;

      const matchesTag =
        activeTag === 'all' || p.tags.includes(activeTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [search, activeCategory, activeTag]);

  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('projects.title') || 'Tech Quests'}</h1>
        <p className={styles.subtitle}>{t('projects.subtitle') || 'Legendary quests and enchanted artifacts'}</p>
      </div>

      {/* Search bar */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={18} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder={t('projects.searchPlaceholder') || 'Search quests...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')} type="button">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className={styles.categoryFilter}>
        {PROJECT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      <div className={styles.tagFilter}>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`${styles.tagBtn} ${activeTag === tag ? styles.tagActive : ''}`}
            onClick={() => setActiveTag(tag)}
            type="button"
          >
            {tag === 'all' ? 'All Tags' : tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className={styles.resultCount}>
        🛡️ {filtered.length} {filtered.length === 1 ? 'quest' : 'quests'} found
      </p>

      {/* Featured projects */}
      {featured.length > 0 && !search && activeCategory === 'all' && (
        <div className={styles.featuredSection}>
          <h2 className={styles.sectionLabel}>⭐ Featured Quests</h2>
          <div className={styles.featuredGrid}>
            {featured.map(p => (
              <ProjectCard key={p.id} project={p} featured />
            ))}
          </div>
        </div>
      )}

      {/* All projects */}
      <div className={styles.projectsGrid}>
        {rest.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <p>{t('projects.noResults') || 'No quests match your search'}</p>
          <button
            className={styles.clearAllBtn}
            onClick={() => { setSearch(''); setActiveCategory('all'); setActiveTag('all'); }}
            type="button"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
