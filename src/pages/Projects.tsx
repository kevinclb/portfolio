import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function Projects() {
  return (
    <div className="page-enter">
      {/* Page Header */}
      <section className="section">
        <header className="section-header">
          <h1 className="section-title">Projects</h1>
          <p className="section-description">
            Selected work from personal and open-source projects.
          </p>
        </header>
      </section>

      {/* Project Cards */}
      <div className="card-grid">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="card-link"
          >
            <article className="card">
              <h2 className="card-title">{project.title}</h2>
              <p className="card-summary">{project.summary}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Projects
