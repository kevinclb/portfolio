import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="page-enter empty-state">
        <div className="empty-state-icon">🔍</div>
        <h1 className="empty-state-title">Project not found</h1>
        <p className="empty-state-message">
          The project you're looking for doesn't exist.
        </p>
        <Link to="/projects" className="back-link" style={{ marginTop: 'var(--space-5)' }}>
          ← Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="page-enter detail-page">
      <Link to="/projects" className="back-link">
        ← Back to Projects
      </Link>
      
      <header className="detail-header">
        <h1 className="detail-title">{project.title}</h1>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="detail-content markdown-content">
        <Markdown>{project.content}</Markdown>
      </div>
    </div>
  )
}

export default ProjectDetail
