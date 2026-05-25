import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsModal from '../SettingsModal';
import styles from './CrmefHeader.module.scss';

const CRMEF_NAV = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Semestre 1', href: '#semestre1' },
  { label: 'MSP', href: '#msp' },
  { label: 'home', href: '/' },
];

const CrmefHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState('#accueil');

  useEffect(() => {
    const hash = location.hash || '#accueil';
    setActiveHash(hash);
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>⚜️</span>
        <span className={styles.brandName}>CRMEF</span>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        {CRMEF_NAV.map(item => (
          <a
            key={item.label}
            href={item.href}
            className={`${styles.navLink} ${activeHash === item.href ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.settingsBtn}
          onClick={() => setSettingsOpen(true)}
          aria-label="Settings"
          type="button"
        >
          ⚙️
        </button>
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
          type="button"
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showTheme={true}
        showPdfMode={true}
        showPdfReadingMode={true}
        title="⚙️ CRMEF Settings"
      />
    </header>
  );
};

export default CrmefHeader;
