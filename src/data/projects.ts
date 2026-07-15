export interface Project {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
}

export const projects: Project[] = [
  {
    slug: 'caret-portfolio',
    title: 'This Website: Caret',
    summary:
      "The site you're on. I rebuilt it on Caret, a monochrome design system with one cobalt accent, unconventionally big headers, and a writing page wired straight to my Substack.",
    tags: ['React', 'Vite', 'Design system', 'Vercel'],
    content: `This website is the project. It's built on **Caret**, a small, opinionated design system I use for kevinbabou.dev: near-white paper, warm-free ink, and exactly one cobalt accent used as a signal rather than decoration. The look borrows Apple's confidence and scale, Notion's calm reading surfaces, and a few Cursor and Vercel sprinkles: mono labels, hairline structure, ink-black bands, and a blinking caret that ends the display headlines.

## Stack overview

Frontend: React 19 and TypeScript, bundled with Vite. No component library and no utility framework, just Caret's single stylesheet of design tokens (\`--color-*\`, \`--font-*\`, \`--space-*\`, \`--radius-*\`) and a thin component layer (\`.btn\`, \`.card\`, \`.post\`, \`.band\`, \`.prose\`). Every color, font size, and radius on the page reads from those variables, so nothing is hard-coded. Routing is react-router-dom with a persistent frosted nav.

Backend: Vercel serverless functions for the contact path. Deploys are wired to GitHub, so every push to main triggers a build, with DNS on Cloudflare and SSL terminated by Vercel.

## The design language

One typeface does the talking: Instrument Sans for everything from body to the oversized \`.display-1\`, with Geist Mono carrying the engineering details like eyebrows, dates, tags, and code. Structure comes from hairlines and whitespace, not shadows or gradients. The one dramatic move is the \`.band\`, a full-bleed ink section that re-themes every token inside it, used for the stats and the closing contact.

## Writing, straight from Substack

The writing page doesn't host essays. It teases my real Substack, *Thoughts and Schemes*, and links out. Post metadata lives in a single typed data file sourced from Substack's public posts API, so the featured essay, its opening hook, and the hairline-ruled rows all stay in sync with what I've actually published. Subscribing hands off to Substack's own flow, which owns the list and delivery.

## Why rebuild it this way

The previous version of this site was a terminal-themed, dark, neon-accented experiment. Caret is the opposite bet: quiet, monochrome, and typographic, letting the work and the writing carry the page instead of the chrome. It's the kind of restraint I find harder, and more satisfying, to get right.`,
  },
  {
    slug: 'distributed-lock',
    title: 'Distributed Lock System',
    summary:
      'A fault-tolerant distributed lock built on Redis, designed to make retry-prone API flows safe to resume without double-processing.',
    tags: ['Go', 'Redis', 'Distributed Systems'],
    content: `A fault-tolerant distributed lock system built on Redis as the coordination layer, made for a high-scale crypto developer platform. Each lock is scoped to a composite key (user_id and organization_id), which gives fine-grained isolation for multitenant workflows. The service uses atomic Lua scripts (SET NX and EX with key expiry) for mutual exclusion and session expiry that holds up under high concurrency and process restarts.

The point of the system is idempotent retries. Some API flows are prone to refresh-and-retry races, and a naive retry can process the same work twice. By keeping lock ownership and intermediate transactional state in Redis, any later invocation, whether from a client retry or a failover, can resume from the last known checkpoint instead of starting over. That gives recovery from partial failures without the risk of double-processing.

The result is a coordinated, stateful retry mechanism for distributed transactions across microservices that still scales horizontally. It backs flows like multi-account asset refreshes, ledger updates, and webhook processing, with at-least-once execution guarantees and observability hooks on the key lock lifecycles for debugging.`,
  },
  {
    slug: 'cli-task-manager',
    title: 'CLI Task Manager',
    summary:
      'A terminal task manager with vim-style keybindings that syncs to the cloud for cross-device access.',
    tags: ['Go', 'CLI', 'Productivity'],
    content: `A command-line task manager written in Go for developers who live in their terminal. It has quick commands for adding, listing, and completing tasks, fast fuzzy search, and keyboard shortcuts inspired by vim.

Tasks can be organized with tags and deadlines, and everything syncs to a cloud backend for cross-device access.

It's meant to be lightweight, scriptable, and genuinely productive for power users.`,
  },
  {
    slug: 'witeboard',
    title: 'Witeboard: Real-Time Collaborative Whiteboard',
    summary:
      'A globally distributed collaborative whiteboard with sub-100ms sync, an infinite canvas, and a server that acts as the single source of truth for event ordering.',
    tags: ['TypeScript', 'WebSockets', 'PostgreSQL', 'React'],
    content: `Witeboard is a globally distributed, real-time collaborative whiteboard. Multiple people anywhere in the world can draw, sketch, and create together on a shared infinite canvas. It supports freehand drawing with a few brush types (pencil, marker, paintbrush), geometric shapes, text annotations, and an eraser, all synced in real time at sub-100ms latency. You can pan and zoom the canvas with mobile-first touch controls, and signed-in users get private boards alongside the global public one.

## Consistency model and architecture

The system uses a strong consistency model where the server is the single source of truth for event ordering. It's a monorepo with three packages: a React and Vite client, a Node.js WebSocket server, and shared TypeScript types. Drawing operations are captured as immutable events (strokes, shapes, text, deletions) and sent to the server, which assigns authoritative sequence numbers before persisting to PostgreSQL and broadcasting to every connected client. That append-only event log makes replay deterministic: any client can rebuild the exact canvas state by replaying events in order, so everyone sees identical content regardless of network timing.

## Canvas rendering

The frontend uses a three-layer canvas for 60fps rendering: a history canvas for confirmed content, a live canvas for in-progress strokes and previews, and a cursor overlay for other people's pointers. Drawing through React state would be too slow, so the engine renders imperatively with direct Canvas 2D calls and world-coordinate transforms for smooth pan and zoom. The tricky part was z-ordering between layers. Local strokes on the live canvas could visually cover shapes on the history canvas, so confirmed events have to be synchronized carefully as they arrive to keep the visual order correct.

## Deployment and infrastructure

The app ships as a multi-stage Docker build that serves the compiled React frontend as static assets from the same Node.js server handling WebSocket connections. Auth is Clerk with JWT verification, covering both anonymous drawing on the public board and authenticated private boards. PostgreSQL runs as a managed service with idempotent migrations on startup. The whole stack is TypeScript end to end, so the API contracts between client, server, and shared packages stay in sync.`,
  },
]
