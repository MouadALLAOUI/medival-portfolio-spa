import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Keyboard, X } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import styles from './KeyboardShortcutsHelp.module.scss';

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useSettings();

  const SHORTCUTS = [
    { keys: ['Ctrl', 'K'], label: t('COMPONENTS.keyboardShortcuts.shortcuts.search'), section: t('COMPONENTS.keyboardShortcuts.sections.navigation') },
    { keys: ['Ctrl', ','], label: t('COMPONENTS.keyboardShortcuts.shortcuts.settings'), section: t('COMPONENTS.keyboardShortcuts.sections.navigation') },
    { keys: ['Ctrl', 'H'], label: t('COMPONENTS.keyboardShortcuts.shortcuts.home'), section: t('COMPONENTS.keyboardShortcuts.sections.navigation') },
    { keys: ['Ctrl', 'B'], label: t('COMPONENTS.keyboardShortcuts.shortcuts.blogs'), section: t('COMPONENTS.keyboardShortcuts.sections.navigation') },
    { keys: ['Esc'], label: t('COMPONENTS.keyboardShortcuts.shortcuts.closeModal'), section: t('COMPONENTS.keyboardShortcuts.sections.general') },
    { keys: ['?'], label: t('COMPONENTS.keyboardShortcuts.shortcuts.toggleHelp'), section: t('COMPONENTS.keyboardShortcuts.sections.general') },
  ];

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
          <h3 className={styles.title}>{t('COMPONENTS.keyboardShortcuts.title')}</h3>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label={t('COMPONENTS.keyboardShortcuts.close')}>
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
          {t('COMPONENTS.keyboardShortcuts.press')} <kbd className={styles.key}>?</kbd> {t('COMPONENTS.keyboardShortcuts.or')} <kbd className={styles.key}>Esc</kbd> {t('COMPONENTS.keyboardShortcuts.toClose')}
        </div>
      </div>
    </div>,
    document.body
  );
}
