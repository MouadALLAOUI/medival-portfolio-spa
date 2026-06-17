# Text Administration App — Future Implementation

## Concept
A separate mini-app that manages all translatable strings for the portfolio. Edit text once, it updates everywhere — no more editing 5+ locale files per change.

---

## Architecture

```
┌─────────────────────┐       HTTP (localhost:3001)       ┌──────────────────────┐
│   Admin App         │ ──────────────────────────────►   │   Main Portfolio     │
│   (port 3001)       │ ◄──────────────────────────────   │   (Vite dev / build) │
│                     │   GET  /api/translations          │                      │
│  ┌─────────────┐    │   PUT  /api/translations/:id     │  ┌────────────────┐  │
│  │  Admin UI   │    │                                    │  │  i18n fetcher  │  │
│  │  (CRUD)     │    │                                    │  │  replaces      │  │
│  └──────┬──────┘    │                                    │  │  static import │  │
│         │           │                                    │  └────────────────┘  │
│  ┌──────▼──────┐    │                                    └──────────────────────┘
│  │  Express API│    │
│  │  + SQLite   │    │
│  └─────────────┘    │
└─────────────────────┘
```

---

## Backend (Admin App)

### Stack
- **Runtime:** Node.js
- **Framework:** Express (lightweight)
- **Database:** SQLite via `better-sqlite3`
- **Auth:** Simple token or basic password (optional, for local use)

### DB Schema
```sql
CREATE TABLE translations (
  id        TEXT PRIMARY KEY,          -- e.g. "DATA.msp.introduction"
  en        TEXT NOT NULL DEFAULT '',
  fr        TEXT NOT NULL DEFAULT '',
  ar        TEXT NOT NULL DEFAULT '',
  medieval_en TEXT NOT NULL DEFAULT '',
  medieval_fr TEXT NOT NULL DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/translations` | Returns all translation entries |
| `GET` | `/api/translations?section=msp` | Filter by section prefix |
| `PUT` | `/api/translations/:id` | Update one entry's locale values |
| `POST` | `/api/translations/seed` | Seed DB from existing locale files |

### Admin UI
A single-page HTML/JS admin interface with:
- Table listing all keys with EN preview
- Click to expand inline editor with all 5 locale fields
- "Save" button updates DB via `PUT`
- Search/filter by key or section

---

## Integration (Main Portfolio)

### Replace static import with dynamic fetch

**Before** (`src/strings/translations.jsx`):
```js
import { EN } from './EN/en';
import { FR } from './FR/fr';
// ...
const translations = { en: EN, fr: FR, ... };
```

**After**:
```js
let translations = {};

export async function loadTranslations() {
  try {
    const res = await fetch('http://localhost:3001/api/translations');
    const data = await res.json();
    // data = { "DATA.msp.introduction": { en: "...", fr: "...", ... }, ... }
    translations = buildLookup(data);
  } catch {
    // Fallback to bundled static translations for production
    translations = await import('./fallback');
  }
}

loadTranslations();
```

### Build step for production
- At build time, fetch from the admin API and inline the translations into the bundle
- Or keep the static `.jsx` files as a fallback and only use the API in dev mode

---

## Project Structure

```
portfolio-admin/
├── package.json
├── src/
│   ├── index.js              # Express entry
│   ├── db.js                 # SQLite init + queries
│   ├── routes/
│   │   └── translations.js   # CRUD routes
│   └── public/
│       └── index.html        # Admin UI (or SPA build)
└── seed.js                   # One-time script to import existing locale files into DB
```

---

## Implementation Steps

1. **Scaffold** — `npm init`, install `express`, `better-sqlite3`, `cors`
2. **DB** — Create schema, write query helpers
3. **Seed script** — Read all `src/strings/*/data/*.jsx` from the portfolio, extract values, insert into DB
4. **API** — `GET /api/translations`, `PUT /api/translations/:id`
5. **Admin UI** — Single HTML page with table + inline editor
6. **Portfolio integration** — Replace `translations.jsx` with dynamic fetcher + fallback
7. **Production** — Wire up build so API is called at build time or fallback to bundled files

---

## Notes
- Keep the admin app in a separate repo or a `tools/` folder in this repo
- Run `node seed.js` once when setting up, or whenever the schema changes
- The portfolio should work fine without the admin app running (falls back to static files)
- No hot-reload needed — the portfolio fetches fresh translations on page load (or build time)
