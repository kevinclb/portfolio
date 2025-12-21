import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div>
        <h1>Project not found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects">← Back to Projects</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/projects">← Back to Projects</Link>
      <h1>{project.title}</h1>
      <div style={{ marginBottom: '1rem' }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{ marginRight: '0.5rem' }}>
            [{tag}]
          </span>
        ))}
      </div>
      <div>
        {project.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default ProjectDetail

