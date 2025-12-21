function Experience() {
  return (
    <div className="page-enter">
      {/* Page Header */}
      <section className="section">
        <header className="section-header">
          <h1 className="section-title">Experience</h1>
          <p className="section-description">
            7+ years building backend systems, APIs, and developer tools at scale.
          </p>
        </header>
      </section>

      {/* Timeline */}
      <div className="timeline">
        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Acme Corporation</h3>
            <p className="timeline-role">Lead Software Engineer</p>
            <p className="timeline-date">Jan 2022 – Present</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>Led redesign of core caching infrastructure, reducing p99 latency by 40%</li>
              <li>Built real-time event processing pipeline handling 2M+ events/day</li>
              <li>Mentored team of 4 engineers on distributed systems best practices</li>
            </ul>
            <div className="tag-list">
              <span className="tag tag--latency">Latency</span>
              <span className="tag">Go</span>
              <span className="tag">Kafka</span>
              <span className="tag">Redis</span>
            </div>
          </div>
        </article>

        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Globex Industries</h3>
            <p className="timeline-role">Software Engineer</p>
            <p className="timeline-date">Mar 2019 – Dec 2021</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>Designed and implemented API gateway serving 10K+ requests/second</li>
              <li>Reduced deployment time from 45min to 8min with CI/CD improvements</li>
            </ul>
            <div className="tag-list">
              <span className="tag tag--reliability">Reliability</span>
              <span className="tag">Python</span>
              <span className="tag">Kubernetes</span>
              <span className="tag">AWS</span>
            </div>
          </div>
        </article>

        <article className="timeline-item">
          <header className="timeline-header">
            <h3 className="timeline-company">Initech Solutions</h3>
            <p className="timeline-role">Junior Developer</p>
            <p className="timeline-date">Jun 2017 – Feb 2019</p>
          </header>
          <div className="timeline-content">
            <ul>
              <li>Built internal tooling for database migrations and schema management</li>
              <li>Contributed to open-source monitoring stack used by 50+ internal services</li>
              <li>Wrote technical documentation that reduced onboarding time by 30%</li>
            </ul>
            <div className="tag-list">
              <span className="tag">JavaScript</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">Docker</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Experience
