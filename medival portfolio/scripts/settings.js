import showAlert from "./alerts.js";

const translations = {
  en: {
    "nav.hobbies": "Beyond Code",
    "nav.design": "Design Forge",
    "nav.settings": "Rune Settings",
    "hobbies.title": "Beyond the Code",
    "hobbies.intro": "What I do beyond programming—habits that sharpen the mind and keep the wizard grounded.",
    "design.title": "The Design Forge",
    "design.intro": "Figma and Canva artifacts—UI drafts, prototypes, and visual scrolls forged for real quests.",
    "settings.title": "Rune Settings",
    "settings.theme": "Theme",
    "settings.theme.night": "Night",
    "settings.theme.day": "Day",
    "settings.language": "Language"
  },
  fr: {
    "nav.hobbies": "Au-delà du code",
    "nav.design": "Forge du Design",
    "nav.settings": "Paramètres",
    "hobbies.title": "Au-delà du code",
    "hobbies.intro": "Ce que je fais au-delà de la programmation—des habitudes qui aiguisent l’esprit et gardent le mage ancré.",
    "design.title": "La Forge du Design",
    "design.intro": "Artefacts Figma et Canva—maquettes UI, prototypes, et parchemins visuels forgés pour de vraies quêtes.",
    "settings.title": "Paramètres",
    "settings.theme": "Thème",
    "settings.theme.night": "Nuit",
    "settings.theme.day": "Jour",
    "settings.language": "Langue"
  }
};

function applyTheme(theme, settingsThemeSelect) {
  const resolved = theme === "day" ? "day" : "night";
  document.documentElement.dataset.theme = resolved;
  localStorage.setItem("mp_theme", resolved);
  if (settingsThemeSelect) settingsThemeSelect.value = resolved;
}

function applyLanguage(lang, settingsLangSelect) {
  const resolved = lang === "fr" ? "fr" : "en";
  document.documentElement.lang = resolved;
  localStorage.setItem("mp_lang", resolved);
  if (settingsLangSelect) settingsLangSelect.value = resolved;

  const dict = translations[resolved] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const text = dict[key];
    if (typeof text === "string") el.textContent = text;
  });
}

function openSettings(settingsModal) {
  if (!settingsModal) return;
  settingsModal.classList.add("open");
  settingsModal.setAttribute("aria-hidden", "false");
}

function closeSettings(settingsModal) {
  if (!settingsModal) return;
  settingsModal.classList.remove("open");
  settingsModal.setAttribute("aria-hidden", "true");
}

export function initSettings({ showAlert } = {}) {
  const settingsModal = document.getElementById("settings-modal");
  const openSettingsBtn = document.getElementById("open-settings");
  const openSettingsGearBtn = document.getElementById("open-settings-gear");
  const settingsThemeSelect = document.getElementById("settings-theme");
  const settingsLangSelect = document.getElementById("settings-lang");

  const savedTheme = localStorage.getItem("mp_theme");
  const savedLang = localStorage.getItem("mp_lang");
  applyTheme(savedTheme || "night", settingsThemeSelect);
  applyLanguage(savedLang || "en", settingsLangSelect);

  if (openSettingsBtn) {
    openSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSettings(settingsModal);
    });
  }

  if (openSettingsGearBtn) {
    openSettingsGearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSettings(settingsModal);
    });
  }

  if (settingsModal) {
    settingsModal.querySelectorAll("[data-settings-close]").forEach((el) => {
      el.addEventListener("click", () => closeSettings(settingsModal));
    });
  }

  if (settingsThemeSelect) {
    settingsThemeSelect.addEventListener("change", () => {
      applyTheme(settingsThemeSelect.value, settingsThemeSelect);
      if (showAlert) showAlert("Theme rune applied", "info", 1600);
    });
  }

  if (settingsLangSelect) {
    settingsLangSelect.addEventListener("change", () => {
      applyLanguage(settingsLangSelect.value, settingsLangSelect);
      if (showAlert) showAlert("Language rune applied", "info", 1600);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSettings(settingsModal);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSettings({ showAlert });
});
