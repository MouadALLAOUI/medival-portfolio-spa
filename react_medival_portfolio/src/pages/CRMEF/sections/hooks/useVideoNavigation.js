import { useMemo, useCallback } from 'react';
import { crmefVideos } from '../../../../data/crmef.data';

export default function useVideoNavigation({ selectedVideo, filteredVideos }) {
  const seriesVideos = useMemo(() => {
    if (!selectedVideo?.series) return [];
    return crmefVideos
      .filter((v) => v.series === selectedVideo.series)
      .sort((a, b) => (Number(a.episode) || 0) - (Number(b.episode) || 0));
  }, [selectedVideo]);

  const totalSeriesDuration = useMemo(() => {
    if (!seriesVideos.length) return 0;
    return seriesVideos.reduce((acc, v) => acc + (Number(v.duration) || 0), 0);
  }, [seriesVideos]);

  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];
    const explicit = selectedVideo.relatedVideos?.map((id) => crmefVideos.find((v) => v.id === id)).filter(Boolean);
    if (explicit?.length) return explicit;

    const currentTags = new Set((selectedVideo.tags || []).map((t) => String(t).toLowerCase()));
    const currentTopics = new Set((selectedVideo.topics || []).map((t) => String(t).toLowerCase()));

    return crmefVideos
      .filter((v) => v.id !== selectedVideo.id)
      .map((v) => {
        const tags = new Set((v.tags || []).map((t) => String(t).toLowerCase()));
        const topics = new Set((v.topics || []).map((t) => String(t).toLowerCase()));
        const sharedTags = [...currentTags].filter((t) => tags.has(t)).length;
        const sharedTopics = [...currentTopics].filter((t) => topics.has(t)).length;
        return { video: v, score: sharedTags * 2 + sharedTopics };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.video.title.localeCompare(b.video.title))
      .slice(0, 6)
      .map(({ video }) => video);
  }, [selectedVideo]);

  const getNextVideo = useCallback(() => {
    if (!selectedVideo) return null;
    if (seriesVideos.length > 1) {
      const index = seriesVideos.findIndex((v) => v.id === selectedVideo.id);
      if (index >= 0 && index < seriesVideos.length - 1) return seriesVideos[index + 1];
    }
    const index = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
    if (index >= 0 && index < filteredVideos.length - 1) return filteredVideos[index + 1];
    return null;
  }, [selectedVideo, seriesVideos, filteredVideos]);

  const getPrevVideo = useCallback(() => {
    if (!selectedVideo) return null;
    if (seriesVideos.length > 1) {
      const index = seriesVideos.findIndex((v) => v.id === selectedVideo.id);
      if (index > 0) return seriesVideos[index - 1];
    }
    const index = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
    if (index > 0) return filteredVideos[index - 1];
    return null;
  }, [selectedVideo, seriesVideos, filteredVideos]);

  return { seriesVideos, totalSeriesDuration, relatedVideos, getNextVideo, getPrevVideo };
}
