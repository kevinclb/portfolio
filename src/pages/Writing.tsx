import { Link } from 'react-router-dom'
import { posts } from '../data/writing'

function Writing() {
  return (
    <div className="page-enter">
      {/* Page Header */}
      <section className="section">
        <header className="section-header">
          <h1 className="section-title">Writing</h1>
          <p className="section-description">
            Thoughts on software engineering, tooling, and the craft of building.
          </p>
        </header>
      </section>

      {/* Post Cards */}
      <div className="card-grid">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/writing/${post.slug}`}
            className="card-link"
          >
            <article className="card">
              <h2 className="card-title">{post.title}</h2>
              <p className="card-meta">{post.date}</p>
              <p className="card-summary">{post.summary}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Writing
