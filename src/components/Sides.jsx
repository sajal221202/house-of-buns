import { SIDES } from '../data/menu'
import { WishlistButton, PrepAndPrice } from './shared/ProductCardBits'
import CardCarousel from './shared/CardCarousel'

export default function Sides() {
  return (
    <section className="sides">
      <div className="wrap">
        <div className="sides-head">
          <h2 className="display sides-title" data-reveal>
            On The Side
          </h2>
          <span className="sides-badge" data-reveal>
            Perfect with
            <br />
            every bite!
          </span>
        </div>
        <CardCarousel
          items={SIDES}
          perView={3}
          gridClassName="sides-grid stagger"
          renderItem={(item) => (
            <div className="side-card" key={item.name} data-reveal>
              <div className="side-photo">
                <img src={item.photo} alt={item.name} loading="lazy" />
                <WishlistButton item={item} />
              </div>
              <h3>{item.name}</h3>
              <PrepAndPrice item={item} />
            </div>
          )}
        />
      </div>
    </section>
  )
}
