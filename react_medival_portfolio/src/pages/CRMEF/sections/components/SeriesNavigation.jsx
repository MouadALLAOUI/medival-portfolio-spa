import React from 'react';
import styles from '../CrmefVideosPage.module.scss';
import { formatDurationHuman } from '../utils/videoHelpers';

const SeriesNavigation = ({ seriesVideos, selectedVideo, onSelectVideo, totalDuration }) => {
    if (!seriesVideos?.length) return null;

    const currentEpisode = selectedVideo ? seriesVideos.findIndex((video) => video.id === selectedVideo.id) + 1 : null;

    return (
        <section className={styles.sectionCard}>
            <div className={styles.sectionHeading}>
                <h3>Series</h3>
                <p>Episodes from the same track</p>
                {currentEpisode ? <small>Episode {currentEpisode} of {seriesVideos.length}</small> : null}
                {totalDuration ? <small>Total: {formatDurationHuman(totalDuration)}</small> : null}
            </div>
            <div className={styles.seriesList}>
                {seriesVideos.map((video) => (
                    <button
                        key={video.id}
                        type="button"
                        className={`${styles.seriesItem} ${selectedVideo?.id === video.id ? styles.seriesItemActive : ''}`}
                        onClick={() => onSelectVideo(video)}
                    >
                        <span>{video.title}</span>
                        <small>{video.category} • {video.level}</small>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default React.memo(SeriesNavigation);
