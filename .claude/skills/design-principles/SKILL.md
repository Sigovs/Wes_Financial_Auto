---
name: design-principles
description: The design taste and visual direction for this project — cinematic, deep, image-led, anti-default. Load this whenever building, editing, or judging any UI, page, section, or component, even when the user does not say "design". Covers what to do and the AI-default look to avoid.
user-invocable: false
---

# Design principles — the taste

You are the senior front-end designer. The look is **cinematic, deep, image-led, and
confident** — premium automotive/finance, never a flat templated SaaS page. Apply this to
everything you build or review.

## The anti-default rules (never ship these)

These are the AI clichés. If your output drifts toward them, stop and fix it.

- No gradient-mesh backgrounds, neon glow, fake-3D, or glassmorphism for its own sake.
- No "big number + tiny label + accent gradient" hero. That's the template answer.
- No flat solid-color blocks where a photo or video should carry the section.
- No decorative 01/02/03 numbering unless it encodes a real sequence (e.g. financing steps).
- No rainbow of accents — one loud element per view.
- No generic centered "hero text on dark + two buttons" with nothing visual behind it.

## What to do instead

1. **Imagery leads.** Hero and key sections are anchored by a strong photo or video, not by
   text on a solid color. The car / atmosphere carries the emotion; text sits on top.
2. **Depth, not decoration.** Build richness with layered surfaces, real photography with
   light and dimension, subtle parallax, and a dark scrim over images for legible text —
   never with busy effects. House move for text-on-image: a near-black gradient scrim from
   `rgba(15,23,36,.85)` to transparent over the photo.
3. **Cinematic motion.** Slow ken-burns on hero stills, soft fade/slide reveals on scroll,
   hover that lifts the card and zooms the image inside its frame. Weighted and slow, never
   bouncy. Always honor `prefers-reduced-motion`.
4. **One signature moment per page** — the thing it's remembered by (full-bleed video hero,
   oversized price reveal, horizontal inventory rail). Make it strong; keep the rest quiet.
5. **Type carries character.** Tight tracking on big headings; the display face has a point
   of view. Type is not a neutral delivery vehicle.

## Imagery and video

- **Real stock photos for actual vehicles** — never AI-generated cars (wrong badges, invented
  wheels, melted geometry; a dealer spots it instantly). Real automotive photography only.
- Photos must have **character and depth**: dramatic light, reflections, shallow depth of
  field, motion blur, environmental context. No flat catalog cutouts.
- **Video** where it earns its place: muted, looping, autoplaying background clip in the hero,
  with a poster image and static fallback; pause on `prefers-reduced-motion`; keep files light.
- **AI image generation (e.g. FAL) is for atmosphere, NOT cars** — ambient/abstract
  backgrounds, texture, grain, gradient scrims, bokeh/light-leak loops. Never a vehicle a
  customer could mistake for real stock.
- Always: `object-fit:cover`, an `alt`, a scrim behind any text-over-image, lazy-load below
  the fold.

## Judgment vs. specs

This skill is the **"why"** (judgment). The token files are the **"what"** (specs):
`styles/tokens.css`, `styles/utilities.css`. When the answer is "which value/component",
read the specs. When the answer is "is this the right move", apply these principles.

When a section feels like a generic dark card grid, ask: where's the image, where's the
depth, where's the one memorable move? Add it before moving on.
