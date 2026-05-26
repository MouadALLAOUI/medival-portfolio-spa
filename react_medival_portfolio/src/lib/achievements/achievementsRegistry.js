/**
 * Achievements Registry
 *
 * To add a new achievement:
 * 1. Add one entry here
 * 2. Call unlockAchievement(id) anywhere in the app
 * 3. Done — it appears automatically everywhere
 *
 * Rarity tiers:
 * - common    — easy to get, most visitors will unlock
 * - uncommon  — requires some exploration
 * - rare      — requires specific actions
 * - epic      — requires dedication
 * - legendary — hidden, unexpected, very hard
 */

export const ACHIEVEMENTS = {

  // ── Explorer ─────────────────────────────────────────────────
  first_visit: {
    id: 'first_visit',
    title: 'First Steps into the Keep',
    titleMedievalEn: 'The Gates Have Opened',
    description: 'Visited the portfolio for the first time',
    descMedievalEn: 'Thou hast crossed the threshold of the enchanted keep',
    icon: '🏰',
    rarity: 'common',
    category: 'explorer',
    secret: false,
    xp: 10,
  },

  visited_blogs: {
    id: 'visited_blogs',
    title: 'The Scribe\'s Apprentice',
    titleMedievalEn: 'Seeker of the Written Word',
    description: 'Visited the blogs section',
    descMedievalEn: 'Thou hast entered the Chamber of Arcane Writings',
    icon: '📜',
    rarity: 'common',
    category: 'explorer',
    secret: false,
    xp: 15,
  },

  visited_crmef: {
    id: 'visited_crmef',
    title: 'The Academic Path',
    titleMedievalEn: 'Scholar of the Order',
    description: 'Visited the CRMEF portal',
    descMedievalEn: 'Thou hast studied within the halls of the Order',
    icon: '🎓',
    rarity: 'uncommon',
    category: 'explorer',
    secret: false,
    xp: 20,
  },

  visited_all_sections: {
    id: 'visited_all_sections',
    title: 'Grand Tour',
    titleMedievalEn: 'Wanderer of the Keep',
    description: 'Scrolled through all sections on the home page',
    descMedievalEn: 'Thou hast explored every chamber of the enchanted keep',
    icon: '🗺️',
    rarity: 'uncommon',
    category: 'explorer',
    secret: false,
    xp: 30,
  },

  visited_settings: {
    id: 'visited_settings',
    title: 'The Configurator',
    titleMedievalEn: 'Master of the Arcane Grimoire',
    description: 'Opened the settings page',
    descMedievalEn: 'Thou hast consulted the Arcane Settings Grimoire',
    icon: '⚙️',
    rarity: 'common',
    category: 'explorer',
    secret: false,
    xp: 10,
  },

  // ── Interaction ───────────────────────────────────────────────
  chatted_with_oracle: {
    id: 'chatted_with_oracle',
    title: 'The Oracle Speaks',
    titleMedievalEn: 'Communion with the Oracle',
    description: 'Sent a message to the AI chatbot',
    descMedievalEn: 'Thou hast consulted the mystical Oracle',
    icon: '🔮',
    rarity: 'common',
    category: 'interaction',
    secret: false,
    xp: 20,
  },

  sent_contact: {
    id: 'sent_contact',
    title: 'The Raven Dispatched',
    titleMedievalEn: 'A Raven Takes Flight',
    description: 'Sent a message through the contact form',
    descMedievalEn: 'Thou hast dispatched a raven bearing thy message',
    icon: '🐦⬛',
    rarity: 'uncommon',
    category: 'interaction',
    secret: false,
    xp: 40,
  },

  copied_code: {
    id: 'copied_code',
    title: 'Code Thief',
    titleMedievalEn: 'The Scroll Transcriber',
    description: 'Copied a code snippet from a blog post',
    descMedievalEn: 'Thou hast copied arcane inscriptions from the scrolls',
    icon: '📋',
    rarity: 'common',
    category: 'interaction',
    secret: false,
    xp: 15,
  },

  opened_pdf: {
    id: 'opened_pdf',
    title: 'The Archivist',
    titleMedievalEn: 'Keeper of the Ancient Scrolls',
    description: 'Opened a PDF document',
    descMedievalEn: 'Thou hast unfurled an ancient scroll',
    icon: '📄',
    rarity: 'common',
    category: 'interaction',
    secret: false,
    xp: 15,
  },

  viewed_image: {
    id: 'viewed_image',
    title: 'The Observer',
    titleMedievalEn: 'Gazer of Visions',
    description: 'Opened the image viewer',
    descMedievalEn: 'Thou hast gazed upon an arcane vision',
    icon: '🖼️',
    rarity: 'common',
    category: 'interaction',
    secret: false,
    xp: 10,
  },

  changed_theme: {
    id: 'changed_theme',
    title: 'The Shapeshifter',
    titleMedievalEn: 'Weaver of Illusions',
    description: 'Changed the app theme',
    descMedievalEn: 'Thou hast reshaped the very fabric of the keep',
    icon: '🎨',
    rarity: 'common',
    category: 'interaction',
    secret: false,
    xp: 10,
  },

  tried_all_themes: {
    id: 'tried_all_themes',
    title: 'The Chromancer',
    titleMedievalEn: 'Master of All Illusions',
    description: 'Tried all available themes',
    descMedievalEn: 'Thou hast mastered every form of the enchanted keep',
    icon: '✨',
    rarity: 'rare',
    category: 'interaction',
    secret: false,
    xp: 50,
  },

  // ── Reader ────────────────────────────────────────────────────
  read_blog_post: {
    id: 'read_blog_post',
    title: 'The Reader',
    titleMedievalEn: 'Student of the Scrolls',
    description: 'Read a blog post',
    descMedievalEn: 'Thou hast studied the arcane writings',
    icon: '📖',
    rarity: 'common',
    category: 'reader',
    secret: false,
    xp: 20,
  },

  read_5_blogs: {
    id: 'read_5_blogs',
    title: 'Bookworm',
    titleMedievalEn: 'The Devoted Scholar',
    description: 'Read 5 blog posts',
    descMedievalEn: 'Thou hast consumed 5 scrolls of arcane knowledge',
    icon: '📚',
    rarity: 'uncommon',
    category: 'reader',
    secret: false,
    xp: 60,
    requirement: { type: 'count', key: 'blogs_read', target: 5 },
  },

  // ── Secret / Hidden ───────────────────────────────────────────
  night_owl: {
    id: 'night_owl',
    title: 'Night Owl',
    titleMedievalEn: 'The Midnight Sorcerer',
    description: 'Visited between midnight and 4am',
    descMedievalEn: 'Thou hast wandered the keep in the darkest hour',
    icon: '🦉',
    rarity: 'rare',
    category: 'secret',
    secret: true,
    xp: 50,
  },

  konami_code: {
    id: 'konami_code',
    title: 'Cheat Code Activated',
    titleMedievalEn: 'The Ancient Sequence',
    description: 'Entered the Konami code',
    descMedievalEn: 'Thou hast spoken the ancient sequence of power',
    icon: '🎮',
    rarity: 'epic',
    category: 'secret',
    secret: true,
    xp: 100,
  },

  idle_wanderer: {
    id: 'idle_wanderer',
    title: 'The Wanderer',
    titleMedievalEn: 'Lost in the Keep',
    description: 'Stayed on the page for over 5 minutes',
    descMedievalEn: 'Thou hast lingered within the keep for an age',
    icon: '⏳',
    rarity: 'uncommon',
    category: 'secret',
    secret: true,
    xp: 30,
  },

  rapid_clicker: {
    id: 'rapid_clicker',
    title: 'Trigger Happy',
    titleMedievalEn: 'The Frenzied Warrior',
    description: 'Clicked something 10 times rapidly',
    descMedievalEn: 'Thou hast struck with unrestrained fury',
    icon: '⚡',
    rarity: 'rare',
    category: 'secret',
    secret: true,
    xp: 40,
  },

  // ── Loyalty ───────────────────────────────────────────────────
  returning_visitor: {
    id: 'returning_visitor',
    title: 'Returning Knight',
    titleMedievalEn: 'The Loyal Knight',
    description: 'Visited the portfolio a second time',
    descMedievalEn: 'Thou hast returned to the enchanted keep once more',
    icon: '🛡️',
    rarity: 'uncommon',
    category: 'loyalty',
    secret: false,
    xp: 25,
  },

  five_visits: {
    id: 'five_visits',
    title: 'Regular',
    titleMedievalEn: 'Champion of the Keep',
    description: 'Visited the portfolio 5 times',
    descMedievalEn: 'Thou art a true champion of this enchanted domain',
    icon: '👑',
    rarity: 'epic',
    category: 'loyalty',
    secret: false,
    xp: 100,
    requirement: { type: 'count', key: 'visit_count', target: 5 },
  },

};

export const ACHIEVEMENT_CATEGORIES = {
  explorer: { label: 'Explorer', icon: '🗺️' },
  interaction: { label: 'Interaction', icon: '⚡' },
  reader: { label: 'Reader', icon: '📖' },
  secret: { label: 'Secret', icon: '🔮' },
  loyalty: { label: 'Loyalty', icon: '🛡️' },
};

export const RARITY_CONFIG = {
  common:    { label: 'Common',    color: '#94a3b8', glow: 'rgba(148,163,184,0.4)' },
  uncommon:  { label: 'Uncommon',  color: '#4ade80', glow: 'rgba(74,222,128,0.4)' },
  rare:      { label: 'Rare',      color: '#60a5fa', glow: 'rgba(96,165,250,0.4)' },
  epic:      { label: 'Epic',      color: '#c084fc', glow: 'rgba(192,132,252,0.4)' },
  legendary: { label: 'Legendary', color: '#fbbf24', glow: 'rgba(251,191,36,0.5)' },
};
