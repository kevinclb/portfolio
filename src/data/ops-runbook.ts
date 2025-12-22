export interface RunbookStep {
  title: string
  commands?: string[]
  notes?: string
}

export interface RunbookSection {
  name: string
  steps: RunbookStep[]
}

export interface Runbook {
  id: string
  title: string
  service: string
  severity: 'P1' | 'P2' | 'P3'
  symptoms: string[]
  alertSource: string
  sections: RunbookSection[]
  escalation: {
    primary: string
    secondary: string
    executive: string
  }
  lastUpdated: string
}

export const runbook: Runbook = {
  id: 'RB-2024-017',
  title: 'Payment Gateway High Latency',
  service: 'payment-gateway',
  severity: 'P1',
  symptoms: [
    'p99 latency exceeds 200ms for >5 minutes',
    'Payment success rate drops below 99%',
    'Downstream timeout errors increase',
    'PagerDuty alert: "payment-gateway-latency-critical"'
  ],
  alertSource: 'Datadog Monitor #48291',
  sections: [
    {
      name: 'Initial Triage',
      steps: [
        {
          title: 'Check current latency metrics',
          commands: [
            'curl -s https://metrics.internal/api/v1/query?query=payment_gateway_latency_p99',
            'kubectl top pods -n payments -l app=payment-gateway'
          ]
        },
        {
          title: 'Verify alert is not a false positive',
          notes: 'Check if metrics pipeline is healthy. Compare with client-side metrics in Amplitude.'
        },
        {
          title: 'Check for recent deployments',
          commands: [
            'kubectl rollout history deployment/payment-gateway -n payments',
            'git log --oneline -10 origin/main -- services/payment-gateway'
          ]
        }
      ]
    },
    {
      name: 'Diagnose Root Cause',
      steps: [
        {
          title: 'Check dependency health',
          commands: [
            'curl -s https://status.internal/api/dependencies/payment-gateway',
            'kubectl logs -n payments -l app=payment-gateway --tail=100 | grep -i error'
          ],
          notes: 'Common culprits: fraud-detection, card-networks, redis-cluster'
        },
        {
          title: 'Check database connection pool',
          commands: [
            'psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity WHERE application_name LIKE \'payment%\'"'
          ],
          notes: 'Pool exhaustion threshold: 80 connections'
        },
        {
          title: 'Review distributed traces',
          commands: [
            'curl -s "https://jaeger.internal/api/traces?service=payment-gateway&limit=20&minDuration=200ms"'
          ]
        }
      ]
    },
    {
      name: 'Remediation',
      steps: [
        {
          title: 'Scale horizontally (if CPU/memory bound)',
          commands: [
            'kubectl scale deployment/payment-gateway -n payments --replicas=8'
          ],
          notes: 'Max safe replicas: 12. Coordinate with platform team if more needed.'
        },
        {
          title: 'Enable circuit breaker for slow dependency',
          commands: [
            'kubectl set env deployment/payment-gateway -n payments CIRCUIT_BREAKER_ENABLED=true',
            'kubectl set env deployment/payment-gateway -n payments CIRCUIT_BREAKER_THRESHOLD_MS=150'
          ]
        },
        {
          title: 'Rollback if caused by recent deploy',
          commands: [
            'kubectl rollout undo deployment/payment-gateway -n payments',
            'kubectl rollout status deployment/payment-gateway -n payments'
          ],
          notes: 'Notify #payments-oncall before rolling back'
        }
      ]
    },
    {
      name: 'Post-Incident',
      steps: [
        {
          title: 'Verify recovery',
          notes: 'Confirm p99 < 200ms for 10 consecutive minutes'
        },
        {
          title: 'Update incident timeline',
          notes: 'Document in #incidents Slack channel and incident.io'
        },
        {
          title: 'Schedule postmortem if P1/P2',
          notes: 'Within 48 hours. Template: go/postmortem-template'
        }
      ]
    }
  ],
  escalation: {
    primary: '@payments-oncall (PagerDuty)',
    secondary: '@platform-oncall (after 15 min)',
    executive: '@vp-engineering (if customer-impacting >30 min)'
  },
  lastUpdated: '2024-11-15'
}

export function formatRunbook(): string[] {
  const lines: string[] = []
  
  lines.push(`╔═══════════════════════════════════════════════════════════╗`)
  lines.push(`║  RUNBOOK: ${runbook.title.padEnd(47)}║`)
  lines.push(`╚═══════════════════════════════════════════════════════════╝`)
  lines.push('')
  lines.push(`Service: ${runbook.service}  |  Severity: ${runbook.severity}  |  ID: ${runbook.id}`)
  lines.push(`Alert: ${runbook.alertSource}`)
  lines.push('')
  lines.push('SYMPTOMS:')
  for (const symptom of runbook.symptoms) {
    lines.push(`  • ${symptom}`)
  }
  lines.push('')
  
  for (const section of runbook.sections) {
    lines.push(`── ${section.name.toUpperCase()} ${'─'.repeat(45 - section.name.length)}`)
    lines.push('')
    
    for (let i = 0; i < section.steps.length; i++) {
      const step = section.steps[i]
      lines.push(`  ${i + 1}. ${step.title}`)
      
      if (step.commands) {
        for (const cmd of step.commands) {
          lines.push(`     $ ${cmd}`)
        }
      }
      
      if (step.notes) {
        lines.push(`     ℹ ${step.notes}`)
      }
      lines.push('')
    }
  }
  
  lines.push('── ESCALATION ' + '─'.repeat(44))
  lines.push(`  Primary:   ${runbook.escalation.primary}`)
  lines.push(`  Secondary: ${runbook.escalation.secondary}`)
  lines.push(`  Executive: ${runbook.escalation.executive}`)
  lines.push('')
  lines.push(`Last updated: ${runbook.lastUpdated}`)
  
  return lines
}

