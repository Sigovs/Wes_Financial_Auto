# Exotics of Detroit — sell-your-car site

Static front end: plain HTML + CSS + vanilla JS, no build step.

**Live preview:** https://sigovs.github.io/Wes_Financial_Auto/

## Run locally

Serve the folder with any static server (needed for the video and the form `fetch`):

```
npx serve .
# or
python3 -m http.server
```

## Structure

```
index.html            the page
styles/tokens.css     design tokens: colours, type, spacing, radii, motion (single source of truth)
styles/utilities.css  base components (.btn, .input, .container, .reveal …)
styles/home3.css      page layout: nav, hero, sold rail, about, footer
styles/home4.css      additions on top of home3.css for this page (load order matters)
js/sold-data.js       sold vehicles list — the only file to edit when a car sells
js/home4.js           renders sold cards, offer form states, Instagram wall
js/home3.js           shared page behaviour (nav, rail, reveals) — must load AFTER home4.js
assets/               logo, hero, video, sold-car photos, Instagram feed
```

## To wire up before launch

- **Offer form** (`#offer` in `index.html`): it sends nothing until you set
  `data-endpoint="https://…"` on the `<form>`. It POSTs `FormData` and expects a 2xx JSON response.
- **Instagram wall**: these are static images in `assets/instagram/feed/`. Swap them for a live feed if needed.
- **Sold cars**: photos are placeholders until the client's real shots arrive. Data lives in `js/sold-data.js`.
- Social links in the footer point to the generic facebook.com / instagram.com — replace them with the real profile URLs.

## Rules

- Use only the tokens from `styles/tokens.css` (`var(--…)`); no raw hex/px values in the page styles.
- Dark theme only. Respect `prefers-reduced-motion` and keep the `:focus-visible` rings.
