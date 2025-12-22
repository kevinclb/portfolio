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
    content: `The hardest part of building software isn't adding features — it's knowing what to leave out. Every line of code is a liability: something to maintain, debug, and explain. The best systems aren't the ones with the most capabilities. They're the ones where every piece earns its place.

Simplicity isn't about doing less. It's about clarity of purpose. A simple system makes the right tradeoffs obvious. It has fewer moving parts, which means fewer ways to break. When something does go wrong, you can hold the whole thing in your head long enough to fix it.

The trap is thinking simplicity comes naturally. It doesn't. Complexity is the default — it accretes with every rushed decision, every "we'll clean this up later," every feature added without removing something else. Simplicity requires active resistance: saying no, deleting code, and revisiting assumptions.

If you want to write better software, start by asking what you can remove. The best code is often the code you don't write.`,
  },
  {
    slug: 'terminal-workflows',
    title: 'Building Better Terminal Workflows',
    date: '2024-11-28',
    summary: 'A deep dive into customizing your terminal environment for maximum productivity. From shell aliases to custom scripts.',
    content: `Your terminal is the closest thing to a superpower that software gives you. But most of us leave it stock — default prompts, no aliases, scattered dotfiles we copy-paste from Stack Overflow and never revisit.

The best terminal setups aren't about aesthetics. They're about removing friction from the things you do fifty times a day. A well-tuned shell should feel like muscle memory: git status becomes gs, directory navigation collapses into a few keystrokes, and complex pipelines get wrapped in functions you actually remember.

Start small. Pick the three commands you type most often and alias them. Then build up: add a prompt that shows git branch and status, configure fzf for fuzzy history search, write a function that spins up your dev environment in one shot. Each tweak compounds.

The real unlock isn't any single tool — it's the habit of noticing friction and scripting it away. Treat your dotfiles like code: version them, document them, iterate on them. Over time, your terminal becomes an extension of how you think, not just a place where you type commands.`,
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

