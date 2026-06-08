import { useCallback } from 'react';
import { useAlerts } from '../lib/useAlerts';
import { useSettings } from '../lib/useSettings';

export function useInputActions(targetElement, closeMenu) {
  const { showAlert } = useAlerts();
  const { t, language } = useSettings();

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
      return { copy: 'نسخ', cut: 'قص', paste: 'لصق', textLabel: 'النص' };
    }
    return {
      copy: isMedieval ? 'Duplicate Scroll (Copy)' : 'Copy',
      cut: isMedieval ? 'Sever Text (Cut)' : 'Cut',
      paste: isMedieval ? 'Scribe Text (Paste)' : 'Paste',
      textLabel: isMedieval ? 'scroll text' : 'text'
    };
  };

  const actionStrings = getInputActionsStrings(language);

  const handleCopyInput = useCallback((e) => {
    e.stopPropagation();
    if (!targetElement) return;
    targetElement.focus();
    try {
      const success = document.execCommand('copy');
      if (!success) {
        const start = targetElement.selectionStart ?? 0;
        const end = targetElement.selectionEnd ?? 0;
        const selectedText = targetElement.value ? targetElement.value.substring(start, end) : '';
        if (selectedText) navigator.clipboard.writeText(selectedText);
      }
      showAlert(t('COMMON.alerts.copySuccess', { label: actionStrings.textLabel }), 'success', 2000);
    } catch (err) {
      console.error(err);
    }
    closeMenu();
  }, [targetElement, closeMenu, showAlert, t, actionStrings.textLabel]);

  const handleCutInput = useCallback((e) => {
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
          targetElement.value = val.substring(0, start) + val.substring(end);
          targetElement.setSelectionRange(start, start);
          targetElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    } catch (err) {
      console.error(err);
    }
    closeMenu();
  }, [targetElement, closeMenu]);

  const handlePasteInput = useCallback((e) => {
    e.stopPropagation();
    if (!targetElement) return;
    targetElement.focus();
    try {
      navigator.clipboard.readText().then((clipText) => {
        const start = targetElement.selectionStart ?? 0;
        const end = targetElement.selectionEnd ?? 0;
        const val = targetElement.value || '';
        targetElement.value = val.substring(0, start) + clipText + val.substring(end);
        const newCursorPos = start + clipText.length;
        targetElement.setSelectionRange(newCursorPos, newCursorPos);
        targetElement.dispatchEvent(new Event('input', { bubbles: true }));
      }).catch(() => { document.execCommand('paste'); });
    } catch (err) {
      console.error(err);
      document.execCommand('paste');
    }
    closeMenu();
  }, [targetElement, closeMenu]);

  return { actionStrings, handleCopyInput, handleCutInput, handlePasteInput };
}
