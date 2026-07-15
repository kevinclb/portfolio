import { useId, useState, type ReactNode } from 'react'

interface CollapsibleProps {
  /** Rendered inside the trigger button (the always-visible title row). */
  header: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  /** 'sub' tightens the padding for nested subsections. */
  variant?: 'section' | 'sub'
}

// An accessible disclosure: a button toggles a region that opens gently via a
// grid-template-rows 0fr -> 1fr transition (no height measuring needed). The
// animation collapses under prefers-reduced-motion (handled globally in CSS).
function Collapsible({ header, children, defaultOpen = false, variant = 'section' }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)
  const regionId = useId()

  return (
    <div className={`collapsible collapsible-${variant}`} data-open={open}>
      <button
        type="button"
        className="collapsible-trigger"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="collapsible-header">{header}</span>
        <svg
          className="collapsible-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <div className="collapsible-region" id={regionId} role="region">
        {/* inner is the animated grid item and must stay padding-free so it can
            collapse to 0; spacing lives on the nested content wrapper. */}
        <div className="collapsible-inner">
          <div className="collapsible-content">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Collapsible
