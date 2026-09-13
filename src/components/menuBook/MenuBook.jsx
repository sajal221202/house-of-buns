import { useEffect, useMemo, useState } from 'react'
import { FEATURED_BURGERS, SIDES, DRINKS, CURRENCY } from '../../data/menu'
import { useOrder } from '../../context/OrderContext'
import logoBadge from '../../assets/logo-badge-green.png'
import burgerIcon from '../../assets/burger-icon.png'

function chunk(list, size) {
  const out = []
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size))
  return out
}

function buildPages() {
  const pages = [{ kind: 'cover' }]

  chunk(FEATURED_BURGERS, 3).forEach((group) => {
    pages.push({ kind: 'items', label: 'Featured Buns', icon: '🍔', items: group })
  })
  chunk(SIDES, 4).forEach((group) => {
    pages.push({ kind: 'items', label: 'On The Side', icon: '🍟', items: group })
  })
  chunk(DRINKS, 3).forEach((group) => {
    pages.push({ kind: 'items', label: 'Chug It Down', icon: '🥤', items: group })
  })

  pages.push({ kind: 'back' })
  return pages
}

function PageContent({ page, pageNumber, totalNumbered, onOrderNow }) {
  if (page.kind === 'cover') {
    return (
      <div className="mb-page mb-page-cover">
        <img src={logoBadge} alt="" className="mb-cover-badge" />
        <span className="mb-cover-eyebrow">The Full</span>
        <h2 className="display mb-cover-title">Menu Book</h2>
        <p className="mb-cover-tagline">Good Buns. Great Times.</p>
        <span className="mb-cover-hint">Tap or swipe to open →</span>
      </div>
    )
  }

  if (page.kind === 'back') {
    return (
      <div className="mb-page mb-page-back">
        <img src={burgerIcon} alt="" className="mb-back-icon" />
        <h2 className="display mb-back-title">That's Everything!</h2>
        <p className="mb-back-copy">Dine-in only — grab a token and we'll call you when it's hot &amp; ready.</p>
        <button className="btn btn-green mb-back-cta" onClick={onOrderNow}>
          Order Now
        </button>
      </div>
    )
  }

  return (
    <div className="mb-page mb-page-items">
      <div className="mb-page-header">
        <span className="mb-page-icon">{page.icon}</span>
        <h3 className="display">{page.label}</h3>
      </div>
      <ul className="mb-item-list">
        {page.items.map((item) => (
          <li className="mb-item-row" key={item.name}>
            <span className="mb-item-photo">
              <img src={item.photo} alt="" loading="lazy" />
            </span>
            <span className="mb-item-name">{item.name}</span>
            <span className="mb-item-leader" aria-hidden="true" />
            <span className="mb-item-price">
              {CURRENCY}
              {item.price}
            </span>
          </li>
        ))}
      </ul>
      <span className="mb-page-number">{pageNumber} / {totalNumbered}</span>
    </div>
  )
}

export default function MenuBook({ onClose }) {
  const { openOrderModal } = useOrder()
  const pages = useMemo(buildPages, [])
  const [index, setIndex] = useState(0)
  const [anim, setAnim] = useState(null)

  const numberedPages = pages.filter((p) => p.kind === 'items')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') goTo('next')
      if (e.key === 'ArrowLeft') goTo('prev')
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, anim])

  function goTo(dir) {
    if (anim) return
    const target = dir === 'next' ? index + 1 : index - 1
    if (target < 0 || target >= pages.length) return
    setAnim({ from: index, to: target, dir })
  }

  function finishAnim() {
    if (!anim) return
    setIndex(anim.to)
    setAnim(null)
  }

  function handleOrderNow() {
    onClose()
    openOrderModal()
  }

  // While flipping: "next" reveals the target page immediately underneath (the
  // old page visibly flies away on top); "prev" keeps the old page visible
  // underneath while the target page flips back into place on top of it.
  const baseIndex = anim ? (anim.dir === 'next' ? anim.to : anim.from) : index
  const overlayIndex = anim ? (anim.dir === 'next' ? anim.from : anim.to) : null
  const flippingPage = overlayIndex !== null ? pages[overlayIndex] : null
  const numberFor = (page) => numberedPages.indexOf(page) + 1

  return (
    <div className="order-modal-backdrop mb-backdrop" role="dialog" aria-modal="true">
      <div className="mb-shell">
        <button className="order-modal-close mb-close" onClick={onClose} aria-label="Close menu book">
          ✕
        </button>

        <div className="mb-book">
          <button
            className="mb-edge mb-edge-left"
            onClick={() => goTo('prev')}
            aria-label="Previous page"
            disabled={index === 0}
          />
          <button
            className="mb-edge mb-edge-right"
            onClick={() => goTo('next')}
            aria-label="Next page"
            disabled={index === pages.length - 1}
          />

          <div className="mb-stage">
            <PageContent
              page={pages[baseIndex]}
              pageNumber={numberFor(pages[baseIndex])}
              totalNumbered={numberedPages.length}
              onOrderNow={handleOrderNow}
            />

            {flippingPage && (
              <div className={`mb-flip mb-flip-${anim.dir}`} onAnimationEnd={finishAnim}>
                <div className="mb-flip-shadow" />
                <PageContent
                  page={flippingPage}
                  pageNumber={numberFor(flippingPage)}
                  totalNumbered={numberedPages.length}
                  onOrderNow={handleOrderNow}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-controls">
          <button className="mb-nav-btn" onClick={() => goTo('prev')} disabled={index === 0}>
            ← Prev
          </button>
          <div className="mb-dots">
            {pages.map((p, i) => (
              <span key={i} className={`mb-dot ${i === index ? 'is-active' : ''}`} />
            ))}
          </div>
          <button className="mb-nav-btn" onClick={() => goTo('next')} disabled={index === pages.length - 1}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
