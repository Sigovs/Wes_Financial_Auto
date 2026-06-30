---
name: design-review
description: Critique a finished page, section, screenshot, or component against the project's design principles and token system. Use whenever the user asks to review, critique, audit, check, or "does this look base/generic/AI", or pastes a screenshot of built UI and wants feedback. Reports issues only — does not edit code.
---

# Design review

Evaluate the target UI against `design-principles` and the token system. Be specific and
honest. Catch drift toward the AI-default look before it ships.

## What to do

1. Load the `design-principles` skill for the taste, and skim `styles/tokens.css` +
   `styles/utilities.css` for the spec.
2. Look at the target (file, screenshot, or live page) and check against the list below.
3. Report findings grouped by severity. Reference the exact section/element. Suggest the
   fix in one line each. **Do not edit any files** — review only.

## Checklist

**Anti-default look**
- Hero: image/video-led, or just text on a solid color? (must be image-led)
- Any gradient-mesh, neon glow, fake-3D, glassmorphism? (flag)
- "Big number + tiny label + gradient" hero? (flag)
- More than one loud accent competing per view? (flag — one red thing per view)
- Decorative 01/02/03 without a real sequence? (flag)

**Depth & imagery**
- Is there real depth (layered surfaces, photography with light), or is it flat?
- Photos with character (light, reflection, shallow DOF), or flat cutouts?
- Text over image: is there a dark scrim for legibility?
- Any AI-generated cars? (flag hard)

**System compliance**
- Hardcoded hex / px / off-scale spacing instead of tokens? (list each)
- Section padding from `--section-y`? Layout in `.container`?
- Color used by role (`--accent` for the one action/price), not raw?

**Motion & quality floor**
- Reveals/hover present and slow/weighted, not bouncy?
- `prefers-reduced-motion` handled? Focus rings visible? Responsive to mobile? Alt text?

**Signature**
- Is there one memorable move on the page, or is it a generic dark card grid?

## Output format

```
SEVERITY  — element/section — issue — one-line fix
```
Order: blockers → base-look drift → system violations → polish. End with the single most
important change to make first.
