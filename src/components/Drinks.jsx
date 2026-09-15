import { DRINKS, GLASS_BOTTLE_DRINKS, CAN_DRINKS } from '../data/menu'
import { WishlistButton, PrepAndPrice } from './shared/ProductCardBits'
import CardCarousel from './shared/CardCarousel'

function BevTile({ item }) {
  return (
    <div className={`bev-tile bev-tint-${item.tint || 'green'}`} data-reveal>
      <div className="bev-tile-puck" aria-hidden="true" />
      <div className="bev-tile-photo">
        <img src={item.photo} alt={item.name} loading="lazy" />
        <WishlistButton item={item} className="bev-tile-heart" />
      </div>
      <h4>{item.name}</h4>
      <PrepAndPrice item={item} />
    </div>
  )
}

function BevRow({ eyebrow, title, items }) {
  return (
    <div className="bev-row">
      <div className="bev-row-head">
        <span className="bev-row-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
      </div>
      <CardCarousel
        items={items}
        perView={3}
        gridClassName="bev-tiles"
        renderItem={(item) => <BevTile item={item} key={item.name} />}
      />
    </div>
  )
}

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

        <div className="bev-rows">
          <BevRow eyebrow="🍾 Chilled & Classic" title="Glass Bottles" items={GLASS_BOTTLE_DRINKS} />
          <BevRow eyebrow="🥤 Grab & Go" title="Chilled Cans" items={CAN_DRINKS} />
        </div>
      </div>
    </section>
  )
}
