# Wes Financial Auto — step-by-step (VS Code + Claude Code)

You're at the design-system stage. Follow these in order.

## Step 0 — put the files in your repo
Place this folder's contents at the root of `Wes_Financial_Auto`:
```
CLAUDE.md
tailwind.config.js
styles/tokens.css
styles/utilities.css
design/tokens.json
design/DESIGN_SYSTEM.md
design/preview.html
design/commands.md
```
`CLAUDE.md` is auto-read by Claude Code — it makes Claude follow the system.

## Step 1 — connect git (already prepared, just push)
```bash
git init
git remote add origin https://github.com/Sigovs/Wes_Financial_Auto.git
git branch -M main
git add .
git commit -m "design system: tokens, utilities, tailwind, preview"
git push -u origin main
```

## Step 2 — verify the system
Open `design/preview.html` with Live Server. This is your visual reference — every
color, type style, button, badge, card, spacing step. Show it to the client too.

## Step 3 — link the system in your `<head>`
On every page:
```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="styles/utilities.css">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Step 4 — prompts to build pages (paste into Claude Code)

Home:
> Build index.html (HOME) for Wes Financial Auto using styles/tokens.css and
> styles/utilities.css. Sections in order: fullscreen hero slider, featured inventory
> (.card grid), financing CTA, Instagram grid, about, footer. Tokens only — no raw hex
> or px. Section padding from --section-y, layout from .container. One primary (red)
> button per section.

Inventory (SRP):
> Build inventory.html: a .grid-3 of vehicle cards plus a visual filter bar
> (make / price / sort) using .input and .select. Cards link to vehicle.html.
> Use only tokens and utilities.

Vehicle (VDP):
> Build vehicle.html: photo gallery, title, price in --accent, spec table using
> surface/text tokens, financing CTA (primary) and inquire (secondary).

Financing page:
> Build financing.html: a pre-approval form using .card, .field, .input, .select,
> .label, and a primary submit. Trust badges with .badge-success / .badge-highlight.

## Step 5 — guardrail prompt (run anytime)
> Audit this file for any hardcoded hex, px, or non-scale spacing. Replace each with the
> correct token from tokens.css. List what you changed.

## To recolor / rebrand later
Edit one place — `styles/tokens.css`. Change `--accent`, surfaces, or `--font-display`.
Mirror the change in `design/tokens.json`. Everything updates; no component edits.
