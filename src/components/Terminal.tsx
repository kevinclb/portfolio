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
  type: 'command' | 'output' | 'error' | 'hint' | 'prompt'
  text: string
}

type EmailFormStep = 'idle' | 'name' | 'email' | 'message' | 'sending'

interface EmailFormData {
  name: string
  email: string
  message: string
}

function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Welcome! I\'ve designed this terminal to allow you to programmatically navigate my portfolio.' },
    { type: 'output', text: 'Some of the things you can do include typing a route like "projects", "experience", or "writing".' },
    // { type: 'output', text: 'and hitting enter to navigate to that page.'},
    { type: 'output', text: 'If you type "question <enter a question about me>", an LLM trained on my life will answer your question.'},
    { type: 'output', text: 'Type "help" for available commands.' },
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [emailFormStep, setEmailFormStep] = useState<EmailFormStep>('idle')
  const [emailFormData, setEmailFormData] = useState<EmailFormData>({ name: '', email: '', message: '' })
  const [historyIndex, setHistoryIndex] = useState(-1)
  const savedInputRef = useRef<string>('')
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
  }, [history, streamingText])

  useEffect(() => {
    if (bodyHeightPx > 0) {
      lastExpandedHeightRef.current = bodyHeightPx
    }
  }, [bodyHeightPx])

  useEffect(() => {
    localStorage.setItem('terminal.bodyHeightPx', String(bodyHeightPx))
    document.documentElement.style.setProperty('--terminal-reserved-height', `${reservedHeightPx}px`)
  }, [bodyHeightPx, reservedHeightPx])

  // Move cursor to end of contentEditable
  const moveCursorToEnd = () => {
    if (!inputRef.current) return
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(inputRef.current)
    range.collapse(false) // false = collapse to end
    sel?.removeAllRanges()
    sel?.addRange(range)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Arrow key history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      if (historyIndex === -1) {
        // Save current input before navigating
        savedInputRef.current = inputRef.current?.textContent || ''
      }
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1)
      
      setHistoryIndex(newIndex)
      if (inputRef.current) {
        inputRef.current.textContent = commandHistory[newIndex]
        moveCursorToEnd()
      }
      return
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      
      const newIndex = historyIndex + 1
      
      if (newIndex >= commandHistory.length) {
        // Restore saved input
        setHistoryIndex(-1)
        if (inputRef.current) {
          inputRef.current.textContent = savedInputRef.current
          moveCursorToEnd()
        }
      } else {
        setHistoryIndex(newIndex)
        if (inputRef.current) {
          inputRef.current.textContent = commandHistory[newIndex]
          moveCursorToEnd()
        }
      }
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      
      // Prevent new commands while streaming or sending email
      if (isStreaming || emailFormStep === 'sending') return
      
      const rawInput = (inputRef.current?.textContent || '').trim()
      const command = rawInput.toLowerCase()

      // Handle email form flow
      if (emailFormStep !== 'idle') {
        // Allow cancel at any step
        if (command === 'cancel') {
          setHistory((prev) => ([
            ...prev,
            { type: 'command' as const, text: `$ ${rawInput}` },
            { type: 'output' as const, text: 'Email cancelled.' }
          ] as HistoryLine[]).slice(-MAX_HISTORY_LINES))
          resetEmailForm()
          if (inputRef.current) inputRef.current.textContent = ''
          return
        }

        if (emailFormStep === 'name') {
          if (!rawInput) {
            setHistory((prev) => [...prev, { type: 'error' as const, text: 'Please enter your name.' }])
            return
          }
          setEmailFormData((prev) => ({ ...prev, name: rawInput }))
          setHistory((prev) => ([
            ...prev,
            { type: 'command' as const, text: `$ ${rawInput}` },
            { type: 'prompt' as const, text: `Thanks ${rawInput}! What's your email? (so Kevin can reply)` }
          ] as HistoryLine[]).slice(-MAX_HISTORY_LINES))
          setEmailFormStep('email')
          if (inputRef.current) inputRef.current.textContent = ''
          return
        }

        if (emailFormStep === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(rawInput)) {
            setHistory((prev) => [...prev, { type: 'error' as const, text: 'Please enter a valid email address.' }])
            if (inputRef.current) inputRef.current.textContent = ''
            return
          }
          setEmailFormData((prev) => ({ ...prev, email: rawInput }))
          setHistory((prev) => ([
            ...prev,
            { type: 'command' as const, text: `$ ${rawInput}` },
            { type: 'prompt' as const, text: 'What would you like to say to Kevin?' }
          ] as HistoryLine[]).slice(-MAX_HISTORY_LINES))
          setEmailFormStep('message')
          if (inputRef.current) inputRef.current.textContent = ''
          return
        }

        if (emailFormStep === 'message') {
          if (!rawInput) {
            setHistory((prev) => [...prev, { type: 'error' as const, text: 'Please enter a message.' }])
            return
          }
          const completeFormData = { ...emailFormData, message: rawInput }
          setHistory((prev) => ([
            ...prev,
            { type: 'command' as const, text: `$ ${rawInput}` }
          ] as HistoryLine[]).slice(-MAX_HISTORY_LINES))
          if (inputRef.current) inputRef.current.textContent = ''
          handleEmailSubmit(completeFormData)
          return
        }
      }

      if (command === '') {
        setHistory((prev) => [...prev, { type: 'command', text: '$' }])
        return
      }

      // Add to command history and reset navigation
      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)
      savedInputRef.current = ''

      const newHistory: HistoryLine[] = [
        ...history,
        { type: 'command', text: `$ ${command}` }
      ]

      if (command === 'clear') {
        setHistory([])
        if (inputRef.current) inputRef.current.textContent = ''
        return
      }

      // Command-specific help: "<command> help"
      if (command.endsWith(' help')) {
        const cmd = command.slice(0, -5).trim()
        const helpTexts: Record<string, string> = {
          'ls': 'ls — List available routes (about, experience, projects, writing)',
          'cd': 'cd <route> — Navigate to a route. Usage: cd projects, cd writing/on-simplicity. Without args, shows current path.',
          'pwd': 'pwd — Print current route path',
          'whoami': 'whoami — Display a one-liner about Kevin',
          'repo': 'repo — Open Kevin\'s GitHub profile in a new tab',
          'github': 'github — Alias for repo',
          'about': 'about — Navigate to the About page',
          'experience': 'experience — Navigate to the Experience page',
          'projects': 'projects — Navigate to the Projects page',
          'writing': 'writing — Navigate to the Writing page',
          'question': 'question <text> — Ask the LLM a question about Kevin. Example: question what projects has kevin worked on?',
          'email': 'email — Send a message to Kevin. Starts an interactive flow asking for your name, email, and message. Type "cancel" at any step to abort.',
          'help': 'help — Show all available commands',
          'clear': 'clear — Clear the terminal history',
          'home': 'home — Navigate to the home page (About)',
        }
        
        if (helpTexts[cmd]) {
          newHistory.push({ type: 'hint', text: helpTexts[cmd] })
        } else {
          newHistory.push({ type: 'error', text: `No help available for: ${cmd}` })
        }
        setHistory(newHistory.slice(-MAX_HISTORY_LINES))
        if (inputRef.current) inputRef.current.textContent = ''
        return
      }

      if (command === 'whoami') {
        newHistory.push({ type: 'output', text: 'kevin — backend engineer, distributed systems enthusiast' })
      } else if (command === 'repo' || command === 'github') {
        newHistory.push({ type: 'output', text: '→ Opening github.com/kevinclb...' })
        window.open('https://github.com/kevinclb', '_blank')
      } else if (command === 'ls') {
        newHistory.push({ type: 'output', text: 'about/  experience/  projects/  writing/' })
      } else if (command === 'cd' || command === 'pwd') {
        newHistory.push({ type: 'output', text: location.pathname })
      } else if (command.startsWith('cd ')) {
        const route = command.slice(3).trim()
        if (!route) {
          newHistory.push({ type: 'output', text: location.pathname })
        } else {
          const path = route.startsWith('/') ? route : `/${route}`
          newHistory.push({ type: 'output', text: `→ Navigating to ${path}` })
          navigate(path)
        }
      } else if (command === 'help') {
        newHistory.push({
          type: 'hint',
          text: 'Available commands: ls, cd, whoami, repo, about, experience, projects, writing, question, email, help, clear'
        })
        newHistory.push({
          type: 'hint',
          text: 'Navigate: cd <route> (e.g., cd projects, cd writing/on-simplicity)'
        })
        newHistory.push({
          type: 'hint',
          text: 'Ask a question: question <your question about Kevin>'
        })
        newHistory.push({
          type: 'hint',
          text: 'Send a message: email (starts interactive flow)'
        })
        newHistory.push({
          type: 'hint',
          text: 'Tip: Use ↑/↓ arrow keys to navigate command history'
        })
        newHistory.push({
          type: 'hint',
          text: 'Tip: Type "<command> help" for details on a specific command'
        })
      } else if (command.startsWith('projects/') || command.startsWith('writing/')) {
        newHistory.push({ type: 'output', text: `→ Navigating to /${command}` })
        navigate(`/${command}`)
      } else if (command === 'home') {
        newHistory.push({ type: 'output', text: '→ Navigating to /about' })
        navigate('/about')
      } else if (command.startsWith('question ')) {
        const questionText = command.slice('question '.length).trim()
        if (!questionText) {
          newHistory.push({
            type: 'error',
            text: 'Please provide a question. Usage: question <your question>'
          })
        } else {
          newHistory.push({ type: 'output', text: 'Thinking...' })
          setHistory(newHistory.slice(-MAX_HISTORY_LINES))
          if (inputRef.current) inputRef.current.textContent = ''
          handleQuestion(questionText)
          return
        }
      } else if (command === 'question') {
        newHistory.push({
          type: 'error',
          text: 'Please provide a question. Usage: question <your question>'
        })
      } else if (command === 'email') {
        newHistory.push({ type: 'prompt', text: 'What\'s your name?' })
        setHistory(newHistory.slice(-MAX_HISTORY_LINES))
        setEmailFormStep('name')
        if (inputRef.current) inputRef.current.textContent = ''
        return
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

  const handleQuestion = async (questionText: string) => {
    setIsStreaming(true)
    setStreamingText('')

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let accumulatedText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                accumulatedText += parsed.content
                setStreamingText(accumulatedText)
              } else if (parsed.error) {
                throw new Error(parsed.error)
              }
            } catch {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }

      // Replace "Thinking..." with the final response
      setHistory((prev) => {
        const newHistory = [...prev]
        // Find and replace the last "Thinking..." message
        for (let i = newHistory.length - 1; i >= 0; i--) {
          if (newHistory[i].text === 'Thinking...') {
            newHistory[i] = { type: 'output', text: accumulatedText || 'No response received.' }
            break
          }
        }
        return newHistory.slice(-MAX_HISTORY_LINES)
      })
    } catch (error) {
      setHistory((prev) => {
        const newHistory = [...prev]
        for (let i = newHistory.length - 1; i >= 0; i--) {
          if (newHistory[i].text === 'Thinking...') {
            newHistory[i] = { 
              type: 'error', 
              text: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}` 
            }
            break
          }
        }
        return newHistory.slice(-MAX_HISTORY_LINES)
      })
    } finally {
      setIsStreaming(false)
      setStreamingText('')
    }
  }

  const resetEmailForm = () => {
    setEmailFormStep('idle')
    setEmailFormData({ name: '', email: '', message: '' })
  }

  const handleEmailSubmit = async (formData: EmailFormData) => {
    setEmailFormStep('sending')
    setHistory((prev) => [...prev, { type: 'output', text: 'Sending your message...' }])

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          senderEmail: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send email')
      }

      setHistory((prev) => {
        const newHistory = [...prev]
        for (let i = newHistory.length - 1; i >= 0; i--) {
          if (newHistory[i].text === 'Sending your message...') {
            newHistory[i] = { 
              type: 'output', 
              text: `Message sent! Kevin will get back to you at ${formData.email}` 
            }
            break
          }
        }
        return newHistory.slice(-MAX_HISTORY_LINES)
      })
    } catch (error) {
      setHistory((prev) => {
        const newHistory = [...prev]
        for (let i = newHistory.length - 1; i >= 0; i--) {
          if (newHistory[i].text === 'Sending your message...') {
            newHistory[i] = { 
              type: 'error', 
              text: `Error: ${error instanceof Error ? error.message : 'Failed to send email'}` 
            }
            break
          }
        }
        return newHistory.slice(-MAX_HISTORY_LINES)
      })
    } finally {
      resetEmailForm()
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
          {history.map((line, i) => {
            const isStreaming_ = isStreaming && line.text === 'Thinking...' && i === history.length - 1
            const content = isStreaming_ ? (streamingText || 'Thinking...') : line.text

            // For hint lines, highlight the label (text before first colon)
            if (line.type === 'hint' && !isStreaming_) {
              const colonIndex = line.text.indexOf(':')
              if (colonIndex !== -1) {
                const label = line.text.slice(0, colonIndex + 1)
                const rest = line.text.slice(colonIndex + 1)
                return (
                  <div key={i} className="terminal-line hint">
                    <span className="terminal-hint-label">{label}</span>{rest}
                  </div>
                )
              }
            }

            return (
              <div key={i} className={`terminal-line ${line.type}`}>
                {content}
              </div>
            )
          })}
        </div>
        <div className="terminal-input-row">
          <span className="terminal-prompt">$</span>
          <div className="terminal-input-wrapper">
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
    </div>
  )
}

export default Terminal
