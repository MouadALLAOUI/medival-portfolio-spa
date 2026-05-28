import { getAssetById } from '../../../data/mediaManager';
import { useState } from "react";
import CSection from "../../../templates/Section";
const profileImg = getAssetById('mouad-pic-png').path;
import { useSettings } from "../../../lib/useSettings";
import { useAlerts } from "../../../lib/useAlerts";
import styles from "./presentation.module.scss";

const PresentationSection = () => {
    const { t } = useSettings();
    const { showAlert } = useAlerts();
    const [clickCount, setClickCount] = useState(0);

    const handlePortraitClick = () => {
        setClickCount(prev => prev + 1);
        if (clickCount + 1 === 5) {
            showAlert(t('COMMON.alerts.secretPortraitUnlocked') || '🧙‍♂️ You have discovered the hidden portrait of the Grand Archmage!', 'royal', 5000);
            setClickCount(0);
        }
    };

    const greetingsText = t('HOME.PRESENTATION.greetings');
    const initialLetter = greetingsText.charAt(0);
    const restGreetingsText = greetingsText.slice(1);

    return (
        <CSection id="presentation" title={t('HOME.PRESENTATION.title')} classname="presentation-section">
            <div className={styles['presentation-container']}>
                <div className={styles['portrait-frame']} onClick={handlePortraitClick} style={{ cursor: 'pointer' }}>
                    <img
                        src={profileImg}
                        alt={t('HOME.PRESENTATION.portraitAlt')}
                        loading="lazy"
                    />
                </div>

                <div className={`${styles['description-scroll']} combined-legendary-bio`}>
                    <div className={`${styles['scroll-content']} scroll-content`}>
                        <h2 className={styles['scroll-title']}>{t('HOME.PRESENTATION.subtitle')}</h2>

                        <p className={styles['drop-cap']}>
                            <span className={styles['initial']}>{initialLetter}</span>
                            {restGreetingsText}
                        </p>

                        <div className={styles['scroll-separator']}></div>

                        <p>
                            {t('HOME.PRESENTATION.tiredless')}
                        </p>

                        <div className={styles['scroll-separator']}></div>

                        <p>
                            {t('HOME.PRESENTATION.sworn')}
                        </p>

                        <div className={styles['scroll-separator']}></div>

                        <p>
                            {t('HOME.PRESENTATION.ongoing')}
                        </p>
                    </div>
                </div>

            </div>
        </CSection>
    )
}

export default PresentationSection;