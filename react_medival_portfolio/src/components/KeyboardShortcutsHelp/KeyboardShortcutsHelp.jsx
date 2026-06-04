import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Keyboard, X } from 'lucide-react';
import styles from './KeyboardShortcutsHelp.module.scss';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], label: 'Search scrolls', section: 'Navigation' },
  { keys: ['Ctrl', ','], label: 'Open grimoire settings', section: 'Navigation' },
  { keys: ['Ctrl', 'H'], label: 'Return home', section: 'Navigation' },
  { keys: ['Ctrl', 'B'], label: 'Open blog chronicles', section: 'Navigation' },
  { keys: ['Esc'], label: 'Close modals & panels', section: 'General' },
  { keys: ['?'], label: 'Toggle this help panel', section: 'General' },
];

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) return;

      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const grouped = SHORTCUTS.reduce((acc, s) => {
    (acc[s.section] = acc[s.section] || []).push(s);
    return acc;
  }, {});

  return createPortal(
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Keyboard size={20} className={styles.headerIcon} />
          <h3 className={styles.title}>Keyboard Shortcuts</h3>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className={styles.section}>
              <h4 className={styles.sectionTitle}>{section}</h4>
              <ul className={styles.list}>
                {items.map((shortcut, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <div className={styles.keys}>
                      {shortcut.keys.map((key, ki) => (
                        <span key={ki}>
                          <kbd className={styles.key}>{key}</kbd>
                          {ki < shortcut.keys.length - 1 && <span className={styles.plus}>+</span>}
                        </span>
                      ))}
                    </div>
                    <span className={styles.label}>{shortcut.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          Press <kbd className={styles.key}>?</kbd> or <kbd className={styles.key}>Esc</kbd> to close
        </div>
      </div>
    </div>,
    document.body
  );
}
