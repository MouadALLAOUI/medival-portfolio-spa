import { useState, useEffect, useRef } from "react";
import MenuScreen from "./MenuScreen";
import SettingsScreen from "./SettingsScreen";
import GameScreen from "./GameScreen";
import GameOverScreen from "./GameOverScreen";
import styles from "./fallingletters.module.scss";
import { getStrings } from "./gameStrings";
import { LAYOUT_MAP, LAYOUT_QWERTY, resolveKey } from "./keyboardLayouts";

// ─── Constants ───────────────────────────────────────────────────────────────
const LEVELS_CONFIG = {
  easy:   { speed: 2,   spawnRate: 2500 },
  medium: { speed: 5,   spawnRate: 2000 },
  hard:   { speed: 7,   spawnRate: 1500 },
};

export default function FallingLetters() {
  // ─── Language / keyboard layout ────────────────────────────────────────────
  const [gameLang, setGameLang] = useState(
    () => localStorage.getItem("fl_lang") || "en"
  );
  const [layoutId, setLayoutId] = useState(
    () => localStorage.getItem("fl_layout") || "qwerty"
  );

  // Derived: current strings + layout objects
  const t = getStrings(gameLang);
  const layout = LAYOUT_MAP[layoutId] || LAYOUT_QWERTY;
  const isArabic = layout.lang === "arabic";

  // Persist preferences
  useEffect(() => {
    localStorage.setItem("fl_lang", gameLang);
  }, [gameLang]);

  useEffect(() => {
    localStorage.setItem("fl_layout", layoutId);
  }, [layoutId]);

  // ─── Screen routing ────────────────────────────────────────────────────────
  const [screen, setScreen] = useState("menu");

  // ─── Settings state ────────────────────────────────────────────────────────
  const [level, setLevel] = useState("easy");
  const [gameTimer, setGameTimer] = useState(60);
  const [selectedLetters, setSelectedLetters] = useState(layout.alphabet);
  const [customLettersInput, setCustomLettersInput] = useState("");
  const [reducePointsOnMiss, setReducePointsOnMiss] = useState(true);

  // When layout changes, reset selectedLetters to full alphabet of the new layout
  const prevLayoutId = useRef(layoutId);
  useEffect(() => {
    if (layoutId !== prevLayoutId.current) {
      prevLayoutId.current = layoutId;
      setSelectedLetters(layout.alphabet);
      setCustomLettersInput("");
    }
  }, [layoutId, layout.alphabet]);

  // ─── Reactive HUD state ────────────────────────────────────────────────────
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [timeLeft, setTimeLeft] = useState(60);

  // ─── End-of-game statistics ────────────────────────────────────────────────
  const [correctCount, setCorrectCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lettersPerMin, setLettersPerMin] = useState(0);

  // ─── Refs ──────────────────────────────────────────────────────────────────
  const gameAreaRef = useRef(null);
  const gameRunningRef = useRef(false);
  const fallingLettersRef = useRef([]);
  const nextLetterIdRef = useRef(0);
  const currentSpeedRef = useRef(2);
  const scoreRef = useRef(0);
  const heartsRef = useRef(5);
  const correctCountRef = useRef(0);
  const missedCountRef = useRef(0);
  const totalLettersRef = useRef(0);
  const timeLeftRef = useRef(60);
  const startTimeRef = useRef(0);

  // Stable refs for current settings (no stale closure issues in key handler)
  const selectedLettersRef = useRef(selectedLetters);
  const layoutRef = useRef(layout);
  const reducePointsRef = useRef(reducePointsOnMiss);
  const tRef = useRef(t);

  useEffect(() => { selectedLettersRef.current = selectedLetters; }, [selectedLetters]);
  useEffect(() => { layoutRef.current = layout; }, [layout]);
  useEffect(() => { reducePointsRef.current = reducePointsOnMiss; }, [reducePointsOnMiss]);
  useEffect(() => { tRef.current = t; }, [t]);

  const spawnIntervalRef = useRef(null);
  const speedIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const rafIdRef = useRef(null);
  const wrapperRef = useRef(null);
  const keyHandlerRef = useRef(null);

  // ─── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => stopGameLoops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Settings helpers ──────────────────────────────────────────────────────
  const selectLettersPreset = (type) => {
    const vowels = layout.vowels;
    const alpha = layout.alphabet;
    if (type === "all") {
      setSelectedLetters(alpha);
      setCustomLettersInput("");
    } else if (type === "none") {
      setSelectedLetters([]);
      setCustomLettersInput("");
    } else if (type === "vowels") {
      setSelectedLetters(vowels);
      setCustomLettersInput(isArabic ? vowels.join(" ") : vowels.join(""));
    } else if (type === "consonants") {
      const consonants = alpha.filter((l) => !vowels.includes(l));
      setSelectedLetters(consonants);
      setCustomLettersInput(isArabic ? consonants.join(" ") : consonants.join(""));
    }
  };

  const handleCustomLettersChange = (e) => {
    const raw = e.target.value;
    if (isArabic) {
      // For Arabic, split by space or individual chars
      const chars = raw.split(/\s+/).filter((c) => c.length > 0);
      setCustomLettersInput(raw);
      setSelectedLetters(layout.alphabet.filter((l) => chars.includes(l)));
    } else {
      const clean = raw.toUpperCase().replace(/[^A-Z]/g, "");
      setCustomLettersInput(clean);
      setSelectedLetters(layout.alphabet.filter((l) => clean.includes(l)));
    }
  };

  const handleLetterToggle = (letter) => {
    setSelectedLetters((prev) =>
      prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter]
    );
  };

  // ─── Game lifecycle ────────────────────────────────────────────────────────
  function stopGameLoops() {
    gameRunningRef.current = false;
    if (keyHandlerRef.current) {
      document.removeEventListener("keydown", keyHandlerRef.current);
    }
    if (spawnIntervalRef.current)  clearInterval(spawnIntervalRef.current);
    if (speedIntervalRef.current)  clearInterval(speedIntervalRef.current);
    if (timerIntervalRef.current)  clearInterval(timerIntervalRef.current);
    if (rafIdRef.current)          cancelAnimationFrame(rafIdRef.current);
    fallingLettersRef.current.forEach(({ refNode }) => refNode?.remove());
    fallingLettersRef.current = [];
  }

  const startGame = () => {
    if (selectedLetters.length === 0) {
      alert(tRef.current.selectLetterAlert);
      return;
    }

    scoreRef.current = 0;
    heartsRef.current = 5;
    correctCountRef.current = 0;
    missedCountRef.current = 0;
    totalLettersRef.current = 0;
    timeLeftRef.current = gameTimer;
    currentSpeedRef.current = LEVELS_CONFIG[level].speed;
    startTimeRef.current = Date.now();
    fallingLettersRef.current = [];
    nextLetterIdRef.current = 0;

    setScore(0);
    setHearts(5);
    setTimeLeft(gameTimer);
    setScreen("game");

    // Cleanup any old loops first, then arm new ones
    stopGameLoops();
    gameRunningRef.current = true;

    keyHandlerRef.current = handleKeyPress;
    document.addEventListener("keydown", keyHandlerRef.current);
    startGameLoops();
  };

  const startGameLoops = () => {
    spawnIntervalRef.current = setInterval(() => {
      if (!gameRunningRef.current) return;
      spawnLetter();
    }, LEVELS_CONFIG[level].spawnRate);

    speedIntervalRef.current = setInterval(() => {
      if (!gameRunningRef.current) return;
      currentSpeedRef.current += 0.3;
      showSpeedUpNotification();
    }, 30000);

    timerIntervalRef.current = setInterval(() => {
      if (!gameRunningRef.current) return;
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) endGame();
    }, 1000);

    const animate = () => {
      if (!gameRunningRef.current) return;
      updateFallingLetters();
      rafIdRef.current = requestAnimationFrame(animate);
    };
    rafIdRef.current = requestAnimationFrame(animate);
  };

  // ─── Letter spawning ───────────────────────────────────────────────────────
  const spawnLetter = () => {
    if (!gameAreaRef.current) return;
    const letters = selectedLettersRef.current;
    if (letters.length === 0) return;

    const letter = letters[Math.floor(Math.random() * letters.length)];
    const columnIndex = Math.floor(Math.random() * 4);
    const id = nextLetterIdRef.current++;

    const node = document.createElement("div");
    node.className = "falling-letter";
    // For Arabic multi-char ligatures (لا), use data attribute
    node.textContent = letter;
    node.dataset.letter = letter;
    node.style.top = "0px";
    // Shrink font for Arabic to fit ligatures
    if (letter.length > 1) node.style.fontSize = "clamp(1.2rem, 2.5vw, 2rem)";

    const columns = gameAreaRef.current.querySelectorAll(".column");
    if (columns[columnIndex]) columns[columnIndex].appendChild(node);

    fallingLettersRef.current.push({ id, letter, column: columnIndex, y: 0, refNode: node, handled: false });
    totalLettersRef.current++;
  };

  // ─── Physics update ────────────────────────────────────────────────────────
  const updateFallingLetters = () => {
    if (!gameAreaRef.current) return;
    const limit = gameAreaRef.current.clientHeight - 80;

    for (let i = fallingLettersRef.current.length - 1; i >= 0; i--) {
      const item = fallingLettersRef.current[i];
      if (item.handled) continue;

      item.y += currentSpeedRef.current;
      item.refNode.style.top = item.y + "px";

      if (item.y > limit) {
        item.handled = true;
        item.refNode.style.background = "#ef4444";
        item.refNode.style.color = "#fff";
        item.refNode.style.animation = "missedShake 0.5s ease";

        setTimeout(() => {
          if (reducePointsRef.current) {
            scoreRef.current = Math.max(0, scoreRef.current - 5);
            setScore(scoreRef.current);
          }
          missedCountRef.current++;
          showFeedback("missed", item.column);
          removeLetterNode(item.id);
        }, 100);
      }
    }
  };

  const removeLetterNode = (id) => {
    const idx = fallingLettersRef.current.findIndex((x) => x.id === id);
    if (idx !== -1) {
      fallingLettersRef.current[idx].refNode?.remove();
      fallingLettersRef.current.splice(idx, 1);
    }
  };

  // ─── Key handler (stable — refs only, no stale closures) ──────────────────
  function handleKeyPress(e) {
    if (!gameRunningRef.current) return;

    // Resolve which character was typed based on active layout
    const typed = resolveKey(e, layoutRef.current);
    if (!typed) return;

    // Find best match (closest to bottom)
    let bestMatch = null;
    let maxY = -1;
    fallingLettersRef.current.forEach((item) => {
      if (!item.handled && item.letter === typed && item.y > maxY) {
        bestMatch = item;
        maxY = item.y;
      }
    });

    if (bestMatch) {
      bestMatch.handled = true;
      bestMatch.refNode.style.background = "#4ade80";
      bestMatch.refNode.style.color = "#1a1a2e";
      bestMatch.refNode.style.transform = "translateX(-50%) scale(1.2)";
      bestMatch.refNode.style.animation = "correctPulse 0.3s ease forwards";

      scoreRef.current += 10;
      correctCountRef.current++;
      setScore(scoreRef.current);

      setTimeout(() => {
        showFeedback("correct", bestMatch.column);
        removeLetterNode(bestMatch.id);
      }, 280);
    } else {
      // Wrong key → lose a heart + shake
      heartsRef.current = Math.max(0, heartsRef.current - 1);
      setHearts(heartsRef.current);

      if (wrapperRef.current) {
        wrapperRef.current.classList.add(styles.shake);
        setTimeout(() => wrapperRef.current?.classList.remove(styles.shake), 450);
      }
      showFeedback("wrong", -1);
      if (heartsRef.current <= 0) endGame();
    }
  }

  // ─── DOM-injected feedback / notifications ─────────────────────────────────
  const showFeedback = (type, columnIndex) => {
    if (!gameAreaRef.current) return;
    const strings = tRef.current;
    const el = document.createElement("div");
    el.className = `feedback ${type}`;
    el.textContent =
      type === "correct" ? strings.feedbackCorrect :
      type === "missed"  ? strings.feedbackMissed  :
                           strings.feedbackWrong;

    if (columnIndex >= 0) {
      el.style.left = "50%";
      el.style.top = "40%";
      el.style.transform = "translateX(-50%)";
      const columns = gameAreaRef.current.querySelectorAll(".column");
      columns[columnIndex]?.appendChild(el);
    } else {
      el.style.left = "50%";
      el.style.top = "50%";
      el.style.transform = "translate(-50%, -50%)";
      gameAreaRef.current.appendChild(el);
    }
    setTimeout(() => el.remove(), 1000);
  };

  const showSpeedUpNotification = () => {
    if (!gameAreaRef.current) return;
    const el = document.createElement("div");
    el.className = "speed-indicator";
    el.textContent = tRef.current.speedUp;
    gameAreaRef.current.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  };

  // ─── End game ──────────────────────────────────────────────────────────────
  const endGame = () => {
    stopGameLoops();
    const durationMins = (Date.now() - startTimeRef.current) / 60000;
    const calcAccuracy = totalLettersRef.current > 0
      ? Math.round((correctCountRef.current / totalLettersRef.current) * 100)
      : 0;
    const calcCpm = durationMins > 0
      ? Math.round(correctCountRef.current / durationMins)
      : 0;

    setCorrectCount(correctCountRef.current);
    setMissedCount(missedCountRef.current);
    setAccuracy(calcAccuracy);
    setLettersPerMin(calcCpm);
    setScreen("gameover");
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {screen === "menu" && (
        <MenuScreen
          t={t}
          level={level}
          onSetLevel={setLevel}
          onStart={startGame}
          onSettings={() => setScreen("settings")}
        />
      )}

      {screen === "settings" && (
        <SettingsScreen
          t={t}
          gameLang={gameLang}
          onSetGameLang={setGameLang}
          layoutId={layoutId}
          onSetLayoutId={setLayoutId}
          layout={layout}
          gameTimer={gameTimer}
          onTimerChange={(val) => { setGameTimer(val); setTimeLeft(val); }}
          selectedLetters={selectedLetters}
          onLetterToggle={handleLetterToggle}
          onSelectPreset={selectLettersPreset}
          customLettersInput={customLettersInput}
          onCustomLettersChange={handleCustomLettersChange}
          reducePointsOnMiss={reducePointsOnMiss}
          onReducePointsChange={setReducePointsOnMiss}
          onBack={() => setScreen("menu")}
          onApply={() => setScreen("menu")}
        />
      )}

      {screen === "game" && (
        <GameScreen
          t={t}
          score={score}
          hearts={hearts}
          timeLeft={timeLeft}
          gameAreaRef={gameAreaRef}
        />
      )}

      {screen === "gameover" && (
        <GameOverScreen
          t={t}
          score={score}
          correctCount={correctCount}
          missedCount={missedCount}
          accuracy={accuracy}
          lettersPerMin={lettersPerMin}
          onPlayAgain={() => setScreen("menu")}
        />
      )}
    </div>
  );
}
