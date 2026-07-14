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
    summary: 'The site you\'re on — rebuilt on Caret, a monochrome design system with one cobalt accent, unconventionally big headers, and a writing page wired straight to my Substack.',
    tags: ['React', 'Vite', 'Design system', 'Vercel'],
    content: `This website is the project. It's built on **Caret** — a small, opinionated design system I use for kevinbabou.dev: near-white paper, warm-free ink, and exactly one cobalt accent used as a signal, not decoration. The look borrows Apple's confidence and scale, Notion's calm reading surfaces, and a few Cursor/Vercel sprinkles — mono labels, hairline structure, ink-black bands, and a blinking caret that ends the display headlines.

## Stack Overview

Frontend: React 19 + TypeScript, bundled with Vite. No component library and no utility framework — just Caret's single stylesheet of design tokens (\`--color-*\`, \`--font-*\`, \`--space-*\`, \`--radius-*\`) and a thin component layer (\`.btn\`, \`.card\`, \`.post\`, \`.band\`, \`.prose\`). Every color, font size and radius on the page reads from those variables; nothing is hard-coded. Routing is react-router-dom with a persistent frosted nav.

Backend: Vercel serverless functions for the contact path. Deploys are wired to GitHub — every push to main triggers a build — with DNS on Cloudflare and SSL terminated by Vercel.

## The design language

One typeface does the talking: Instrument Sans for everything from body to the oversized \`.display-1\` (it clamps up to 124px at −0.042em), with Geist Mono carrying the engineering details — eyebrows, dates, tags, code. Structure comes from hairlines and whitespace, not shadows or gradients. The one dramatic move is the \`.band\`: a full-bleed ink-black section that re-themes every token inside it, used for the stats and the closing contact call.

## Writing, straight from Substack

The writing page doesn't host essays — it teases my real Substack, *Thoughts and Schemes*, and links out. Post metadata lives in a single typed data file sourced from Substack's public posts API, so the featured essay, its opening hook, and the hairline-ruled rows all stay in sync with what I've actually published. Subscribing hands off to Substack's own flow, which owns the list and delivery.

## Why rebuild it this way

The previous version of this site was a terminal-themed, dark, neon-accented experiment. Caret is the opposite bet: quiet, monochrome, and typographic, letting the work and the writing carry the page instead of the chrome. It's the kind of restraint I find harder — and more satisfying — to get right.`,
  },
  {
    slug: 'distributed-lock',
    title: 'Distributed Lock System',
    summary: 'A high-performance distributed caching layer built with consistent hashing. Handles millions of requests per second with sub-millisecond latency.',
    tags: ['Go', 'Redis', 'Distributed Systems'],
    content: `Implemented a fault-tolerant distributed lock system using Redis as the coordination layer, designed specifically for a high-scale crypto cloud developer platform. Each lock is scoped to a composite primary key (user_id:organization_id), providing fine-grained isolation for multitenant workflows. The microservice responsible for lock orchestration leverages Redis with reliable, atomic Lua scripts (using SET NX/EX and key-expiry strategies) for robust mutual exclusion and session expiry, even under high concurrency and process restarts.

This system was architected to power idempotent retry semantics for API flows prone to refresh-retry race conditions. By persisting lock ownership and intermediate transactional state to Redis, the service enables any subsequent invocation—triggered by a client retry or API failover—to safely resume from the last known checkpoint. This provides recovery from partial failures without the risk of double-processing, aligning with distributed transaction best practices (e.g., SAGA-style orchestration and poison-pill prevention).

The result is a coordinated, stateful retry mechanism supporting distributed transactions across microservices, while remaining horizontally scalable. The solution underpins critical platform flows such as multi-account asset refreshes, transactional ledger updates, and webhook processing, ensuring correctness and at-least-once execution guarantees at scale, with observability hooks tied to key lock lifecycles for debugging and analytics.`,
  },
  {
    slug: 'cli-task-manager',
    title: 'CLI Task Manager',
    summary: 'A terminal-based task management tool with vim-style keybindings. Syncs with cloud storage for cross-device access.',
    tags: ['Go', 'CLI', 'Productivity'],
    content: `A command-line task manager written in Go for developers who live in their terminal. Features intuitive commands for adding, listing, and completing tasks, with fast fuzzy search and keyboard shortcuts inspired by vim.

Tasks can be organized with tags and deadlines, and all data syncs securely to a cloud backend for seamless cross-device access.

Designed to be lightweight, scriptable, and productive for power users.`,
  },
  {
    slug: 'witeboard',
    title: 'Witeboard — Real-Time Collaborative Whiteboard',
    summary: 'A globally distributed, real-time collaborative whiteboard with sub-100ms sync latency, infinite canvas, and strong consistency guarantees.',
    tags: ['TypeScript', 'WebSockets', 'PostgreSQL', 'React', 'Railway'],
    content: `Witeboard is a globally distributed, real-time collaborative whiteboard that enables multiple users anywhere in the world to draw, sketch, and create together on a shared infinite canvas. Inspired by tools like Excalidraw and Figma, the platform supports freehand drawing with multiple brush types (pencil, marker, paintbrush), geometric shapes (rectangles, ellipses, lines), text annotations, and a full-featured eraser—all synchronized in real-time with sub-100ms latency. Users can pan and zoom the infinite canvas, with mobile-first touch controls, and authenticated users can create private whiteboards for personal or team use alongside the global public canvas.

## Consistency Model & Architecture

The system is built on a strong consistency model where the server acts as the single source of truth for event ordering. The architecture follows a monorepo structure with three packages: a React + Vite client, a Node.js WebSocket server, and shared TypeScript types. Drawing operations are captured as immutable events (strokes, shapes, text, deletions) and sent to the server, which assigns authoritative sequence numbers before persisting to PostgreSQL and broadcasting to all connected clients. This append-only event log enables deterministic replay—any client can reconstruct the exact canvas state by replaying events in sequence order, ensuring all users see identical content regardless of network timing.

## Canvas Rendering Architecture

The frontend employs a three-layer canvas architecture optimized for 60fps rendering: a history canvas for confirmed content, a live canvas for in-progress strokes and real-time previews, and a cursor overlay for displaying other users' pointer positions. Rather than using React state for drawing (which would be too slow), the canvas engine uses imperative rendering with direct Canvas 2D API calls, with world-coordinate transformations enabling smooth pan/zoom. A key technical challenge involved managing z-ordering between layers—local strokes on the live canvas could visually obscure shapes on the history canvas, requiring careful synchronization when server-confirmed events arrive to maintain correct visual ordering.

## Deployment & Infrastructure

The application is deployed on Railway with a multi-stage Docker build, serving the compiled React frontend as static assets from the same Node.js server that handles WebSocket connections. Authentication is handled via Clerk with JWT verification, supporting both anonymous drawing on the public board and authenticated private whiteboards. The PostgreSQL database runs as a managed Railway service with idempotent migrations executed on server startup. The entire stack is TypeScript end-to-end, with strict type checking ensuring API contracts between client, server, and shared packages remain synchronized across the distributed system.`,
  }
]

