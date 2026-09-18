# Alex Bony — Portfolio

A static, dependency-free portfolio site. No build step, no framework, no npm install. Just open `index.html`.

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── favicon.jpg          ← your icon (original)
│   ├── favicon-32.png
│   ├── favicon-192.png
│   └── apple-touch-icon.png
├── vercel.json
├── .gitignore
└── README.md
```

## Three things to edit

### 1. Your photo — `index.html`, **line 56**

```html
<img class="portrait__img" id="portrait" src="./images/mypicture.jpg" alt="Portrait of Alex Bony" width="360" height="360">
```

Drop your photo into `images/` and make the `src` match the filename exactly, including the extension. If your file is `mypicture.png`, change `.jpg` to `.png`.

Until the file exists, the circle shows your initials instead of a broken image, so the page never looks unfinished. Square photos crop best; anything else is centre-cropped to a circle.

### 2. Your links — `index.html`, **lines 305 and 312**

Replace the two placeholder URLs with your real profiles. The visible handle text sits just below each one, on **lines 308 and 315** — update those to match.

```html
<a class="link" href="https://github.com/your-username" ...>
<a class="link" href="https://www.linkedin.com/in/your-profile" ...>
```

### 3. Your dates — `index.html`, the `<!-- STACK -->` section

The year ranges in the timeline (2017 through now) are estimates based on a nine-year career. Search for `layer__when` and adjust each one to your real dates.

There is deliberately no email address anywhere on the page — no `mailto:`, no plain-text address, nothing for a scraper to find.

## Run it locally

Open `index.html` in a browser, or serve it if you prefer real paths:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Vercel (free tier)

### Push to GitHub first

```bash
cd alex-bony-portfolio
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Then connect it

1. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
2. Framework preset: **Other**.
3. Build command: leave **empty**.
4. Output directory: leave **empty** (the repo root is the site).
5. Deploy.

Every push to `main` redeploys automatically. Pull requests get their own preview URL.

### Custom domain

Project → Settings → Domains → add your domain, then point the DNS records Vercel gives you. Free on the hobby tier, HTTPS included.

## Notes

- Fonts load from Google Fonts (Bricolage Grotesque and Newsreader). To go fully self-hosted, download the `.woff2` files into a `fonts/` folder, add `@font-face` rules to `styles.css`, and remove the `<link>` tags from `index.html`.
- Colours live as CSS custom properties at the top of `styles.css`. Change `--signal` to re-accent the whole site in one edit.
- Motion respects `prefers-reduced-motion`, focus states are visible for keyboard users, and the layout holds down to small phones.
