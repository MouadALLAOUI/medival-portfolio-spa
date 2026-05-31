import { getAssetById } from '../../../data/mediaManager';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Play, Eye, Calendar, User, Clock, Search, BookOpen, Film, CheckCircle, Bookmark, Maximize2, Minimize2 } from 'lucide-react';
import { crmefVideos } from '../../../data/crmef.data';
import CrmefAcademyHome from './CrmefAcademyHome';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefVideosPage.module.scss';

const FAVORITES_KEY = 'crmef_video_favorites';
const RECENTLY_WATCHED_KEY = 'crmef_video_recently_watched';
const MAX_RECENT = 6;

export default function CrmefVideosPage() {
  const { t } = useSettings();
  // Start on the dedicated Academy homepage rather than opening a video immediately
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [recentlyWatched, setRecentlyWatched] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = JSON.parse(localStorage.getItem(RECENTLY_WATCHED_KEY) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const videoRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const progressPollRef = useRef(null);
  const autoPlayNextRef = useRef(false);
  const [progressTick, setProgressTick] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Categories, levels, languages, and series from data
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    crmefVideos.forEach(v => {
      if (v.category) cats.add(v.category);
    });
    return Array.from(cats);
  }, []);

  const levels = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach(v => {
      if (v.level) set.add(v.level);
    });
    return Array.from(set);
  }, []);

  const languages = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach(v => {
      if (v.language) set.add(v.language);
    });
    return Array.from(set);
  }, []);

  const seriesOptions = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach(v => {
      if (v.series) set.add(v.series);
    });
    return Array.from(set);
  }, []);

  const featuredVideos = useMemo(() => crmefVideos.filter(v => v.featured), []);

  const difficultyLabel = (level) => {
    if (!level) return 'Unknown';
    const normalized = String(level).toLowerCase();
    if (normalized.includes('begin')) return 'Beginner';
    if (normalized.includes('inter')) return 'Intermediate';
    if (normalized.includes('advanced') || normalized.includes('adv')) return 'Advanced';
    if (normalized.includes('forma') || normalized.includes('form')) return 'Formateur';
    return level;
  };

  const parseViews = useCallback((views) => {
    if (!views) return 0;
    const normalized = views.toString().trim().toUpperCase();
    if (normalized.endsWith('K')) return parseFloat(normalized.slice(0, -1)) * 1000;
    if (normalized.endsWith('M')) return parseFloat(normalized.slice(0, -1)) * 1_000_000;
    return parseInt(normalized.replace(/[, ]/g, ''), 10) || 0;
  }, []);

  const parseDuration = useCallback((duration) => {
    if (!duration) return 0;
    const parts = duration.split(':').map(part => Number(part));
    return parts.reduce((acc, value) => acc * 60 + (Number.isFinite(value) ? value : 0), 0);
  }, []);

  const sortVideos = useCallback((videos) => {
    const sorted = [...videos];
    switch (sortOption) {
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'mostViewed':
        return sorted.sort((a, b) => parseViews(b.views) - parseViews(a.views));
      case 'duration':
        return sorted.sort((a, b) => parseDuration(b.duration) - parseDuration(a.duration));
      default:
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [sortOption, parseDuration, parseViews]);

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortVideos(crmefVideos.filter(v => {
      const inTitle = v.title?.toLowerCase().includes(q) || false;
      const inDesc = v.description?.toLowerCase().includes(q) || false;
      const inAuthor = v.author?.toLowerCase().includes(q) || false;
      const inSeries = v.series?.toLowerCase().includes(q) || false;
      const inCategory = v.category?.toLowerCase().includes(q) || false;
      const inTags = v.tags?.some(tag => tag.toLowerCase().includes(q)) || false;
      const inTopics = v.topics?.some(topic => topic.toLowerCase().includes(q)) || false;

      const matchesSearch = q === '' || inTitle || inDesc || inAuthor || inSeries || inCategory || inTags || inTopics;
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
      const matchesLevel = selectedLevel === 'All' || v.level === selectedLevel;
      const matchesLanguage = selectedLanguage === 'All' || v.language === selectedLanguage;
      const matchesSeries = selectedSeries === 'All' || v.series === selectedSeries;
      const matchesFavorite = !showFavoritesOnly || favorites.includes(v.id);

      return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesSeries && matchesFavorite;
    }));
  }, [searchQuery, activeCategory, selectedLevel, selectedLanguage, selectedSeries, showFavoritesOnly, favorites, sortVideos]);

  const recentVideos = useMemo(() => {
    return recentlyWatched
      .map(id => crmefVideos.find(v => v.id === id))
      .filter(Boolean);
  }, [recentlyWatched]);

  // ----- Videos in the same series (for navigation) -----
  const seriesVideos = useMemo(() => {
    if (!selectedVideo?.series) return [];
    return crmefVideos
      .filter(v => v.series === selectedVideo.series)
      .sort((a, b) => (a.episode || 0) - (b.episode || 0));
  }, [selectedVideo]);

  // ----- Related videos (from selectedVideo.relatedVideos) -----
  const relatedList = useMemo(() => {
    if (!selectedVideo?.relatedVideos?.length) return [];
    return selectedVideo.relatedVideos
      .map(id => crmefVideos.find(v => v.id === id))
      .filter(Boolean);
  }, [selectedVideo]);

  // ----- Navigation helpers (depend on seriesVideos and filteredVideos) -----
  const getNextVideo = useCallback(() => {
    if (!selectedVideo) return null;
    // Prefer series order if the video belongs to a series with >1 episodes
    if (seriesVideos.length > 1) {
      const idx = seriesVideos.findIndex(v => v.id === selectedVideo.id);
      if (idx >= 0 && idx < seriesVideos.length - 1) return seriesVideos[idx + 1];
    }
    // Fallback to current filtered playlist order
    const idx = filteredVideos.findIndex(v => v.id === selectedVideo.id);
    if (idx >= 0 && idx < filteredVideos.length - 1) return filteredVideos[idx + 1];
    return null;
  }, [selectedVideo, seriesVideos, filteredVideos]);

  const getPrevVideo = useCallback(() => {
    if (!selectedVideo) return null;
    if (seriesVideos.length > 1) {
      const idx = seriesVideos.findIndex(v => v.id === selectedVideo.id);
      if (idx > 0) return seriesVideos[idx - 1];
    }
    const idx = filteredVideos.findIndex(v => v.id === selectedVideo.id);
    if (idx > 0) return filteredVideos[idx - 1];
    return null;
  }, [selectedVideo, seriesVideos, filteredVideos]);

  const trackRecentlyWatched = useCallback((videoId) => {
    setRecentlyWatched(prev => {
      const next = [videoId, ...prev.filter(id => id !== videoId)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn('Failed to save recently watched', error);
      }
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((videoId) => {
    setFavorites(prev => {
      const nextSet = new Set(prev);
      if (nextSet.has(videoId)) nextSet.delete(videoId);
      else nextSet.add(videoId);
      const next = Array.from(nextSet);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn('Failed to save favorites', error);
      }
      return next;
    });
  }, []);

  // ----- Select video and scroll into view -----
  const handleSelectVideo = useCallback((video) => {
    setSelectedVideo(video);
    trackRecentlyWatched(video.id);
    const playerEl = document.getElementById('crmef-video-viewport');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [trackRecentlyWatched]);

  const handleNext = useCallback(() => {
    const next = getNextVideo();
    if (next) {
      autoPlayNextRef.current = true;
      handleSelectVideo(next);
    }
  }, [getNextVideo, handleSelectVideo]);

  const handlePrev = useCallback(() => {
    const prev = getPrevVideo();
    if (prev) handleSelectVideo(prev);
  }, [getPrevVideo, handleSelectVideo]);



  // ----- Progress storage helpers -----
  const getProgressKey = (id) => `crmef_video_progress_${id}`;
  const loadSavedProgress = useCallback((id) => {
    try {
      const raw = localStorage.getItem(getProgressKey(id));
      return raw ? JSON.parse(raw) : { time: 0, completed: false };
    } catch (error) {
      console.warn('Failed to load saved progress', error);
      return { time: 0, completed: false };
    }
  }, []);
  const saveProgress = useCallback((id, time, duration = 0, completed = false) => {
    try {
      localStorage.setItem(getProgressKey(id), JSON.stringify({ time, duration, completed }));
      setProgressTick(p => p + 1);
    } catch (error) {
      console.warn('Failed to save progress', error);
    }
  }, []);

  const selectedSavedProgress = useMemo(() => {
    const currentTick = progressTick;
    void currentTick;
    return selectedVideo ? loadSavedProgress(selectedVideo.id) : null;
  }, [selectedVideo, progressTick, loadSavedProgress]);

  // ----- Helper to detect YouTube URLs -----
  const isYouTubeUrl = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));

  const setPlayerRate = useCallback((rate) => {
    setPlaybackRate(rate);
    try {
      if (videoRef.current) videoRef.current.playbackRate = rate;
      if (ytPlayerRef.current && ytPlayerRef.current.setPlaybackRate) ytPlayerRef.current.setPlaybackRate(rate);
    } catch (error) { console.warn('setPlayerRate failed', error); }
  }, []);

  const togglePlayPause = useCallback(() => {
    try {
      if (!selectedVideo) return;
      if (!isYouTubeUrl(selectedVideo.url) && videoRef.current) {
        if (videoRef.current.paused) videoRef.current.play(); else videoRef.current.pause();
      } else if (ytPlayerRef.current) {
        const state = ytPlayerRef.current.getPlayerState ? ytPlayerRef.current.getPlayerState() : null;
        // YT states: 1 = playing, 2 = paused
        if (state === 1) ytPlayerRef.current.pauseVideo(); else ytPlayerRef.current.playVideo();
      }
    } catch (error) { console.warn('togglePlayPause failed', error); }
  }, [selectedVideo]);

  const seekBy = useCallback((seconds) => {
    try {
      if (!selectedVideo) return;
      if (!isYouTubeUrl(selectedVideo.url) && videoRef.current) {
        videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + seconds));
      } else if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
        const t = Math.max(0, ytPlayerRef.current.getCurrentTime() + seconds);
        ytPlayerRef.current.seekTo(t, true);
      }
    } catch (error) { console.warn('seekBy failed', error); }
  }, [selectedVideo]);

  const toggleFullscreen = useCallback(() => {
    try {
      const el = document.getElementById('crmef-video-viewport');
      if (!el) return;
      if (!document.fullscreenElement) el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => { });
      else document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => { });
    } catch (error) { console.warn('toggleFullscreen failed', error); }
  }, []);

  const togglePictureInPicture = useCallback(async () => {
    try {
      if (videoRef.current) {
        if (document.pictureInPictureElement) await document.exitPictureInPicture();
        else await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      // PiP may not be available for this source or browser
      console.warn('Picture-in-Picture unavailable', error);
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        seekBy(10);
      } else if (e.code === 'ArrowLeft') {
        seekBy(-10);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.code === 'ArrowUp') {
        if (videoRef.current) videoRef.current.volume = Math.min(1, (videoRef.current.volume || 0) + 0.1);
      } else if (e.code === 'ArrowDown') {
        if (videoRef.current) videoRef.current.volume = Math.max(0, (videoRef.current.volume || 0) - 0.1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlayPause, seekBy, toggleFullscreen]);

  // ----- Effect to handle video player and progress tracking -----
  useEffect(() => {
    if (!selectedVideo) return;

    // Clear any previous polling
    if (progressPollRef.current) {
      clearInterval(progressPollRef.current);
      progressPollRef.current = null;
    }

    // Destroy previous YouTube player if switching to a non‑YouTube video
    if (ytPlayerRef.current && !isYouTubeUrl(selectedVideo.url)) {
      try { ytPlayerRef.current.destroy(); } catch { console.warn('Failed to destroy YouTube player'); }
      ytPlayerRef.current = null;
    }

    const saved = loadSavedProgress(selectedVideo.id);

    // ----- Native HTML5 video -----
    if (!isYouTubeUrl(selectedVideo.url)) {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      const handleLoadedMetadata = () => {
        if (saved?.time && videoEl.duration && saved.time < videoEl.duration - 1) {
          videoEl.currentTime = saved.time;
        }
        if (autoPlayNextRef.current) {
          videoEl.play().catch(() => { });
          autoPlayNextRef.current = false;
        }
      };

      const handleTimeUpdate = () => {
        const percent = videoEl.duration ? (videoEl.currentTime / videoEl.duration) * 100 : 0;
        saveProgress(selectedVideo.id, Math.floor(videoEl.currentTime), Math.floor(videoEl.duration), percent >= 90);
      };

      const handleEnded = () => {
        saveProgress(selectedVideo.id, Math.floor(videoEl.duration), Math.floor(videoEl.duration), true);
        const next = getNextVideo();
        if (next) {
          autoPlayNextRef.current = true;
          handleSelectVideo(next);
        }
      };

      videoEl.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      videoEl.addEventListener('timeupdate', handleTimeUpdate);
      videoEl.addEventListener('ended', handleEnded);

      return () => {
        videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoEl.removeEventListener('timeupdate', handleTimeUpdate);
        videoEl.removeEventListener('ended', handleEnded);
      };
    }
    // ----- YouTube iframe API -----
    else {
      const videoId = (() => {
        try {
          if (selectedVideo.url.includes('youtube.com/watch')) {
            return new URL(selectedVideo.url).searchParams.get('v');
          } else if (selectedVideo.url.includes('youtu.be/')) {
            return selectedVideo.url.substring(selectedVideo.url.lastIndexOf('/') + 1);
          } else if (selectedVideo.url.includes('youtube.com/embed/')) {
            return selectedVideo.url.split('/').pop();
          }
          return null;
        } catch { return null; }
      })();
      if (!videoId) return;

      const containerId = `yt-player-${selectedVideo.id}`;

      const ensureApi = () => new Promise((resolve) => {
        if (window.YT && window.YT.Player) return resolve(window.YT);
        const existing = document.getElementById('yt-api-script');
        if (existing) {
          const wait = () => (window.YT && window.YT.Player) ? resolve(window.YT) : setTimeout(wait, 50);
          return wait();
        }
        const tag = document.createElement('script');
        tag.id = 'yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });

      ensureApi().then((YT) => {
        if (ytPlayerRef.current?.destroy) ytPlayerRef.current.destroy();

        ytPlayerRef.current = new YT.Player(containerId, {
          videoId,
          playerVars: { autoplay: 0, controls: 1 },
          events: {
            onReady: (e) => {
              if (saved?.time) e.target.seekTo(saved.time, true);
              if (autoPlayNextRef.current) {
                e.target.playVideo();
                autoPlayNextRef.current = false;
              }
            },
            onStateChange: (ev) => {
              if (ev.data === YT.PlayerState.PLAYING) {
                if (progressPollRef.current) clearInterval(progressPollRef.current);
                progressPollRef.current = setInterval(() => {
                  try {
                    const t = Math.floor(ytPlayerRef.current.getCurrentTime());
                    const d = Math.floor(ytPlayerRef.current.getDuration()) || 0;
                    const pct = d ? (t / d) * 100 : 0;
                    saveProgress(selectedVideo.id, t, d, pct >= 90);
                  } catch { console.warn('Failed to get YouTube player time/duration'); }
                }, 2000);
              } else if (ev.data === YT.PlayerState.ENDED) {
                const duration = Math.floor(ytPlayerRef.current.getDuration());
                saveProgress(selectedVideo.id, duration, duration, true);
                if (progressPollRef.current) {
                  clearInterval(progressPollRef.current);
                  progressPollRef.current = null;
                }
                const next = getNextVideo();
                if (next) {
                  autoPlayNextRef.current = true;
                  handleSelectVideo(next);
                }
              } else if (ev.data === YT.PlayerState.PAUSED) {
                if (progressPollRef.current) {
                  clearInterval(progressPollRef.current);
                  progressPollRef.current = null;
                }
              }
            },
          },
        });
      });
    }
  }, [selectedVideo, saveProgress, getNextVideo, handleSelectVideo, loadSavedProgress]);

  // ----- Render -----
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
                  <div id={`yt-player-${selectedVideo.id}`} className={styles.player} />
                ) : (
                  <video
                    ref={videoRef}
                    src={selectedVideo.url}
                    controls
                    className={styles.player}
                    poster={selectedVideo.thumbnail || getAssetById('city-medieval-day')?.path}
                  />
                )}
                <div className={styles.playerControls}>
                  <div className={styles.controlLeft}>
                    <button type="button" className={styles.iconBtn} onClick={() => togglePlayPause()}><Play size={14} /></button>
                    <button type="button" className={styles.iconBtn} onClick={() => seekBy(-10)}>&lt;&lt;10s</button>
                    <button type="button" className={styles.iconBtn} onClick={() => seekBy(10)}>10s&gt;&gt;</button>
                    <select value={playbackRate} onChange={(e) => setPlayerRate(Number(e.target.value))} className={styles.speedSelect}>
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={1.75}>1.75x</option>
                      <option value={2}>2x</option>
                    </select>
                  </div>
                  <div className={styles.controlRight}>
                    <button type="button" className={styles.iconBtn} onClick={() => togglePictureInPicture()}>PiP</button>
                    <button type="button" className={styles.iconBtn} onClick={() => toggleFullscreen()} title="Toggle fullscreen">
                      {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.videoMeta}>
                <div className={styles.videoTags}>
                  <span className={styles.categoryBadge}>{selectedVideo.category}</span>
                  <span className={`${styles.difficultyBadge} ${styles['level-' + difficultyLabel(selectedVideo.level).toLowerCase()]}`}>
                    {difficultyLabel(selectedVideo.level)}
                  </span>
                </div>
                <h3 className={styles.videoTitle}>
                  {selectedVideo.title}
                  {selectedSavedProgress?.completed && (
                    <span className={styles.completedInline} title="Completed">
                      <CheckCircle size={14} />
                    </span>
                  )}
                </h3>
                <div className={styles.eduMetadata}>
                  {selectedVideo.series && <div><strong>Series:</strong> {selectedVideo.series}</div>}
                  {selectedVideo.episode != null && <div><strong>Episode:</strong> {selectedVideo.episode}</div>}
                  {selectedVideo.level && <div><strong>Level:</strong> {selectedVideo.level}</div>}
                  {selectedVideo.language && <div><strong>Language:</strong> {selectedVideo.language}</div>}
                  {selectedVideo.topics?.length > 0 && <div><strong>Topics:</strong> {selectedVideo.topics.join(', ')}</div>}
                  {selectedVideo.tags?.length > 0 && <div><strong>Tags:</strong> {selectedVideo.tags.join(', ')}</div>}
                </div>

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

                <div className={styles.videoActions}>
                  <button
                    type="button"
                    className={styles.favoriteButton}
                    onClick={() => toggleFavorite(selectedVideo.id)}
                  >
                    <Bookmark size={16} />
                    {favorites.includes(selectedVideo.id) ? 'Saved to Bookmarks' : 'Add to Bookmarks'}
                  </button>
                </div>

                <div className={styles.descriptionBox}>
                  <p>{selectedVideo.description}</p>
                </div>

                {/* Learning meta sections */}
                {(selectedVideo.learningObjectives || selectedVideo.prerequisites || selectedVideo.expectedOutcomes) && (
                  <div className={styles.learningMeta}>
                    {selectedVideo.learningObjectives && (
                      <div className={styles.metaSection}>
                        <h4>Learning Objectives</h4>
                        <ul>{selectedVideo.learningObjectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
                      </div>
                    )}
                    {selectedVideo.prerequisites && (
                      <div className={styles.metaSection}>
                        <h4>Prerequisites</h4>
                        <ul>{selectedVideo.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>
                      </div>
                    )}
                    {selectedVideo.expectedOutcomes && (
                      <div className={styles.metaSection}>
                        <h4>Expected Outcomes</h4>
                        <ul>{selectedVideo.expectedOutcomes.map((e, i) => <li key={i}>{e}</li>)}</ul>
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.navButtons}>
                  <button type="button" className={styles.navButton} onClick={handlePrev} disabled={!getPrevVideo()}>
                    ← Previous Lesson
                  </button>
                  <button type="button" className={styles.navButton} onClick={handleNext} disabled={!getNextVideo()}>
                    Next Lesson →
                  </button>
                </div>

                <div className={styles.markCompletedRow}>
                  {selectedSavedProgress && !selectedSavedProgress.completed && (
                    <button
                      type="button"
                      className={styles.markCompletedBtn}
                      onClick={() => {
                        let duration = 0;
                        if (videoRef.current?.duration) duration = Math.floor(videoRef.current.duration);
                        else if (ytPlayerRef.current?.getDuration) duration = Math.floor(ytPlayerRef.current.getDuration()) || 0;
                        if (duration <= 0) duration = Math.max(1, selectedSavedProgress.time || 1);
                        saveProgress(selectedVideo.id, duration, duration, true);
                      }}
                    >
                      Mark completed
                    </button>
                  )}
                </div>

                {seriesVideos.length > 1 && (
                  <div className={styles.seriesNav}>
                    <h4 className={styles.seriesTitle}>Course: {selectedVideo.series}</h4>
                    <div className={styles.seriesList}>
                      {seriesVideos.map(v => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleSelectVideo(v)}
                          className={`${styles.seriesEpisode} ${selectedVideo.id === v.id ? styles.activeEpisode : ''}`}
                        >
                          {v.episode ? `Ep ${v.episode} — ` : ''}{v.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {relatedList.length > 0 && (
                  <div className={styles.continueLearning}>
                    <h4 className={styles.continueTitle}>Continue Learning</h4>
                    <div className={styles.relatedItems}>
                      {relatedList.map(rv => (
                        <div key={rv.id} className={styles.relatedCard} onClick={() => handleSelectVideo(rv)}>
                          <img src={rv.thumbnail || getAssetById('game-menu-medieval')?.path} alt={rv.title} className={styles.relatedThumb} />
                          <div className={styles.relatedInfo}>
                            <div className={styles.relatedTitle}>{rv.title}</div>
                            <div className={styles.relatedMeta}>{rv.duration} • {rv.author}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <CrmefAcademyHome
              featured={featuredVideos}
              onStart={(v) => setSelectedVideo(v || crmefVideos[0])}
              onBrowse={() => {
                const el = document.getElementById('crmef-sidebar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}
        </div>

        {/* Right Side: Sidebar with search, categories, and video list */}
        <aside id="crmef-sidebar" className={styles.sidebar}>
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

          <div className={styles.filterBar}>
            <div className={styles.filterRow}>
              <label htmlFor="sortSelect">Sort:</label>
              <select id="sortSelect" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className={styles.filterSelect}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostViewed">Most Viewed</option>
                <option value="duration">Longest</option>
              </select>
              <label htmlFor="levelSelect">Level:</label>
              <select id="levelSelect" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className={styles.filterSelect}>
                {levels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
            <div className={styles.filterRow}>
              <label htmlFor="languageSelect">Language:</label>
              <select id="languageSelect" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className={styles.filterSelect}>
                {languages.map(language => <option key={language} value={language}>{language}</option>)}
              </select>
              <label htmlFor="seriesSelect">Series:</label>
              <select id="seriesSelect" value={selectedSeries} onChange={(e) => setSelectedSeries(e.target.value)} className={styles.filterSelect}>
                {seriesOptions.map(series => <option key={series} value={series}>{series}</option>)}
              </select>
            </div>
            <div className={styles.controlRow}>
              <button
                type="button"
                className={`${styles.favoriteFilterBtn} ${showFavoritesOnly ? styles.activeFilterBtn : ''}`}
                onClick={() => setShowFavoritesOnly(prev => !prev)}
              >
                {showFavoritesOnly ? 'Showing Bookmarks' : 'Show Bookmarks Only'}
              </button>
            </div>
          </div>

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

          {featuredVideos.length > 0 && (
            <div className={styles.featuredSection}>
              <h4 className={styles.featuredTitle}>Featured Courses</h4>
              <div className={styles.featuredList}>
                {featuredVideos.map(video => (
                  <button key={video.id} type="button" className={styles.featuredCard} onClick={() => handleSelectVideo(video)}>
                    <img src={video.thumbnail || getAssetById('city-medieval-day')?.path} alt={video.title} className={styles.featuredThumb} />
                    <div>
                      <strong>{video.title}</strong>
                      <p>{video.series || video.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {recentVideos.length > 0 && (
            <div className={styles.recentSection}>
              <h4 className={styles.recentTitle}>Recently Watched</h4>
              <div className={styles.recentList}>
                {recentVideos.map(video => (
                  <button key={video.id} type="button" className={styles.recentCard} onClick={() => handleSelectVideo(video)}>
                    <span>{video.title}</span>
                    <small>{video.series || video.category}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.playlist}>
            <h4 className={styles.playlistTitle}>
              <BookOpen size={14} /> {t('CRMEF.videos.playlistTitle') || 'Vidéos Didactiques'}
            </h4>

            {filteredVideos.length > 0 ? (
              <div className={styles.playlistItems}>
                {filteredVideos.map(video => {
                  const isSelected = selectedVideo?.id === video.id;
                  const progress = loadSavedProgress(video.id);
                  const percent = progress.duration ? Math.min(100, Math.floor((progress.time / progress.duration) * 100)) : (progress.time ? 1 : 0);
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleSelectVideo(video)}
                      className={`${styles.playlistCard} ${isSelected ? styles.selectedCard : ''}`}
                    >
                      <div className={styles.thumbnailWrapper}>
                        <img
                          src={video.thumbnail || getAssetById('game-menu-medieval')?.path}
                          alt={video.title}
                          className={styles.thumbnailImg}
                        />
                        <span className={styles.durationTag}>
                          <Clock size={10} /> {video.duration}
                        </span>
                        <button
                          type="button"
                          className={`${styles.thumbnailFavoriteBtn} ${favorites.includes(video.id) ? styles.bookmarkedThumb : ''}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleFavorite(video.id);
                          }}
                          title={favorites.includes(video.id) ? 'Remove bookmark' : 'Bookmark'}
                        >
                          <Bookmark size={12} />
                        </button>
                        {isSelected && (
                          <div className={styles.playingOverlay}>
                            <Play size={16} fill="currentColor" />
                          </div>
                        )}
                        {progress.completed && (
                          <div className={styles.completedBadge} title="Completed">
                            <CheckCircle size={14} />
                          </div>
                        )}
                        <div className={styles.thumbProgress} title={`${percent}%`}>
                          <div className={styles.thumbProgressBar} style={{ width: `${percent}%` }} />
                        </div>
                      </div>

                      <div className={styles.playlistInfo}>
                        <h5 className={styles.playlistItemTitle}>{video.title}</h5>
                        <p className={styles.playlistItemAuthor}>{video.author || 'Mouad'}</p>
                        <div className={styles.playlistItemStats}>
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.category}</span>
                        </div>
                        <div>
                          <span className={`${styles.difficultyBadge} ${styles['level-' + difficultyLabel(video.level).toLowerCase()]}`}>
                            {difficultyLabel(video.level)}
                          </span>
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