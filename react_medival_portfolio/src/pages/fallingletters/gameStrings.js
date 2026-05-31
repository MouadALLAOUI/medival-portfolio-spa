/**
 * Self-contained translations for the Falling Letters game.
 * No dependency on the global SettingsProvider.
 */

export const GAME_LANGS = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

const strings = {
  en: {
    // Menu
    title: "Kids Typing Game",
    instructions: [
      "🎯 Type the falling letters before they reach the bottom!",
      "⌨️ Use your keyboard to match the letters",
      "🏆 +10 for correct letters · -5 for missed ones",
    ],
    chooseLevel: "Choose Your Level",
    levels: {
      easy:   { label: "Easy",   desc: "Slow & Steady" },
      medium: { label: "Medium", desc: "Getting Faster" },
      hard:   { label: "Hard",   desc: "Lightning Speed" },
    },
    startGame: "🚀 Start Game",
    settings: "⚙️ Settings",

    // Settings
    settingsTitle: "⚙️ Game Settings",
    timerLabel: "⏱️ Game Timer (seconds):",
    timerHint: "Set how long you want to play",
    lettersLabel: "🔤 Select Letters to Practice:",
    selectAll: "Select All",
    clearAll: "Clear All",
    vowelsOnly: "Vowels Only",
    consonantsOnly: "Consonants Only",
    customLabel: "✏️ Or Type Custom Letters:",
    customPlaceholder: "e.g., ABCDEF",
    customHint: "Type specific letters you want to practice",
    reducePoints: "📉 Reduce points for missed letters",
    backBtn: "← Back to Menu",
    applyBtn: "✓ Apply Settings",
    languageLabel: "🌐 Game Language:",
    keyboardLabel: "⌨️ Keyboard Layout:",

    // Game HUD
    hudScore: "Score",
    hudLife: "LIFE",
    hudTime: "Time",

    // Feedback
    feedbackCorrect: "+10",
    feedbackMissed: "-5",
    feedbackWrong: "✗",
    speedUp: "⚡ Speed Up! ⚡",

    // Game Over
    gameOver: "Game Over!",
    finalScore: "Final Score",
    statCorrect: "Correct",
    statMissed: "Missed",
    statAccuracy: "Accuracy",
    statCPM: "Letters/Min",
    playAgain: "🔄 Play Again",

    // Alerts
    selectLetterAlert: "Please select at least one letter to practice!",
  },

  fr: {
    title: "Jeu de Frappe",
    instructions: [
      "🎯 Tapez les lettres tombantes avant qu'elles n'atteignent le bas !",
      "⌨️ Utilisez votre clavier pour correspondre aux lettres",
      "🏆 +10 pour les bonnes lettres · -5 pour les ratées",
    ],
    chooseLevel: "Choisissez votre niveau",
    levels: {
      easy:   { label: "Facile",  desc: "Lent & Régulier" },
      medium: { label: "Moyen",   desc: "De plus en plus rapide" },
      hard:   { label: "Difficile", desc: "Vitesse Éclair" },
    },
    startGame: "🚀 Démarrer",
    settings: "⚙️ Paramètres",

    settingsTitle: "⚙️ Paramètres du jeu",
    timerLabel: "⏱️ Durée de la partie (secondes) :",
    timerHint: "Définissez combien de temps vous souhaitez jouer",
    lettersLabel: "🔤 Sélectionnez les lettres à pratiquer :",
    selectAll: "Tout sélectionner",
    clearAll: "Tout effacer",
    vowelsOnly: "Voyelles seulement",
    consonantsOnly: "Consonnes seulement",
    customLabel: "✏️ Ou tapez des lettres personnalisées :",
    customPlaceholder: "ex : ABCDEF",
    customHint: "Tapez les lettres spécifiques que vous souhaitez pratiquer",
    reducePoints: "📉 Réduire les points pour les lettres ratées",
    backBtn: "← Retour au menu",
    applyBtn: "✓ Appliquer",
    languageLabel: "🌐 Langue du jeu :",
    keyboardLabel: "⌨️ Disposition du clavier :",

    hudScore: "Score",
    hudLife: "VIE",
    hudTime: "Temps",

    feedbackCorrect: "+10",
    feedbackMissed: "-5",
    feedbackWrong: "✗",
    speedUp: "⚡ Accélération ! ⚡",

    gameOver: "Jeu Terminé !",
    finalScore: "Score Final",
    statCorrect: "Correctes",
    statMissed: "Ratées",
    statAccuracy: "Précision",
    statCPM: "Lettres/Min",
    playAgain: "🔄 Rejouer",

    selectLetterAlert: "Veuillez sélectionner au moins une lettre à pratiquer !",
  },

  ar: {
    title: "لعبة الكتابة",
    instructions: [
      "🎯 اكتب الحروف المتساقطة قبل أن تصل إلى الأسفل!",
      "⌨️ استخدم لوحة المفاتيح لمطابقة الحروف",
      "🏆 +١٠ للحروف الصحيحة · -٥ للحروف الفائتة",
    ],
    chooseLevel: "اختر مستواك",
    levels: {
      easy:   { label: "سهل",    desc: "بطيء ومنتظم" },
      medium: { label: "متوسط",  desc: "يزداد سرعة" },
      hard:   { label: "صعب",    desc: "سرعة البرق" },
    },
    startGame: "🚀 ابدأ اللعبة",
    settings: "⚙️ الإعدادات",

    settingsTitle: "⚙️ إعدادات اللعبة",
    timerLabel: "⏱️ مدة اللعبة (ثواني):",
    timerHint: "حدد المدة التي تريد اللعب فيها",
    lettersLabel: "🔤 اختر الحروف للتدريب:",
    selectAll: "تحديد الكل",
    clearAll: "إلغاء الكل",
    vowelsOnly: "الحركات فقط",
    consonantsOnly: "الحروف الساكنة فقط",
    customLabel: "✏️ أو اكتب حروفاً مخصصة:",
    customPlaceholder: "مثال: أبتث",
    customHint: "اكتب الحروف المحددة التي تريد التدريب عليها",
    reducePoints: "📉 تقليل النقاط عند فوات الحروف",
    backBtn: "← العودة للقائمة",
    applyBtn: "✓ تطبيق",
    languageLabel: "🌐 لغة اللعبة:",
    keyboardLabel: "⌨️ تخطيط لوحة المفاتيح:",

    hudScore: "النتيجة",
    hudLife: "حياة",
    hudTime: "الوقت",

    feedbackCorrect: "+١٠",
    feedbackMissed: "-٥",
    feedbackWrong: "✗",
    speedUp: "⚡ تسريع! ⚡",

    gameOver: "!انتهت اللعبة",
    finalScore: "النتيجة النهائية",
    statCorrect: "صحيح",
    statMissed: "فائت",
    statAccuracy: "الدقة",
    statCPM: "حرف/دقيقة",
    playAgain: "🔄 العب مجدداً",

    selectLetterAlert: "يرجى اختيار حرف واحد على الأقل للتدريب!",
  },
};

/**
 * Returns the translation object for a given language code.
 * Falls back to English if the key is missing.
 */
export function getStrings(lang) {
  return strings[lang] || strings.en;
}
