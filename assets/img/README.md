# Images

Real photography lives here. Until the client's shots arrive, the site uses Unsplash
placeholder URLs in `index.html` — swap them for files in these folders.

## Folders

| Folder | Used by | Crop / ratio | Notes |
|---|---|---|---|
| `hero/` | Hero background | wide, ~16:9, ≥2000px | one dominant dark/cinematic shot, **no license plate** |
| `inventory/` | Vehicle cards | 3:2 landscape, ≥1100px | one per vehicle, front/profile, no plate |
| `about/` | Full-screen About | portrait-friendly, ≥2000px | atmospheric showroom/detail |
| `break/` | Cinematic visual break | wide, ≥2000px | dark, moody, minimal |
| `showroom/` | Instagram strip | square 1:1, ~600px | showroom feed |

## Naming

Lowercase, hyphenated, descriptive:
`inventory/2021-lamborghini-huracan.jpg`, `hero/audi-rs-dusk.jpg`.

## Referencing in HTML

Relative from the project root, e.g.:

```html
<img src="assets/img/inventory/2021-lamborghini-huracan.jpg"
     alt="2021 Lamborghini Huracán, front three-quarter" loading="lazy">
```

## Rules (from CLAUDE.md / design system)

- **Real photos only — never AI-generated cars.**
- **No visible license plates.** Prefer front/profile crops.
- One consistent brand tone — the page already applies a unifying filter
  (`saturate/contrast/brightness`) to all photos; keep source images dark/cinematic.
- Always: `object-fit: cover`, real `alt` text, `loading="lazy"` below the fold
  (hero stays eager with `fetchpriority="high"`).
- Compress before committing (target < ~300 KB each; use WebP/AVIF where possible).
