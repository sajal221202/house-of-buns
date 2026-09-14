import { useState } from 'react'
import { FEATURED_BURGERS, CURRENCY } from '../data/menu'
import MenuBook from './menuBook/MenuBook'
import { WishlistButton, PrepAndPrice } from './shared/ProductCardBits'

export default function FeaturedBurgers() {
  const [bookOpen, setBookOpen] = useState(false)

  return (
    <section id="menu" className="featured">
      <div className="wrap">
        <div className="featured-head">
          <h2 className="display featured-title">
            <span aria-hidden="true">👀</span> Featured Buns
          </h2>
          <button className="btn btn-dark" onClick={() => setBookOpen(true)}>
            View all
          </button>
        </div>
        <div className="featured-grid stagger">
          {FEATURED_BURGERS.map((item) => (
            <div className="featured-item" key={item.name} data-reveal>
              <div className="featured-photo">
                <img src={item.photo} alt={item.name} loading="lazy" />
                <WishlistButton item={item} />
                <span className="featured-badge">
                  {CURRENCY}
                  {item.price}
                </span>
              </div>
              <h3>{item.name}</h3>
              <PrepAndPrice item={item} />
            </div>
          ))}
        </div>
      </div>

      {bookOpen && <MenuBook onClose={() => setBookOpen(false)} />}
    </section>
  )
}
