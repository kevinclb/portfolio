import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav>Navbar</nav>
      <main style={{ flex: 1, paddingBottom: '150px' }}>
        <Outlet />
      </main>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          backgroundColor: '#1a1a1a',
          color: '#fff',
        }}
      >
        Terminal
      </div>
    </div>
  )
}

export default Layout

