# Wes Financial Auto — Design System

Dark-theme design system for a highline auto dealership with financing.
Premium, trustworthy, action-driven. This document is the human-readable spec;
the source of truth is `styles/tokens.css`.

---

## 1. Foundations

### Color

**Brand palette**

| Token | Hex | Role |
|---|---|---|
| `--red` | `#E53845` | Primary action, prices, finance CTAs |
| `--navy` | `#1D3558` | Deep brand, trust surfaces |
| `--blue` | `#457B9D` | Info, links, secondary actions |
| `--aqua` | `#A9DBDC` | Highlights, special badges |
| `--mint` | `#F0FCEF` | Success tint base |
| `--deep-dark` | `#0F1724` | Page base |

**Surfaces (elevation ladder)** — depth comes from stepping up, not shadows.

| Token | Hex | Use |
|---|---|---|
| `--surface-0` | `#0F1724` | Page background |
| `--surface-1` | `#16202E` | Cards, sections |
| `--surface-2` | `#1D2A3A` | Raised cards, inputs |
| `--surface-3` | `#26384C` | Popovers, dropdowns, hover |
| `--surface-inset` | `#0B121C` | Wells, code, deep insets |

**Text**

| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#F1F5F9` | Headlines, key text |
| `--text-secondary` | `#A9B7C6` | Body, supporting |
| `--text-muted` | `#647386` | Meta, captions, placeholders |
| `--text-disabled` | `#3F4C5C` | Disabled |

**Semantic roles** — use these in components, not raw brand colors.

| Role | Token | Meaning |
|---|---|---|
| Accent | `--accent` (red) | The one primary action / price |
| Info | `--info` (blue) | Links, neutral info |
| Success | `--success` (green) | Approved, in stock, paid |
| Warning | `--warning` (amber) | Caution |
| Danger | `--danger` (red) | Errors, destructive |
| Highlight | `--highlight` (aqua) | Special status |

Each role has `-bg` (tint) and `-border` companions plus `--on-{role}` for text on solid fills.

### Typography

Display: Oswald (condensed, carries character — big headings). Body: DM Sans. Mono: JetBrains Mono.
Swap `--font-display` for the client face when it arrives.

Scale (1.250): `--fs-2xs` 11 · `--fs-xs` 12 · `--fs-sm` 14 · `--fs-base` 16 · `--fs-md` 18 ·
`--fs-lg` 22 · `--fs-xl` 28 · `--fs-2xl` 36 · `--fs-3xl` 48 · `--fs-4xl` 64 · `--fs-5xl` fluid hero.

Weights: 400 / 500 / 600 / 700. Tracking: eyebrows use `--ls-widest` (0.28em) uppercase;
headings use `--ls-tight`/`--ls-tighter`.

**Headings are uppercase — the house rule.** Two tiers (classes in `utilities.css`):

| Class | Weight | Use |
|---|---|---|
| `.caps` | keeps the heading's display weight (600) | primary headings — section titles, card titles, the signature break line |
| `.caps-light` | regular (400) | secondary headings — financing step titles, minor section labels (e.g. "From the showroom") |

Apply on top of a `.type-*` size class, e.g. `class="type-h3 caps-light"`. Sentence-case the
source text; the uppercase is presentational (`text-transform`) so screen readers still read it
normally. Eyebrows (`.eyebrow` / `.kicker`) remain the smallest uppercase label tier.

### Spacing (4px base)

`--space-1` 4 → `--space-32` 128. Use ONLY these steps. No arbitrary values. All sizes are
**fixed px per breakpoint** (no fluid `clamp()`) — desktop / tablet (≤1024) / mobile (≤680).

**Section padding is asymmetric** — text sits closer to the top edge, further from the bottom:

| Token | Desktop | Tablet ≤1024 | Mobile ≤680 |
|---|---|---|---|
| `--section-pt` (top) | 96px | 72px | 48px |
| `--section-pb` (bottom) | 128px | 96px | 64px |
| `--section-sm-pt` | 56px | 44px | 32px |
| `--section-sm-pb` | 72px | 60px | 44px |
| `--gutter` | 64px | 40px | 20px |

`.section` / `.section-sm` apply pt/pb automatically. `--section-y` stays only as a legacy
alias (= bottom value); prefer `pt`/`pb` on new work.

**Standard content distances** — inside a section, pick the gap by *relationship*, not by eye:

| Relationship | Token | Value | Class |
|---|---|---|---|
| text → text (same group) | `--space-text` | 12px | `.flow-text` |
| text → object / control | `--space-text-obj` | 24px | `.flow-obj` |
| block → block | `--space-block` | 48px | `.flow-block` |

- **Container:** `--container` 1280px, `--container-narrow` 880px.
- **Inside components:** 8 / 12 / 16 / 24 px gaps.

### Radii

`--radius-sm` 4 (badges) · `--radius` 8 (buttons, inputs) · `--radius-md` 12 (cards) ·
`--radius-lg` 16 · `--radius-full` (pills).

### Shadows

Subtle on dark: `--shadow-sm/md/lg`, `--shadow-pop` (menus). Prefer surface step over shadow.

### Motion

Durations: `--dur-fast` 120 · `--dur-snap` 180 · `--dur-base` 250 · `--dur-slow` 400 · `--dur-slower` 800.
Easings: `--ease-out` (reveals), `--ease-snap` (interactions), `--ease-in-out`.
Always honor `prefers-reduced-motion`.

### Z-index

dropdown 1000 · sticky 1100 · nav 1200 · overlay 1300 · modal 1400 · toast 1500.

---

## 2. Components (in `utilities.css`)

- **Buttons:** `.btn` + `.btn-primary` (red action) / `.btn-secondary` (outline) / `.btn-ghost` / `.btn-info`. Sizes `.btn-lg` `.btn-sm` `.btn-block`.
- **Badges:** `.badge` + `-accent / -info / -success / -warning / -highlight / -neutral`.
- **Cards:** `.card` (+ `.card-hover`, `.card-pad`, `.card-media`). Metric: `.metric`.
- **Forms:** `.input` `.select` `.textarea` `.label` `.field`.
- **Nav:** `.nav` (+ `.solid` on scroll), `.nav-link`.
- **Headings:** `.sec-head` with `.eyebrow` + `h2` + `.link-arrow`.
- **Layout:** `.container` `.container-narrow` `.section` `.section-sm` `.grid-2/3/4` `.row` `.row-between` `.stack`.
- **Reveal:** `.reveal` → add `.in` on scroll via IntersectionObserver.

---

## 3. Usage rules

1. Tokens only — never inline raw hex/px in components.
2. One accent action per view. Red = the action (finance, price), not decoration.
3. Section padding always `--section-y`. Horizontal always `.container`.
4. Build hierarchy with surfaces + text tokens, not random grays.
5. Sentence case, verb-first buttons.
6. Quality floor: responsive, focus rings, reduced motion, semantic HTML.

---

## 4. How to use with Claude Code (VS Code)

Link these files in your repo and reference them in prompts. `CLAUDE.md` is read
automatically. Example prompts:

- "Build the inventory card grid using utilities.css and tokens — no raw values."
- "Add a financing CTA section. Section padding from --section-y, primary button only for the apply action."
- "Create the VDP spec table using surface and text tokens."

See `commands.md` for a full step-by-step command list.
