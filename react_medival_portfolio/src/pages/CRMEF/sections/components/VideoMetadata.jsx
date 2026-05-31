import React from 'react';
import styles from '../CrmefVideosPage.module.scss';
import { normalizeDifficulty, formatViews, formatDurationHuman, parseDuration } from '../utils/videoHelpers';
import ProgressBadge from './ProgressBadge';

const VideoMetadata = ({ video, progress, isFavorite, onToggleFavorite, onMarkCompleted }) => {
    if (!video) return null;

    const toList = (value) => (Array.isArray(value) ? value : typeof value === 'string' && value ? [value] : []);
    const objectives = toList(video.learningObjectives);
    const prerequisites = toList(video.prerequisites);
    const outcomes = toList(video.expectedOutcomes || video.outcomes);
    const topics = toList(video.topics);
    const tags = toList(video.tags);

    const technicalItems = [
        { label: 'Resolution', value: video.resolution },
        { label: 'Format', value: video.format },
        { label: 'Codec', value: video.codec },
        { label: 'File Size', value: video.fileSize },
        { label: 'Subtitles', value: Array.isArray(video.subtitles) ? `${video.subtitles.length} available` : video.subtitles ? 'Available' : 'None' },
    ].filter((item) => item.value);

    return (
        <section className={styles.videoMetadataCard}>
            <div className={styles.metadataHeader}>
                <div>
                    <div className={styles.badgeRow}>
                        <span className={styles.difficultyBadge}>{normalizeDifficulty(video.level)}</span>
                        {video.language && <span className={styles.languageBadge}>{video.language}</span>}
                    </div>
                    <h2>{video.title}</h2>
                    <p className={styles.videoSubtitle}>{video.category}</p>
                </div>
                <button type="button" className={styles.favoriteButton} onClick={() => onToggleFavorite(video.id)}>
                    {isFavorite ? '★ Favorite' : '☆ Favorite'}
                </button>
            </div>

            <div className={styles.metadataStats}>
                <span>{formatViews(video.views)} views</span>
                <span>{video.duration ? formatDurationHuman(video.duration) : 'Duration unknown'}</span>
                {video.speaker && <span>By {video.speaker}</span>}
                {progress?.currentTime ? <span>Resume at {parseDuration(progress.currentTime)}</span> : null}
            </div>

            {technicalItems.length > 0 && (
                <div className={styles.technicalInfo}>
                    {technicalItems.map((item) => (
                        <div key={item.label} className={styles.techRow}>
                            <strong>{item.label}</strong>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
            )}

            <p className={styles.videoDescription}>{video.description}</p>

            <div className={styles.learningGrid}>
                <div>
                    <h4>Prerequisites</h4>
                    {prerequisites.length > 0 ? (
                        <ul>{prerequisites.map((item, index) => <li key={index}>{item}</li>)}</ul>
                    ) : (
                        <p>No prerequisites listed.</p>
                    )}
                </div>
                <div>
                    <h4>Objectives</h4>
                    {objectives.length > 0 ? (
                        <ul>{objectives.map((item, index) => <li key={index}>{item}</li>)}</ul>
                    ) : (
                        <p>What you will learn in this session.</p>
                    )}
                </div>
                <div>
                    <h4>Outcomes</h4>
                    {outcomes.length > 0 ? (
                        <ul>{outcomes.map((item, index) => <li key={index}>{item}</li>)}</ul>
                    ) : (
                        <p>Expected results after watching.</p>
                    )}
                </div>
            </div>

            <div className={styles.topicSection}>
                <div>
                    <h4>Topics</h4>
                    {topics.length > 0 ? (
                        <div className={styles.topicChips}>
                            {topics.map((topic, index) => (
                                <span key={`${topic}-${index}`} className={styles.topicChip}>{topic}</span>
                            ))}
                        </div>
                    ) : (
                        <p>No topics available.</p>
                    )}
                </div>
                <div>
                    <h4>Tags</h4>
                    {tags.length > 0 ? (
                        <div className={styles.topicChips}>
                            {tags.map((tag, index) => (
                                <span key={`${tag}-${index}`} className={styles.tagChip}>{tag}</span>
                            ))}
                        </div>
                    ) : (
                        <p>No tags provided.</p>
                    )}
                </div>
            </div>

            <ProgressBadge progress={progress} />

            <button type="button" className={styles.completeButton} onClick={() => onMarkCompleted(video.id, progress?.currentTime || 0, progress?.duration || 0)}>
                Mark as completed
            </button>
        </section>
    );
};

export default React.memo(VideoMetadata);
