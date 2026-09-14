import { useState } from 'react'
import { STACK_STEPS } from '../data/menu'

export default function ArtisanalStack() {
  const [active, setActive] = useState(0)
  const step = STACK_STEPS[active]
  const isLast = active === STACK_STEPS.length - 1

  return (
    <section className="stack" id="craft">
      <div className="seam-word seam-word-light" aria-hidden="true">
        HOUSE OF BUNS
      </div>
      <div className="seam-word seam-word-dark" aria-hidden="true">
        HOUSE OF BUNS
      </div>
      <div className="wrap">
        <div className="stack-head">
          <span className="stack-eyebrow" data-reveal>
            ✦ Scroll-Driven Craft Experience
          </span>
          <h2 className="display stack-title" data-reveal>
            The Artisanal Stack
          </h2>
          <div className="stack-tabs" data-reveal>
            {STACK_STEPS.map((s, i) => (
              <button
                key={s.key}
                className={`stack-tab ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="stack-tab-num">{i < active ? '✓' : s.step}</span>
                {s.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="stack-panel" style={{ backgroundImage: `url(${step.photo})` }} data-reveal>
          <div className="stack-panel-overlay" aria-hidden="true" />
          <div className="stack-panel-top">
            <span>
              {step.step} · {step.eyebrow}
            </span>
            <span>{step.kicker}</span>
          </div>
          <div className="stack-panel-content">
            <p className="stack-panel-super">{step.kicker}</p>
            <h3 className="display stack-panel-title">
              {step.titlePlain} <span className="accent">{step.titleAccent}</span> {step.titleEnd}
            </h3>
            <p className="stack-panel-copy">{step.copy}</p>
            <div className="stack-tags">
              {step.tags.map((t) => (
                <span className="stack-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="stack-panel-nav">
              <button
                className="stack-nav-btn stack-nav-back"
                disabled={active === 0}
                onClick={() => setActive((i) => Math.max(0, i - 1))}
              >
                ← Back
              </button>
              {!isLast ? (
                <button
                  className="stack-nav-btn stack-nav-next"
                  onClick={() => setActive((i) => Math.min(STACK_STEPS.length - 1, i + 1))}
                >
                  Next: {STACK_STEPS[active + 1]?.tab} →
                </button>
              ) : (
                <a href="#menu" className="stack-nav-btn stack-nav-next stack-nav-done">
                  ✓ Stack Complete · View Menu →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
