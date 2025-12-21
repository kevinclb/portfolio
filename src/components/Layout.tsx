import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Terminal from './Terminal'

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingBottom: '150px' }}>
        <Outlet />
      </main>
      <Terminal />
    </div>
  )
}

export default Layout

