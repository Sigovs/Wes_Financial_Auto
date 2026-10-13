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
index.html            home — sell your car
about.html            about + contact form
how-it-works.html     full process, selling options, documents, FAQ
styles/tokens.css     design tokens: colours, type, spacing, radii, motion (single source of truth)
styles/utilities.css  base components (.btn, .input, .container, .reveal …)
styles/home3.css      page layout: nav, hero, sold rail, about, footer
styles/home4.css      additions on top of home3.css (load order matters)
styles/about.css      About page (hero/story/values) — also loaded by how-it-works.html
styles/how.css        How it works page only, loads after about.css
js/sold-data.js       sold vehicles list — the only file to edit when a car sells
js/home4.js           renders sold cards, offer form states, Instagram wall
js/home3.js           shared page behaviour (nav, rail, reveals) — must load AFTER home4.js
js/about.js           About contact form states
js/how.js             How it works — sticky step index highlights the step in view
js/smooth.js          Lenis smooth scroll (off under prefers-reduced-motion)
js/video.js           background-video pause/play control; desktop-only clips on About / How
assets/               logo, hero, video, sold-car photos, Instagram feed
```

## To wire up before launch

- **Forms** — offer form (`#offer` in `index.html`) and contact form (`#contact` in `about.html`):
  they send nothing until you set `data-endpoint="https://…"` on the `<form>`. They POST `FormData`
  and expect a 2xx JSON response.
- **Copy & contacts are placeholders**: About and How it works text, `hello@exoticsofdetroit.com` and the
  `@exoticsofdetroit` handle are mockup values — replace with the client's real ones.
- **Lenis** loads from unpkg (lenis@1.3.26). Vendor it into the project for production; if the CDN fails the site simply scrolls natively.
- **Instagram wall**: these are static images in `assets/instagram/feed/`. Swap them for a live feed if needed.
- **AI imagery**: `assets/img/how/direct-sale.jpg`, `consignment.jpg` and the About hero are AI-generated mood images — swap for real photography if required.
- **Sold cars**: photos are placeholders until the client's real shots arrive. Data lives in `js/sold-data.js`.
- Social links in the footer point to the generic facebook.com / instagram.com — replace them with the real profile URLs.

## Rules

- Use only the tokens from `styles/tokens.css` (`var(--…)`); no raw hex/px values in the page styles.
- Dark theme only. Respect `prefers-reduced-motion` and keep the `:focus-visible` rings.
