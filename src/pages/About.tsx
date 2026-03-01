import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="page-enter">
      {/* Hero Header */}
      <header className="hero">
        <h1 className="hero-name">Kevin Babou</h1>
        <p className="hero-role">Software Engineer @ Chime</p>
        <p className="hero-tagline">
          Building agentic AI workflows and high-throughput transaction infrastructure.
          Previously shipping blockchain interoperability at Coinbase.
        </p>
        <div className="proof-strip">
          <Link to="/experience" className="proof-link">
            → 4+ years experience
          </Link>
          <Link to="/projects" className="proof-link">
            → AI & platform engineering
          </Link>
          <Link to="/writing" className="proof-link">
            → 3 articles
          </Link>
        </div>
      </header>

      {/* What I Build */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">What I Build</h2>
        </header>
        <ul>
          <li>Agentic LLM pipelines over Amazon Bedrock powering features for 25M+ users</li>
          <li>Transaction processing at 350 purchases/sec (30M/day) with real-time categorization</li>
          <li>Cross-service idempotency guarantees during a 25M account migration</li>
          <li>Temporal workflows for reliable $100M+ crypto transfer processing</li>
          <li>0-to-1 services in Go, Ruby, and Python shipping to production</li>
        </ul>
      </section>

      {/* Right Now */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">Right Now</h2>
        </header>
        <ul>
          <li>Leading AI application experience at Chime, reporting to Director & CTO</li>
          <li>Experimenting with Claude Code and agentic coding workflows</li>
          <li>Lifting heavy, playing chess, learning guitar</li>
          <li>Watching Severance and Pluribus with my wife Ana</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">Contact</h2>
        </header>
        <ul>
          <li>
            <span className="text-muted">Email:</span>{' '}
            <a href="mailto:kevincbabou@gmail.com">kevincbabou@gmail.com</a>
          </li>
          <li>
            <span className="text-muted">GitHub:</span>{' '}
            <a href="https://github.com/kevinclb" target="_blank" rel="noopener noreferrer">
              github.com/kevinclb
            </a>
          </li>
          <li>
            <span className="text-muted">GitHub (work):</span>{' '}
            <a href="https://github.com/kevinbabou" target="_blank" rel="noopener noreferrer">
              github.com/kevinbabou
            </a>
          </li>
          <li>
            <span className="text-muted">LinkedIn:</span>{' '}
            <a href="https://linkedin.com/in/kevin-babou" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/kevin-babou
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
