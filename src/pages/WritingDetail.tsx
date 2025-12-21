import { useParams, Link } from 'react-router-dom'
import { posts } from '../data/writing'

function WritingDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="page-enter empty-state">
        <div className="empty-state-icon">📝</div>
        <h1 className="empty-state-title">Post not found</h1>
        <p className="empty-state-message">
          The article you're looking for doesn't exist.
        </p>
        <Link to="/writing" className="back-link" style={{ marginTop: 'var(--space-5)' }}>
          ← Back to Writing
        </Link>
      </div>
    )
  }

  return (
    <div className="page-enter detail-page">
      <Link to="/writing" className="back-link">
        ← Back to Writing
      </Link>
      
      <header className="detail-header">
        <h1 className="detail-title">{post.title}</h1>
        <p className="detail-meta">{post.date}</p>
      </header>

      <div className="detail-content">
        {post.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default WritingDetail
