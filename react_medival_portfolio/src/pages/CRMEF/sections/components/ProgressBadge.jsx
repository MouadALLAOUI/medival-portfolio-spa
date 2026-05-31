import React from 'react';
import styles from '../CrmefVideosPage.module.scss';

const ProgressBadge = ({ progress }) => {
    if (!progress) return null;

    const percentage = progress.duration
        ? Math.min(100, Math.round((progress.currentTime / progress.duration) * 100))
        : 0;

    return (
        <div className={styles.progressBadge}>
            <span>{percentage}% watched</span>
            <span className={styles.badgeLabel}>{progress.viewed ? 'Completed' : 'In progress'}</span>
        </div>
    );
};

export default React.memo(ProgressBadge);
