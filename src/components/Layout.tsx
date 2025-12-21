import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Terminal from './Terminal'

function Layout() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Terminal />
    </div>
  )
}

export default Layout
