# WebExcels DRM

Full-stack Vite + Express app with AI assistant.

## Local Development

1. Install dependencies

```powershell
npm ci
```

2. Start dev server (Linux/macOS). On Windows, set `NODE_ENV` before running.

```powershell
# Windows PowerShell
$env:NODE_ENV = "development"; npm run dev
```

App runs at http://localhost:5000.

## Build

```powershell
npm run build
```

- Client output: `dist/public`
- Server bundle: `dist/index.js`

## Start (production)

```powershell
npm start
```

## Deploy on Render

This repo includes `render.yaml` for a single Node Web Service.

- Build Command: `npm ci && npm run build`
- Start Command: `npm start`
- Port: Render provides `PORT`; server uses it automatically.

Required environment variables (set in Render Dashboard):
- `OPENAI_API_KEY` (or `AI_INTEGRATIONS_OPENAI_API_KEY`)
- Optionally `OPENAI_BASE_URL` if using a proxy/base URL

## Git Push to GitHub

```powershell
git init
git remote add origin https://github.com/Excels-Tech/WebExcelsDRM.git
git add -A
git commit -m "feat: render deploy setup, cleanup, ai env fallback"
# push main or create a feature branch if repo already has history
git branch -M main
git push -u origin main
```

If the remote already has content you want to keep, push a feature branch:

```powershell
git checkout -b deploy/render-setup
git push -u origin deploy/render-setup
```
