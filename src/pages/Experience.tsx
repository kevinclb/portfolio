function Experience() {
  return (
    <div className="page-enter">
      <section className="section">
        <header className="section-header">
          <h1 className="section-title">Experience</h1>
          <p className="section-description">
            Backend engineer focused on transactions, reliability, and platform primitives at scale.
          </p>
        </header>
      </section>

      {/* Timeline */}
      <div className="timeline">
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Chime</h3>
            <p className="timeline-role">Mid-Level Software Engineer</p>
            <p className="timeline-date">January 2025 – Present</p>
          </header>

          <div className="timeline-content">
            <ul>
              <li>Key contributor on Transactions Platform Core, an over 10k QPS service serving all Chime users.</li>
              <li>
                Building a normalization & hydration platform for 1B+ transaction records stored in Chime’s DynamoDB
                transactions table.
              </li>
              <li>
                Facilitating a key transaction processor migration, offboarding from a legacy 3rd-party processor to
                Chime Core (in-house native processor).
              </li>
              <li>
                Working with abstractions over Amazon SNS/SQS, developing async pub/sub messaging that powers an
                event-driven design enabling 100M+ events/day consumption.
              </li>
              <li>
                Focusing on business logic migration, including building a distributed idempotency service available to
                Chime as a gem.
              </li>
              <li>Implemented idempotent internal transaction publishing patterns across multiple services.</li>
              <li>
                Facilitating a migration from CoreDB + legacy APIs to a centralized DynamoDB transactions table with
                LSI/GSI based indexing access patterns.
              </li>
            </ul>

            <div className="tag-list">
              <span className="tag tag--reliability">Reliability</span>
              <span className="tag">DynamoDB</span>
              <span className="tag">SNS/SQS</span>
              <span className="tag">Event-driven</span>
              <span className="tag">Idempotency</span>
              <span className="tag">Transactions</span>
              <span className="tag">High QPS</span>
            </div>
          </div>
        </article>

        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Coinbase</h3>
            <p className="timeline-role">Internship + 2x Promoted → L4 Software Engineer</p>
            <p className="timeline-date">May 2021 – May 2024</p>
          </header>

          <div className="timeline-content">
            <ul>
              <li>
                Implemented a net-new 0→1 Golang service with REST/gRPC (with gateway sidecar) designed to scalably
                handle high request rates (&gt;5k requests/min); still in use.
              </li>
              <li>
                Decomposed monolithic business logic by refactoring 2.5k+ complex LOC and led a tightly-coupled frontend
                migration including dual-write + read migration coordination.
              </li>
              <li>
                Built Temporal workflows to ensure reliable processing of high-volume (&gt;$100m) crypto transfers
                across high TVL networks (Polygon, Avalanche, Base).
              </li>
              <li>
                Designed permission logic for cloud IAM using SpiceDB and authored a 15+ page technical spec detailing
                migration, API design, and AWS infrastructure (EC2, Docker, Kubernetes).
              </li>
              <li>
                Enhanced observability with Datadog and Bugsnag; improved CI/CD with Buildkite and Testify, achieving
                &gt;99% unit test coverage.
              </li>
              <li>Acted as incident commander during critical outages ensuring swift resolution.</li>
            </ul>

            <div className="tag-list">
              <span className="tag tag--reliability">Reliability</span>
              <span className="tag">Go</span>
              <span className="tag">gRPC</span>
              <span className="tag">REST</span>
              <span className="tag">Temporal</span>
              <span className="tag">SpiceDB</span>
              <span className="tag">AWS</span>
              <span className="tag">Kubernetes</span>
              <span className="tag">Datadog</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Experience