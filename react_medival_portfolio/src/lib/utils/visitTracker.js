const COOKIE_PREFIX = 'mouad_portfolio_';
const COOKIE_EXPIRY_DAYS = 365;

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_PREFIX}${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  const key = `${COOKIE_PREFIX}${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(key)) {
      return cookie.substring(key.length);
    }
  }
  return null;
};

export const isFirstVisit = (key) => {
  if (getCookie(key)) return false;
  setCookie(key, 'visited', COOKIE_EXPIRY_DAYS);
  return true;
};
