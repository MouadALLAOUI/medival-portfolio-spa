import styles from "./fallingletters.module.scss";

const LEVEL_ICONS = { easy: "🌿", medium: "⚔️", hard: "🔥" };

export default function MenuScreen({ t, level, onSetLevel, onStart, onSettings }) {
  return (
    <div className={styles.menuScreen} id="startScreen">
      {/* Decorative particles */}
      <div className={styles.particles} aria-hidden="true">
        {["A", "B", "C", "D", "E", "F"].map((l, i) => (
          <span key={i} className={styles.particle} style={{ "--i": i }}>
            {l}
          </span>
        ))}
      </div>

      <div className={styles.menuContent}>
        <h1 className={styles.gameTitle}>
          <span className={styles.titleIcon}>⌨️</span>
          {t.title}
          <span className={styles.titleIcon}>🎮</span>
        </h1>

        <div className={styles.instructionPanel}>
          {t.instructions.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className={styles.levelSection}>
          <h3 className={styles.levelHeading}>{t.chooseLevel}</h3>
          <div className={styles.levelButtons}>
            {Object.entries(t.levels).map(([key, meta]) => (
              <button
                key={key}
                id={`level-btn-${key}`}
                className={`${styles.levelBtn} ${level === key ? styles.levelSelected : ""}`}
                onClick={() => onSetLevel(key)}
              >
                <span className={styles.levelIcon}>{LEVEL_ICONS[key]}</span>
                <span className={styles.levelLabel}>{meta.label}</span>
                <span className={styles.levelDesc}>{meta.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button id="startGameBtn" className={styles.startBtn} onClick={onStart}>
            {t.startGame}
          </button>
          <button id="settingsBtn" className={styles.settingsBtn} onClick={onSettings}>
            {t.settings}
          </button>
        </div>
      </div>
    </div>
  );
}
