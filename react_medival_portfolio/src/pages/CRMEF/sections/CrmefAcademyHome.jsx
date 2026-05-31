import React from 'react';
import styles from './CrmefVideosPage.module.scss';

export default function CrmefAcademyHome({ onStart, onBrowse, featured = [] }) {
    return (
        <div className={styles.academyHome}>
            <div className={styles.homeIntro}>
                <h2>Bienvenue à CRMEF Academy</h2>
                <p>
                    Welcome to the CRMEF learning hub — browse featured courses, discover
                    tracks by difficulty, and resume where you left off.
                </p>
                <div className={styles.homeActions}>
                    <button type="button" className={styles.primaryBtn} onClick={onStart}>Start the First Course</button>
                    <button type="button" className={styles.secondaryBtn} onClick={onBrowse}>Browse Library</button>
                </div>
            </div>

            {featured.length > 0 && (
                <div className={styles.homeFeatured}>
                    <h3>Featured Courses</h3>
                    <div className={styles.featuredListSmall}>
                        {featured.map(v => (
                            <button key={v.id} type="button" className={styles.featuredCardSmall} onClick={() => onStart(v)}>
                                <img src={v.thumbnail} alt={v.title} />
                                <div>
                                    <strong>{v.title}</strong>
                                    <div className={styles.smallMeta}>{v.series || v.category}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
