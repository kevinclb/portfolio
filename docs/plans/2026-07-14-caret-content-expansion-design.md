# Caret content expansion + interaction polish

Date: 2026-07-14
Status: approved, implementing

## Goal

Make kevinbabou.dev more contentful but still light, with warmer copy and two
interaction touches. Five items, all on the existing Caret design system.

## 1. Collapsible work (Home)

A reusable `Collapsible` component: an accessible `<button>` toggling a region,
with a gentle `grid-template-rows: 0fr -> 1fr` open animation (disabled under
`prefers-reduced-motion`). A quiet chevron rotates on open.

Two nested levels on the home work section, all closed by default:
- Company (Chime, Coinbase): collapsed shows name, dates, role.
- Subsection (each highlight): collapsed shows just its title; expands to body.

## 2. GitHub in navbar

A small GitHub icon link to https://github.com/kevinclb, next to the Résumé
button so it stays visible on mobile (the middle links collapse there).

## 3. Isometric robot hero

Hero becomes two columns: copy left, an inline-SVG isometric robot right. Thin
ink strokes (`currentColor`), one cobalt accent (eye/chest), a subtle idle float
disabled under reduced-motion. Hidden below ~720px.

## 4. Copy overhaul

- Hero headline: "Building agents, designing high-scale distributed systems, and
  constantly learning." with the caret.
- No em dashes anywhere. Warm, human, work-first voice. Scrub AI-slop tells
  (leverage, seamless, robust, "not just X but Y", etc.).

## 5. New pages + IA

Nav: About, Experience, Projects, Writing (+ GitHub icon + Résumé). Uses lives in
the footer. Contact stays the home band + footer.

- `/about`: warm intro, a "Now" block (current focus, guitar, lifting, chess),
  how I work, one light off-the-clock line (Ana, Bryson, Chance mentioned once).
- `/experience`: full four-role timeline with real depth, Caret timeline styling.
- `/uses`: truthful toolbox. Editor = Cursor + Claude Code; languages/infra from
  the stack; macOS. Only verified items.

## Data

- `src/data/experience.ts`: keep `companies` (home accordion) + add `roles`
  (four detailed roles for /experience). De-em-dashed, warm.
- `src/data/uses.ts`: new, grouped tool lists.
- De-em-dash `projects.ts`, `substack.ts`, and all page copy.

## Validation

tsc build + eslint clean; browser QA of home (open/closed accordion), about,
experience, uses at desktop and mobile; no console errors. Then commit, merge to
main, push.
