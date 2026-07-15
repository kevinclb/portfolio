// The toolbox behind the work. Kept to things Kevin actually reaches for.
// House style: warm and specific, no em dashes.

export interface UseGroup {
  title: string
  note: string
  items: { name: string; note?: string }[]
}

export const uses: UseGroup[] = [
  {
    title: 'Editor and workflow',
    note: 'Where the day actually happens.',
    items: [
      { name: 'Cursor', note: 'my primary editor, with a house rules file that keeps the design honest' },
      { name: 'Claude Code', note: 'agentic coding for the heavier lifts' },
      { name: 'macOS', note: 'daily driver' },
      { name: 'git', note: 'small, revertable commits' },
    ],
  },
  {
    title: 'Languages',
    note: 'The ones I write most, roughly in order.',
    items: [
      { name: 'Python', note: 'FastAPI, LangChain, most of the AI work' },
      { name: 'Go', note: 'services and anything performance sensitive' },
      { name: 'Ruby', note: 'Twirp APIs at Chime' },
      { name: 'TypeScript', note: 'this site, and React Native' },
    ],
  },
  {
    title: 'AI and agents',
    note: 'How I build things that reason and act.',
    items: [
      { name: 'LangChain and deep agents' },
      { name: 'Amazon Bedrock' },
      { name: 'LangSmith', note: 'traces and evals' },
      { name: 'Anthropic models' },
    ],
  },
  {
    title: 'Data and infrastructure',
    note: 'What keeps the systems standing up.',
    items: [
      { name: 'DynamoDB' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'SQS and SNS' },
      { name: 'Kinesis' },
      { name: 'Snowflake' },
      { name: 'Temporal' },
      { name: 'Kubernetes' },
      { name: 'Datadog', note: 'observability I would not ship without' },
    ],
  },
]
