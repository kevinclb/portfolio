import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Writing from './pages/Writing'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/writing" element={<Writing />} />
        {/* Legacy routes from the previous site — keep old links alive. */}
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/experience" element={<Navigate to="/" replace />} />
        <Route path="/writing/:slug" element={<Navigate to="/writing" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
