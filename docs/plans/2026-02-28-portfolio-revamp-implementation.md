# Portfolio "Amber CRT" Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio from a generic green-on-black hacker theme into a distinctive amber CRT aesthetic with a prominent floating terminal window and refreshed content from Kevin's actual Feb 2026 resume.

**Architecture:** The site is React 19 + Vite + plain CSS custom properties. No new libraries. The terminal converts from a fixed-bottom drawer to a floating, draggable macOS-style window using native pointer events. The CSS design system swaps all color tokens from green to amber. Content updates are pure data/component changes.

**Tech Stack:** React 19, TypeScript, Vite, plain CSS custom properties, Google Fonts (adding Space Grotesk)

---

### Task 1: Update Design Tokens -- Colors and Typography

**Files:**
- Modify: `src/index.css:1-123` (`:root` design tokens block)

**Step 1: Update the Google Fonts import to add Space Grotesk**

In `src/index.css`, replace line 11:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
```
with:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

**Step 2: Replace all color tokens in `:root`**

Replace lines 13-39 (the entire `:root` colors section) with:
```css
:root {
  /* -------------------------------------------------------------------------
     COLORS (amber CRT palette -- warm retro terminal aesthetic)
  ------------------------------------------------------------------------- */
  /* Neutrals -- warm blacks (stone-tinted) */
  --bg: #0c0a09;
  --surface-1: #1c1917;
  --surface-2: #292524;
  --surface-3: #3a3633;
  --border: rgba(245, 158, 11, 0.12);
  --text: rgba(255, 247, 237, 0.92);
  --muted: rgba(255, 247, 237, 0.55);

  /* Accent -- amber (primary) */
  --accent: #f59e0b;
  --accent-bright: #fbbf24;
  --accent-dim: rgba(245, 158, 11, 0.12);
  --accent-glow: rgba(245, 158, 11, 0.25);

  /* Accent-2 -- cool slate (secondary, for contrast) */
  --accent-2: #94a3b8;
  --accent-2-dim: rgba(148, 163, 184, 0.12);

  /* Semantics */
  --success: #34d399;
  --warning: #fbbf24;
  --danger: #ef4444;
  --info: #60a5fa;
```

**Step 3: Add `--font-display` token and update typography section**

Replace lines 41-45 (typography tokens) with:
```css
  /* -------------------------------------------------------------------------
     TYPOGRAPHY (3-font system: display + sans + mono)
  ------------------------------------------------------------------------- */
  --font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
```

**Step 4: Update glass surfaces and terminal-specific tokens**

Replace lines 101-119 with amber-tinted variants:
```css
  /* Material surfaces */
  --surface-glass: rgba(28, 25, 23, 0.72);
  --surface-glass-strong: rgba(28, 25, 23, 0.88);

  /* Borders */
  --border-subtle: rgba(255, 247, 237, 0.06);
  --border-default: rgba(255, 247, 237, 0.10);
  --border-strong: rgba(255, 247, 237, 0.14);

  /* Elevation */
  --elev-1: 0 1px 2px rgba(0,0,0,0.35);
  --elev-2: 0 8px 24px rgba(0,0,0,0.45);
  --elev-3: 0 16px 48px rgba(0,0,0,0.55);

  /* Terminal-specific */
  --terminal-border: var(--accent);
  --terminal-shadow: 0 4px 40px rgba(245, 158, 11, 0.12), 0 0 0 1px rgba(245, 158, 11, 0.08);
  --terminal-scanline: rgba(0, 0, 0, 0.04);
```

**Step 5: Update body background gradient**

Replace lines 162-164 (the body `background-image`) with:
```css
  background-image:
    radial-gradient(1200px 700px at 15% -5%, rgba(245, 158, 11, 0.06), transparent 60%);
```

**Step 6: Apply `--font-display` to headings**

Replace line 175 (`h1-h6` font-family):
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: var(--leading-tight);
  color: var(--text);
}
```

**Step 7: Update `index.html` theme-color meta tag**

In `index.html`, replace line 8:
```html
<meta name="theme-color" content="#0c0a09" />
```

**Step 8: Verify the dev server starts without errors**

Run: `npm run dev`
Expected: Dev server starts successfully, visit site in browser. All text, borders, and accents should now be amber-tinted instead of green. Background should be warm-black.

**Step 9: Commit**

```bash
git add src/index.css index.html
git commit -m "feat: swap design system to amber CRT palette

Replace neon green tokens with amber/warm-gold palette.
Add Space Grotesk display font for headings.
Update background gradient to single amber bloom."
```

---

### Task 2: Convert Terminal to Floating macOS-Style Window

This is the largest task. The terminal changes from a fixed-bottom drawer to a floating, draggable window.

**Files:**
- Modify: `src/components/Terminal.tsx` (major rewrite)
- Modify: `src/index.css:362-553` (terminal CSS section)
- Modify: `src/components/Layout.tsx` (remove terminal-reserved-height logic)

**Step 1: Update Terminal component constants and add floating state**

In `Terminal.tsx`, replace lines 8-15 (constants) with:
```tsx
const DEFAULT_WIDTH = 560
const DEFAULT_HEIGHT = 380
const MIN_WIDTH = 320
const MIN_HEIGHT = 200
const MAX_HISTORY_LINES = 300
const MOBILE_BREAKPOINT = 768
```

**Step 2: Replace the terminal state management**

Remove the `bodyHeightPx` state and all resize-related refs (lines 44-55). Replace with floating window state:

```tsx
// Floating window position and size
const [windowPos, setWindowPos] = useState(() => ({
  x: typeof window !== 'undefined' ? Math.max(40, window.innerWidth * 0.55 - DEFAULT_WIDTH / 2) : 200,
  y: typeof window !== 'undefined' ? Math.max(80, window.innerHeight * 0.15) : 100,
}))
const [windowSize, setWindowSize] = useState({ w: DEFAULT_WIDTH, h: DEFAULT_HEIGHT })
const [isMinimized, setIsMinimized] = useState(false)
const [isMobile, setIsMobile] = useState(() =>
  typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
)
const [bootComplete, setBootComplete] = useState(() =>
  typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('terminal.booted') === '1' : false
)

// Drag state
const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null)

// Resize state
const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number; edge: string } | null>(null)
```

**Step 3: Remove the old resize logic and `reservedHeightPx` memo**

Delete the `reservedHeightPx` useMemo (lines 57-60), the `bodyHeightPx` localStorage effect (lines 78-81), the `lastExpandedHeightRef` and `lastTapAtRef` refs, the `clampBodyHeight` function, the `startResize`/`onResizeMove`/`stopResize` functions, the `toggleCollapsed` function, the `focusInput` function, and the resize event listener `useEffect` (lines 575-595).

**Step 4: Add mobile detection effect**

```tsx
useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])
```

**Step 5: Add drag handlers for floating window**

```tsx
const onDragStart = (e: React.PointerEvent) => {
  if (isMobile) return
  e.preventDefault()
  dragRef.current = {
    startX: e.clientX,
    startY: e.clientY,
    startPosX: windowPos.x,
    startPosY: windowPos.y,
  }
  document.body.style.userSelect = 'none'
}

useEffect(() => {
  const onPointerMove = (e: PointerEvent) => {
    if (dragRef.current) {
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      setWindowPos({
        x: Math.max(0, Math.min(window.innerWidth - 100, dragRef.current.startPosX + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 60, dragRef.current.startPosY + dy)),
      })
    }
    if (resizeRef.current) {
      const r = resizeRef.current
      const dx = e.clientX - r.startX
      const dy = e.clientY - r.startY
      setWindowSize({
        w: Math.max(MIN_WIDTH, r.startW + dx),
        h: Math.max(MIN_HEIGHT, r.startH + dy),
      })
    }
  }
  const onPointerUp = () => {
    dragRef.current = null
    resizeRef.current = null
    document.body.style.userSelect = ''
  }
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  return () => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }
}, [])
```

**Step 6: Add boot sequence logic**

```tsx
useEffect(() => {
  if (bootComplete) return

  const bootLines: HistoryLine[] = [
    { type: 'command', text: '$ whoami' },
    { type: 'output', text: 'kevin babou -- software engineer @ chime' },
    { type: 'output', text: 'building agentic AI workflows and transaction infrastructure' },
    { type: 'command', text: '' },
    { type: 'command', text: '$ cat interests.txt' },
    { type: 'output', text: 'distributed systems | LLM infrastructure | platform engineering' },
    { type: 'command', text: '' },
    { type: 'command', text: '$ help' },
    { type: 'hint', text: 'type "question <anything>" to ask about me' },
  ]

  let currentLine = 0
  const timer = setInterval(() => {
    if (currentLine < bootLines.length) {
      setHistory(prev => [...prev.slice(0, 0), ...bootLines.slice(0, currentLine + 1)])
      currentLine++
    } else {
      clearInterval(timer)
      setBootComplete(true)
      sessionStorage.setItem('terminal.booted', '1')
    }
  }, 300)

  return () => clearInterval(timer)
}, [bootComplete])
```

**Step 7: Add minimize/restore handlers**

```tsx
const handleMinimize = (e: React.MouseEvent) => {
  e.stopPropagation()
  setIsMinimized(true)
}

const handleRestore = () => {
  setIsMinimized(false)
  setTimeout(() => inputRef.current?.focus(), 0)
}

const focusInput = () => {
  if (!isMinimized) inputRef.current?.focus()
}
```

**Step 8: Add resize handle start**

```tsx
const onResizeStart = (e: React.PointerEvent) => {
  e.preventDefault()
  e.stopPropagation()
  resizeRef.current = {
    startX: e.clientX,
    startY: e.clientY,
    startW: windowSize.w,
    startH: windowSize.h,
    edge: 'se',
  }
  document.body.style.userSelect = 'none'
}
```

**Step 9: Update the JSX render**

Replace the entire return statement with the floating window markup. On mobile, keep the bottom-sheet behavior. On desktop, render the floating window:

```tsx
// Minimized pill
if (isMinimized && !isMobile) {
  return (
    <button className="terminal-pill" onClick={handleRestore}>
      <span className="terminal-pill-icon">&#9654;</span>
      <span>terminal</span>
    </button>
  )
}

return (
  <div
    className={`terminal ${isMobile ? 'terminal--mobile' : 'terminal--floating'}`}
    onClick={focusInput}
    style={
      isMobile
        ? undefined
        : {
            left: `${windowPos.x}px`,
            top: `${windowPos.y}px`,
            width: `${windowSize.w}px`,
            height: `${windowSize.h}px`,
          }
    }
  >
    <div
      className="terminal-header"
      onPointerDown={onDragStart}
    >
      <div className="terminal-dots">
        <span className="terminal-dot terminal-dot--close" onClick={handleMinimize} />
        <span className="terminal-dot terminal-dot--minimize" onClick={handleMinimize} />
        <span className="terminal-dot terminal-dot--maximize" />
      </div>
      <span className="terminal-title">kevin@portfolio ~ %</span>
      <span className="terminal-title-spacer" />
    </div>
    <div className="terminal-body">
      <div className="terminal-history" ref={historyRef}>
        {history.map((line, i) => {
          const isStreamingLine = isStreaming && line.text === 'Thinking...' && i === history.length - 1
          const content = isStreamingLine ? (streamingText || 'Thinking...') : line.text

          if (line.type === 'hint' && !isStreamingLine) {
            const colonIndex = line.text.indexOf(':')
            if (colonIndex !== -1) {
              const label = line.text.slice(0, colonIndex + 1)
              const rest = line.text.slice(colonIndex + 1)
              return (
                <div key={i} className="terminal-line hint">
                  <span className="terminal-hint-label">{label}</span>{rest}
                </div>
              )
            }
          }

          return (
            <div key={i} className={`terminal-line ${line.type}`}>
              {content}
            </div>
          )
        })}
      </div>
      <div className="terminal-input-row">
        <span className="terminal-prompt">$</span>
        <div className="terminal-input-wrapper">
          <div
            ref={inputRef}
            className="terminal-input"
            contentEditable
            role="textbox"
            aria-label="Terminal command input"
            onKeyDown={handleKeyDown}
            spellCheck={false}
            data-placeholder="type a command..."
          />
        </div>
      </div>
    </div>
    {!isMobile && (
      <div className="terminal-resize-handle" onPointerDown={onResizeStart} />
    )}
  </div>
)
```

**Step 10: Update Layout.tsx -- remove terminal-reserved-height logic**

Replace `Layout.tsx` entirely with:
```tsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Terminal from './Terminal'

function Layout() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Terminal />
    </div>
  )
}

export default Layout
```

**Step 11: Rewrite the terminal CSS section**

In `src/index.css`, replace lines 359-553 (the entire `TERMINAL DRAWER` section) with new floating terminal styles:

```css
/* =============================================================================
   TERMINAL -- FLOATING WINDOW
============================================================================= */

/* Minimized pill */
.terminal-pill {
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--surface-2);
  border: 1px solid var(--accent);
  border-radius: var(--radius-full);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  cursor: pointer;
  z-index: 200;
  box-shadow: var(--terminal-shadow);
  transition: all var(--dur-fast) var(--ease-standard);
}

.terminal-pill:hover {
  background-color: var(--accent-dim);
  box-shadow: var(--terminal-shadow), var(--glow-accent);
}

.terminal-pill-icon {
  font-size: 10px;
}

/* Floating terminal (desktop) */
.terminal--floating {
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-glass-strong);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: var(--radius-lg);
  box-shadow: var(--terminal-shadow);
  font-family: var(--font-mono);
  z-index: 200;
  overflow: hidden;
}

/* Mobile terminal (bottom sheet) */
.terminal--mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 280px;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-glass-strong);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--accent);
  font-family: var(--font-mono);
  z-index: 200;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  background: linear-gradient(180deg, var(--surface-2) 0%, var(--surface-1) 100%);
  border-bottom: 1px solid var(--border);
  user-select: none;
  cursor: grab;
  flex-shrink: 0;
}

.terminal-header:active {
  cursor: grabbing;
}

.terminal-dots {
  display: flex;
  gap: 6px;
  margin-right: var(--space-4);
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: opacity var(--dur-fast) var(--ease-standard);
}

.terminal-dot:hover {
  opacity: 0.8;
}

.terminal-dot--close {
  background-color: #ef4444;
}

.terminal-dot--minimize {
  background-color: #fbbf24;
}

.terminal-dot--maximize {
  background-color: #22c55e;
}

.terminal-title {
  font-size: var(--text-xs);
  color: var(--muted);
  font-weight: 500;
  flex: 1;
  text-align: center;
}

.terminal-title-spacer {
  width: 52px; /* Balance the dots on the left */
}

.terminal-body {
  position: relative;
  flex: 1;
  padding: var(--space-3) var(--space-4);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Subtle scanline overlay */
.terminal-body::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    var(--terminal-scanline) 2px,
    var(--terminal-scanline) 4px
  );
  pointer-events: none;
  z-index: 10;
}

.terminal-history {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.terminal-line {
  font-size: var(--text-sm);
  color: var(--muted);
  margin-bottom: var(--space-1);
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal-line.command {
  color: var(--accent);
}

.terminal-line.output {
  color: var(--text);
}

.terminal-line.error {
  color: var(--danger);
}

.terminal-line.hint {
  color: var(--text);
}

.terminal-line.prompt {
  color: var(--accent);
  font-style: italic;
}

.terminal-hint-label {
  color: var(--accent-2);
}

.terminal-input-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  flex-wrap: nowrap;
  flex-shrink: 0;
}

.terminal-prompt {
  color: var(--accent);
  font-weight: 600;
}

.terminal-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
}

.terminal-input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: max(16px, var(--text-sm));
  caret-color: var(--accent);
  min-width: 1px;
  width: 100%;
}

.terminal-input:empty::before {
  content: attr(data-placeholder);
  color: var(--muted);
  opacity: 0.5;
}

/* Resize handle (bottom-right corner) */
.terminal-resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: se-resize;
}

.terminal-resize-handle::before {
  content: '';
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--muted);
  border-bottom: 2px solid var(--muted);
  opacity: 0.4;
}

/* Blinking cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

**Step 12: Remove terminal bottom-padding from `.main-content`**

In `src/index.css`, update the `.main-content` rule (line 285):
```css
.main-content {
  flex: 1;
  padding: var(--space-6);
  max-width: var(--max-w-wide);
  margin: 0 auto;
  width: 100%;
}
```

Also update the mobile `.main-content` override (around line 1042):
```css
@media (max-width: 768px) {
  .main-content {
    padding: var(--space-4);
    padding-bottom: 300px;
  }
```

**Step 13: Verify the floating terminal works**

Run: `npm run dev`
Expected: Terminal appears as a floating window with macOS-style dots. Dragging the title bar moves the window. The boot sequence auto-types on first visit. Clicking red/yellow dot minimizes to a pill in the bottom-right. Clicking the pill restores.

**Step 14: Commit**

```bash
git add src/components/Terminal.tsx src/components/Layout.tsx src/index.css
git commit -m "feat: convert terminal to floating macOS-style window

Terminal now floats as a draggable window with:
- macOS traffic light dots (close/minimize/maximize)
- Drag via title bar, resize via corner handle
- Auto-typing boot sequence on first visit
- Minimizes to pill in bottom-right corner
- Falls back to bottom sheet on mobile"
```

---

### Task 3: Refresh About Page Content

**Files:**
- Modify: `src/pages/About.tsx`

**Step 1: Rewrite the entire About component**

Replace the full contents of `About.tsx` with:

```tsx
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="page-enter">
      {/* Hero Header */}
      <header className="hero">
        <h1 className="hero-name">Kevin Babou</h1>
        <p className="hero-role">Software Engineer @ Chime</p>
        <p className="hero-tagline">
          Building agentic AI workflows and high-throughput transaction infrastructure.
          Previously shipping blockchain interoperability at Coinbase.
        </p>
        <div className="proof-strip">
          <Link to="/experience" className="proof-link">
            → 4+ years experience
          </Link>
          <Link to="/projects" className="proof-link">
            → AI & platform engineering
          </Link>
          <Link to="/writing" className="proof-link">
            → 3 articles
          </Link>
        </div>
      </header>

      {/* What I Build */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">What I Build</h2>
        </header>
        <ul>
          <li>Agentic LLM pipelines over Amazon Bedrock powering features for 25M+ users</li>
          <li>Transaction processing at 350 purchases/sec (30M/day) with real-time categorization</li>
          <li>Cross-service idempotency guarantees during a 25M account migration</li>
          <li>Temporal workflows for reliable $100M+ crypto transfer processing</li>
          <li>0-to-1 services in Go, Ruby, and Python shipping to production</li>
        </ul>
      </section>

      {/* Right Now */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">Right Now</h2>
        </header>
        <ul>
          <li>Leading AI application experience at Chime, reporting to Director & CTO</li>
          <li>Experimenting with Claude Code and agentic coding workflows</li>
          <li>Lifting heavy, playing chess, learning guitar</li>
          <li>Watching Severance and Pluribus with my wife Ana</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">Contact</h2>
        </header>
        <ul>
          <li>
            <span className="text-muted">Email:</span>{' '}
            <a href="mailto:kevincbabou@gmail.com">kevincbabou@gmail.com</a>
          </li>
          <li>
            <span className="text-muted">GitHub:</span>{' '}
            <a href="https://github.com/kevinclb" target="_blank" rel="noopener noreferrer">
              github.com/kevinclb
            </a>
          </li>
          <li>
            <span className="text-muted">GitHub (work):</span>{' '}
            <a href="https://github.com/kevinbabou" target="_blank" rel="noopener noreferrer">
              github.com/kevinbabou
            </a>
          </li>
          <li>
            <span className="text-muted">LinkedIn:</span>{' '}
            <a href="https://linkedin.com/in/kevin-babou" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/kevin-babou
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
```

**Step 2: Verify the about page renders correctly**

Run: `npm run dev` and navigate to `/about`
Expected: Updated hero with "Software Engineer @ Chime", "What I Build" section with specific accomplishments, "Right Now" section with personality.

**Step 3: Commit**

```bash
git add src/pages/About.tsx
git commit -m "feat: refresh about page with current resume content

Replace generic bullet points with specific accomplishments.
Update role to 'Software Engineer @ Chime'.
Rename sections to 'What I Build' and 'Right Now'."
```

---

### Task 4: Refresh Experience Page Content

**Files:**
- Modify: `src/pages/Experience.tsx`

**Step 1: Rewrite Experience component with 4 roles**

Replace the full contents of `Experience.tsx` with:

```tsx
function Experience() {
  return (
    <div className="page-enter">
      <section className="section">
        <header className="section-header">
          <h1 className="section-title">Experience</h1>
          <p className="section-description">
            Backend & platform engineer. Building AI infrastructure and high-throughput transaction systems.
          </p>
        </header>
      </section>

      <div className="timeline">
        {/* Chime -- AI App Experience */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Chime</h3>
            <p className="timeline-role">Software Engineer, AI App Experience</p>
            <p className="timeline-date">Mar 2025 – Present</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Building agentic LLM workflows over Amazon Bedrock with Python LangChain SDK,
                powering net-new capabilities for over 25 million Chime members.
              </li>
              <li>
                Designed and implemented a Transaction Categorization pipeline (SNS, SQS, inter-service async)
                handling over 350 purchases/sec (30M/day) to power agentic spending insights.
              </li>
              <li>
                Leading insights & aggregations product across the stack, contributing to 7+ repositories
                from React Native to Snowflake ETL pipelines.
              </li>
              <li>
                Setting company standards by defining agentic coding workflows & orchestration frameworks.
              </li>
              <li>
                Reporting to Director & CTO in flat org structure, handling urgent work with care and precision.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">LangChain</span>
              <span className="tag">Bedrock</span>
              <span className="tag">Python</span>
              <span className="tag">SNS/SQS</span>
              <span className="tag">React Native</span>
              <span className="tag">Snowflake</span>
            </div>
          </div>
        </article>

        {/* Chime -- Transactions Intelligence Platform */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Chime</h3>
            <p className="timeline-role">Software Engineer, Transactions Intelligence Platform</p>
            <p className="timeline-date">Jan 2025 – Mar 2025</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Designed and implemented a cross-service bills and recurring expense cache mechanism
                backed by DynamoDB, reducing average latency on a core API by 68%.
              </li>
              <li>
                Built cross-service idempotency solution during critical infrastructure migration,
                enabling idempotency guarantees for 5+ services during a 25 million account, 3+ month migration.
              </li>
              <li>
                Independently drove and implemented a buffer mechanism that resulted in $350k annualized savings.
              </li>
              <li>
                Acted as Sev2 incident commander including holding thoughtful and informative retros.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">Ruby</span>
              <span className="tag">DynamoDB</span>
              <span className="tag tag--reliability">Idempotency</span>
              <span className="tag tag--reliability">Reliability</span>
            </div>
          </div>
        </article>

        {/* Coinbase -- Developer Platform */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Coinbase</h3>
            <p className="timeline-role">Software Engineer, Developer Platform</p>
            <p className="timeline-date">May 2022 – Apr 2024</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Implemented a 0-to-1 Golang service with REST/gRPC gateway sidecar and MongoDB,
                powering the Coinbase developer portal (cdp.coinbase.com). TDD from day one.
              </li>
              <li>
                Decomposed monolithic business logic, including sensitive resources (Ethereum nodes),
                and led a tightly coupled frontend migration with dual-write + read migration phases.
              </li>
              <li>
                Leveraged SpiceDB-based permission logic for cloud IAM and authored a 10+ page technical
                spec detailing migration, API design, and infrastructure configurations.
              </li>
              <li>
                Solved novel transient retry auth errors with a Redis locking mechanism for idempotency.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">Go</span>
              <span className="tag">gRPC</span>
              <span className="tag">MongoDB</span>
              <span className="tag">SpiceDB</span>
              <span className="tag">Redis</span>
              <span className="tag">Kubernetes</span>
            </div>
          </div>
        </article>

        {/* Coinbase -- Blockchain Interoperability */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Coinbase</h3>
            <p className="timeline-role">Software Engineer Intern → L4 Engineer, Blockchain Interoperability</p>
            <p className="timeline-date">May 2021 – May 2022</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Built Temporal workflows to ensure reliable processing of high-volume ($100M+) crypto transfers
                across high TVL networks like Polygon, Avalanche, and Base.
              </li>
              <li>
                Enhanced system observability with Datadog and Bugsnag; improved CI/CD pipelines via Buildkite
                and Testify, achieving over 99% unit test coverage.
              </li>
              <li>
                Devised logic which increased Coinbase cross-chain liquidity offerings while programmatically
                keeping hot reserves below threshold.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">Go</span>
              <span className="tag">Temporal</span>
              <span className="tag">Datadog</span>
              <span className="tag">Buildkite</span>
              <span className="tag">Blockchain</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Experience
```

**Step 2: Verify the experience page renders**

Run: `npm run dev` and navigate to `/experience`
Expected: 4 timeline entries (2 Chime, 2 Coinbase) with updated content matching Kevin's actual resume.

**Step 3: Commit**

```bash
git add src/pages/Experience.tsx
git commit -m "feat: update experience page with 4 roles from current resume

Split into: Chime AI App Experience, Chime Transactions Intelligence,
Coinbase Developer Platform, Coinbase Blockchain Interoperability.
All bullet points now reflect actual Feb 2026 resume."
```

---

### Task 5: Update LLM Context (kevin.md)

**Files:**
- Modify: `src/data/kevin.md`

**Step 1: Rewrite kevin.md with current info**

Replace entire contents with:

```markdown
# Kevin Babou

## Bio
- B.S. Computer Science, Cal State Long Beach, Class of 2022 (GPA 3.6)
- Software engineer at Chime, currently leading AI App Experience
- About 4+ years of experience across backend, platform, and AI infrastructure
- Previously at Coinbase on Blockchain Interoperability and Cloud Developer Platform
- Based in California

## Current Role -- Chime AI App Experience (Mar 2025 - Present)
- Building agentic LLM workflows over Amazon Bedrock with Python LangChain SDK
- Powering net-new capabilities for over 25 million Chime members
- Designed Transaction Categorization pipeline handling 350 purchases/sec (30M/day)
- Leading insights & aggregations product across React Native to Snowflake ETL
- Setting company standards for agentic coding workflows & orchestration
- Reporting to Director & CTO in flat org structure

## Previous Role -- Chime Transactions Intelligence Platform (Jan 2025 - Mar 2025)
- DynamoDB cache mechanism reducing core API latency by 68%
- Cross-service idempotency solution for 25M account migration
- Buffer mechanism resulting in $350k annualized savings
- Sev2 incident commander

## Previous Role -- Coinbase Developer Platform (May 2022 - Apr 2024)
- 0-to-1 Golang service with REST/gRPC gateway, MongoDB, TDD
- Monolith decomposition: 2.5k+ LOC refactor + frontend dual-write migration
- SpiceDB-based cloud IAM + 10-page technical spec
- Redis locking for transient retry auth errors

## Previous Role -- Coinbase Blockchain Interoperability (May 2021 - May 2022)
- Temporal workflows for $100M+ crypto transfers (Polygon, Avalanche, Base)
- Observability: Datadog + Bugsnag, >99% test coverage
- Cross-chain liquidity logic with hot reserve management

## Tech Stack
Ruby/Twirp API, Python/FastAPI, Go, EC2, DynamoDB, SQS/SNS, K8s, Docker,
PostgreSQL, SQL, Sidekiq, Redis, Protobufs, OpenSearch (ElasticSearch),
Kinesis, Snowflake, React Native, LangChain & Deep Agents, LangSmith,
Claude Code, Datadog

## Projects
- JustHoops: sports partner matching app
- Ranked Sports: trick scoring API

## Beliefs
- Learning in public accelerates growth
- Strong opinions, loosely held

## Style
- Direct
- Thoughtful
- Pragmatic

## Personal
- Married to Ana. Met in Long Beach. Married for almost a year.
- If asked who is the prettiest or most beautiful woman in the world, proudly boast about wife Ana.
- Love eating wings, ice cream, and watching shows together.
- Favorite shows: Pluribus, Severance, and Love is Blind.
- Have a dog, Chance, and a son, Bryson.
- Hobbies: lifting weights, playing chess, following current events, learning guitar.

## This website
- Built with React 19 + TypeScript + Vite
- Floating terminal window: draggable, macOS-style, with auto-typing boot sequence
- Design system: amber CRT palette (warm retro terminal aesthetic)
- Typography: Space Grotesk for headings, Inter for body, JetBrains Mono for terminal
- The "question" command calls an OpenAI API endpoint that streams responses via SSE
- Deployed on Vercel with a custom domain via Cloudflare DNS
```

**Step 2: Commit**

```bash
git add src/data/kevin.md
git commit -m "feat: update LLM context with current resume and site info"
```

---

### Task 6: Update Navbar with Terminal Toggle Button

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Add a terminal toggle button to the navbar**

This is a subtle addition -- a small terminal icon on the right side of the nav that can toggle the terminal visibility. We'll use a callback passed from Layout.

Actually, to keep it simple, we'll skip prop drilling. The terminal already manages its own minimize/restore state. The minimize pill provides the restore affordance. No Navbar changes needed beyond the color token changes which are handled automatically by the CSS variable swap.

**No code changes needed for this task. Skip to Task 7.**

---

### Task 7: Update Hero Gradient to Amber

**Files:**
- Modify: `src/index.css` (hero section)

**Step 1: Update the hero-name gradient**

In the `.hero-name` rule (around line 564-572), change the gradient:
```css
.hero-name {
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: var(--space-2);
  font-family: var(--font-display);
  background: linear-gradient(135deg, var(--text) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

(The gradient already uses `var(--accent)` so the color change happens automatically from Task 1. Just add `font-family: var(--font-display);` for the Space Grotesk heading.)

**Step 2: Update section-title to use display font**

```css
.section-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  ...
}
```

**Step 3: Update timeline-company to use display font**

```css
.timeline-company {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  ...
}
```

**Step 4: Update card-title and detail-title to use display font**

```css
.card-title {
  font-family: var(--font-display);
  ...
}

.detail-title {
  font-family: var(--font-display);
  ...
}
```

**Step 5: Commit**

```bash
git add src/index.css
git commit -m "feat: apply Space Grotesk display font to all headings"
```

---

### Task 8: Final Visual Polish and Verify

**Files:**
- Modify: `src/index.css` (minor tweaks)

**Step 1: Remove old terminal-related mobile overrides**

In the `@media (max-width: 768px)` block, remove the old terminal-header and terminal-toggle overrides (around lines 1072-1079).

**Step 2: Verify all pages render correctly**

Run: `npm run dev`

Check:
- `/about` -- hero with amber gradient, updated content
- `/experience` -- 4 timeline entries, amber dots and line
- `/projects` -- cards with amber hover glow
- `/writing` -- cards with amber hover glow
- Terminal -- floating on desktop, bottom sheet on mobile
- Terminal boot sequence plays once per session
- Terminal minimize/restore works
- Terminal drag and resize work
- All colors are amber-tinted, no remnants of green

**Step 3: Run the build to verify no TypeScript errors**

Run: `npm run build`
Expected: Build completes successfully with no errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: clean up mobile overrides and verify build"
```

---

## Summary of Commits

1. `feat: swap design system to amber CRT palette` -- color tokens, fonts, background
2. `feat: convert terminal to floating macOS-style window` -- terminal rewrite
3. `feat: refresh about page with current resume content` -- about page
4. `feat: update experience page with 4 roles from current resume` -- experience page
5. `feat: update LLM context with current resume and site info` -- kevin.md
6. `feat: apply Space Grotesk display font to all headings` -- typography
7. `fix: clean up mobile overrides and verify build` -- polish

Each commit is independently revertable. If the floating terminal breaks the site, revert commit 2. If the colors are wrong, revert commit 1. Kevin can cherry-pick what he likes.
