import { Link, NavLink } from 'react-router-dom'

// Frosted sticky header with the caret wordmark. NavLink emits aria-current
// on the active route, which the Caret `.nav a[aria-current]` rule underlines.
function Navbar() {
  return (
    <nav className="nav" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <Link className="nav-brand" to="/">
        kevin babou<span className="caret" />
      </Link>
      <div className="nav-links">
        <a href="/#work">Work</a>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/writing">Writing</NavLink>
        <a href="/#contact">Contact</a>
      </div>
      <a
        className="btn btn-primary btn-sm"
        href="/resume.pdf"
        target="_blank"
        rel="noopener"
      >
        Résumé
      </a>
    </nav>
  )
}

export default Navbar
