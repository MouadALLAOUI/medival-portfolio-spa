import React from 'react';
import styles from '../CrmefVideosPage.module.scss';

const RelatedVideos = ({ relatedVideos, onSelectVideo }) => {
    if (!relatedVideos?.length) return null;

    return (
        <section className={styles.sectionCard}>
            <div className={styles.sectionHeading}>
                <h3>Related content</h3>
                <p>Recommended lessons based on matching topics and tags.</p>
            </div>
            <div className={styles.relatedGrid}>
                {relatedVideos.map((video) => (
                    <button key={video.id} type="button" className={styles.relatedCard} onClick={() => onSelectVideo(video)}>
                        <strong>{video.title}</strong>
                        <span>{video.category}</span>
                        <small>{video.level}</small>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default React.memo(RelatedVideos);
