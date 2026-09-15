import { useEffect, useState } from 'react'

// Either pass `items` + `renderItem` (auto-chunked into pages of `perView`), or
// pass `groups` directly: [{ label, items, renderItem, gridClassName }] for
// slides that differ in content/layout from one another.
export default function CardCarousel({
  items,
  renderItem,
  perView = 3,
  autoPlayMs = 4200,
  gridClassName = '',
  groups,
}) {
  const pages = groups
    ? groups.map((g) => ({
        items: g.items,
        renderItem: g.renderItem || renderItem,
        gridClassName: g.gridClassName || gridClassName,
        label: g.label,
      }))
    : (() => {
        const chunks = []
        for (let i = 0; i < items.length; i += perView) chunks.push(items.slice(i, i + perView))
        return chunks.map((chunk) => ({ items: chunk, renderItem, gridClassName, label: undefined }))
      })()

  const total = pages.length

  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (total <= 1 || paused) return undefined
    const id = setInterval(() => setPage((p) => (p + 1) % total), autoPlayMs)
    return () => clearInterval(id)
  }, [total, paused, autoPlayMs])

  const currentLabel = pages[page]?.label

  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {currentLabel && (
        <div className="carousel-label" key={currentLabel}>
          {currentLabel}
        </div>
      )}
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((p, i) => (
            <div className={`carousel-slide ${p.gridClassName}`} key={i}>
              {p.items.map((item) => p.renderItem(item))}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="carousel-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${i === page ? 'is-active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
