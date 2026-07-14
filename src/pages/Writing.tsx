import { useState } from 'react'
import Footer from '../components/Footer'
import { posts, SUBSTACK } from '../data/substack'

// Format in UTC so an ISO date (parsed as UTC midnight) doesn't slip a day
// backward in timezones behind UTC.
const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })

// The Substack-backed writing index. It teases the real "Thoughts and Schemes"
// posts — a featured essay with its opening hook, then hairline-ruled rows —
// and links every one out to Substack, where the full essays and RSS live.
function Writing() {
  const [email, setEmail] = useState('')
  const [featured, ...rest] = posts

  // Hand off to Substack's own subscribe flow — it owns the list and delivery.
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const url = email
      ? `${SUBSTACK.subscribeUrl}?email=${encodeURIComponent(email)}`
      : SUBSTACK.subscribeUrl
    window.open(url, '_blank', 'noopener')
  }

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* ── header ───────────────────────────────────────────── */}
      <header
        className="container"
        style={{ width: '100%', paddingTop: 'clamp(64px,10vw,120px)', paddingBottom: 'clamp(40px,6vw,64px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">writing</span> — {SUBSTACK.name}, delivered by Substack
        </span>
        <h1 className="display-1" style={{ marginTop: 20, maxWidth: '11ch' }}>
          Thoughts and schemes.<span className="caret" />
        </h1>
        <p
          className="text-muted"
          style={{ fontSize: 19, lineHeight: 1.6, maxWidth: '52ch', margin: '8px 0 0' }}
        >
          {SUBSTACK.tagline} Essays on agents, infrastructure, and learning in public —
          written slowly, published on Substack.
        </p>
        <form className="subscribe" style={{ marginTop: 32 }} onSubmit={subscribe}>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-accent" type="submit">
            Subscribe
          </button>
        </form>
        <p className="subscribe-note">
          One email per essay. Delivered by Substack — unsubscribe anytime.
        </p>
      </header>

      {/* ── featured + rows ──────────────────────────────────── */}
      <main
        className="container"
        style={{ width: '100%', flex: 1, paddingBottom: 'clamp(64px,9vw,104px)' }}
      >
        <a
          className="card"
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginBottom: 48, padding: 32, gap: 12 }}
        >
          <span className="card-kicker" style={{ color: 'var(--color-accent-600)' }}>
            Latest · {fmt(featured.date)}
          </span>
          <span className="card-title" style={{ fontSize: 28, maxWidth: '24ch' }}>
            {featured.title}
          </span>
          <p className="teaser-hook">{featured.hook}</p>
          <span className="card-meta">
            {featured.readingTime} · Substack ↗
          </span>
        </a>

        {rest.length > 0 && (
          <>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              more essays
            </div>
            <div className="posts">
              {rest.map((p) => (
                <a
                  className="post"
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="post-date">{fmt(p.date)}</span>
                  <span>
                    <span className="post-title">{p.title}</span>
                    <p className="post-dek">{p.subtitle}</p>
                    <span className="post-meta">{p.readingTime} · Substack ↗</span>
                  </span>
                  <svg
                    className="post-arrow"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </>
        )}

        <div
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <a className="btn btn-primary" href={SUBSTACK.url} target="_blank" rel="noopener">
            Read everything on Substack
          </a>
          <a
            className="link-ext"
            href={SUBSTACK.url}
            target="_blank"
            rel="noopener"
            style={{ fontSize: 14, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}
          >
            Comments &amp; RSS live there too
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Writing
