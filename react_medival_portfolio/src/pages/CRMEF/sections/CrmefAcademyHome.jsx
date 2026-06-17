import React from 'react';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefVideosPage.module.scss';

export default function CrmefAcademyHome({ onStart, onBrowse, featured = [] }) {
    const { t } = useSettings();
    return (
        <div className={styles.academyHome}>
            <div className={styles.homeIntro}>
                <h2>{t('CRMEF.videos.home.title')}</h2>
                <p>
                    {t('CRMEF.videos.home.subtitle')}
                </p>
                <div className={styles.homeActions}>
                    <button type="button" className={styles.primaryBtn} onClick={onStart}>{t('CRMEF.videos.home.startFirst')}</button>
                    <button type="button" className={styles.secondaryBtn} onClick={onBrowse}>{t('CRMEF.videos.home.browse')}</button>
                </div>
            </div>

            {featured.length > 0 && (
                <div className={styles.homeFeatured}>
                    <h3>{t('CRMEF.videos.home.featured')}</h3>
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
