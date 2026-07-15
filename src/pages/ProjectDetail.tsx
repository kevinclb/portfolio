import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

// A single project's write-up in the Notion-calm `.prose` reading column.
function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        className="page-enter container"
        style={{ paddingTop: 'clamp(72px,12vw,140px)', paddingBottom: 96, textAlign: 'left' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">404</span> · not found
        </span>
        <h1 className="display-2" style={{ marginTop: 16 }}>
          No such project.
        </h1>
        <p className="text-muted" style={{ fontSize: 17, maxWidth: '40ch', marginBottom: 24 }}>
          The project you're looking for doesn't exist. It may have moved.
        </p>
        <Link className="btn btn-secondary" to="/projects">
          ← All projects
        </Link>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <main
        className="container"
        style={{
          maxWidth: 820,
          width: '100%',
          flex: 1,
          paddingTop: 'clamp(40px,6vw,72px)',
          paddingBottom: 'clamp(64px,9vw,104px)',
        }}
      >
        <Link
          className="mono"
          to="/projects"
          style={{ fontSize: 13, textDecoration: 'none', color: 'var(--color-accent-600)' }}
        >
          ← all projects
        </Link>

        <header style={{ marginTop: 24 }}>
          <span className="eyebrow">
            <span className="eyebrow-num">project</span>
          </span>
          <h1 className="display-2" style={{ marginTop: 16, maxWidth: '20ch' }}>
            {project.title}
          </h1>
          <p
            className="text-muted"
            style={{ fontSize: 19, lineHeight: 1.6, maxWidth: '46ch', margin: '4px 0 20px' }}
          >
            {project.summary}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <hr className="hr" style={{ margin: '32px 0 40px' }} />
        </header>

        <article className="prose">
          <Markdown>{project.content}</Markdown>
        </article>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetail
