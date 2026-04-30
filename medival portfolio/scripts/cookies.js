export default function setCookie(name, value, options = {}) {
  const { days = null, expiresAtMidnight = false, path = "/" } = options;
  let expires = "";

  if (expiresAtMidnight) {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // next midnight
    expires = "; expires=" + midnight.toUTCString();
  } else if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}`;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

export function deleteCookie(name, path = "/") {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

export function getAllCookies() {
  return document.cookie
    .split("; ")
    .filter(Boolean)
    .reduce((acc, cookie) => {
      const [name, ...rest] = cookie.split("=");
      acc[decodeURIComponent(name)] = decodeURIComponent(rest.join("="));
      return acc;
    }, {});
}