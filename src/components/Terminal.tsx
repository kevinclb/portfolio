import { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const VALID_COMMANDS = ['about', 'experience', 'projects', 'writing', 'home', 'help', 'clear']

interface HistoryLine {
  type: 'command' | 'output' | 'error'
  text: string
}

function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Welcome! Type "help" for available commands.' }
  ])
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const command = (inputRef.current?.textContent || '').trim().toLowerCase()

      if (command === '') {
        setHistory((prev) => [...prev, { type: 'command', text: '$' }])
        return
      }

      const newHistory: HistoryLine[] = [
        ...history,
        { type: 'command', text: `$ ${command}` }
      ]

      if (command === 'clear') {
        setHistory([])
        if (inputRef.current) inputRef.current.textContent = ''
        return
      }

      if (command === 'cd' || command === 'pwd') {
        newHistory.push({ type: 'output', text: location.pathname })
      } else if (command === 'help') {
        newHistory.push({
          type: 'output',
          text: 'Available commands: cd, about, experience, projects, writing, home, help, clear'
        })
        newHistory.push({
          type: 'output',
          text: 'Navigate to project/writing detail: projects/<slug> or writing/<slug>'
        })
      } else if (command.startsWith('projects/') || command.startsWith('writing/')) {
        newHistory.push({ type: 'output', text: `→ Navigating to /${command}` })
        navigate(`/${command}`)
      } else if (command === 'home') {
        newHistory.push({ type: 'output', text: '→ Navigating to /about' })
        navigate('/about')
      } else if (VALID_COMMANDS.includes(command)) {
        newHistory.push({ type: 'output', text: `→ Navigating to /${command}` })
        navigate(`/${command}`)
      } else {
        newHistory.push({
          type: 'error',
          text: `Command not found: ${command}. Type "help" for available commands.`
        })
      }

      setHistory(newHistory)
      if (inputRef.current) inputRef.current.textContent = ''
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="terminal" onClick={focusInput}>
      <div className="terminal-header">
        <span className="terminal-title">terminal</span>
        <span className="terminal-toggle">click to focus</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-history" ref={historyRef}>
          {history.slice(-8).map((line, i) => (
            <div key={i} className={`terminal-line ${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>
        <div className="terminal-input-row">
          <span className="terminal-prompt">$</span>
          <div
            ref={inputRef}
            className="terminal-input"
            contentEditable
            role="textbox"
            aria-label="Terminal command input"
            onKeyDown={handleKeyDown}
            spellCheck={false}
            data-placeholder="type a command..."
          />
        </div>
      </div>
    </div>
  )
}

export default Terminal
