# Job Switch 2027 — Study Tracker v3

Static HTML/CSS/JavaScript personal tracker for a Python + AI + Full-Stack job-switch plan.
**Zero secrets in source code. Offline-first with optional Google Drive backup.**

---

## Setup (5 minutes)

### 1. Copy environment template

```bash
cp .env.example .env
```

### 2. Add your Google OAuth Client ID (or skip for offline mode)

Edit `.env`:

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Get a client ID: https://console.cloud.google.com/apis/credentials

### 3. Build and run

```bash
npm install
npm start
```

Opens at `http://localhost:5500`

---

## Quick commands

| Command         | Does                         |
| --------------- | ---------------------------- |
| `npm run build` | Generate config.js from .env |
| `npm start`     | Build + run on port 5500     |
| `npm run dev`   | Same as start                |

---

## Features

✓ Configurable February 2027 target with live countdown  
✓ Course/topic preparation plan  
✓ Expected vs taken hours tracking  
✓ Study timer (start/stop)  
✓ Monthly calendar  
✓ Filtering by course/status/topic  
✓ **LocalStorage persistence** (works fully offline)  
✓ JSON export/import  
✓ **Optional Google Drive backup** (manual save/load)  
✓ Responsive mobile + desktop

---

## Production deployment

### Security ✅

- `.env` is in `.gitignore` — secrets never committed
- `config.js` is generated at build time, not in source
- App works fully offline if no client ID is set
- Google Drive features optional (graceful degradation)

### Deploy to a static host (Netlify, Vercel, GitHub Pages)

1. Set `GOOGLE_CLIENT_ID` as an environment variable in your host
2. Run `npm run build` during the build step
3. Deploy the folder (it's all static files + one generated config.js)
4. Update authorized origins in Google Cloud Console to match your domain

Example (Netlify):

```toml
[build]
  command = "npm run build"
  publish = "."
```

### No Node.js needed to run

Once `config.js` is generated, the app is 100% static HTML/CSS/JS.

---

## Google Drive optional backup

1. Enable Google Drive API in Google Cloud Console
2. Create a Web OAuth 2.0 Client ID
3. Add authorized origins:
   - `http://localhost:5500` (local)
   - `https://yourdomain.com` (production)
4. Paste client ID in `.env` and rebuild
5. Click "Connect" in the app Settings panel
6. Use "Save to Drive" / "Load from Drive" buttons as needed

The app stores **one JSON backup file** named `job-switch-tracker.json` in your Drive root.

⚠️ **Not real-time sync** — use Firebase/Firestore if you need live multi-device updates.

---

## Offline mode (no client ID)

Leave `GOOGLE_CLIENT_ID` empty in `.env`. The app works perfectly offline:

- All data stored in browser localStorage
- Can export/import JSON anytime
- Google Drive features disabled
