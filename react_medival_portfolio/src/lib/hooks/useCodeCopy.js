import { useCallback } from 'react';
import { useAlerts } from '../useAlerts';

export const useCodeCopy = () => {
  const { showAlert } = useAlerts();

  const copyCode = useCallback((code, label = "Code") => {
    navigator.clipboard.writeText(code).then(() => {
      showAlert(`Copied ${label} to spellbook ✅`, 'success', 2000);
    }).catch(() => {
      showAlert('Copy spell failed 💀', 'error', 2000);
    });
  }, [showAlert]);

  return { copyCode };
};
