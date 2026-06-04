import { useState, useEffect } from 'react';
import { useSettings } from '../lib/useSettings';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import styles from './footer.module.scss';

const QUOTES = [
  "“A programmer is a wizard who writes incantations in parchment of silicone.”",
  "“Thy code shall be clean, and thy bugs shall be vanquished.”",
  "“There are 10 types of people in the realm: those who understand binary, and those who do not.”",
  "“A quill of ink, a loom of code; both spin stories out of thin air.”",
  "“He who speaks to the compiler speaks to the oracle of the kingdom.”",
  "“Any sufficiently advanced technology is indistinguishable from magic.” — Arthur C. Clarke",
  "“First, solve the problem. Then, write the code.” — John Johnson",
  "“In the scroll of programming, the best lines are written with simple strokes.”",
  "“A compiler is a dragon that breathes fire at syntax errors.”",
  "“Code is like a castle; built stone by stone, logic by logic, defending against bugs.”"
];

const Footer = () => {
  const { t } = useSettings();
  const currentYear = new Date().getFullYear();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles['medieval-footer']}>
      <div className={styles['footer-quote']}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.5 }}
            style={{ margin: 0 }}
          >
            {QUOTES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <p>{t('COMMON.footer.copyright', { year: currentYear })}</p>
      <p>{t('COMMON.footer.disclaimer')}</p>
    </footer>
  );
};

export default Footer;