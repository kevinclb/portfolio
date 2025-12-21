import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <div>
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <article style={{ marginBottom: '1.5rem' }}>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <div>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ marginRight: '0.5rem' }}>
                    [{tag}]
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
