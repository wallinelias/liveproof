# Deploy LiveProof (free, static, no accounts in the app)

The app is a static site. The router is HashRouter, so links like `https://your-site/#/company`
work on any host with no rewrite rules. `vite.config.ts` uses `base: './'`, so assets load from any path.

## Easiest: Netlify Drop (no Git, about 2 minutes)
1. In the project folder run: `npm install` then `npm run build`. This creates the `dist` folder.
2. Open https://app.netlify.com/drop and sign up free (email or GitHub).
3. Drag the whole `dist` folder onto the page.
4. Netlify gives you a URL like `https://random-name.netlify.app`. Open it on your phone and test the full demo.
5. Optional: Site settings > Change site name, to get a nicer URL.
6. To update: run `npm run build` again, then drag `dist` onto the site's Deploys page.

Put the URL in SUBMISSION.md as the demo link.

## Alternative: Vercel (needs a GitHub repo)
1. Push this repo to GitHub (public, so judges can see the source link too).
2. Go to https://vercel.com, sign up with GitHub, click Add New > Project, import the repo.
3. Settings are auto-detected (Vite). Build command `npm run build`, output directory `dist`. Click Deploy.
4. Every push to `main` redeploys.

## Before you share the link
- Open it in a private window and on your phone. Join with `ESPOO-TALENT-NIGHT`.
- Press "Reset demo" in the header before recording the video.
- Do not put any secrets in the project. There are none.
