---
name: accessibility-review
description: Audit a page or component for accessibility, semantic HTML, and web UX correctness — WCAG contrast, ARIA, keyboard nav, focus, reduced motion, performance. Use whenever the user asks to check accessibility, a11y, WCAG, contrast, keyboard, screen reader, or wants a technical review of UI code. Reports issues only — does not edit.
---

# Accessibility review

Technical correctness audit of built UI. Pairs with `design-review` (taste) — this skill
covers a11y, semantics, and web UX. **Report only — never edit.** Walk every group below,
then output the findings table.

## Contrast (WCAG AA)

- Body text ≥ **4.5:1** against its actual background (check on the surface it sits on,
  not the page base). Large text (≥24px, or ≥19px bold) ≥ **3:1**.
- UI components and focus indicators ≥ **3:1** against adjacent colors.
- Never use color as the **only** signal (in-stock, error, required) — pair with text,
  icon, or shape.
- Watch `--text-muted` on raised surfaces and accent text on tinted `-bg` roles.

## Semantic HTML

- Exactly **one `<h1>`** per page; heading levels descend in order (no h2 → h4 jumps).
- Real elements for real roles: `<button>` for actions, `<a href>` for navigation,
  `<nav>/<main>/<header>/<footer>/<section>` for landmarks — not `<div>` with onclick.
- Every `<img>` has `alt` (empty `alt=""` for decorative); icon-only controls have
  `aria-label`. Lists are `<ul>/<ol>`; tables use `<th>` + scope.
- ARIA only when native semantics can't express it — and never contradict the element.

## Keyboard & focus

- Everything interactive is reachable and operable by **Tab / Enter / Space** (and arrows
  where expected). No mouse-only controls.
- Visible **`:focus-visible`** ring on every focusable element (use `--focus-ring`); never
  `outline:none` without a replacement.
- Tab order follows visual order; no positive `tabindex`. Skip-link to main content.
- Modals/menus: focus moves in on open, is **trapped** while open, returns to the trigger
  on close; `Esc` closes.

## Forms

- Every control has a programmatic label (`<label for>` ↔ `id`, or `aria-label`).
- Errors are conveyed by text (and `aria-describedby` / `aria-invalid`), **not color alone**.
- Required state announced (not just a red asterisk). Inputs have correct `type`/`autocomplete`.

## Motion

- All animation, parallax, ken-burns, and auto-advance respect
  **`prefers-reduced-motion: reduce`** (honored globally in tokens.css — verify new motion
  opts in).
- Background video is `muted`, has a `poster`, and **pauses** under reduced motion; provides
  a static fallback. No content flashes more than 3×/sec.

## Responsive & zoom

- Usable at **320px** width with no horizontal scroll or clipped content.
- Reflows at **200% zoom** without loss of content or function.
- Touch targets ≥ **44×44px** with adequate spacing.

## Performance / stability

- Below-the-fold media is `loading="lazy"`; hero/LCP image is eager.
- Images and media reserve space (`aspect-ratio` or width/height) to avoid layout shift (CLS).
- `object-fit:cover` + dark scrim on any text-over-image for legibility.

## Output format

Report issues only, most important first:

```
WCAG-LEVEL — element/selector — issue — fix
```

Example: `A — <div class="btn"> — action is a non-focusable div — use <button> so it's keyboard-operable`.
Group by severity (blocker → AA → AAA/nice-to-have). If something can't be verified from code
alone (e.g. live contrast, screen-reader output), say so and flag it for manual check.
