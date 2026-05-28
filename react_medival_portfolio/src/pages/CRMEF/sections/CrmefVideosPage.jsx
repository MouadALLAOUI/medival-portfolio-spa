import { getAssetById } from '../../../data/mediaManager';
import { useState, useMemo } from 'react';
import { Play, Eye, Calendar, User, Clock, Search, BookOpen, Film } from 'lucide-react';
import { crmefVideos } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefVideosPage.module.scss';

export default function CrmefVideosPage() {
  const { t } = useSettings();
  const [selectedVideo, setSelectedVideo] = useState(crmefVideos[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    crmefVideos.forEach(v => {
      if (v.category) cats.add(v.category);
    });
    return Array.from(cats);
  }, []);

  // Filtered videos for the sidebar list
  const filteredVideos = useMemo(() => {
    return crmefVideos.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    // Scroll to top of the video container on mobile/tablet when a new video is clicked
    const playerEl = document.getElementById('crmef-video-viewport');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  // Helper to determine if a URL is a YouTube link
  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  // Helper to extract YouTube embed link
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v');
    } else if (url.includes('youtu.be/')) {
      videoId = url.substring(url.lastIndexOf('/') + 1);
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <Film className={styles.titleIcon} size={24} />
          {t('CRMEF.videos.title') || 'Scrying Mirrors — Vidéos d\'Apprentissage'}
        </h2>
        <p className={styles.subtitle}>
          {t('CRMEF.videos.subtitle') || 'Explorez les sessions d\'enseignement, les leçons didactiques et les démonstrations pratiques du centre.'}
        </p>
      </header>

      <div className={styles.layout}>
        {/* Left Side: Video Player Viewport */}
        <div className={styles.playerContainer}>
          {selectedVideo ? (
            <>
              <div id="crmef-video-viewport" className={styles.videoWrapper}>
                {isYouTubeUrl(selectedVideo.url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedVideo.url)}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={styles.player}
                  />
                ) : (
                  <video
                    src={selectedVideo.url}
                    controls
                    className={styles.player}
                    poster={getAssetById('city-medieval-day').path}
                  />
                )}
              </div>

              <div className={styles.videoMeta}>
                <div className={styles.videoTags}>
                  <span className={styles.categoryBadge}>{selectedVideo.category}</span>
                </div>
                <h3 className={styles.videoTitle}>{selectedVideo.title}</h3>
                
                <div className={styles.videoDetailsBar}>
                  <div className={styles.stats}>
                    <span className={styles.statItem}>
                      <Eye size={14} /> {selectedVideo.views} views
                    </span>
                    <span className={styles.separator}>•</span>
                    <span className={styles.statItem}>
                      <Calendar size={14} /> {selectedVideo.date}
                    </span>
                  </div>
                  {selectedVideo.author && (
                    <div className={styles.author}>
                      <User size={14} /> <span>{selectedVideo.author}</span>
                    </div>
                  )}
                </div>

                <div className={styles.descriptionBox}>
                  <p>{selectedVideo.description}</p>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noVideoPlaceholder}>
              <Film size={48} className={styles.placeholderIcon} />
              <p>Sélectionnez un parchemin vidéo pour commencer la scrying</p>
            </div>
          )}
        </div>

        {/* Right Side: YouTube-like Sidebar List */}
        <aside className={styles.sidebar}>
          {/* Search bar inside sidebar */}
          <div className={styles.searchBox}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder={t('CRMEF.videos.searchPlaceholder') || 'Chercher un grimoire vidéo...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Category Pills list inside sidebar */}
          <div className={styles.categoryPills}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`${styles.pill} ${activeCategory === cat ? styles.activePill : ''}`}
              >
                {cat === 'All' ? (t('CRMEF.videos.allCategories') || 'Tous') : cat}
              </button>
            ))}
          </div>

          {/* Video Items list */}
          <div className={styles.playlist}>
            <h4 className={styles.playlistTitle}>
              <BookOpen size={14} /> {t('CRMEF.videos.playlistTitle') || 'Vidéos Didactiques'}
            </h4>

            {filteredVideos.length > 0 ? (
              <div className={styles.playlistItems}>
                {filteredVideos.map(video => {
                  const isSelected = selectedVideo && selectedVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleSelectVideo(video)}
                      className={`${styles.playlistCard} ${isSelected ? styles.selectedCard : ''}`}
                    >
                      <div className={styles.thumbnailWrapper}>
                        <img
                          src={getAssetById('game-menu-medieval').path}
                          alt={video.title}
                          className={styles.thumbnailImg}
                        />
                        <span className={styles.durationTag}>
                          <Clock size={10} /> {video.duration}
                        </span>
                        {isSelected && (
                          <div className={styles.playingOverlay}>
                            <Play size={16} fill="currentColor" />
                          </div>
                        )}
                      </div>

                      <div className={styles.playlistInfo}>
                        <h5 className={styles.playlistItemTitle}>{video.title}</h5>
                        <p className={styles.playlistItemAuthor}>{video.author || 'Mouad'}</p>
                        <div className={styles.playlistItemStats}>
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.category}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyPlaylist}>
                <p>Aucun parchemin vidéo ne correspond à votre quête.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
