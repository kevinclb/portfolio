import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="page-enter">
      {/* Hero Header */}
      <header className="hero">
        <h1 className="hero-name">Kevin Babou</h1>
        <p className="hero-role">Senior Software Engineer</p>
        <p className="hero-tagline">
          Building resilient distributed systems and developer tools.
          Focused on latency, reliability, and developer experience.
        </p>
        <div className="proof-strip">
          <Link to="/projects" className="proof-link">
            → 3 projects
          </Link>
          <Link to="/experience" className="proof-link">
            → 7+ years experience
          </Link>
          <Link to="/writing" className="proof-link">
            → 3 articles
          </Link>
        </div>
      </header>

      {/* Technical Interests */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">Technical Interests</h2>
        </header>
        <ul>
          <li>Distributed systems and cloud architecture</li>
          <li>Programming language design and compilers</li>
          <li>Open source development and community building</li>
          <li>Developer tooling and productivity</li>
        </ul>
      </section>

      {/* Hobbies */}
      <section className="section">
        <header className="section-header">
          <h2 className="section-title">Beyond Code</h2>
        </header>
        <ul>
          <li>Reading science fiction and fantasy novels</li>
          <li>Hiking and outdoor photography</li>
          <li>Playing chess and strategy board games</li>
          <li>Learning to play the piano</li>
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
            <a href="mailto:hello@example.com">hello@example.com</a>
          </li>
          <li>
            <span className="text-muted">GitHub:</span>{' '}
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
              github.com/username
            </a>
          </li>
          <li>
            <span className="text-muted">LinkedIn:</span>{' '}
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/username
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
