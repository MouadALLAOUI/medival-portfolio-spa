import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ACHIEVEMENTS, RARITY_CONFIG } from '../achievements/achievementsRegistry';
import { AchievementsContext } from './achievements.context';
import ThemeProvider from './ThemeProvider';
import styles from './AchievementsProvider.module.scss';

const STORAGE_KEY = 'portfolio_achievements';
const COUNTERS_KEY = 'portfolio_achievement_counters';

const AchievementsProvider = ({ children }) => {
  // Load unlocked achievements from localStorage
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  });

  // Load counters (blogs_read, visit_count, etc.)
  const [counters, setCounters] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(COUNTERS_KEY)) || {};
    } catch { return {}; }
  });

  // Notification queue
  const [notifications, setNotifications] = useState([]);
  const notifIdRef = useRef(0);

  // Keep references to state up to date for event listeners
  const unlockedRef = useRef(unlocked);
  const countersRef = useRef(counters);

  useEffect(() => {
    unlockedRef.current = unlocked;
  }, [unlocked]);

  useEffect(() => {
    countersRef.current = counters;
  }, [counters]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  }, [unlocked]);

  useEffect(() => {
    localStorage.setItem(COUNTERS_KEY, JSON.stringify(counters));
  }, [counters]);

  // Dismiss a notification
  const dismissNotif = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Show unlock notification
  const showNotification = useCallback((achievement) => {
    const id = ++notifIdRef.current;
    setNotifications(prev => [...prev, { id, achievement }]);
    setTimeout(() => dismissNotif(id), 5000);
  }, [dismissNotif]);

  // Core unlock function
  const unlockAchievement = useCallback((achievementId) => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return;
    if (unlockedRef.current[achievementId]) return; // already unlocked

    setUnlocked(prev => {
      if (prev[achievementId]) return prev;
      const next = {
        ...prev,
        [achievementId]: {
          unlockedAt: new Date().toISOString(),
          xp: achievement.xp,
        },
      };
      return next;
    });

    showNotification(achievement);
  }, [showNotification]);

  // Increment a counter and check count-based achievements
  const incrementCounter = useCallback((key, amount = 1) => {
    setCounters(prev => {
      const newVal = (prev[key] || 0) + amount;
      const updated = { ...prev, [key]: newVal };

      // Check all achievements with count requirements
      Object.values(ACHIEVEMENTS).forEach(achievement => {
        if (
          achievement.requirement?.type === 'count' &&
          achievement.requirement.key === key &&
          newVal >= achievement.requirement.target &&
          !unlockedRef.current[achievement.id]
        ) {
          // Use timeout to avoid state update during render
          setTimeout(() => unlockAchievement(achievement.id), 0);
        }
      });

      // Special Check: scrolled all home page sections
      const homeSections = ['hero', 'presentation', 'languages', 'skills', 'projects', 'learning', 'hobbies', 'design', 'about', 'contact'];
      const allSeen = homeSections.every(secId => updated[`section_seen_${secId}`]);
      if (allSeen && !unlockedRef.current['visited_all_sections']) {
        setTimeout(() => unlockAchievement('visited_all_sections'), 0);
      }

      return updated;
    });
  }, [unlockAchievement]);

  // Legacy/Compatibility support helpers
  const trackVisit = useCallback((path) => {
    if (path.includes('/blogs')) {
      unlockAchievement('visited_blogs');
    }
  }, [unlockAchievement]);

  const trackEvent = useCallback((event) => {
    if (event === 'mp:pdf-opened') {
      unlockAchievement('opened_pdf');
    }
  }, [unlockAchievement]);

  const setBoolean = useCallback((achievementId, done) => {
    if (done) unlockAchievement(achievementId);
  }, [unlockAchievement]);

  const isCompleted = useCallback((achievementId) => {
    return !!unlocked[achievementId];
  }, [unlocked]);

  const getAchievementProgress = useCallback((achievementId) => {
    const isUnlocked = !!unlocked[achievementId];
    return {
      current: isUnlocked ? 1 : 0,
      target: 1,
      percent: isUnlocked ? 1 : 0
    };
  }, [unlocked]);

  // Total XP
  const totalXp = Object.values(unlocked).reduce((sum, a) => sum + (a.xp || 0), 0);
  const unlockedCount = Object.keys(unlocked).length;
  const totalCount = Object.keys(ACHIEVEMENTS).length;

  // ── Konami code listener ──────────────────────────────────────
  useEffect(() => {
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let index = 0;
    const handler = (e) => {
      if (e.key === sequence[index]) {
        index++;
        if (index === sequence.length) {
          unlockAchievement('konami_code');
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [unlockAchievement]);

  // ── Idle timer ────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      unlockAchievement('idle_wanderer');
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearTimeout(timer);
  }, [unlockAchievement]);

  // ── Night owl ─────────────────────────────────────────────────
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 4) {
      unlockAchievement('night_owl');
    }
  }, [unlockAchievement]);

  // ── Visit counter ─────────────────────────────────────────────
  useEffect(() => {
    unlockAchievement('first_visit');
    incrementCounter('visit_count');
    
    // Check local storage counters on mount directly to unlock returning visitor instantly if applicable
    try {
      const prevCounters = JSON.parse(localStorage.getItem(COUNTERS_KEY)) || {};
      const currentVisits = (prevCounters.visit_count || 0) + 1;
      if (currentVisits >= 2) {
        unlockAchievement('returning_visitor');
      }
    } catch (e) {
      console.error(e);
    }
  }, []); // only on mount

  // ── Rapid clicker listener ────────────────────────────────────
  useEffect(() => {
    let clicks = [];
    const handler = () => {
      const now = Date.now();
      clicks.push(now);
      clicks = clicks.filter(t => now - t < 2000);
      if (clicks.length >= 10) {
        unlockAchievement('rapid_clicker');
        clicks = [];
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [unlockAchievement]);

  // ── PDF global listener ───────────────────────────────────────
  useEffect(() => {
    const onPdfOpened = () => {
      unlockAchievement('opened_pdf');
    };
    window.addEventListener("mp:pdf-opened", onPdfOpened);
    return () => window.removeEventListener("mp:pdf-opened", onPdfOpened);
  }, [unlockAchievement]);

  // ── Theme Switcher observer ───────────────────────────────────
  const themeObj = ThemeProvider.useTheme() || {};
  const theme = themeObj.theme;
  const initialThemeRef = useRef(null);

  useEffect(() => {
    if (!theme) return;
    
    // Track every theme tried
    incrementCounter(`theme_tried_${theme}`);

    // Check if all themes have been tried
    const allThemes = ['light', 'dark', 'medieval'];
    const prevCounters = JSON.parse(localStorage.getItem(COUNTERS_KEY)) || {};
    const updatedCounters = { ...prevCounters, [`theme_tried_${theme}`]: true };
    const allTried = allThemes.every(id => updatedCounters[`theme_tried_${id}`]);
    if (allTried) {
      setTimeout(() => unlockAchievement('tried_all_themes'), 0);
    }

    // Check for theme switches manually
    if (!initialThemeRef.current) {
      initialThemeRef.current = theme;
    } else if (theme !== initialThemeRef.current) {
      unlockAchievement('changed_theme');
    }
  }, [theme, unlockAchievement]);

  return (
    <AchievementsContext.Provider value={{
      unlocked,
      counters,
      unlockAchievement,
      incrementCounter,
      totalXp,
      unlockedCount,
      totalCount,
      trackVisit,
      trackEvent,
      setBoolean,
      isCompleted,
      getAchievementProgress
    }}>
      {children}

      {/* Achievement notifications — portal to body */}
      {createPortal(
        <div className={styles.notifStack}>
          {notifications.map(notif => (
            <AchievementNotification
              key={notif.id}
              achievement={notif.achievement}
              onDismiss={() => dismissNotif(notif.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </AchievementsContext.Provider>
  );
};

// ── Notification component ────────────────────────────────────
const AchievementNotification = ({ achievement, onDismiss }) => {
  const rarity = RARITY_CONFIG[achievement.rarity];

  return (
    <div
      className={styles.notif}
      style={{ '--rarity-color': rarity.color, '--rarity-glow': rarity.glow }}
      onClick={onDismiss}
    >
      <div className={styles.notifIcon}>{achievement.icon}</div>
      <div className={styles.notifContent}>
        <div className={styles.notifHeader}>
          <span className={styles.notifBadge}>Achievement Unlocked</span>
          <span className={styles.notifRarity}>{rarity.label}</span>
        </div>
        <div className={styles.notifTitle}>{achievement.title}</div>
        <div className={styles.notifDesc}>{achievement.description}</div>
        <div className={styles.notifXp}>+{achievement.xp} XP</div>
      </div>
      <div className={styles.notifProgress} />
    </div>
  );
};

export default AchievementsProvider;
