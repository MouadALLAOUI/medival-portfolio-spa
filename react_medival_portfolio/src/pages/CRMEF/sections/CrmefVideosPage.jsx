/* eslint-disable no-constant-binary-expression */
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Film, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { crmefVideos } from '../../../data/crmef.data';

import { useSettings } from '../../../lib/useSettings';
import { useAchievements } from '../../../lib/useAchievements';
import useDebounce from './hooks/useDebounce';
import useVideoProgress from './hooks/useVideoProgress';
import { formatViews, parseViews, formatDurationHuman, parseDuration } from './utils/videoHelpers';
import styles from './CrmefVideosPage.module.scss';

const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
const VideoMetadata = lazy(() => import('./components/VideoMetadata'));
const Sidebar = lazy(() => import('./components/Sidebar'));

export default function CrmefVideosPage() {
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();
  const [selectedVideo, setSelectedVideo] = useState(() => crmefVideos[0] || null);
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
    savedProgressMap,
    loadSavedProgress,
    saveProgress,
    markCompleted,
    toggleFavorite,
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

  const progressPercent = useMemo(() => {
    const total = progressSummary.completed + progressSummary.inProgress + progressSummary.notStarted;
    if (total === 0) return 0;
    return Math.round((progressSummary.completed / total) * 100);
  }, [progressSummary]);

  const completedIds = useMemo(() => {
    const ids = new Set();
    crmefVideos.forEach((video) => {
      const p = loadSavedProgress(video.id);
      if (p?.viewed) ids.add(video.id);
    });
    return ids;
  }, [savedProgressMap, loadSavedProgress]);

  const seriesVideos = useMemo(() => {
    if (!selectedVideo?.series) return [];
    return crmefVideos
      .filter((video) => video.series === selectedVideo.series)
      .sort((a, b) => (Number(a.episode) || 0) - (Number(b.episode) || 0));
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
    unlockAchievement('video_scholar');
  }, [unlockAchievement]);

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

  const handleMarkCompleteAndNext = useCallback(() => {
    if (!selectedVideo) return;
    markCompleted(selectedVideo.id, selectedSavedProgress?.currentTime || 0, selectedSavedProgress?.duration || 0);
    const next = getNextVideo();
    if (next) handleSelectVideo(next);
  }, [selectedVideo, selectedSavedProgress, markCompleted, getNextVideo, handleSelectVideo]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <Film className={styles.titleIcon} size={24} />
          {t('CRMEF.videos.title')}
        </h2>
        <p className={styles.subtitle}>
          {t('CRMEF.videos.subtitle')}
        </p>
      </header>

      <div className={styles.layout}>
        <main className={styles.playerColumn}>
          {selectedVideo && (
            <>
              <div className={styles.breadcrumbs}>
                <button type="button" className={styles.breadcrumbLink} onClick={() => {}}>{'CRMEF'}</button>
                <ChevronRight className={styles.breadcrumbSep} size={12} />
                <span className={styles.breadcrumbCurrent}>{selectedVideo.series || selectedVideo.category}</span>
                <ChevronRight className={styles.breadcrumbSep} size={12} />
                <span className={styles.breadcrumbCurrent}>{selectedVideo.title}</span>
              </div>

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

              <div className={styles.courseProgress}>
                <div className={styles.courseProgressBar}>
                  <div className={styles.courseProgressFill} style={{ width: `${progressPercent}%` }} />
                </div>
                <div className={styles.courseProgressLabel}>
                  <span>{progressPercent}% complete</span>
                  <span>{progressSummary.completed}/{progressSummary.completed + progressSummary.inProgress + progressSummary.notStarted} lessons</span>
                </div>
              </div>

              <Suspense fallback={<div className={styles.skeleton}>Loading metadata…</div>}>
                <VideoMetadata
                  video={selectedVideo}
                  isFavorite={favorites.includes(selectedVideo.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </Suspense>

              <button
                type="button"
                className={styles.completeNextBtn}
                onClick={handleMarkCompleteAndNext}
                disabled={!getNextVideo()}
              >
                <CheckCircle size={20} />
                {selectedSavedProgress?.viewed ? 'Completed — Next Lesson' : 'Mark as Complete & Next Lesson'}
                <ArrowRight size={20} />
              </button>
            </>
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
              completedIds={completedIds}
              totalVideos={crmefVideos.length}
              totalViews={formatViews(crmefVideos.reduce((acc, video) => acc + Number(video.views || 0), 0))}
            />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
