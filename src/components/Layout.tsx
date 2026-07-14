import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// Frosted nav on top of every page; each page renders its own footer so the
// home page can close on the ink contact band.
function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
