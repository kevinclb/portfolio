import { Link } from 'react-router-dom'

// The slim page footer used on interior pages. The home page uses its own
// ink `.band` contact footer instead.
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-divider)' }}>
      <div
        className="container"
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span className="mono text-subtle" style={{ fontSize: 12 }}>
          © 2026 Kevin Babou
        </span>
        <Link
          to="/"
          style={{ fontSize: 13, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}
        >
          Home
        </Link>
      </div>
    </footer>
  )
}

export default Footer
