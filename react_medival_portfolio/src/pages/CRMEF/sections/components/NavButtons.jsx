import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from '../CrmefVideosPage.module.scss';

const NavButtons = ({ onPrev, onNext, canPrev, canNext }) => (
    <div className={styles.navButtons}>
        <button type="button" onClick={onPrev} disabled={!canPrev} className={styles.navButton}>
            <ArrowLeft size={16} /> Previous
        </button>
        <button type="button" onClick={onNext} disabled={!canNext} className={styles.navButton}>
            Next <ArrowRight size={16} />
        </button>
    </div>
);

export default React.memo(NavButtons);
