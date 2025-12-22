export interface Project {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
}

export const projects: Project[] = [
  
  {
    slug: 'terminal-portfolio',
    title: 'This Website: Terminal-First Portfolio',
    summary: 'A terminal-inspired portfolio with an embedded CLI, streaming LLM responses, and a design system built for recruiters. Shipped in one afternoon.',
    tags: ['React', 'Vite', 'OpenAI', 'Vercel'],
    content: `This website is the project. I built it from scratch in a single afternoon — a terminal-first portfolio that lets visitors navigate via CLI commands and ask questions answered by an LLM trained on my background. Here's the full technical breakdown.

## Stack Overview

Frontend: React 18 + TypeScript, bundled with Vite. No component library — just a custom design system with CSS variables for tokens (colors, spacing, typography, motion). The terminal is a contentEditable div (not an input) to bypass browser password autofill detection. Routing via react-router-dom with a persistent Layout component that keeps the terminal drawer fixed at the bottom.

Backend: Vercel serverless functions. A single /api/ask endpoint handles the LLM integration. The function streams responses using the Fetch API's ReadableStream, sending Server-Sent Events (SSE) back to the client for real-time token rendering.

## Terminal Architecture

The terminal maintains a history array of typed lines with types: command, output, error, and hint (for styled help text). Commands are parsed in a single handleKeyDown handler — no formal lexer, just string matching and startsWith checks. Navigation commands call react-router's navigate(); the cd command accepts routes as arguments.

The input uses contentEditable instead of <input type="text"> because browsers aggressively offer password autofill on any text input. Switching to contentEditable required custom placeholder rendering via CSS :empty::before and manual textContent management, but eliminated the autofill popup entirely.

The terminal drawer is resizable via pointer events on the header. State is persisted to localStorage so the height survives page reloads. Double-click collapses; drag to resize. Keyboard users can use arrow keys when focused on the header.

## LLM Integration

The /api/ask endpoint accepts a POST with { question: string }, constructs a system prompt with my background context, and calls OpenAI's chat completions API with stream: true. The response is piped through a TransformStream that formats chunks as SSE:

data: {"content":"token"}
data: [DONE]

On the frontend, handleQuestion reads the stream with a ReadableStream reader, accumulates tokens into state, and updates a streamingText value that replaces the "Thinking..." placeholder in real-time. Error handling gracefully degrades — if the stream fails, the "Thinking..." line is replaced with an error message.

## Design System

All styling uses CSS custom properties defined in index.css. Colors follow a dark-first palette with a neon green accent (#39ff14). Typography uses two fonts: Sora for headings/body, JetBrains Mono for terminal/code/tags. Spacing follows an 8px grid. Motion respects prefers-reduced-motion.

The cursor rules file (.cursor/rules/RULE.md) encodes the design system constraints: no inline styles, no one-off values, component reuse, accessible focus states. This acts as a contract for AI-assisted development — any changes proposed by Cursor must follow these rules.

## Deployment

Vercel handles deployment. The repo is connected to Vercel via GitHub integration — every push to main triggers a build. The domain is registered on Cloudflare with DNS-only CNAME records pointing to cname.vercel-dns.com. Vercel handles SSL termination.

Environment variables (OPENAI_API_KEY) are configured in Vercel's dashboard. The serverless function cold-starts in ~100ms; warm invocations are ~20ms before OpenAI latency.

## Future Plans

I want to add: (1) tab autocomplete for commands, (2) persistent command history with up/down arrow navigation, (3) a "metrics" command that shows fake SRE-style dashboards (p99 latency, error rates) to demonstrate observability thinking, (4) a "trace" command that renders a mock distributed trace, and (5) syntax highlighting for code blocks in LLM responses.

The goal is to make this portfolio feel like a production system — polished, observable, and interactive — while showcasing the kind of tooling I actually enjoy building.`,
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
  }
]

