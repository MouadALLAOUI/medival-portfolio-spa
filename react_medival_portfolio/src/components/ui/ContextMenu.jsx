import { createPortal } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Copy, Check, Sun, Moon, Sparkles, Code, Trophy } from 'lucide-react';
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
  const { x, y, visible, closeMenu } = useContextMenu();
  const { theme, themes, switchTheme } = useTheme();
  const { setBoolean, isCompleted } = useAchievements();
  const { showAlert } = useAlerts();
  const { t } = useSettings();

  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

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

  // Actions
  const handleNavigateHome = () => {
    navigate('/home');
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

  return createPortal(
    <div
      ref={menuRef}
      className={`${styles['context-menu-container']} ${isHiding ? styles.hiding : ''}`}
      style={menuStyle}
      role="menu"
      aria-label="Custom context menu"
    >
      {!isAtHome && (
        <>
          <button
            className={styles['menu-item']}
            onClick={handleNavigateHome}
            role="menuitem"
          >
            <span className={styles['item-left']}>
              <Home size={15} />
              <span>{t('COMMON.contextMenu.navigateHome')}</span>
            </span>
            <span className={styles['item-shortcut']}>Alt+H</span>
          </button>
          <div className={styles['menu-divider']} />
        </>
      )}

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
    </div>,
    document.body
  );
}

