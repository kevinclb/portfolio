# Portfolio Revamp: "Amber CRT" Design

**Date:** 2026-02-28
**Author:** Claude (design brainstorm for Kevin Babou)
**Status:** Approved for implementation (Kevin gave full permission)

## Problem Statement

Three interconnected issues:
1. The terminal is buried as a bottom drawer -- needs to be a prominent floating window on boot
2. Experience/about content is stale and boring -- doesn't reflect Kevin's actual resume
3. The design system (green-on-black, generic layout) feels dull and undifferentiated

## Chosen Approach: "Amber CRT"

A warm retro-hacker aesthetic built around amber CRT monitor tones. Floating macOS-style terminal as the hero element. Content refreshed from Kevin's actual Feb 2026 resume.

### Why Amber?
- Neon green on black is what *every* hacker-themed portfolio does. Amber is equally "retro terminal" (amber CRT monitors were widespread) but rarely used.
- Warm tones feel more inviting and memorable than cold green.
- The amber-on-dark contrast ratio is excellent for readability.

### Alternatives Considered
- **"Electric Void"** (blue/violet cyberpunk): Too trendy, risks looking dated. Blue is overused.
- **"Monochrome Bureau"** (Swiss brutalist): Too cold and sterile. Loses the hacker personality.

---

## 1. Floating Terminal Window

### Behavior
- On page load, a floating terminal window appears in the **center-right** of the viewport
- Dimensions: ~550px wide x 380px tall (adjustable)
- Positioned at roughly 55% from left, 15% from top -- prominent but not blocking nav or hero text
- **Draggable** via title bar (using native pointer events, no library needed)
- **Resizable** via corner/edge handles
- **Minimizable** to a dock/pill at bottom-right (click to restore)
- **Auto-types** a boot sequence on first load:
  ```
  $ whoami
  kevin babou -- software engineer @ chime
  building agentic AI workflows and transaction infrastructure

  $ cat interests.txt
  distributed systems | LLM infrastructure | platform engineering

  $ help
  type "question <anything>" to ask about me
  ```
- After boot sequence, terminal is interactive (all existing commands work)
- Boot sequence only plays once per session (sessionStorage flag)

### Visual Design
- macOS-style window chrome: title bar with three dots (red/yellow/green)
- Title bar text: `kevin@portfolio ~ %`
- Semi-transparent background with backdrop blur
- Subtle amber glow/shadow around the window
- Scanline overlay retained but made more subtle
- On mobile (<768px): terminal docks to bottom as a sheet (current behavior, refined)

### Implementation
- Convert `Terminal.tsx` from fixed-bottom to absolute/fixed positioned floating window
- Drag via `onPointerDown`/`onPointerMove`/`onPointerUp` on title bar (no library needed)
- Minimize state: collapses to a small pill/icon at bottom-right corner
- Position persisted to `sessionStorage` (not localStorage -- fresh position each visit)

---

## 2. Design System Overhaul

### Color Tokens

```css
:root {
  /* Backgrounds -- warm blacks */
  --bg: #0c0a09;
  --surface-1: #1c1917;
  --surface-2: #292524;
  --surface-3: #3a3633;

  /* Borders */
  --border: rgba(245, 158, 11, 0.12);
  --border-subtle: rgba(255, 255, 255, 0.06);

  /* Text -- warm whites */
  --text: rgba(255, 247, 237, 0.92);
  --muted: rgba(255, 247, 237, 0.55);

  /* Primary accent -- amber */
  --accent: #f59e0b;
  --accent-bright: #fbbf24;
  --accent-dim: rgba(245, 158, 11, 0.12);
  --accent-glow: rgba(245, 158, 11, 0.25);

  /* Secondary -- cool slate (for contrast) */
  --accent-2: #94a3b8;
  --accent-2-dim: rgba(148, 163, 184, 0.12);

  /* Semantics */
  --success: #34d399;
  --warning: #fbbf24;
  --danger: #ef4444;
  --info: #60a5fa;
}
```

### Typography

```css
:root {
  /* Upgrade heading font to Space Grotesk -- geometric, techy, warm */
  --font-display: 'Space Grotesk', -apple-system, sans-serif;
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

- **Headings:** Space Grotesk (bolder, more personality than Inter)
- **Body:** Inter (clean, readable, unchanged)
- **Code/Terminal:** JetBrains Mono (unchanged)

### Background Treatment
- Remove the dual radial gradient blooms (they look generic)
- Replace with a very subtle noise texture overlay (CSS-generated or tiny base64 SVG)
- Optional: faint amber gradient bloom in top-left corner only

### Card & Surface Design
- Cards: `--surface-1` background, `--border` (amber-tinted) border
- Hover: subtle amber glow shadow + slight scale(1.01)
- Active states: amber border brightens
- Remove the green glow hover effects

### Section Titles
- Keep the `//` prefix but render it in `--accent` (amber now)
- Section titles in Space Grotesk, slightly larger

---

## 3. Content Refresh

### About Page (Home)

**Hero Section:**
```
Kevin Babou
Software Engineer @ Chime

Building agentic AI workflows and high-throughput transaction infrastructure.
Previously shipping blockchain interoperability at Coinbase.

-> 4+ years experience    -> AI & platform engineering    -> 5 projects
```

**"What I Build" Section** (replaces boring "Technical Interests"):
Instead of generic bullets, show specific, impressive things:

- Agentic LLM pipelines over Amazon Bedrock powering features for 25M+ users
- Transaction processing at 350 purchases/sec (30M/day) with real-time categorization
- Cross-service idempotency guarantees during 25M account migrations
- Temporal workflows for reliable $100M+ crypto transfer processing
- 0-to-1 services in Go, Ruby, and Python shipping to production

**"Right Now" Section** (replaces "Beyond Code"):
More personality, less resume filler:
- Leading AI application experience at Chime, reporting to Director & CTO
- Experimenting with Claude Code and agentic coding workflows
- Lifting heavy, playing chess, learning guitar
- Watching Severance and Pluribus with my wife Ana

**Contact Section:** Keep but clean up (remove "Other Github" label, just list both).

### Experience Page

Update to reflect actual resume with **4 distinct roles**, not 2:

**1. Chime -- AI App Experience** (Mar 2025 - Present)
- Agentic LLM workflows over Amazon Bedrock with Python LangChain SDK
- Transaction Categorization pipeline: SNS/SQS async, 350 purchases/sec
- Leading insights & aggregations product across React Native to Snowflake ETL
- Setting company standards for agentic coding workflows
- Reporting to Director & CTO in flat org structure

Tags: LangChain, Bedrock, Python, SNS/SQS, React Native, Snowflake

**2. Chime -- Transactions Intelligence Platform** (Jan 2025 - Mar 2025)
- DynamoDB cache mechanism reducing core API latency by 68%
- Cross-service idempotency solution for 25M account migration
- Buffer mechanism: $350k annualized savings
- Sev2 incident commander

Tags: Ruby, DynamoDB, Idempotency, Reliability

**3. Coinbase -- Developer Platform** (May 2022 - Apr 2024)
- 0-to-1 Golang service: REST + gRPC gateway, MongoDB, TDD
- Monolith decomposition: 2.5k+ LOC refactor + frontend dual-write migration
- SpiceDB-based IAM + 10-page technical spec
- Redis locking for transient retry auth errors

Tags: Go, gRPC, MongoDB, SpiceDB, Redis, Kubernetes

**4. Coinbase -- Blockchain Interoperability** (May 2021 - May 2022)
- Temporal workflows for $100M+ crypto transfers (Polygon, Avalanche, Base)
- Observability: Datadog + Bugsnag, >99% test coverage
- Cross-chain liquidity logic with hot reserve management

Tags: Go, Temporal, Datadog, Buildkite, Blockchain

### LLM Context (kevin.md)

Update to reflect current role, AI work, and family info.

---

## 4. Layout & Interaction Changes

### Navbar
- Keep the `~/portfolio` brand and nav links
- Add a subtle amber underline on active link (replaces green)
- Add a small terminal icon button on the right that toggles/restores the floating terminal

### Page Transitions
- Keep the existing `page-enter` fade-in animation
- Add staggered reveals for timeline items and cards

### Timeline (Experience Page)
- Keep vertical timeline but:
  - Use amber accent for the line and dots (replaces green)
  - Add a subtle connecting animation on scroll (dots pulse when entering viewport)
  - Group by company with sub-roles indented

### Cards (Projects/Writing Pages)
- Amber-tinted border on hover
- Warm shadow glow instead of green

---

## 5. Mobile Considerations

- Floating terminal reverts to bottom sheet on screens < 768px
- Terminal boot sequence still plays on mobile
- Touch-drag on title bar to resize (existing behavior, refined)
- All amber colors work on OLED (dark enough backgrounds)

---

## 6. Tech Stack Changes

- **New dependency:** None required. Drag/resize can be done with native pointer events.
- **Optional:** `react-rnd` if native implementation proves cumbersome (but prefer zero deps)
- **New font:** Space Grotesk added via Google Fonts
- **No new frameworks or libraries.** Pure CSS custom properties remain.

---

## 7. What We Are NOT Doing

- No deployment to Railway (Kevin's explicit instruction)
- No Tailwind migration
- No component library adoption
- No animation library (Framer Motion) -- CSS transitions suffice
- No routing changes
- No API endpoint changes
