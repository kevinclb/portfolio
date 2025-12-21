import { Link } from 'react-router-dom'
import { posts } from '../data/writing'

function Writing() {
  return (
    <div>
      <h1>Writing</h1>
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/writing/${post.slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <article style={{ marginBottom: '1.5rem' }}>
              <h2>{post.title}</h2>
              <p style={{ opacity: 0.7 }}>{post.date}</p>
              <p>{post.summary}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Writing
