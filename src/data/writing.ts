export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'on-simplicity',
    title: 'On Simplicity in Software Design',
    date: '2024-12-15',
    summary: 'Why the best code is often the code you don\'t write. Thoughts on minimalism and intentional design in software engineering.',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
  },
  {
    slug: 'terminal-workflows',
    title: 'Building Better Terminal Workflows',
    date: '2024-11-28',
    summary: 'A deep dive into customizing your terminal environment for maximum productivity. From shell aliases to custom scripts.',
    content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.`,
  },
  {
    slug: 'learning-in-public',
    title: 'The Case for Learning in Public',
    date: '2025-08-05',
    summary: 'How sharing your learning journey can accelerate growth and build meaningful connections in the developer community.',
    content: `Most of us are taught to hide our learning until it looks polished. To wait until we "know enough." To ship only finished thoughts. But that mindset quietly slows us down.

Learning in public flips that model. It treats confusion as signal, curiosity as momentum, and progress as something worth sharing before it's perfect. Writing notes, asking half-formed questions, and documenting what you don't yet understand isn't a liability — it's a compounding advantage.

When you learn in public, you build feedback loops instead of silos. You attract people who are one step ahead of you — and help those one step behind. You turn studying into leverage, and practice into proof of work. Over time, your thinking sharpens faster because it's exposed to reality, not just your own head.

This isn't about personal branding or chasing an audience. It's about building a habit of honest thinking, visible iteration, and long-term skill accumulation. The internet just happens to be the best notebook we've ever had.

Learning in public doesn't mean you're an expert. It means you're serious.`,
  },
]

