// Work history, drawn from Kevin's résumé. Rendered as the home page's work
// section — company label beside hairline-ruled highlights.

export interface Company {
  name: string
  period: string
  role: string
  highlights: { lead: string; body: string }[]
}

export const companies: Company[] = [
  {
    name: 'Chime',
    period: '2025 — present',
    role: 'Software engineer, AI app experience & transactions intelligence.',
    highlights: [
      {
        lead: 'Agentic pipelines at consumer scale',
        body: 'agentic LLM workflows over Amazon Bedrock with the LangChain SDK, powering net-new capabilities for 25M+ members in a highly compliant environment.',
      },
      {
        lead: 'Transaction categorization pipeline',
        body: 'a self-healing async system (SNS/SQS) handling 350 purchases/sec — 30M/day — that cut uncategorizable transactions by over 30%.',
      },
      {
        lead: 'Insights & aggregations across the stack',
        body: 'led the product across 7+ repos, from React Native down to the Snowflake ETL, and set company standards for agentic coding workflows.',
      },
      {
        lead: 'Infrastructure that holds',
        body: 'cross-service idempotency through a 25M-account migration, a DynamoDB cache that cut core-API latency 68%, and a buffer worth $350k a year.',
      },
    ],
  },
  {
    name: 'Coinbase',
    period: '2021 — 2024',
    role: 'Software engineer, developer platform & blockchain interoperability.',
    highlights: [
      {
        lead: 'Developer platform from zero',
        body: 'built the Go service behind cdp.coinbase.com with a gRPC gateway and TDD from day one, decomposed a monolith around sensitive Ethereum-node resources, and led the SpiceDB-based IAM migration.',
      },
      {
        lead: "Money that can't be lost",
        body: 'Temporal workflows processing $100M+ in cross-chain transfers over Polygon, Avalanche and Base, at 99%+ test coverage with Datadog observability.',
      },
    ],
  },
]

export const stack: string[] = [
  'Python / FastAPI',
  'Go',
  'Ruby / Twirp',
  'LangChain & deep agents',
  'Claude Code',
  'DynamoDB',
  'PostgreSQL',
  'SQS / SNS',
  'Kinesis',
  'Redis',
  'Temporal',
  'Kubernetes',
  'Snowflake',
  'React Native',
  'Datadog',
]

export const stats = [
  { num: '30%', label: 'fewer uncategorizable transactions' },
  { num: '68%', label: 'latency cut on a core API' },
  { num: '$350k', label: 'annualized savings from one buffer' },
  { num: '$100M+', label: 'in cross-chain transfers processed' },
]
