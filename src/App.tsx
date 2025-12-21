import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Writing from './pages/Writing'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/writing" element={<Writing />} />
      </Route>
    </Routes>
  )
}

export default App
