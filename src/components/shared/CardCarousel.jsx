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

  // Auto-advances continuously, unaffected by hover. Manual dot clicks just
  // jump the page — the interval keeps ticking on its own schedule, so
  // auto-scroll naturally resumes from wherever the user leaves it.
  useEffect(() => {
    if (total <= 1) return undefined
    const id = setInterval(() => setPage((p) => (p + 1) % total), autoPlayMs)
    return () => clearInterval(id)
  }, [total, autoPlayMs])

  const currentLabel = pages[page]?.label

  return (
    <div className="carousel">
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
