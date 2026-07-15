// Work history from Kevin's résumé. `companies` drives the collapsible work
// section on the home page; `roles` drives the full /experience timeline.
// House style: warm and specific, and no em dashes anywhere.

export interface Company {
  name: string
  period: string
  role: string
  highlights: { lead: string; body: string }[]
}

export const companies: Company[] = [
  {
    name: 'Chime',
    period: '2025 to present',
    role: 'Software engineer on AI app experience and transactions intelligence.',
    highlights: [
      {
        lead: 'Agentic pipelines at consumer scale',
        body: 'I build agentic LLM workflows on Amazon Bedrock with the LangChain SDK, powering new capabilities for 25M+ members inside a tightly regulated environment.',
      },
      {
        lead: 'Transaction categorization pipeline',
        body: 'A self healing async system on SNS and SQS that handles 350 purchases a second, roughly 30M a day, and cut uncategorizable transactions by over 30%.',
      },
      {
        lead: 'Insights and aggregations across the stack',
        body: 'I lead this product across 7+ repos, from React Native down to the Snowflake ETL, and helped set how our team codes with agents.',
      },
      {
        lead: 'Infrastructure that holds',
        body: 'Cross service idempotency through a 25M account migration, a DynamoDB cache that cut core API latency by 68%, and a buffer worth about $350k a year.',
      },
    ],
  },
  {
    name: 'Coinbase',
    period: '2021 to 2024',
    role: 'Software engineer on developer platform and blockchain interoperability.',
    highlights: [
      {
        lead: 'Developer platform from zero',
        body: 'I built the Go service behind cdp.coinbase.com with a gRPC gateway, test driven from day one, decomposed a monolith around sensitive Ethereum node resources, and led the SpiceDB based IAM migration.',
      },
      {
        lead: 'Money that cannot be lost',
        body: 'Temporal workflows that moved $100M+ across Polygon, Avalanche, and Base, kept honest by 99%+ test coverage and Datadog.',
      },
    ],
  },
]

export interface Role {
  company: string
  title: string
  period: string
  bullets: string[]
  tags: string[]
}

export const roles: Role[] = [
  {
    company: 'Chime',
    title: 'Software engineer, AI app experience',
    period: 'Mar 2025 to present',
    bullets: [
      'Build agentic LLM workflows on Amazon Bedrock with the Python LangChain SDK, powering new capabilities for over 25 million members.',
      'Designed and shipped a transaction categorization pipeline (SNS, SQS, inter service async) handling 350 purchases a second, around 30M a day, to power spending insights.',
      'Lead the insights and aggregations product across the whole stack, contributing to 7+ repos from React Native to Snowflake ETL.',
      'Help set company standards for how we code with agents and orchestrate them.',
      'Report to the Director and CTO in a flat org, handling urgent work with care.',
    ],
    tags: ['LangChain', 'Bedrock', 'Python', 'SNS/SQS', 'React Native', 'Snowflake'],
  },
  {
    company: 'Chime',
    title: 'Software engineer, transactions intelligence platform',
    period: 'Jan 2025 to Mar 2025',
    bullets: [
      'Designed a cross service bills and recurring expense cache on DynamoDB that cut average latency on a core API by 68%.',
      'Built a cross service idempotency solution during a critical migration, giving 5+ services idempotency guarantees across a 25 million account, 3 month move.',
      'Independently shipped a buffer mechanism that saves about $350k a year.',
      'Acted as Sev2 incident commander, including running thoughtful retros afterward.',
    ],
    tags: ['Ruby', 'DynamoDB', 'Idempotency', 'Reliability'],
  },
  {
    company: 'Coinbase',
    title: 'Software engineer, developer platform',
    period: 'May 2022 to Apr 2024',
    bullets: [
      'Built a 0 to 1 Golang service with a REST and gRPC gateway on MongoDB, powering the Coinbase developer portal at cdp.coinbase.com, test driven from day one.',
      'Decomposed monolithic business logic, including sensitive Ethereum node resources, and led a tightly coupled frontend migration with dual write and read phases.',
      'Used SpiceDB for cloud IAM permissions and wrote a 10+ page technical spec covering migration, API design, and infrastructure.',
      'Solved transient retry auth errors with a Redis locking mechanism for idempotency.',
    ],
    tags: ['Go', 'gRPC', 'MongoDB', 'SpiceDB', 'Redis', 'Kubernetes'],
  },
  {
    company: 'Coinbase',
    title: 'Software engineer, blockchain interoperability (intern to L4)',
    period: 'May 2021 to May 2022',
    bullets: [
      'Built Temporal workflows for reliable processing of high volume ($100M+) crypto transfers across high TVL networks like Polygon, Avalanche, and Base.',
      'Improved observability with Datadog and Bugsnag, and strengthened CI/CD with Buildkite and Testify, reaching over 99% unit test coverage.',
      'Wrote logic that grew cross chain liquidity while keeping hot reserves under threshold.',
    ],
    tags: ['Go', 'Temporal', 'Datadog', 'Buildkite', 'Blockchain'],
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
  { num: '$350k', label: 'saved a year from one buffer' },
  { num: '$100M+', label: 'in cross chain transfers processed' },
]
