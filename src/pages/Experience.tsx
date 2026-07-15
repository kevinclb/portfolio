import Footer from '../components/Footer'
import { roles } from '../data/experience'

// The full role-by-role timeline. Company and dates sit in a mono meta column
// beside the detail, separated by hairlines.
function Experience() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <header
        className="container"
        style={{ width: '100%', paddingTop: 'clamp(64px,10vw,120px)', paddingBottom: 'clamp(24px,4vw,40px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">experience</span> · the full timeline
        </span>
        <h1 className="display-2" style={{ marginTop: 18, maxWidth: '16ch' }}>
          Where I've worked.<span className="caret" />
        </h1>
        <p className="text-muted" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: '48ch', margin: '4px 0 0' }}>
          Four roles across Chime and Coinbase. Backend, platform, and AI infrastructure, with a
          bias toward systems that have to be correct.
        </p>
      </header>

      <main
        className="container"
        style={{ width: '100%', flex: 1, paddingBottom: 'clamp(64px,9vw,104px)' }}
      >
        <div className="xp-list">
          {roles.map((r) => (
            <article className="xp-item" key={`${r.company}-${r.title}`}>
              <div className="xp-meta">
                <h3 style={{ marginBottom: 4 }}>{r.company}</h3>
                <p className="text-muted" style={{ fontSize: 14.5, margin: '0 0 8px', maxWidth: '26ch' }}>
                  {r.title}
                </p>
                <p className="mono text-subtle" style={{ fontSize: 12.5, margin: 0 }}>
                  {r.period}
                </p>
              </div>
              <div className="xp-body">
                <ul style={{ margin: '0 0 16px', paddingLeft: '1.15em' }}>
                  {r.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: 15.5, lineHeight: 1.6, marginBottom: 8 }}>
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {r.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Experience
