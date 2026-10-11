# Alex Bony: portfolio

A static portfolio site: plain HTML, CSS and JavaScript. No build step, no dependencies.

```
.
├── index.html        # all content lives here
├── css/style.css     # design tokens, layout, dark mode
├── js/main.js        # rack selector, mobile menu, skills marquee
├── images/           # favicon (GB, black on white), app icons, social preview
├── vercel.json       # security headers + caching
└── robots.txt
```

## Edit your links

Open `index.html`, search for `EDIT HERE`, and replace the three `href` values
and the visible handle text for GitHub, Substack and LinkedIn.

## Other things you may want to change

- **Skills:** the two scrolling rows live under `id="skills"` in `index.html`.
  Delete anything you'd rather not list.
- **Social preview:** after your first deploy, change `og:image` in the `<head>`
  to the full URL, e.g. `https://your-site.vercel.app/images/og-image.png`.
- **Colours:** every colour is a variable at the top of `css/style.css`.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Push to GitHub

Git commits carry an email address, and GitHub shows it publicly. To keep your real
email private, turn on "Keep my email addresses private" in GitHub > Settings > Emails,
then use the `@users.noreply.github.com` address it gives you:

```bash
git init
git config user.name "Alex Bony"
git config user.email "YOUR-ID+YOUR-USERNAME@users.noreply.github.com"
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Deploy on Vercel (free Hobby tier)

1. Go to vercel.com and sign in with GitHub.
2. **Add New > Project**, pick this repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
4. Deploy. Every push to `main` redeploys automatically.

## Privacy note

There is deliberately no email address, contact form or `mailto:` link anywhere on the
site, so there is nothing for scrapers to harvest.
