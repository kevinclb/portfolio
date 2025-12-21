---
description: Portfolio design system + terminal “proof engine” rules (playful hacker, recruiter-first)
alwaysApply: false
---
## North Star (must hold true)
- Recruiter-first: every page should scan in **10 seconds**.
- Tone: **playful + hacker**, but execution is **polished** (no jank, no gimmicks).
- Proof over prose: prefer **artifacts** (metrics, diagrams, incident notes, APIs, data models) over paragraphs.

## Design system rules (hard constraints)
- No inline styles except truly dynamic values (e.g., computed widths). Default: **no inline styles**.
- Use **design tokens** via CSS variables for ALL colors/spacing/typography/radii/shadows/motion.
- No one-off colors/margins. If you need a new value, add/adjust a token.
- Keep UI accessible: keyboard navigable, visible focus states, readable contrast.

## Foundations (tokens) — enforce consistency
### Colors (dark-first, neon green accent)
- Neutrals: `--bg`, `--surface-1`, `--surface-2`, `--border`, `--text`, `--muted`
- Accent:
  - Primary neon green: `--accent` (`#39ff14` — electric lime/matrix green)
  - Secondary: `--accent-2` (use sparingly: hover/focus/special callouts only)
- Semantics: `--success`, `--warning`, `--danger`, `--info`
Rules:
- Use **one dominant accent** (neon green). `--accent-2` only for interactive states and rare highlights.
- Define tokenized focus ring + subtle glow (glow is an accent, not default decoration).

### Typography (2-font system)
- Sans for headings/body; Mono for terminal/code/tags/metadata.
- Use a small type scale (5–6 sizes). Do not invent random sizes.
Rules:
- Body text optimized for readability (line length, spacing).
- Mono is for “data flavor” and terminal authenticity.

### Spacing + layout
- 8px grid: `--space-1..--space-8` (or equivalent).
- Content width tokens: `--max-w-prose`, `--max-w-wide`
Rules:
- All pages share the same section rhythm (padding, headings, dividers).

### Radii + elevation
- Radii: `--radius-sm`, `--radius-md`, `--radius-lg`
- Shadows/glow: subtle tokens only (no heavy drop shadows)
Rules:
- Glow appears on focus/hover, not as persistent decoration.

### Motion
- Durations: `--dur-fast`, `--dur-normal`
- Easing: `--ease-standard`
Rules:
- Motion communicates state (focus, expand, success), never “just for fun”.
- Respect `prefers-reduced-motion`.

## Component inventory (reuse; don’t freestyle)
When adding UI, prefer these building blocks (create if missing):
- Page shell (nav + centered content + terminal spacing)
- Hero header (name, role, 1-line promise, 2–3 proof links)
- Section header (title + 1 sentence + optional action)
- Card (project/writing/experience)
- Tag/Badge (tech + signal tags: Latency/Reliability/Security)
- Timeline row (experience)
- Callout (impact highlight)
- Code block (copy button)
- Terminal drawer (minimized bar + expandable panel + structured output renderer)
- Empty/loading/error states (consistent tone, not cringe)

Rules:
- New UI should be composed from these components, not bespoke one-offs.
- If a pattern repeats twice, factor it into a component.

## Content patterns (recruiter scanning)
- Impact-first formatting: surface numbers and outcomes visually.
- Evidence links: every major claim should link to a project/write-up/diagram or a terminal command that reveals proof.
- Consistent metadata rows (date, stack, role scope, “what I owned”).

## Terminal “proof engine” rules
### Command contract (architecture)
Every command must have:
- `name`, `aliases`, `summary`, `usage`, `args/flags`, `examples`, `handler()`, `outputType`
Handlers return structured output (not ad-hoc strings):
- `TextBlock`, `Table`, `Markdown`, `Json`, `Panel`

Rules:
- Commands may optionally trigger navigation (react-router), but should still return output (“what happened”).
- Unknown commands: provide “did you mean …” suggestions + consistent error style.
- Implement credibility behaviors: history (persisted), Up/Down navigation, Tab autocomplete, `help` / `help <cmd>` (man-page feel), `clear`.
- Rendering must support tables + copyable code blocks + clickable links where appropriate.

### Command taxonomy (keep learnable)
Core categories (aim <= 20 commands):
- Discovery: `help`, `commands`, `about`, `contact`
- Catalog: `projects`, `writing`, `experience`
- Deep-dive: `project <slug>`, `design <slug>`, `postmortem <slug>`
- Ops simulation: `status`, `metrics <service>`, `trace <id>`, `runbook <topic>`, `changelog`
- Utility: `clear`, `history`, `theme`, `copy <id>`

Rule:
- Each command must map to a **portfolio artifact** (page section, dataset, diagram, write-up).

### “Make it feel real” (simulated artifacts)
Prefer believable static datasets rendered convincingly:
- `metrics <service>`: p50/p95/p99, error rate, saturation, SLO
- `trace <id>`: spans, timings, tags
- `runbook <topic>`: symptoms, mitigations, rollback steps
- `config <service>`: safe excerpt
- `postmortem <slug>`: timeline, root cause, fixes

Rule:
- Must be technically correct and anonymized; no company-specific leakage.

## Time-to-wow guardrails (first 60 seconds)
When changing UI or IA, optimize for:
- Clear hero + proof strip on entry
- Scannable cards + timeline
- Terminal minimized by default but obviously discoverable (drawer affordance)
- Instant credibility: keyboard polish, structured output, consistent design tokens

## Output expectations from the assistant (how to work in this repo)
When you (the assistant) propose or implement changes:
- Start by stating which pillar(s) the change supports (clarity / polished hacker / proof).
- Add or reuse tokens instead of adding raw values.
- Prefer component reuse; if you add a new pattern, document it and make it reusable.
- For terminal work: define/update types first, then registry, then UI rendering, then UX behaviors.

## Quick review checklist (before finishing)
- No new inline styles (unless truly dynamic)
- No new one-off colors/spacing/typography
- Focus states visible; keyboard navigation works
- Terminal commands discoverable via `help`
- Outputs are structured (table/markdown/panel), not string soup
- Pages scan fast; proof links present