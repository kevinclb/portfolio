export interface Project {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
}

export const projects: Project[] = [
  {
    slug: 'distributed-cache',
    title: 'Distributed Cache System',
    summary: 'A high-performance distributed caching layer built with consistent hashing. Handles millions of requests per second with sub-millisecond latency.',
    tags: ['Go', 'Redis', 'Distributed Systems'],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
  },
  {
    slug: 'cli-task-manager',
    title: 'CLI Task Manager',
    summary: 'A terminal-based task management tool with vim-style keybindings. Syncs with cloud storage for cross-device access.',
    tags: ['Rust', 'CLI', 'Productivity'],
    content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.`,
  },
  {
    slug: 'markdown-compiler',
    title: 'Custom Markdown Compiler',
    summary: 'An extensible markdown-to-HTML compiler with plugin support. Features syntax highlighting and custom directive processing.',
    tags: ['TypeScript', 'Parsing', 'Open Source'],
    content: `Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`,
  },
]

