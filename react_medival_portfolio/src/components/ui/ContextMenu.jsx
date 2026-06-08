import { createPortal } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import useContextMenu from '../../hooks/useContextMenu';
import { useInputActions } from '../../hooks/useInputActions';
import { useTheme } from '../../lib/contexts/ThemeProvider';
import { useAchievements } from '../../lib/useAchievements';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import styles from './ContextMenu.module.scss';

export default function ContextMenu() {
  const navigate = useNavigate();
  const { x, y, visible, closeMenu, targetElement } = useContextMenu();
  const { theme, themes, switchTheme } = useTheme();
  const { setBoolean, isCompleted, incrementCounter } = useAchievements();
  const { showAlert } = useAlerts();
  const { t, language, setLanguage } = useSettings();

  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [shouldRender, setShouldRender] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [submenuSide, setSubmenuSide] = useState('right');
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredItemTop, setHoveredItemTop] = useState(0);
  const submenuTimeoutRef = useRef(null);

  const isInput = targetElement instanceof HTMLInputElement ||
                  targetElement instanceof HTMLTextAreaElement ||
                  (targetElement instanceof HTMLElement && targetElement.isContentEditable);

  const { actionStrings, handleCopyInput, handleCutInput, handlePasteInput } = useInputActions(targetElement, closeMenu);

  useEffect(() => {
    if (!visible) {
      setActiveSubmenu(null);
      if (submenuTimeoutRef.current) { clearTimeout(submenuTimeoutRef.current); submenuTimeoutRef.current = null; }
    }
  }, [visible]);

  useEffect(() => () => { if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current); }, []);

  const handleMouseEnterItem = (submenuName, e) => {
    if (submenuTimeoutRef.current) { clearTimeout(submenuTimeoutRef.current); submenuTimeoutRef.current = null; }
    const itemElement = e.currentTarget;
    setHoveredItemTop(itemElement.offsetTop - (itemElement.parentElement?.scrollTop || 0));
    setActiveSubmenu(submenuName);
  };

  const handleMouseLeaveItem = () => {
    submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), 180);
  };

  const handleMouseEnterSubmenu = () => {
    if (submenuTimeoutRef.current) { clearTimeout(submenuTimeoutRef.current); submenuTimeoutRef.current = null; }
  };

  const handleMouseLeaveSubmenu = () => {
    submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), 180);
  };

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsHiding(false);
      incrementCounter('context_menu_used');
    } else if (shouldRender) {
      setIsHiding(true);
      const timer = setTimeout(() => { setShouldRender(false); setIsHiding(false); }, 90);
      return () => clearTimeout(timer);
    }
  }, [visible, shouldRender, incrementCounter]);

  useEffect(() => {
    if (shouldRender && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let posX = x, posY = y;
      if (x + rect.width > window.innerWidth) posX = window.innerWidth - rect.width - 12;
      if (y + rect.height > window.innerHeight) posY = window.innerHeight - rect.height - 12;
      if (posX < 12) posX = 12;
      if (posY < 12) posY = 12;
      setCoords({ x: posX, y: posY });
      setSubmenuSide(posX + rect.width + 200 > window.innerWidth ? 'left' : 'right');
    }
  }, [x, y, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const handleClickOutside = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu(); };
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', handleKeyDown); };
  }, [shouldRender, closeMenu]);

  if (!shouldRender) return null;

  const handleNavigate = (path) => { navigate(path); closeMenu(); };
  const handleToggleTheme = () => {
    const themeCycle = ['light', 'dark', 'medieval'];
    const nextTheme = themeCycle[(themeCycle.indexOf(theme) + 1) % themeCycle.length];
    switchTheme(nextTheme);
    showAlert(t('COMMON.alerts.themeAltered', { theme: t(`COMMON.settings.keys.theme.options.${nextTheme}.label`) || themes[nextTheme]?.label || nextTheme }), 'info', 2000);
    closeMenu();
  };
  const handleSetLanguage = (lang) => { setLanguage(lang); closeMenu(); };
  const handlePrint = () => { window.print(); closeMenu(); };
  const handleUnlockAchievement = () => {
    if (isCompleted('easteregg')) { showAlert(t('COMMON.alerts.portalAlreadyBreached'), 'info', 3000); }
    else { setBoolean('easteregg', true); }
    closeMenu();
  };

  const selectedText = window.getSelection() ? window.getSelection().toString().trim() : '';

  const getMenuItems = () => {
    const items = [
      { id: 'reload', icon: '🔄', label: t('contextMenu.reload'), action: () => window.location.reload() },
      { type: 'divider' }
    ];

    if (isInput) {
      items.push(
        { id: 'cut', icon: '✂️', label: actionStrings.cut, action: handleCutInput },
        { id: 'copy', icon: '📋', label: actionStrings.copy, action: handleCopyInput },
        { id: 'paste', icon: '📋', label: actionStrings.paste, action: handlePasteInput },
        { type: 'divider' }
      );
    } else if (selectedText) {
      items.push(
        { id: 'copy', icon: '📋', label: t('contextMenu.copy'), action: () => { navigator.clipboard.writeText(selectedText); showAlert(t('COMMON.alerts.copySuccess', { label: t('COMMON.contextMenu.textLabel') || 'text' }), 'success', 2000); } },
        { id: 'search', icon: '🔍', label: t('contextMenu.search'), action: () => window.open(`https://google.com/search?q=${encodeURIComponent(selectedText)}`, '_blank') },
        { type: 'divider' }
      );
    }

    if (targetElement?.closest('a')) {
      const href = targetElement.closest('a').href;
      items.push(
        { id: 'openLink', icon: '🔗', label: t('contextMenu.openInNewTab'), action: () => window.open(href, '_blank') },
        { id: 'copyLink', icon: '📎', label: t('contextMenu.copyLink'), action: () => { navigator.clipboard.writeText(href); showAlert(t('COMMON.alerts.copySuccess', { label: t('COMMON.contextMenu.urlLabel') || 'link' }), 'success', 2000); } },
        { type: 'divider' }
      );
    }

    if (targetElement?.closest('img')) {
      const src = targetElement.closest('img').src;
      items.push(
        { id: 'viewImg', icon: '🖼️', label: 'View Image', action: () => window.open(src, '_blank') },
        { id: 'copyImg', icon: '📋', label: 'Copy Image URL', action: () => { navigator.clipboard.writeText(src); showAlert(t('COMMON.alerts.copySuccess', { label: 'image URL' }), 'success', 2000); } },
        { type: 'divider' }
      );
    }

    items.push(
      { id: 'navigate', icon: '🧭', label: t('COMMON.contextMenu.navigateTitle') || 'Navigate', isSubmenu: true, submenu: 'navigate' },
      { id: 'language', icon: '🗣️', label: t('COMMON.settings.keys.language.label') || 'Language', isSubmenu: true, submenu: 'language' },
      { id: 'cycleTheme', icon: '🎨', label: t('COMMON.contextMenu.cycleTheme') || 'Cycle Theme', action: handleToggleTheme },
      { type: 'divider' },
      { id: 'print', icon: '🖨️', label: t('contextMenu.print'), action: handlePrint },
      { id: 'achievement', icon: '🏆', label: t('COMMON.contextMenu.unlockAchievement') || 'Unlock Secret', action: handleUnlockAchievement }
    );

    return items;
  };

  const languages = [
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'ar', label: 'العربية', flag: '🇲🇦' },
    { id: 'medieval-en', label: t('COMMON.settings.keys.language.options.medieval-en.label'), flag: '📜' },
    { id: 'medieval-fr', label: t('COMMON.settings.keys.language.options.medieval-fr.label'), flag: '🏰' }
  ];

  return createPortal(
    <div
      ref={menuRef}
      className={`${styles.contextMenu} ${isHiding ? styles.hiding : ''}`}
      style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
      role="menu"
      aria-label="Custom context menu"
    >
      <div className={styles['scrollable-menu-items']}>
        {getMenuItems().map((item, idx) => {
          if (item.type === 'divider') return <div key={`div-${idx}`} className={styles.menuDivider} />;
          if (item.isSubmenu) {
            return (
              <div key={item.id} className={styles.menuItem} role="menuitem"
                onMouseEnter={(e) => handleMouseEnterItem(item.submenu, e)}
                onMouseLeave={handleMouseLeaveItem}
              >
                <span className={styles['item-left']}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                <ChevronRight size={14} />
              </div>
            );
          }
          return (
            <button key={item.id} className={styles.menuItem} onClick={(e) => { e.stopPropagation(); item.action(e); }} role="menuitem" type="button">
              <span className={styles['item-left']}>
                <span className={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {activeSubmenu === 'navigate' && (
        <div className={`${styles.submenu} ${styles[submenuSide]}`} style={{ top: `${hoveredItemTop}px` }}
          onMouseEnter={handleMouseEnterSubmenu} onMouseLeave={handleMouseLeaveSubmenu}
        >
          {[
            { path: '/home', icon: '🧭', label: t('COMMON.nav.home') },
            { path: '/blogs', icon: '📚', label: t('COMMON.nav.blogs') },
            { path: '/home#projects', icon: '🛠️', label: t('COMMON.nav.projects') },
            { path: '/home#skills', icon: '⚡', label: t('COMMON.nav.medieval.skills') },
            { path: '/home#about', icon: '🛡️', label: t('COMMON.nav.medieval.about') },
            { path: '/crmef', icon: '🏰', label: t('COMMON.nav.crmef') },
          ].map(({ path, icon, label }) => (
            <button key={path} type="button" className={styles.menuItem} onClick={() => handleNavigate(path)}>
              <span className={styles['item-left']}>{icon} {label}</span>
            </button>
          ))}
        </div>
      )}

      {activeSubmenu === 'language' && (
        <div className={`${styles.submenu} ${styles[submenuSide]}`} style={{ top: `${hoveredItemTop}px` }}
          onMouseEnter={handleMouseEnterSubmenu} onMouseLeave={handleMouseLeaveSubmenu}
        >
          {languages.map(lang => (
            <button key={lang.id} className={`${styles.menuItem} ${language === lang.id ? styles.active : ''}`}
              onClick={() => handleSetLanguage(lang.id)} type="button"
            >
              <span className={styles['item-left']}>
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {language === lang.id && <Check size={12} />}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
