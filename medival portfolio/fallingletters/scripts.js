
// Game Configuration
const gameConfig = {
  levels: {
    easy: { speed: 2, spawnRate: 2500 },
    medium: { speed: 5, spawnRate: 2000 },
    hard: { speed: 7, spawnRate: 1500 }
  },
  speedIncrease: 0.3,
  speedIncreaseInterval: 30000, // 30 seconds
  correctPoints: 10,
  missedPenalty: 5,
  reducePointsOnMiss: true // Default to true
};

// Game State
let gameState = {
  currentLevel: 'easy',
  score: 0,
  timeLeft: 60, // 2 minutes in seconds
  gameRunning: false,
  fallingLetters: [],
  currentSpeed: 0.5,
  availableLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  gameTimer: 60, // seconds
  // Statistics
  correctCount: 0,
  missedCount: 0,
  totalLetters: 0,
  gameStartTime: 0,
  hearts: 5 // ❤️ starting lives
};

let spawnIntervalId = null;
let speedIncreaseIntervalId = null;
let gameTimerId = null;
let animationFrameId = null;

// DOM Elements
const startScreen = document.getElementById('startScreen');
const settingsScreen = document.getElementById('settingsScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreValue = document.getElementById('scoreValue');
const timerValue = document.getElementById('timerValue');
const finalScore = document.getElementById('finalScore');
const gameArea = document.getElementById('gameArea');
const columns = document.querySelectorAll('.column');
const heartsValue = document.getElementById('heartsValue');

// Initialize the game
function init() {
  setupEventListeners();
  generateLetterCheckboxes();
  updateTimerDisplay();
}

// Setup event listeners
function setupEventListeners() {
  // Level selection buttons
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // remove old selection
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));

      // add to the actual button clicked
      e.currentTarget.classList.add('selected');

      // update game state
      gameState.currentLevel = e.currentTarget.dataset.level;
    });
  });


  // Start game button
  document.getElementById('startGameBtn').addEventListener('click', startGame);

  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', showSettings);

  // Back button
  document.getElementById('backBtn').addEventListener('click', showStartScreen);

  // Apply settings button
  document.getElementById('applyBtn').addEventListener('click', applySettings);

  // Restart button
  document.getElementById('restartBtn').addEventListener('click', restartGame);

  // Game timer input
  document.getElementById("gameTimer").addEventListener("change", (e) => {
    gameState.gameTimer = parseInt(e.target.value);
    gameState.timeLeft = gameState.gameTimer;
    updateTimerDisplay();
  });

  // Reduce points on miss checkbox
  document.getElementById("reducePointsOnMiss").addEventListener("change", (e) => {
    gameConfig.reducePointsOnMiss = e.target.checked;
  });

  // Letter control buttons
  document.getElementById('selectAllBtn').addEventListener('click', () => selectLetters('all'));
  document.getElementById('selectNoneBtn').addEventListener('click', () => selectLetters('none'));
  document.getElementById('selectVowelsBtn').addEventListener('click', () => selectLetters('vowels'));
  document.getElementById('selectConsonantsBtn').addEventListener('click', () => selectLetters('consonants'));

  // Custom letters input
  document.getElementById('customLetters').addEventListener('input', handleCustomLetters);

  // Keyboard input
  document.addEventListener('keydown', handleKeyPress);
}

// Generate letter checkboxes in settings
function generateLetterCheckboxes() {
  const container = document.getElementById('letterCheckboxes');
  container.innerHTML = '';

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    const div = document.createElement('div');
    div.className = 'letter-checkbox';
    div.innerHTML = `
                    <input type="checkbox" id="letter-${letter}" checked>
                    <label for="letter-${letter}">${letter}</label>
                `;
    container.appendChild(div);
  });
}

// Show different screens
function showStartScreen() {
  startScreen.style.display = 'flex';
  settingsScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  gameOverScreen.style.display = 'none';
}

function showSettings() {
  startScreen.style.display = 'none';
  settingsScreen.style.display = 'flex';
  gameScreen.style.display = 'none';
  gameOverScreen.style.display = 'none';
}

function showGameScreen() {
  startScreen.style.display = 'none';
  settingsScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';
}

function showGameOverScreen() {
  gameOverScreen.style.display = 'flex';
  finalScore.textContent = gameState.score;
}

// Letter selection functions
function selectLetters(type) {
  const checkboxes = document.querySelectorAll('#letterCheckboxes input[type="checkbox"]');
  const vowels = ['A', 'E', 'I', 'O', 'U'];

  checkboxes.forEach(checkbox => {
    const letter = checkbox.id.split('-')[1];
    switch (type) {
      case 'all':
        checkbox.checked = true;
        break;
      case 'none':
        checkbox.checked = false;
        break;
      case 'vowels':
        checkbox.checked = vowels.includes(letter);
        break;
      case 'consonants':
        checkbox.checked = !vowels.includes(letter);
        break;
    }
  });
}

function handleCustomLetters(e) {
  const customText = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
  e.target.value = customText;

  // Update checkboxes based on custom input
  const checkboxes = document.querySelectorAll('#letterCheckboxes input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const letter = checkbox.id.split('-')[1];
    checkbox.checked = customText.includes(letter);
  });
}

function applySettings() {
  // Apply timer setting
  gameState.gameTimer = parseInt(document.getElementById('gameTimer').value);
  gameState.timeLeft = gameState.gameTimer;
  updateTimerDisplay();

  // Apply reduce points on miss setting
  gameConfig.reducePointsOnMiss = document.getElementById("reducePointsOnMiss").checked;

  showStartScreen();
}

// Render hearts
function renderHearts() {
  heartsValue.innerHTML = '';
  for (let i = 0; i < gameState.hearts; i++) {
    const heart = document.createElement('span');
    heart.textContent = '❤️';
    heart.classList.add('heart');
    heartsValue.appendChild(heart);
  }
}
// Start the game
function startGame() {
  // Get selected letters from settings
  const selectedLetters = [];
  document.querySelectorAll('#letterCheckboxes input[type="checkbox"]:checked').forEach(checkbox => {
    selectedLetters.push(checkbox.id.split('-')[1]);
  });

  if (selectedLetters.length === 0) {
    alert('Please select at least one letter to practice!');
    return;
  }

  // Reset game state
  gameState.hearts = 5; // Reset hearts
  gameState.availableLetters = selectedLetters;
  gameState.score = 0;
  gameState.timeLeft = gameState.gameTimer;
  gameState.gameRunning = true;
  gameState.fallingLetters = [];
  gameState.currentSpeed = gameConfig.levels[gameState.currentLevel].speed;
  gameState.correctCount = 0;
  gameState.missedCount = 0;
  gameState.totalLetters = 0;
  gameState.gameStartTime = Date.now();

  showGameScreen();
  updateDisplay();
  startGameLoop();
}

// Main game loop

function startGameLoop() {
  // Prevent starting multiple times
  if (gameState.gameRunning === false) {
    // nothing special: we'll start below
  }

  // Clear any previous intervals / rAF before starting new ones
  if (spawnIntervalId) { clearInterval(spawnIntervalId); spawnIntervalId = null; }
  if (speedIncreaseIntervalId) { clearInterval(speedIncreaseIntervalId); speedIncreaseIntervalId = null; }
  if (gameTimerId) { clearInterval(gameTimerId); gameTimerId = null; }
  if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }

  // Spawn letters interval
  spawnIntervalId = setInterval(() => {
    if (!gameState.gameRunning) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
      return;
    }
    spawnLetter();
  }, gameConfig.levels[gameState.currentLevel].spawnRate);

  // Speed increase interval
  speedIncreaseIntervalId = setInterval(() => {
    if (!gameState.gameRunning) {
      clearInterval(speedIncreaseIntervalId);
      speedIncreaseIntervalId = null;
      return;
    }
    gameState.currentSpeed += gameConfig.speedIncrease;
    showSpeedIncrease();
  }, gameConfig.speedIncreaseInterval);

  // Game timer interval
  gameTimerId = setInterval(() => {
    if (!gameState.gameRunning) {
      clearInterval(gameTimerId);
      gameTimerId = null;
      return;
    }

    gameState.timeLeft--;
    updateTimerDisplay();

    if (gameState.timeLeft <= 0) {
      endGame();
      clearInterval(gameTimerId);
      gameTimerId = null;
    }
  }, 1000);

  // Animation loop (single rAF loop stored in animationFrameId)
  function animate() {
    if (!gameState.gameRunning) return;
    updateFallingLetters();
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}


// Spawn a new falling letter
function spawnLetter() {
  const letter = gameState.availableLetters[Math.floor(Math.random() * gameState.availableLetters.length)];
  const columnIndex = Math.floor(Math.random() * 4);

  const letterElement = document.createElement('div');
  letterElement.className = 'falling-letter';
  letterElement.textContent = letter;
  letterElement.style.top = '0px';

  columns[columnIndex].appendChild(letterElement);

  gameState.fallingLetters.push({
    element: letterElement,
    letter: letter,
    column: columnIndex,
    y: 0,
    handled: false // <- add this flag
  });

  gameState.totalLetters++;
}

// Update falling letters positions
function updateFallingLetters() {
  for (let i = gameState.fallingLetters.length - 1; i >= 0; i--) {
    const letterObj = gameState.fallingLetters[i];

    // Skip already-handled letters (either already matched or scheduled for removal)
    if (letterObj.handled) continue;

    letterObj.y += gameState.currentSpeed;
    letterObj.element.style.top = letterObj.y + 'px';

    // Check if letter reached bottom
    if (letterObj.y > gameArea.clientHeight - 80) {
      // Mark as handled immediately to avoid duplicate processing
      letterObj.handled = true;

      // Letter missed - add visual feedback
      letterObj.element.style.background = '#f44336';
      letterObj.element.style.animation = 'missedShake 0.5s ease';

      setTimeout(() => {
        if (gameConfig.reducePointsOnMiss) {
          gameState.score = Math.max(0, gameState.score - gameConfig.missedPenalty);
        }
        gameState.missedCount++;
        removeLetter(letterObj);
        updateDisplay();
        showFeedback("missed", letterObj.column);
      }, 100);
    }
  }
}


// Handle keyboard input
function handleKeyPress(event) {
  if (!gameState.gameRunning) return;

  const pressedKey = event.key.toUpperCase();

  // Only process alphabetic keys
  if (!/^[A-Z]$/.test(pressedKey)) return;

  // Find the closest matching falling letter (prioritize letters closer to bottom)
  let bestMatch = null;
  let bestDistance = -1;

  for (let i = 0; i < gameState.fallingLetters.length; i++) {
    const letterObj = gameState.fallingLetters[i];
    // skip already handled letters
    if (letterObj.handled) continue;

    if (letterObj.letter === pressedKey) {
      if (letterObj.y > bestDistance) {
        bestMatch = { obj: letterObj, index: i };
        bestDistance = letterObj.y;
      }
    }
  }

  if (bestMatch) {
    // Correct key pressed
    const letterObj = bestMatch.obj;

    // Mark as handled immediately
    letterObj.handled = true;

    // Visual feedback for correct
    letterObj.element.style.background = '#4CAF50';
    letterObj.element.style.color = 'white';
    letterObj.element.style.transform = 'translateX(-50%) scale(1.2)';

    gameState.score += gameConfig.correctPoints;
    gameState.correctCount++;

    setTimeout(() => {
      removeLetter(letterObj);
      showFeedback('correct', letterObj.column);
    }, 300);

    updateDisplay();
  } else {
    // ❌ Wrong key → lose a heart
    if (gameState.hearts > 0) {
      const hearts = heartsValue.querySelectorAll('.heart');
      const lastHeart = hearts[hearts.length - 1];
      if (lastHeart) {
        lastHeart.classList.add('heart-lost');
        setTimeout(() => lastHeart.remove(), 600); // remove after animation
      }
    }
    // Wrong key pressed - show feedback
    gameState.hearts = Math.max(0, gameState.hearts - 1);
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 400);
    showFeedback('wrong', -1);
    updateDisplay();

    // If hearts are 0 → game over
    if (gameState.hearts <= 0) {
      endGame();
    }
  }
}


// Remove a falling letter
function removeLetter(letterObj) {
  const index = gameState.fallingLetters.indexOf(letterObj);
  if (index !== -1) {
    gameState.fallingLetters[index].element.remove();
    gameState.fallingLetters.splice(index, 1);
  }
}

// Show visual feedback
function showFeedback(type, columnIndex) {
  const feedback = document.createElement('div');
  feedback.className = `feedback ${type}`;

  let text = '';
  switch (type) {
    case 'correct':
      text = '+10';
      break;
    case 'missed':
      text = '-5';

      break;
    case 'wrong':
      text = '❌';
      break;
  }

  feedback.textContent = text;

  if (columnIndex >= 0) {
    // Position feedback in the column
    feedback.style.left = '50%';
    feedback.style.top = '50%';
    feedback.style.transform = 'translateX(-50%)';
    columns[columnIndex].appendChild(feedback);
  } else {
    // Position feedback in center for wrong key
    feedback.style.left = '50%';
    feedback.style.top = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    gameArea.appendChild(feedback);
  }

  setTimeout(() => {
    feedback.remove();
  }, 1000);
}

// Show speed increase notification
function showSpeedIncrease() {
  const indicator = document.createElement('div');
  indicator.className = 'speed-indicator';
  indicator.textContent = '⚡ Speed Up! ⚡';

  gameArea.appendChild(indicator);

  setTimeout(() => {
    indicator.remove();
  }, 2000);
}

// Update display elements
function updateDisplay() {
  scoreValue.textContent = gameState.score;
  renderHearts();
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = gameState.timeLeft % 60;
  timerValue.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// End the game
function endGame() {
  gameState.gameRunning = false;

  // Clear intervals / animation if still running
  if (spawnIntervalId) { clearInterval(spawnIntervalId); spawnIntervalId = null; }
  if (speedIncreaseIntervalId) { clearInterval(speedIncreaseIntervalId); speedIncreaseIntervalId = null; }
  if (gameTimerId) { clearInterval(gameTimerId); gameTimerId = null; }
  if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }

  // Clear all falling letters
  gameState.fallingLetters.forEach(letterObj => {
    letterObj.element.remove();
  });
  gameState.fallingLetters = [];

  // Calculate and display statistics
  updateGameStatistics();
  showGameOverScreen();
}

// Update game statistics display
function updateGameStatistics() {
  const gameTimeMinutes = (Date.now() - gameState.gameStartTime) / 60000;
  const accuracy = gameState.totalLetters > 0 ?
    Math.round((gameState.correctCount / gameState.totalLetters) * 100) : 0;
  const lettersPerMinute = gameTimeMinutes > 0 ?
    Math.round(gameState.correctCount / gameTimeMinutes) : 0;

  document.getElementById('correctLetters').textContent = gameState.correctCount;
  document.getElementById('missedLetters').textContent = gameState.missedCount;
  document.getElementById('accuracy').textContent = accuracy + '%';
  document.getElementById('lettersPerMinute').textContent = lettersPerMinute;
}

// Restart the game
function restartGame() {
  showStartScreen();
}

// Initialize the game when page loads
init();