import styles from "./fallingletters.module.scss";

export default function GameOverScreen({
  t,
  score,
  correctCount,
  missedCount,
  accuracy,
  lettersPerMin,
  onPlayAgain,
}) {
  const grade =
    accuracy >= 90 ? "S" :
    accuracy >= 75 ? "A" :
    accuracy >= 60 ? "B" :
    accuracy >= 45 ? "C" : "D";

  const gradeColor = {
    S: "#ffd700",
    A: "#4caf50",
    B: "#2196f3",
    C: "#ff9800",
    D: "#f44336",
  }[grade];

  return (
    <div className={styles.gameOverScreen} id="gameOverScreen">
      <div className={styles.gameOverContent}>
        <div className={styles.gameOverTitle}>
          <span className={styles.gameOverEmoji}>🎉</span>
          <h2>{t.gameOver}</h2>
          <span className={styles.gameOverEmoji}>🎉</span>
        </div>

        <div className={styles.gradeDisplay} style={{ "--grade-color": gradeColor }}>
          <span className={styles.gradeLetter}>{grade}</span>
        </div>

        <div className={styles.finalScore} id="finalScore">
          <span className={styles.finalScoreLabel}>{t.finalScore}</span>
          <span className={styles.finalScoreValue}>{score}</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue} id="correctLetters">{correctCount}</span>
            <span className={styles.statLabel}>{t.statCorrect}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statValue} ${styles.statMissed}`} id="missedLetters">{missedCount}</span>
            <span className={styles.statLabel}>{t.statMissed}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statValue} ${styles.statAccuracy}`} id="accuracy">{accuracy}%</span>
            <span className={styles.statLabel}>{t.statAccuracy}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statValue} ${styles.statCpm}`} id="lettersPerMinute">{lettersPerMin}</span>
            <span className={styles.statLabel}>{t.statCPM}</span>
          </div>
        </div>

        <button id="restartBtn" className={styles.playAgainBtn} onClick={onPlayAgain}>
          {t.playAgain}
        </button>
      </div>
    </div>
  );
}
