import Footer from '../components/Footer'

// A warm, work-first about page: who I am, what I'm focused on now, how I work,
// and one light off-the-clock line. No em dashes, no filler.
function About() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <header
        className="container"
        style={{ width: '100%', paddingTop: 'clamp(64px,10vw,120px)', paddingBottom: 'clamp(24px,4vw,40px)' }}
      >
        <span className="eyebrow">
          <span className="eyebrow-num">about</span> · a little context
        </span>
        <h1 className="display-2" style={{ marginTop: 18, maxWidth: '16ch' }}>
          Hey, I'm Kevin.<span className="caret" />
        </h1>
        <p className="text-muted" style={{ fontSize: 19, lineHeight: 1.6, maxWidth: '52ch', margin: '4px 0 0' }}>
          I'm a software engineer based in California. I studied computer science at Cal State Long
          Beach, and I've spent the last four plus years building backend, platform, and AI
          infrastructure, mostly in fintech.
        </p>
      </header>

      <main
        className="container"
        style={{ width: '100%', flex: 1, paddingBottom: 'clamp(64px,9vw,104px)' }}
      >
        <div className="about-blocks">
          <section className="about-block">
            <span className="eyebrow">now</span>
            <p>
              At Chime I lead a lot of our AI app experience: agentic pipelines and the transaction
              intelligence behind spending insights for more than 25 million members. A regulated
              environment is a good teacher. It rewards systems that are careful, observable, and
              honest about what they do not know.
            </p>
            <p>
              Outside of shipping, I spend real time on how we build with agents: the loops, the
              skills, the evals, and the habits that make agentic work trustworthy instead of
              flashy.
            </p>
          </section>

          <section className="about-block">
            <span className="eyebrow">how I work</span>
            <p>
              I care about getting things right more than getting them big. I like small revertable
              changes, clear interfaces, and infrastructure that quietly holds. I believe in
              learning in public and holding strong opinions loosely, which is part of why I write.
            </p>
          </section>

          <section className="about-block">
            <span className="eyebrow">off the clock</span>
            <p>
              At home there's my wife Ana, our son Bryson, and our dog Chance. When I'm not with
              them you'll usually find me lifting, playing chess, slowly learning guitar, or reading
              too much about whatever is happening in the world.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default About
