# Deployment Guide

Step-by-step instructions for deploying the Medieval Portfolio.

## Prerequisites

- Node.js 20+
- npm 9+
- Git
- A hosting account (Netlify or Vercel)

---

## Netlify Deployment

### Option 1: Git Integration (Recommended)

1. Push your repository to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com)
3. Click **"Add new site"** > **"Import an existing project"**
4. Select your Git provider and repository
5. Netlify auto-detects the build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20
6. Click **"Deploy site"**

The site deploys automatically on every push to `main`.

### Option 2: Manual Deploy

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables (Netlify)

1. Go to **Site settings** > **Environment variables**
2. Add the following:

| Variable | Value |
|---|---|
| `VITE_APP_ENV` | `prod` |
| `VITE_CONTACT_EMAIL` | `your-email@example.com` |
| `VITE_API_URL` | Your backend API URL |
| `VITE_BACKEND_URL` | Your backend URL |
| `VITE_API_KEY` | Your API key |

### Netlify Configuration

The `netlify.toml` file configures:
- SPA fallback (all routes → `index.html`)
- Cache headers for static assets (1 year immutable)
- Must-revalidate for `index.html` and `sw.js`

---

## Vercel Deployment

### Option 1: Git Integration

1. Push your repository to GitHub
2. Log in to [Vercel](https://vercel.com)
3. Click **"Add new project"**
4. Import your repository
5. Vercel auto-detects the framework (Vite):
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
6. Click **"Deploy"**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (first time - creates project)
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Vercel)

1. Go to **Project Settings** > **Environment Variables**
2. Add the same variables as listed in the Netlify section above

### SPA Routing (Vercel)

Vercel needs a rewrite rule for client-side routing. Create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Custom Domain

### Netlify
1. Go to **Site settings** > **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain and follow DNS instructions

### Vercel
1. Go to **Project Settings** > **Domains**
2. Enter your domain and follow DNS instructions

---

## Post-Deployment Checklist

- [ ] Verify all routes work (especially client-side routes like `/blogs`, `/projects`)
- [ ] Test the contact form
- [ ] Check that environment variables are loaded (open DevTools > Console)
- [ ] Verify service worker registers (Application tab in DevTools)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit for performance/accessibility
- [ ] Verify RSS feed at `/rss.xml`
- [ ] Verify sitemap at `/sitemap.xml`

---

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common deployment issues.
