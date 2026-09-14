import { useEffect, useState } from 'react'

export default function CardCarousel({ items, renderItem, perView = 3, autoPlayMs = 4200, gridClassName = '' }) {
  const pages = []
  for (let i = 0; i < items.length; i += perView) pages.push(items.slice(i, i + perView))
  const total = pages.length

  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (total <= 1 || paused) return undefined
    const id = setInterval(() => setPage((p) => (p + 1) % total), autoPlayMs)
    return () => clearInterval(id)
  }, [total, paused, autoPlayMs])

  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((group, i) => (
            <div className={`carousel-slide ${gridClassName}`} key={i}>
              {group.map((item) => renderItem(item))}
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
