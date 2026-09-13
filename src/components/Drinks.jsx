import { DRINKS } from '../data/menu'
import { WishlistButton, PrepAndPrice } from './shared/ProductCardBits'

export default function Drinks() {
  return (
    <section className="drinks">
      <div className="drinks-drip" aria-hidden="true" />
      <div className="wrap drinks-inner">
        <h2 className="display drinks-title" data-reveal>
          Chug it down
        </h2>
        <p className="drinks-sub">with a variety of drinks</p>
        <div className="drinks-grid stagger">
          {DRINKS.map((d) => (
            <div className="drink-card" key={d.name} data-reveal>
              <div className="drink-pedestal">
                <img src={d.photo} alt={d.name} loading="lazy" />
                <WishlistButton item={d} />
              </div>
              <h3>{d.name}</h3>
              <PrepAndPrice item={d} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
