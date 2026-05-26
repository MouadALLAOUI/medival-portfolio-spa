import { createPortal } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Copy, Check, Sun, Moon, Sparkles, Code, Trophy, ChevronRight, Languages, BookOpen, Briefcase, User, Info, Printer, ExternalLink, Scissors, Clipboard } from 'lucide-react';
import useContextMenu from '../../hooks/useContextMenu';
import { useTheme } from '../../lib/contexts/ThemeProvider';
import { useAchievements } from '../../lib/useAchievements';
import { useAlerts } from '../../lib/useAlerts';
import { useSettings } from '../../lib/useSettings';
import styles from './ContextMenu.module.scss';

/**
 * Custom medieval-themed context menu component portaled directly to document.body.
 * Leverages custom SCSS animations, edge alignment calculations, theme cycling,
 * clipboard copy checks, and the unlockable easter egg achievement notifier.
 */
export default function ContextMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { x, y, visible, closeMenu, targetElement } = useContextMenu();
  const { theme, themes, switchTheme } = useTheme();
  const { setBoolean, isCompleted } = useAchievements();
  const { showAlert } = useAlerts();
  const { t, language, setLanguage } = useSettings();

  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [submenuSide, setSubmenuSide] = useState('right');
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredItemTop, setHoveredItemTop] = useState(0);
  const submenuTimeoutRef = useRef(null);

  // Auto-cleanup on close
  useEffect(() => {
    if (!visible) {
      setActiveSubmenu(null);
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
        submenuTimeoutRef.current = null;
      }
    }
  }, [visible]);

  // Timeout cleanup on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnterItem = (submenuName, e) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    const itemElement = e.currentTarget;
    const topOffset = itemElement.offsetTop;
    const scrollContainer = itemElement.parentElement;
    const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
    
    setHoveredItemTop(topOffset - scrollTop);
    setActiveSubmenu(submenuName);
  };

  const handleMouseLeaveItem = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 180); // generous timeout for smooth diagonal mouse movements
  };

  const handleMouseEnterSubmenu = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveSubmenu = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 180);
  };

  // Manage mount/unmount and exit animation timing
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsHiding(false);
    } else if (shouldRender) {
      setIsHiding(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsHiding(false);
      }, 90); // duration matches scss hiding keyframes
      return () => clearTimeout(timer);
    }
  }, [visible, shouldRender]);

  // Enforce smart positioning to prevent screen overflow
  useEffect(() => {
    if (shouldRender && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let posX = x;
      let posY = y;

      if (x + rect.width > window.innerWidth) {
        posX = window.innerWidth - rect.width - 12;
      }
      if (y + rect.height > window.innerHeight) {
        posY = window.innerHeight - rect.height - 12;
      }

      if (posX < 12) posX = 12;
      if (posY < 12) posY = 12;

      setCoords({ x: posX, y: posY });

      // Determine submenu side
      if (posX + rect.width + 200 > window.innerWidth) {
        setSubmenuSide('left');
      } else {
        setSubmenuSide('right');
      }
    }
  }, [x, y, shouldRender]);

  // Click outside and keydown listeners
  useEffect(() => {
    if (!shouldRender) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shouldRender, closeMenu]);

  if (!shouldRender) return null;

  const isInput = targetElement instanceof HTMLInputElement || 
                  targetElement instanceof HTMLTextAreaElement ||
                  (targetElement instanceof HTMLElement && targetElement.isContentEditable);

  const getInputActionsStrings = (lang) => {
    const isFrench = lang === 'fr' || lang === 'medieval-fr';
    const isArabic = lang === 'ar';
    const isMedieval = lang === 'medieval-en' || lang === 'medieval-fr';
    
    if (isFrench) {
      return {
        copy: isMedieval ? 'Dupliquer le parchemin (Copier)' : 'Copier',
        cut: isMedieval ? 'Trancher le texte (Couper)' : 'Couper',
        paste: isMedieval ? 'Transcrire le texte (Coller)' : 'Coller',
        textLabel: isMedieval ? 'parchemin' : 'texte'
      };
    }
    if (isArabic) {
      return {
        copy: 'نسخ',
        cut: 'قص',
        paste: 'لصق',
        textLabel: 'النص'
      };
    }
    return {
      copy: isMedieval ? 'Duplicate Scroll (Copy)' : 'Copy',
      cut: isMedieval ? 'Sever Text (Cut)' : 'Cut',
      paste: isMedieval ? 'Scribe Text (Paste)' : 'Paste',
      textLabel: isMedieval ? 'scroll text' : 'text'
    };
  };

  const actionStrings = getInputActionsStrings(language);

  const handleCopyInput = (e) => {
    e.stopPropagation();
    if (!targetElement) return;
    targetElement.focus();
    try {
      const success = document.execCommand('copy');
      if (!success) {
        const start = targetElement.selectionStart ?? 0;
        const end = targetElement.selectionEnd ?? 0;
        const selectedText = targetElement.value ? targetElement.value.substring(start, end) : '';
        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
        }
      }
      showAlert(t('COMMON.alerts.copySuccess', { label: actionStrings.textLabel }), 'success', 2000);
    } catch (err) {
      console.error(err);
    }
    closeMenu();
  };

  const handleCutInput = (e) => {
    e.stopPropagation();
    if (!targetElement) return;
    targetElement.focus();
    try {
      const success = document.execCommand('cut');
      if (!success) {
        const start = targetElement.selectionStart ?? 0;
        const end = targetElement.selectionEnd ?? 0;
        const val = targetElement.value || '';
        const selectedText = val.substring(start, end);
        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
          const newVal = val.substring(0, start) + val.substring(end);
          targetElement.value = newVal;
          targetElement.setSelectionRange(start, start);
          
          const event = new Event('input', { bubbles: true });
          targetElement.dispatchEvent(event);
        }
      }
    } catch (err) {
      console.error(err);
    }
    closeMenu();
  };

  const handlePasteInput = (e) => {
    e.stopPropagation();
    if (!targetElement) return;
    targetElement.focus();
    try {
      navigator.clipboard.readText().then((clipText) => {
        const start = targetElement.selectionStart ?? 0;
        const end = targetElement.selectionEnd ?? 0;
        const val = targetElement.value || '';
        const newVal = val.substring(0, start) + clipText + val.substring(end);
        targetElement.value = newVal;

        const newCursorPos = start + clipText.length;
        targetElement.setSelectionRange(newCursorPos, newCursorPos);

        const event = new Event('input', { bubbles: true });
        targetElement.dispatchEvent(event);
      }).catch(() => {
        document.execCommand('paste');
      });
    } catch (err) {
      console.error(err);
      document.execCommand('paste');
    }
    closeMenu();
  };

  // Actions
  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      showAlert(t('COMMON.alerts.copySuccess', { label: t('COMMON.contextMenu.urlLabel') }), 'success', 2000);
      setTimeout(() => {
        setCopied(false);
        closeMenu();
      }, 1200);
    }).catch(() => {
      showAlert(t('COMMON.alerts.copyFailed'), 'error', 2000);
      closeMenu();
    });
  };

  const handleToggleTheme = () => {
    // Cycle themes: light -> dark -> medieval -> light
    const themeCycle = ['light', 'dark', 'medieval'];
    const currentIndex = themeCycle.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    const nextTheme = themeCycle[nextIndex];
    switchTheme(nextTheme);

    const themeLabel = t(`COMMON.settings.keys.theme.options.${nextTheme}.label`) || themes[nextTheme]?.label || nextTheme;
    showAlert(t('COMMON.alerts.themeAltered', { theme: themeLabel }), 'info', 2000);
    closeMenu();
  };

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    closeMenu();
  };

  const handlePrint = () => {
    window.print();
    closeMenu();
  };

  const handleViewSource = () => {
    window.open('view-source:' + window.location.href, '_blank');
    closeMenu();
  };

  const handleUnlockAchievement = () => {
    const unlocked = isCompleted('easteregg');
    if (unlocked) {
      showAlert(t('COMMON.alerts.portalAlreadyBreached'), 'info', 3000);
    } else {
      setBoolean('easteregg', true);
    }
    closeMenu();
  };

  const isAtHome = location.pathname === '/' || location.pathname === '/home';

  const menuStyle = {
    top: `${coords.y}px`,
    left: `${coords.x}px`,
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
      className={`${styles['context-menu-container']} ${isHiding ? styles.hiding : ''}`}
      style={menuStyle}
      role="menu"
      aria-label="Custom context menu"
    >
      <div className={styles['scrollable-menu-items']}>
        {isInput && (
          <>
            <button
              className={styles['menu-item']}
              onClick={handleCutInput}
              role="menuitem"
            >
              <span className={styles['item-left']}>
                <Scissors size={15} />
                <span>{actionStrings.cut}</span>
              </span>
              <span className={styles['item-shortcut']}>Ctrl+X</span>
            </button>
            
            <button
              className={styles['menu-item']}
              onClick={handleCopyInput}
              role="menuitem"
            >
              <span className={styles['item-left']}>
                <Copy size={15} />
                <span>{actionStrings.copy}</span>
              </span>
              <span className={styles['item-shortcut']}>Ctrl+C</span>
            </button>
            
            <button
              className={styles['menu-item']}
              onClick={handlePasteInput}
              role="menuitem"
            >
              <span className={styles['item-left']}>
                <Clipboard size={15} />
                <span>{actionStrings.paste}</span>
              </span>
              <span className={styles['item-shortcut']}>Ctrl+V</span>
            </button>
            
            <div className={styles['menu-divider']} />
          </>
        )}

        <div 
          className={styles['menu-item']}
          role="menuitem"
          onMouseEnter={(e) => handleMouseEnterItem('navigate', e)}
          onMouseLeave={handleMouseLeaveItem}
        >
          <span className={styles['item-left']}>
            <Home size={15} />
            <span>{t('COMMON.contextMenu.navigateTitle') || 'Navigate'}</span>
          </span>
          <ChevronRight size={14} />
        </div>

        <div className={styles['menu-divider']} />

        <button
          className={styles['menu-item']}
          onClick={handleCopyUrl}
          role="menuitem"
          disabled={copied}
        >
          <span className={styles['item-left']}>
            {copied ? (
              <span className={styles['check-container']}>
                <Check size={15} />
              </span>
            ) : (
              <Copy size={15} />
            )}
            <span>{t('COMMON.contextMenu.copyUrl')}</span>
          </span>
          <span className={styles['item-shortcut']}>Ctrl+C</span>
        </button>

        <div 
          className={styles['menu-item']}
          role="menuitem"
          onMouseEnter={(e) => handleMouseEnterItem('language', e)}
          onMouseLeave={handleMouseLeaveItem}
        >
          <span className={styles['item-left']}>
            <Languages size={15} />
            <span>{t('COMMON.settings.keys.language.label')}</span>
          </span>
          <ChevronRight size={14} />
        </div>

        <button
          className={styles['menu-item']}
          onClick={handleToggleTheme}
          role="menuitem"
        >
          <span className={styles['item-left']}>
            {theme === 'medieval' ? (
              <Sparkles size={15} />
            ) : theme === 'dark' ? (
              <Sun size={15} />
            ) : (
              <Moon size={15} />
            )}
            <span>{t('COMMON.contextMenu.cycleTheme')}</span>
          </span>
          <span className={styles['item-shortcut']}>Ctrl+T</span>
        </button>

        <button
          className={styles['menu-item']}
          onClick={handlePrint}
          role="menuitem"
        >
          <span className={styles['item-left']}>
            <Printer size={15} />
            <span>{t('COMMON.contextMenu.printPage') || 'Print Scroll'}</span>
          </span>
          <span className={styles['item-shortcut']}>Ctrl+P</span>
        </button>

        <button
          className={styles['menu-item']}
          onClick={handleViewSource}
          role="menuitem"
        >
          <span className={styles['item-left']}>
            <Code size={15} />
            <span>{t('COMMON.contextMenu.viewSource')}</span>
          </span>
          <span className={styles['item-shortcut']}>Ctrl+U</span>
        </button>

        <div className={styles['menu-divider']} />

        <button
          className={styles['menu-item']}
          onClick={handleUnlockAchievement}
          role="menuitem"
        >
          <span className={styles['item-left']}>
            <Trophy size={15} />
            <span>{t('COMMON.contextMenu.unlockAchievement')}</span>
          </span>
          <span className={styles['item-shortcut']}>🔮</span>
        </button>
      </div>

      {activeSubmenu === 'navigate' && (
        <div 
          className={`${styles.submenu} ${styles[submenuSide]}`}
          style={{ top: `${hoveredItemTop}px` }}
          onMouseEnter={handleMouseEnterSubmenu}
          onMouseLeave={handleMouseLeaveSubmenu}
        >
          <button className={styles['menu-item']} onClick={() => handleNavigate('/home')}>
            <span className={styles['item-left']}><Home size={14} /> {t('COMMON.nav.home')}</span>
          </button>
          <button className={styles['menu-item']} onClick={() => handleNavigate('/blogs')}>
            <span className={styles['item-left']}><BookOpen size={14} /> {t('COMMON.nav.blogs')}</span>
          </button>
          <button className={styles['menu-item']} onClick={() => handleNavigate('/home#projects')}>
            <span className={styles['item-left']}><Briefcase size={14} /> {t('COMMON.nav.projects')}</span>
          </button>
          <button className={styles['menu-item']} onClick={() => handleNavigate('/home#skills')}>
            <span className={styles['item-left']}><Sparkles size={14} /> {t('COMMON.nav.medieval.skills')}</span>
          </button>
          <button className={styles['menu-item']} onClick={() => handleNavigate('/home#about')}>
            <span className={styles['item-left']}><User size={14} /> {t('COMMON.nav.medieval.about')}</span>
          </button>
          <button className={styles['menu-item']} onClick={() => handleNavigate('/crmef')}>
            <span className={styles['item-left']}><Info size={14} /> {t('COMMON.nav.crmef')}</span>
          </button>
        </div>
      )}

      {activeSubmenu === 'language' && (
        <div 
          className={`${styles.submenu} ${styles[submenuSide]}`}
          style={{ top: `${hoveredItemTop}px` }}
          onMouseEnter={handleMouseEnterSubmenu}
          onMouseLeave={handleMouseLeaveSubmenu}
        >
          {languages.map(lang => (
            <button
              key={lang.id}
              className={`${styles['menu-item']} ${language === lang.id ? styles.active : ''}`}
              onClick={() => handleSetLanguage(lang.id)}
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

