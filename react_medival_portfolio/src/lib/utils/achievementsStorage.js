function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapeRegex(name)}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function setCookie(name, value, days) {
  if (typeof document === "undefined") return;
  const maxAge = days ? `; Max-Age=${Math.floor(days * 86400)}` : "";
  document.cookie = `${name}=${encodeURIComponent(value)}${maxAge}; Path=/; SameSite=Lax`;
}

export const ACHIEVEMENTS_STORAGE_KEY = "mp_achievements_v1";
export const ACHIEVEMENTS_COOKIE_KEY = "mp_achievements_cookie_v1";
export const ACHIEVEMENTS_CACHE_KEY = "__mp_achievements__/v1";

export async function readAchievementsState() {
  if (typeof window === "undefined") return null;

  const fromLocal = safeJsonParse(window.localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY) || "");
  if (fromLocal) return fromLocal;

  const cookieValue = getCookie(ACHIEVEMENTS_COOKIE_KEY);
  if (cookieValue) {
    const decoded = safeJsonParse(cookieValue);
    if (decoded) return decoded;
  }

  try {
    if ("caches" in window) {
      const cache = await caches.open("medieval-portfolio");
      const response = await cache.match(ACHIEVEMENTS_CACHE_KEY);
      if (response) {
        const text = await response.text();
        const parsed = safeJsonParse(text);
        if (parsed) return parsed;
      }
    }
  } catch (e) {
    void e;
  }

  return null;
}

export async function writeAchievementsState(nextState) {
  if (typeof window === "undefined") return;
  const json = JSON.stringify(nextState);

  try {
    window.localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, json);
  } catch (e) {
    void e;
  }

  try {
    if (json.length < 3800) setCookie(ACHIEVEMENTS_COOKIE_KEY, json, 365);
  } catch (e) {
    void e;
  }

  try {
    if ("caches" in window) {
      const cache = await caches.open("medieval-portfolio");
      await cache.put(
        ACHIEVEMENTS_CACHE_KEY,
        new Response(json, { headers: { "content-type": "application/json; charset=utf-8" } })
      );
    }
  } catch (e) {
    void e;
  }
}
