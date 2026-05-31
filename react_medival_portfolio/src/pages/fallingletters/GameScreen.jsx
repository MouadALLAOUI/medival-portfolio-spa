import styles from "./fallingletters.module.scss";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function GameScreen({ t, score, hearts, timeLeft, gameAreaRef }) {
  return (
    <div className={styles.gameScreen} id="gameScreen">
      {/* HUD */}
      <div className={styles.gameHeader}>
        <div className={styles.hudScore}>
          <span className={styles.hudLabel}>{t.hudScore}</span>
          <span className={styles.hudValue} id="scoreValue">{score}</span>
        </div>

        <div className={styles.hudHearts}>
          <span className={styles.hudLabel}>{t.hudLife}</span>
          <span className={styles.heartsRow} id="heartsValue">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`${styles.heartIcon} ${i < hearts ? styles.heartAlive : styles.heartDead}`}
              >
                {i < hearts ? "❤️" : "🖤"}
              </span>
            ))}
          </span>
        </div>

        <div className={styles.hudTimer}>
          <span className={styles.hudLabel}>{t.hudTime}</span>
          <span
            className={`${styles.hudValue} ${timeLeft <= 10 ? styles.timerDanger : ""}`}
            id="timerValue"
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Danger line */}
      <div className={styles.dangerLine} />

      {/* Columns */}
      <div className={styles.gameArea} id="gameArea" ref={gameAreaRef}>
        <div className="column" />
        <div className="column" />
        <div className="column" />
        <div className="column" />
      </div>
    </div>
  );
}
