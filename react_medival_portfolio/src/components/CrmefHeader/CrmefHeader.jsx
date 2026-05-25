import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsModal from '../SettingsModal';
import { useSettings } from '../../lib/useSettings';
import styles from './CrmefHeader.module.scss';

const CrmefHeader = () => {
  const { t } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState('#accueil');

  const CRMEF_NAV = [
    { label: t('CRMEF.header.accueil'), href: '#accueil' },
    { label: t('CRMEF.header.semester1'), href: '#semestre1' },
    { label: t('CRMEF.header.msp'), href: '#msp' },
    { label: t('COMMON.nav.home'), href: '/' },
  ];

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
          aria-label={t('COMMON.nav.settingsGear')}
          type="button"
        >
          ⚙️
        </button>
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? t('COMMON.nav.closeMenu') || "Close navigation menu" : t('COMMON.nav.toggleMenu') || "Toggle navigation menu"}
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
        title={t('CRMEF.header.title')}
      />
    </header>
  );
};

export default CrmefHeader;
