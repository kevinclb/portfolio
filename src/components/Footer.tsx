import { Link } from 'react-router-dom'

// The slim interior-page footer. The home page uses its own ink `.band` contact
// footer instead.
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
        <nav className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/uses">Uses</Link>
          <a href="https://github.com/kevinclb" target="_blank" rel="noopener">
            GitHub
          </a>
          <a href="https://kevinclb.substack.com" target="_blank" rel="noopener">
            Substack
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
