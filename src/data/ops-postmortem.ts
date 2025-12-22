export interface TimelineEvent {
  time: string
  description: string
  actor?: string
}

export interface ActionItem {
  id: string
  description: string
  owner: string
  priority: 'P0' | 'P1' | 'P2'
  dueDate: string
  status: 'open' | 'in_progress' | 'completed'
}

export interface Postmortem {
  id: string
  title: string
  severity: 'SEV-1' | 'SEV-2' | 'SEV-3'
  date: string
  duration: string
  services: string[]
  authors: string[]
  summary: string
  impact: {
    transactions: number
    revenue: string
    customers: number
  }
  timeline: TimelineEvent[]
  rootCause: string
  contributing: string[]
  whatWorked: string[]
  whatDidnt: string[]
  actionItems: ActionItem[]
}

export const postmortem: Postmortem = {
  id: 'PM-2024-089',
  title: 'Fraud Detection Service Outage',
  severity: 'SEV-1',
  date: '2024-12-18',
  duration: '47 minutes',
  services: ['fraud-detection', 'payment-gateway'],
  authors: ['Platform Team', 'Risk Engineering'],
  summary: 'A model deployment with an incompatible feature schema caused the fraud detection service to return errors for all scoring requests, resulting in payment failures across the platform.',
  impact: {
    transactions: 12400,
    revenue: '$847,000 delayed',
    customers: 3200
  },
  timeline: [
    { time: '14:23 UTC', description: 'ML team deploys fraud model v2.5.0 to production', actor: 'ml-deploy-bot' },
    { time: '14:24 UTC', description: 'Fraud detection error rate spikes to 100%' },
    { time: '14:25 UTC', description: 'PagerDuty alert fires: fraud-detection-error-rate-critical', actor: 'PagerDuty' },
    { time: '14:27 UTC', description: 'On-call engineer acknowledges alert', actor: 'Alice (Risk Eng)' },
    { time: '14:31 UTC', description: 'Payment Gateway begins returning 500 errors due to fraud service dependency' },
    { time: '14:33 UTC', description: 'Customer support reports spike in failed payment complaints' },
    { time: '14:38 UTC', description: 'Root cause identified: model expects feature "device_trust_score" not present in request', actor: 'Alice (Risk Eng)' },
    { time: '14:42 UTC', description: 'Decision made to rollback model deployment', actor: 'Bob (ML Lead)' },
    { time: '14:45 UTC', description: 'Model rollback initiated to v2.4.1', actor: 'ml-deploy-bot' },
    { time: '14:52 UTC', description: 'Rollback complete, error rates returning to normal' },
    { time: '15:10 UTC', description: 'All metrics nominal, incident resolved', actor: 'Alice (Risk Eng)' }
  ],
  rootCause: 'The ML model v2.5.0 was trained on a feature set that included "device_trust_score", a new feature from the device fingerprinting pipeline. However, the feature pipeline change had not been deployed to production yet. The model deployment process did not validate feature schema compatibility, allowing an incompatible model to reach production.',
  contributing: [
    'No feature schema validation in model deployment pipeline',
    'Model and feature pipeline deployments not coordinated',
    'Canary deployment was only 1% and error budget was not exceeded before full rollout',
    'Fraud service lacked graceful degradation for model inference failures'
  ],
  whatWorked: [
    'Alert fired within 2 minutes of error spike',
    'On-call response time was under 5 minutes',
    'Rollback process was quick and well-documented',
    'Cross-team communication was effective during incident'
  ],
  whatDidnt: [
    'Deployment validation did not catch schema mismatch',
    'Canary analysis window (5 min) was too short to catch gradual impact',
    'No automatic rollback trigger despite 100% error rate',
    'Runbook did not cover ML model-specific failure modes'
  ],
  actionItems: [
    {
      id: 'AI-1',
      description: 'Implement feature schema validation in model deployment pipeline',
      owner: 'ML Platform',
      priority: 'P0',
      dueDate: '2024-12-25',
      status: 'in_progress'
    },
    {
      id: 'AI-2',
      description: 'Add automatic rollback trigger when error rate exceeds 50%',
      owner: 'Risk Engineering',
      priority: 'P0',
      dueDate: '2024-12-27',
      status: 'open'
    },
    {
      id: 'AI-3',
      description: 'Extend canary analysis window to 15 minutes with traffic ramp',
      owner: 'ML Platform',
      priority: 'P1',
      dueDate: '2025-01-03',
      status: 'open'
    },
    {
      id: 'AI-4',
      description: 'Implement graceful degradation: fallback to rules-based scoring on model failure',
      owner: 'Risk Engineering',
      priority: 'P1',
      dueDate: '2025-01-10',
      status: 'open'
    },
    {
      id: 'AI-5',
      description: 'Update fraud-detection runbook with ML-specific troubleshooting steps',
      owner: 'Risk Engineering',
      priority: 'P2',
      dueDate: '2025-01-15',
      status: 'open'
    }
  ]
}

export function formatPostmortem(): string[] {
  const lines: string[] = []
  
  lines.push(`╔═══════════════════════════════════════════════════════════╗`)
  lines.push(`║  POSTMORTEM: ${postmortem.title.padEnd(44)}║`)
  lines.push(`╚═══════════════════════════════════════════════════════════╝`)
  lines.push('')
  lines.push(`ID: ${postmortem.id}  |  Severity: ${postmortem.severity}  |  Date: ${postmortem.date}`)
  lines.push(`Duration: ${postmortem.duration}  |  Services: ${postmortem.services.join(', ')}`)
  lines.push('')
  
  lines.push('── SUMMARY ' + '─'.repeat(48))
  lines.push(postmortem.summary)
  lines.push('')
  
  lines.push('── IMPACT ' + '─'.repeat(49))
  lines.push(`  Transactions affected: ${postmortem.impact.transactions.toLocaleString()}`)
  lines.push(`  Revenue impact: ${postmortem.impact.revenue}`)
  lines.push(`  Customers impacted: ${postmortem.impact.customers.toLocaleString()}`)
  lines.push('')
  
  lines.push('── TIMELINE ' + '─'.repeat(47))
  for (const event of postmortem.timeline) {
    const actor = event.actor ? ` [${event.actor}]` : ''
    lines.push(`  ${event.time}  ${event.description}${actor}`)
  }
  lines.push('')
  
  lines.push('── ROOT CAUSE ' + '─'.repeat(45))
  // Word wrap the root cause
  const words = postmortem.rootCause.split(' ')
  let currentLine = ''
  for (const word of words) {
    if ((currentLine + ' ' + word).length > 58) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word
    }
  }
  if (currentLine) lines.push(currentLine)
  lines.push('')
  
  lines.push('── CONTRIBUTING FACTORS ' + '─'.repeat(35))
  for (const factor of postmortem.contributing) {
    lines.push(`  • ${factor}`)
  }
  lines.push('')
  
  lines.push('── WHAT WORKED ' + '─'.repeat(44))
  for (const item of postmortem.whatWorked) {
    lines.push(`  ✓ ${item}`)
  }
  lines.push('')
  
  lines.push('── WHAT DIDN\'T WORK ' + '─'.repeat(39))
  for (const item of postmortem.whatDidnt) {
    lines.push(`  ✗ ${item}`)
  }
  lines.push('')
  
  lines.push('── ACTION ITEMS ' + '─'.repeat(43))
  for (const ai of postmortem.actionItems) {
    const statusIcon = ai.status === 'completed' ? '✓' : ai.status === 'in_progress' ? '◐' : '○'
    lines.push(`  ${statusIcon} [${ai.id}] ${ai.description}`)
    lines.push(`     Owner: ${ai.owner} | Priority: ${ai.priority} | Due: ${ai.dueDate}`)
  }
  
  return lines
}

