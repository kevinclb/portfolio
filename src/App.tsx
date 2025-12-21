import { Routes, Route, Navigate } from 'react-router-dom'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Writing from './pages/Writing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/writing" element={<Writing />} />
    </Routes>
  )
}

export default App
