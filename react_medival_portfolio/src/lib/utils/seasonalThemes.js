/**
 * Detects if there's an active seasonal theme based on the current date.
 * @returns {string|null} - The name of the seasonal theme or null
 */
export const getActiveSeasonalTheme = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // Halloween: Oct 25 - Nov 2
  if ((month === 10 && day >= 25) || (month === 11 && day <= 2)) {
    return 'halloween';
  }

  // Christmas: Dec 20 - Dec 31
  if (month === 12 && day >= 20) {
    return 'christmas';
  }

  return null;
};
