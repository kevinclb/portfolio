import Footer from '../components/Footer'
import { uses } from '../data/uses'

// A light "what I use" page. Grouped tool lists with a short note on each.
function Uses() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <header
        className="container"
        style={{ width: '100%', paddingTop: 'clamp(64px,10vw,120px)', paddingBottom: 'clamp(24px,4vw,40px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">uses</span> · the toolbox
        </span>
        <h1 className="display-2" style={{ marginTop: 18, maxWidth: '16ch' }}>
          What I build with.<span className="caret" />
        </h1>
        <p className="text-muted" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: '48ch', margin: '4px 0 0' }}>
          The tools I actually reach for. Nothing aspirational, just what's open on a normal day.
        </p>
      </header>

      <main
        className="container"
        style={{ width: '100%', flex: 1, paddingBottom: 'clamp(64px,9vw,104px)' }}
      >
        <div className="uses-grid">
          {uses.map((group) => (
            <section className="uses-group" key={group.title}>
              <h3 style={{ marginBottom: 4 }}>{group.title}</h3>
              <p className="text-muted" style={{ fontSize: 14, margin: '0 0 16px' }}>
                {group.note}
              </p>
              <dl className="uses-list">
                {group.items.map((item) => (
                  <div className="uses-row" key={item.name}>
                    <dt>{item.name}</dt>
                    {item.note && <dd className="text-muted">{item.note}</dd>}
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Uses
