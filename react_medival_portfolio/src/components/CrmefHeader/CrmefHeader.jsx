import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Settings } from 'lucide-react';
import SettingsModal from '../SettingsModal';
import { useSettings } from '../../lib/useSettings';
import styles from './CrmefHeader.module.scss';

const CrmefHeader = () => {
  const { t } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const activeHash = location.hash || '#accueil';

  const CRMEF_NAV = [
    { label: t('CRMEF.header.accueil'), href: '#accueil' },
    {
      label: t('CRMEF.header.semesters'),
      href: '#semestre',
      isTrigger: true,
      subItems: [
        { label: t('CRMEF.header.semester1'), href: '#semestre1' },
        { label: t('CRMEF.header.semester2'), href: '#semestre2' },
      ],
    },
    { label: t('CRMEF.header.msp'), href: '#msp' },
      {
        label: t('about.showMore'), href: '#other', isTrigger: true,
        subItems: [
          { label: t('CRMEF.header.formation'), href: '#formation' },
          { label: t('CRMEF.header.critique'), href: '#critique' },
          { label: t('CRMEF.header.videos'), href: '#videos' },
          { label: t('CRMEF.header.gallery'), href: '#gallery' },
        ],
      },
  ];

  const handleMouseEnter = (label) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>⚜️</span>
        <span className={styles.brandName}>CRMEF</span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className={`${styles.nav} ${styles.desktopMenu}`}>
        {CRMEF_NAV.map(item => {
          if (item.isTrigger && item.subItems) {
            const hasActiveSubItem = item.subItems.some(sub => activeHash === sub.href);
            return (
              <div
                key={item.label}
                className={styles.dropdownWrapper}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href}
                  onClick={(e) => e.preventDefault()}
                  className={`${styles.navLink} ${styles.navLinkTrigger} ${hasActiveSubItem ? styles.active : ''}`}
                >
                  {item.label}
                  <ChevronDown size={12} className={styles.chevronIcon} />
                </a>

                {openMenu === item.label && (
                  <div className={styles.dropdownMenu}>
                    {item.subItems.map(subItem => (
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        className={`${styles.navLink} ${activeHash === subItem.href ? styles.active : ''}`}
                        onClick={() => setOpenMenu(null)}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${activeHash === item.href ? styles.active : ''}`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Mobile/Tablet Dropdown Navigation Links */}
      <nav className={`${styles.nav} ${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {CRMEF_NAV.map(item => {
          if (item.isTrigger && item.subItems) {
            return item.subItems.map(subItem => (
              <a
                key={subItem.href}
                href={subItem.href}
                className={`${styles.navLink} ${activeHash === subItem.href ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {subItem.label}
              </a>
            ));
          }

          return (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${activeHash === item.href ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.settingsBtn}
          onClick={() => setSettingsOpen(true)}
          aria-label={t('COMMON.nav.settingsGear')}
          type="button"
        >
          <Settings size={20} />
        </button>
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? t('COMMON.nav.closeMenu') || "Close navigation menu" : t('COMMON.nav.toggleMenu') || "Toggle navigation menu"}
          type="button"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
