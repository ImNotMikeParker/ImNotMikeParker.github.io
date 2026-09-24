# michaelparker.dev (portfolio site)

Static one-page portfolio: about, projects, experience, skills, and a downloadable resume PDF.
No build step. Plain HTML, CSS, and a small JS file for the project cards.

## Files

- `index.html` – page content (about, experience, skills)
- `projects.js` – project list; edit the array at the top to add or change cards
- `style.css` – theme tokens, light/dark mode, layout
- `Michael_Parker_Resume.pdf` – served as the download link; replace when the resume changes
- `.github/workflows/deploy.yml` – deploys to GitHub Pages on push to `main`

## Run locally

Any static server works. With Node installed:

```bash
npx --yes serve -l 4173 .
```

Then open http://localhost:4173.

## Deploy to GitHub Pages

1. Create a GitHub repo (for `https://USERNAME.github.io`, name the repo `USERNAME.github.io`).
2. Push this folder to the `main` branch.
3. In the repo: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. The workflow runs on the next push and publishes the site.

For a custom domain, add a `CNAME` file containing the domain and point DNS at GitHub Pages.

## Before publishing

- Add a `repo` URL to the StashLog entry in `projects.js` if the repo goes public.
- Decide whether to add a phone number. It is intentionally left off the public page.
