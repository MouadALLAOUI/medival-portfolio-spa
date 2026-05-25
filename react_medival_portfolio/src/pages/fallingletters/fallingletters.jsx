import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function FallingLetters() {
  // Screens state: 'menu' | 'settings' | 'game' | 'gameover'
  const [screen, setScreen] = useState("menu");
  const [level, setLevel] = useState("easy");

  // Game stats
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameTimer, setGameTimer] = useState(60);
  const [reducePointsOnMiss, setReducePointsOnMiss] = useState(true);

  // Settings Letter Checkbox State
  const allAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedLetters, setSelectedLetters] = useState(allAlphabet);
  const [customLettersInput, setCustomLettersInput] = useState("");

  // Game Statistics
  const [correctCount, setCorrectCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lettersPerMin, setLettersPerMin] = useState(0);

  // Refs for tracking animation loops and interval timers
  const gameRunningRef = useRef(false);
  const fallingLettersRef = useRef([]); // array of { id, letter, column, y, refNode, handled }
  const nextLetterId = useRef(0);
  
  const scoreRef = useRef(0);
  const heartsRef = useRef(5);
  const correctCountRef = useRef(0);
  const missedCountRef = useRef(0);
  const totalLettersRef = useRef(0);
  const timeLeftRef = useRef(60);
  const startTimeRef = useRef(0);

  const spawnIntervalId = useRef(null);
  const speedIncreaseIntervalId = useRef(null);
  const timerIntervalId = useRef(null);
  const animationFrameId = useRef(null);
  const gameAreaRef = useRef(null);

  // Constants
  const levelsConfig = {
    easy: { speed: 2, spawnRate: 2500 },
    medium: { speed: 5, spawnRate: 2000 },
    hard: { speed: 7, spawnRate: 1500 }
  };
  const currentSpeed = useRef(2);

  // Clean intervals when component unmounts
  useEffect(() => {
    return () => {
      stopGameLoops();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectLettersPreset = (type) => {
    const vowels = ["A", "E", "I", "O", "U"];
    if (type === "all") {
      setSelectedLetters(allAlphabet);
      setCustomLettersInput("");
    } else if (type === "none") {
      setSelectedLetters([]);
      setCustomLettersInput("");
    } else if (type === "vowels") {
      setSelectedLetters(vowels);
      setCustomLettersInput(vowels.join(""));
    } else if (type === "consonants") {
      const consonants = allAlphabet.filter((l) => !vowels.includes(l));
      setSelectedLetters(consonants);
      setCustomLettersInput(consonants.join(""));
    }
  };

  const handleCustomLettersChange = (e) => {
    const customText = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    setCustomLettersInput(customText);
    const lettersArr = customText.split("");
    setSelectedLetters(allAlphabet.filter((l) => lettersArr.includes(l)));
  };

  const handleLetterCheckboxToggle = (letter) => {
    if (selectedLetters.includes(letter)) {
      setSelectedLetters(selectedLetters.filter((l) => l !== letter));
    } else {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  const startGame = () => {
    if (selectedLetters.length === 0) {
      alert("Please select at least one letter to practice!");
      return;
    }

    // Reset game state and refs
    scoreRef.current = 0;
    heartsRef.current = 5;
    correctCountRef.current = 0;
    missedCountRef.current = 0;
    totalLettersRef.current = 0;
    timeLeftRef.current = gameTimer;
    currentSpeed.current = levelsConfig[level].speed;
    startTimeRef.current = Date.now();
    fallingLettersRef.current = [];
    nextLetterId.current = 0;
    gameRunningRef.current = true;

    setScore(0);
    setHearts(5);
    setTimeLeft(gameTimer);
    setScreen("game");

    // Boot keyboard press listener
    document.addEventListener("keydown", handleKeyPress);

    // Boot game loops
    stopGameLoops();
    startGameLoops();
  };

  function stopGameLoops() {
    gameRunningRef.current = false;
    document.removeEventListener("keydown", handleKeyPress);

    if (spawnIntervalId.current) clearInterval(spawnIntervalId.current);
    if (speedIncreaseIntervalId.current) clearInterval(speedIncreaseIntervalId.current);
    if (timerIntervalId.current) clearInterval(timerIntervalId.current);
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

    // Clear DOM nodes
    fallingLettersRef.current.forEach((item) => {
      if (item.refNode) item.refNode.remove();
    });
    fallingLettersRef.current = [];
  }

  const startGameLoops = () => {
    // Spawn letters loop
    spawnIntervalId.current = setInterval(() => {
      if (!gameRunningRef.current) return;
      spawnLetter();
    }, levelsConfig[level].spawnRate);

    // Speed increase loop (every 30s)
    speedIncreaseIntervalId.current = setInterval(() => {
      if (!gameRunningRef.current) return;
      currentSpeed.current += 0.3;
      showSpeedUpNotification();
    }, 30000);

    // Timer countdown
    timerIntervalId.current = setInterval(() => {
      if (!gameRunningRef.current) return;
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        endGame();
      }
    }, 1000);

    // Physics Animation loop
    const animate = () => {
      if (!gameRunningRef.current) return;
      updateFallingLetters();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
  };

  const spawnLetter = () => {
    if (!gameAreaRef.current) return;
    const letter = selectedLetters[Math.floor(Math.random() * selectedLetters.length)];
    const columnIndex = Math.floor(Math.random() * 4);
    const id = nextLetterId.current++;

    const letterNode = document.createElement("div");
    letterNode.className = "falling-letter";
    letterNode.textContent = letter;
    letterNode.style.top = "0px";

    // Append node directly inside target column
    const columns = gameAreaRef.current.querySelectorAll(".column");
    if (columns[columnIndex]) {
      columns[columnIndex].appendChild(letterNode);
    }

    fallingLettersRef.current.push({
      id,
      letter,
      column: columnIndex,
      y: 0,
      refNode: letterNode,
      handled: false
    });

    totalLettersRef.current++;
  };

  const updateFallingLetters = () => {
    if (!gameAreaRef.current) return;
    const limit = gameAreaRef.current.clientHeight - 80;

    for (let i = fallingLettersRef.current.length - 1; i >= 0; i--) {
      const item = fallingLettersRef.current[i];
      if (item.handled) continue;

      item.y += currentSpeed.current;
      item.refNode.style.top = item.y + "px";

      if (item.y > limit) {
        item.handled = true;

        // Visual missed feedback
        item.refNode.style.background = "#f44336";
        item.refNode.style.animation = "missedShake 0.5s ease";

        setTimeout(() => {
          if (reducePointsOnMiss) {
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
    const idx = fallingLettersRef.current.findIndex((item) => item.id === id);
    if (idx !== -1) {
      const item = fallingLettersRef.current[idx];
      if (item.refNode) item.refNode.remove();
      fallingLettersRef.current.splice(idx, 1);
    }
  };

  function handleKeyPress(e) {
    if (!gameRunningRef.current) return;
    const pressedKey = e.key.toUpperCase();

    // Check alphabetic characters only
    if (!/^[A-Z]$/.test(pressedKey)) return;

    // Search closest matches closer to the bottom (highest Y)
    let bestMatch = null;
    let maxDistance = -1;

    fallingLettersRef.current.forEach((item) => {
      if (item.handled) return;
      if (item.letter === pressedKey) {
        if (item.y > maxDistance) {
          bestMatch = item;
          maxDistance = item.y;
        }
      }
    });

    if (bestMatch) {
      bestMatch.handled = true;
      bestMatch.refNode.style.background = "#4CAF50";
      bestMatch.refNode.style.color = "white";
      bestMatch.refNode.style.transform = "translateX(-50%) scale(1.2)";

      scoreRef.current += 10;
      correctCountRef.current++;
      setScore(scoreRef.current);

      setTimeout(() => {
        showFeedback("correct", bestMatch.column);
        removeLetterNode(bestMatch.id);
      }, 300);
    } else {
      // Wrong key press, screenshake page & lose a heart
      heartsRef.current = Math.max(0, heartsRef.current - 1);
      setHearts(heartsRef.current);

      const gameScreenNode = document.getElementById("gameScreen");
      if (gameScreenNode) {
        gameScreenNode.classList.add("shake");
        setTimeout(() => gameScreenNode.classList.remove("shake"), 400);
      }
      showFeedback("wrong", -1);

      if (heartsRef.current <= 0) {
        endGame();
      }
    }
  }

  const showFeedback = (type, columnIndex) => {
    if (!gameAreaRef.current) return;
    const feedback = document.createElement("div");
    feedback.className = `feedback ${type}`;
    feedback.textContent = type === "correct" ? "+10" : type === "missed" ? "-5" : "❌";

    if (columnIndex >= 0) {
      feedback.style.left = "50%";
      feedback.style.top = "50%";
      feedback.style.transform = "translateX(-50%)";
      const columns = gameAreaRef.current.querySelectorAll(".column");
      if (columns[columnIndex]) {
        columns[columnIndex].appendChild(feedback);
      }
    } else {
      feedback.style.left = "50%";
      feedback.style.top = "50%";
      feedback.style.transform = "translate(-50%, -50%)";
      gameAreaRef.current.appendChild(feedback);
    }

    setTimeout(() => {
      feedback.remove();
    }, 1000);
  };

  const showSpeedUpNotification = () => {
    if (!gameAreaRef.current) return;
    const indicator = document.createElement("div");
    indicator.className = "speed-indicator";
    indicator.textContent = "⚡ Speed Up! ⚡";
    gameAreaRef.current.appendChild(indicator);
    setTimeout(() => indicator.remove(), 2000);
  };

  const endGame = () => {
    stopGameLoops();

    // Calculate final metrics
    const durationMins = (Date.now() - startTimeRef.current) / 60000;
    const calculatedAccuracy = totalLettersRef.current > 0
      ? Math.round((correctCountRef.current / totalLettersRef.current) * 100)
      : 0;
    const calculatedCpm = durationMins > 0
      ? Math.round(correctCountRef.current / durationMins)
      : 0;

    setCorrectCount(correctCountRef.current);
    setMissedCount(missedCountRef.current);
    setAccuracy(calculatedAccuracy);
    setLettersPerMin(calculatedCpm);
    setScreen("gameover");
  };

  const formatTimerDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="game-wrapper min-h-screen text-white overflow-hidden relative font-sans select-none">
      {/* 🎮 Start Screen 🎮 */}
      {screen === "menu" && (
        <div className="start-screen min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900" id="startScreen">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-8 drop-shadow-lg animate-bounce">
            🎮 Kids Typing Game 🎮
          </h1>

          <div className="instructions max-w-lg w-full text-center bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl mb-8 border border-white border-opacity-20 shadow-heavy font-body">
            <p className="text-lg mb-3">🎯 Type the falling letters before they reach the bottom!</p>
            <p className="text-lg mb-3">⌨️ Use your keyboard to match the letters</p>
            <p className="text-lg">🏆 Get +10 points for correct letters, -5 for missed ones</p>
          </div>

          <div className="level-selection flex flex-col items-center mb-8">
            <h3 className="font-cinzel text-lg mb-4">Choose Your Level:</h3>
            <div className="level-buttons flex gap-4">
              {["easy", "medium", "hard"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`level-btn px-6 py-4 flex flex-col items-center min-w-32 rounded-xl transition-all duration-300 font-bold border border-white border-opacity-10 hover:bg-white hover:bg-opacity-20 hover:-translate-y-1 hover:shadow-heavy ${
                    level === l ? "bg-white bg-opacity-35 shadow-gold-glow scale-105" : "bg-white bg-opacity-10"
                  }`}
                >
                  <span className="text-lg capitalize">{l}</span>
                  <span className="text-xs opacity-75 font-normal">
                    {l === "easy" ? "Slow & Steady" : l === "medium" ? "Getting Faster" : "Lightning Speed"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons flex gap-4">
            <button
              onClick={startGame}
              className="start-btn bg-white hover:bg-opacity-95 text-indigo-700 font-extrabold px-8 py-4 rounded-full text-xl shadow-heavy hover:-translate-y-1 transition-all"
            >
              🚀 Start Game
            </button>
            <button
              onClick={() => setScreen("settings")}
              className="settings-btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-extrabold px-8 py-4 rounded-full text-xl shadow-heavy hover:-translate-y-1 transition-all border border-white border-opacity-20"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      )}

      {/* ⚙️ Settings Screen ⚙️ */}
      {screen === "settings" && (
        <div className="settings-screen min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900" id="settingsScreen">
          <div className="settings-container max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl border border-white border-opacity-20 shadow-heavy overflow-y-auto max-h-[85vh]">
            <h2 className="font-cinzel text-3xl font-bold text-center mb-6">⚙️ Game Settings</h2>

            <div className="setting-group mb-6">
              <label htmlFor="gameTimer" className="block text-sm font-semibold mb-2">⏱️ Game Timer (seconds):</label>
              <input
                type="number"
                id="gameTimer"
                name="gameTimer"
                min="30"
                max="3600"
                value={gameTimer}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 60;
                  setGameTimer(val);
                  setTimeLeft(val);
                }}
                className="w-full p-3 rounded-lg text-stone-800 bg-white shadow"
              />
              <small className="block text-xs opacity-75 mt-1 italic">Set how long you want to play</small>
            </div>

            <div className="setting-group mb-6">
              <label className="block text-sm font-semibold mb-2">🔤 Select Letters to Practice:</label>
              <div className="letter-controls flex flex-wrap gap-2 mb-4">
                <button onClick={() => selectLettersPreset("all")} className="control-btn px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-35 rounded-full text-xs font-bold transition-all">Select All</button>
                <button onClick={() => selectLettersPreset("none")} className="control-btn px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-35 rounded-full text-xs font-bold transition-all">Clear All</button>
                <button onClick={() => selectLettersPreset("vowels")} className="control-btn px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-35 rounded-full text-xs font-bold transition-all">Vowels Only</button>
                <button onClick={() => selectLettersPreset("consonants")} className="control-btn px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-35 rounded-full text-xs font-bold transition-all">Consonants Only</button>
              </div>
              
              <div className="letter-checkboxes grid grid-cols-6 sm:grid-cols-8 gap-2 bg-black bg-opacity-20 p-4 rounded-xl max-h-40 overflow-y-auto">
                {allAlphabet.map((letter) => (
                  <div key={letter} className="letter-checkbox flex items-center justify-center gap-1 bg-white bg-opacity-10 p-2 rounded-lg">
                    <input
                      type="checkbox"
                      id={`letter-${letter}`}
                      name="practiceLetters"
                      checked={selectedLetters.includes(letter)}
                      onChange={() => handleLetterCheckboxToggle(letter)}
                      className="cursor-pointer scale-110"
                    />
                    <label htmlFor={`letter-${letter}`} className="text-sm font-bold cursor-pointer">{letter}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="setting-group mb-6">
              <label htmlFor="customLetters" className="block text-sm font-semibold mb-2">✏️ Or Type Custom Letters:</label>
              <input
                type="text"
                id="customLetters"
                name="customLetters"
                placeholder="e.g., ABCDEF"
                maxLength="26"
                value={customLettersInput}
                onChange={handleCustomLettersChange}
                className="w-full p-3 rounded-lg text-stone-800 bg-white shadow uppercase"
              />
              <small className="block text-xs opacity-75 mt-1 italic">Type specific letters you want to practice</small>
            </div>

            <div className="setting-group mb-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="reducePointsOnMiss"
                name="reducePointsOnMiss"
                checked={reducePointsOnMiss}
                onChange={(e) => setReducePointsOnMiss(e.target.checked)}
                className="cursor-pointer scale-125"
              />
              <label htmlFor="reducePointsOnMiss" className="text-sm font-semibold cursor-pointer">📉 Reduce points for missed letters</label>
            </div>

            <div className="settings-actions flex gap-4 justify-center mt-8">
              <button
                onClick={() => setScreen("menu")}
                className="back-btn px-6 py-3 bg-white bg-opacity-20 text-white font-bold rounded-xl shadow transition-all hover:bg-opacity-30 border border-white border-opacity-10"
              >
                ← Back to Menu
              </button>
              <button
                onClick={() => setScreen("menu")}
                className="apply-btn px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition-all"
              >
                ✓ Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎮 Game Screen 🎮 */}
      {screen === "game" && (
        <div className="game-screen min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 flex flex-col relative" id="gameScreen">
          <div className="game-header flex justify-between items-center px-6 py-4 bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-10 z-10">
            <div className="score text-xl font-cinzel font-bold text-emerald-400">Score: <span id="scoreValue">{score}</span></div>
            <div className="hearts flex items-center gap-1 text-xl font-cinzel font-bold">
              <span>LIFE:</span>
              <span id="heartsValue" className="flex gap-1 ml-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl transition-all duration-500 ${
                      i < hearts ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0"
                    }`}
                  >
                    ❤️
                  </span>
                ))}
              </span>
            </div>
            <div className="timer text-xl font-cinzel font-bold text-yellow-400">Time: <span id="timerValue">{formatTimerDisplay(timeLeft)}</span></div>
          </div>

          <div className="game-area flex-grow flex" id="gameArea" ref={gameAreaRef}>
            <div className="column flex-1 border-r border-white border-opacity-10 bg-white bg-opacity-5 relative"></div>
            <div className="column flex-1 border-r border-white border-opacity-10 bg-white bg-opacity-5 relative"></div>
            <div className="column flex-1 border-r border-white border-opacity-10 bg-white bg-opacity-5 relative"></div>
            <div className="column flex-1 bg-white bg-opacity-5 relative"></div>
          </div>
        </div>
      )}

      {/* 🎉 Game Over Screen 🎉 */}
      {screen === "gameover" && (
        <div className="game-over-screen min-h-screen flex justify-center items-center p-6 bg-black bg-opacity-80 fixed inset-0 z-50 animate-fadeIn" id="gameOverScreen">
          <div className="game-over-content max-w-lg w-full bg-white text-stone-800 p-8 rounded-2xl shadow-heavy text-center border-4 border-indigo-500">
            <h2 className="text-4xl font-cinzel font-bold text-indigo-600 mb-4">🎉 Game Over! 🎉</h2>
            <div className="final-score text-3xl font-cinzel font-bold text-emerald-600 mb-6">Final Score: <span id="finalScore">{score}</span></div>

            <div className="game-stats grid grid-cols-2 gap-4 bg-stone-100 p-4 rounded-xl mb-8 text-stone-800">
              <div className="stat-item flex flex-col p-2 bg-white rounded-lg shadow-sm border border-stone-200">
                <span className="stat-value text-2xl font-extrabold text-indigo-600" id="correctLetters">{correctCount}</span>
                <span className="stat-label text-xs font-semibold text-stone-500">Correct Letters</span>
              </div>
              <div className="stat-item flex flex-col p-2 bg-white rounded-lg shadow-sm border border-stone-200">
                <span className="stat-value text-2xl font-extrabold text-red-500" id="missedLetters">{missedCount}</span>
                <span className="stat-label text-xs font-semibold text-stone-500">Missed Letters</span>
              </div>
              <div className="stat-item flex flex-col p-2 bg-white rounded-lg shadow-sm border border-stone-200">
                <span className="stat-value text-2xl font-extrabold text-yellow-500" id="accuracy">{accuracy}%</span>
                <span className="stat-label text-xs font-semibold text-stone-500">Accuracy</span>
              </div>
              <div className="stat-item flex flex-col p-2 bg-white rounded-lg shadow-sm border border-stone-200">
                <span className="stat-value text-2xl font-extrabold text-teal-500" id="lettersPerMinute">{lettersPerMin}</span>
                <span className="stat-label text-xs font-semibold text-stone-500">Letters/Min</span>
              </div>
            </div>
            
            <button
              onClick={() => setScreen("menu")}
              className="restart-btn bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-8 py-3 rounded-full text-xl shadow-heavy hover:-translate-y-1 transition-all"
              id="restartBtn"
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
