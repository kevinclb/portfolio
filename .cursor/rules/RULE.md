---
description: Portfolio design system + terminal “proof engine” rules (polished hacker, recruiter-first)
alwaysApply: true
---

## North Star (non-negotiable)
- Recruiter-first: each page must scan in 10 seconds.
- Tone: playful hacker, execution polished (no jank / no gimmicks).
- Proof over prose: default to artifacts (metrics, diagrams, APIs, models, runbooks).

## Acceptance tests (ship-blockers)
- Above the fold includes: (1) name + role, (2) 1-line value prop, (3) 1 primary CTA, (4) 2–3 proof chips with numbers.
- Terminal loads collapsed by default (peek header only), expands on intent.
- No raw colors/spacing/font sizes outside tokens (no exceptions except computed widths/heights).
- Focus visible everywhere, keyboard works end-to-end.
- Any glow is hover/focus only (never persistent).

## Visual hierarchy rules
- Accent budget: use --accent for PRIMARY actions only (active nav, primary CTA, terminal prompt).
- Secondary interactive states use --accent-2 sparingly (hover/focus only).
- Muted text must remain readable on --bg (no “ghost text”).
- Headlines use sans; metadata + chips use mono; body never uses mono.

## Layout rhythm
- Global section rhythm: [SectionHeader] → [Grid/List] → [Divider] (repeat).
- One consistent container width; no per-page custom widths.
- Use 8px grid tokens only.

## Terminal default behavior (credibility + scan)
- Default state: collapsed header showing “} terminal • type help” + subtle hint.
- Expand only when:
  - user focuses terminal, or
  - user presses `/` or `t`, or
  - user runs a command via UI.
- Expanded terminal must never cover the primary page CTA on first load.

## Terminal output contract (must)
- Commands return structured output types only: TextBlock | Table | Markdown | Json | Panel
- Unknown command: suggest 3 closest + show `help`.
- Implement: history (persist), Up/Down, Tab completion, help/man page, clear.
