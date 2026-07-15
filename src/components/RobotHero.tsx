// A hand-built isometric line-art robot for the hero. Thin ink strokes on
// currentColor, one cobalt accent (the eye + antenna spark), and a gentle idle
// float (disabled under prefers-reduced-motion via the global CSS rule).
// Decorative, so it's hidden from assistive tech.
function RobotHero() {
  return (
    <svg
      className="robot-hero"
      viewBox="0 0 420 440"
      fill="none"
      aria-hidden="true"
      role="img"
    >
      {/* ground shadow */}
      <ellipse cx="210" cy="404" rx="118" ry="15" className="robot-shadow" />

      <g className="robot-float">
        {/* ── antenna ── */}
        <line x1="214" y1="112" x2="214" y2="82" className="robot-ink" />
        <circle cx="214" cy="76" r="7" className="robot-accent-fill" />

        {/* ── head ── */}
        {/* top face */}
        <path d="M152 120 L252 120 L278 104 L178 104 Z" className="robot-ink robot-face-top" />
        {/* right face */}
        <path d="M252 120 L278 104 L278 190 L252 206 Z" className="robot-ink robot-face-side" />
        {/* front face */}
        <rect x="152" y="120" width="100" height="86" rx="14" className="robot-ink robot-face-front" />
        {/* eyes */}
        <circle cx="182" cy="158" r="11" className="robot-accent-fill" />
        <circle cx="222" cy="158" r="11" className="robot-ink robot-face-front" />
        <circle cx="222" cy="158" r="3.5" className="robot-ink-fill" />
        {/* smile */}
        <path d="M180 184 Q202 196 224 184" className="robot-ink" />

        {/* ── body ── */}
        {/* top face */}
        <path d="M142 216 L262 216 L288 200 L168 200 Z" className="robot-ink robot-face-top" />
        {/* right face */}
        <path d="M262 216 L288 200 L288 300 L262 316 Z" className="robot-ink robot-face-side" />
        {/* front face */}
        <rect x="142" y="216" width="120" height="100" rx="16" className="robot-ink robot-face-front" />
        {/* chest panel */}
        <rect x="176" y="240" width="52" height="52" rx="10" className="robot-ink robot-face-front" />
        <path d="M190 266 h24 M202 254 v24" className="robot-ink" />

        {/* ── left arm ── */}
        <path d="M142 244 L112 276 L120 306" className="robot-ink robot-limb" />
        <circle cx="120" cy="310" r="11" className="robot-ink robot-face-front" />
        {/* ── right arm, raised in a small wave ── */}
        <path d="M262 244 L298 226 L304 190" className="robot-ink robot-limb" />
        <circle cx="304" cy="184" r="11" className="robot-ink robot-face-front" />

        {/* ── legs + feet ── */}
        <line x1="178" y1="316" x2="178" y2="346" className="robot-ink robot-limb" />
        <line x1="226" y1="316" x2="226" y2="346" className="robot-ink robot-limb" />
        <rect x="162" y="344" width="34" height="16" rx="7" className="robot-ink robot-face-front" />
        <rect x="210" y="344" width="34" height="16" rx="7" className="robot-ink robot-face-front" />
      </g>
    </svg>
  )
}

export default RobotHero
