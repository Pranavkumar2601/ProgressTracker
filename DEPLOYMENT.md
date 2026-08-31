## Production Deployment Checklist

### Before deploying to production

- [ ] **Never commit `.env`** — it's in `.gitignore`, keep it that way
- [ ] **Never commit generated `config.js`** — it's in `.gitignore`, regenerate at build time
- [ ] **Never hardcode `GOOGLE_CLIENT_ID` in source** — use environment variable only
- [ ] Set `GOOGLE_CLIENT_ID` as a secret in your deployment platform:
  - **Netlify**: Site settings → Build & deploy → Environment
  - **Vercel**: Project settings → Environment variables
  - **GitHub Pages**: Not supported (static only); use local build + manual deploy
  - **AWS S3 + CloudFront**: Build locally or in CI/CD, upload to S3

### Deployment steps

1. **Local build and test**

   ```bash
   npm install
   npm run build
   npm start
   # Test at http://localhost:5500
   ```

2. **Commit to git** (`.env` and `config.js` are automatically ignored)

   ```bash
   git add .
   git commit -m "Production release"
   ```

3. **Deploy**
   - Push to your deployment platform
   - Platform runs: `npm run build` (generates fresh config.js)
   - Platform serves all static files including generated config.js

4. **Configure OAuth**
   - Go to https://console.cloud.google.com/apis/credentials
   - Edit your OAuth 2.0 Client ID
   - Add authorized origin: `https://yourdomain.com`
   - (Keep `http://localhost:5500` for local testing)

### What stays secure

✓ GOOGLE_CLIENT_ID never in source code  
✓ config.js never in git (generated at build time)  
✓ .env file never in git  
✓ App gracefully degrades if no client ID (works offline)  
✓ All data stored locally unless user clicks "Save to Drive"

### What to monitor

- Check deployment logs to confirm `npm run build` succeeded
- Verify config.js contains your client ID (not empty)
- Test Google Drive login flow in your deployed environment
- Monitor browser console for any hardcoded-secret warnings

---

**This setup is security-hardened and production-ready.** No secrets leak.
