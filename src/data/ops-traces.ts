export interface Span {
  spanId: string
  parentSpanId: string | null
  service: string
  operation: string
  startOffset: number  // ms from trace start
  duration: number     // ms
  status: 'ok' | 'error'
  tags: Record<string, string>
}

export interface Trace {
  traceId: string
  name: string
  description: string
  totalDuration: number
  status: 'ok' | 'error'
  spans: Span[]
  timestamp: string
}

export const traces: Trace[] = [
  {
    traceId: 'abc123def456',
    name: 'Successful Card Payment',
    description: 'End-to-end payment flow: authorization, fraud check, and ledger posting',
    totalDuration: 234,
    status: 'ok',
    timestamp: '2024-12-22T14:28:32.847Z',
    spans: [
      {
        spanId: 'span-001',
        parentSpanId: null,
        service: 'payment-gateway',
        operation: 'POST /v1/payments',
        startOffset: 0,
        duration: 234,
        status: 'ok',
        tags: {
          'http.method': 'POST',
          'http.status_code': '200',
          'payment.amount': '$127.50',
          'payment.currency': 'USD'
        }
      },
      {
        spanId: 'span-002',
        parentSpanId: 'span-001',
        service: 'auth-service',
        operation: 'ValidateToken',
        startOffset: 2,
        duration: 18,
        status: 'ok',
        tags: {
          'auth.method': 'bearer',
          'auth.scopes': 'payments:write'
        }
      },
      {
        spanId: 'span-003',
        parentSpanId: 'span-001',
        service: 'fraud-detection',
        operation: 'ScoreTransaction',
        startOffset: 22,
        duration: 89,
        status: 'ok',
        tags: {
          'fraud.score': '0.12',
          'fraud.decision': 'approve',
          'fraud.model_version': 'v2.4.1'
        }
      },
      {
        spanId: 'span-004',
        parentSpanId: 'span-001',
        service: 'ledger-service',
        operation: 'PostTransaction',
        startOffset: 115,
        duration: 67,
        status: 'ok',
        tags: {
          'ledger.account_id': 'acct_***4521',
          'ledger.entry_type': 'debit'
        }
      },
      {
        spanId: 'span-005',
        parentSpanId: 'span-001',
        service: 'notification-service',
        operation: 'SendReceipt',
        startOffset: 186,
        duration: 45,
        status: 'ok',
        tags: {
          'notification.channel': 'email',
          'notification.template': 'payment_receipt'
        }
      }
    ]
  },
  {
    traceId: 'xyz789abc012',
    name: 'Blocked Fraud Attempt',
    description: 'Transaction declined due to high fraud score from velocity check',
    totalDuration: 156,
    status: 'error',
    timestamp: '2024-12-22T14:31:05.123Z',
    spans: [
      {
        spanId: 'span-101',
        parentSpanId: null,
        service: 'payment-gateway',
        operation: 'POST /v1/payments',
        startOffset: 0,
        duration: 156,
        status: 'error',
        tags: {
          'http.method': 'POST',
          'http.status_code': '402',
          'payment.amount': '$2,847.00',
          'payment.currency': 'USD',
          'error.type': 'fraud_declined'
        }
      },
      {
        spanId: 'span-102',
        parentSpanId: 'span-101',
        service: 'auth-service',
        operation: 'ValidateToken',
        startOffset: 3,
        duration: 21,
        status: 'ok',
        tags: {
          'auth.method': 'bearer',
          'auth.scopes': 'payments:write'
        }
      },
      {
        spanId: 'span-103',
        parentSpanId: 'span-101',
        service: 'fraud-detection',
        operation: 'ScoreTransaction',
        startOffset: 28,
        duration: 124,
        status: 'error',
        tags: {
          'fraud.score': '0.94',
          'fraud.decision': 'decline',
          'fraud.reason': 'velocity_exceeded',
          'fraud.model_version': 'v2.4.1',
          'fraud.signals': 'new_device,unusual_amount,rapid_attempts'
        }
      }
    ]
  }
]

export function formatTraceList(): string[] {
  const lines: string[] = []
  
  lines.push('Available traces:')
  lines.push('')
  
  for (const trace of traces) {
    const statusIcon = trace.status === 'ok' ? '✓' : '✗'
    lines.push(`  ${statusIcon} [${trace.traceId}] ${trace.name}`)
    lines.push(`    Duration: ${trace.totalDuration}ms | Spans: ${trace.spans.length}`)
  }
  
  lines.push('')
  lines.push('Use "trace <trace-id>" to view span details')
  
  return lines
}

export function formatTraceDetail(trace: Trace): string[] {
  const lines: string[] = []
  const maxDuration = trace.totalDuration
  const barWidth = 40
  
  lines.push(`Trace: ${trace.traceId}`)
  lines.push(`${trace.name}`)
  lines.push(`${trace.description}`)
  lines.push(`Total: ${trace.totalDuration}ms | Status: ${trace.status.toUpperCase()}`)
  lines.push('')
  lines.push('Span Waterfall:')
  lines.push('─'.repeat(60))
  
  for (const span of trace.spans) {
    const startPos = Math.floor((span.startOffset / maxDuration) * barWidth)
    const spanWidth = Math.max(1, Math.floor((span.duration / maxDuration) * barWidth))
    const bar = ' '.repeat(startPos) + '█'.repeat(spanWidth)
    const statusIcon = span.status === 'ok' ? '✓' : '✗'
    
    lines.push(`${statusIcon} ${span.service}`)
    lines.push(`  ${span.operation}`)
    lines.push(`  [${bar.padEnd(barWidth)}] ${span.duration}ms`)
  }
  
  lines.push('─'.repeat(60))
  
  return lines
}

