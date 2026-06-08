import { useMemo, useCallback } from 'react';
import { crmefVideos } from '../../../../data/crmef.data';
import { parseViews } from '../utils/videoHelpers';

export default function useVideoFilters({ searchQuery, activeCategory, selectedLevel, selectedLanguage, selectedSeries, showFavoritesOnly, favorites, sortOption }) {
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    crmefVideos.forEach((v) => { if (v.category) cats.add(v.category); });
    return Array.from(cats);
  }, []);

  const languages = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach((v) => { if (v.language) set.add(v.language); });
    return Array.from(set);
  }, []);

  const seriesOptions = useMemo(() => {
    const set = new Set(['All']);
    crmefVideos.forEach((v) => { if (v.series) set.add(v.series); });
    return Array.from(set);
  }, []);

  const featuredVideos = useMemo(() => crmefVideos.filter((v) => v.featured), []);

  const sortedVideos = useCallback((videos) => {
    const items = [...videos];
    if (sortOption === 'oldest') return items.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortOption === 'mostViewed') return items.sort((a, b) => parseViews(a.views) - parseViews(b.views));
    if (sortOption === 'duration') return items.sort((a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0));
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [sortOption]);

  const filteredVideos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sortedVideos(
      crmefVideos.filter((video) => {
        const title = video.title?.toLowerCase() || '';
        const description = video.description?.toLowerCase() || '';
        const author = video.author?.toLowerCase() || '';
        const series = video.series?.toLowerCase() || '';
        const category = video.category?.toLowerCase() || '';
        const topics = (video.topics || []).map((t) => t.toLowerCase());
        const tags = (video.tags || []).map((t) => t.toLowerCase());

        const matchesSearch = query === '' || title.includes(query) || description.includes(query) || author.includes(query) || series.includes(query) || category.includes(query) || topics.some((t) => t.includes(query)) || tags.some((t) => t.includes(query));
        const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
        const matchesLevel = selectedLevel === 'All' || video.level === selectedLevel;
        const matchesLanguage = selectedLanguage === 'All' || video.language === selectedLanguage;
        const matchesSeries = selectedSeries === 'All' || video.series === selectedSeries;
        const matchesFavorite = !showFavoritesOnly || favorites.includes(video.id);

        return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesSeries && matchesFavorite;
      })
    );
  }, [searchQuery, activeCategory, selectedLevel, selectedLanguage, selectedSeries, showFavoritesOnly, favorites, sortedVideos]);

  return { categories, languages, seriesOptions, featuredVideos, filteredVideos };
}
