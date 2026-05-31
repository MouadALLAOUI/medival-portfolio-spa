/* eslint-disable no-constant-binary-expression */
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
// import { getAssetById } from '../../../data/mediaManager';
import { Film } from 'lucide-react';
import { crmefVideos } from '../../../data/crmef.data';
import CrmefAcademyHome from './CrmefAcademyHome';
import { useSettings } from '../../../lib/useSettings';
import useDebounce from './hooks/useDebounce';
import useVideoProgress from './hooks/useVideoProgress';
import { formatViews, parseViews } from './utils/videoHelpers';
import styles from './CrmefVideosPage.module.scss';

const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
const VideoMetadata = lazy(() => import('./components/VideoMetadata'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const SeriesNavigation = lazy(() => import('./components/SeriesNavigation'));
const RelatedVideos = lazy(() => import('./components/RelatedVideos'));

const DEFAULT_FAVORITES_LABEL = 'Bookmarks';

export default function CrmefVideosPage() {
  const { t } = useSettings();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [rawSearch, setRawSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const { debouncedValue: searchQuery, isDebouncing: isSearching } = useDebounce(rawSearch, 280);
  const {
    favorites,
    recentlyWatched,
    watchLater,
    savedProgressMap,
    loadSavedProgress,
    saveProgress,
    markCompleted,
    toggleFavorite,
    toggleWatchLater,
    trackRecentlyWatched,
  } = useVideoProgress();

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    crmefVideos.forEach((video) => {
      if (video.category) cats.add(video.category);
    });
    return Array.from(cats);
  }, []);

  // const levels = useMemo(() => {
  //   const set = new Set(['All']);
  //   crmefVideos.forEach((video) => {
  //     if (video.level) set.add(video.level);
  //   });
  //   return Array.from(set);
  // }, []);

  const languages = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach((video) => {
      if (video.language) set.add(video.language);
    });
    return Array.from(set);
  }, []);

  const seriesOptions = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach((video) => {
      if (video.series) set.add(video.series);
    });
    return Array.from(set);
  }, []);

  const featuredVideos = useMemo(() => crmefVideos.filter((video) => video.featured), []);

  const sortedVideos = useCallback(
    (videos) => {
      const items = [...videos];
      if (sortOption === 'oldest') {
        return items.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      if (sortOption === 'mostViewed') {
        return items.sort((a, b) => parseViews(a.views) - parseViews(b.views));
      }
      if (sortOption === 'duration') {
        return items.sort((a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0));
      }
      return items.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    [sortOption]
  );

  const filteredVideos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sortedVideos(
      crmefVideos.filter((video) => {
        const title = video.title?.toLowerCase() || '';
        const description = video.description?.toLowerCase() || '';
        const author = video.author?.toLowerCase() || '';
        const series = video.series?.toLowerCase() || '';
        const category = video.category?.toLowerCase() || '';
        const topics = (video.topics || []).map((topic) => topic.toLowerCase());
        const tags = (video.tags || []).map((tag) => tag.toLowerCase());

        const matchesSearch =
          query === '' ||
          title.includes(query) ||
          description.includes(query) ||
          author.includes(query) ||
          series.includes(query) ||
          category.includes(query) ||
          topics.some((topic) => topic.includes(query)) ||
          tags.some((tag) => tag.includes(query));

        const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
        const matchesLevel = selectedLevel === 'All' || video.level === selectedLevel;
        const matchesLanguage = selectedLanguage === 'All' || video.language === selectedLanguage;
        const matchesSeries = selectedSeries === 'All' || video.series === selectedSeries;
        const matchesFavorite = !showFavoritesOnly || favorites.includes(video.id);

        return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesSeries && matchesFavorite;
      })
    );
  }, [searchQuery, activeCategory, selectedLevel, selectedLanguage, selectedSeries, showFavoritesOnly, favorites, sortedVideos]);

  const recentVideos = useMemo(
    () => recentlyWatched.map((id) => crmefVideos.find((video) => video.id === id)).filter(Boolean),
    [recentlyWatched]
  );

  const watchLaterVideos = useMemo(
    () => watchLater.map((id) => crmefVideos.find((video) => video.id === id)).filter(Boolean),
    [watchLater]
  );

  const progressSummary = useMemo(() => {
    const summary = { completed: 0, inProgress: 0, notStarted: 0 };
    crmefVideos.forEach((video) => {
      const progress = loadSavedProgress(video.id);
      if (progress?.viewed) {
        summary.completed += 1;
      } else if (progress?.currentTime > 0 && progress?.duration > 0) {
        summary.inProgress += 1;
      } else {
        summary.notStarted += 1;
      }
    });
    return summary;
  }, [savedProgressMap, loadSavedProgress]);

  const seriesVideos = useMemo(() => {
    if (!selectedVideo?.series) return [];
    return crmefVideos
      .filter((video) => video.series === selectedVideo.series)
      .sort((a, b) => (Number(a.episode) || 0) - (Number(b.episode) || 0));
  }, [selectedVideo]);

  const totalSeriesDuration = useMemo(() => {
    if (!seriesVideos.length) return 0;
    return seriesVideos.reduce((acc, v) => acc + (Number(v.duration) || 0), 0);
  }, [seriesVideos]);

  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];

    const explicit = selectedVideo.relatedVideos?.map((id) => crmefVideos.find((video) => video.id === id)).filter(Boolean);
    if (explicit?.length) return explicit;

    const currentTags = new Set((selectedVideo.tags || []).map((tag) => String(tag).toLowerCase()));
    const currentTopics = new Set((selectedVideo.topics || []).map((topic) => String(topic).toLowerCase()));

    return crmefVideos
      .filter((video) => video.id !== selectedVideo.id)
      .map((video) => {
        const tags = new Set((video.tags || []).map((tag) => String(tag).toLowerCase()));
        const topics = new Set((video.topics || []).map((topic) => String(topic).toLowerCase()));
        const sharedTags = [...currentTags].filter((tag) => tags.has(tag)).length;
        const sharedTopics = [...currentTopics].filter((topic) => topics.has(topic)).length;
        return {
          video,
          score: sharedTags * 2 + sharedTopics,
        };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.video.title.localeCompare(b.video.title))
      .slice(0, 6)
      .map(({ video }) => video);
  }, [selectedVideo]);

  const getNextVideo = useCallback(() => {
    if (!selectedVideo) return null;
    if (seriesVideos.length > 1) {
      const index = seriesVideos.findIndex((video) => video.id === selectedVideo.id);
      if (index >= 0 && index < seriesVideos.length - 1) return seriesVideos[index + 1];
    }
    const index = filteredVideos.findIndex((video) => video.id === selectedVideo.id);
    if (index >= 0 && index < filteredVideos.length - 1) return filteredVideos[index + 1];
    return null;
  }, [selectedVideo, seriesVideos, filteredVideos]);

  const getPrevVideo = useCallback(() => {
    if (!selectedVideo) return null;
    if (seriesVideos.length > 1) {
      const index = seriesVideos.findIndex((video) => video.id === selectedVideo.id);
      if (index > 0) return seriesVideos[index - 1];
    }
    const index = filteredVideos.findIndex((video) => video.id === selectedVideo.id);
    if (index > 0) return filteredVideos[index - 1];
    return null;
  }, [selectedVideo, seriesVideos, filteredVideos]);

  const selectedSavedProgress = useMemo(
    () => (selectedVideo ? loadSavedProgress(selectedVideo.id) : null),
    [selectedVideo, savedProgressMap, loadSavedProgress]
  );

  const handleSelectVideo = useCallback(
    (video) => {
      if (!video) return;
      setSelectedVideo(video);
      trackRecentlyWatched(video);
      const viewport = document.getElementById('crmef-video-viewport');
      viewport?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [trackRecentlyWatched]
  );

  const handleNext = useCallback(() => {
    const nextVideo = getNextVideo();
    if (nextVideo) handleSelectVideo(nextVideo);
  }, [getNextVideo, handleSelectVideo]);

  const handlePrev = useCallback(() => {
    const prevVideo = getPrevVideo();
    if (prevVideo) handleSelectVideo(prevVideo);
  }, [getPrevVideo, handleSelectVideo]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const active = document.activeElement;
      if (active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName)) return;
      if (event.code === 'Space') {
        event.preventDefault();
        document.querySelector('video')?.paused ? document.querySelector('video')?.play() : document.querySelector('video')?.pause();
      }
      if (event.code === 'ArrowRight') {
        const videoEl = document.querySelector('video');
        if (videoEl) videoEl.currentTime = Math.min(videoEl.duration || Infinity, videoEl.currentTime + 10);
      }
      if (event.code === 'ArrowLeft') {
        const videoEl = document.querySelector('video');
        if (videoEl) videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
      }
      if (event.key === 'f' || event.key === 'F') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.getElementById('crmef-video-viewport')?.requestFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <Film className={styles.titleIcon} size={24} />
          {'CRMEF Academy' || t('CRMEF.videos.title')}
        </h2>
        <p className={styles.subtitle}>
          {'Navigate the academy, review lessons, and keep progress across sessions.' || t('CRMEF.videos.subtitle')}
        </p>
      </header>

      <div className={styles.layout}>
        <main className={styles.playerColumn}>
          {selectedVideo ? (
            <>
              <Suspense fallback={<div className={styles.skeleton}>Loading video player…</div>}>
                <VideoPlayer
                  video={selectedVideo}
                  savedProgress={selectedSavedProgress}
                  playbackRate={playbackRate}
                  onPlaybackRateChange={setPlaybackRate}
                  onSaveProgress={saveProgress}
                  onEnded={handleNext}
                  onPrevVideo={handlePrev}
                  onNextVideo={handleNext}
                  canPrev={Boolean(getPrevVideo())}
                  canNext={Boolean(getNextVideo())}
                />
              </Suspense>

              <Suspense fallback={<div className={styles.skeleton}>Loading metadata…</div>}>
                <VideoMetadata
                  video={selectedVideo}
                  progress={selectedSavedProgress}
                  isFavorite={favorites.includes(selectedVideo.id)}
                  onToggleFavorite={toggleFavorite}
                  onMarkCompleted={(id, time, duration) => markCompleted(id, time, duration)}
                />
              </Suspense>

              <Suspense fallback={<div className={styles.skeleton}>Loading series…</div>}>
                <SeriesNavigation seriesVideos={seriesVideos} selectedVideo={selectedVideo} onSelectVideo={handleSelectVideo} totalDuration={totalSeriesDuration} />
              </Suspense>

              <Suspense fallback={<div className={styles.skeleton}>Loading related lessons…</div>}>
                <RelatedVideos relatedVideos={relatedVideos} onSelectVideo={handleSelectVideo} />
              </Suspense>
            </>
          ) : (
            <CrmefAcademyHome
              featured={featuredVideos}
              onStart={(video) => handleSelectVideo(video || crmefVideos[0])}
              onBrowse={() => {
                document.getElementById('crmef-sidebar')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}
        </main>

        <aside id="crmef-sidebar" className={styles.sidebarColumn}>
          <Suspense fallback={<div className={styles.skeleton}>Loading sidebar…</div>}>
            <Sidebar
              videos={filteredVideos}
              selectedVideoId={selectedVideo?.id}
              activeCategory={activeCategory}
              categories={categories}
              sortOption={sortOption}
              selectedLevel={selectedLevel}
              selectedLanguage={selectedLanguage}
              selectedLanguageOptions={languages}
              selectedSeries={selectedSeries}
              seriesOptions={seriesOptions}
              showFavoritesOnly={showFavoritesOnly}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              watchLater={watchLater}
              watchLaterVideos={watchLaterVideos}
              onToggleWatchLater={toggleWatchLater}
              featuredVideos={featuredVideos}
              recentVideos={recentVideos}
              searchQuery={rawSearch}
              isSearching={isSearching}
              onSearchChange={setRawSearch}
              onCategoryChange={setActiveCategory}
              onSortChange={setSortOption}
              onLevelChange={setSelectedLevel}
              onLanguageChange={setSelectedLanguage}
              onSeriesChange={setSelectedSeries}
              onToggleFavoritesOnly={() => setShowFavoritesOnly((active) => !active)}
              loadSavedProgress={loadSavedProgress}
              onSelectVideo={handleSelectVideo}
              progressSummary={progressSummary}
            />
          </Suspense>

          <div className={styles.sidebarFooter}>
            <div className={styles.quickStats}>
              <div>{filteredVideos.length} lessons</div>
              <div>{formatViews(filteredVideos.reduce((acc, video) => acc + Number(video.views || 0), 0))} total views</div>
            </div>
            <div className={styles.filterHelpers}>
              <button type="button" className={styles.filterButton} onClick={() => setShowFavoritesOnly((active) => !active)}>
                {showFavoritesOnly ? `Hide ${DEFAULT_FAVORITES_LABEL}` : `Show ${DEFAULT_FAVORITES_LABEL}`}
              </button>
              <button type="button" className={styles.filterButton} onClick={() => setSelectedSeries('All')}>
                Reset series
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
