import { useSettings } from '../lib/useSettings';
import styles from './footer.module.scss';

const Footer = () => {
    const { t } = useSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles['medieval-footer']}>
            <p>{t('COMMON.footer.copyright', { year: currentYear })}</p>
            <p>{t('COMMON.footer.disclaimer')}</p>
        </footer>
    );
};

export default Footer;