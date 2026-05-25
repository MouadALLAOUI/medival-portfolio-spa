/**
 * Formats a medieval style date structure: { hh, mm, dd, MM, yyyy }
 * supports English and French layouts reactively.
 */
export function formatDate(date, t, language) {
  if (!date) return t ? t('COMMON.alerts.dateUnknown') : 'Date unknown';
  
  const pad = (n) => String(n).padStart(2, '0');
  const { hh, mm, dd, MM, yyyy } = date;

  if (language === 'fr') {
    const monthsFR = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    const suffix = dd === 1 ? 'er' : '';
    return `${dd}${suffix} Jour de ${monthsFR[MM - 1]}, de l'An ${yyyy} à ${pad(hh)}:${pad(mm)}`;
  } else {
    const monthsEN = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const suffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${pad(dd)}${suffix(dd)} Day of ${monthsEN[MM - 1]}, Year ${yyyy} at ${pad(hh)}:${pad(mm)}`;
  }
}
