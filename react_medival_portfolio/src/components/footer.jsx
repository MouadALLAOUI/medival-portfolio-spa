import { useState, useEffect } from 'react';
import { useSettings } from '../lib/useSettings';
import styles from './footer.module.scss';

const QUOTES = [
    "“Any sufficiently advanced technology is indistinguishable from magic.” — Arthur C. Clarke",
    "“Code is like humor. When you have to explain it, it’s bad.” — Cory House",
    "“The only way to learn a new programming language is by writing programs in it.” — Dennis Ritchie",
    "“First, solve the problem. Then, write the code.” — John Johnson",
    "“The scariest moment is always just before you start.” — Stephen King",
    "“Wisdom begins in wonder.” — Socrates",
    "“A journey of a thousand miles begins with a single step.” — Lao Tzu"
];

const Footer = () => {
    const { t } = useSettings();
    const currentYear = new Date().getFullYear();
    const [quote, setQuote] = useState('');

    useEffect(() => {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    return (
        <footer className={styles['medieval-footer']}>
            <div className={styles['footer-quote']}>
                <p>{quote}</p>
            </div>
            <p>{t('COMMON.footer.copyright', { year: currentYear })}</p>
            <p>{t('COMMON.footer.disclaimer')}</p>
        </footer>
    );
};

export default Footer;