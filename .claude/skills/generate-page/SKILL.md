---
name: generate-page
description: Build a new page or major section (home, inventory/SRP, vehicle/VDP, financing, about) for this dealership site using the project's token system and design principles. Use whenever the user asks to build, create, make, or generate a page, screen, section, or layout. Produces real HTML/CSS on the design system — never raw hardcoded values.
---

# Generate page

Build pages on the existing system. Output is real, responsive HTML/CSS.

## Before writing anything

1. Load `design-principles` (the taste — image-led, cinematic, anti-default).
2. Read `styles/tokens.css` and `styles/utilities.css` (the spec). Reuse existing classes
   (`.btn`, `.card`, `.badge`, `.input`, `.nav`, `.sec-head`, `.eyebrow`, `.reveal`, grids)
   before inventing anything.
3. Match the patterns in `design/preview.html`.

## Hard constraints

- **Tokens only.** No raw hex, px, or off-scale spacing. Use `var(--*)` or Tailwind tokens.
- Every section: `padding-block: var(--section-y)`, wrapped in `.container`.
- One primary (red `--accent`) action per section — the price or the main CTA, not both.
- Dark theme; build depth by stepping up surfaces, not heavy shadows.
- Sentence case, verb-first buttons ("Get financing", "View details").

## Apply the taste (not just the tokens)

- Lead the hero with a full-bleed photo or muted video loop + dark scrim + ken-burns —
  never centered text on a flat color.
- Give every major section a visual anchor and real depth.
- Add slow scroll reveals (`.reveal` + IntersectionObserver) and image hover-zoom.
- Give the page one signature moment.
- Real stock car photos (placeholders now); FAL only for ambient/texture, never cars.

## Quality floor

Responsive to mobile, `:focus-visible` rings, `prefers-reduced-motion`, semantic HTML,
alt text, lazy-load below the fold.

## After building

Run the `design-review` checklist on your own output and fix any base-look drift before
presenting. If a needed value isn't in the tokens, add it to `tokens.css` (and
`design/tokens.json`) first — never inline it.

## Motion — CSS first, GSAP for scroll storytelling

Two tiers. Default to Tier 1; only add Tier 2 for a genuine scroll-driven moment.

**Tier 1 — CSS (default, zero dependencies).** Covers most pages:
- Scroll reveals via `.reveal` + an IntersectionObserver that adds `.in` (soft fade/slide up).
- Hover lift + image-zoom inside the frame (`.card-hover` already does this).
- Slow ken-burns on hero stills.
Reach no further than this unless the page needs real scroll storytelling.

**Tier 2 — GSAP + ScrollTrigger (only for scroll storytelling).** Use for section pinning,
a horizontal inventory rail, scrub-on-progress, staggered reveals, parallax, SplitText.
Load via CDN (jsdelivr):
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

**GSAP rules:**
- `gsap.registerPlugin(ScrollTrigger)` once, up front.
- Eases `power3.out` / `power2.inOut`; duration 0.8–1.4s; weighted, never bouncy.
- For scrubbed timelines use `ease:'none'` + `scrub:true`.
- **Always gate behind `prefers-reduced-motion`:** if the user prefers reduced motion, skip
  the animation entirely and leave content in its final, visible state (never hidden).
  ```js
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { /* GSAP here */ }
  ```
- Animate `transform` / `opacity` only — never `top/left/width` (layout thrash).
- One GSAP signature moment per page; keep everything else Tier 1.
- If the official GreenSock skill is installed, follow it for syntax.

## Layout templates

Compose sections on the 12-column grid (`.grid12` + `.col-span-*` / `.col-start-*`). Use
`.full-bleed` for hero and CTA bands, and the `.type-*` classes for headings and copy —
never inline font sizes. Asymmetry is the house move; avoid dead-centre symmetric layouts.

- **Hero off-centre:** `.full-bleed` photo/video + scrim as the band; over it a `.grid12`
  with content `.col-span-6` and image/overlay `.col-span-7` allowed to overlap. Text sits
  left of centre, imagery carries the right.
- **Split:** content `.col-span-5` / image `.col-span-6 .col-start-7`. Reverse for variety
  (image `.col-span-6` / content `.col-span-5 .col-start-8`).
- **Editorial:** story `.col-span-7 .col-start-3` with a narrow `.col-span-3` aside for
  meta, pull-quote, or spec.
- **Collection wall:** three `.col-span-4` cards; give the middle one `.row-offset` so the
  row breaks the flat line.
- **Full-bleed CTA:** `.full-bleed .bleed-dark` (or `.bleed-inset`) band, content in a
  `.grid12` as `.col-span-8 .col-start-3`, one primary action.
- **Contact:** intro `.col-span-5` + form panel `.col-span-6 .col-start-7`.

Headings use `.type-display-*` / `.type-h*`; lead and body use `.type-lead` /
`.type-body*`; eyebrows use `.type-eyebrow`; mono meta uses `.type-caption`.

## Page recipes

- **Home:** hero (video/photo slider) → featured inventory (`.card` grid) → financing CTA → Instagram grid → about → footer.
- **Inventory / SRP:** visual filter bar (`.input`/`.select`) → `.card` grid → cards link to vehicle page.
- **Vehicle / VDP:** gallery → title → price in `--accent` → spec table on surface/text tokens → financing (primary) + inquire (secondary).
- **Financing:** pre-approval form (`.card`, `.field`, `.input`, `.label`, primary submit) → trust badges (`.badge-success`/`.badge-highlight`).
