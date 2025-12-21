import { useParams, Link } from 'react-router-dom'
import { posts } from '../data/writing'

function WritingDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <p>The post you're looking for doesn't exist.</p>
        <Link to="/writing">← Back to Writing</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/writing">← Back to Writing</Link>
      <h1>{post.title}</h1>
      <p style={{ opacity: 0.7 }}>{post.date}</p>
      <div>
        {post.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default WritingDetail

