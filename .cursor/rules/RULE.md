---
description: Portfolio design rules — the Caret design system
alwaysApply: true
---

## Design System — Caret

kevinbabou.dev is built on **Caret**: monochrome ink on near-white paper, one
cobalt accent used as a signal, and unconventionally big headers. Inspiration:
Apple (scale/confidence), Notion (calm reading), Cursor/Vercel (mono labels,
hairlines, ink bands, the blinking caret).

The single source of truth is `src/index.css` — design tokens (`--color-*`,
`--font-*`, `--space-*`, `--radius-*`, `--shadow-*`) plus a thin component layer.

## Non-negotiables

- Take every color, font, spacing, radius and shadow from tokens. Never
  hard-code a hex, font name, or px value a token already carries.
- Build with the existing component classes (`.btn`, `.tag`, `.card`, `.post`,
  `.band`, `.prose`, `.eyebrow`, `.caret`, `.display-1/-2`, `.stat`). Don't
  invent parallel classes for the same job.
- Layout one-offs (grid/flex/padding compositions) go in inline `style` on the
  element or in the `app layout` block at the bottom of `index.css`. That block
  is layout containers only — no new colors, fonts, or visual language.

## Type & color

- One family: **Instrument Sans** (display and body differ only by size/weight/
  tracking). **Geist Mono** carries engineering details: eyebrows, dates, tags,
  code, captions. No serif, no italics for emphasis — emphasis is weight or the
  accent.
- Headers go bigger than feels reasonable (`.display-1` clamps to 124px), then
  everything else stays quiet.
- One accent: **cobalt `#0d5eff`**. Links, the caret, focus rings, selection,
  and at most one accent-filled button per view. If two things are cobalt in one
  viewport, one of them shouldn't be. Everything else is grayscale.

## Structure & motion

- Hairlines (`--color-divider`) and whitespace do the structural work. Reach for
  a border before a shadow.
- The one dramatic move is `.band` — a full-bleed ink section that re-themes
  every token inside it (used for stats and the closing contact).
- Motion is 160ms on `--ease`; hovers tint or lift 2px; the caret blinks. All of
  it collapses under `prefers-reduced-motion`.

## Voice

- First person, present tense, sentence case everywhere (nav, buttons,
  headlines). Short declaratives. Confidence from specifics ("cut latency 68%"),
  not adjectives. No Title Case, no exclamation points, no emoji.

## Writing page

- Essays are **not** hosted here — they live on Substack ("Thoughts and
  Schemes"). The writing page teases them and links out. Post metadata lives in
  `src/data/substack.ts`; subscribing hands off to Substack's own flow.

## Constraints

- No Tailwind, no component library, no animation library.
- Plain CSS custom properties; add dependencies only when genuinely needed.
