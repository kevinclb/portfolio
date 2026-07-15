import { Link } from 'react-router-dom'
import Collapsible from '../components/Collapsible'
import { companies, stack, stats } from '../data/experience'
import { posts, SUBSTACK } from '../data/substack'

// The portfolio front page: an oversized hero, collapsible work history, an ink
// impact band, the stack in mono chips, a Substack writing preview, and a dark
// closing contact band.
function Home() {
  const preview = posts.slice(0, 3)

  return (
    <div className="page-enter">
      {/* ── hero ─────────────────────────────────────────────── */}
      <header
        className="container"
        style={{ paddingTop: 'clamp(72px,12vw,140px)', paddingBottom: 'clamp(64px,10vw,120px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">kevinbabou.dev</span> · software engineer
        </span>
        <h1 className="display-1" style={{ marginTop: 20, maxWidth: '12ch' }}>
          I build agents, and the systems they run on.<span className="caret" />
        </h1>
        <p
          className="text-muted"
          style={{ fontSize: 19, lineHeight: 1.6, maxWidth: '46ch', margin: '8px 0 32px' }}
        >
          Software engineer at Chime, building agentic pipelines for 25 million+ members and the
          infrastructure that keeps them honest. Before that, Coinbase.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a className="btn btn-primary btn-lg" href="/resume.pdf" target="_blank" rel="noopener">
            View résumé
          </a>
          <Link className="btn btn-secondary btn-lg" to="/writing">
            Read my writing
          </Link>
        </div>
      </header>

      {/* ── work ─────────────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 'clamp(56px,8vw,96px)' }}>
        <hr className="hr" style={{ margin: '0 0 40px' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="eyebrow">
            <span className="eyebrow-num">01</span> / work
          </span>
          <Link
            to="/experience"
            style={{ fontSize: 14, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}
          >
            Full timeline
          </Link>
        </div>

        <div className="work-acc" style={{ marginTop: 28 }}>
          {companies.map((c) => (
            <Collapsible
              key={c.name}
              preview={<span className="work-peek">{c.role}</span>}
              header={
                <span className="work-acc-title">
                  <span className="work-acc-name">{c.name}</span>
                  <span className="mono text-subtle work-acc-period">{c.period}</span>
                </span>
              }
            >
              <p className="text-muted" style={{ fontSize: 14.5, margin: '0 0 12px' }}>
                {c.role}
              </p>
              <div className="work-subs">
                {c.highlights.map((h) => (
                  <Collapsible key={h.lead} variant="sub" header={<span>{h.lead}</span>}>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }} className="text-muted">
                      {h.body}
                    </p>
                  </Collapsible>
                ))}
              </div>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* ── impact band ──────────────────────────────────────── */}
      <section className="band">
        <div
          className="container"
          style={{ paddingTop: 'clamp(56px,8vw,88px)', paddingBottom: 'clamp(56px,8vw,88px)' }}
        >
          <span className="eyebrow">some numbers I'm proud of</span>
          <div className="impact-grid">
            {stats.map((s) => (
              <div className="impact-item" key={s.label}>
                <span className="impact-num">{s.num}</span>
                <span className="impact-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── stack ────────────────────────────────────────────── */}
      <section
        className="container"
        style={{ paddingTop: 'clamp(56px,8vw,96px)', paddingBottom: 'clamp(48px,7vw,80px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">02</span> / stack
        </span>
        <div className="chip-row">
          {stack.map((s) => (
            <span className="tag stack-chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── writing preview ──────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 'clamp(64px,9vw,104px)' }}>
        <hr className="hr" style={{ margin: '0 0 40px' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="eyebrow">
            <span className="eyebrow-num">03</span> / writing
          </span>
          <Link
            className="link-ext"
            to="/writing"
            style={{ fontSize: 14, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}
          >
            All essays
          </Link>
        </div>
        <div className="posts" style={{ marginTop: 20 }}>
          {preview.map((p) => (
            <a
              className="post"
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="post-date">
                {new Date(p.date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </span>
              <span>
                <span className="post-title">{p.title}</span>
                <span className="post-meta" style={{ display: 'block' }}>
                  {p.readingTime} · Substack ↗
                </span>
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
      </section>

      {/* ── contact band ─────────────────────────────────────── */}
      <footer id="contact" className="band" style={{ scrollMarginTop: 84 }}>
        <div
          className="container"
          style={{ paddingTop: 'clamp(72px,11vw,128px)', paddingBottom: 32 }}
        >
          <span className="eyebrow">
            <span className="eyebrow-num">04</span> / contact
          </span>
          <h2 className="display-2" style={{ marginTop: 16 }}>
            Say hello.
          </h2>
          <p className="text-muted" style={{ fontSize: 17, maxWidth: '44ch', marginBottom: 32 }}>
            I'm always happy to talk about agents, infrastructure, or a good problem worth solving.
            Reach out any time.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn-primary btn-lg" href="mailto:kevincbabou@gmail.com">
              kevincbabou@gmail.com
            </a>
            <a
              className="btn btn-ghost"
              href="https://linkedin.com/in/kevin-babou"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/kevinclb"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            <a className="btn btn-ghost" href={SUBSTACK.url} target="_blank" rel="noopener">
              Substack
            </a>
          </div>
          <hr className="hr" style={{ margin: '64px 0 20px' }} />
          <div
            style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}
          >
            <span className="mono text-subtle" style={{ fontSize: 12 }}>
              © 2026 Kevin Babou
            </span>
            <Link className="mono text-subtle" to="/uses" style={{ fontSize: 12, textDecoration: 'none' }}>
              what I use
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
