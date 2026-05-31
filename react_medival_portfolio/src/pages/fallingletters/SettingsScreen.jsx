import styles from "./fallingletters.module.scss";
import { GAME_LANGS } from "./gameStrings";
import { ALL_LAYOUTS } from "./keyboardLayouts";

export default function SettingsScreen({
  t,
  gameLang,
  onSetGameLang,
  layoutId,
  onSetLayoutId,
  layout,
  gameTimer,
  onTimerChange,
  selectedLetters,
  onLetterToggle,
  onSelectPreset,
  customLettersInput,
  onCustomLettersChange,
  reducePointsOnMiss,
  onReducePointsChange,
  onBack,
  onApply,
}) {
  const isArabic = layout.lang === "arabic";

  return (
    <div className={styles.settingsScreen} id="settingsScreen">
      <div className={styles.settingsContainer}>
        <h2 className={styles.settingsTitle}>{t.settingsTitle}</h2>

        {/* ── Language ── */}
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>{t.languageLabel}</label>
          <div className={styles.langButtons}>
            {Object.entries(GAME_LANGS).map(([code, name]) => (
              <button
                key={code}
                className={`${styles.langBtn} ${gameLang === code ? styles.langSelected : ""}`}
                onClick={() => onSetGameLang(code)}
                lang={code === "ar" ? "ar" : undefined}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Keyboard layout ── */}
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>{t.keyboardLabel}</label>
          <div className={styles.layoutButtons}>
            {ALL_LAYOUTS.map((l) => (
              <button
                key={l.id}
                className={`${styles.layoutBtn} ${layoutId === l.id ? styles.layoutSelected : ""}`}
                onClick={() => onSetLayoutId(l.id)}
              >
                <span className={styles.layoutName}>{l.label}</span>
                <span className={styles.layoutLang}>
                  {l.lang === "arabic" ? "🌙 Arabic" : "🔡 Latin"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Timer ── */}
        <div className={styles.settingGroup}>
          <label htmlFor="gameTimer" className={styles.settingLabel}>
            {t.timerLabel}
          </label>
          <input
            type="number"
            id="gameTimer"
            name="gameTimer"
            min="30"
            max="3600"
            value={gameTimer}
            onChange={(e) => onTimerChange(parseInt(e.target.value) || 60)}
            className={styles.settingInput}
          />
          <small className={styles.settingHint}>{t.timerHint}</small>
        </div>

        {/* ── Letter selection ── */}
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>{t.lettersLabel}</label>
          <div className={styles.letterControls}>
            <button className={styles.controlBtn} onClick={() => onSelectPreset("all")}>
              {t.selectAll}
            </button>
            <button className={styles.controlBtn} onClick={() => onSelectPreset("none")}>
              {t.clearAll}
            </button>
            <button className={styles.controlBtn} onClick={() => onSelectPreset("vowels")}>
              {t.vowelsOnly}
            </button>
            <button className={styles.controlBtn} onClick={() => onSelectPreset("consonants")}>
              {t.consonantsOnly}
            </button>
          </div>

          <div
            className={styles.letterCheckboxes}
            id="letterCheckboxes"
            dir={isArabic ? "rtl" : "ltr"}
            style={isArabic ? { gridTemplateColumns: "repeat(4, 1fr)" } : undefined}
          >
            {layout.alphabet.map((letter) => (
              <div key={letter} className={styles.letterCheckbox}>
                <input
                  type="checkbox"
                  id={`letter-${letter}`}
                  name="practiceLetters"
                  checked={selectedLetters.includes(letter)}
                  onChange={() => onLetterToggle(letter)}
                />
                <label
                  htmlFor={`letter-${letter}`}
                  className={isArabic ? styles.arabicChar : undefined}
                >
                  {letter}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ── Custom letters ── */}
        <div className={styles.settingGroup}>
          <label htmlFor="customLetters" className={styles.settingLabel}>
            {t.customLabel}
          </label>
          <input
            type="text"
            id="customLetters"
            name="customLetters"
            placeholder={t.customPlaceholder}
            maxLength={isArabic ? 80 : 26}
            value={customLettersInput}
            onChange={onCustomLettersChange}
            className={styles.settingInput}
            dir={isArabic ? "rtl" : "ltr"}
          />
          <small className={styles.settingHint}>{t.customHint}</small>
        </div>

        {/* ── Reduce points ── */}
        <div className={`${styles.settingGroup} ${styles.checkboxGroup}`}>
          <input
            type="checkbox"
            id="reducePointsOnMiss"
            name="reducePointsOnMiss"
            checked={reducePointsOnMiss}
            onChange={(e) => onReducePointsChange(e.target.checked)}
          />
          <label htmlFor="reducePointsOnMiss" className={styles.checkboxLabel}>
            {t.reducePoints}
          </label>
        </div>

        <div className={styles.settingsActions}>
          <button id="backBtn" className={styles.backBtn} onClick={onBack}>
            {t.backBtn}
          </button>
          <button id="applyBtn" className={styles.applyBtn} onClick={onApply}>
            {t.applyBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
