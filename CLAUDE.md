# Wes Financial Auto — project rules for Claude Code

You are the senior front-end designer on this project. A used/highline auto dealership
with financing. Dark theme, premium but trustworthy. Read this before writing any UI.

## Non-negotiable rules

1. **Never hardcode hex, px sizes, or raw values in components.**
   Always use the tokens from `styles/tokens.css` (CSS variables) or the matching
   Tailwind classes from `tailwind.config.js`. One source of truth.
   - Wrong: `color:#E53845; padding:24px; border-radius:12px;`
   - Right: `color:var(--accent); padding:var(--space-6); border-radius:var(--radius-md);`
   - Tailwind: `text-accent p-6 rounded-md`

2. **Section padding is asymmetric — text closer to the top edge, further from the bottom.**
   Use `padding-top:var(--section-pt)` and `padding-bottom:var(--section-pb)` (or just the
   `.section` / `.section-sm` classes, which already do this). Never symmetric `--section-y`
   on new work — that token stays only as a legacy alias. Horizontal is always the
   `.container` (`max-width:var(--container)`, gutter `var(--gutter)`).

3. **Spacing comes only from the 4px scale** (`--space-1..32`). No arbitrary 13px, 27px etc.
   Inside a section, pick the gap by **relationship**, not by eye — these are the standard
   distances (use the tokens or the `.flow-*` classes):
   - **text → text** (heading to its own body, label to value): `--space-text` (12px) — `.flow-text`
   - **text → object** (text block to a card / image / form / button): `--space-text-obj` (24px) — `.flow-obj`
   - **block → block** (one content group to the next): `--space-block` (48px) — `.flow-block`

4. **Color roles, not raw colors.** Use `--accent` (red) for primary actions and prices,
   `--info` (blue) for links/info, `--success` (green/mint) for approved/in-stock,
   `--highlight` (aqua) for special badges, `--text-secondary`/`--text-muted` for hierarchy.
   Raw brand vars (`--red`, `--navy`...) only inside tokens.css when defining roles.

5. **Dark theme only.** Page bg = `--surface-0`. Build depth by stepping UP the surface
   ladder (`--surface-1` → `--surface-2` → `--surface-3`), not with heavy shadows.

6. **Quality floor, always:** responsive to mobile, visible `:focus-visible` ring
   (`--focus-ring`), `prefers-reduced-motion` respected, semantic HTML, alt text.

## Design direction (this is the taste — hold it on every page)

The look is cinematic, deep, and confident — not flat, not templated, not the default
AI dashboard. Think editorial automotive: big imagery with character, real depth, motion
that feels intentional. Premium dealership, not a SaaS landing page.

**Hard "no" list (these are the AI defaults — never ship them):**

- No gradient-mesh backgrounds, no neon glow, no fake-3D / glassmorphism for its own sake.
- No "big number + tiny label + accent gradient" hero. That's the template answer.
- No flat full-bleed color blocks where an image should carry the section.
- No decorative 01/02/03 numbering unless it's a real sequence (financing steps qualify).
- No rainbow of accents. One loud thing per view.

**What we DO instead:**

- **Imagery leads.** The hero and key sections are anchored by a strong photo or video,
  not by text on a solid color. Let the car/atmosphere carry the emotion; text sits on top.
- **Depth, not decoration.** Build richness with layered surfaces, real photography with
  shadow and dimension, subtle parallax, and a dark gradient scrim over images for legible
  text — never with busy effects. A near-black scrim (linear-gradient from
  `rgba(15,23,36,.85)` to transparent) over a photo is the house move for text-on-image.
- **Cinematic motion.** Slow ken-burns on hero stills, soft fade/slide reveals on scroll
  (`--ease-out`, `--dur-slower`), hover that lifts and zooms image inside the frame.
  Motion is slow and weighted, never bouncy. Always honor `prefers-reduced-motion`.
- **One signature moment per page** — the thing it's remembered by (a full-bleed video
  hero, an oversized price reveal, a horizontal inventory rail). Make it strong, keep the
  rest quiet around it.
- **Type with character.** Display face carries personality; set tight tracking on big
  headings (`--ls-tighter`). Don't let type be a neutral delivery vehicle.

When a section feels like a generic dark card grid, stop and ask: where's the image, where's
the depth, where's the one memorable move? Add it before moving on.

## Imagery & video rules

- **Real stock photos for actual vehicles.** Never use AI-generated cars — wrong badges,
  invented wheels, melted geometry; a dealer spots it instantly. Pull real automotive
  photography (Unsplash/Pexels placeholders now, client's real inventory shots later).
  Photos must have character and depth: dramatic light, real reflections, shallow depth
  of field, motion blur, showroom or environmental context. Avoid flat catalog cutouts.
- **Video where it earns its place:** a muted, looping, auto-playing background clip in the
  hero (rolling shot, detail pans). Always provide a poster image and a static fallback;
  pause on `prefers-reduced-motion`. Keep files light — short loops, compressed.
- **FAL MCP is for atmosphere, NOT for cars.** Use FAL to generate: ambient/abstract
  backgrounds, texture and grain overlays, gradient scrims, bokeh/light-leak loops, section
  dividers — mood, never a vehicle the customer could think is real stock.
- Always add `object-fit:cover`, an `alt`, a dark scrim for any text-over-image, and a
  loading strategy (lazy for below-the-fold).

## Files

- `styles/tokens.css` — all tokens (colors, surfaces, type, spacing, radii, shadows, motion, z-index). EDIT HERE to change the system.
- `styles/utilities.css` — ready components/classes (.btn, .card, .badge, .input, .nav, .eyebrow, .reveal, grids). Reuse before inventing.
- `tailwind.config.js` — same tokens as Tailwind classes.
- `design/tokens.json` — machine-readable mirror (Figma / Style Dictionary).
- `design/DESIGN_SYSTEM.md` — full spec and usage examples.
- `design/preview.html` — living reference of every token + component.

## How to build a component

1. Check `utilities.css` — does a class already exist? Reuse it.
2. If new, compose from tokens only. Match the patterns in `preview.html`.
3. Keep one accent action per view. Red is loud — use it for THE action (price, finance CTA), not everything.
4. Sentence case for UI copy. Verb-first buttons ("Get financing", "View details").

## Type scale quick ref
eyebrow `--fs-2xs` widest tracking · body `--fs-base` · h4 `--fs-lg` · h3 `--fs-xl` ·
h2 `--fs-2xl` · h1 `--fs-3xl` · hero `--fs-5xl` (fluid).

## When unsure
Open `design/preview.html` and match it. If a value isn't in the tokens, add it to
`tokens.css` first (and `tokens.json`), then use it — don't inline it.
