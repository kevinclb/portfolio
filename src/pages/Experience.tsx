function Experience() {
  return (
    <div className="page-enter">
      <section className="section">
        <header className="section-header">
          <h1 className="section-title">Experience</h1>
          <p className="section-description">
            Backend & platform engineer. Building AI infrastructure and high-throughput transaction systems.
          </p>
        </header>
      </section>

      <div className="timeline">
        {/* Chime -- AI App Experience */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Chime</h3>
            <p className="timeline-role">Software Engineer, AI App Experience</p>
            <p className="timeline-date">Mar 2025 – Present</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Building agentic LLM workflows over Amazon Bedrock with Python LangChain SDK,
                powering net-new capabilities for over 25 million Chime members.
              </li>
              <li>
                Designed and implemented a Transaction Categorization pipeline (SNS, SQS, inter-service async)
                handling over 350 purchases/sec (30M/day) to power agentic spending insights.
              </li>
              <li>
                Leading insights & aggregations product across the stack, contributing to 7+ repositories
                from React Native to Snowflake ETL pipelines.
              </li>
              <li>
                Setting company standards by defining agentic coding workflows & orchestration frameworks.
              </li>
              <li>
                Reporting to Director & CTO in flat org structure, handling urgent work with care and precision.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">LangChain</span>
              <span className="tag">Bedrock</span>
              <span className="tag">Python</span>
              <span className="tag">SNS/SQS</span>
              <span className="tag">React Native</span>
              <span className="tag">Snowflake</span>
            </div>
          </div>
        </article>

        {/* Chime -- Transactions Intelligence Platform */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Chime</h3>
            <p className="timeline-role">Software Engineer, Transactions Intelligence Platform</p>
            <p className="timeline-date">Jan 2025 – Mar 2025</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Designed and implemented a cross-service bills and recurring expense cache mechanism
                backed by DynamoDB, reducing average latency on a core API by 68%.
              </li>
              <li>
                Built cross-service idempotency solution during critical infrastructure migration,
                enabling idempotency guarantees for 5+ services during a 25 million account, 3+ month migration.
              </li>
              <li>
                Independently drove and implemented a buffer mechanism that resulted in $350k annualized savings.
              </li>
              <li>
                Acted as Sev2 incident commander including holding thoughtful and informative retros.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">Ruby</span>
              <span className="tag">DynamoDB</span>
              <span className="tag tag--reliability">Idempotency</span>
              <span className="tag tag--reliability">Reliability</span>
            </div>
          </div>
        </article>

        {/* Coinbase -- Developer Platform */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Coinbase</h3>
            <p className="timeline-role">Software Engineer, Developer Platform</p>
            <p className="timeline-date">May 2022 – Apr 2024</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Implemented a 0-to-1 Golang service with REST/gRPC gateway sidecar and MongoDB,
                powering the Coinbase developer portal (cdp.coinbase.com). TDD from day one.
              </li>
              <li>
                Decomposed monolithic business logic, including sensitive resources (Ethereum nodes),
                and led a tightly coupled frontend migration with dual-write + read migration phases.
              </li>
              <li>
                Leveraged SpiceDB-based permission logic for cloud IAM and authored a 10+ page technical
                spec detailing migration, API design, and infrastructure configurations.
              </li>
              <li>
                Solved novel transient retry auth errors with a Redis locking mechanism for idempotency.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">Go</span>
              <span className="tag">gRPC</span>
              <span className="tag">MongoDB</span>
              <span className="tag">SpiceDB</span>
              <span className="tag">Redis</span>
              <span className="tag">Kubernetes</span>
            </div>
          </div>
        </article>

        {/* Coinbase -- Blockchain Interoperability */}
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Coinbase</h3>
            <p className="timeline-role">Software Engineer Intern → L4 Engineer, Blockchain Interoperability</p>
            <p className="timeline-date">May 2021 – May 2022</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>
                Built Temporal workflows to ensure reliable processing of high-volume ($100M+) crypto transfers
                across high TVL networks like Polygon, Avalanche, and Base.
              </li>
              <li>
                Enhanced system observability with Datadog and Bugsnag; improved CI/CD pipelines via Buildkite
                and Testify, achieving over 99% unit test coverage.
              </li>
              <li>
                Devised logic which increased Coinbase cross-chain liquidity offerings while programmatically
                keeping hot reserves below threshold.
              </li>
            </ul>
            <div className="tag-list">
              <span className="tag">Go</span>
              <span className="tag">Temporal</span>
              <span className="tag">Datadog</span>
              <span className="tag">Buildkite</span>
              <span className="tag">Blockchain</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Experience