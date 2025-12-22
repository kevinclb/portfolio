export interface ServiceMetrics {
  p50: number
  p95: number
  p99: number
  errorRate: number
  throughput: number
}

export interface SLO {
  name: string
  target: string
  current: number
  status: 'healthy' | 'warning' | 'critical'
}

export interface Service {
  id: string
  name: string
  description: string
  owner: string
  slos: SLO[]
  metrics: ServiceMetrics
  dependencies: string[]
  lastUpdated: string
}

export const services: Service[] = [
  {
    id: 'payment-gateway',
    name: 'Payment Gateway',
    description: 'Core payment processing service handling card transactions, tokenization, and routing to payment networks',
    owner: 'payments-platform',
    slos: [
      {
        name: 'Availability',
        target: '99.95%',
        current: 99.97,
        status: 'healthy'
      },
      {
        name: 'Latency (p99)',
        target: '< 200ms',
        current: 187,
        status: 'healthy'
      },
      {
        name: 'Error Rate',
        target: '< 0.1%',
        current: 0.04,
        status: 'healthy'
      }
    ],
    metrics: {
      p50: 45,
      p95: 112,
      p99: 187,
      errorRate: 0.04,
      throughput: 12847
    },
    dependencies: ['auth-service', 'fraud-detection', 'ledger-service', 'card-networks'],
    lastUpdated: '2024-12-22T14:32:00Z'
  },
  {
    id: 'fraud-detection',
    name: 'Fraud Detection',
    description: 'ML-powered fraud scoring service analyzing transaction patterns, device fingerprints, and behavioral signals',
    owner: 'risk-engineering',
    slos: [
      {
        name: 'Availability',
        target: '99.9%',
        current: 99.94,
        status: 'healthy'
      },
      {
        name: 'Latency (p99)',
        target: '< 150ms',
        current: 142,
        status: 'healthy'
      },
      {
        name: 'Model Inference',
        target: '< 50ms',
        current: 38,
        status: 'healthy'
      }
    ],
    metrics: {
      p50: 28,
      p95: 89,
      p99: 142,
      errorRate: 0.02,
      throughput: 14203
    },
    dependencies: ['feature-store', 'model-serving', 'redis-cluster'],
    lastUpdated: '2024-12-22T14:32:00Z'
  }
]

export function formatServiceTable(service: Service): string[] {
  const lines: string[] = []
  
  lines.push(`┌─ ${service.name} ────────────────────────────────────`)
  lines.push(`│ ${service.description}`)
  lines.push(`│ Owner: ${service.owner}`)
  lines.push(`│`)
  lines.push(`│ SLOs:`)
  
  for (const slo of service.slos) {
    const statusIcon = slo.status === 'healthy' ? '✓' : slo.status === 'warning' ? '⚠' : '✗'
    const value = typeof slo.current === 'number' && slo.current > 100 
      ? `${slo.current}ms` 
      : `${slo.current}%`
    lines.push(`│   ${statusIcon} ${slo.name}: ${value} (target: ${slo.target})`)
  }
  
  lines.push(`│`)
  lines.push(`│ Latency:  p50=${service.metrics.p50}ms  p95=${service.metrics.p95}ms  p99=${service.metrics.p99}ms`)
  lines.push(`│ Traffic:  ${service.metrics.throughput.toLocaleString()} req/min  |  Error rate: ${service.metrics.errorRate}%`)
  lines.push(`│ Deps:     ${service.dependencies.join(', ')}`)
  lines.push(`└──────────────────────────────────────────────────────`)
  
  return lines
}

