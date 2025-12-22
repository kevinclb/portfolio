import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const VALID_COMMANDS = ['about', 'experience', 'projects', 'writing', 'home', 'help', 'clear']
const DEFAULT_BODY_HEIGHT_PX = 200
const MIN_BODY_HEIGHT_PX = 0
const COLLAPSE_THRESHOLD_PX = 56
const MAX_HISTORY_LINES = 300
const TERMINAL_HEADER_HEIGHT_PX = 40
const DOUBLE_TAP_WINDOW_MS = 300

interface HistoryLine {
  type: 'command' | 'output' | 'error'
  text: string
}

function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Welcome! I\'ve designed this terminal to allow you to programmatically navigate my portfolio.' },
    { type: 'output', text: 'Some of the things you can do include typing a route like "projects", "experience", or "writing".' },
    // { type: 'output', text: 'and hitting enter to navigate to that page.'},
    { type: 'output', text: 'If you type "question <enter a question about me>", an LLM trained on my life will answer your question.'},
    { type: 'output', text: 'Type "help" for available commands.' },
  ])
  const [bodyHeightPx, setBodyHeightPx] = useState<number>(() => {
    const raw = localStorage.getItem('terminal.bodyHeightPx')
    const parsed = raw ? Number(raw) : NaN
    return Number.isFinite(parsed) ? parsed : DEFAULT_BODY_HEIGHT_PX
  })
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const resizeStateRef = useRef<{ startY: number; startHeight: number } | null>(null)
  const lastExpandedHeightRef = useRef<number>(DEFAULT_BODY_HEIGHT_PX)
  const lastTapAtRef = useRef<number>(0)

  const reservedHeightPx = useMemo(() => {
    // Header + body height
    return bodyHeightPx + TERMINAL_HEADER_HEIGHT_PX
  }, [bodyHeightPx])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (bodyHeightPx > 0) {
      lastExpandedHeightRef.current = bodyHeightPx
    }
  }, [bodyHeightPx])

  useEffect(() => {
    localStorage.setItem('terminal.bodyHeightPx', String(bodyHeightPx))
    document.documentElement.style.setProperty('--terminal-reserved-height', `${reservedHeightPx}px`)
  }, [bodyHeightPx, reservedHeightPx])

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

      setHistory(newHistory.slice(-MAX_HISTORY_LINES))
      if (inputRef.current) inputRef.current.textContent = ''
    }
  }

  const focusInput = () => {
    if (bodyHeightPx === 0) {
      // Expand on click when collapsed, so the terminal remains usable.
      setBodyHeightPx(clampBodyHeight(lastExpandedHeightRef.current || DEFAULT_BODY_HEIGHT_PX))
      // Focus happens after re-render; schedule for next tick.
      setTimeout(() => inputRef.current?.focus(), 0)
      return
    }
    inputRef.current?.focus()
  }

  const toggleCollapsed = () => {
    if (bodyHeightPx === 0) {
      setBodyHeightPx(clampBodyHeight(lastExpandedHeightRef.current || DEFAULT_BODY_HEIGHT_PX))
      setTimeout(() => inputRef.current?.focus(), 0)
      return
    }
    setBodyHeightPx(0)
  }

  const clampBodyHeight = (h: number) => {
    const max = Math.max(0, Math.floor(window.innerHeight * 0.7))
    const floored = Math.floor(h)
    return Math.max(MIN_BODY_HEIGHT_PX, Math.min(max, floored))
  }

  const startResize = (clientY: number) => {
    resizeStateRef.current = { startY: clientY, startHeight: bodyHeightPx }
  }

  const onResizeMove = (clientY: number) => {
    const s = resizeStateRef.current
    if (!s) return
    // Dragging up increases height; dragging down decreases height.
    const next = s.startHeight + (s.startY - clientY)
    const clamped = clampBodyHeight(next)
    setBodyHeightPx(clamped <= COLLAPSE_THRESHOLD_PX ? 0 : clamped)
  }

  const stopResize = () => {
    resizeStateRef.current = null
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => onResizeMove(e.clientY)
    const onMouseUp = () => stopResize()
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length < 1) return
      onResizeMove(e.touches[0].clientY)
    }
    const onTouchEnd = () => stopResize()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [bodyHeightPx])

  return (
    <div
      className={`terminal${bodyHeightPx === 0 ? ' terminal--collapsed' : ''}`}
      onClick={focusInput}
      style={
        {
          '--terminal-body-height': `${bodyHeightPx}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="terminal-header"
        role="separator"
        aria-orientation="horizontal"
        aria-label="Terminal header (drag to resize)"
        tabIndex={0}
        onMouseDown={(e) => {
          startResize(e.clientY)
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          stopResize()
          toggleCollapsed()
        }}
        onTouchStart={(e) => {
          if (e.touches.length < 1) return
          const now = Date.now()
          const isDoubleTap = now - lastTapAtRef.current <= DOUBLE_TAP_WINDOW_MS
          lastTapAtRef.current = now

          if (isDoubleTap) {
            e.stopPropagation()
            stopResize()
            toggleCollapsed()
            return
          }

          startResize(e.touches[0].clientY)
        }}
        onKeyDown={(e) => {
          // Keyboard affordance
          if (e.key === 'ArrowUp') setBodyHeightPx((h) => clampBodyHeight(h + 20))
          if (e.key === 'ArrowDown') setBodyHeightPx((h) => clampBodyHeight(h - 20))
        }}
      >
        <span className="terminal-title">terminal</span>
        <span className="terminal-toggle">drag to resize • double-click to collapse</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-history" ref={historyRef}>
          {history.map((line, i) => (
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
