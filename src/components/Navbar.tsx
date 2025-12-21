import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/experience">Experience</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/writing">Writing</NavLink>
    </nav>
  )
}

export default Navbar

