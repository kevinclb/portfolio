import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VALID_COMMANDS = ['about', 'experience', 'projects', 'writing', 'home']

function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const navigate = useNavigate()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase()
      
      if (command === '') {
        return
      }

      if (command.startsWith('projects/') || command.startsWith('writing/')) {
        // Handle direct path navigation (e.g., "projects/distributed-cache")
        setHistory((prev) => [...prev, `> ${command}`, `Navigating to /${command}...`])
        navigate(`/${command}`)
      } else if (command === 'home') {
        setHistory((prev) => [...prev, `> ${command}`, `Navigating to /about...`])
        navigate('/about')
      } else if (VALID_COMMANDS.includes(command)) {
        setHistory((prev) => [...prev, `> ${command}`, `Navigating to /${command}...`])
        navigate(`/${command}`)
      } else {
        setHistory((prev) => [...prev, `> ${command}`, `Command not found: ${command}`])
      }

      setInput('')
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '150px',
        backgroundColor: '#1a1a1a',
        color: '#0f0',
        fontFamily: 'monospace',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {history.slice(-6).map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>&gt;&nbsp;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#0f0',
            fontFamily: 'monospace',
            fontSize: 'inherit',
          }}
        />
      </div>
    </div>
  )
}

export default Terminal
