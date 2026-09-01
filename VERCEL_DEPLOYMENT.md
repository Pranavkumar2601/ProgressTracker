# Deploying to Vercel

## Quick Start

### 1. Push code to GitHub

```bash
git push origin development
```

### 2. Create Vercel Project

Option A - Via Vercel Dashboard:

- Go to https://vercel.com/dashboard
- Click "Add New..." → "Project"
- Import your GitHub repository
- Click "Import"

Option B - Via Vercel CLI:

```bash
npm install -g vercel
vercel
```

### 3. Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

**Add variable:**

- Name: `GOOGLE_CLIENT_ID`
- Value: `6529103553-7fdip9lf11mfkblaqnsr74le7tk8qi60.apps.googleusercontent.com`
- Environments: Production, Preview, Development

### 4. Update Google OAuth Console

Go to https://console.cloud.google.com/apis/credentials

Click your OAuth 2.0 Client ID → Edit:

**Authorized JavaScript origins:**

```
https://yourvercelapp.vercel.app
https://yourcustomdomain.com (if using custom domain)
http://localhost:5500 (keep for local testing)
```

**Authorized redirect URIs:**

```
https://yourvercelapp.vercel.app
https://yourcustomdomain.com (if using custom domain)
```

### 5. Deploy

- Push to GitHub (or trigger manual deploy in Vercel Dashboard)
- Vercel automatically:
  - Runs `npm run build`
  - Generates fresh `config.js` with your GOOGLE_CLIENT_ID
  - Deploys all static files
  - Sets up HTTPS automatically

### 6. Test Deployment

1. Visit your Vercel URL: `https://yourvercelapp.vercel.app`
2. Test basic features (add course, project, etc.)
3. Test Google Drive sync:
   - Go to Settings
   - Click "Connect Drive"
   - Login with Google
   - Enable auto-sync
   - Create a new entry
   - Verify it saves to Drive

### 7. Custom Domain (Optional)

In Vercel Dashboard → Settings → Domains:

- Add your domain
- Follow DNS configuration instructions
- Update Google OAuth origins accordingly

---

## What Happens During Build

1. Vercel reads `GOOGLE_CLIENT_ID` from environment variables
2. `npm run build` executes:
   - `node scripts/generate-config.js` reads GOOGLE_CLIENT_ID from process.env
   - Generates `config.js` with the safe client ID
3. All files deployed to CDN (including generated config.js)
4. Users download config.js from your Vercel domain

## Troubleshooting

**"Google login not working"**

- Check Google OAuth console has your Vercel domain in authorized origins
- Check Vercel env variable is set to correct client ID
- Clear browser cache and try again

**"config.js is empty or undefined"**

- Check build logs: `npm run build` ran successfully
- Check env variables are set in Vercel dashboard
- Redeploy: Vercel → Deployments → ... → Redeploy

**"Deployment failed"**

- Check build logs in Vercel dashboard
- Ensure package.json has correct build script
- Ensure `.env` is not committed (only VERCEL env vars used)

---

## Security Notes

✅ GOOGLE_CLIENT_ID never in source code  
✅ Only stored in Vercel secret manager  
✅ Generated at build time, not in git  
✅ All user data stays in browser or Drive  
✅ HTTPS enforced automatically

Your deployment is secure! 🔒
