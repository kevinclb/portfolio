import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

// Selected work as Caret hairline cards — kicker, title, one-line body, tags.
function Projects() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <header
        className="container"
        style={{ width: '100%', paddingTop: 'clamp(64px,10vw,120px)', paddingBottom: 'clamp(24px,4vw,40px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">projects</span> — things I've built
        </span>
        <h1 className="display-2" style={{ marginTop: 18, maxWidth: '16ch' }}>
          Selected work.<span className="caret" />
        </h1>
        <p className="text-muted" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: '48ch', margin: '4px 0 0' }}>
          Personal and open-source projects — plus the systems behind the résumé, written up in full.
        </p>
      </header>

      <main
        className="container"
        style={{ width: '100%', flex: 1, paddingBottom: 'clamp(64px,9vw,104px)' }}
      >
        <div className="card-grid">
          {projects.map((project) => (
            <Link className="card" key={project.slug} to={`/projects/${project.slug}`}>
              <span className="card-kicker">{project.tags[0]}</span>
              <span className="card-title">{project.title}</span>
              <p className="card-body">{project.summary}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Projects
