import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/about" className="navbar-brand">
        ~/portfolio
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          about
        </NavLink>
        <NavLink
          to="/experience"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          experience
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          projects
        </NavLink>
        <NavLink
          to="/writing"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          writing
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
