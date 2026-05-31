/**
 * Keyboard layout definitions for the Falling Letters game.
 *
 * Each layout defines:
 *   - id: unique key
 *   - label: display name
 *   - lang: 'latin' | 'arabic'
 *   - alphabet: the ordered set of characters shown as falling letters
 *   - vowels: subset of alphabet considered vowels (for preset buttons)
 *   - keyMap: physical-key → displayed-character mapping
 *             When the user presses a physical key, we look up what character
 *             that key produces in this layout and match it against falling letters.
 *             (Only needed for keys that differ from their label, e.g. AZERTY Q→A)
 */

// ─── LATIN LAYOUTS ───────────────────────────────────────────────────────────

/** Standard QWERTY – physical key label == character */
export const LAYOUT_QWERTY = {
  id: "qwerty",
  label: "QWERTY",
  lang: "latin",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  vowels: ["A", "E", "I", "O", "U"],
  // identity – key.toUpperCase() already gives the right character
  keyMap: null,
};

/**
 * AZERTY – French keyboard layout.
 * The physical keys Q/W/A/Z/M are in different positions.
 * We map physical key.toUpperCase() → AZERTY character.
 *
 * Notable differences (physical QWERTY key → what AZERTY types):
 *   Q → A   W → Z   A → Q   Z → W   M → ,  (we ignore punctuation)
 *
 * For our game we only care about A-Z characters, so we only remap the
 * keys that produce a different letter.
 */
export const LAYOUT_AZERTY = {
  id: "azerty",
  label: "AZERTY",
  lang: "latin",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  vowels: ["A", "E", "I", "O", "U"],
  /**
   * keyMap: { physicalKey (uppercase) → gameCharacter (uppercase) }
   * physicalKey is e.key.toUpperCase() as the browser reports it.
   * On an AZERTY keyboard the browser already reports the correct character,
   * but on a QWERTY physical keyboard with AZERTY OS layout, e.key gives
   * the AZERTY character. So this map handles software AZERTY layouts.
   */
  keyMap: {
    // These keys swap in AZERTY vs QWERTY
    Q: "A",   // Physical Q position → A
    W: "Z",   // Physical W position → Z
    A: "Q",   // Physical A position → Q
    Z: "W",   // Physical Z position → W
  },
};

// ─── ARABIC LAYOUTS ──────────────────────────────────────────────────────────

/**
 * Arabic letters ordered by keyboard position (standard Arabic keyboard).
 * We present all 28 Arabic letters as the "alphabet" for the game.
 */
const ARABIC_ALPHABET = [
  "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
  "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط",
  "ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز",
];

const ARABIC_VOWELS = ["ا", "و", "ي", "ى", "ئ", "ؤ", "ء"];

/**
 * Arabic QWERTY layout.
 * On a standard Arabic-QWERTY OS layout the browser's e.key already
 * returns the Arabic character when the user types. We map each Arabic
 * character to the physical QWERTY key that produces it.
 *
 * Format: physicalQWERTY_key → Arabic character
 */
export const LAYOUT_ARABIC_QWERTY = {
  id: "arabic-qwerty",
  label: "Arabic QWERTY",
  lang: "arabic",
  alphabet: ARABIC_ALPHABET,
  vowels: ARABIC_VOWELS,
  /**
   * When the OS is set to Arabic (QWERTY), pressing 'Q' produces 'ض', etc.
   * We detect the physical key via e.code and map to the Arabic character.
   * Key: e.code value (e.g. "KeyQ") → Arabic character
   */
  codeMap: {
    KeyQ: "ض", KeyW: "ص", KeyE: "ث", KeyR: "ق", KeyT: "ف",
    KeyY: "غ", KeyU: "ع", KeyI: "ه", KeyO: "خ", KeyP: "ح",
    BracketLeft: "ج", BracketRight: "د",
    KeyA: "ش", KeyS: "س", KeyD: "ي", KeyF: "ب", KeyG: "ل",
    KeyH: "ا", KeyJ: "ت", KeyK: "ن", KeyL: "م",
    Semicolon: "ك", Quote: "ط",
    KeyZ: "ئ", KeyX: "ء", KeyC: "ؤ", KeyV: "ر",
    KeyB: "لا", KeyN: "ى", KeyM: "ة",
    Comma: "و", Period: "ز",
  },
};

/**
 * Arabic AZERTY layout (French-Arabic keyboard, common in Morocco/Algeria).
 * On an Arabic-AZERTY OS layout the physical keys are in AZERTY positions
 * but produce Arabic characters.
 * Key: e.code value → Arabic character
 */
export const LAYOUT_ARABIC_AZERTY = {
  id: "arabic-azerty",
  label: "Arabic AZERTY",
  lang: "arabic",
  alphabet: ARABIC_ALPHABET,
  vowels: ARABIC_VOWELS,
  /**
   * Mapping for Arabic-AZERTY (Moroccan/Algerian standard):
   * AZERTY positions: Q→A W→Z A→Q Z→W on the physical keyboard
   * Combined with Arabic character assignments
   */
  codeMap: {
    // Row 1 (AZERTY top row: A Z E R T Y U I O P)
    KeyA: "ض", KeyZ: "ص", KeyE: "ث", KeyR: "ق", KeyT: "ف",
    KeyY: "غ", KeyU: "ع", KeyI: "ه", KeyO: "خ", KeyP: "ح",
    BracketLeft: "ج", BracketRight: "د",
    // Row 2 (AZERTY home row: Q S D F G H J K L M)
    KeyQ: "ش", KeyS: "س", KeyD: "ي", KeyF: "ب", KeyG: "ل",
    KeyH: "ا", KeyJ: "ت", KeyK: "ن", KeyL: "م",
    Semicolon: "ك", Quote: "ط",
    // Row 3 (AZERTY bottom row: W X C V B N)
    KeyW: "ئ", KeyX: "ء", KeyC: "ؤ", KeyV: "ر",
    KeyB: "لا", KeyN: "ى", KeyM: "ة",
    Comma: "و", Period: "ز",
  },
};

// ─── All layouts in display order ────────────────────────────────────────────

export const ALL_LAYOUTS = [
  LAYOUT_QWERTY,
  LAYOUT_AZERTY,
  LAYOUT_ARABIC_QWERTY,
  LAYOUT_ARABIC_AZERTY,
];

export const LAYOUT_MAP = Object.fromEntries(ALL_LAYOUTS.map((l) => [l.id, l]));

/**
 * Resolve the game character for a keyboard event given a layout.
 *
 * Returns the character string (possibly Arabic) that was "typed",
 * or null if the key is not a recognised game character.
 *
 * @param {KeyboardEvent} e
 * @param {object} layout  — one of the layout objects above
 * @returns {string|null}
 */
export function resolveKey(e, layout) {
  if (layout.lang === "arabic") {
    const map = layout.codeMap || {};
    return map[e.code] || null;
  }

  // Latin layouts
  const raw = e.key.toUpperCase();
  if (!/^[A-Z]$/.test(raw)) return null;

  if (layout.keyMap) {
    return layout.keyMap[raw] || raw;
  }
  return raw;
}
