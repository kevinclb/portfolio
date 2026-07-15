// Real posts from Kevin's Substack, "Thoughts and Schemes".
// The writing page teases these and links out. The full essays live on Substack.
// To refresh: fetch https://kevinclb.substack.com/api/v1/posts?limit=20 and update below.

export const SUBSTACK = {
  name: 'Thoughts and Schemes',
  tagline: 'Engineer, tinkerer, wanderer, enjoyer of life and learning.',
  url: 'https://kevinclb.substack.com',
  subscribeUrl: 'https://kevinclb.substack.com/subscribe',
} as const

export interface SubstackPost {
  title: string
  subtitle: string
  /** ISO date for sorting + tabular display. */
  date: string
  url: string
  readingTime: string
  /** The exact opening line, used as the teaser hook. */
  hook: string
}

export const posts: SubstackPost[] = [
  {
    title: 'Hacking your AI workflow, part 1',
    subtitle: "I don't know how many parts this is going to have.",
    date: '2026-07-15',
    url: 'https://kevinclb.substack.com/p/hacking-your-ai-workflow-part-1',
    readingTime: '2 min',
    hook: "I've been using something for a while now that's quietly changing how I work and plan. The problem it solves is simple: it's tiring, cumbersome, and slow to constantly type to prompt.",
  },
  {
    title: 'LLMs, Agents, and Psychosis',
    subtitle: "We shouldn't be this easily duped.",
    date: '2026-05-16',
    url: 'https://kevinclb.substack.com/p/llms-agents-and-psychosis',
    readingTime: '3 min',
    hook: "I'm a believer in LLMs and a techno-optimist amidst a radically changing landscape. I work on these systems in my day job, and I want a world where everyone can learn and build and truly do, anything. Which is exactly why the way we're being duped bothers me.",
  },
  {
    title: "you're trying too hard.",
    subtitle: 'honestly, we all are.',
    date: '2026-03-01',
    url: 'https://kevinclb.substack.com/p/youre-trying-too-hard',
    readingTime: '3 min',
    hook: "When we study, we try to write down everything, every relationship and every detail, memorized on the spot. It turns out the move is the opposite: jot down fragments as you go, let yourself get it wrong, and earn the understanding later.",
  },
]
