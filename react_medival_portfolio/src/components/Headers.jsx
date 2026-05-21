import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../lib/useSettings';

const HeaderComponent = () => {
  const location = useLocation();
  const { openSettings } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: 'ACCUEIL', href: '/', isTrigger: false },
    {
      label: 'HOME', href: '/home', isTrigger: true, subItems: [
        { label: 'hero', href: '#hero' },
        { label: 'presentation', href: '#presentation' },
        { label: 'languages', href: '#languages' },
        { label: 'skills', href: '#skills' },
        { label: 'projects', href: '#projects' },
        { label: 'design', href: '#design' },
        { label: 'about', href: '#about' },
        { label: 'contact', href: '#contact' },
      ]
    },
    { label: 'PROJETS', href: '/projects', isTrigger: false },
    { label: 'My blogs', href: '/blogs', isTrigger: false },
    { label: 'CMREF Portfolio', href: '/CMREF', isTrigger: false, color: 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-900' },
    { label: 'Kids Typing Game', href: '/fallingletters', isTrigger: false, color: 'bg-blue-600 text-white hover:bg-blue-50 hover:text-rose-900' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const isActive = (href) => {
    if (href.startsWith('#')) return location.hash === href;
    if (href === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === href;
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`nav-container ${isScrolled ? 'nav-scrolled' : ''} ${isMobileMenuOpen ? 'active mobile-menu-active' : ''}`}
      id="nav-container"
    >
      <div className="nav-title">
        <img src="/assets/favicon.ico" alt="logo" />
        <p>Mouad the Coder</p>
      </div>

      <div className="nav-scroll">
        <div className="nav-links">
          {menuItems.map((item) => {
            if (item.isTrigger && item.subItems) {
              return item.subItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  to={`/home${subItem.href}`}
                  className={`nav-link ${isActive(subItem.href) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {subItem.label === 'hero'
                    ? 'Oracle'
                    : subItem.label === 'presentation'
                      ? 'The Craftsman'
                      : subItem.label === 'skills'
                        ? 'Scroll of Skills'
                        : subItem.label === 'projects'
                          ? 'Tech Quests'
                          : subItem.label === 'about'
                            ? 'Coding Lore'
                            : subItem.label === 'contact'
                              ? 'Send Raven'
                              : subItem.label === 'hobbies'
                                ? 'Beyond Code'
                                : subItem.label === 'design'
                                  ? 'Design Forge'
                                  : 'Tongues of the Realm'}
                </Link>
              ));
            }

            if (item.label === 'My blogs' || item.label === 'CMREF Portfolio' || item.label === 'Kids Typing Game') {
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  title={item.label === 'Kids Typing Game' ? 'desktop' : undefined}
                  style={item.label === 'Kids Typing Game' ? { backgroundColor: '#667eea' } : undefined}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            }

            return null;
          })}

          <Link
            to="#"
            className="nav-link nav-settings-btn"
            id="open-settings"
            data-i18n="nav.settings"
            aria-haspopup="dialog"
            aria-controls="settings-modal"
            onClick={(e) => {
              e.preventDefault();
              openSettings();
              closeMobileMenu();
            }}
          >
            Rune Settings
          </Link>
        </div>
      </div>

      <div className="nav-actions">
        <button
          className="nav-gear-btn"
          id="open-settings-gear"
          type="button"
          aria-label="Open settings"
          aria-haspopup="dialog"
          aria-controls="settings-modal"
          onClick={openSettings}
        >
          ⚙
        </button>
      </div>

      <div className="nav-toggle">
        <button className="mobile-menu-btn" type="button" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default HeaderComponent;
