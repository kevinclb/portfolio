import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const VALID_COMMANDS = ['about', 'experience', 'projects', 'writing', 'home', 'help', 'clear']

interface HistoryLine {
  type: 'command' | 'output' | 'error'
  text: string
}

function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Welcome! Type "help" for available commands.' }
  ])
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase()

      if (command === '') {
        return
      }

      const newHistory: HistoryLine[] = [
        ...history,
        { type: 'command', text: `$ ${command}` }
      ]

      if (command === 'clear') {
        setHistory([])
        setInput('')
        return
      }

      if (command === 'help') {
        newHistory.push({
          type: 'output',
          text: 'Available commands: about, experience, projects, writing, home, help, clear'
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
      setInput('')
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
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Terminal
